const related = {
  animals: { relatedCollectionKeys: ['funny', 'cute'], relatedArticleKeys: ['colors'], relatedToolKeys: ['preview', 'generator'] },
  meme: { relatedCollectionKeys: ['funny', 'thick'], relatedArticleKeys: ['staticVsDynamic'], relatedToolKeys: ['comparison', 'preview'] },
}
const labels = { en: ['Preview these shapes', 'Selection notes', 'Before you copy'], es: ['Prueba estas miras', 'Cómo elegimos', 'Antes de copiar'], 'pt-BR': ['Teste estas miras', 'Como escolhemos', 'Antes de copiar'], 'zh-CN': ['直接预览这些准星', '筛选说明', '复制前先看'], ja: ['この形を試す', '選定メモ', 'コピー前に確認'] }
const guidance = ['Check a distant head before ranked.', 'Separate color from the enemy outline.', 'Keep a compact profile for serious games.']
const english = {
    animals: ['Animal crosshairs', 'CREATURE SHAPES', 'Animal crosshair codes for VALORANT', 'Try cat, pig, bunny, owl, frog, crab, ghost and monster-inspired VALORANT crosshairs.', 'Great for clips and customs, but large shapes can cover distant heads. Start with Cat, Bunny or Pixel Owl.', 'Working character silhouettes; repeated color swaps are excluded.', 'Do animal crosshairs work?', 'Yes, but large silhouettes trade coverage for personality.', 'Which is easiest?', 'Cat, Bunny and Pixel Owl keep a clearer center.'],
    meme: ['Meme crosshairs', 'MAKE THE CLIP', 'Meme crosshair codes for VALORANT', 'Use oversized and broken shapes for customs, clips and challenge rounds.', 'Tall markers, warning frames and glitches make the center harder to ignore. Four Corners is an easier start.', 'Different layouts, not renamed color variants.', 'Are meme crosshairs usable?', 'They are valid codes, but extra geometry can hide targets in ranked.', 'Which is easiest?', 'Four Corners and Warning Frame leave more open space.'],
}
const localized = {
  es: { animals: ['Miras de animales', 'Códigos de miras de animales para VALORANT', 'Prueba miras de gato, cerdo, conejo, búho, rana, cangrejo, fantasma y monstruo.', 'Códigos de Miras de Animales de VALORANT'], meme: ['Miras meme', 'Códigos de miras meme para VALORANT', 'Usa formas enormes, rotas y absurdas en custom, clips y retos.', 'Códigos de Miras Meme de VALORANT para Clips'] },
  'pt-BR': { animals: ['Miras de animais', 'Códigos de mira de animais do VALORANT', 'Teste miras de gato, porco, coelho, coruja, sapo, caranguejo, fantasma e monstro.', 'Códigos de Miras de Animais do VALORANT'], meme: ['Miras meme', 'Códigos de mira meme do VALORANT', 'Use formatos enormes, quebrados e absurdos em custom, clipes e desafios.', 'Códigos de Miras Meme do VALORANT para Clipes'] },
  'zh-CN': { animals: ['动物准星', '无畏契约动物准星代码与预览', '猫、猪、兔子、猫头鹰、青蛙、螃蟹、幽灵和怪兽造型都能先预览再复制。', '无畏契约动物准星代码：猫猫、兔子与更多'], meme: ['表情包准星', '无畏契约表情包准星代码与预览', '高个、故障、警告框和双层造型，适合自定义房、短视频和挑战局。', '无畏契约表情包准星代码：故障、框架与挑战'] },
  ja: { animals: ['動物クロスヘア', 'VALORANT 動物クロスヘアのコード集', '猫、ブタ、ウサギ、フクロウ、カエル、カニ、ゴースト、モンスター風を比較できます。', 'VALORANT 動物クロスヘアのコード'], meme: ['ミーム系クロスヘア', 'VALORANT ミーム系クロスヘアのコード集', '高い形、グリッチ、警告フレーム、二重ラインをカスタムやクリップ用に試せます。', 'VALORANT ミーム系クロスヘアのコード'] },
}
const localizedGuidance = {
  es: ['Comprueba una cabeza lejana.', 'Separa el color del contorno.', 'Guarda una mira compacta.'],
  'pt-BR': ['Confira um alvo distante.', 'Separe a cor do contorno.', 'Guarde uma mira compacta.'],
  'zh-CN': ['先看远距离遮挡。', '准星颜色避开敌人轮廓。', '排位另存紧凑准星。'],
  ja: ['遠距離で確認。', '敵ハイライトと違う色。', '対戦用に保存。'],
}
function build(locale, key) {
  const base = english[key]
  const alt = localized[locale]?.[key]
  const [label, eyebrowBase, title, intro, body, selection, q1, a1, q2, a2] = base
  const [gridTitle, selectionTitle, settingsTitle] = labels[locale] || labels.en
  const eyebrow = locale === 'zh-CN' ? (key === 'animals' ? '动物造型' : '整活造型') : locale === 'ja' ? (key === 'animals' ? '動物モチーフ' : 'ネタ系') : locale === 'es' ? (key === 'animals' ? 'FORMAS DE ANIMALES' : 'MIRAS MEME') : locale === 'pt-BR' ? (key === 'animals' ? 'FORMAS DE ANIMAIS' : 'MIRAS MEME') : eyebrowBase
  const values = alt ? { label: alt[0], title: alt[1], intro: alt[2], metaTitle: alt[3], metaDescription: alt[2] } : { label, title, intro, metaTitle: title, metaDescription: intro }
  const faq = alt
    ? [['这组准星能用吗？', locale === 'zh-CN' ? '代码有效，但大图案会牺牲目标清晰度。' : locale === 'ja' ? '有効なコードですが、大きな形は見やすさを犠牲にします。' : 'Sí, pero las formas grandes sacrifican cobertura.'], ['哪一款更容易上手？', locale === 'zh-CN' ? '先从中心更清楚的紧凑造型开始。' : locale === 'ja' ? '中心が見やすいコンパクトな形から。' : 'Empieza por una forma compacta.']]
    : [[q1, a1], [q2, a2]]
  return { ...values, eyebrow, body: [body, selection], selectionTitle, selection, settingsTitle, settings: localizedGuidance[locale] || guidance, faq, gridTitle, ...related[key] }
}
export function nextCollectionCopy(locale, collectionKey) {
  return english[collectionKey] ? build(locale, collectionKey) : null
}
