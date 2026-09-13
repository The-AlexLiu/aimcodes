export const AIM_PACK_PRODUCT = Object.freeze({
  id: 'aimcodes_crosshair_pack_v1',
  name: 'AimCodes Crosshair Pack',
  price: 1.99,
  currency: 'usd',
  maxRegenerations: 2,
  maxVersions: 3,
})

export const AIM_PACK_CHECKOUT_STORAGE_KEY = 'aimcodes-checkout-v1'

export const AIM_PACK_ROLES = Object.freeze(['allRound', 'closeRange', 'longRange', 'visibility', 'fun'])
export const AIM_PACK_MODES = Object.freeze(['ranked', 'deathmatch', 'fun'])
export const AIM_PACK_VISUALS = Object.freeze(['minimal', 'balanced', 'visible'])

const rolePools = Object.freeze({
  allRound: Object.freeze(['tenz', 'less', 'boaster', 'jinggg', 'compact-green']),
  closeRange: Object.freeze(['forsaken', 'micro-gap-cyan', 'less', 'compact-green', 'open-four-white']),
  longRange: Object.freeze(['aspas-dot', 'demon1', 'needle-cyan', 'scream-dot', 'pin-white']),
  visibility: Object.freeze(['boaster', 'beacon-yellow', 'pulse-red', 'compact-green', 'slim-yellow']),
  fun: Object.freeze(['heart-pink', 'cat-pink', 'bunny-white', 'star-cyan', 'among-us-cyan']),
})

const resultBias = Object.freeze({
  precision: Object.freeze(['aspas-dot', 'needle-cyan', 'demon1']),
  balanced: Object.freeze(['tenz', 'less', 'compact-green']),
  steady: Object.freeze(['jinggg', 'micro-gap-cyan', 'open-four-white']),
  visibility: Object.freeze(['boaster', 'beacon-yellow', 'pulse-red']),
})

function stableHash(value) {
  let hash = 2166136261
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function rotate(items, amount) {
  if (!items.length) return []
  const offset = amount % items.length
  return [...items.slice(offset), ...items.slice(0, offset)]
}

export function normalizeAimPackInput(input = {}) {
  const average = Math.min(2000, Math.max(100, Math.round(Number(input.average) || 300)))
  const consistency = Math.min(1000, Math.max(0, Math.round(Number(input.consistency) || 0)))
  const best = Math.min(2000, Math.max(100, Math.round(Number(input.best) || average)))
  const profile = Object.hasOwn(resultBias, input.profile) ? input.profile : 'balanced'
  const mode = AIM_PACK_MODES.includes(input.mode) ? input.mode : 'ranked'
  const visual = AIM_PACK_VISUALS.includes(input.visual) ? input.visual : 'balanced'
  return { average, consistency, best, profile, mode, visual }
}

export function generateAimPack(input = {}, availableIds = [], version = 1) {
  const normalized = normalizeAimPackInput(input)
  const allowed = new Set(availableIds)
  const used = new Set()
  const seed = stableHash(`${normalized.average}:${normalized.consistency}:${normalized.profile}:${normalized.mode}:${normalized.visual}:${version}`)

  return AIM_PACK_ROLES.map((role, index) => {
    const bias = role === 'allRound' ? resultBias[normalized.profile] : []
    const preferenceBias = normalized.visual === 'minimal'
      ? ['needle-cyan', 'aspas-dot', 'demon1', 'forsaken']
      : normalized.visual === 'visible'
        ? ['boaster', 'beacon-yellow', 'pulse-red', 'compact-green']
        : []
    const modeBias = normalized.mode === 'fun' && role === 'fun'
      ? ['heart-pink', 'cat-pink', 'bunny-white']
      : normalized.mode === 'deathmatch'
        ? ['micro-gap-cyan', 'forsaken', 'tenz']
        : []
    const candidates = rotate([...new Set([...bias, ...preferenceBias, ...modeBias, ...rolePools[role]])], seed + index * 7)
    const crosshairId = candidates.find((id) => allowed.has(id) && !used.has(id))
      || availableIds.find((id) => !used.has(id))
    if (!crosshairId) throw new Error(`No available crosshair for ${role}`)
    used.add(crosshairId)
    return Object.freeze({ role, crosshairId })
  })
}
