import { unwrapWebhook } from '@whop/sdk/helpers'
import { buildPack } from './_lib/pack.mjs'
import { sendAccessEmail } from './_lib/email.mjs'
import { trackServerPurchase } from './_lib/analytics.mjs'
import { hmac, normalizeEmail, sha256, stablePrivateId } from './_lib/security.mjs'
import { getJson, setJson } from './_lib/store.mjs'
import { whopRuntimeConfig } from './_lib/whop.mjs'
import { siteOrigin } from './_lib/http.mjs'

function moneyAmount(value) {
  const amount = typeof value === 'object' && value !== null ? value.amount : value
  return Number(amount)
}

export function acceptedAmount(payment, order) {
  const paymentCurrency = String(payment.currency || payment.subtotal?.currency || payment.total?.currency || '').toLowerCase()
  const value = paymentCurrency === order.currency
    ? payment.subtotal ?? payment.total
    : order.currency === 'usd' ? payment.usd_total : null
  const amount = moneyAmount(value)
  return Number.isFinite(amount) && Math.abs(amount - order.amount) < 0.001
}

export function acceptedPayment(event, payment, order, whop) {
  const accountId = String(event.account_id || payment.account_id || payment.company?.id || '')
  const status = String(payment.status || '')
  const currency = String(payment.currency || payment.subtotal?.currency || payment.total?.currency || '').toLowerCase()
  const currencyAccepted = currency === order.currency || (order.currency === 'usd' && moneyAmount(payment.usd_total) > 0)
  const checkoutId = String(payment.checkout_configuration_id || '')
  const planId = String(payment.plan?.id || payment.plan_id || '')
  return accountId === whop.accountId
    && ['paid', 'succeeded'].includes(status)
    && currencyAccepted
    && acceptedAmount(payment, order)
    && checkoutId === order.checkoutConfigurationId
    && (!order.planId || planId === order.planId)
}

export default async function handler(request) {
  if (request.method !== 'POST') return new Response('method_not_allowed', { status: 405 })

  let event
  try {
    const whop = whopRuntimeConfig()
    if (!whop.webhookSecret || !whop.accountId) return new Response('webhook_not_configured', { status: 503 })
    const rawBody = await request.text()
    event = unwrapWebhook(rawBody, { headers: Object.fromEntries(request.headers.entries()), key: whop.webhookSecret })
  } catch (error) {
    console.warn('rejected Whop webhook', { name: error?.name })
    return new Response('invalid_signature', { status: 401 })
  }

  if (event.type !== 'payment.succeeded') return new Response('ignored', { status: 200 })
  const envelope = event.data || {}
  const payment = envelope.payment || envelope
  const orderId = String(payment.metadata?.order_id || envelope.metadata?.order_id || '')
  const paymentId = String(payment.id || '')
  if (!orderId || !paymentId) return new Response('invalid_payload', { status: 400 })

  try {
    const whop = whopRuntimeConfig()
    const order = await getJson(`orders/${orderId}`)
    if (!order) return new Response('unknown_order', { status: 404 })
    const valid = acceptedPayment(event, payment, order, whop)
    if (!valid) {
      console.warn('rejected Whop payment mismatch', { orderId, paymentId })
      return new Response('payment_mismatch', { status: 422 })
    }

    const paymentKey = `payments/${paymentId}`
    const existing = await getJson(paymentKey)
    if (existing?.state === 'fulfilled') return new Response('ok', { status: 200 })
    if (existing?.state === 'processing' && Date.now() - new Date(existing.updatedAt).getTime() < 300_000) return new Response('ok', { status: 200 })
    await setJson(paymentKey, { state: 'processing', orderId, updatedAt: new Date().toISOString() })

    const entitlementId = stablePrivateId('ent', paymentId)
    const email = normalizeEmail(order.email || payment.user?.email || payment.member?.email)
    const emailHash = email ? hmac(`email:${email}`) : ''
    const emailAccessToken = hmac(`email-access:${entitlementId}`)
    const entitlement = {
      id: entitlementId,
      state: 'active',
      productId: order.productId,
      paymentId,
      orderId,
      email,
      locale: order.locale,
      input: order.input,
      version: 1,
      versions: [{ version: 1, pack: buildPack(order.input, 1), createdAt: new Date().toISOString() }],
      pack: buildPack(order.input, 1),
      regenerationsRemaining: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    await setJson(`entitlements/${entitlementId}`, entitlement)
    await setJson(`claims/${order.browserClaimHash}`, { entitlementId, state: 'active', purpose: 'browser', createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 86_400_000).toISOString() })
    await setJson(`claims/${sha256(emailAccessToken)}`, { entitlementId, state: 'active', purpose: 'email', createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 7 * 86_400_000).toISOString() })
    if (emailHash) await setJson(`email-index/${emailHash}`, { entitlementId, updatedAt: new Date().toISOString() })
    await setJson(`orders/${orderId}`, { ...order, state: 'fulfilled', paymentId, entitlementId, updatedAt: new Date().toISOString() })
    await setJson(paymentKey, { state: 'fulfilled', orderId, entitlementId, updatedAt: new Date().toISOString() })

    const siteUrl = siteOrigin(request)
    const accessUrl = `${siteUrl}/api/aim-pack/claim?t=${encodeURIComponent(emailAccessToken)}&locale=${encodeURIComponent(order.locale)}`
    await Promise.allSettled([
      sendAccessEmail({ email, locale: order.locale, accessUrl }),
      trackServerPurchase({ order, paymentId }),
    ])
    return new Response('ok', { status: 200 })
  } catch (error) {
    console.error('Whop fulfillment failed', { orderId, paymentId, name: error?.name })
    return new Response('fulfillment_failed', { status: 500 })
  }
}

export const config = { path: '/api/aim-pack/whop-webhook' }
