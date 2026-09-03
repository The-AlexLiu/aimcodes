const shared = Object.freeze({
  en: Object.freeze({ gridTitle: 'Crosshairs to preview', selectionTitle: 'How these crosshairs were selected', settingsTitle: 'What to check before you copy' }),
  es: Object.freeze({ gridTitle: 'Miras para probar', selectionTitle: 'Cómo elegimos estas miras', settingsTitle: 'Qué revisar antes de copiar' }),
  'pt-BR': Object.freeze({ gridTitle: 'Miras para testar', selectionTitle: 'Como escolhemos estas miras', settingsTitle: 'O que conferir antes de copiar' }),
  'zh-CN': Object.freeze({ gridTitle: '直接预览这些准星', selectionTitle: '这些准星怎么筛出来的', settingsTitle: '复制前先看这三点' }),
  ja: Object.freeze({ gridTitle: 'プレビューできるクロスヘア', selectionTitle: 'このクロスヘアを選んだ基準', settingsTitle: 'コピー前に確認すること' }),
})

const related = Object.freeze({
  tracker: Object.freeze({ relatedCollectionKeys: ['phantom', 'beginner', 'thick'], relatedArticleKeys: ['staticVsDynamic', 'firingError'], relatedToolKeys: ['comparison', 'preview'] }),
  double: Object.freeze({ relatedCollectionKeys: ['vandal', 'phantom', 'withOutlines'], relatedArticleKeys: ['innerVsOuter', 'gapOffset'], relatedToolKeys: ['comparison', 'generator'] }),
  plus: Object.freeze({ relatedCollectionKeys: ['small', 'thin', 'openCenter'], relatedArticleKeys: ['thickness', 'gapOffset'], relatedToolKeys: ['generator', 'preview'] }),
})

const content = {
  en: {
    tracker: {
      label: 'Tracker crosshairs', eyebrow: 'MORE REFERENCE WHILE THE TARGET MOVES', title: 'Tracker crosshair codes for VALORANT', intro: 'Preview longer four-line crosshairs built to stay readable while you track a moving target or control a Phantom spray.',
      body: ['A tracker crosshair uses a little more line length than a micro crosshair. That extra shape gives your eyes a stable movement reference during strafes and close fights.', 'The tradeoff is screen coverage. Compare several lengths on the same map scene and keep the shortest version you can follow without losing the center.'],
      selection: 'These working codes come from the Tracker design family and use visibly different combinations of line length, thickness, gap, color, and outline. Simple color swaps and duplicate silhouettes are excluded.',
      settings: ['Start with movement and firing error turned off.', 'Compare the center on a moving target and a distant head.', 'Shorten the lines if the shape blocks too much of the model.'],
      faq: [['What is a tracker crosshair in VALORANT?', 'It is a longer, easy-to-follow crosshair that gives your eyes more reference while a target moves.'], ['Is a tracker crosshair good for the Phantom?', 'It can suit Phantom sprays and close tracking, provided the lines do not cover too much of a distant target.']],
      metaTitle: 'Tracker Crosshair Codes for VALORANT | AimCodes', metaDescription: 'Preview working Tracker crosshair codes for VALORANT. Compare line length, gaps and outlines for Phantom sprays and moving targets, then copy a code.',
    },
    double: {
      label: 'Double crosshairs', eyebrow: 'TWO LAYERS, TWO AIM REFERENCES', title: 'Double crosshair codes for VALORANT', intro: 'Try double-layer VALORANT crosshairs that combine inner and outer lines without turning the center into a solid block.',
      body: ['A double crosshair separates the exact aiming center from a wider recoil reference. The inner lines handle precise placement while the outer lines make the shape easier to recover after a burst.', 'Two layers can also create clutter. Keep the outer markers short and spaced far enough away that they do not compete with the center.'],
      selection: 'Every code enables both inner and outer line groups. The set changes their length, thickness, spacing, color, and outline so each preview tests a genuinely different double-cross layout.',
      settings: ['Judge the inner lines first; they are your precise aim reference.', 'Use the outer lines as guides, not a second center.', 'Remove the outline if two layers already look too heavy.'],
      faq: [['What is a double crosshair in VALORANT?', 'It uses both inner and outer lines, creating two visual layers around the same exact center.'], ['Do double crosshairs improve recoil control?', 'They do not change recoil, but the outer layer can make burst movement easier to read.']],
      metaTitle: 'Double Crosshair Codes for VALORANT | AimCodes', metaDescription: 'Preview double crosshair codes with inner and outer lines in VALORANT. Compare two-layer layouts on real map scenes and copy a working code.',
    },
    plus: {
      label: 'Plus crosshairs', eyebrow: 'THE SIMPLE FOUR-LINE CLASSIC', title: 'Plus crosshair codes for VALORANT', intro: 'Compare compact plus-shaped crosshairs with short, solid arms and a center that is quick to find in normal ranked fights.',
      body: ['A plus crosshair is the familiar four-line shape with no decorative geometry. It gives clear horizontal and vertical references while keeping the setup easy to understand and tune.', 'Small changes to length, thickness, and gap make a bigger difference than they appear in the settings menu. Preview them on a distant target before choosing one.'],
      selection: 'The collection uses compact four-line codes with distinct geometry. It includes open and nearly closed centers, several line weights, and both outlined and clean versions.',
      settings: ['Start with short arms and a small center gap.', 'Use thickness 1–2 when target coverage matters.', 'Add an outline only when the plus disappears on bright walls.'],
      faq: [['How do I make a plus crosshair in VALORANT?', 'Enable inner lines, keep all four arms the same length, and adjust offset for an open or closed center.'], ['Is a plus crosshair good for beginners?', 'Yes. Its familiar shape is easy to read and simple to adjust without adding extra visual layers.']],
      metaTitle: 'Plus Crosshair Codes for VALORANT | AimCodes', metaDescription: 'Preview compact plus crosshair codes for VALORANT. Compare line length, thickness, center gaps and outlines, then copy a working code.',
    },
  },
  es: {
    tracker: {
      label: 'Miras tracker', eyebrow: 'MÁS REFERENCIA CUANDO EL RIVAL SE MUEVE', title: 'Códigos de mira tracker para VALORANT', intro: 'Prueba cruces de cuatro líneas algo más largas para seguir objetivos en movimiento y controlar el spray de Phantom.',
      body: ['Una mira tracker ofrece más referencia visual que una microcruz durante strafes y duelos cercanos.', 'La desventaja es que ocupa más pantalla. Compara varias longitudes y quédate con la más corta que no pierdas de vista.'],
      selection: 'Todos son códigos válidos de la familia Tracker con combinaciones distintas de longitud, grosor, espacio, color y contorno; no incluimos simples cambios de color.',
      settings: ['Empieza con los errores de movimiento y disparo desactivados.', 'Prueba un objetivo móvil y una cabeza lejana.', 'Acorta las líneas si tapan demasiado.'],
      faq: [['¿Qué es una mira tracker?', 'Es una cruz fácil de seguir que da más referencia visual cuando el objetivo se mueve.'], ['¿Sirve para Phantom?', 'Puede funcionar bien para spray y tracking cercano si no tapa demasiado a distancia.']],
      metaTitle: 'Códigos de Mira Tracker para VALORANT | AimCodes', metaDescription: 'Prueba códigos de mira tracker para VALORANT. Compara longitud, hueco y contorno para Phantom y objetivos móviles y copia un código válido.',
    },
    double: {
      label: 'Miras dobles', eyebrow: 'DOS CAPAS, DOS REFERENCIAS', title: 'Códigos de mira doble para VALORANT', intro: 'Prueba miras de doble capa que combinan líneas interiores y exteriores sin convertir el centro en un bloque.',
      body: ['La capa interior marca la puntería precisa y la exterior sirve como referencia más amplia después de una ráfaga.', 'Dos capas también pueden cargar la pantalla. Mantén las marcas exteriores cortas y separadas del centro.'],
      selection: 'Cada código activa líneas interiores y exteriores con longitudes, grosores, espacios, colores y contornos distintos.',
      settings: ['Evalúa primero las líneas interiores.', 'Usa las exteriores como guía, no como otro centro.', 'Quita el contorno si el conjunto pesa demasiado.'],
      faq: [['¿Qué es una mira doble?', 'Usa líneas interiores y exteriores para crear dos capas alrededor del mismo centro.'], ['¿Mejora el control del retroceso?', 'No cambia el retroceso, pero la capa exterior puede ayudar a leer el movimiento de la ráfaga.']],
      metaTitle: 'Códigos de Mira Doble para VALORANT | AimCodes', metaDescription: 'Prueba códigos de mira doble con líneas interiores y exteriores en VALORANT. Compara las dos capas y copia un código válido.',
    },
    plus: {
      label: 'Miras en forma de plus', eyebrow: 'LA CRUZ CLÁSICA DE CUATRO LÍNEAS', title: 'Códigos de mira plus para VALORANT', intro: 'Compara cruces compactas con cuatro brazos cortos y un centro fácil de encontrar en ranked.',
      body: ['La mira plus usa una forma sencilla sin adornos y ofrece referencias horizontales y verticales claras.', 'Pequeños cambios de longitud, grosor y espacio se notan mucho. Pruébalos sobre una cabeza lejana antes de elegir.'],
      selection: 'La colección reúne códigos compactos de cuatro líneas con geometría distinta, centros abiertos o casi cerrados y versiones con y sin contorno.',
      settings: ['Empieza con brazos cortos y poco espacio.', 'Usa grosor 1–2 para tapar menos.', 'Añade contorno solo si desaparece en paredes claras.'],
      faq: [['¿Cómo hago una mira plus?', 'Activa las líneas interiores, usa la misma longitud en los cuatro brazos y ajusta el espacio central.'], ['¿Es buena para principiantes?', 'Sí, la forma es fácil de leer y de ajustar sin capas extra.']],
      metaTitle: 'Códigos de Mira Plus para VALORANT | AimCodes', metaDescription: 'Prueba miras plus compactas para VALORANT. Compara longitud, grosor, hueco y contorno y copia un código válido.',
    },
  },
  'pt-BR': {
    tracker: {
      label: 'Miras tracker', eyebrow: 'MAIS REFERÊNCIA COM O ALVO EM MOVIMENTO', title: 'Códigos de mira tracker do VALORANT', intro: 'Teste cruzes de quatro linhas um pouco mais longas para acompanhar alvos e controlar o spray de Phantom.',
      body: ['A mira tracker dá mais referência visual que uma microcruz durante strafes e lutas próximas.', 'Ela também cobre mais a tela. Compare comprimentos e fique com o menor que você consegue acompanhar.'],
      selection: 'Todos são códigos válidos da família Tracker, com combinações distintas de comprimento, espessura, espaço, cor e contorno; trocas simples de cor ficam de fora.',
      settings: ['Comece sem erro de movimento e de tiro.', 'Teste um alvo em movimento e uma cabeça distante.', 'Encurte as linhas se cobrirem demais.'],
      faq: [['O que é uma mira tracker?', 'É uma cruz fácil de seguir que dá mais referência quando o alvo se move.'], ['Funciona com Phantom?', 'Pode funcionar bem para spray e tracking próximo, desde que não cubra demais à distância.']],
      metaTitle: 'Códigos de Mira Tracker do VALORANT | AimCodes', metaDescription: 'Teste códigos de mira tracker do VALORANT. Compare comprimento, espaço e contorno para Phantom e alvos em movimento e copie.',
    },
    double: {
      label: 'Miras duplas', eyebrow: 'DUAS CAMADAS, DUAS REFERÊNCIAS', title: 'Códigos de mira dupla do VALORANT', intro: 'Teste miras em duas camadas que combinam linhas internas e externas sem transformar o centro em um bloco.',
      body: ['A camada interna marca a mira precisa e a externa vira uma referência mais ampla depois de uma rajada.', 'Duas camadas também podem poluir a tela. Mantenha as marcas externas curtas e afastadas do centro.'],
      selection: 'Cada código ativa linhas internas e externas com comprimentos, espessuras, espaços, cores e contornos diferentes.',
      settings: ['Avalie primeiro as linhas internas.', 'Use as externas como guia, não como outro centro.', 'Desligue o contorno se o conjunto ficar pesado.'],
      faq: [['O que é uma mira dupla?', 'Ela usa linhas internas e externas para criar duas camadas no mesmo centro.'], ['Melhora o controle de recuo?', 'Não muda o recuo, mas a camada externa pode ajudar a ler o movimento da rajada.']],
      metaTitle: 'Códigos de Mira Dupla do VALORANT | AimCodes', metaDescription: 'Teste códigos de mira dupla com linhas internas e externas no VALORANT. Compare as duas camadas e copie um código válido.',
    },
    plus: {
      label: 'Miras em forma de mais', eyebrow: 'A CRUZ CLÁSSICA DE QUATRO LINHAS', title: 'Códigos de mira plus do VALORANT', intro: 'Compare cruzes compactas com quatro braços curtos e um centro fácil de encontrar na ranked.',
      body: ['A mira plus usa uma forma simples e oferece referências horizontais e verticais claras.', 'Pequenas mudanças de comprimento, espessura e espaço fazem diferença. Teste em uma cabeça distante antes de escolher.'],
      selection: 'A coleção reúne códigos compactos de quatro linhas com geometrias distintas, centros abertos ou quase fechados e versões com ou sem contorno.',
      settings: ['Comece com braços curtos e pouco espaço.', 'Use espessura 1–2 para cobrir menos.', 'Adicione contorno só se sumir em paredes claras.'],
      faq: [['Como fazer uma mira plus?', 'Ative as linhas internas, use o mesmo comprimento nos quatro braços e ajuste o espaço central.'], ['É boa para iniciantes?', 'Sim. A forma é fácil de ler e ajustar sem camadas extras.']],
      metaTitle: 'Códigos de Mira Plus do VALORANT | AimCodes', metaDescription: 'Teste miras plus compactas do VALORANT. Compare comprimento, espessura, espaço e contorno e copie um código válido.',
    },
  },
  'zh-CN': {
    tracker: {
      label: '跟枪准星', eyebrow: '目标在动，眼睛也有参照', title: '无畏契约跟枪准星代码', intro: '这组四线准星比微型准星稍长，适合跟随移动目标，也更方便观察幻影连射时的中心位置。',
      body: ['跟枪准星会多留一点线条，让你在敌人横拉和近距离交火时不容易看丢中心。', '代价是占画面更多。建议固定一张地图比较不同长度，最后留下你能稳定跟住的最短版本。'],
      selection: '所有代码都来自跟枪设计族，并通过长度、粗细、间距、颜色和轮廓形成不同造型；单纯换色和重复轮廓不会被重复收进来。',
      settings: ['先关闭移动误差和射击误差。', '同时拿移动目标和远距离头部测试。', '觉得挡人时，优先缩短线条。'],
      faq: [['无畏契约跟枪准星是什么？', '它会用稍长、容易追踪的线条，在目标移动时给眼睛更多参照。'], ['跟枪准星适合幻影吗？', '适合近距离跟枪和扫射，但要确认远距离不会挡住太多目标。']],
      metaTitle: '无畏契约跟枪准星代码与预览 | AimCodes', metaDescription: '预览无畏契约跟枪准星代码，对比线条长度、间距和轮廓，找到适合幻影扫射与移动目标的版本并复制。',
    },
    double: {
      label: '双层准星', eyebrow: '两层线，各管一件事', title: '无畏契约双层准星代码', intro: '同时开启内线和外线：内层负责精确对准，外层给连射和重新找回中心多一个参照。',
      body: ['双层准星把精确中心与更宽的后坐参照分开，点射时看内线，短连射后也能靠外线快速找回来。', '两层线也更容易显乱。外线应该短一点、离中心远一点，不能和内线抢注意力。'],
      selection: '每个代码都实际开启内线与外线，并用不同长度、粗细、间距、颜色和轮廓做出独立造型。',
      settings: ['先判断内线是否适合精确瞄准。', '把外线当参照，不要当第二个中心。', '两层已经很重时先关轮廓。'],
      faq: [['什么是双层准星？', '同时使用内线和外线，在同一个中心周围形成两层视觉参照。'], ['双层准星能减少后坐力吗？', '不能改变武器后坐力，但外层可以帮助你观察短连射的移动。']],
      metaTitle: '无畏契约双层准星代码与预览 | AimCodes', metaDescription: '预览同时开启内线和外线的无畏契约双层准星，在真实地图中比较两层造型并复制有效代码。',
    },
    plus: {
      label: '十字准星', eyebrow: '最直接的四线经典造型', title: '无畏契约十字准星代码', intro: '四条短线组成干净的四线十字，中心好找、参数也容易调，适合日常排位和第一次认真挑准星的玩家。',
      body: ['十字准星没有多余装饰，横竖方向都给出明确参照，开枪和预瞄时都很好理解。', '长度、粗细和中心间距只差一两个数值，实际遮挡就可能完全不同，最好直接在远距离头部上比较。'],
      selection: '这里保留的是轮廓确实不同的紧凑四线代码，包含中心留空、接近闭合、不同粗细以及有无轮廓版本。',
      settings: ['先用短线和较小中心间距。', '在意遮挡时优先选粗细 1–2。', '只有亮墙会吃掉准星时才开轮廓。'],
      faq: [['无畏契约十字准星怎么调？', '开启内线，让四条线保持相同长度，再用偏移控制中心是留空还是闭合。'], ['十字准星适合新手吗？', '适合，造型直观、参数也容易理解，不需要额外视觉层。']],
      metaTitle: '无畏契约十字准星代码与预览 | AimCodes', metaDescription: '预览紧凑的无畏契约十字准星，对比线条长度、粗细、中心间距和轮廓，找到合适版本后直接复制。',
    },
  },
  ja: {
    tracker: {
      label: 'トラッカークロスヘア', eyebrow: '動く敵を追うための見やすい基準', title: 'VALORANTのトラッカークロスヘアコード', intro: '少し長めの4本ラインで、移動する敵のトラッキングやPhantomのスプレー中も中心を見つけやすくします。',
      body: ['トラッカークロスヘアは、マイクロクロスヘアより多くの視覚ガイドを残します。ストレイフする敵や近距離戦で中心を見失いにくい形です。', 'ラインが長いほど画面を覆います。同じマップで長さを比較し、中心を追える最短の形を選びましょう。'],
      selection: 'Trackerファミリーの有効なコードから、長さ、太さ、ギャップ、色、アウトラインが異なる形だけを選びました。色だけを変えた重複は含みません。',
      settings: ['移動エラーと射撃エラーはオフから試す。', '動く敵と遠距離の頭の両方で確認する。', '敵を隠す場合はラインを短くする。'],
      faq: [['トラッカークロスヘアとは？', '敵が動いている間も目で追いやすい、少し長めのラインを使うクロスヘアです。'], ['Phantomに向いていますか？', '近距離のトラッキングやスプレーに使いやすいですが、遠距離で敵を隠さないか確認が必要です。']],
      metaTitle: 'VALORANT トラッカークロスヘアコード | AimCodes', metaDescription: 'VALORANTのトラッカークロスヘアをプレビュー。ラインの長さ、ギャップ、アウトラインを比較し、使えるコードをコピーできます。',
    },
    double: {
      label: 'ダブルクロスヘア', eyebrow: '内側と外側、2つのエイム基準', title: 'VALORANTのダブルクロスヘアコード', intro: 'インナーラインとアウターラインを同時に使い、精密な中心と広いリコイルガイドを分けて確認できます。',
      body: ['内側のラインは正確なエイム、外側のラインはバースト後に中心を見つけ直すための目印になります。', '二層は画面が忙しくなりやすいため、外側は短くして中心から十分に離すのがポイントです。'],
      selection: 'すべてのコードでインナーとアウターを有効にし、長さ、太さ、間隔、色、アウトラインが異なる形を揃えました。',
      settings: ['まず内側のラインを基準に選ぶ。', '外側は第2の中心ではなくガイドとして使う。', '重く見える場合はアウトラインを外す。'],
      faq: [['ダブルクロスヘアとは？', '同じ中心の周りにインナーラインとアウターラインの二層を表示するクロスヘアです。'], ['リコイルが減りますか？', '武器の反動は変わりませんが、外側のガイドでバーストの動きを読みやすくなります。']],
      metaTitle: 'VALORANT ダブルクロスヘアコード | AimCodes', metaDescription: 'インナーとアウターを使うVALORANTのダブルクロスヘアを比較。マップ上で二層の見え方を試してコードをコピーできます。',
    },
    plus: {
      label: 'プラス型クロスヘア', eyebrow: 'シンプルな4本ラインの定番', title: 'VALORANTのプラス型クロスヘアコード', intro: '短い4本ラインで作る定番のプラス型。中心を見つけやすく、ランクでも設定を調整しやすい形です。',
      body: ['プラス型は装飾を増やさず、上下左右の位置をはっきり示します。初めて自分用のクロスヘアを選ぶプレイヤーにも分かりやすい形です。', '長さ、太さ、中心のギャップを1段階変えるだけでも敵の隠れ方は変わります。遠距離の頭で比較してから選びましょう。'],
      selection: 'コンパクトな4本ラインから、中心が開いた形、ほぼ閉じた形、太さやアウトラインが違う有効コードを選びました。',
      settings: ['短いラインと小さなギャップから試す。', '敵を隠したくない場合は太さ1〜2を選ぶ。', '明るい壁で消えるときだけアウトラインを使う。'],
      faq: [['プラス型クロスヘアの作り方は？', 'インナーラインを有効にして4本を同じ長さにし、オフセットで中心の開き方を調整します。'], ['初心者にも向いていますか？', 'はい。形が分かりやすく、余分なレイヤーなしで簡単に調整できます。']],
      metaTitle: 'VALORANT プラス型クロスヘアコード | AimCodes', metaDescription: 'VALORANTのコンパクトなプラス型クロスヘアをプレビュー。長さ、太さ、ギャップ、アウトラインを比較してコピーできます。',
    },
  },
}

for (const [locale, collections] of Object.entries(content)) {
  for (const [key, value] of Object.entries(collections)) {
    collections[key] = Object.freeze({ ...value, ...shared[locale], ...related[key] })
  }
}

export function demandCollectionCopy(locale, collectionKey) {
  return content[locale]?.[collectionKey] || null
}
