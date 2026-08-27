import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  catalogCrosshairs,
  collectionKeysForCatalogCrosshair,
  crosshairCollectionKeys,
  crosshairCollections,
  indexableCrosshairIds,
} from '../src/data/catalogManifest.js'
import { createTranslator, localizeCrosshair } from '../src/i18n/translations.js'
import { localeRoutes } from '../src/i18n/localeRoutes.js'
import { seoCopy } from '../src/seo/content.js'
import { routeMetadata, SEO_CONTENT_UPDATED_AT, SITE_ORIGIN } from '../src/seo/metadata.js'
import { CROSSHAIR_STATISTICS_UPDATED_AT } from '../src/data/catalogStatistics.js'
import { articleCopy } from '../src/seo/articles.js'
import { seoToolCopy } from '../src/seo/toolContent.js'
import { isIndexableRoute, isPriorityCrosshair, routePath, SEO_ARTICLE_KEYS, SEO_TOOL_KEYS, TRUST_PAGE_KEYS, TRUST_PAGES } from '../src/seo/routes.js'
import { CONTACT_EMAIL } from '../src/config/contact.js'
import { TRUST_UPDATED_AT, trustCopy } from '../src/seo/trustContent.js'
import { proPlayerProfiles } from '../src/data/proPlayerProfiles.js'
import { proPlayerHubCopy } from '../src/seo/proPlayerContent.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const errors = []
const indexedCanonicalUrls = new Set()
const indexedTitles = new Set()
const indexedDescriptions = new Set()
let generatedRoutes = 0
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')

for (const locale of Object.keys(localeRoutes)) {
  const t = createTranslator(locale)
  const localizedCrosshairs = catalogCrosshairs.map((item) => localizeCrosshair(item, locale, t))
  const routes = [
    { type: 'home' },
    { type: 'catalog' },
    { type: 'players' },
    { type: 'finder' },
    { type: 'guide' },
    ...crosshairCollectionKeys.map((collectionKey) => ({ type: 'collection', collectionKey })),
    ...SEO_ARTICLE_KEYS.map((articleKey) => ({ type: 'article', articleKey })),
    ...SEO_TOOL_KEYS.map((toolKey) => ({ type: 'tool', toolKey })),
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
        `<meta property="og:image" content="${metadata.image}" />`,
        `<meta property="og:image:width" content="${metadata.imageWidth}" />`,
        `<meta property="og:image:height" content="${metadata.imageHeight}" />`,
        `<meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
        `<meta name="twitter:image" content="${metadata.image}" />`,
        `<meta name="twitter:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
        '<meta name="twitter:card" content="summary_large_image" />',
        '<script type="application/ld+json">',
        '"@type":"ImageObject"',
        '"@type":"Organization"',
        '"alternateName":"Aim Codes"',
        '"@id":"https://aimcodes.com/#logo"',
        '"contentUrl":"https://aimcodes.com/brand/aimcodes-logo.png"',
        '"width":512',
        '"height":512',
        `"email":"${CONTACT_EMAIL}"`,
        '<main class="seo-static-shell">',
        '<h1>',
        '<script type="module" crossorigin src="/assets/',
      ]
      for (const value of expected) if (!html.includes(value)) errors.push(`${path}: missing ${value}`)
      if (html.includes('"sameAs":')) errors.push(`${path}: obsolete social profile schema found`)
      for (const config of Object.values(localeRoutes)) {
        if (!html.includes(`hreflang="${config.hreflang}"`)) errors.push(`${path}: missing hreflang ${config.hreflang}`)
      }
      if (route.type === 'crosshair') {
        if (!html.includes(crosshair.code)) errors.push(`${path}: crosshair code missing from initial HTML`)
        if (crosshair.sourceUrl && !html.includes(`"citation":"${crosshair.sourceUrl}"`)) errors.push(`${path}: crosshair source citation missing`)
        const contextualCollections = collectionKeysForCatalogCrosshair(crosshair.id)
        if (contextualCollections.length) {
          const contextualLabel = escapeHtml(seoCopy(locale).detail.compareStyle)
          if (!html.includes(`<nav class="seo-static-links" aria-label="${contextualLabel}">`)) {
            errors.push(`${path}: contextual collection navigation missing from initial HTML`)
          }
        }
        for (const collectionKey of contextualCollections) {
          const collectionPath = routePath(locale, { type: 'collection', collectionKey })
          if (!html.includes(collectionPath)) errors.push(`${path}: missing contextual collection link ${collectionPath}`)
        }
      }
      if (route.type === 'collection') {
        if (!html.includes('"@type":"FAQPage"')) errors.push(`${path}: FAQPage structured data missing`)
        if (!html.includes(`<h2>${escapeHtml({ en: 'Common questions', es: 'Preguntas habituales', 'pt-BR': 'Dúvidas comuns', 'zh-CN': '大家常问', ja: 'よくある質問' }[locale])}</h2>`)) errors.push(`${path}: localized FAQ heading missing from initial HTML`)
        if (!html.includes('<nav aria-label="Breadcrumb">')) errors.push(`${path}: visible breadcrumb missing`)
        for (const id of crosshairCollections[route.collectionKey].crosshairIds) {
          const item = localizedCrosshairs.find((crosshairItem) => crosshairItem.id === id)
          if (!item || !html.includes(routePath(locale, { type: 'crosshair', crosshairId: id }))) errors.push(`${path}: missing collection link for ${id}`)
        }
      }
      if (route.type === 'players') {
        const players = proPlayerHubCopy(locale)
        if (!html.includes('"@type":"CollectionPage"')) errors.push(`${path}: CollectionPage structured data missing`)
        if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`${path}: BreadcrumbList missing`)
        if (!html.includes(escapeHtml(players.intro))) errors.push(`${path}: player-facing introduction missing`)
        for (const profile of proPlayerProfiles) {
          const playerPath = routePath(locale, { type: 'crosshair', crosshairId: profile.crosshairId })
          if (!html.includes(playerPath)) errors.push(`${path}: missing player link ${playerPath}`)
        }
      }
      if (route.type === 'guide') {
        if (!html.includes('"@type":"HowTo"')) errors.push(`${path}: HowTo structured data missing`)
        if (!html.includes('"@type":"FAQPage"')) errors.push(`${path}: guide FAQPage structured data missing`)
        if (!html.includes(`<h2>${escapeHtml({ en: 'Common questions', es: 'Preguntas habituales', 'pt-BR': 'Dúvidas comuns', 'zh-CN': '大家常问', ja: 'よくある質問' }[locale])}</h2>`)) errors.push(`${path}: localized guide FAQ missing from initial HTML`)
      }
      if (route.type === 'article') {
        const article = articleCopy(locale, route.articleKey)
        if (!html.includes('"@type":"Article"')) errors.push(`${path}: Article structured data missing`)
        if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`${path}: article BreadcrumbList missing`)
        if (!html.includes('"@type":"FAQPage"')) errors.push(`${path}: article FAQPage missing`)
        if (!html.includes('<nav aria-label="Breadcrumb">')) errors.push(`${path}: visible breadcrumb missing`)
        if (route.articleKey === 'statistics' && !html.includes('"@type":"Dataset"')) errors.push(`${path}: Dataset structured data missing`)
        for (const id of article.recommendedCrosshairIds) {
          if (!html.includes(routePath(locale, { type: 'crosshair', crosshairId: id }))) errors.push(`${path}: missing recommended crosshair link for ${id}`)
        }
      }
      if (route.type === 'tool') {
        const tool = seoToolCopy(locale, route.toolKey)
        if (!html.includes('"@type":"WebApplication"')) errors.push(`${path}: WebApplication structured data missing`)
        if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`${path}: tool BreadcrumbList missing`)
        if (!html.includes('<nav aria-label="Breadcrumb">')) errors.push(`${path}: visible breadcrumb missing`)
        if (!html.includes(escapeHtml(tool.intro))) errors.push(`${path}: tool intro missing from initial HTML`)
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
        if (indexedDescriptions.has(metadata.description)) errors.push(`${path}: duplicate indexed description ${metadata.description}`)
        indexedCanonicalUrls.add(metadata.canonical)
        indexedTitles.add(metadata.title)
        indexedDescriptions.add(metadata.description)
      }
    } catch (error) {
      errors.push(`${path}: ${error.message}`)
    }
  }
}

const sitemap = await readFile(resolve(distRoot, 'sitemap.xml'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const indexableTrustPages = Object.values(TRUST_PAGES).filter((page) => page.indexable).length
const expectedIndexedCount = Object.keys(localeRoutes).length * (5 + crosshairCollectionKeys.length + SEO_ARTICLE_KEYS.length + SEO_TOOL_KEYS.length + indexableCrosshairIds.length + indexableTrustPages)
if (sitemapUrls.length !== expectedIndexedCount) errors.push(`sitemap.xml: expected ${expectedIndexedCount} URLs, found ${sitemapUrls.length}`)
if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap.xml: duplicate <loc> entries')
if (sitemapUrls.some((url) => url.includes('?'))) errors.push('sitemap.xml: query-string URL found')
const sitemapLastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1])
if (sitemapLastmods.length !== sitemapUrls.length) errors.push('sitemap.xml: every URL must have one lastmod')
const allowedSitemapLastmods = new Set([SEO_CONTENT_UPDATED_AT, CROSSHAIR_STATISTICS_UPDATED_AT])
if (sitemapLastmods.some((value) => !allowedSitemapLastmods.has(value))) errors.push('sitemap.xml: unexpected lastmod')
for (const locale of Object.keys(localeRoutes)) {
  const statisticsUrl = `${SITE_ORIGIN}${routePath(locale, { type: 'article', articleKey: 'statistics' })}`
  const statisticsEntry = sitemap.match(new RegExp(`<url>[\\s\\S]*?<loc>${statisticsUrl}</loc>[\\s\\S]*?</url>`))?.[0] || ''
  if (!statisticsEntry.includes(`<lastmod>${CROSSHAIR_STATISTICS_UPDATED_AT}</lastmod>`)) errors.push(`sitemap.xml: statistics lastmod missing for ${statisticsUrl}`)
}
for (const canonical of indexedCanonicalUrls) if (!sitemapUrls.includes(canonical)) errors.push(`sitemap.xml: missing ${canonical}`)

const crosshairSitemap = await readFile(resolve(distRoot, 'sitemap-crosshairs.xml'), 'utf8')
const crosshairSitemapUrls = [...crosshairSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const expectedCrosshairSitemapCount = Object.keys(localeRoutes).length * indexableCrosshairIds.length
if (crosshairSitemapUrls.length !== expectedCrosshairSitemapCount) errors.push(`sitemap-crosshairs.xml: expected ${expectedCrosshairSitemapCount} URLs, found ${crosshairSitemapUrls.length}`)
if (new Set(crosshairSitemapUrls).size !== crosshairSitemapUrls.length) errors.push('sitemap-crosshairs.xml: duplicate <loc> entries')
for (const locale of Object.keys(localeRoutes)) {
  for (const id of indexableCrosshairIds) {
    const url = `${SITE_ORIGIN}${routePath(locale, { type: 'crosshair', crosshairId: id })}`
    if (!crosshairSitemapUrls.includes(url)) errors.push(`sitemap-crosshairs.xml: missing ${url}`)
  }
}
for (const locale of Object.keys(localeRoutes)) {
  for (const item of catalogCrosshairs.filter((crosshair) => !isPriorityCrosshair(crosshair.id))) {
    const url = `${SITE_ORIGIN}${routePath(locale, { type: 'crosshair', crosshairId: item.id })}`
    if (sitemapUrls.includes(url)) errors.push(`sitemap.xml: noindex URL included ${url}`)
  }
  for (const pageKey of TRUST_PAGE_KEYS.filter((key) => !TRUST_PAGES[key].indexable)) {
    const url = `${SITE_ORIGIN}${routePath(locale, { type: 'trust', pageKey })}`
    if (sitemapUrls.includes(url)) errors.push(`sitemap.xml: noindex trust URL included ${url}`)
  }
}

for (const [collectionKey, collection] of Object.entries(crosshairCollections)) {
  if (collection.crosshairIds.length < 5) errors.push(`${collectionKey}: collection is too small`)
  for (const id of collection.crosshairIds) {
    if (!catalogCrosshairs.some((item) => item.id === id)) errors.push(`${collectionKey}: unknown crosshair ${id}`)
  }
}

const notFound = await readFile(resolve(distRoot, '404.html'), 'utf8')
if (!notFound.includes('noindex,follow')) errors.push('404.html: noindex directive missing')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${generatedRoutes} generated routes and ${expectedIndexedCount} indexable sitemap URLs.`)
