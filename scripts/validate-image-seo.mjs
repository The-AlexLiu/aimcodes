import { access, readFile, readdir, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { crosshairs } from '../src/data/crosshairs.js'
import { createTranslator, localizeCrosshair } from '../src/i18n/translations.js'
import { localeRoutes } from '../src/i18n/localeRoutes.js'
import { routeMetadata, SITE_ORIGIN } from '../src/seo/content.js'
import { crosshairSlug, routePath, SEO_COLLECTION_KEYS, SEO_COLLECTIONS, SEO_CROSSHAIR_IDS } from '../src/seo/routes.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicRoot = resolve(projectRoot, 'public')
const distRoot = resolve(projectRoot, 'dist')
const errors = []

async function validateImage(filePath, expected) {
  try {
    const fileStat = await stat(filePath)
    if (fileStat.size < 8_000) errors.push(`${filePath}: image is unexpectedly small (${fileStat.size} bytes)`)
    const metadata = await sharp(filePath).metadata()
    if (metadata.width !== expected.width || metadata.height !== expected.height || metadata.format !== expected.format) {
      errors.push(`${filePath}: expected ${expected.width}x${expected.height} ${expected.format}, found ${metadata.width}x${metadata.height} ${metadata.format}`)
    }
  } catch (error) {
    errors.push(`${filePath}: ${error.message}`)
  }
}

for (const crosshair of crosshairs) {
  const slug = crosshairSlug(crosshair.id)
  await validateImage(resolve(publicRoot, `images/crosshairs/${slug}.webp`), { width: 1080, height: 1080, format: 'webp' })
  await validateImage(resolve(publicRoot, `images/og/crosshairs/${slug}.jpg`), { width: 1200, height: 630, format: 'jpeg' })
}

for (const collection of Object.values(SEO_COLLECTIONS)) {
  await validateImage(resolve(publicRoot, `images/og/collections/${collection.slug}.jpg`), { width: 1200, height: 630, format: 'jpeg' })
}

const [standaloneFiles, crosshairOgFiles, collectionOgFiles] = await Promise.all([
  readdir(resolve(publicRoot, 'images/crosshairs')),
  readdir(resolve(publicRoot, 'images/og/crosshairs')),
  readdir(resolve(publicRoot, 'images/og/collections')),
])
if (standaloneFiles.filter((name) => name.endsWith('.webp')).length !== crosshairs.length) errors.push(`standalone image count mismatch: expected ${crosshairs.length}`)
if (crosshairOgFiles.filter((name) => name.endsWith('.jpg')).length !== crosshairs.length) errors.push(`crosshair OG image count mismatch: expected ${crosshairs.length}`)
if (collectionOgFiles.filter((name) => name.endsWith('.jpg')).length !== SEO_COLLECTION_KEYS.length) errors.push(`collection OG image count mismatch: expected ${SEO_COLLECTION_KEYS.length}`)

const imageSitemapPath = resolve(distRoot, 'sitemap-images.xml')
await access(imageSitemapPath).catch((error) => errors.push(`${imageSitemapPath}: ${error.message}`))
const imageSitemap = await readFile(imageSitemapPath, 'utf8').catch(() => '')
const sitemapPages = [...imageSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const sitemapImages = [...imageSitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1])
const expectedSitemapCount = Object.keys(localeRoutes).length * (SEO_COLLECTION_KEYS.length + SEO_CROSSHAIR_IDS.length)
const expectedSitemapImageCount = Object.keys(localeRoutes).length * (SEO_COLLECTION_KEYS.length + SEO_CROSSHAIR_IDS.length * 2)
if (sitemapPages.length !== expectedSitemapCount) errors.push(`sitemap-images.xml: expected ${expectedSitemapCount} page URLs, found ${sitemapPages.length}`)
if (sitemapImages.length !== expectedSitemapImageCount) errors.push(`sitemap-images.xml: expected ${expectedSitemapImageCount} image URLs, found ${sitemapImages.length}`)
if (new Set(sitemapPages).size !== sitemapPages.length) errors.push('sitemap-images.xml: duplicate page URLs found')
if (sitemapImages.some((url) => !url.startsWith(`${SITE_ORIGIN}/images/`))) errors.push('sitemap-images.xml: image URL outside the public image directory found')

for (const locale of Object.keys(localeRoutes)) {
  const t = createTranslator(locale)
  const localizedCrosshairs = crosshairs.map((item) => localizeCrosshair(item, locale, t))

  for (const crosshairId of SEO_CROSSHAIR_IDS) {
    const crosshair = localizedCrosshairs.find((item) => item.id === crosshairId)
    const route = { type: 'crosshair', crosshairId }
    const metadata = routeMetadata(locale, route, crosshair)
    const pageUrl = `${SITE_ORIGIN}${routePath(locale, route)}`
    if (!sitemapPages.includes(pageUrl)) errors.push(`sitemap-images.xml: missing ${pageUrl}`)
    if (!sitemapImages.includes(metadata.image)) errors.push(`sitemap-images.xml: missing ${metadata.image}`)
    if (!sitemapImages.includes(metadata.standaloneImage)) errors.push(`sitemap-images.xml: missing ${metadata.standaloneImage}`)
    const html = await readFile(resolve(distRoot, routePath(locale, route).slice(1), 'index.html'), 'utf8')
    for (const expected of [
      `<meta property="og:image" content="${metadata.image}" />`,
      `<meta property="og:image:alt" content="${metadata.imageAlt}" />`,
      `<meta name="twitter:image" content="${metadata.image}" />`,
      `"primaryImageOfPage":{"@id":"${metadata.canonical}#primaryimage"}`,
      `<img class="seo-static-hero-image" src="${metadata.standaloneImage}"`,
    ]) if (!html.includes(expected)) errors.push(`${pageUrl}: missing ${expected}`)
  }

  for (const collectionKey of SEO_COLLECTION_KEYS) {
    const route = { type: 'collection', collectionKey }
    const metadata = routeMetadata(locale, route)
    const pageUrl = `${SITE_ORIGIN}${routePath(locale, route)}`
    if (!sitemapPages.includes(pageUrl)) errors.push(`sitemap-images.xml: missing ${pageUrl}`)
    if (!sitemapImages.includes(metadata.image)) errors.push(`sitemap-images.xml: missing ${metadata.image}`)
  }
}

const robots = await readFile(resolve(distRoot, 'robots.txt'), 'utf8')
if (!robots.includes(`${SITE_ORIGIN}/sitemap-images.xml`)) errors.push('robots.txt: image sitemap URL missing')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${crosshairs.length} standalone images, ${crosshairs.length + SEO_COLLECTION_KEYS.length} OG images, ${expectedSitemapCount} localized image sitemap pages, and ${expectedSitemapImageCount} image references.`)
