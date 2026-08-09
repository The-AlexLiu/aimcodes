import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { crosshairs } from '../src/data/crosshairs.js'
import { createTranslator, localizeCrosshair } from '../src/i18n/translations.js'
import { localeRoutes } from '../src/i18n/localeRoutes.js'
import { routeMetadata, SEO_CONTENT_UPDATED_AT, SITE_ORIGIN } from '../src/seo/content.js'
import { articleCopy } from '../src/seo/articles.js'
import { isIndexableRoute, isPriorityCrosshair, routePath, SEO_ARTICLE_KEYS, SEO_COLLECTION_KEYS, SEO_COLLECTIONS, SEO_CROSSHAIR_IDS, TRUST_PAGE_KEYS, TRUST_PAGES } from '../src/seo/routes.js'
import { SOCIAL_PROFILE_URLS } from '../src/config/socialLinks.js'
import { TRUST_UPDATED_AT, trustCopy } from '../src/seo/trustContent.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const errors = []
const indexedCanonicalUrls = new Set()
const indexedTitles = new Set()
let generatedRoutes = 0
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')

for (const locale of Object.keys(localeRoutes)) {
  const t = createTranslator(locale)
  const localizedCrosshairs = crosshairs.map((item) => localizeCrosshair(item, locale, t))
  const routes = [
    { type: 'home' },
    { type: 'catalog' },
    { type: 'finder' },
    { type: 'guide' },
    ...SEO_COLLECTION_KEYS.map((collectionKey) => ({ type: 'collection', collectionKey })),
    ...SEO_ARTICLE_KEYS.map((articleKey) => ({ type: 'article', articleKey })),
    ...TRUST_PAGE_KEYS.map((pageKey) => ({ type: 'trust', pageKey })),
    ...localizedCrosshairs.map((item) => ({ type: 'crosshair', crosshairId: item.id })),
  ]

  for (const route of routes) {
    const crosshair = route.type === 'crosshair'
      ? localizedCrosshairs.find((item) => item.id === route.crosshairId)
      : null
    const indexed = isIndexableRoute(route)
    const path = routePath(locale, route)
    const filePath = resolve(distRoot, path.slice(1), 'index.html')
    generatedRoutes += 1

    try {
      await access(filePath)
      const html = await readFile(filePath, 'utf8')
      const metadata = routeMetadata(locale, route, crosshair)
      const robots = indexed ? 'index,follow,max-image-preview:large' : 'noindex,follow'
      const expected = [
        `<title>${escapeHtml(metadata.title)}</title>`,
        `<meta name="description" content="${metadata.description}" />`,
        `<meta name="robots" content="${robots}" />`,
        `<link rel="canonical" href="${metadata.canonical}" />`,
        '<meta property="og:image" content="https://aimcodes.com/og-aimcodes.png" />',
        '<meta name="twitter:card" content="summary_large_image" />',
        '<script type="application/ld+json">',
        '"@type":"Organization"',
        '"sameAs":',
        '<main class="seo-static-shell"><h1>',
        '<script type="module" crossorigin src="/assets/',
      ]
      for (const value of expected) if (!html.includes(value)) errors.push(`${path}: missing ${value}`)
      for (const profileUrl of SOCIAL_PROFILE_URLS) {
        if (!html.includes(profileUrl)) errors.push(`${path}: missing official social profile ${profileUrl}`)
      }
      for (const config of Object.values(localeRoutes)) {
        if (!html.includes(`hreflang="${config.hreflang}"`)) errors.push(`${path}: missing hreflang ${config.hreflang}`)
      }
      if (route.type === 'crosshair' && !html.includes(crosshair.code)) errors.push(`${path}: crosshair code missing from initial HTML`)
      if (route.type === 'collection') {
        if (!html.includes('"@type":"FAQPage"')) errors.push(`${path}: FAQPage structured data missing`)
        if (!html.includes('<h2>FAQ</h2>')) errors.push(`${path}: visible FAQ missing from initial HTML`)
        for (const id of SEO_COLLECTIONS[route.collectionKey].crosshairIds) {
          const item = localizedCrosshairs.find((crosshairItem) => crosshairItem.id === id)
          if (!item || !html.includes(routePath(locale, { type: 'crosshair', crosshairId: id }))) errors.push(`${path}: missing collection link for ${id}`)
        }
      }
      if (route.type === 'guide') {
        if (!html.includes('"@type":"HowTo"')) errors.push(`${path}: HowTo structured data missing`)
        if (!html.includes('"@type":"FAQPage"')) errors.push(`${path}: guide FAQPage structured data missing`)
        if (!html.includes('<h2>FAQ</h2>')) errors.push(`${path}: guide FAQ missing from initial HTML`)
      }
      if (route.type === 'article') {
        const article = articleCopy(locale, route.articleKey)
        if (!html.includes('"@type":"Article"')) errors.push(`${path}: Article structured data missing`)
        if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`${path}: article BreadcrumbList missing`)
        if (!html.includes('"@type":"FAQPage"')) errors.push(`${path}: article FAQPage missing`)
        for (const id of article.recommendedCrosshairIds) {
          if (!html.includes(routePath(locale, { type: 'crosshair', crosshairId: id }))) errors.push(`${path}: missing recommended crosshair link for ${id}`)
        }
      }
      if (route.type === 'trust') {
        const page = trustCopy(locale, route.pageKey)
        if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`${path}: trust BreadcrumbList missing`)
        if (!html.includes(TRUST_UPDATED_AT)) errors.push(`${path}: trust updated date missing`)
        for (const section of page.sections) {
          if (!html.includes(escapeHtml(section.title))) errors.push(`${path}: missing trust section ${section.title}`)
        }
      }
      if (indexed) {
        if (indexedCanonicalUrls.has(metadata.canonical)) errors.push(`${path}: duplicate canonical ${metadata.canonical}`)
        if (indexedTitles.has(metadata.title)) errors.push(`${path}: duplicate indexed title ${metadata.title}`)
        indexedCanonicalUrls.add(metadata.canonical)
        indexedTitles.add(metadata.title)
      }
    } catch (error) {
      errors.push(`${path}: ${error.message}`)
    }
  }
}

const sitemap = await readFile(resolve(distRoot, 'sitemap.xml'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const indexableTrustPages = Object.values(TRUST_PAGES).filter((page) => page.indexable).length
const expectedIndexedCount = Object.keys(localeRoutes).length * (4 + SEO_COLLECTION_KEYS.length + SEO_ARTICLE_KEYS.length + SEO_CROSSHAIR_IDS.length + indexableTrustPages)
if (sitemapUrls.length !== expectedIndexedCount) errors.push(`sitemap.xml: expected ${expectedIndexedCount} URLs, found ${sitemapUrls.length}`)
if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap.xml: duplicate <loc> entries')
if (sitemapUrls.some((url) => url.includes('?'))) errors.push('sitemap.xml: query-string URL found')
const sitemapLastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1])
if (sitemapLastmods.length !== sitemapUrls.length) errors.push('sitemap.xml: every URL must have one lastmod')
if (sitemapLastmods.some((value) => value !== SEO_CONTENT_UPDATED_AT)) errors.push(`sitemap.xml: unexpected lastmod; expected ${SEO_CONTENT_UPDATED_AT}`)
for (const canonical of indexedCanonicalUrls) if (!sitemapUrls.includes(canonical)) errors.push(`sitemap.xml: missing ${canonical}`)
for (const locale of Object.keys(localeRoutes)) {
  for (const item of crosshairs.filter((crosshair) => !isPriorityCrosshair(crosshair.id))) {
    const url = `${SITE_ORIGIN}${routePath(locale, { type: 'crosshair', crosshairId: item.id })}`
    if (sitemapUrls.includes(url)) errors.push(`sitemap.xml: noindex URL included ${url}`)
  }
  for (const pageKey of TRUST_PAGE_KEYS.filter((key) => !TRUST_PAGES[key].indexable)) {
    const url = `${SITE_ORIGIN}${routePath(locale, { type: 'trust', pageKey })}`
    if (sitemapUrls.includes(url)) errors.push(`sitemap.xml: noindex trust URL included ${url}`)
  }
}

for (const [collectionKey, collection] of Object.entries(SEO_COLLECTIONS)) {
  if (collection.crosshairIds.length < 5) errors.push(`${collectionKey}: collection is too small`)
  for (const id of collection.crosshairIds) {
    if (!crosshairs.some((item) => item.id === id)) errors.push(`${collectionKey}: unknown crosshair ${id}`)
    if (!isPriorityCrosshair(id)) errors.push(`${collectionKey}: linked detail is not indexable ${id}`)
  }
}

const notFound = await readFile(resolve(distRoot, '404.html'), 'utf8')
if (!notFound.includes('noindex,follow')) errors.push('404.html: noindex directive missing')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${generatedRoutes} generated routes and ${expectedIndexedCount} indexable sitemap URLs.`)
