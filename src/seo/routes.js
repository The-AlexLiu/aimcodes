import { DEFAULT_LOCALE, localePath, normalizeLocale } from '../i18n/localeRoutes.js'
import {
  collectionKeysForCatalogCrosshair,
  crosshairCollectionKeys,
  crosshairCollections,
  indexableCrosshairIds,
} from '../data/catalogManifest.js'

// Compatibility exports keep existing route and content modules stable while the
// catalog manifest remains the single source for index and collection decisions.
export const SEO_CROSSHAIR_IDS = indexableCrosshairIds
export const SEO_COLLECTIONS = crosshairCollections
export const SEO_COLLECTION_KEYS = crosshairCollectionKeys
export const collectionKeysForCrosshair = collectionKeysForCatalogCrosshair

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
  exportCrosshair: Object.freeze({ slug: 'how-to-export-valorant-crosshair', keyword: 'how to export valorant crosshair', priority: 'P0' }),
  shareCrosshair: Object.freeze({ slug: 'how-to-share-valorant-crosshair', keyword: 'how to share valorant crosshair', priority: 'P1' }),
  resetCrosshair: Object.freeze({ slug: 'how-to-reset-valorant-crosshair', keyword: 'how to reset valorant crosshair', priority: 'P1' }),
  saveMultiple: Object.freeze({ slug: 'how-to-save-multiple-crosshairs-valorant', keyword: 'save multiple valorant crosshairs', priority: 'P1' }),
  customColor: Object.freeze({ slug: 'how-to-use-custom-crosshair-color-valorant', keyword: 'valorant custom crosshair color', priority: 'P0' }),
  outlinesOnOff: Object.freeze({ slug: 'valorant-crosshair-outlines-on-or-off', keyword: 'valorant crosshair outlines on or off', priority: 'P1' }),
  centerDotOnOff: Object.freeze({ slug: 'valorant-center-dot-on-or-off', keyword: 'valorant center dot on or off', priority: 'P1' }),
  innerVsOuter: Object.freeze({ slug: 'valorant-inner-lines-vs-outer-lines', keyword: 'valorant inner lines vs outer lines', priority: 'P1' }),
  thickness: Object.freeze({ slug: 'valorant-crosshair-thickness', keyword: 'valorant crosshair thickness', priority: 'P1' }),
  gapOffset: Object.freeze({ slug: 'valorant-crosshair-gap-offset', keyword: 'valorant crosshair offset gap', priority: 'P1' }),
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
