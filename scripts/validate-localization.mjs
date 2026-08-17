import { crosshairs } from '../src/data/crosshairs.js'
import { createTranslator, crosshairCopy, dictionaries, localizeCrosshair } from '../src/i18n/translations.js'
import { collectionCopy } from '../src/seo/collectionContent.js'
import { articleCopy } from '../src/seo/articles.js'
import { importGuideDetails } from '../src/seo/importGuideDetails.js'
import { articleResourceLabel, toolResourceLabel } from '../src/seo/resourceLabels.js'
import { seoToolCopy } from '../src/seo/toolContent.js'
import { SEO_ARTICLE_KEYS, SEO_COLLECTION_KEYS, SEO_TOOL_KEYS } from '../src/seo/routes.js'

const locales = ['en', 'es', 'zh-CN', 'pt-BR', 'ja']
const failures = []

function getStringPaths(value, prefix = '') {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof child === 'string' ? [path] : getStringPaths(child, path)
  })
}

function getPath(value, path) {
  return path.split('.').reduce((current, key) => current?.[key], value)
}

const englishPaths = getStringPaths(dictionaries.en)
for (const locale of locales) {
  for (const path of englishPaths) {
    if (typeof getPath(dictionaries[locale], path) !== 'string') failures.push(`${locale} is missing ${path}`)
  }

  const guide = importGuideDetails(locale)
  if (!guide.quickLabel?.trim() || !guide.quickAnswer?.trim()) failures.push(`${locale} import guide needs a complete quick answer`)
  if (!guide.moreTitle || guide.sections?.length !== 4 || guide.sections.some((section) => !section.title || !section.body)) failures.push(`${locale} needs four complete import guide sections`)
  if (guide.faq?.length < 3 || guide.faq.some((item) => item.length !== 2 || item.some((value) => !value.trim()))) failures.push(`${locale} import guide needs at least three complete FAQs`)

  for (const toolKey of SEO_TOOL_KEYS) {
    const tool = seoToolCopy(locale, toolKey)
    for (const field of ['eyebrow', 'title', 'intro', 'guideTitle', 'guideIntro', 'metaTitle', 'metaDescription']) {
      if (!String(tool[field] || '').trim()) failures.push(`${locale} ${toolKey} tool is missing ${field}`)
    }
    if (tool.tips?.length !== 3 || tool.tips.some((tip) => !tip.title || !tip.body)) failures.push(`${locale} ${toolKey} tool needs three complete tips`)
    if (tool.faq?.length < 2 || tool.faq.some((item) => item.length !== 2 || item.some((value) => !value.trim()))) failures.push(`${locale} ${toolKey} tool needs at least two complete FAQs`)
  }

  for (const toolKey of ['generator', 'decoder', 'preview', 'comparison']) {
    if (toolResourceLabel(locale, toolKey) !== seoToolCopy(locale, toolKey).title) failures.push(`${locale} ${toolKey} home resource label does not match its tool title`)
  }

  for (const articleKey of SEO_ARTICLE_KEYS) {
    const article = articleCopy(locale, articleKey)
    for (const field of ['eyebrow', 'title', 'intro', 'summaryTitle', 'summary', 'cta', 'metaTitle', 'metaDescription']) {
      if (!String(article[field] || '').trim()) failures.push(`${locale} ${articleKey} article is missing ${field}`)
    }
    if (article.sections?.length < 3 || article.sections.some((section) => !section.title || section.paragraphs?.length < 1 || section.paragraphs.some((value) => !value.trim()) || !Array.isArray(section.bullets))) failures.push(`${locale} ${articleKey} article needs at least three complete sections`)
    if (article.faq?.length < 2 || article.faq.some((item) => item.length !== 2 || item.some((value) => !value.trim()))) failures.push(`${locale} ${articleKey} article needs at least two complete FAQs`)
    if (article.recommendedCrosshairIds?.length !== 4 || article.recommendedCrosshairIds.some((id) => !crosshairs.some((item) => item.id === id))) failures.push(`${locale} ${articleKey} article needs four valid crosshair recommendations`)
  }

  for (const articleKey of SEO_ARTICLE_KEYS.filter((key) => !['settings', 'colors'].includes(key))) {
    if (articleResourceLabel(locale, articleKey) !== articleCopy(locale, articleKey).title) failures.push(`${locale} ${articleKey} home resource label does not match its article title`)
  }
}

const bannedInterfaceWords = {
  'zh-CN': [/\bExplore\b/i, /\bPreview\b/i, /\bCrosshair\b/i, /\bCute\b/i, /\bFun\b/i, /\bCustom\b/i, /\bAscent\b/i, /\bHaven\b/i, /\bBind\b/i, /\bms\b/i],
  es: [/\bCute\b/i, /\bFun\b/i, /\bPreview\b/i, /\bCrosshair\b/i, /\bCustom\b/i],
  'pt-BR': [/\bCute\b/i, /\bFun\b/i, /\bPreview\b/i, /\bCrosshair\b/i, /\bCustom\b/i],
  ja: [/\bExplore\b/i, /\bPreview\b/i, /\bCrosshair\b/i, /\bCute\b/i, /\bCustom\b/i, /\bHome\b/i, /\bCopy code\b/i],
}

for (const [locale, patterns] of Object.entries(bannedInterfaceWords)) {
  for (const path of englishPaths) {
    const value = getPath(dictionaries[locale], path)
    for (const pattern of patterns) {
      if (pattern.test(value)) failures.push(`${locale} contains mixed-language UI copy at ${path}: ${value}`)
    }
  }
}

for (const crosshair of crosshairs) {
  for (const locale of locales) {
    const localized = localizeCrosshair(crosshair, locale, createTranslator(locale))
    if (![localized.name, localized.shortName, localized.description].every((value) => String(value || '').trim())) failures.push(`${crosshair.id} is missing ${locale} card copy`)
  }
}

for (const locale of locales) {
  for (const collectionKey of SEO_COLLECTION_KEYS) {
    const collection = collectionCopy(locale, collectionKey)
    if (!collection) {
      failures.push(`${locale} is missing SEO collection ${collectionKey}`)
      continue
    }
    for (const field of ['label', 'eyebrow', 'title', 'intro', 'gridTitle', 'metaTitle', 'metaDescription']) {
      if (!String(collection[field] || '').trim()) failures.push(`${locale} ${collectionKey} is missing ${field}`)
    }
    if (collection.body?.length !== 2 || collection.body.some((value) => !value.trim())) failures.push(`${locale} ${collectionKey} needs two body paragraphs`)
    if (collection.faq?.length < 2 || collection.faq.some((item) => item.length !== 2 || item.some((value) => !value.trim()))) failures.push(`${locale} ${collectionKey} needs at least two complete FAQs`)
  }
}

const allowedChineseNames = new Set(crosshairs.filter((item) => item.isPro).map((item) => item.id))
for (const [id, copy] of Object.entries(crosshairCopy)) {
  if (allowedChineseNames.has(id)) continue
  const [name, shortName] = copy['zh-CN']
  if (/[A-Za-z]/.test(`${name}${shortName}`)) failures.push(`${id} still mixes English into its Chinese display name`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Validated matching UI dictionaries for ${locales.length} languages and localized copy for ${crosshairs.length} crosshairs.`)
