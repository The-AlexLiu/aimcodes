const COLOR_PRESETS = {
  0: { hex: '#ffffff', key: 'white' },
  1: { hex: '#00ff00', key: 'green' },
  2: { hex: '#7fff00', key: 'lime' },
  3: { hex: '#dfff00', key: 'chartreuse' },
  4: { hex: '#ffff00', key: 'yellow' },
  5: { hex: '#00ffff', key: 'cyan' },
  6: { hex: '#ff00ff', key: 'pink' },
  7: { hex: '#ff0000', key: 'red' },
}

const SECTION_MARKERS = new Set(['P', 'A', 'S'])

function parseError(code) {
  const error = new Error(code)
  error.code = code
  throw error
}

function numberValue(values, key, fallback, min = -Infinity, max = Infinity) {
  if (!values.has(key)) return fallback
  const parsed = Number(values.get(key))
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}

function booleanValue(values, key, fallback) {
  if (!values.has(key)) return fallback
  return values.get(key) !== '0'
}

function parsePrimaryValues(tokens) {
  const primaryIndex = tokens.indexOf('P')
  if (primaryIndex === -1) parseError('missingPrimary')

  const values = new Map()
  for (let index = primaryIndex + 1; index < tokens.length; index += 2) {
    const key = tokens[index]
    if (SECTION_MARKERS.has(key)) break
    const value = tokens[index + 1]
    if (!key || value === undefined || SECTION_MARKERS.has(value)) break
    values.set(key, value)
  }
  return values
}

function customColor(values, fallbackColor) {
  const preset = COLOR_PRESETS[values.get('c') ?? 0]
  if (values.get('c') !== '8') return preset || COLOR_PRESETS[0]

  const raw = values.get('u') || ''
  const rgb = raw.replace(/^#/, '').slice(0, 6)
  if (/^[0-9a-f]{6}$/i.test(rgb)) return { hex: `#${rgb}`, key: 'custom' }
  return { hex: fallbackColor || '#ffffff', key: 'custom', approximate: true }
}

function lineSettings(values, prefix, defaults) {
  const horizontalLength = numberValue(values, `${prefix}l`, defaults.length, 0, 20)
  const verticalLength = booleanValue(values, `${prefix}g`, false)
    ? numberValue(values, `${prefix}v`, horizontalLength, 0, 20)
    : horizontalLength
  const opacity = numberValue(values, `${prefix}a`, defaults.opacity, 0, 1)
  const enabled = booleanValue(values, `${prefix}b`, true) && opacity > 0 && (horizontalLength > 0 || verticalLength > 0)

  return {
    enabled,
    opacity,
    horizontalLength,
    verticalLength,
    thickness: numberValue(values, `${prefix}t`, defaults.thickness, 0, 10),
    offset: numberValue(values, `${prefix}o`, defaults.offset, 0, 20),
  }
}

export function normalizeCrosshairCode(value = '') {
  return String(value).trim().replace(/\s+/g, '')
}

function removePrimaryPair(tokens, key) {
  const primaryIndex = tokens.indexOf('P')
  if (primaryIndex === -1) parseError('missingPrimary')

  for (let index = primaryIndex + 1; index < tokens.length; index += 2) {
    if (SECTION_MARKERS.has(tokens[index])) break
    if (tokens[index] === key) {
      tokens.splice(index, 2)
      return
    }
  }
}

export function updateCrosshairColor(value, { preset, hex } = {}) {
  const code = normalizeCrosshairCode(value)
  parseCrosshairCode(code)
  const tokens = code.split(';').filter(Boolean)
  const primaryIndex = tokens.indexOf('P')
  const normalizedHex = String(hex || '').replace(/^#/, '').toUpperCase()
  const isCustom = Boolean(hex)

  if (isCustom && !/^[0-9A-F]{6}$/.test(normalizedHex)) parseError('invalidColor')
  if (!isCustom && !/^[0-7]$/.test(String(preset))) parseError('invalidColor')

  removePrimaryPair(tokens, 'c')
  removePrimaryPair(tokens, 'u')
  tokens.splice(primaryIndex + 1, 0, 'c', isCustom ? '8' : String(preset))
  if (isCustom) tokens.splice(primaryIndex + 3, 0, 'u', `${normalizedHex}FF`)

  return tokens.join(';')
}

export function parseCrosshairCode(value, { fallbackColor } = {}) {
  const code = normalizeCrosshairCode(value)
  if (code.length < 10) parseError('tooShort')
  if (!/^[0-9A-Za-z;.#-]+$/.test(code)) parseError('invalidChars')

  const tokens = code.split(';').filter(Boolean)
  const values = parsePrimaryValues(tokens)
  const color = customColor(values, fallbackColor)
  const outlineOpacity = numberValue(values, 'o', 0.5, 0, 1)
  const outlineEnabled = booleanValue(values, 'h', true) && outlineOpacity > 0

  const settings = {
    outline: {
      enabled: outlineEnabled,
      opacity: outlineOpacity,
      thickness: numberValue(values, 't', 1, 1, 6),
    },
    dot: {
      enabled: booleanValue(values, 'd', false) && numberValue(values, 'a', 1, 0, 1) > 0,
      opacity: numberValue(values, 'a', 1, 0, 1),
      size: numberValue(values, 'z', 2, 1, 6),
    },
    inner: lineSettings(values, '0', { length: 6, thickness: 2, offset: 3, opacity: 0.8 }),
    outer: lineSettings(values, '1', { length: 2, thickness: 2, offset: 10, opacity: 0.35 }),
    movementError: { enabled: booleanValue(values, '0m', false) },
    firingError: { enabled: booleanValue(values, '0f', false) },
  }

  return {
    code,
    color: color.hex,
    colorKey: color.key,
    settings,
    approximate: Boolean(color.approximate),
  }
}

function safeNumber(value, fallback, min, max) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}

export function generateCrosshairCode(options = {}) {
  const colorPreset = String(options.colorPreset ?? 5)
  const customHex = String(options.customColor || '').replace(/^#/, '').slice(0, 6).toUpperCase()
  const useCustomColor = colorPreset === '8' && /^[0-9A-F]{6}$/.test(customHex)
  const tokens = ['0', 'P', 'c', useCustomColor ? '8' : /^[0-7]$/.test(colorPreset) ? colorPreset : '5']

  if (useCustomColor) tokens.push('u', `${customHex}FF`)

  const outline = options.outline || {}
  const dot = options.dot || {}
  const inner = options.inner || {}
  const outer = options.outer || {}
  tokens.push(
    'h', outline.enabled ? '1' : '0',
    'o', String(safeNumber(outline.opacity, 1, 0, 1)),
    't', String(safeNumber(outline.thickness, 1, 1, 6)),
    'd', dot.enabled ? '1' : '0',
    'a', String(safeNumber(dot.opacity, 1, 0, 1)),
    'z', String(safeNumber(dot.size, 2, 1, 6)),
    '0b', inner.enabled === false ? '0' : '1',
    '0a', String(safeNumber(inner.opacity, 1, 0, 1)),
    '0l', String(safeNumber(inner.length, 4, 0, 20)),
    '0t', String(safeNumber(inner.thickness, 2, 0, 10)),
    '0o', String(safeNumber(inner.offset, 2, 0, 20)),
    '0m', options.movementError ? '1' : '0',
    '0f', options.firingError ? '1' : '0',
    '1b', outer.enabled ? '1' : '0',
    '1a', String(safeNumber(outer.opacity, 1, 0, 1)),
    '1l', String(safeNumber(outer.length, 2, 0, 20)),
    '1t', String(safeNumber(outer.thickness, 2, 0, 10)),
    '1o', String(safeNumber(outer.offset, 10, 0, 20)),
    '1m', '0',
    '1f', '0',
  )

  const code = tokens.join(';')
  parseCrosshairCode(code)
  return code
}

export function inferCrosshairCategory(parsed) {
  const { dot, inner, outer } = parsed.settings
  if (dot.enabled && !inner.enabled && !outer.enabled) return 'dot'
  const maxLength = Math.max(inner.horizontalLength || 0, inner.verticalLength || 0, outer.horizontalLength || 0, outer.verticalLength || 0)
  return maxLength <= 2 ? 'small' : 'classic'
}

export function createLocalCrosshair({ name, code, source = '' }) {
  const parsed = parseCrosshairCode(code)
  const createdAt = new Date().toISOString()
  const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

  return {
    id,
    name: name.trim(),
    shortName: name.trim(),
    description: parsed.approximate ? 'Mira salva localmente · cor personalizada aproximada' : 'Mira salva localmente a partir do código',
    player: '',
    category: inferCrosshairCategory(parsed),
    colorKey: parsed.colorKey,
    colorName: parsed.colorKey,
    color: parsed.color,
    isPro: false,
    isLocal: true,
    code: parsed.code,
    sourceName: source ? 'Fonte informada' : 'Salva neste navegador',
    sourceUrl: source,
    sourceCheckedAt: createdAt.slice(0, 10),
    createdAt,
  }
}
