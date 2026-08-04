import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createTranslator } from '../src/i18n/translations.js'
import { DEFAULT_LOCALE, localeRoutes } from '../src/i18n/localeRoutes.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const sourcePath = resolve(distRoot, 'index.html')
const origin = 'https://aimcodes.com'
const seoStart = '<!-- aimcodes:seo:start -->'
const seoEnd = '<!-- aimcodes:seo:end -->'

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function seoBlock(locale, title, description) {
  const config = localeRoutes[locale]
  const canonicalUrl = `${origin}${config.path}`
  const alternateLinks = Object.entries(localeRoutes)
    .map(([, item]) => `    <link rel="alternate" hreflang="${item.hreflang}" href="${origin}${item.path}" />`)
    .join('\n')

  const alternateLocales = Object.entries(localeRoutes)
    .filter(([alternateLocale]) => alternateLocale !== locale)
    .map(([, item]) => `    <meta property="og:locale:alternate" content="${item.ogLocale}" />`)
    .join('\n')

  return `${seoStart}
    <link rel="canonical" href="${canonicalUrl}" />
${alternateLinks}
    <link rel="alternate" hreflang="x-default" href="${origin}${localeRoutes[DEFAULT_LOCALE].path}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:locale" content="${config.ogLocale}" />
${alternateLocales}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    ${seoEnd}`
}

function replaceSeoBlock(html, nextBlock) {
  const startIndex = html.indexOf(seoStart)
  const endIndex = html.indexOf(seoEnd)
  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Missing AimCodes SEO markers in built index.html')
  }
  return `${html.slice(0, startIndex)}${nextBlock}${html.slice(endIndex + seoEnd.length)}`
}

const template = await readFile(sourcePath, 'utf8')

for (const [locale, config] of Object.entries(localeRoutes)) {
  const t = createTranslator(locale)
  const title = t('meta.title')
  const description = t('meta.description')
  const localizedHtml = replaceSeoBlock(template, seoBlock(locale, title, description))
    .replace(/<html lang="[^"]*">/, `<html lang="${config.htmlLang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)

  const outputPath = resolve(distRoot, config.path.slice(1), 'index.html')
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, localizedHtml)
}

console.log(`Generated ${Object.keys(localeRoutes).length} localized routes in dist/.`)
