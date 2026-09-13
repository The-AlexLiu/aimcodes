import { randomUUID } from 'node:crypto'
import { WhopClient } from '@whop/sdk'
import { json, readJson, requireSameOrigin, safeLocale, siteOrigin } from './_lib/http.mjs'
import { sanitizePackInput } from './_lib/pack.mjs'
import { normalizeEmail, randomToken, sha256 } from './_lib/security.mjs'
import { setJson } from './_lib/store.mjs'
import { whopClientOptions, whopRuntimeConfig } from './_lib/whop.mjs'

export default async function handler(request) {
  if (request.method !== 'POST') return json(405, { code: 'method_not_allowed' }, { Allow: 'POST' })
  if (!requireSameOrigin(request)) return json(403, { code: 'origin_not_allowed' })
  const whop = whopRuntimeConfig()
  if (!whop.apiKey || !whop.accountId) return json(503, { code: 'checkout_not_configured' })

  try {
    const body = await readJson(request)
    const input = sanitizePackInput(body)
    const locale = safeLocale(body.locale)
    const email = normalizeEmail(body.email)
    if (!email) return json(400, { code: 'email_required' })
    const gaClientId = /^\d+\.\d+$/.test(String(body.analytics?.clientId || '')) ? String(body.analytics.clientId) : ''
    const gaSessionId = /^\d+$/.test(String(body.analytics?.sessionId || '')) ? String(body.analytics.sessionId) : ''
    const orderId = `ord_${randomUUID()}`
    const statusToken = randomToken()
    const claimToken = randomToken()
    const siteUrl = siteOrigin(request)
    const client = new WhopClient(whopClientOptions(whop))
    const plan = {
      account_id: whop.accountId,
      currency: 'usd',
      initial_price: 1.99,
      plan_type: 'one_time',
      release_method: 'buy_now',
      visibility: 'hidden',
      title: 'AimCodes Crosshair Pack',
      description: 'Five tailored VALORANT crosshairs with two included regenerations.',
      force_create_new_plan: false,
      ...(whop.productId ? { product_id: whop.productId } : {}),
    }
    const configuration = await client.checkoutConfigurations.create({
      account_id: whop.accountId,
      mode: 'payment',
      metadata: { order_id: orderId },
      plan,
      redirect_url: `${siteUrl}/${locale}/checkout/complete/`,
    }, { idempotencyKey: orderId })

    await setJson(`orders/${orderId}`, {
      id: orderId,
      state: 'pending',
      productId: 'aimcodes_crosshair_pack_v1',
      amount: 1.99,
      currency: 'usd',
      locale,
      email,
      gaClientId,
      gaSessionId,
      input,
      checkoutConfigurationId: configuration.id,
      planId: configuration.plan?.id || null,
      statusTokenHash: sha256(statusToken),
      browserClaimHash: sha256(claimToken),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return json(200, {
      orderId,
      sessionId: configuration.id,
      statusToken,
      claimToken,
      environment: whop.environment,
    })
  } catch (error) {
    console.error('aim-pack checkout creation failed', { name: error?.name, status: error?.status })
    return json(error?.message === 'payload_too_large' ? 413 : 502, { code: 'checkout_unavailable' })
  }
}

export const config = { path: '/api/aim-pack/create-checkout' }
