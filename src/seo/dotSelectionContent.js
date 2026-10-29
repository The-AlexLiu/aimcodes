const dotIds = ['demon1', 'tap-dot-apex', 'small-dot-thick']
const copy = {
  'zh-CN': {
    title: '纯圆点和微型十字，先试哪一个？',
    picks: [['白色纯圆点', 'Demon1 配置的中心点尺寸为 2，带轮廓，内线和外线均关闭。'], ['白色微型十字', '点射小点 尖峰的中心点尺寸为 1，内线长度和粗细均为 1。它不只是一个像素点。'], ['更粗的白色中心', '粗白点使用尺寸为 2 的中心点和粗细为 4 的内线。小点看不清时可以试这一款。']],
    faq: [['白色纯圆点怎么调？', '选择白色，打开中心点，关闭内线和外线。上方 Demon1 配置可以直接试；亮处和暗处都要确认轮廓是否清楚。'], ['叫小圆点的准星都只有一个像素吗？', '不一定，有些还包含短内线。点射小点 尖峰包含尺寸为 1 的中心点和短线；Demon1 配置则关闭了两组线条。']],
  },
  es: { title: '¿Punto puro o cruz diminuta?', picks: [['Punto blanco', 'Demon1 usa un punto de tamaño 2, contorno y ninguna línea interior ni exterior.'], ['Cruz blanca diminuta', 'Tap Dot Apex combina un punto de tamaño 1 con líneas interiores de longitud 1 y grosor 1. No es un único píxel.'], ['Centro blanco más grueso', 'Pixel combina un punto de tamaño 2 con líneas de grosor 4. Pruébalo si pierdes los puntos finos.']], faq: [['¿Cómo hago un punto blanco puro?', 'Selecciona blanco, activa el punto central y desactiva ambas capas de líneas. Prueba el perfil Demon1 en fondos claros y oscuros.'], ['¿Toda mira diminuta es de un píxel?', 'No. Tap Dot Apex incluye un punto de tamaño 1 y líneas cortas; el perfil Demon1 desactiva las dos capas de líneas.']] },
  'pt-BR': { title: 'Ponto puro ou cruz minúscula?', picks: [['Ponto branco', 'Demon1 usa ponto de tamanho 2, contorno e nenhuma linha interna ou externa.'], ['Cruz branca minúscula', 'Tap Dot Apex combina ponto de tamanho 1 com linhas internas de comprimento 1 e espessura 1. Não é um único pixel.'], ['Centro branco mais grosso', 'Pixel combina ponto de tamanho 2 com linhas de espessura 4. Experimente quando perder os pontos finos.']], faq: [['Como faço um ponto branco puro?', 'Escolha branco, ative o ponto central e desligue as duas camadas de linhas. Teste o perfil Demon1 em fundos claros e escuros.'], ['Toda mira minúscula tem só um pixel?', 'Não. Tap Dot Apex inclui ponto de tamanho 1 e linhas curtas; o perfil Demon1 desliga as duas camadas de linhas.']] },
  ja: { title: '純粋なドットと小さな十字を比較', picks: [['白いドット', 'Demon1はサイズ2のドットと輪郭を使い、インナーラインとアウターラインを無効にしています。'], ['白い小型十字', 'Tap Dot Apexはサイズ1のドットに、長さ1・太さ1のインナーラインを組み合わせています。1ピクセルだけの点ではありません。'], ['太めの白い中心', 'Pixelはサイズ2のドットと太さ4のインナーラインを組み合わせています。細い点を見失うときに試してください。']], faq: [['白いドットだけにするには？', '白を選び、センタードットを有効にして両方のラインを無効にします。上のDemon1を明暗両方の背景で試せます。'], ['小さいドットは必ず1ピクセル？', 'いいえ。Tap Dot Apexにはサイズ1のドットと短い線があります。Demon1は両方のラインを無効にしています。']] },
}
const dotGroups = {
  en: ['Pure dot codes', 'Tiny crosses when a dot is hard to see', 'Small cyan dot', 'Needle uses a size-1 center dot, with no outline or lines. Compare it at normal scale before copying.'],
  es: ['Códigos de punto puro', 'Cruces pequeñas si pierdes el punto', 'Punto cian pequeño', 'Needle usa un punto de tamaño 1, sin contorno ni líneas. Compruébalo a escala normal antes de copiar.'],
  'pt-BR': ['Códigos de ponto puro', 'Cruzes pequenas se o ponto sumir', 'Ponto ciano pequeno', 'Needle usa ponto de tamanho 1, sem contorno nem linhas. Confira no tamanho normal antes de copiar.'],
  'zh-CN': ['纯圆点代码', '圆点看不清时，试试微型十字', '青色小圆点', '针尖使用尺寸为 1 的中心点，没有轮廓和线条。复制前先看正常倍率下是否清楚。'],
  ja: ['ドットだけのコード', '点を見失うときの小型十字', '小さなシアンドット', 'Needleはサイズ1のドットのみで、輪郭とラインはありません。コピー前に通常倍率で確認してください。'],
}
const navigation = {
  dot: ['dot', 'small', 'plus', 'circle'],
  small: ['small', 'dot', 'plus', 'oneTap'],
  cute: ['cute', 'animals', 'funny', 'pink'],
  funny: ['funny', 'cute', 'animals', 'small'],
}
export function completeCollectionSelection(locale, key, content) {
  const nav = navigation[key]
  const localized = key === 'dot' ? copy[locale] : null
  const selected = { ...content, ...(nav ? { introCollectionKeys: nav } : {}), ...(localized ? {
    quickPicksTitle: localized.title,
    quickPicks: localized.picks.map(([label, reason], index) => ({ id: dotIds[index], label, reason })),
    faq: [...content.faq, ...localized.faq],
  } : {}) }
  if (key !== 'dot') return selected
  const labels = dotGroups[locale] || dotGroups.en
  const picks = selected.quickPicks
  const pure = [picks[0], { id: 'needle-cyan', label: labels[2], reason: labels[3] }]
  return { ...selected,
    quickPicks: [...pure, ...picks.slice(1)],
    quickPickGroups: [{ title: labels[0], picks: pure }, { title: labels[1], picks: picks.slice(1) }],
  }
}
