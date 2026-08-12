import { access, readFile, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { localeRoutes, normalizeLocale } from '../src/i18n/localeRoutes.js'
import { routeMetadata } from '../src/seo/metadata.js'
import { isIndexableRoute, parseSeoRoute, routePath, SEO_ARTICLE_KEYS, SEO_COLLECTION_KEYS, TRUST_PAGE_KEYS } from '../src/seo/routes.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')

for (const [locale, config] of Object.entries(localeRoutes)) {
  const cases = [
    { type: 'home' },
    { type: 'catalog' },
    { type: 'finder' },
    { type: 'guide' },
    ...SEO_COLLECTION_KEYS.map((collectionKey) => ({ type: 'collection', collectionKey })),
    ...SEO_ARTICLE_KEYS.map((articleKey) => ({ type: 'article', articleKey })),
    ...TRUST_PAGE_KEYS.map((pageKey) => ({ type: 'trust', pageKey })),
  ]
  for (const route of cases) {
    const path = routePath(locale, route)
    const parsed = parseSeoRoute(path)
    if (parsed.locale !== locale || parsed.type !== route.type || parsed.collectionKey !== route.collectionKey || parsed.articleKey !== route.articleKey || parsed.pageKey !== route.pageKey) errors.push(`${path}: route parser mismatch`)
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
        'rel="icon" href="https://aimcodes.com/favicon.ico"',
        'rel="icon" href="https://aimcodes.com/favicon-48x48.png"',
        'rel="icon" href="https://aimcodes.com/favicon-v2.png"',
        'rel="icon" href="https://aimcodes.com/favicon-192x192.png"',
        'rel="manifest" href="https://aimcodes.com/site.webmanifest"',
        '.seo-static-shell{visibility:hidden;animation:aimcodes-show-static-fallback 0s 6s forwards;',
        '<noscript><style>.seo-static-shell{visibility:visible;animation:none}</style></noscript>',
        `<meta name="robots" content="${isIndexableRoute(route) ? 'index,follow,max-image-preview:large' : 'noindex,follow'}"`,
      ]
      for (const value of expected) if (!html.includes(value)) errors.push(`${path}: missing ${value}`)
    } catch (error) {
      errors.push(`${path}: ${error.message}`)
    }
  }
}

if (normalizeLocale('zh-Hans') !== 'zh-CN') errors.push('zh-Hans alias did not resolve to zh-CN')

const netlifyConfig = await readFile(resolve(projectRoot, 'netlify.toml'), 'utf8')
const expectedLanguageRedirects = [
  `[[redirects]]
  from = "/"
  to = "/zh-cn/"
  status = 302
  force = true
  conditions = { Language = ["zh", "zh-cn", "zh-hans"] }`,
  `[[redirects]]
  from = "/"
  to = "/es/"
  status = 302
  force = true
  conditions = { Language = ["es"] }`,
  `[[redirects]]
  from = "/"
  to = "/pt-br/"
  status = 302
  force = true
  conditions = { Language = ["pt", "pt-br"] }`,
  `[[redirects]]
  from = "/"
  to = "/en/"
  status = 302
  force = true`,
]

for (const redirect of expectedLanguageRedirects) {
  if (!netlifyConfig.includes(redirect)) errors.push(`netlify.toml: missing device-language redirect to ${redirect.match(/to = "([^"]+)"/)?.[1]}`)
}

const redirectPositions = expectedLanguageRedirects.map((redirect) => netlifyConfig.indexOf(redirect))
if (redirectPositions.some((position) => position < 0) || redirectPositions.some((position, index) => index > 0 && position <= redirectPositions[index - 1])) {
  errors.push('netlify.toml: device-language redirects must run before the English fallback')
}

const robots = await readFile(resolve(projectRoot, 'dist/robots.txt'), 'utf8')
const faviconIco = await stat(resolve(projectRoot, 'dist/favicon.ico'))
const favicon48 = await stat(resolve(projectRoot, 'dist/favicon-48x48.png'))
const favicon96 = await stat(resolve(projectRoot, 'dist/favicon-v2.png'))
const favicon192 = await stat(resolve(projectRoot, 'dist/favicon-192x192.png'))
const manifest = await readFile(resolve(projectRoot, 'dist/site.webmanifest'), 'utf8')
if (!robots.includes('https://aimcodes.com/sitemap.xml')) errors.push('robots.txt: sitemap URL missing')
if (!robots.includes('https://aimcodes.com/sitemap-crosshairs.xml')) errors.push('robots.txt: crosshair sitemap URL missing')
if (!robots.includes('https://aimcodes.com/sitemap-images.xml')) errors.push('robots.txt: image sitemap URL missing')
if (faviconIco.size < 1000) errors.push('favicon.ico: file is unexpectedly small')
if (favicon48.size < 500) errors.push('favicon-48x48.png: file is unexpectedly small')
if (favicon96.size < 1000) errors.push('favicon-v2.png: file is unexpectedly small')
if (favicon192.size < 1000) errors.push('favicon-192x192.png: file is unexpectedly small')
if (!manifest.includes('"name": "AimCodes"') || !manifest.includes('/favicon-192x192.png')) errors.push('site.webmanifest: AimCodes icon metadata missing')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('Validated localized routes for all four languages, including Netlify device-language redirects and the English fallback.')
