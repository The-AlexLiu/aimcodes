import { access, readFile, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { localeRoutes, normalizeLocale } from '../src/i18n/localeRoutes.js'
import { routeMetadata } from '../src/seo/content.js'
import { parseSeoRoute, routePath } from '../src/seo/routes.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')

for (const [locale, config] of Object.entries(localeRoutes)) {
  const cases = [
    { type: 'home' },
    { type: 'catalog' },
    { type: 'finder' },
    { type: 'guide' },
  ]
  for (const route of cases) {
    const path = routePath(locale, route)
    const parsed = parseSeoRoute(path)
    if (parsed.locale !== locale || parsed.type !== route.type) errors.push(`${path}: route parser mismatch`)
    const filePath = resolve(projectRoot, 'dist', path.slice(1), 'index.html')
    try {
      await access(filePath)
      const html = await readFile(filePath, 'utf8')
      const metadata = routeMetadata(locale, route)
      const expected = [
        `<html lang="${config.htmlLang}">`,
        `<title>${escapeHtml(metadata.title)}</title>`,
        `content="${metadata.description}"`,
        `rel="canonical" href="${metadata.canonical}"`,
        'hreflang="x-default"',
        'rel="icon" href="https://aimcodes.com/favicon-v2.png"',
        '<meta name="robots" content="index,follow,max-image-preview:large"',
      ]
      for (const value of expected) if (!html.includes(value)) errors.push(`${path}: missing ${value}`)
    } catch (error) {
      errors.push(`${path}: ${error.message}`)
    }
  }
}

if (normalizeLocale('zh-Hans') !== 'zh-CN') errors.push('zh-Hans alias did not resolve to zh-CN')

const robots = await readFile(resolve(projectRoot, 'dist/robots.txt'), 'utf8')
const favicon = await stat(resolve(projectRoot, 'dist/favicon-v2.png'))
if (!robots.includes('https://aimcodes.com/sitemap.xml')) errors.push('robots.txt: sitemap URL missing')
if (favicon.size < 1000) errors.push('favicon-v2.png: file is unexpectedly small')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('Validated localized home, catalog, finder and guide routes for all four languages.')
