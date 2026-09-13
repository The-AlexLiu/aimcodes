import { json, readJson, requireSameOrigin } from './_lib/http.mjs'
import { safeEqual, sha256 } from './_lib/security.mjs'
import { getJson } from './_lib/store.mjs'

export default async function handler(request) {
  if (request.method !== 'POST') return json(405, { code: 'method_not_allowed' })
  if (!requireSameOrigin(request)) return json(403, { code: 'origin_not_allowed' })
  try {
    const body = await readJson(request)
    const order = await getJson(`orders/${String(body.orderId || '')}`)
    if (!order || !safeEqual(order.statusTokenHash, sha256(body.statusToken))) return json(404, { state: 'not_found' })
    if (order.state === 'fulfilled' && safeEqual(order.browserClaimHash, sha256(body.claimToken))) {
      return json(200, { state: 'fulfilled', claimUrl: `/api/aim-pack/claim?t=${encodeURIComponent(body.claimToken)}&locale=${encodeURIComponent(order.locale)}` })
    }
    return json(200, { state: order.state === 'failed' ? 'failed' : 'pending' })
  } catch {
    return json(400, { code: 'invalid_request' })
  }
}

export const config = { path: '/api/aim-pack/status' }
