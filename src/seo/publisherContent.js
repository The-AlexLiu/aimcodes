const copy = {
  en: {
    home: {
      eyebrow: 'HOW AIMCODES HELPS', title: 'Choose with the same three checks every time', intro: 'A useful crosshair is visible, precise, and easy for your eyes to recover after movement.',
      cards: [
        ['Check the silhouette', 'Compare the actual gap, line length, and center point on one map before switching scenes.'],
        ['Test contrast', 'Try cyan, green, white, yellow, red, and magenta. The copied code updates with the color you choose.'],
        ['Verify in the range', 'Use the preview to shortlist a shape, then confirm it at your resolution in the VALORANT practice range.'],
      ],
    },
    catalog: {
      eyebrow: 'A BETTER SHORTLIST', title: 'How to narrow 60+ codes down to one', intro: 'Start by function, not by a famous name. The right shape is the one you can find quickly without covering the target.',
      cards: [
        ['For first-shot precision', 'Start with a small dot or tight open center, then increase thickness only if you lose it.'],
        ['For tracking and sprays', 'Short inner lines give your eyes more structure than a single micro dot.'],
        ['For clips and casual games', 'Cute and novelty shapes use valid profile settings, but preview their larger screen footprint first.'],
      ],
    },
  },
  es: {
    home: { eyebrow: 'CÓMO AYUDA AIMCODES', title: 'Elige siempre con las mismas tres comprobaciones', intro: 'Una buena mira se ve, marca el centro y vuelve a encontrarse rápido después de moverte.', cards: [['Comprueba la forma', 'Compara el hueco, la longitud de las líneas y el punto central en el mismo mapa.'], ['Prueba el contraste', 'Prueba cian, verde, blanco, amarillo, rojo y magenta. El código copiado adopta el color elegido.'], ['Confirma en el campo de tiro', 'Usa la vista previa para elegir finalistas y comprueba la ganadora con tu resolución dentro de VALORANT.']] },
    catalog: { eyebrow: 'UNA LISTA MÁS ÚTIL', title: 'Cómo pasar de más de 60 códigos a uno', intro: 'Empieza por la función, no por un nombre famoso. La forma correcta se encuentra rápido y no tapa al rival.', cards: [['Para la primera bala', 'Empieza con un punto pequeño o centro abierto y aumenta el grosor solo si lo pierdes.'], ['Para seguimiento y ráfagas', 'Las líneas cortas dan a la vista más estructura que un micropunto aislado.'], ['Para clips y partidas casuales', 'Las formas bonitas usan ajustes válidos, pero conviene comprobar primero cuánto espacio ocupan.']] },
  },
  'pt-BR': {
    home: { eyebrow: 'COMO O AIMCODES AJUDA', title: 'Escolha sempre com as mesmas três verificações', intro: 'Uma boa mira aparece, marca o centro e é fácil de reencontrar depois do movimento.', cards: [['Confira o formato', 'Compare espaço, comprimento das linhas e ponto central no mesmo mapa antes de trocar a cena.'], ['Teste o contraste', 'Experimente ciano, verde, branco, amarelo, vermelho e magenta. O código copiado recebe a cor escolhida.'], ['Confirme no campo de treino', 'Use a prévia para selecionar e confirme na sua resolução dentro do VALORANT.']] },
    catalog: { eyebrow: 'UMA LISTA MELHOR', title: 'Como reduzir mais de 60 códigos a um', intro: 'Comece pela função, não por um nome famoso. O formato certo aparece rápido sem esconder o alvo.', cards: [['Para o primeiro tiro', 'Comece com ponto pequeno ou centro aberto e aumente a espessura apenas se perder a mira.'], ['Para rastrear e controlar spray', 'Linhas curtas dão aos olhos mais estrutura do que um microponto isolado.'], ['Para clipes e partidas casuais', 'Formatos fofos usam ajustes válidos, mas confira primeiro o espaço maior que ocupam na tela.']] },
  },
  'zh-CN': {
    home: { eyebrow: 'AIMCODES 怎么帮你选', title: '每次都用同样的 3 个标准试准星', intro: '好用的准星不只要看得见，还要中心明确，并且转身或移动后能快速找回来。', cards: [['先看轮廓', '固定一张地图，对比中心间距、线长和中心点，不要一边换准星一边换场景。'], ['再试对比度', '依次试青、绿、白、黄、红和洋红；最终复制的代码会同步写入所选颜色。'], ['最后进训练场', '预览适合用来缩小范围，最终还要在自己的分辨率和游戏画面中确认手感。']] },
    catalog: { eyebrow: '更快缩小选择范围', title: '60 多款准星，怎么筛到最后一款', intro: '先看用途，不要只看选手名字。真正适合你的准星，要能快速找到中心，又不会遮挡目标。', cards: [['重视第一枪', '先试小圆点或紧凑的中心留空准星；只有经常看丢时，再增加厚度。'], ['习惯跟枪与扫射', '中心周围的短线比单独一个微型圆点更容易在连续移动中跟住。'], ['娱乐局与视频素材', '可爱和趣味准星同样使用有效配置，但造型通常更大，使用前先看它占多少画面。']] },
  },
}

export function publisherCopy(locale, type) {
  return (copy[locale] || copy.en)[type]
}
