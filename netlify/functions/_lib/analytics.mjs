export async function trackServerPurchase({ order, paymentId }) {
  const measurementId = process.env.GA4_MEASUREMENT_ID
  const apiSecret = process.env.GA4_API_SECRET
  if (!measurementId || !apiSecret) return false
  const endpoint = new URL('https://www.google-analytics.com/mp/collect')
  endpoint.searchParams.set('measurement_id', measurementId)
  endpoint.searchParams.set('api_secret', apiSecret)
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: order.gaClientId || `server.${order.id}`,
      events: [{ name: 'purchase', params: { transaction_id: paymentId, currency: 'USD', value: 1.99, ...(order.gaSessionId ? { session_id: Number(order.gaSessionId), engagement_time_msec: 1 } : {}), items: [{ item_id: 'aimcodes_crosshair_pack_v1', item_name: 'AimCodes Crosshair Pack', price: 1.99, quantity: 1 }] } }],
    }),
    signal: AbortSignal.timeout(5_000),
  })
  return response.ok
}
