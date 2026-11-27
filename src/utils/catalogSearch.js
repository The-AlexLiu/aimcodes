import { crosshairCollections, getCatalogCrosshair } from '../data/catalogManifest.js'
import { parseCrosshairCode } from './crosshairCode.js'

const genericTerms = new Set(['valorant', 'crosshair', 'crosshairs', 'code', 'codes', 'mira', 'miras', 'código', 'códigos', 'codigo', 'codigos', 'コード', '代码', 'の', 'de'])
const shapeAliases = {
  dot: ['dot', 'dots', 'punto', 'ponto', 'pontinho', 'ドット', '圆点'],
  circle: ['circle', 'ring', 'circular', 'círculo', 'circulo', '円形', 'リング', '圆形'],
  small: ['small', 'tiny', 'pequeña', 'pequeño', 'pequena', 'pequeno', '小さい', '小型'],
}
const colorAliases = {
  white: ['white', 'blanco', 'blanca', 'branco', 'branca', '白', '白色'],
  black: ['black', 'negro', 'negra', 'preto', 'preta', '黒', '黑色'],
  cyan: ['cyan', 'cian', 'ciano', 'シアン', '青色'],
  green: ['green', 'verde', '緑', '绿色'],
  yellow: ['yellow', 'amarillo', 'amarilla', 'amarelo', 'amarela', '黄', '黄色'],
  red: ['red', 'rojo', 'roja', 'vermelho', 'vermelha', '赤', '红色'],
  pink: ['pink', 'rosa', 'ピンク', '粉色'],
}
const aliases = new Map(Object.entries({ ...shapeAliases, ...colorAliases }).flatMap(
  ([key, words]) => words.map((word) => [word, key]),
))
const shapeIds = new Map(Object.keys(shapeAliases).map((key) => [key, new Set(crosshairCollections[key].crosshairIds)]))

function searchTerms(query) {
  return query.replace(/クロスヘア|准星/gu, ' ')
    .replace(/(?:ねこ|ネコ)/gu, '猫')
    .replace(/(白|赤|黒)い/gu, '$1 ')
    .replace(/(ドット|円形|圆点|圆形)/gu, ' $1 ')
    .replace(/の(?=\s|$)/gu, ' ')
    .trim().split(/\s+/u).filter((word) => word && !genericTerms.has(word))
    .map((word) => aliases.get(word) || word)
}

// The catalog deduplicates shapes for browsing. Searching must still resolve
// the original source profile when multiple players share the same shape.
export function searchCatalog({ crosshairs, sourceCrosshairs, query, language, activeFilter, recentIds, categoryLabel }) {
  const normalized = query.normalize('NFKC').trim().toLocaleLowerCase(language)
  const isCode = normalized.includes(';')
  const terms = isCode ? [] : searchTerms(normalized)
  const entries = isCode || terms.length || ['pro', 'recent'].includes(activeFilter) ? sourceCrosshairs : crosshairs

  return entries.filter((item) => {
    const matchesFilter = activeFilter === 'all'
      || (activeFilter === 'pro' && item.isPro)
      || (activeFilter === 'cute' && item.isCute)
      || (activeFilter === 'recent' && recentIds.includes(item.id))
      || item.category === activeFilter
    if (!matchesFilter) return false
    if (isCode) return item.code.toLowerCase().includes(normalized)
    if (!terms.length || item.id === normalized || item.id.replaceAll('-', ' ') === normalized) return true

    const source = getCatalogCrosshair(item.id)
    const text = [item.name, item.shortName, item.player, item.id, item.id.replaceAll('-', ' '), item.description,
      categoryLabel(item.category), item.colorName, item.colorKey, item.category, source?.name, source?.shortName]
      .join(' ').normalize('NFKC').toLocaleLowerCase(language)
    return terms.every((term) => {
      if (Object.hasOwn(colorAliases, term) && item.colorKey && item.colorKey !== 'custom') return item.colorKey === term
      // Descriptions also say things like "center dot off". A shape query
      // should use the catalog classification instead of that prose.
      if (shapeIds.has(term)) {
        const matchesShape = item.category === term || shapeIds.get(term).has(item.id) || Boolean(item.tags?.includes(term))
        if (term !== 'dot' || !matchesShape) return matchesShape
        return item.settings?.dot?.enabled ?? parseCrosshairCode(item.code).settings.dot.enabled
      }
      return text.includes(term)
    })
  })
}
