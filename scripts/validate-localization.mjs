import { crosshairs } from '../src/data/crosshairs.js'
import { crosshairCopy, dictionaries } from '../src/i18n/translations.js'
import { seoCopy } from '../src/seo/content.js'
import { SEO_COLLECTION_KEYS } from '../src/seo/routes.js'

const locales = ['en', 'es', 'zh-CN', 'pt-BR']
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
}

const bannedInterfaceWords = {
  'zh-CN': [/\bExplore\b/i, /\bPreview\b/i, /\bCrosshair\b/i, /\bCute\b/i, /\bFun\b/i, /\bCustom\b/i, /\bAscent\b/i, /\bHaven\b/i, /\bBind\b/i, /\bms\b/i],
  es: [/\bCute\b/i, /\bFun\b/i, /\bPreview\b/i, /\bCrosshair\b/i, /\bCustom\b/i],
  'pt-BR': [/\bCute\b/i, /\bFun\b/i, /\bPreview\b/i, /\bCrosshair\b/i, /\bCustom\b/i],
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
    const copy = crosshairCopy[crosshair.id]?.[locale]
    if (!copy || copy.length !== 3 || copy.some((value) => !value.trim())) failures.push(`${crosshair.id} is missing ${locale} card copy`)
  }
}

for (const locale of locales) {
  for (const collectionKey of SEO_COLLECTION_KEYS) {
    const collection = seoCopy(locale).collections?.[collectionKey]
    if (!collection) {
      failures.push(`${locale} is missing SEO collection ${collectionKey}`)
      continue
    }
    for (const field of ['label', 'eyebrow', 'title', 'intro', 'gridTitle', 'metaTitle', 'metaDescription']) {
      if (!String(collection[field] || '').trim()) failures.push(`${locale} ${collectionKey} is missing ${field}`)
    }
    if (collection.body?.length !== 2 || collection.body.some((value) => !value.trim())) failures.push(`${locale} ${collectionKey} needs two body paragraphs`)
    if (collection.faq?.length !== 3 || collection.faq.some((item) => item.length !== 2 || item.some((value) => !value.trim()))) failures.push(`${locale} ${collectionKey} needs three complete FAQs`)
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
