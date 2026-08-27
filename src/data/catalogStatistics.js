import { crosshairCollections, indexableCrosshairs } from './catalogManifest.js'

export const CROSSHAIR_STATISTICS_UPDATED_AT = '2026-08-27'

const colorAliases = Object.freeze({
  ciano: 'cyan',
  cyan: 'cyan',
  branco: 'white',
  white: 'white',
  verde: 'green',
  green: 'green',
  amarelo: 'yellow',
  yellow: 'yellow',
  vermelho: 'red',
  red: 'red',
  rosa: 'pink',
  pink: 'pink',
  magenta: 'pink',
  preto: 'black',
  black: 'black',
})

function rankedCounts(items, keyForItem) {
  const counts = new Map()
  items.forEach((item) => {
    const key = keyForItem(item)
    if (!key) return
    counts.set(key, (counts.get(key) || 0) + 1)
  })
  return Object.freeze(
    [...counts.entries()]
      .map(([key, count]) => Object.freeze({ key, count }))
      .sort((left, right) => right.count - left.count || left.key.localeCompare(right.key)),
  )
}

function normalizedColorKey(crosshair) {
  const raw = String(crosshair.colorKey || crosshair.colorName || '').trim().toLowerCase()
  return colorAliases[raw] || 'custom'
}

const featuredCollectionKeys = Object.freeze(['funny', 'small', 'dot', 'circle', 'pro'])

export const crosshairStatistics = Object.freeze({
  total: indexableCrosshairs.length,
  proCount: indexableCrosshairs.filter((crosshair) => crosshair.isPro).length,
  colorCount: new Set(indexableCrosshairs.map(normalizedColorKey)).size,
  colors: rankedCounts(indexableCrosshairs, normalizedColorKey),
  categories: rankedCounts(indexableCrosshairs, (crosshair) => crosshair.category),
  collections: Object.freeze(featuredCollectionKeys.map((key) => Object.freeze({
    key,
    count: crosshairCollections[key].crosshairIds.length,
  }))),
})

export function crosshairStatisticShare(count) {
  return Math.round((count / crosshairStatistics.total) * 100)
}
