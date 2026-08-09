import { DEFAULT_LOCALE, localePath, normalizeLocale } from '../i18n/localeRoutes.js'

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
])

export const SEO_COLLECTIONS = Object.freeze({
  best: Object.freeze({
    slug: 'best-valorant-crosshairs',
    crosshairIds: Object.freeze(['tenz', 'aspas-dot', 'forsaken', 'demon1', 'scream-dot', 'less', 'boaster', 'cned']),
  }),
  pro: Object.freeze({
    slug: 'pro-player-crosshairs',
    crosshairIds: Object.freeze(['tenz', 'aspas-dot', 'forsaken', 'demon1', 'scream-dot', 'less', 'boaster', 'cned', 'jinggg']),
  }),
  dot: Object.freeze({
    slug: 'dot-crosshairs',
    crosshairIds: Object.freeze(['aspas-dot', 'demon1', 'scream-dot', 'small-dot-thick', 'needle-cyan']),
  }),
  cute: Object.freeze({
    slug: 'cute-crosshairs',
    crosshairIds: Object.freeze(['cat-pink', 'pig-pink', 'heart-pink', 'flower-pink', 'bunny-white']),
  }),
  small: Object.freeze({
    slug: 'small-crosshairs',
    crosshairIds: Object.freeze(['forsaken', 'less', 'jinggg', 'small-dot-thick', 'needle-cyan', 'aspas-dot']),
  }),
})

export const SEO_COLLECTION_KEYS = Object.freeze(Object.keys(SEO_COLLECTIONS))

export const SEO_ARTICLES = Object.freeze({
  settings: Object.freeze({ slug: 'valorant-crosshair-settings' }),
  colors: Object.freeze({ slug: 'best-valorant-crosshair-colors' }),
})

export const SEO_ARTICLE_KEYS = Object.freeze(Object.keys(SEO_ARTICLES))

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
