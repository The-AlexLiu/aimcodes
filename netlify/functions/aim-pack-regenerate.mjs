import { json, requireSameOrigin } from './_lib/http.mjs'
import { buildPack, publicEntitlement } from './_lib/pack.mjs'
import { readAccessCookie } from './_lib/security.mjs'
import { getJson, setJson } from './_lib/store.mjs'

export default async function handler(request) {
  if (request.method !== 'POST') return json(405, { code: 'method_not_allowed' })
  if (!requireSameOrigin(request)) return json(403, { code: 'origin_not_allowed' })
  const entitlementId = readAccessCookie(request)
  const entitlement = entitlementId ? await getJson(`entitlements/${entitlementId}`) : null
  if (!entitlement || entitlement.state !== 'active') return json(401, { code: 'access_required' })
  if (entitlement.regenerationsRemaining < 1 || entitlement.version >= 3) return json(409, { code: 'regeneration_limit_reached' })
  const version = entitlement.version + 1
  const pack = buildPack(entitlement.input, version)
  const updated = {
    ...entitlement,
    version,
    pack,
    versions: [...entitlement.versions, { version, pack, createdAt: new Date().toISOString() }].slice(-3),
    regenerationsRemaining: entitlement.regenerationsRemaining - 1,
    updatedAt: new Date().toISOString(),
  }
  await setJson(`entitlements/${entitlementId}`, updated)
  return json(200, { entitlement: publicEntitlement(updated) })
}

export const config = { path: '/api/aim-pack/regenerate' }
