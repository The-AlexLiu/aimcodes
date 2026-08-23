import { generateCrosshairCode, parseCrosshairCode } from '../utils/crosshairCode.js'
import { haveSameVisibleShape } from '../utils/crosshairSimilarity.js'

const SOURCE_CHECKED_AT = '2026-08-23'

const palette = Object.freeze({
  white: { preset: '0', hex: '#ffffff' },
  green: { preset: '1', hex: '#00ff00' },
  cyan: { preset: '5', hex: '#00ffff' },
  pink: { preset: '6', hex: '#ff00ff' },
  red: { preset: '7', hex: '#ff0000' },
  yellow: { preset: '4', hex: '#ffff00' },
})

const localeNames = Object.freeze({
  en: [
    'Pixel Sun', 'Disco Core', 'Arcade Button', 'Radar Ping', 'Portal Ring', 'Boss Marker', 'Candy Target', 'Neon Orbit',
    'Pixel Goggles', 'Laser Shades', 'Widescreen', 'Candy Bar', 'Signal Bars', 'Horizon Lock', 'Pixel Moustache', 'Stretch Plus',
    'Neon Totem', 'Radio Tower', 'Pixel Totem', 'Antenna', 'Cactus Core', 'Vertical Beam', 'Rocket Core', 'Tall Meme',
    'Crosshairception', 'Four Corners', 'Fortress Frame', 'Warning Frame', 'Chunky Plus', 'Double Cross', 'Shield Lock', 'Final Boss',
  ],
  es: [
    'Sol Píxel', 'Núcleo Disco', 'Botón Arcade', 'Pulso Radar', 'Anillo Portal', 'Marca de Jefe', 'Diana Caramelo', 'Órbita Neón',
    'Gafas Píxel', 'Gafas Láser', 'Pantalla Ancha', 'Barra Caramelo', 'Barras de Señal', 'Bloqueo Horizonte', 'Bigote Píxel', 'Plus Estirado',
    'Tótem Neón', 'Torre de Radio', 'Tótem Píxel', 'Antena', 'Núcleo Cactus', 'Haz Vertical', 'Núcleo Cohete', 'Meme Alto',
    'Mira Dentro de Mira', 'Cuatro Esquinas', 'Marco Fortaleza', 'Marco de Alerta', 'Plus Grande', 'Cruz Doble', 'Bloqueo Escudo', 'Jefe Final',
  ],
  'pt-BR': [
    'Sol Pixel', 'Núcleo Disco', 'Botão Arcade', 'Pulso de Radar', 'Anel Portal', 'Marca de Chefão', 'Alvo Doce', 'Órbita Neon',
    'Óculos Pixel', 'Óculos Laser', 'Tela Larga', 'Barra Doce', 'Barras de Sinal', 'Trava do Horizonte', 'Bigode Pixel', 'Mais Esticado',
    'Totem Neon', 'Torre de Rádio', 'Totem Pixel', 'Antena', 'Núcleo Cacto', 'Feixe Vertical', 'Núcleo Foguete', 'Meme Alto',
    'Mira Dentro da Mira', 'Quatro Cantos', 'Moldura Fortaleza', 'Moldura de Alerta', 'Mais Robusto', 'Cruz Dupla', 'Trava Escudo', 'Chefão Final',
  ],
  'zh-CN': [
    '像素太阳', '迪斯科核心', '街机按钮', '雷达脉冲', '传送门圆环', '首领标记', '糖果靶心', '霓虹轨道',
    '像素护目镜', '激光墨镜', '宽屏准星', '糖果横条', '信号条', '地平线锁定', '像素小胡子', '拉伸加号',
    '霓虹图腾', '无线电塔', '像素图腾', '天线准星', '仙人掌核心', '垂直光束', '火箭核心', '高个表情包',
    '准星套娃', '四角框', '堡垒框架', '警告框', '粗壮加号', '双层十字', '护盾锁定', '最终首领',
  ],
  ja: [
    'ピクセルサン', 'ディスココア', 'アーケードボタン', 'レーダーパルス', 'ポータルリング', 'ボスマーカー', 'キャンディターゲット', 'ネオンオービット',
    'ピクセルゴーグル', 'レーザーサングラス', 'ワイドスクリーン', 'キャンディバー', 'シグナルバー', 'ホライズンロック', 'ピクセルひげ', 'ストレッチプラス',
    'ネオントーテム', 'ラジオタワー', 'ピクセルトーテム', 'アンテナ', 'サボテンコア', 'バーティカルビーム', 'ロケットコア', 'トールミーム',
    'クロスヘア・イン・クロスヘア', 'フォーコーナー', 'フォートレスフレーム', 'ワーニングフレーム', 'チャンキープラス', 'ダブルクロス', 'シールドロック', 'ファイナルボス',
  ],
})

const groupCopy = Object.freeze({
  core: {
    description: {
      en: 'A bold center and short rays make this joke crosshair easy to spot.',
      es: 'Un centro marcado y rayos cortos hacen que esta mira de broma sea fácil de ver.',
      'pt-BR': 'Um centro forte e raios curtos deixam esta mira divertida fácil de encontrar.',
      'zh-CN': '醒目的中心配上短线，搞怪但不容易在画面里看丢。',
      ja: '太い中心と短いラインで、ネタ系でも見失いにくいクロスヘアです。',
    },
    bestFor: {
      en: 'casual matches, clips, and players who want a loud center',
      es: 'partidas casuales, clips y jugadores que quieren un centro muy visible',
      'pt-BR': 'partidas casuais, clipes e quem quer um centro bem visível',
      'zh-CN': '娱乐局、短视频素材，以及喜欢醒目中心的玩家',
      ja: 'カジュアル、クリップ撮影、中心をはっきり見たいプレイヤー',
    },
    tradeoff: {
      en: 'The chunky center covers more of distant targets than a tiny competitive sight.',
      es: 'El centro grueso tapa más los objetivos lejanos que una mira competitiva pequeña.',
      'pt-BR': 'O centro grosso cobre mais alvos distantes que uma mira competitiva pequena.',
      'zh-CN': '中心比较粗，远距离会比微型竞技准星多挡一点目标。',
      ja: '中心が太いため、小型の競技向けクロスヘアより遠距離の敵を隠しやすくなります。',
    },
  },
  wide: {
    description: {
      en: 'The horizontal-heavy shape looks like a game HUD sticker while keeping the exact center readable.',
      es: 'La forma horizontal parece una pegatina de HUD sin perder el centro exacto.',
      'pt-BR': 'O formato horizontal lembra um adesivo de HUD sem esconder o centro exato.',
      'zh-CN': '横向造型像游戏 HUD 贴纸，同时保留清楚的中心定位。',
      ja: '横長のHUDステッカー風デザインで、中心位置もしっかり読めます。',
    },
    bestFor: {
      en: 'funny clips and players who like a strong head-line reference',
      es: 'clips divertidos y jugadores que prefieren una referencia horizontal fuerte',
      'pt-BR': 'clipes divertidos e quem gosta de uma referência horizontal forte',
      'zh-CN': '搞笑集锦和喜欢明显头线参照的玩家',
      ja: 'ネタ動画と、ヘッドラインを強く意識したいプレイヤー',
    },
    tradeoff: {
      en: 'Long horizontal bars can cover thin silhouettes during tight angle holds.',
      es: 'Las barras horizontales pueden tapar siluetas finas al aguantar ángulos cerrados.',
      'pt-BR': 'Barras horizontais podem cobrir silhuetas finas em ângulos fechados.',
      'zh-CN': '横线较长，架很窄的角度时可能遮住细小轮廓。',
      ja: '横線が長いため、細い角度では敵のシルエットを隠すことがあります。',
    },
  },
  tall: {
    description: {
      en: 'The vertical-heavy shape turns the center into a playful tower marker.',
      es: 'La forma vertical convierte el centro en una divertida marca de torre.',
      'pt-BR': 'O formato vertical transforma o centro em uma divertida marca de torre.',
      'zh-CN': '纵向拉长的造型像一座小塔，画面辨识度很高。',
      ja: '縦長のシルエットが小さなタワーのように見える、目立つデザインです。',
    },
    bestFor: {
      en: 'custom games, clips, and players who want an unusual vertical reference',
      es: 'partidas personalizadas, clips y una referencia vertical poco común',
      'pt-BR': 'partidas personalizadas, clipes e uma referência vertical diferente',
      'zh-CN': '自定义房、短视频素材和想尝试纵向参照的玩家',
      ja: 'カスタム、クリップ撮影、珍しい縦方向の目印が欲しいプレイヤー',
    },
    tradeoff: {
      en: 'The unusual proportions need a few rounds before they feel natural.',
      es: 'Las proporciones poco comunes necesitan unas rondas de adaptación.',
      'pt-BR': 'A proporção diferente exige algumas rodadas de adaptação.',
      'zh-CN': '比例比较特别，需要几局才能适应手感。',
      ja: '独特な比率なので、慣れるまで数ラウンドかかります。',
    },
  },
  frame: {
    description: {
      en: 'Two spaced layers create an oversized target-within-a-target look.',
      es: 'Dos capas separadas crean una gran diana dentro de otra diana.',
      'pt-BR': 'Duas camadas separadas criam um alvo grande dentro de outro alvo.',
      'zh-CN': '内外两层组合成“靶心套靶心”的夸张效果。',
      ja: '内外2層で、ターゲットの中にもう一つターゲットがあるような見た目です。',
    },
    bestFor: {
      en: 'custom games, funny clips, and players who want maximum personality',
      es: 'partidas personalizadas, clips divertidos y máxima personalidad',
      'pt-BR': 'partidas personalizadas, clipes divertidos e máxima personalidade',
      'zh-CN': '自定义房、搞笑集锦和想把个性拉满的玩家',
      ja: 'カスタム、ネタ動画、とにかく個性を出したいプレイヤー',
    },
    tradeoff: {
      en: 'The extra frame is intentionally busy and can distract in serious ranked games.',
      es: 'El marco extra es intencionalmente cargado y puede distraer en ranked.',
      'pt-BR': 'A moldura extra é carregada de propósito e pode distrair na ranked.',
      'zh-CN': '外框就是故意做得很热闹，认真排位时可能会分散注意力。',
      ja: 'フレームはあえて派手にしているため、真剣なランクでは気が散ることがあります。',
    },
  },
})

const shapeDefinitions = Object.freeze([
  ['pixel-sun', 'yellow', 'core', { dot: [true, 4], inner: [2, 2, 3] }],
  ['disco-core', 'pink', 'core', { outline: true, dot: [true, 6], inner: [1, 4, 1], outer: [1, 2, 6] }],
  ['arcade-button', 'red', 'core', { outline: true, dot: [true, 6], outer: [2, 3, 5] }],
  ['radar-ping', 'green', 'core', { dot: [true, 2], inner: [1, 1, 5], outer: [3, 1, 9] }],
  ['portal-ring', 'cyan', 'core', { inner: [2, 4, 2], outer: [2, 2, 6] }],
  ['boss-marker', 'red', 'core', { outline: true, dot: [true, 3], inner: [3, 5, 1], outer: [1, 4, 7] }],
  ['candy-target', 'pink', 'core', { dot: [true, 4], inner: [6, 2, 2, 4], outer: [2, 6, 1, 8] }],
  ['neon-orbit', 'cyan', 'core', { dot: [true, 1], inner: [1, 4, 2, 2], outer: [4, 1, 2, 7] }],
  ['pixel-goggles', 'white', 'wide', { outline: true, dot: [true, 1], inner: [8, 1, 3, 2], outer: [3, 1, 2, 7] }],
  ['laser-shades', 'red', 'wide', { inner: [10, 1, 2, 1], outer: [2, 1, 4, 6] }],
  ['widescreen', 'green', 'wide', { dot: [true, 2], inner: [9, 2, 3, 3] }],
  ['candy-bar', 'pink', 'wide', { inner: [12, 1, 4, 1], outer: [2, 2, 1, 8] }],
  ['signal-bars', 'yellow', 'wide', { dot: [true, 1], inner: [7, 2, 1, 3], outer: [1, 5, 3, 8] }],
  ['horizon-lock', 'cyan', 'wide', { dot: [true, 3], inner: [10, 1, 1, 4], outer: [3, 1, 1, 9] }],
  ['pixel-moustache', 'white', 'wide', { dot: [true, 2], inner: [8, 1, 4, 1], outer: [1, 3, 1, 8] }],
  ['stretch-plus', 'green', 'wide', { inner: [9, 2, 2, 0], outer: [2, 6, 1, 7] }],
  ['neon-totem', 'pink', 'tall', { dot: [true, 1], inner: [2, 9, 2, 2], outer: [1, 3, 2, 8] }],
  ['radio-tower', 'red', 'tall', { dot: [true, 3], inner: [1, 10, 2, 3], outer: [4, 2, 1, 8] }],
  ['pixel-totem', 'yellow', 'tall', { outline: true, dot: [true, 4], inner: [2, 8, 3, 1], outer: [1, 4, 1, 7] }],
  ['antenna', 'cyan', 'tall', { dot: [true, 1], inner: [1, 8, 1, 4], outer: [3, 1, 2, 9] }],
  ['cactus-core', 'green', 'tall', { dot: [true, 2], inner: [3, 9, 2, 2], outer: [1, 2, 3, 7] }],
  ['vertical-beam', 'white', 'tall', { inner: [1, 10, 3, 1], outer: [4, 1, 1, 8] }],
  ['rocket-core', 'red', 'tall', { dot: [true, 5], inner: [1, 7, 2, 3], outer: [3, 1, 3, 9] }],
  ['tall-meme', 'pink', 'tall', { dot: [true, 3], inner: [2, 12, 1, 2], outer: [5, 1, 1, 8] }],
  ['crosshairception', 'cyan', 'frame', { outline: true, dot: [true, 1], inner: [3, 2, 2], outer: [4, 2, 8] }],
  ['four-corners', 'white', 'frame', { inner: [2, 2, 5], outer: [2, 4, 10] }],
  ['fortress-frame', 'yellow', 'frame', { outline: true, dot: [true, 3], inner: [4, 4, 2], outer: [6, 3, 9] }],
  ['warning-frame', 'red', 'frame', { outline: true, dot: [true, 2], inner: [1, 4, 4], outer: [7, 2, 10] }],
  ['chunky-plus', 'green', 'frame', { outline: true, inner: [5, 6, 0] }],
  ['double-cross', 'pink', 'frame', { inner: [3, 2, 1], outer: [5, 1, 7] }],
  ['shield-lock', 'cyan', 'frame', { dot: [true, 4], inner: [2, 3, 3], outer: [5, 4, 9] }],
  ['final-boss', 'red', 'frame', { outline: true, dot: [true, 6], inner: [4, 6, 2], outer: [7, 3, 10] }],
])

function lineOptions(value) {
  if (!value) return { enabled: false, opacity: 1, length: 0, thickness: 1, offset: 0 }
  const [horizontalLength, verticalOrThickness, thicknessOrOffset, maybeOffset] = value
  const asymmetric = value.length === 4
  return {
    enabled: true,
    opacity: 1,
    horizontalLength,
    verticalLength: asymmetric ? verticalOrThickness : horizontalLength,
    thickness: asymmetric ? thicknessOrOffset : verticalOrThickness,
    offset: asymmetric ? maybeOffset : thicknessOrOffset,
  }
}

function buildOptions(definition) {
  const [, colorKey, , shape] = definition
  const color = palette[colorKey]
  return {
    colorPreset: color.preset,
    outline: { enabled: Boolean(shape.outline), opacity: 1, thickness: 1 },
    dot: { enabled: Boolean(shape.dot?.[0]), opacity: 1, size: shape.dot?.[1] || 2 },
    inner: lineOptions(shape.inner),
    outer: lineOptions(shape.outer),
    movementError: false,
    firingError: false,
  }
}

function setupSummary(locale, parsed) {
  const { dot, inner, outer, outline } = parsed.settings
  const innerSize = inner.enabled ? `${inner.horizontalLength}×${inner.verticalLength}` : '—'
  const outerSize = outer.enabled ? `${outer.horizontalLength}×${outer.verticalLength}` : '—'
  const dotSize = dot.enabled ? dot.size : '—'
  const summaries = {
    en: `Setup: inner ${innerSize}, outer ${outerSize}, dot ${dotSize}, outline ${outline.enabled ? 'on' : 'off'}.`,
    es: `Ajuste: interior ${innerSize}, exterior ${outerSize}, punto ${dotSize}, contorno ${outline.enabled ? 'sí' : 'no'}.`,
    'pt-BR': `Ajuste: interna ${innerSize}, externa ${outerSize}, ponto ${dotSize}, contorno ${outline.enabled ? 'sim' : 'não'}.`,
    'zh-CN': `参数：内线 ${innerSize}，外线 ${outerSize}，中心点 ${dotSize}，描边${outline.enabled ? '开启' : '关闭'}。`,
    ja: `設定：内側 ${innerSize}、外側 ${outerSize}、ドット ${dotSize}、アウトライン ${outline.enabled ? 'オン' : 'オフ'}。`,
  }
  return summaries[locale]
}

function localizedCopy(index, groupKey, parsed) {
  return Object.fromEntries(Object.keys(localeNames).map((locale) => {
    const name = localeNames[locale][index]
    return [locale, [name, name, `${groupCopy[groupKey].description[locale]} ${setupSummary(locale, parsed)}`]]
  }))
}

function localizedSeoDetails(index, groupKey, parsed) {
  return Object.fromEntries(Object.keys(localeNames).map((locale) => {
    const name = localeNames[locale][index]
    const bestLead = {
      en: `${name} works best for`,
      es: `${name} va mejor para`,
      'pt-BR': `${name} funciona melhor para`,
      'zh-CN': `${name} 更适合`,
      ja: `${name}は`,
    }[locale]
    const bestEnd = locale === 'ja' ? 'に向いています。' : locale === 'zh-CN' ? '。' : '.'
    return [locale, {
      bestFor: `${bestLead} ${groupCopy[groupKey].bestFor[locale]}${bestEnd} ${setupSummary(locale, parsed)}`,
      tradeoff: groupCopy[groupKey].tradeoff[locale],
    }]
  }))
}

export function buildFunnyCrosshairs(existingCrosshairs = []) {
  const accepted = []

  shapeDefinitions.forEach((definition, index) => {
    const [id, colorKey, groupKey] = definition
    const color = palette[colorKey]
    const code = generateCrosshairCode(buildOptions(definition))
    const candidate = { code, color: color.hex }
    const duplicate = [...existingCrosshairs, ...accepted].find((item) => haveSameVisibleShape(item, candidate))
    if (duplicate) throw new Error(`Funny crosshair ${id} duplicates the visible shape of ${duplicate.id}`)

    const parsed = parseCrosshairCode(code, { fallbackColor: color.hex })
    const copy = localizedCopy(index, groupKey, parsed)
    accepted.push({
      id,
      name: copy.en[0],
      shortName: copy.en[1],
      description: copy.en[2],
      player: '',
      category: 'fun',
      colorName: colorKey,
      colorKey,
      color: color.hex,
      isPro: false,
      isCute: false,
      code,
      sourceName: 'AimCodes · Original',
      sourceUrl: 'https://aimcodes.com/en/about/',
      sourceCheckedAt: SOURCE_CHECKED_AT,
      designFamily: `funny-${groupKey}`,
      useCases: ['funny', 'clips', 'custom-games'],
      tags: ['funny', 'meme', groupKey, colorKey],
      localizedCopy: copy,
      seoDetails: localizedSeoDetails(index, groupKey, parsed),
    })
  })

  return accepted
}

export const FUNNY_CROSSHAIR_IDS = Object.freeze(shapeDefinitions.map(([id]) => id))
