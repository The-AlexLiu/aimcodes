import { accessCookieHeader, createAccessCookie, sha256 } from './_lib/security.mjs'
import { getJson, setJson } from './_lib/store.mjs'
import { safeLocale } from './_lib/http.mjs'

export default async function handler(request) {
  if (request.method !== 'GET') return new Response('method_not_allowed', { status: 405 })
  const url = new URL(request.url)
  const token = url.searchParams.get('t') || ''
  const claimKey = `claims/${sha256(token)}`
  const claim = token.length >= 32 ? await getJson(claimKey) : null
  const entitlement = claim?.entitlementId ? await getJson(`entitlements/${claim.entitlementId}`) : null
  if (!claim || claim.state !== 'active' || new Date(claim.expiresAt).getTime() <= Date.now() || entitlement?.state !== 'active') {
    return Response.redirect(`${url.origin}/${safeLocale(url.searchParams.get('locale'))}/recover-aim-pack/`, 302)
  }
  if (claim.purpose === 'browser') await setJson(claimKey, { ...claim, state: 'used', usedAt: new Date().toISOString() })
  const cookie = createAccessCookie(claim.entitlementId)
  return new Response(null, {
    status: 302,
    headers: {
      Location: `/${entitlement.locale || safeLocale(url.searchParams.get('locale'))}/my-aim-pack/`,
      'Set-Cookie': accessCookieHeader(cookie),
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

export const config = { path: '/api/aim-pack/claim' }
