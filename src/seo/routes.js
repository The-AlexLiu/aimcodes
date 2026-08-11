import { DEFAULT_LOCALE, localePath, normalizeLocale } from '../i18n/localeRoutes.js'
import { catalogExpansionCrosshairs } from '../data/crosshairs.js'
import { expansionIdsForFamily, indexableExpansionIds } from '../data/catalogExpansion.js'

const INDEXABLE_EXPANSION_IDS = Object.freeze(indexableExpansionIds(catalogExpansionCrosshairs))
const INDEXABLE_EXPANSION_SET = new Set(INDEXABLE_EXPANSION_IDS)
const indexedFamilyIds = (familyKey, limit = 7) => expansionIdsForFamily(catalogExpansionCrosshairs, familyKey, limit)
  .filter((id) => INDEXABLE_EXPANSION_SET.has(id))
const indexedColorIds = (colorKey, limit = 6) => catalogExpansionCrosshairs
  .filter((item) => INDEXABLE_EXPANSION_SET.has(item.id) && item.colorKey === colorKey)
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

export const SEO_CROSSHAIR_IDS = Object.freeze([
  'tenz',
  'aspas-dot',
  'forsaken',
  'demon1',
  'scream-dot',
  'less',
  'boaster',
  'cned',
  'jinggg',
  'cat-pink',
  'pig-pink',
  'heart-pink',
  'flower-pink',
  'bunny-white',
  'small-dot-thick',
  'needle-cyan',
  ...INDEXABLE_EXPANSION_IDS,
])

export const SEO_COLLECTIONS = Object.freeze({
  best: Object.freeze({
    slug: 'best-valorant-crosshairs',
    crosshairIds: Object.freeze(['tenz', 'aspas-dot', 'forsaken', 'demon1', 'scream-dot', 'less', 'boaster', 'cned', ...expansionHighlights]),
  }),
  pro: Object.freeze({
    slug: 'pro-player-crosshairs',
    crosshairIds: Object.freeze(['tenz', 'aspas-dot', 'forsaken', 'demon1', 'scream-dot', 'less', 'boaster', 'cned', 'jinggg']),
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
})

export const SEO_COLLECTION_KEYS = Object.freeze(Object.keys(SEO_COLLECTIONS))

export function collectionKeysForCrosshair(crosshairId) {
  return SEO_COLLECTION_KEYS.filter((collectionKey) => SEO_COLLECTIONS[collectionKey].crosshairIds.includes(crosshairId))
}

export const SEO_ARTICLES = Object.freeze({
  settings: Object.freeze({ slug: 'valorant-crosshair-settings' }),
  colors: Object.freeze({ slug: 'best-valorant-crosshair-colors' }),
  copy: Object.freeze({ slug: 'how-to-copy-crosshair-in-valorant', keyword: 'how to copy crosshair in valorant', priority: 'P0' }),
  notWorking: Object.freeze({ slug: 'valorant-crosshair-code-not-working', keyword: 'valorant crosshair code not working', priority: 'P0' }),
  makeDot: Object.freeze({ slug: 'how-to-make-dot-crosshair-valorant', keyword: 'how to make dot crosshair valorant', priority: 'P0' }),
  makeCircle: Object.freeze({ slug: 'how-to-make-circle-crosshair-valorant', keyword: 'how to make circle crosshair valorant', priority: 'P0' }),
  movementError: Object.freeze({ slug: 'valorant-movement-error-crosshair', keyword: 'valorant movement error', priority: 'P0' }),
  firingError: Object.freeze({ slug: 'valorant-firing-error-crosshair', keyword: 'valorant firing error', priority: 'P0' }),
  movementVsFiring: Object.freeze({ slug: 'movement-error-vs-firing-error-valorant', keyword: 'movement error vs firing error valorant', priority: 'P0' }),
  staticVsDynamic: Object.freeze({ slug: 'static-vs-dynamic-crosshair-valorant', keyword: 'static vs dynamic crosshair valorant', priority: 'P0' }),
  dotVsCross: Object.freeze({ slug: 'dot-vs-cross-crosshair-valorant', keyword: 'dot vs cross crosshair valorant', priority: 'P0' }),
  placement: Object.freeze({ slug: 'valorant-crosshair-placement-guide', keyword: 'valorant crosshair placement', priority: 'P0' }),
})

export const SEO_ARTICLE_KEYS = Object.freeze(Object.keys(SEO_ARTICLES))

export const SEO_TOOLS = Object.freeze({
  generator: Object.freeze({ slug: 'valorant-crosshair-generator', keyword: 'valorant crosshair generator', priority: 'P0', indexable: true }),
  decoder: Object.freeze({ slug: 'valorant-crosshair-code-decoder', keyword: 'valorant crosshair code decoder', priority: 'P0', indexable: true }),
  preview: Object.freeze({ slug: 'valorant-crosshair-preview', keyword: 'valorant crosshair preview', priority: 'P0', indexable: true }),
  comparison: Object.freeze({ slug: 'valorant-crosshair-comparison', keyword: 'compare valorant crosshairs', priority: 'P1', indexable: true }),
})

export const SEO_TOOL_KEYS = Object.freeze(Object.keys(SEO_TOOLS))

export const TRUST_PAGES = Object.freeze({
  about: Object.freeze({ slug: 'about', indexable: true }),
  privacy: Object.freeze({ slug: 'privacy', indexable: false }),
  terms: Object.freeze({ slug: 'terms', indexable: false }),
  contact: Object.freeze({ slug: 'contact', indexable: false }),
})

export const TRUST_PAGE_KEYS = Object.freeze(Object.keys(TRUST_PAGES))

const slugToCollectionKey = Object.fromEntries(
  Object.entries(SEO_COLLECTIONS).map(([key, collection]) => [collection.slug, key]),
)

const slugToArticleKey = Object.fromEntries(
  Object.entries(SEO_ARTICLES).map(([key, article]) => [article.slug, key]),
)

const slugToToolKey = Object.fromEntries(
  Object.entries(SEO_TOOLS).map(([key, tool]) => [tool.slug, key]),
)

const slugToTrustPageKey = Object.fromEntries(
  Object.entries(TRUST_PAGES).map(([key, page]) => [page.slug, key]),
)

export const CROSSHAIR_SLUGS = Object.freeze({
  'aspas-dot': 'aspas',
  tenz: 'tenz',
  forsaken: 'forsaken',
  demon1: 'demon1',
  'scream-dot': 'scream',
  less: 'less',
  boaster: 'boaster',
  cned: 'cned',
  jinggg: 'jinggg',
  yay: 'yay',
  'recoil-c': 'recoil-c',
  'vcrdb-dot': 'micro-dot',
  'cat-pink': 'cat',
  'pig-pink': 'pig',
})

const slugToCrosshairId = Object.fromEntries(
  Object.entries(CROSSHAIR_SLUGS).map(([id, slug]) => [slug, id]),
)

export function crosshairSlug(id) {
  return CROSSHAIR_SLUGS[id] || id
}

export function routePath(locale, route = { type: 'home' }) {
  const prefix = localePath(locale).replace(/\/$/, '')
  if (route.type === 'catalog') return `${prefix}/crosshairs/`
  if (route.type === 'crosshair') return `${prefix}/crosshairs/${crosshairSlug(route.crosshairId)}/`
  if (route.type === 'collection') return `${prefix}/${SEO_COLLECTIONS[route.collectionKey]?.slug || SEO_COLLECTIONS.best.slug}/`
  if (route.type === 'article') return `${prefix}/${SEO_ARTICLES[route.articleKey]?.slug || SEO_ARTICLES.settings.slug}/`
  if (route.type === 'tool') return `${prefix}/tools/${SEO_TOOLS[route.toolKey]?.slug || SEO_TOOLS.generator.slug}/`
  if (route.type === 'trust') return `${prefix}/${TRUST_PAGES[route.pageKey]?.slug || TRUST_PAGES.about.slug}/`
  if (route.type === 'finder') return `${prefix}/reaction-time-test/`
  if (route.type === 'guide') return `${prefix}/how-to-import-valorant-crosshair/`
  return `${prefix}/`
}

export function parseSeoRoute(pathname = '/') {
  const segments = String(pathname).split('/').filter(Boolean)
  const locale = normalizeLocale(segments[0]) || DEFAULT_LOCALE
  const rest = segments.slice(1)

  if (rest.length === 0) return { locale, type: 'home' }
  if (rest.length === 1 && rest[0] === 'crosshairs') return { locale, type: 'catalog' }
  if (rest.length === 1 && rest[0] === 'reaction-time-test') return { locale, type: 'finder' }
  if (rest.length === 1 && rest[0] === 'how-to-import-valorant-crosshair') return { locale, type: 'guide' }
  if (rest.length === 1 && slugToCollectionKey[rest[0]]) return { locale, type: 'collection', collectionKey: slugToCollectionKey[rest[0]] }
  if (rest.length === 1 && slugToArticleKey[rest[0]]) return { locale, type: 'article', articleKey: slugToArticleKey[rest[0]] }
  if (rest.length === 1 && slugToTrustPageKey[rest[0]]) return { locale, type: 'trust', pageKey: slugToTrustPageKey[rest[0]] }
  if (rest.length === 2 && rest[0] === 'crosshairs') {
    return { locale, type: 'crosshair', crosshairId: slugToCrosshairId[rest[1]] || rest[1] }
  }
  if (rest.length === 2 && rest[0] === 'tools' && slugToToolKey[rest[1]]) {
    return { locale, type: 'tool', toolKey: slugToToolKey[rest[1]] }
  }
  return { locale, type: 'notFound' }
}

export function localizedRoutePath(locale, route) {
  return routePath(locale, route.type === 'notFound' ? { type: 'home' } : route)
}

export function isPriorityCrosshair(id) {
  return SEO_CROSSHAIR_IDS.includes(id)
}

export function isIndexableRoute(route) {
  if (route.type === 'crosshair') return isPriorityCrosshair(route.crosshairId)
  if (route.type === 'trust') return TRUST_PAGES[route.pageKey]?.indexable === true
  if (route.type === 'tool') return SEO_TOOLS[route.toolKey]?.indexable === true
  if (route.type === 'notFound') return false
  return true
}

export function redirectLegacyAppUrl(locationLike = window.location) {
  const route = parseSeoRoute(locationLike.pathname)
  if (route.type !== 'home') return false

  const params = new URLSearchParams(locationLike.search || '')
  const finder = params.get('finder') === '1'
  const crosshairId = params.get('mira')
  if (!finder && !crosshairId) return false

  const targetRoute = finder
    ? { type: 'finder' }
    : { type: 'crosshair', crosshairId }
  params.delete('finder')
  params.delete('mira')
  params.delete('lang')
  const query = params.toString()
  locationLike.replace(`${routePath(route.locale, targetRoute)}${query ? `?${query}` : ''}${locationLike.hash || ''}`)
  return true
}
