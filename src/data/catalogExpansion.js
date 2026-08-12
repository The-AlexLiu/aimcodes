import { generateCrosshairCode, parseCrosshairCode } from '../utils/crosshairCode.js'
import { haveSameVisibleShape } from '../utils/crosshairSimilarity.js'

const SOURCE_CHECKED_AT = '2026-08-11'
const TARGET_PER_FAMILY = 20
// Release index coverage in measured batches. Phase 2 raises the original
// seven-per-family baseline to 11, with two search-led families receiving one
// additional representative. This adds exactly 50 indexable shapes without
// making every generated variant indexable at once.
const INDEXABLE_PER_FAMILY = 11
const INDEXABLE_FAMILY_OVERRIDES = Object.freeze({ microGap: 12, tapDot: 12 })

const palette = [
  { key: 'cyan', preset: '5', hex: '#00ffff' },
  { key: 'green', preset: '1', hex: '#00ff00' },
  { key: 'white', preset: '0', hex: '#ffffff' },
  { key: 'yellow', preset: '4', hex: '#ffff00' },
  { key: 'red', preset: '7', hex: '#ff0000' },
  { key: 'pink', preset: '6', hex: '#ff00ff' },
]

const variantNames = [
  'Apex', 'Bolt', 'Drift', 'Echo', 'Flux', 'Ghost', 'Ion', 'Jolt', 'Kite', 'Lynx',
  'Mint', 'Nova', 'Orbit', 'Prism', 'Quartz', 'Rift', 'Slate', 'Tide', 'Vex', 'Wave',
]

const localizedVariantNames = {
  es: ['Ápice', 'Rayo', 'Deriva', 'Eco', 'Flujo', 'Fantasma', 'Ion', 'Salto', 'Cometa', 'Lince', 'Menta', 'Nova', 'Órbita', 'Prisma', 'Cuarzo', 'Grieta', 'Pizarra', 'Marea', 'Vórtice', 'Ola'],
  'pt-BR': ['Ápice', 'Raio', 'Deriva', 'Eco', 'Fluxo', 'Fantasma', 'Íon', 'Salto', 'Pipa', 'Lince', 'Menta', 'Nova', 'Órbita', 'Prisma', 'Quartzo', 'Fenda', 'Ardósia', 'Maré', 'Vórtice', 'Onda'],
  'zh-CN': ['尖峰', '闪电', '漂移', '回声', '流光', '幽灵', '离子', '跃动', '风筝', '山猫', '薄荷', '新星', '轨道', '棱镜', '石英', '裂隙', '岩板', '潮汐', '涡旋', '波浪'],
}

const familyCopy = {
  microGap: {
    labels: { en: 'Micro Gap', es: 'Microespacio', 'pt-BR': 'Micro Espaço', 'zh-CN': '微距十字' },
    descriptions: { en: 'Tiny inner lines keep the head visible.', es: 'Las líneas mínimas dejan la cabeza a la vista.', 'pt-BR': 'Linhas mínimas deixam a cabeça visível.', 'zh-CN': '极短内线留出清楚的爆头空间。' },
    best: { en: 'one taps and clean first bullets', es: 'one taps y primeras balas limpias', 'pt-BR': 'one taps e primeiras balas limpas', 'zh-CN': '单点和第一枪定位' },
    tradeoff: { en: 'The compact shape can disappear on busy backgrounds.', es: 'La forma compacta puede perderse en fondos cargados.', 'pt-BR': 'O formato compacto pode sumir em fundos carregados.', 'zh-CN': '画面复杂时，小体积可能会被背景吃掉。' },
  },
  tapDot: {
    labels: { en: 'Tap Dot', es: 'Punto Tap', 'pt-BR': 'Ponto Tap', 'zh-CN': '点射小点' },
    descriptions: { en: 'A center dot anchors short supporting lines.', es: 'Un punto central fija unas líneas cortas de apoyo.', 'pt-BR': 'Um ponto central ancora linhas curtas de apoio.', 'zh-CN': '中心点配短线，抬枪时更容易锁住。' },
    best: { en: 'Vandal taps and fast target switches', es: 'taps con Vandal y cambios rápidos de objetivo', 'pt-BR': 'taps de Vandal e trocas rápidas de alvo', 'zh-CN': 'Vandal 点射和快速转火' },
    tradeoff: { en: 'The center dot covers slightly more of a distant head.', es: 'El punto tapa un poco más una cabeza lejana.', 'pt-BR': 'O ponto cobre um pouco mais a cabeça distante.', 'zh-CN': '远距离时，中心点会多挡一点头部。' },
  },
  compactCross: {
    labels: { en: 'Compact Cross', es: 'Cruz Compacta', 'pt-BR': 'Cruz Compacta', 'zh-CN': '紧凑十字' },
    descriptions: { en: 'Short solid arms make the center quick to read.', es: 'Los brazos cortos hacen que el centro se lea rápido.', 'pt-BR': 'Braços curtos deixam o centro fácil de ler.', 'zh-CN': '短而实的线条让中心一眼就能找到。' },
    best: { en: 'balanced rifle play and everyday ranked games', es: 'rifles y partidas ranked del día a día', 'pt-BR': 'rifles e ranked do dia a dia', 'zh-CN': '步枪通用和日常排位' },
    tradeoff: { en: 'Thicker versions trade target clarity for visibility.', es: 'Las versiones gruesas cambian claridad por visibilidad.', 'pt-BR': 'Versões grossas trocam clareza por visibilidade.', 'zh-CN': '较粗版本更醒目，但会多挡一点目标。' },
  },
  openCross: {
    labels: { en: 'Open Cross', es: 'Cruz Abierta', 'pt-BR': 'Cruz Aberta', 'zh-CN': '开放十字' },
    descriptions: { en: 'A wider center gap keeps the target unobstructed.', es: 'Un centro más abierto deja el objetivo despejado.', 'pt-BR': 'Um centro mais aberto deixa o alvo livre.', 'zh-CN': '更大的中心留空，不容易挡住目标。' },
    best: { en: 'head-level placement and long-range fights', es: 'colocación a la altura de la cabeza y duelos largos', 'pt-BR': 'mira na altura da cabeça e duelos longos', 'zh-CN': '头线预瞄和中远距离对枪' },
    tradeoff: { en: 'A wide gap gives less help for exact micro-corrections.', es: 'Un hueco amplio ayuda menos en microajustes exactos.', 'pt-BR': 'Um vão amplo ajuda menos nos microajustes.', 'zh-CN': '留空太大时，细微修枪的参照会变少。' },
  },
  tracker: {
    labels: { en: 'Tracker', es: 'Tracker', 'pt-BR': 'Tracker', 'zh-CN': '跟枪十字' },
    descriptions: { en: 'Longer arms give the eye more movement reference.', es: 'Los brazos largos dan más referencia al seguir movimiento.', 'pt-BR': 'Braços longos dão mais referência para acompanhar movimento.', 'zh-CN': '较长线条给眼睛更多跟枪参照。' },
    best: { en: 'Phantom sprays, tracking, and close fights', es: 'spray con Phantom, tracking y peleas cercanas', 'pt-BR': 'spray de Phantom, tracking e lutas próximas', 'zh-CN': 'Phantom 扫射、跟枪和近距离交火' },
    tradeoff: { en: 'Long arms take up more space around small targets.', es: 'Los brazos largos ocupan más espacio alrededor del objetivo.', 'pt-BR': 'Braços longos ocupam mais espaço ao redor do alvo.', 'zh-CN': '长线会占用更多目标周围的画面。' },
  },
  twinLine: {
    labels: { en: 'Twin Line', es: 'Doble Línea', 'pt-BR': 'Linha Dupla', 'zh-CN': '双层短线' },
    descriptions: { en: 'Inner and outer markers separate aim from recoil reference.', es: 'Las marcas interiores y exteriores separan puntería y referencia.', 'pt-BR': 'Marcas internas e externas separam mira e referência.', 'zh-CN': '内外两层线分别提供中心与后坐参照。' },
    best: { en: 'players who want extra visual reference without a center dot', es: 'jugadores que quieren más referencia sin punto central', 'pt-BR': 'quem quer mais referência sem ponto central', 'zh-CN': '想要更多视觉参照、又不想开中心点的玩家' },
    tradeoff: { en: 'Two layers are busier than a simple four-line crosshair.', es: 'Dos capas se ven más cargadas que una cruz simple.', 'pt-BR': 'Duas camadas ficam mais carregadas que uma cruz simples.', 'zh-CN': '双层结构会比普通四线准星更花。' },
  },
  pinpoint: {
    labels: { en: 'Pinpoint', es: 'Punto Fino', 'pt-BR': 'Ponto Fino', 'zh-CN': '针点标记' },
    descriptions: { en: 'A small dot pairs with distant outer markers.', es: 'Un punto pequeño se combina con marcas exteriores.', 'pt-BR': 'Um ponto pequeno combina com marcas externas.', 'zh-CN': '小中心点配远端外线，中心更干净。' },
    best: { en: 'precise taps with a little peripheral guidance', es: 'taps precisos con algo de guía periférica', 'pt-BR': 'taps precisos com apoio visual ao redor', 'zh-CN': '精准点射，同时保留一点外围参照' },
    tradeoff: { en: 'Outer markers may distract during very tight angle holds.', es: 'Las marcas exteriores pueden distraer en ángulos muy cerrados.', 'pt-BR': 'Marcas externas podem distrair em ângulos fechados.', 'zh-CN': '架很窄的角度时，远端外线可能会分散注意力。' },
  },
  outerMark: {
    labels: { en: 'Outer Mark', es: 'Marca Exterior', 'pt-BR': 'Marca Externa', 'zh-CN': '外圈标记' },
    descriptions: { en: 'Small inner lines sit inside a clear outer frame.', es: 'Líneas interiores pequeñas quedan dentro de un marco exterior.', 'pt-BR': 'Linhas internas pequenas ficam dentro de uma moldura externa.', 'zh-CN': '小内线外再加一层清楚的定位框。' },
    best: { en: 'spray control practice and deliberate crosshair placement', es: 'practicar el spray y colocar la mira con intención', 'pt-BR': 'treino de spray e posicionamento consciente', 'zh-CN': '压枪练习和有意识的准星预瞄' },
    tradeoff: { en: 'The outer frame is more visible but also more distracting.', es: 'El marco exterior se ve más, pero también distrae más.', 'pt-BR': 'A moldura externa aparece mais, mas também distrai mais.', 'zh-CN': '外框更醒目，但视觉干扰也更高。' },
  },
  tallAxis: {
    labels: { en: 'Tall Axis', es: 'Eje Alto', 'pt-BR': 'Eixo Alto', 'zh-CN': '竖轴十字' },
    descriptions: { en: 'Long vertical arms keep horizontal vision open.', es: 'Los brazos verticales largos dejan libre la visión horizontal.', 'pt-BR': 'Braços verticais longos deixam a visão horizontal livre.', 'zh-CN': '纵向更长，横向视野保持干净。' },
    best: { en: 'holding narrow lanes and reading horizontal movement', es: 'aguantar pasillos y leer movimiento horizontal', 'pt-BR': 'segurar corredores e ler movimento horizontal', 'zh-CN': '架窄通道和观察横向移动' },
    tradeoff: { en: 'The unusual proportions take a few rounds to feel natural.', es: 'Las proporciones poco comunes necesitan adaptación.', 'pt-BR': 'A proporção diferente exige algumas rodadas de adaptação.', 'zh-CN': '不对称比例需要几局适应。' },
  },
  wideAxis: {
    labels: { en: 'Wide Axis', es: 'Eje Ancho', 'pt-BR': 'Eixo Largo', 'zh-CN': '横轴十字' },
    descriptions: { en: 'Long horizontal arms emphasize the head line.', es: 'Los brazos horizontales largos remarcan la línea de cabeza.', 'pt-BR': 'Braços horizontais longos destacam a linha da cabeça.', 'zh-CN': '横向更长，头线位置更好读。' },
    best: { en: 'head-height discipline and wide swing practice', es: 'mantener la altura de cabeza y practicar swings amplios', 'pt-BR': 'manter a altura da cabeça e treinar swings largos', 'zh-CN': '保持头线和练习大拉身位' },
    tradeoff: { en: 'Long horizontal bars can cover thin silhouettes.', es: 'Las barras horizontales pueden tapar siluetas finas.', 'pt-BR': 'Barras horizontais podem cobrir silhuetas finas.', 'zh-CN': '横线太长时会遮住细小轮廓。' },
  },
  burstRing: {
    labels: { en: 'Burst Ring', es: 'Anillo de Ráfaga', 'pt-BR': 'Anel de Rajada', 'zh-CN': '爆发圆环' },
    descriptions: { en: 'A bold core and outer markers create a high-visibility ring.', es: 'Un centro marcado y señales exteriores forman un anillo visible.', 'pt-BR': 'Um centro forte e marcas externas formam um anel visível.', 'zh-CN': '粗中心配外圈标记，画面里非常醒目。' },
    best: { en: 'fast close-range fights and players who lose tiny sights', es: 'duelos cercanos y jugadores que pierden miras pequeñas', 'pt-BR': 'duelos próximos e quem perde miras pequenas', 'zh-CN': '近距离快节奏交火和容易看丢小准星的玩家' },
    tradeoff: { en: 'High visibility comes with more target coverage.', es: 'La alta visibilidad tapa más el objetivo.', 'pt-BR': 'A alta visibilidade cobre mais o alvo.', 'zh-CN': '醒目带来的代价是遮挡更多目标。' },
  },
  guardFrame: {
    labels: { en: 'Guard Frame', es: 'Marco Guardián', 'pt-BR': 'Moldura Guardiã', 'zh-CN': '守卫框架' },
    descriptions: { en: 'Thick inner lines and a spaced outer frame stay visible in chaos.', es: 'Líneas gruesas y un marco separado siguen visibles en el caos.', 'pt-BR': 'Linhas grossas e moldura espaçada continuam visíveis no caos.', 'zh-CN': '厚内线加远端外框，混战里也不容易丢。' },
    best: { en: 'busy sites, utility-heavy rounds, and high visibility', es: 'sites cargados, rondas con utilidad y máxima visibilidad', 'pt-BR': 'sites cheios, rounds com utilitário e muita visibilidade', 'zh-CN': '道具很多的包点混战和高可见度需求' },
    tradeoff: { en: 'This is the busiest family in the expanded catalog.', es: 'Es la familia visualmente más cargada del catálogo.', 'pt-BR': 'É a família mais carregada do catálogo.', 'zh-CN': '这是扩展库里视觉元素最多的一组。' },
  },
}

function baseOptions(overrides = {}) {
  return {
    colorPreset: '5',
    outline: { enabled: false, opacity: 1, thickness: 1 },
    dot: { enabled: false, opacity: 1, size: 2 },
    inner: { enabled: false, opacity: 1, length: 0, thickness: 1, offset: 0 },
    outer: { enabled: false, opacity: 1, length: 0, thickness: 1, offset: 0 },
    movementError: false,
    firingError: false,
    ...overrides,
  }
}

function combinations(values, build) {
  const items = []
  const walk = (depth, current) => {
    if (depth === values.length) {
      items.push(build(current))
      return
    }
    for (const value of values[depth]) walk(depth + 1, [...current, value])
  }
  walk(0, [])
  return items
}

const familyDefinitions = [
  {
    key: 'microGap', category: 'small', useCases: ['headshots', 'one-tap', 'vandal'],
    candidates: () => combinations([[1, 3, 5], [1, 2], [1, 2, 3, 4], [false, true]], ([length, thickness, offset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, length, thickness, offset } })),
  },
  {
    key: 'tapDot', category: 'dot', useCases: ['headshots', 'one-tap', 'vandal'],
    candidates: () => combinations([[1, 2, 3, 4], [1, 3, 5], [1, 2], [0, 2, 4], [false, true]], ([dotSize, length, thickness, offset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, dot: { enabled: true, opacity: 1, size: dotSize }, inner: { enabled: true, opacity: 1, length, thickness, offset } })),
  },
  {
    key: 'compactCross', category: 'small', useCases: ['beginner', 'phantom', 'balanced'],
    candidates: () => combinations([[2, 4, 6], [2, 3, 4], [0, 1, 2, 3], [false, true]], ([length, thickness, offset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, length, thickness, offset } })),
  },
  {
    key: 'openCross', category: 'classic', useCases: ['headshots', 'vandal', 'beginner'],
    candidates: () => combinations([[3, 5, 7, 9], [1, 2], [4, 6, 8], [false, true]], ([length, thickness, offset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, length, thickness, offset } })),
  },
  {
    key: 'tracker', category: 'classic', useCases: ['phantom', 'tracking', 'beginner'],
    candidates: () => combinations([[5, 7, 9, 11], [2, 3, 4], [1, 3, 5], [false, true]], ([length, thickness, offset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, length, thickness, offset } })),
  },
  {
    key: 'twinLine', category: 'classic', useCases: ['vandal', 'phantom', 'tracking'],
    candidates: () => combinations([[1, 3, 5], [1, 2], [1, 3], [1, 3], [1, 2], [5, 7], [false, true]], ([innerLength, innerThickness, innerOffset, outerLength, outerThickness, outerOffset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, length: innerLength, thickness: innerThickness, offset: innerOffset }, outer: { enabled: true, opacity: 1, length: outerLength, thickness: outerThickness, offset: outerOffset } })),
  },
  {
    key: 'pinpoint', category: 'dot', useCases: ['headshots', 'one-tap', 'minimalist'],
    candidates: () => combinations([[1, 2, 3, 4], [1, 3, 5], [1, 2], [5, 7, 9], [false, true]], ([dotSize, length, thickness, offset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, dot: { enabled: true, opacity: 1, size: dotSize }, outer: { enabled: true, opacity: 1, length, thickness, offset } })),
  },
  {
    key: 'outerMark', category: 'classic', useCases: ['tracking', 'phantom', 'beginner'],
    candidates: () => combinations([[1, 3], [1, 2], [0, 2], [3, 5, 7], [1, 2], [6, 8], [false, true]], ([innerLength, innerThickness, innerOffset, outerLength, outerThickness, outerOffset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, length: innerLength, thickness: innerThickness, offset: innerOffset }, outer: { enabled: true, opacity: 1, length: outerLength, thickness: outerThickness, offset: outerOffset } })),
  },
  {
    key: 'tallAxis', category: 'classic', useCases: ['headshots', 'vandal', 'minimalist'],
    candidates: () => combinations([[1, 3, 5], [5, 7, 9], [1, 2], [1, 3, 5], [false, true]], ([horizontalLength, verticalLength, thickness, offset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, horizontalLength, verticalLength, thickness, offset } })),
  },
  {
    key: 'wideAxis', category: 'classic', useCases: ['headshots', 'vandal', 'minimalist'],
    candidates: () => combinations([[5, 7, 9], [1, 3, 5], [1, 2], [1, 3, 5], [false, true]], ([horizontalLength, verticalLength, thickness, offset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, horizontalLength, verticalLength, thickness, offset } })),
  },
  {
    key: 'burstRing', category: 'fun', useCases: ['circle', 'beginner', 'visibility'],
    candidates: () => combinations([[1, 2, 3, 4], [1, 3], [3, 4, 5], [0, 1, 2], [1, 3], [1, 2], [4, 6], [false, true]], ([dotSize, innerLength, innerThickness, innerOffset, outerLength, outerThickness, outerOffset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, dot: { enabled: true, opacity: 1, size: dotSize }, inner: { enabled: true, opacity: 1, length: innerLength, thickness: innerThickness, offset: innerOffset }, outer: { enabled: true, opacity: 1, length: outerLength, thickness: outerThickness, offset: outerOffset } })),
  },
  {
    key: 'guardFrame', category: 'fun', useCases: ['phantom', 'beginner', 'visibility'],
    candidates: () => combinations([[3, 5, 7], [2, 3], [1, 2], [1, 3, 5], [2, 3, 4], [6, 8], [false, true]], ([innerLength, innerThickness, innerOffset, outerLength, outerThickness, outerOffset, outline]) => baseOptions({ outline: { enabled: outline, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, length: innerLength, thickness: innerThickness, offset: innerOffset }, outer: { enabled: true, opacity: 1, length: outerLength, thickness: outerThickness, offset: outerOffset } })),
  },
]

function lineSummary(locale, parsed) {
  const { outline, dot, inner, outer } = parsed.settings
  const innerValue = inner.enabled ? `${inner.horizontalLength}×${inner.verticalLength}/${inner.thickness}/${inner.offset}` : '-'
  const outerValue = outer.enabled ? `${outer.horizontalLength}×${outer.verticalLength}/${outer.thickness}/${outer.offset}` : '-'
  const dotValue = dot.enabled ? String(dot.size) : '-'
  const labels = {
    en: `Setup: inner ${innerValue}, outer ${outerValue}, dot ${dotValue}, outline ${outline.enabled ? 'on' : 'off'}.`,
    es: `Ajuste: interior ${innerValue}, exterior ${outerValue}, punto ${dotValue}, contorno ${outline.enabled ? 'sí' : 'no'}.`,
    'pt-BR': `Ajuste: interna ${innerValue}, externa ${outerValue}, ponto ${dotValue}, contorno ${outline.enabled ? 'sim' : 'não'}.`,
    'zh-CN': `参数：内线 ${innerValue}，外线 ${outerValue}，中心点 ${dotValue}，描边 ${outline.enabled ? '开' : '关'}。`,
  }
  return labels[locale] || labels.en
}

function localizedCopy(definition, variantName, parsed) {
  return Object.fromEntries(Object.keys(definition.labels).map((locale) => {
    const label = definition.labels[locale]
    const variantIndex = variantNames.indexOf(variantName)
    const localizedVariant = localizedVariantNames[locale]?.[variantIndex] || variantName
    const description = `${definition.descriptions[locale]} ${lineSummary(locale, parsed)}`
    return [locale, [`${label} — ${localizedVariant}`, `${label} ${localizedVariant}`, description]]
  }))
}

function localizedSeoDetails(definition, parsed) {
  const leadIns = {
    en: 'Great for',
    es: 'Va bien para',
    'pt-BR': 'Boa para',
    'zh-CN': '适合',
  }
  return Object.fromEntries(Object.keys(definition.labels).map((locale) => [locale, {
    bestFor: locale === 'zh-CN'
      ? `${leadIns[locale]}${definition.best[locale]}。${definition.descriptions[locale]}${lineSummary(locale, parsed)}`
      : `${leadIns[locale]} ${definition.best[locale]}. ${definition.descriptions[locale]} ${lineSummary(locale, parsed)}`,
    tradeoff: definition.tradeoff[locale],
  }]))
}

export function buildCatalogExpansion(existingCrosshairs = []) {
  const accepted = []

  for (const family of familyDefinitions) {
    const definition = familyCopy[family.key]
    let familyCount = 0

    for (const options of family.candidates()) {
      if (familyCount >= TARGET_PER_FAMILY) break
      const paletteItem = palette[(accepted.length + familyCount) % palette.length]
      const code = generateCrosshairCode({ ...options, colorPreset: paletteItem.preset })
      const candidate = { code, color: paletteItem.hex }
      if ([...existingCrosshairs, ...accepted].some((item) => haveSameVisibleShape(item, candidate))) continue

      const parsed = parseCrosshairCode(code, { fallbackColor: paletteItem.hex })
      const variantName = variantNames[familyCount]
      const id = `${family.key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}-${variantName.toLowerCase()}`
      const copy = localizedCopy(definition, variantName, parsed)
      accepted.push({
        id,
        name: copy.en[0],
        shortName: copy.en[1],
        description: copy.en[2],
        player: '',
        category: family.category,
        colorName: paletteItem.key,
        colorKey: paletteItem.key,
        color: paletteItem.hex,
        isPro: false,
        isCute: false,
        code,
        sourceName: 'AimCodes · Original',
        sourceUrl: 'https://aimcodes.com/en/about/',
        sourceCheckedAt: SOURCE_CHECKED_AT,
        designFamily: family.key,
        useCases: family.useCases,
        tags: [family.key, family.category, paletteItem.key, ...family.useCases],
        localizedCopy: copy,
        seoDetails: localizedSeoDetails(definition, parsed),
      })
      familyCount += 1
    }

    if (familyCount !== TARGET_PER_FAMILY) {
      throw new Error(`Catalog expansion family ${family.key} generated ${familyCount}/${TARGET_PER_FAMILY} unique shapes`)
    }
  }

  return accepted
}

export const EXPANSION_FAMILY_KEYS = Object.freeze(familyDefinitions.map((family) => family.key))

export function expansionIdsForFamily(items, familyKey, limit = TARGET_PER_FAMILY) {
  return items.filter((item) => item.designFamily === familyKey).slice(0, limit).map((item) => item.id)
}

export function expansionIdsForColor(items, colorKey, limit = 8) {
  return items.filter((item) => item.colorKey === colorKey).slice(0, limit).map((item) => item.id)
}

export function indexableExpansionIds(items) {
  return familyDefinitions.flatMap((family) => expansionIdsForFamily(
    items,
    family.key,
    INDEXABLE_FAMILY_OVERRIDES[family.key] || INDEXABLE_PER_FAMILY,
  ))
}

export function indexableLimitForFamily(familyKey) {
  return INDEXABLE_FAMILY_OVERRIDES[familyKey] || INDEXABLE_PER_FAMILY
}
