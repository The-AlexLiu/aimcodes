import { japaneseArticles, japaneseTools } from './japaneseContent.js'
import { playbookLabel } from './playbookLabels.js'

const labels = Object.freeze({
  en: Object.freeze({
    articles: Object.freeze({ copy: 'How to copy a crosshair in VALORANT', notWorking: 'VALORANT crosshair code not working? Fix it fast', makeDot: 'How to make a dot crosshair in VALORANT', makeCircle: 'How to make a circle crosshair in VALORANT', movementError: 'VALORANT movement error crosshair: on or off?', firingError: 'VALORANT firing error crosshair explained', movementVsFiring: 'Movement error vs firing error in VALORANT', staticVsDynamic: 'Static vs dynamic crosshairs in VALORANT', dotVsCross: 'Dot vs cross crosshair in VALORANT', placement: 'VALORANT crosshair placement guide', exportCrosshair: 'How to export a VALORANT crosshair code', shareCrosshair: 'How to share a VALORANT crosshair', resetCrosshair: 'How to reset your VALORANT crosshair', saveMultiple: 'How to save multiple crosshairs in VALORANT', customColor: 'How to use a custom crosshair color in VALORANT', outlinesOnOff: 'VALORANT crosshair outlines: on or off?', centerDotOnOff: 'VALORANT center dot: on or off?', innerVsOuter: 'VALORANT inner lines vs outer lines', thickness: 'VALORANT crosshair thickness explained', gapOffset: 'VALORANT crosshair gap and offset explained' }),
    tools: Object.freeze({ generator: 'VALORANT crosshair generator', decoder: 'VALORANT crosshair code decoder', preview: 'VALORANT crosshair preview', comparison: 'Compare VALORANT crosshairs', playbook: 'VALORANT map strategy board' }),
  }),
  es: Object.freeze({
    articles: Object.freeze({ copy: 'Cómo copiar una mira en VALORANT', notWorking: 'El código de mira de VALORANT no funciona: soluciones', makeDot: 'Cómo hacer una mira de punto en VALORANT', makeCircle: 'Cómo hacer una mira circular en VALORANT', movementError: 'Error de movimiento de la mira en VALORANT', firingError: 'Error de disparo de la mira en VALORANT', movementVsFiring: 'Error de movimiento vs error de disparo en VALORANT', staticVsDynamic: 'Mira estática vs dinámica en VALORANT', dotVsCross: 'Mira de punto vs cruz en VALORANT', placement: 'Guía de colocación de mira en VALORANT', exportCrosshair: 'Cómo exportar un código de mira en VALORANT', shareCrosshair: 'Cómo compartir una mira de VALORANT', resetCrosshair: 'Cómo restablecer tu mira de VALORANT', saveMultiple: 'Cómo guardar varias miras en VALORANT', customColor: 'Cómo usar un color de mira personalizado en VALORANT', outlinesOnOff: 'Contorno de mira en VALORANT: ¿activado o desactivado?', centerDotOnOff: 'Punto central en VALORANT: ¿activado o desactivado?', innerVsOuter: 'Líneas interiores vs exteriores en VALORANT', thickness: 'Grosor de mira en VALORANT: cómo ajustarlo', gapOffset: 'Separación y offset de mira en VALORANT' }),
    tools: Object.freeze({ generator: 'Generador de miras de VALORANT', decoder: 'Decodificador de códigos de mira de VALORANT', preview: 'Vista previa de miras de VALORANT', comparison: 'Compara miras de VALORANT', playbook: 'Pizarra táctica de VALORANT' }),
  }),
  'pt-BR': Object.freeze({
    articles: Object.freeze({ copy: 'Como copiar uma mira no VALORANT', notWorking: 'Código de mira do VALORANT não funciona: soluções', makeDot: 'Como fazer uma mira de ponto no VALORANT', makeCircle: 'Como fazer uma mira circular no VALORANT', movementError: 'Erro de movimento da mira no VALORANT', firingError: 'Erro de disparo da mira no VALORANT', movementVsFiring: 'Erro de movimento vs erro de disparo no VALORANT', staticVsDynamic: 'Mira estática vs dinâmica no VALORANT', dotVsCross: 'Mira de ponto vs cruz no VALORANT', placement: 'Guia de posicionamento de mira no VALORANT', exportCrosshair: 'Como exportar um código de mira no VALORANT', shareCrosshair: 'Como compartilhar uma mira do VALORANT', resetCrosshair: 'Como redefinir sua mira do VALORANT', saveMultiple: 'Como salvar várias miras no VALORANT', customColor: 'Como usar uma cor personalizada de mira no VALORANT', outlinesOnOff: 'Contorno da mira no VALORANT: ligado ou desligado?', centerDotOnOff: 'Ponto central no VALORANT: ligado ou desligado?', innerVsOuter: 'Linhas internas vs externas no VALORANT', thickness: 'Espessura da mira no VALORANT: como ajustar', gapOffset: 'Espaço e offset da mira no VALORANT' }),
    tools: Object.freeze({ generator: 'Gerador de miras do VALORANT', decoder: 'Decodificador de código de mira do VALORANT', preview: 'Prévia de mira do VALORANT', comparison: 'Compare miras do VALORANT', playbook: 'Prancheta tática do VALORANT' }),
  }),
  'zh-CN': Object.freeze({
    articles: Object.freeze({ copy: '无畏契约怎么复制队友准星', notWorking: '无畏契约准星代码无法使用怎么办', makeDot: '无畏契约圆点准星怎么调', makeCircle: '无畏契约圆形准星怎么调', movementError: '无畏契约移动误差准星是什么', firingError: '无畏契约射击误差准星是什么', movementVsFiring: '无畏契约移动误差和射击误差区别', staticVsDynamic: '无畏契约静态准星和动态准星怎么选', dotVsCross: '无畏契约圆点准星和十字准星怎么选', placement: '无畏契约准星预瞄与摆位指南', exportCrosshair: '无畏契约准星代码怎么导出', shareCrosshair: '无畏契约准星怎么分享给队友', resetCrosshair: '无畏契约准星怎么重置', saveMultiple: '无畏契约怎么保存多套准星', customColor: '无畏契约怎么使用自定义准星颜色', outlinesOnOff: '无畏契约准星轮廓开还是关', centerDotOnOff: '无畏契约准星中心点开还是关', innerVsOuter: '无畏契约准星内线和外线有什么区别', thickness: '无畏契约准星粗细怎么调', gapOffset: '无畏契约准星间隙和偏移量怎么调' }),
    tools: Object.freeze({ generator: '无畏契约准星生成器', decoder: '无畏契约准星代码解析器', preview: '无畏契约准星预览工具', comparison: '无畏契约准星对比工具', playbook: '无畏契约地图战术板' }),
  }),
})

function localizedLabels(locale) {
  return labels[locale] || labels.en
}

export function articleResourceLabel(locale, articleKey) {
  if (locale === 'ja') return japaneseArticles[articleKey]?.title || articleKey
  return localizedLabels(locale).articles[articleKey] || articleKey
}

export function toolResourceLabel(locale, toolKey) {
  if (toolKey === 'playbook') return playbookLabel(locale)
  if (locale === 'ja') return japaneseTools[toolKey]?.title || toolKey
  return localizedLabels(locale).tools[toolKey] || toolKey
}
