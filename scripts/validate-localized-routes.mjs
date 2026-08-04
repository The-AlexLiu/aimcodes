import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createTranslator } from '../src/i18n/translations.js'
import { buildLocalizedUrl, localeFromPath, localeRoutes, normalizeLocale } from '../src/i18n/localeRoutes.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const origin = 'https://aimcodes.com'
const errors = []

const routeCases = [
  ['/en/', 'en'],
  ['/es/', 'es'],
  ['/pt-br/', 'pt-BR'],
  ['/zh-cn/', 'zh-CN'],
  ['/local/preview/zh-cn/index.html', 'zh-CN'],
]

for (const [path, expectedLocale] of routeCases) {
  if (localeFromPath(path) !== expectedLocale) errors.push(`${path}: expected locale ${expectedLocale}`)
}
if (normalizeLocale('zh-Hans') !== 'zh-CN') errors.push('zh-Hans alias did not resolve to zh-CN')
if (buildLocalizedUrl('es', { search: '?lang=zh-CN&finder=1' }) !== '/es/?finder=1') {
  errors.push('Localized URL builder did not remove the legacy lang query')
}

for (const [locale, config] of Object.entries(localeRoutes)) {
  const filePath = resolve(projectRoot, 'dist', config.path.slice(1), 'index.html')
  try {
    await access(filePath)
    const html = await readFile(filePath, 'utf8')
    const t = createTranslator(locale)
    const expected = [
      `<html lang="${config.htmlLang}">`,
      `<title>${t('meta.title')}</title>`,
      `content="${t('meta.description')}"`,
      `rel="canonical" href="${origin}${config.path}"`,
      'hreflang="x-default"',
      'rel="icon" href="https://aimcodes.com/favicon.svg" type="image/svg+xml" sizes="any"',
    ]

    for (const value of expected) {
      if (!html.includes(value)) errors.push(`${config.path}: missing ${value}`)
    }

    for (const alternate of Object.values(localeRoutes)) {
      const hreflang = `hreflang="${alternate.hreflang}" href="${origin}${alternate.path}"`
      if (!html.includes(hreflang)) errors.push(`${config.path}: missing alternate ${alternate.path}`)
    }
  } catch (error) {
    errors.push(`${config.path}: ${error.message}`)
  }
}

const sitemap = await readFile(resolve(projectRoot, 'dist/sitemap.xml'), 'utf8')
const robots = await readFile(resolve(projectRoot, 'dist/robots.txt'), 'utf8')
const favicon = await readFile(resolve(projectRoot, 'dist/favicon.svg'), 'utf8')
for (const config of Object.values(localeRoutes)) {
  if (!sitemap.includes(`${origin}${config.path}`)) errors.push(`sitemap.xml: missing ${config.path}`)
}
if (!robots.includes(`${origin}/sitemap.xml`)) errors.push('robots.txt: sitemap URL missing')
if (!favicon.includes('width="96" height="96"')) errors.push('favicon.svg: expected a square 96×96 icon')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${Object.keys(localeRoutes).length} localized routes, sitemap.xml and robots.txt.`)
