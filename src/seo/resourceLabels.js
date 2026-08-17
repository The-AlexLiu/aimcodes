const labels = Object.freeze({
  en: Object.freeze({
    articles: Object.freeze({ copy: 'How to copy a crosshair in VALORANT', notWorking: 'VALORANT crosshair code not working? Fix it fast', makeDot: 'How to make a dot crosshair in VALORANT', makeCircle: 'How to make a circle crosshair in VALORANT', movementError: 'VALORANT movement error crosshair: on or off?', firingError: 'VALORANT firing error crosshair explained', movementVsFiring: 'Movement error vs firing error in VALORANT', staticVsDynamic: 'Static vs dynamic crosshairs in VALORANT', dotVsCross: 'Dot vs cross crosshair in VALORANT', placement: 'VALORANT crosshair placement guide' }),
    tools: Object.freeze({ generator: 'VALORANT crosshair generator', decoder: 'VALORANT crosshair code decoder', preview: 'VALORANT crosshair preview', comparison: 'Compare VALORANT crosshairs' }),
  }),
  es: Object.freeze({
    articles: Object.freeze({ copy: 'Cómo copiar una mira en VALORANT', notWorking: 'El código de mira de VALORANT no funciona: soluciones', makeDot: 'Cómo hacer una mira de punto en VALORANT', makeCircle: 'Cómo hacer una mira circular en VALORANT', movementError: 'Error de movimiento de la mira en VALORANT', firingError: 'Error de disparo de la mira en VALORANT', movementVsFiring: 'Error de movimiento vs error de disparo en VALORANT', staticVsDynamic: 'Mira estática vs dinámica en VALORANT', dotVsCross: 'Mira de punto vs cruz en VALORANT', placement: 'Guía de colocación de mira en VALORANT' }),
    tools: Object.freeze({ generator: 'Generador de miras de VALORANT', decoder: 'Decodificador de códigos de mira de VALORANT', preview: 'Vista previa de miras de VALORANT', comparison: 'Compara miras de VALORANT' }),
  }),
  'pt-BR': Object.freeze({
    articles: Object.freeze({ copy: 'Como copiar uma mira no VALORANT', notWorking: 'Código de mira do VALORANT não funciona: soluções', makeDot: 'Como fazer uma mira de ponto no VALORANT', makeCircle: 'Como fazer uma mira circular no VALORANT', movementError: 'Erro de movimento da mira no VALORANT', firingError: 'Erro de disparo da mira no VALORANT', movementVsFiring: 'Erro de movimento vs erro de disparo no VALORANT', staticVsDynamic: 'Mira estática vs dinâmica no VALORANT', dotVsCross: 'Mira de ponto vs cruz no VALORANT', placement: 'Guia de posicionamento de mira no VALORANT' }),
    tools: Object.freeze({ generator: 'Gerador de miras do VALORANT', decoder: 'Decodificador de código de mira do VALORANT', preview: 'Prévia de mira do VALORANT', comparison: 'Compare miras do VALORANT' }),
  }),
  'zh-CN': Object.freeze({
    articles: Object.freeze({ copy: '无畏契约怎么复制队友准星', notWorking: '无畏契约准星代码无法使用怎么办', makeDot: '无畏契约圆点准星怎么调', makeCircle: '无畏契约圆形准星怎么调', movementError: '无畏契约移动误差准星是什么', firingError: '无畏契约射击误差准星是什么', movementVsFiring: '无畏契约移动误差和射击误差区别', staticVsDynamic: '无畏契约静态准星和动态准星怎么选', dotVsCross: '无畏契约圆点准星和十字准星怎么选', placement: '无畏契约准星预瞄与摆位指南' }),
    tools: Object.freeze({ generator: '无畏契约准星生成器', decoder: '无畏契约准星代码解析器', preview: '无畏契约准星预览工具', comparison: '无畏契约准星对比工具' }),
  }),
})

function localizedLabels(locale) {
  return labels[locale] || labels.en
}

export function articleResourceLabel(locale, articleKey) {
  return localizedLabels(locale).articles[articleKey] || articleKey
}

export function toolResourceLabel(locale, toolKey) {
  return localizedLabels(locale).tools[toolKey] || toolKey
}
