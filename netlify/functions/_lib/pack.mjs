import { crosshairs } from '../../../src/data/crosshairs.js'
import { AIM_PACK_PRODUCT, generateAimPack, normalizeAimPackInput } from '../../../src/utils/paidPack.js'

const availableIds = crosshairs.map((item) => item.id)

export function sanitizePackInput(body = {}) {
  const result = body.result || {}
  const preferences = body.preferences || {}
  return normalizeAimPackInput({
    average: result.average,
    consistency: result.consistency,
    best: result.best,
    profile: result.profile,
    mode: preferences.mode,
    visual: preferences.visual,
    weapon: preferences.weapon,
  })
}

export function buildPack(input, version = 1) {
  return generateAimPack(input, availableIds, version)
}

export function publicEntitlement(entitlement) {
  return {
    id: entitlement.id,
    productId: AIM_PACK_PRODUCT.id,
    state: entitlement.state,
    version: entitlement.version,
    regenerationsRemaining: entitlement.regenerationsRemaining,
    pack: entitlement.pack,
    updatedAt: entitlement.updatedAt,
  }
}
