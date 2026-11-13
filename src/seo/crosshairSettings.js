import { parseCrosshairCode } from '../utils/crosshairCode.js'

const settingLabels = {
  en: { movement: 'Movement error', firing: 'Firing error', dot: 'Center dot', outline: 'Outline', inner: 'Inner lines', outer: 'Outer lines', color: 'Color', on: 'On', off: 'Off', size: 'Size', length: 'Length', thickness: 'Thickness', offset: 'Offset' },
  es: { movement: 'Error de movimiento', firing: 'Error de disparo', dot: 'Punto central', outline: 'Contorno', inner: 'Líneas internas', outer: 'Líneas externas', color: 'Color', on: 'Sí', off: 'No', size: 'Tamaño', length: 'Longitud', thickness: 'Grosor', offset: 'Separación' },
  'pt-BR': { movement: 'Erro de movimento', firing: 'Erro de disparo', dot: 'Ponto central', outline: 'Contorno', inner: 'Linhas internas', outer: 'Linhas externas', color: 'Cor', on: 'Sim', off: 'Não', size: 'Tamanho', length: 'Comprimento', thickness: 'Espessura', offset: 'Espaço' },
  'zh-CN': { movement: '移动误差', firing: '射击误差', dot: '中心点', outline: '轮廓', inner: '内侧线条', outer: '外侧线条', color: '颜色', on: '开启', off: '关闭', size: '大小', length: '长度', thickness: '粗细', offset: '间距' },
  ja: { movement: '移動エラー', firing: '射撃エラー', dot: 'センタードット', outline: '輪郭', inner: '内側ライン', outer: '外側ライン', color: '色', on: 'オン', off: 'オフ', size: 'サイズ', length: '長さ', thickness: '太さ', offset: 'オフセット' },
}

const colorAliases = Object.freeze({
  ciano: 'cyan', cyan: 'cyan',
  branco: 'white', white: 'white',
  verde: 'green', green: 'green',
  amarelo: 'yellow', yellow: 'yellow',
  vermelho: 'red', red: 'red',
  rosa: 'pink', pink: 'pink', magenta: 'pink',
  preto: 'black', black: 'black',
  personalizada: 'custom', personalizado: 'custom', custom: 'custom',
})

const localizedColors = Object.freeze({
  en: { cyan: 'Cyan', white: 'White', green: 'Green', yellow: 'Yellow', red: 'Red', pink: 'Pink', black: 'Black', custom: 'Custom' },
  es: { cyan: 'Cian', white: 'Blanco', green: 'Verde', yellow: 'Amarillo', red: 'Rojo', pink: 'Rosa', black: 'Negro', custom: 'Personalizado' },
  'pt-BR': { cyan: 'Ciano', white: 'Branco', green: 'Verde', yellow: 'Amarelo', red: 'Vermelho', pink: 'Rosa', black: 'Preto', custom: 'Personalizada' },
  'zh-CN': { cyan: '青色', white: '白色', green: '绿色', yellow: '黄色', red: '红色', pink: '粉色', black: '黑色', custom: '自定义' },
  ja: { cyan: 'シアン', white: '白', green: '緑', yellow: '黄', red: '赤', pink: 'ピンク', black: '黒', custom: 'カスタム' },
})

function settingEnabled(setting) {
  if (typeof setting === 'boolean') return setting
  if (setting && typeof setting === 'object' && 'enabled' in setting) return Boolean(setting.enabled)
  return Boolean(setting)
}

function displayLineLength(line) {
  if (line?.length !== undefined) return line.length
  const horizontal = line?.horizontalLength
  const vertical = line?.verticalLength
  if (horizontal === undefined && vertical === undefined) return null
  if (horizontal === undefined) return vertical
  if (vertical === undefined || horizontal === vertical) return horizontal
  return `${horizontal} × ${vertical}`
}

function enabledSettingValue(setting, labels, fields) {
  if (!settingEnabled(setting)) return labels.off
  const details = fields
    .map(([label, value]) => value === undefined || value === null ? null : `${label} ${value}`)
    .filter(Boolean)
  return [labels.on, ...details].join(' · ')
}

function localizedColorName(crosshair, locale) {
  const raw = String(crosshair.colorKey || crosshair.colorName || '').trim()
  const key = colorAliases[raw.toLowerCase()]
  return localizedColors[locale]?.[key] || localizedColors.en[key] || raw || crosshair.color || '—'
}

export function crosshairSettingRows(crosshair, locale) {
  const labels = settingLabels[locale] || settingLabels.en
  let settings = crosshair.settings || {}
  try {
    const parsed = parseCrosshairCode(crosshair.code, { fallbackColor: crosshair.color })
    settings = parsed.settings
    crosshair = { ...crosshair, colorKey: parsed.colorKey, color: parsed.color }
  } catch {
    // Legacy records can still expose their supplied settings.
  }
  const rows = []
  if (settings.dot !== undefined) rows.push([labels.dot, enabledSettingValue(settings.dot, labels, [[labels.size, settings.dot?.size]])])
  if (settings.outline !== undefined) rows.push([labels.outline, enabledSettingValue(settings.outline, labels, [[labels.thickness, settings.outline?.thickness]])])
  if (settings.inner !== undefined) rows.push([labels.inner, enabledSettingValue(settings.inner, labels, [[labels.length, displayLineLength(settings.inner)], [labels.thickness, settings.inner?.thickness], [labels.offset, settings.inner?.offset]])])
  if (settings.outer !== undefined) rows.push([labels.outer, enabledSettingValue(settings.outer, labels, [[labels.length, displayLineLength(settings.outer)], [labels.thickness, settings.outer?.thickness], [labels.offset, settings.outer?.offset]])])
  rows.push([labels.movement, settingEnabled(settings.movementError) ? labels.on : labels.off])
  rows.push([labels.firing, settingEnabled(settings.firingError) ? labels.on : labels.off])
  rows.push([labels.color, localizedColorName(crosshair, locale)])
  return rows
}
