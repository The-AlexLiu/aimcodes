import { json, readJson, requireSameOrigin } from './_lib/http.mjs'
import { buildPack, publicEntitlement } from './_lib/pack.mjs'
import { readAccessCookie } from './_lib/security.mjs'
import { paidStore } from './_lib/store.mjs'

export function createRegenerateHandler({ store = paidStore, readAccess = readAccessCookie } = {}) {
  return async function handler(request) {
    if (request.method !== 'POST') return json(405, { code: 'method_not_allowed' })
    if (!requireSameOrigin(request)) return json(403, { code: 'origin_not_allowed' })
    const id = readAccess(request)
    if (!id) return json(401, { code: 'access_required' })
    try {
      const { expectedVersion } = await readJson(request)
      if (!Number.isInteger(expectedVersion) || expectedVersion < 1 || expectedVersion > 2) return json(400, { code: 'version_required' })
      const storage = store()
      const key = `entitlements/${id}`
      const stored = await storage.getWithMetadata(key, { type: 'json' })
      const entitlement = stored?.data
      if (entitlement?.state !== 'active') return json(401, { code: 'access_required' })
      // Retrying a lost response returns the version already created, without
      // charging another rebuild. Conditional writes also protect two tabs.
      if (entitlement.version > expectedVersion) return json(200, { entitlement: publicEntitlement(entitlement) })
      if (entitlement.version !== expectedVersion || entitlement.regenerationsRemaining < 1) return json(409, { code: 'regeneration_limit_reached' })
      if (!stored.etag) throw new Error('missing_etag')
      const version = entitlement.version + 1
      const pack = buildPack(entitlement.input, version)
      const now = new Date().toISOString()
      const updated = { ...entitlement, version, pack, versions: [...(entitlement.versions || [{ version: entitlement.version, pack: entitlement.pack }]), { version, pack, createdAt: now }].slice(-3), regenerationsRemaining: entitlement.regenerationsRemaining - 1, updatedAt: now }
      const written = await storage.setJSON(key, updated, { onlyIfMatch: stored.etag })
      if (written.modified) return json(200, { entitlement: publicEntitlement(updated) })
      const current = await storage.get(key, { type: 'json' })
      if (current?.state === 'active' && current.version > expectedVersion) return json(200, { entitlement: publicEntitlement(current) })
      return json(503, { code: 'regeneration_retry' })
    } catch { return json(503, { code: 'regeneration_unavailable' }) }
  }
}

export default createRegenerateHandler()
export const config = { path: '/api/aim-pack/regenerate' }
