import { catalogExpansionCrosshairs, crosshairs } from './crosshairs.js'
import { expansionIdsForFamily, indexableExpansionIds, indexableLimitForFamily } from './catalogExpansion.js'

const INDEXABLE_EXPANSION_IDS = Object.freeze(indexableExpansionIds(catalogExpansionCrosshairs))
const INDEXABLE_EXPANSION_SET = new Set(INDEXABLE_EXPANSION_IDS)

const indexedFamilyIds = (familyKey, limit = indexableLimitForFamily(familyKey)) => expansionIdsForFamily(catalogExpansionCrosshairs, familyKey, limit)
  .filter((id) => INDEXABLE_EXPANSION_SET.has(id))

const indexedColorIds = (colorKey, limit = 6) => catalogExpansionCrosshairs
  .filter((item) => INDEXABLE_EXPANSION_SET.has(item.id) && item.colorKey === colorKey)
  .slice(0, limit)
  .map((item) => item.id)

const primaryValue = (code, key, fallback = '0') => {
  const tokens = code.split(';')
  const primaryIndex = tokens.indexOf('P')
  for (let index = primaryIndex + 1; index < tokens.length; index += 2) {
    if (['P', 'A', 'S'].includes(tokens[index])) break
    if (tokens[index] === key) return tokens[index + 1] ?? fallback
  }
  return fallback
}

const lightweightSettings = (item) => ({
  outline: { enabled: primaryValue(item.code, 'h', '1') !== '0' && Number(primaryValue(item.code, 'o', '0.5')) > 0 },
  dot: { enabled: primaryValue(item.code, 'd') !== '0' && Number(primaryValue(item.code, 'a', '1')) > 0 },
  inner: {
    enabled: primaryValue(item.code, '0b', '1') !== '0' && Number(primaryValue(item.code, '0a', '0.8')) > 0 && Number(primaryValue(item.code, '0l', '6')) > 0,
    thickness: Number(primaryValue(item.code, '0t', '2')),
    offset: Number(primaryValue(item.code, '0o', '3')),
  },
})

const indexedCrosshairsMatching = (predicate, limit = 24) => catalogExpansionCrosshairs
  .filter((item) => INDEXABLE_EXPANSION_SET.has(item.id))
  .filter((item) => predicate(item, lightweightSettings(item)))
  .slice(0, limit)
  .map((item) => item.id)

const expansionHighlights = Object.freeze([
  ...indexedFamilyIds('microGap', 1),
  ...indexedFamilyIds('tapDot', 1),
  ...indexedFamilyIds('compactCross', 1),
  ...indexedFamilyIds('openCross', 1),
  ...indexedFamilyIds('tracker', 1),
  ...indexedFamilyIds('twinLine', 1),
  ...indexedFamilyIds('pinpoint', 1),
  ...indexedFamilyIds('outerMark', 1),
  ...indexedFamilyIds('tallAxis', 1),
  ...indexedFamilyIds('wideAxis', 1),
  ...indexedFamilyIds('burstRing', 1),
  ...indexedFamilyIds('guardFrame', 1),
])

export const catalogCrosshairs = crosshairs

export const indexableCrosshairIds = Object.freeze([
  'tenz',
  'aspas-dot',
  'forsaken',
  'demon1',
  'scream-dot',
  'less',
  'boaster',
  'cned',
  'jinggg',
  'sacy',
  'saadhak',
  'mwzera',
  'cortezia',
  'sato',
  'tteuw',
  'cat-pink',
  'pig-pink',
  'heart-pink',
  'flower-pink',
  'bunny-white',
  'small-dot-thick',
  'needle-cyan',
  ...INDEXABLE_EXPANSION_IDS,
])

export const crosshairCollections = Object.freeze({
  best: Object.freeze({
    slug: 'best-valorant-crosshairs',
    crosshairIds: Object.freeze(['tenz', 'aspas-dot', 'forsaken', 'demon1', 'scream-dot', 'less', 'boaster', 'cned', 'sacy', 'saadhak', ...expansionHighlights]),
  }),
  pro: Object.freeze({
    slug: 'pro-player-crosshairs',
    crosshairIds: Object.freeze(['tenz', 'aspas-dot', 'forsaken', 'demon1', 'scream-dot', 'less', 'boaster', 'cned', 'jinggg', 'sacy', 'saadhak', 'mwzera', 'cortezia', 'sato', 'tteuw']),
  }),
  dot: Object.freeze({
    slug: 'dot-crosshairs',
    crosshairIds: Object.freeze(['aspas-dot', 'demon1', 'scream-dot', 'small-dot-thick', 'needle-cyan', ...indexedFamilyIds('tapDot'), ...indexedFamilyIds('pinpoint')]),
  }),
  cute: Object.freeze({
    slug: 'cute-crosshairs',
    crosshairIds: Object.freeze(['cat-pink', 'pig-pink', 'heart-pink', 'flower-pink', 'bunny-white']),
  }),
  small: Object.freeze({
    slug: 'small-crosshairs',
    crosshairIds: Object.freeze(['forsaken', 'less', 'jinggg', 'small-dot-thick', 'needle-cyan', 'aspas-dot', ...indexedFamilyIds('microGap'), ...indexedFamilyIds('compactCross')]),
  }),
  circle: Object.freeze({
    slug: 'circle-crosshairs',
    keyword: 'valorant circle crosshair',
    priority: 'P0',
    crosshairIds: Object.freeze(['circle-dot-cyan', 'small-circle-cyan', 'hollow-mint', 'circle-diamond-green', 'bullseye-red', 'ripple-white', ...indexedFamilyIds('burstRing')]),
  }),
  pink: Object.freeze({
    slug: 'pink-crosshairs',
    keyword: 'pink valorant crosshair',
    priority: 'P0',
    crosshairIds: Object.freeze(['cat-pink', 'pig-pink', 'heart-pink', 'flower-pink', 'sakura-pink', 'spark-pink', 'petal-pink', 'bow-pink', ...indexedColorIds('pink')]),
  }),
  cyan: Object.freeze({
    slug: 'cyan-crosshairs',
    keyword: 'cyan valorant crosshair',
    priority: 'P0',
    crosshairIds: Object.freeze(['aspas-dot', 'tenz', 'boaster', 'recoil-c', 'circle-dot-cyan', 'flower-cyan', 'star-cyan', 'needle-cyan', 'micro-gap-cyan', 'tall-axis-cyan', ...indexedColorIds('cyan')]),
  }),
  green: Object.freeze({
    slug: 'green-crosshairs',
    keyword: 'green valorant crosshair',
    priority: 'P0',
    crosshairIds: Object.freeze(['jinggg', 'square-green', 'circle-diamond-green', 'dual-layer-green', 'have-fun-green', 'compact-green', 'wing-dot-green', 'stagger-green', 'clover-green', ...indexedColorIds('green')]),
  }),
  minimalist: Object.freeze({
    slug: 'minimalist-crosshairs',
    keyword: 'minimalist valorant crosshair',
    priority: 'P0',
    crosshairIds: Object.freeze(['aspas-dot', 'tenz', 'forsaken', 'demon1', 'less', 'needle-cyan', 'pin-white', 'micro-gap-cyan', ...indexedFamilyIds('microGap'), ...indexedFamilyIds('pinpoint')]),
  }),
  headshot: Object.freeze({
    slug: 'headshot-crosshairs',
    keyword: 'best valorant crosshair for headshots',
    priority: 'P0',
    crosshairIds: Object.freeze(['tenz', 'aspas-dot', 'forsaken', 'demon1', 'less', 'jinggg', 'needle-cyan', 'micro-gap-cyan', ...indexedFamilyIds('tallAxis'), ...indexedFamilyIds('wideAxis')]),
  }),
  beginner: Object.freeze({
    slug: 'beginner-crosshairs',
    keyword: 'best valorant crosshair for beginners',
    priority: 'P0',
    crosshairIds: Object.freeze(['tenz', 'boaster', 'jinggg', 'compact-green', 'micro-gap-cyan', 'recoil-c', 'short-wings-white', 'open-four-white', ...indexedFamilyIds('compactCross'), ...indexedFamilyIds('outerMark'), ...indexedFamilyIds('guardFrame')]),
  }),
  oneTap: Object.freeze({
    slug: 'one-tap-crosshairs',
    keyword: 'valorant one tap crosshair',
    priority: 'P0',
    crosshairIds: Object.freeze(['aspas-dot', 'demon1', 'scream-dot', 'forsaken', 'less', 'needle-cyan', 'pin-white', 'vcrdb-dot', ...indexedFamilyIds('tapDot'), ...indexedFamilyIds('pinpoint')]),
  }),
  vandal: Object.freeze({
    slug: 'vandal-crosshairs',
    keyword: 'best crosshair for vandal',
    priority: 'P0',
    crosshairIds: Object.freeze(['tenz', 'aspas-dot', 'forsaken', 'demon1', 'less', 'jinggg', 'cned', 'micro-gap-cyan', ...indexedFamilyIds('openCross'), ...indexedFamilyIds('twinLine')]),
  }),
  phantom: Object.freeze({
    slug: 'phantom-crosshairs',
    keyword: 'best crosshair for phantom',
    priority: 'P0',
    crosshairIds: Object.freeze(['tenz', 'boaster', 'jinggg', 'compact-green', 'recoil-c', 'short-wings-white', 'dual-layer-green', 'less', ...indexedFamilyIds('tracker'), ...indexedFamilyIds('twinLine')]),
  }),
  funny: Object.freeze({
    slug: 'funny-crosshairs',
    keyword: 'funny valorant crosshair codes',
    priority: 'P0',
    crosshairIds: Object.freeze(['cat-pink', 'pig-pink', 'heart-pink', 'flower-pink', 'bunny-white', ...indexedFamilyIds('burstRing', 8), ...indexedFamilyIds('guardFrame', 7)]),
  }),
  white: Object.freeze({
    slug: 'white-crosshairs',
    keyword: 'white valorant crosshair',
    priority: 'P1',
    crosshairIds: Object.freeze(indexedColorIds('white', 24)),
  }),
  red: Object.freeze({
    slug: 'red-crosshairs',
    keyword: 'red valorant crosshair',
    priority: 'P1',
    crosshairIds: Object.freeze(indexedColorIds('red', 24)),
  }),
  thin: Object.freeze({
    slug: 'thin-crosshairs',
    keyword: 'thin valorant crosshair',
    priority: 'P1',
    crosshairIds: Object.freeze(indexedCrosshairsMatching((item, settings) => settings.inner.enabled && settings.inner.thickness === 1, 24)),
  }),
  thick: Object.freeze({
    slug: 'thick-crosshairs',
    keyword: 'thick valorant crosshair',
    priority: 'P1',
    crosshairIds: Object.freeze(indexedCrosshairsMatching((item, settings) => settings.inner.enabled && settings.inner.thickness >= 3, 24)),
  }),
  centerDot: Object.freeze({
    slug: 'center-dot-crosshairs',
    keyword: 'valorant center dot crosshair',
    priority: 'P1',
    crosshairIds: Object.freeze(['demon1', 'scream-dot', 'less', 'small-dot-thick', 'needle-cyan', ...indexedCrosshairsMatching((item, settings) => settings.dot.enabled, 19)]),
  }),
  withOutlines: Object.freeze({
    slug: 'crosshairs-with-outlines',
    keyword: 'valorant crosshair with outline',
    priority: 'P1',
    crosshairIds: Object.freeze(['forsaken', 'demon1', 'scream-dot', 'less', 'boaster', 'jinggg', ...indexedCrosshairsMatching((item, settings) => settings.outline.enabled, 18)]),
  }),
  withoutOutlines: Object.freeze({
    slug: 'crosshairs-without-outlines',
    keyword: 'valorant crosshair no outline',
    priority: 'P1',
    crosshairIds: Object.freeze(['tenz', 'cned', 'needle-cyan', ...indexedCrosshairsMatching((item, settings) => !settings.outline.enabled, 21)]),
  }),
  openCenter: Object.freeze({
    slug: 'open-center-crosshairs',
    keyword: 'open center valorant crosshair',
    priority: 'P1',
    crosshairIds: Object.freeze(['forsaken', ...indexedCrosshairsMatching((item, settings) => settings.inner.enabled && settings.inner.offset >= 3, 23)]),
  }),
  closed: Object.freeze({
    slug: 'closed-crosshairs',
    keyword: 'closed valorant crosshair',
    priority: 'P1',
    crosshairIds: Object.freeze(['tenz', 'scream-dot', 'less', 'boaster', 'cned', ...indexedCrosshairsMatching((item, settings) => settings.inner.enabled && settings.inner.offset <= 1, 19)]),
  }),
})

export const crosshairCollectionKeys = Object.freeze(Object.keys(crosshairCollections))

const crosshairById = new Map(catalogCrosshairs.map((item) => [item.id, item]))

export const indexableCrosshairs = Object.freeze(indexableCrosshairIds.map((id) => crosshairById.get(id)).filter(Boolean))

export function getCatalogCrosshair(id) {
  return crosshairById.get(id) || null
}

export function collectionKeysForCatalogCrosshair(crosshairId) {
  return crosshairCollectionKeys.filter((collectionKey) => crosshairCollections[collectionKey].crosshairIds.includes(crosshairId))
}

export const catalogManifest = Object.freeze({
  all: catalogCrosshairs,
  indexable: indexableCrosshairs,
  indexableIds: indexableCrosshairIds,
  collections: crosshairCollections,
  collectionKeys: crosshairCollectionKeys,
})
