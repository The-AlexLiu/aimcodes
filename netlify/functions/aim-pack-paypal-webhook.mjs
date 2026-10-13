import { json, readJson, siteOrigin } from './_lib/http.mjs'
import { getJson } from './_lib/store.mjs'
import { completedCapture, paypalConfigured, paypalRequest, paypalRuntimeConfig, webhookVerificationBody } from './_lib/paypal.mjs'
import { fulfillPayPalOrder } from './_lib/fulfillment.mjs'

export function createWebhookHandler({ readOrder = getJson, runtimeConfig = paypalRuntimeConfig, configured = paypalConfigured, api = paypalRequest, fulfill = fulfillPayPalOrder } = {}) {
  return async function handler(request) {
    if (request.method !== 'POST') return json(405, { code: 'method_not_allowed' })
    // Reject unsigned requests before credentials, parsing or provider requests.
    if (!request.headers.get('paypal-transmission-sig')) return json(401, { code: 'invalid_signature' })
    try {
      const paypal = runtimeConfig()
      if (!configured(paypal)) return json(503, { code: 'webhook_not_configured' })
      const event = await readJson(request, 65_536)
      const verification = webhookVerificationBody(request, event, paypal.webhookId)
      if (!verification) return json(401, { code: 'invalid_signature' })
      const verified = await api('/v1/notifications/verify-webhook-signature', { method: 'POST', body: verification }, paypal)
      if (verified.verification_status !== 'SUCCESS') return json(401, { code: 'invalid_signature' })
      if (event.event_type !== 'PAYMENT.CAPTURE.COMPLETED') return json(200, { state: 'ignored' })
      const paypalId = String(event.resource?.supplementary_data?.related_ids?.order_id || '')
      if (!/^[A-Z0-9]{10,32}$/.test(paypalId)) return json(400, { code: 'invalid_payload' })
      const index = await readOrder(`paypal-orders/${paypalId}`)
      // Other products in the same merchant account are outside this integration.
      if (!index) return json(200, { state: 'ignored' })
      const order = await readOrder(`orders/${index.orderId}`)
      if (!order || order.provider !== 'paypal' || order.environment !== paypal.environment || (paypal.merchantId && order.merchantId !== paypal.merchantId)) return json(422, { code: 'payment_mismatch' })
      const payload = await api(`/v2/checkout/orders/${paypalId}`, {}, paypal)
      const capture = completedCapture(payload, order)
      if (!capture || capture.id !== event.resource.id) return json(422, { code: 'payment_mismatch' })
      await fulfill(order, capture, siteOrigin(request))
      return json(200, { state: 'fulfilled' })
    } catch (error) {
      console.error('PayPal webhook failed', { name: error?.name })
      return json(500, { code: 'confirmation_failed' })
    }
  }
}

export default createWebhookHandler()
export const config = { path: '/api/aim-pack/paypal-webhook' }
