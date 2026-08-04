import { crosshairs } from '../src/data/crosshairs.js'
import { crosshairCopy } from '../src/i18n/translations.js'
import { parseCrosshairCode, updateCrosshairColor } from '../src/utils/crosshairCode.js'
import { dedupeCrosshairsByAppearance, haveSameVisibleShape } from '../src/utils/crosshairSimilarity.js'

const locales = ['en', 'es', 'zh-CN', 'pt-BR']
const categories = new Set(['dot', 'small', 'classic', 'cute', 'fun'])
const allowedLegacyDuplicateIds = new Set(['yay', 'recoil-c'])
const errors = []

function addError(item, message) {
  errors.push(`${item.id || '(missing id)'}: ${message}`)
}

function geometry(parsed) {
  const { outline, dot, inner, outer } = parsed.settings
  return JSON.stringify({ outline, dot, inner, outer })
}

function validateTokenStructure(item) {
  const tokens = item.code.split(';')
  if (tokens[0] !== '0') addError(item, 'code must start with version token "0"')
  if (tokens.some((token) => token === '')) addError(item, 'code contains an empty token')
  if (tokens.filter((token) => token === 'P').length !== 1) addError(item, 'code must contain exactly one primary P section')

  const sectionMarkers = new Set(['P', 'A', 'S'])
  for (let index = 1; index < tokens.length;) {
    if (sectionMarkers.has(tokens[index])) {
      index += 1
      continue
    }
    if (tokens[index + 1] === undefined || sectionMarkers.has(tokens[index + 1])) {
      addError(item, `unpaired token at position ${index}`)
      return
    }
    index += 2
  }
}

const ids = new Set()
const codes = new Set()

for (const item of crosshairs) {
  if (!item.id || ids.has(item.id)) addError(item, 'id is missing or duplicated')
  ids.add(item.id)
  if (!item.name || !item.shortName || !item.description) addError(item, 'display copy is incomplete')
  if (!categories.has(item.category)) addError(item, `unsupported category "${item.category}"`)
  if (!/^https:\/\//.test(item.sourceUrl || '')) addError(item, 'sourceUrl must be an HTTPS URL')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.sourceCheckedAt || '')) addError(item, 'sourceCheckedAt must use YYYY-MM-DD')
  if (codes.has(item.code)) addError(item, 'exact code is duplicated')
  codes.add(item.code)
  validateTokenStructure(item)

  for (const locale of locales) {
    const copy = crosshairCopy[item.id]?.[locale]
    if (!copy || copy.length !== 3 || copy.some((value) => !String(value).trim())) {
      addError(item, `missing complete ${locale} localization`)
    }
  }

  try {
    const parsed = parseCrosshairCode(item.code, { fallbackColor: item.color })
    const visible = [parsed.settings.dot, parsed.settings.inner, parsed.settings.outer].some((part) => part.enabled)
    if (!visible) addError(item, 'code has no visible primary component')

    const green = parseCrosshairCode(updateCrosshairColor(item.code, { preset: '1' }))
    const custom = parseCrosshairCode(updateCrosshairColor(item.code, { hex: '#3A86FF' }))
    if (geometry(parsed) !== geometry(green) || geometry(parsed) !== geometry(custom)) {
      addError(item, 'color rewrite changed crosshair geometry')
    }
  } catch (error) {
    addError(item, `parser rejected code (${error.code || error.message})`)
  }
}

const visibleCrosshairs = dedupeCrosshairsByAppearance(crosshairs)
const visibleIds = new Set(visibleCrosshairs.map((item) => item.id))
const hiddenDuplicates = crosshairs.filter((item) => !visibleIds.has(item.id))
const duplicatePairs = hiddenDuplicates.map((item) => {
  const original = crosshairs.find((candidate) => candidate.id !== item.id && haveSameVisibleShape(candidate, item))
  return `${item.id}≈${original?.id || 'unknown'}`
})

for (const item of hiddenDuplicates) {
  if (!allowedLegacyDuplicateIds.has(item.id)) addError(item, 'unexpected visual duplicate is hidden by the catalog')
}

if (visibleCrosshairs.length < 60) {
  errors.push(`catalog: expected at least 60 distinct visible styles, found ${visibleCrosshairs.length}`)
}

if (errors.length) {
  console.error(`Crosshair validation failed with ${errors.length} error(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`Crosshair validation passed: ${crosshairs.length} source codes, ${visibleCrosshairs.length} distinct visible styles.`)
  console.log(`Intentional legacy duplicates hidden by the UI: ${duplicatePairs.join(', ') || 'none'}.`)
  console.log('Every code parses, renders a visible primary component, keeps its geometry after preset/custom recoloring, and has EN/ES/ZH/PT copy.')
}
