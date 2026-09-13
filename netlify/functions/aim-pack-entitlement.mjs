import { json } from './_lib/http.mjs'
import { publicEntitlement } from './_lib/pack.mjs'
import { readAccessCookie } from './_lib/security.mjs'
import { getJson } from './_lib/store.mjs'

export default async function handler(request) {
  if (request.method !== 'GET') return json(405, { code: 'method_not_allowed' })
  const entitlementId = readAccessCookie(request)
  const entitlement = entitlementId ? await getJson(`entitlements/${entitlementId}`) : null
  if (!entitlement || entitlement.state !== 'active') return json(401, { code: 'access_required' })
  return json(200, { entitlement: publicEntitlement(entitlement) })
}

export const config = { path: '/api/aim-pack/entitlement' }
