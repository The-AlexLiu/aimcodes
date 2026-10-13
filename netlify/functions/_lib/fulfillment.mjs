import { buildPack } from './pack.mjs'
import { sendAccessEmail } from './email.mjs'
import { trackServerPurchase } from './analytics.mjs'
import { hmac, normalizeEmail, sha256, stablePrivateId } from './security.mjs'
import { paidStore } from './store.mjs'

// Atomic create prevents parallel capture/webhook retries from resetting a used pack.
export async function fulfillPayPalOrder(order, capture, origin, store = paidStore()) {
  const paymentId = `paypal_${capture.id}`
  const entitlementId = stablePrivateId('ent', paymentId)
  const email = normalizeEmail(order.email)
  const now = new Date().toISOString()
  const pack = buildPack(order.input, 1)
  await store.setJSON(`entitlements/${entitlementId}`, {
    id: entitlementId, state: 'active', productId: order.productId, paymentId, orderId: order.id, provider: 'paypal', email,
    locale: order.locale, input: order.input, version: 1, versions: [{ version: 1, pack, createdAt: now }], pack,
    regenerationsRemaining: 2, createdAt: now, updatedAt: now,
  }, { onlyIfNew: true })
  const emailToken = hmac(`email-access:${entitlementId}`)
  await store.setJSON(`claims/${order.browserClaimHash}`, { entitlementId, state: 'active', purpose: 'browser', createdAt: now, expiresAt: new Date(Date.now() + 86_400_000).toISOString() }, { onlyIfNew: true })
  await store.setJSON(`claims/${sha256(emailToken)}`, { entitlementId, state: 'active', purpose: 'email', createdAt: now, expiresAt: new Date(Date.now() + 7 * 86_400_000).toISOString() }, { onlyIfNew: true })
  if (email) await store.setJSON(`email-index/${hmac(`email:${email}`)}`, { entitlementId, updatedAt: now })
  await store.setJSON(`orders/${order.id}`, { ...order, state: 'fulfilled', paymentId, entitlementId, updatedAt: now })
  await store.setJSON(`payments/${paymentId}`, { state: 'fulfilled', orderId: order.id, entitlementId, updatedAt: now })
  // Only one concurrent caller claims best-effort notifications. Delivery itself
  // is durable first; email outages must not withhold the customer's pack.
  const notification = await store.setJSON(`notifications/${paymentId}`, { createdAt: now }, { onlyIfNew: true })
  if (notification.modified) {
    await Promise.allSettled([
      sendAccessEmail({ email, locale: order.locale, accessUrl: `${origin}/api/aim-pack/claim?t=${encodeURIComponent(emailToken)}&locale=${encodeURIComponent(order.locale)}` }),
      trackServerPurchase({ order, paymentId }),
    ])
  }
  return entitlementId
}
