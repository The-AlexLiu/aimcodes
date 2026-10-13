import { json, readJson, requireSameOrigin, siteOrigin } from './_lib/http.mjs'
import { safeEqual, sha256 } from './_lib/security.mjs'
import { getJson } from './_lib/store.mjs'
import { completedCapture, paypalConfigured, paypalRequest, paypalRuntimeConfig } from './_lib/paypal.mjs'
import { fulfillPayPalOrder } from './_lib/fulfillment.mjs'

export function createCaptureHandler({ readOrder = getJson, runtimeConfig = paypalRuntimeConfig, configured = paypalConfigured, api = paypalRequest, fulfill = fulfillPayPalOrder } = {}) {
  return async function handler(request) {
    if (request.method !== 'POST') return json(405, { code: 'method_not_allowed' })
    if (!requireSameOrigin(request)) return json(403, { code: 'origin_not_allowed' })
    try {
      const body = await readJson(request)
      if (!/^ord_[a-f0-9-]{36}$/.test(String(body.orderId))) return json(400, { code: 'invalid_request' })
      const order = await readOrder(`orders/${body.orderId}`)
      if (!order || order.provider !== 'paypal' || !safeEqual(order.statusTokenHash, sha256(body.statusToken))) return json(404, { code: 'order_not_found' })
      if (body.paypalOrderId !== order.paypalOrderId) return json(422, { code: 'payment_mismatch' })
      const paypal = runtimeConfig()
      if (!configured(paypal) || paypal.environment !== order.environment || paypal.merchantId !== order.merchantId) return json(503, { code: 'checkout_not_configured' })
      if (order.state === 'fulfilled') return json(200, { state: 'fulfilled' })
      const path = `/v2/checkout/orders/${encodeURIComponent(order.paypalOrderId)}`
      let payload = await api(path, {}, paypal)
      if (payload.status === 'APPROVED') payload = await api(`${path}/capture`, { method: 'POST', body: {}, requestId: `${order.id}-capture` }, paypal)
      const capture = completedCapture(payload, order)
      if (!capture) return json(409, { code: 'payment_not_completed' })
      await fulfill(order, capture, siteOrigin(request))
      return json(200, { state: 'fulfilled' })
    } catch (error) {
      console.error('PayPal capture failed', { name: error?.name })
      return json(502, { code: 'payment_confirmation_unavailable' })
    }
  }
}

export default createCaptureHandler()
export const config = { path: '/api/aim-pack/paypal-capture' }
