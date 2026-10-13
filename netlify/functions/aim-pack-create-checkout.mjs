import { randomUUID } from 'node:crypto'
import { json, readJson, requireSameOrigin, safeLocale, siteOrigin } from './_lib/http.mjs'
import { sanitizePackInput } from './_lib/pack.mjs'
import { normalizeEmail, randomToken, sha256 } from './_lib/security.mjs'
import { setJson } from './_lib/store.mjs'
import { approvedUrl, paypalConfigured, paypalOrderBody, paypalRequest, paypalRuntimeConfig } from './_lib/paypal.mjs'

export default async function handler(request) {
  if (request.method !== 'POST') return json(405, { code: 'method_not_allowed' }, { Allow: 'POST' })
  if (!requireSameOrigin(request)) return json(403, { code: 'origin_not_allowed' })
  try {
    const paypal = paypalRuntimeConfig()
    if (!paypalConfigured(paypal)) return json(503, { code: 'checkout_not_configured' })
    const body = await readJson(request)
    const email = normalizeEmail(body.email)
    if (!email) return json(400, { code: 'email_required' })
    const orderId = `ord_${randomUUID()}`
    const statusToken = randomToken()
    const claimToken = randomToken()
    const order = {
      id: orderId, state: 'pending', provider: 'paypal', productId: 'aimcodes_crosshair_pack_v1', amount: 1.99, currency: 'usd',
      locale: safeLocale(body.locale), email, input: sanitizePackInput(body), merchantId: paypal.merchantId, environment: paypal.environment,
      gaClientId: /^\d+\.\d+$/.test(String(body.analytics?.clientId || '')) ? String(body.analytics.clientId) : '',
      gaSessionId: /^\d+$/.test(String(body.analytics?.sessionId || '')) ? String(body.analytics.sessionId) : '',
      statusTokenHash: sha256(statusToken), browserClaimHash: sha256(claimToken), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }
    // Persist before provider creation; no buyer can approve an unrecorded draft.
    await setJson(`orders/${orderId}`, order)
    const configuration = await paypalRequest('/v2/checkout/orders', { method: 'POST', body: paypalOrderBody(order, siteOrigin(request)), requestId: orderId }, paypal)
    const approvalUrl = approvedUrl(configuration, paypal.environment)
    if (!configuration.id || !approvalUrl) throw new Error('paypal_approval_missing')
    await setJson(`orders/${orderId}`, { ...order, paypalOrderId: configuration.id })
    await setJson(`paypal-orders/${configuration.id}`, { orderId })
    return json(200, { orderId, paypalOrderId: configuration.id, approvalUrl, statusToken, claimToken, provider: 'paypal', environment: paypal.environment })
  } catch (error) {
    console.error('aim-pack checkout creation failed', { name: error?.name })
    return json(error?.message === 'payload_too_large' ? 413 : 502, { code: 'checkout_unavailable' })
  }
}
export const config = { path: '/api/aim-pack/create-checkout' }
