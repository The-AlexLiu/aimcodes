import { sendAccessEmail } from './_lib/email.mjs'
import { json, readJson, requireSameOrigin, safeLocale, siteOrigin } from './_lib/http.mjs'
import { hmac, normalizeEmail, sha256 } from './_lib/security.mjs'
import { getJson, setJson } from './_lib/store.mjs'

export default async function handler(request) {
  if (request.method !== 'POST') return json(405, { code: 'method_not_allowed' })
  if (!requireSameOrigin(request)) return json(403, { code: 'origin_not_allowed' })
  try {
    const body = await readJson(request)
    const email = normalizeEmail(body.email)
    if (email) {
      const emailHash = hmac(`email:${email}`)
      const throttle = await getJson(`recoveries/${emailHash}`)
      const canSend = !throttle || Date.now() - new Date(throttle.sentAt).getTime() > 60_000
      const index = canSend ? await getJson(`email-index/${emailHash}`) : null
      const entitlement = index?.entitlementId ? await getJson(`entitlements/${index.entitlementId}`) : null
      if (entitlement?.state === 'active') {
        const token = hmac(`email-access:${entitlement.id}`)
        await setJson(`claims/${sha256(token)}`, { entitlementId: entitlement.id, state: 'active', purpose: 'email', createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 7 * 86_400_000).toISOString() })
        const siteUrl = siteOrigin(request)
        await sendAccessEmail({ email, locale: safeLocale(body.locale || entitlement.locale), accessUrl: `${siteUrl}/api/aim-pack/claim?t=${encodeURIComponent(token)}&locale=${encodeURIComponent(entitlement.locale)}` })
        await setJson(`recoveries/${emailHash}`, { sentAt: new Date().toISOString() })
      }
    }
  } catch (error) {
    console.warn('aim-pack recovery request not delivered', { name: error?.name })
  }
  return json(200, { accepted: true })
}

export const config = { path: '/api/aim-pack/recover' }
