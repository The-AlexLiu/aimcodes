import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { crosshairs } from '../src/data/crosshairs.js'
import { createTranslator, localizeCrosshair } from '../src/i18n/translations.js'
import { localeRoutes } from '../src/i18n/localeRoutes.js'
import { routeMetadata, SITE_ORIGIN } from '../src/seo/content.js'
import { isPriorityCrosshair, routePath, SEO_CROSSHAIR_IDS } from '../src/seo/routes.js'

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
    ...localizedCrosshairs.map((item) => ({ type: 'crosshair', crosshairId: item.id })),
  ]

  for (const route of routes) {
    const crosshair = route.type === 'crosshair'
      ? localizedCrosshairs.find((item) => item.id === route.crosshairId)
      : null
    const indexed = route.type !== 'crosshair' || isPriorityCrosshair(route.crosshairId)
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
        '<main class="seo-static-shell"><h1>',
        '<script type="module" crossorigin src="/assets/',
      ]
      for (const value of expected) if (!html.includes(value)) errors.push(`${path}: missing ${value}`)
      for (const config of Object.values(localeRoutes)) {
        if (!html.includes(`hreflang="${config.hreflang}"`)) errors.push(`${path}: missing hreflang ${config.hreflang}`)
      }
      if (route.type === 'crosshair' && !html.includes(crosshair.code)) errors.push(`${path}: crosshair code missing from initial HTML`)
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
const expectedIndexedCount = Object.keys(localeRoutes).length * (4 + SEO_CROSSHAIR_IDS.length)
if (sitemapUrls.length !== expectedIndexedCount) errors.push(`sitemap.xml: expected ${expectedIndexedCount} URLs, found ${sitemapUrls.length}`)
if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap.xml: duplicate <loc> entries')
if (sitemapUrls.some((url) => url.includes('?'))) errors.push('sitemap.xml: query-string URL found')
for (const canonical of indexedCanonicalUrls) if (!sitemapUrls.includes(canonical)) errors.push(`sitemap.xml: missing ${canonical}`)
for (const locale of Object.keys(localeRoutes)) {
  for (const item of crosshairs.filter((crosshair) => !isPriorityCrosshair(crosshair.id))) {
    const url = `${SITE_ORIGIN}${routePath(locale, { type: 'crosshair', crosshairId: item.id })}`
    if (sitemapUrls.includes(url)) errors.push(`sitemap.xml: noindex URL included ${url}`)
  }
}

const notFound = await readFile(resolve(distRoot, '404.html'), 'utf8')
if (!notFound.includes('noindex,follow')) errors.push('404.html: noindex directive missing')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${generatedRoutes} generated routes and ${expectedIndexedCount} indexable sitemap URLs.`)
