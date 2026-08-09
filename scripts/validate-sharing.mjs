import { readFile } from 'node:fs/promises'
import { dictionaries } from '../src/i18n/translations.js'
import { createCrosshairShareUrl, isSharedCrosshairEntry, readSharedPreviewOptions } from '../src/utils/shareLinks.js'

const locales = [
  ['en', '/en/'],
  ['es', '/es/'],
  ['pt-BR', '/pt-br/'],
  ['zh-CN', '/zh-cn/'],
]

for (const [locale, prefix] of locales) {
  const url = new URL(createCrosshairShareUrl({
    origin: 'https://aimcodes.com',
    locale,
    crosshairId: 'tenz',
    background: 'bind',
    colorKey: 'pink',
  }))
  if (url.pathname !== `${prefix}crosshairs/tenz/`) throw new Error(`${locale} share URL used the wrong localized route: ${url.pathname}`)
  if (url.searchParams.get('mapa') !== 'bind' || url.searchParams.get('color') !== 'pink') throw new Error(`${locale} share URL lost preview settings.`)
  if (!isSharedCrosshairEntry(url.searchParams, 'crosshair')) throw new Error(`${locale} share URL lost entry attribution.`)

  for (const key of ['crosshairAction', 'crosshairWorking', 'crosshairShared', 'crosshairCopied', 'crosshairError', 'crosshairTitle', 'crosshairText', 'crosshairBundle']) {
    if (!String(dictionaries[locale].share?.[key] || '').trim()) throw new Error(`${locale} is missing share.${key}`)
  }
}

const invalidUrl = new URL(createCrosshairShareUrl({
  origin: 'https://aimcodes.com',
  locale: 'en',
  crosshairId: 'tenz',
  background: 'unknown-map',
  colorKey: 'unknown-color',
}))
if (invalidUrl.searchParams.has('mapa') || invalidUrl.searchParams.has('color')) throw new Error('Unsupported preview options must not enter share URLs.')

const preview = readSharedPreviewOptions(new URLSearchParams('mapa=haven&color=cyan'))
if (preview.background !== 'haven' || preview.colorKey !== 'cyan') throw new Error('Shared preview options were not restored.')

const appSource = await readFile('src/App.jsx', 'utf8')
for (const parameter of ['challenge', 'rank', 'utm_source', 'utm_medium', 'utm_campaign', 'qa', 'ga_debug']) {
  if (!appSource.includes(`'${parameter}'`)) throw new Error(`Language switching must preserve ${parameter}.`)
}
if (!appSource.includes("params.set('color', selectedCodeColorKey)")) throw new Error('Language switching must preserve the shared color.')

console.log(`Share growth validation passed: ${locales.length} localized links, preview restoration, attribution, and fallback guards.`)
