import { expansionArticleCopy } from './guideExpansionContent.js'
import { growthArticleCopy } from './growthGuideContent.js'
import { japaneseArticles } from './japaneseContent.js'

const articles = {
  en: {
    settings: {
      eyebrow: 'STOP COPYING RANDOM NUMBERS',
      title: 'What should you change in your crosshair?',
      intro: 'Understand what every important crosshair option changes, then use the settings that match how you aim instead of copying numbers blindly.',
      summaryTitle: 'A reliable starting setup',
      summary: 'Start with cyan or green, a compact inner-line cross, a small open center, and movement and firing error turned off. Keep outlines on only if the crosshair disappears against bright walls.',
      sections: [
        {
          title: 'Color and outlines control visibility',
          paragraphs: ['Color should make the center easy to recover after an ability flash, a fast turn, or a target switch. Cyan and green are safe starting points because they stay readable across many map surfaces.', 'Outlines add a dark edge around the shape. Use a thin outline when white or cyan blends into a wall; turn it off if the crosshair starts to feel thick or covers distant heads.'],
          bullets: ['Color: begin with cyan, green, white, or yellow.', 'Outline opacity: enough contrast to separate the shape from the map.', 'Outline thickness: keep it thin unless visibility is a real problem.'],
        },
        {
          title: 'Center dot versus an open center',
          paragraphs: ['A center dot marks the exact middle and works well for deliberate one-taps. A four-line cross with a small gap leaves the head visible and gives your eyes more shape to track while moving.', 'If you keep losing a micro dot, make it thicker or switch to a short cross. Smaller is not automatically better when you cannot find it in a fight.'],
          bullets: ['Dot: precise and clean, but easier to lose.', 'Open center: keeps the target visible through the middle.', 'Closed center: easier to locate, but covers more of a distant target.'],
        },
        {
          title: 'Inner lines define the main shape',
          paragraphs: ['Length controls how far the lines extend, thickness controls how bold they look, and offset controls the gap around the center. These three settings create most familiar competitive crosshairs.', 'A compact baseline is length 3–4, thickness 1–2, and offset 1–2. Change one value at a time and compare it on the same map scene.'],
          bullets: ['Length: shorter lines reduce clutter.', 'Thickness: thicker lines improve visibility.', 'Offset: a larger value opens more space around the head.'],
        },
        {
          title: 'Outer lines are optional support',
          paragraphs: ['Outer lines can make a tiny center easier to track, but they also add visual noise. Most simple pro-style setups disable them.', 'Keep them only when they solve a clear problem, such as losing the center during quick movement.'],
          bullets: ['Use inner lines for the primary aiming reference.', 'Use outer lines sparingly as a secondary reference.', 'Disable outer lines for the cleanest static setup.'],
        },
        {
          title: 'Movement and firing error change the shape',
          paragraphs: ['Movement error expands or shifts the crosshair when your movement reduces accuracy. Firing error reacts to weapon inaccuracy while shooting. They can teach a new player when a shot is inaccurate, but the animation can distract once the timing is familiar.', 'For a stable competitive crosshair, turn both off. For practice, temporarily enable movement error to learn when you have fully stopped.'],
          bullets: ['Training: movement error can provide useful feedback.', 'Ranked: static crosshairs are easier to read consistently.', 'Do not treat the animation as a replacement for recoil control.'],
        },
        {
          title: 'Test changes in a repeatable way',
          paragraphs: ['Use one map, one color, and the same viewing distance. Compare only one setting at a time, then keep the version whose center you find fastest.', 'AimCodes lets you preview verified codes on the same scenes. Once a shape works, change its color and copy the updated code.'],
          bullets: ['First check visibility.', 'Then check whether the center covers the target.', 'Finally play a short practice-range session before ranked.'],
        },
      ],
      faq: [
        ['Should movement error be on or off?', 'Use it temporarily if you are learning when movement makes shots inaccurate. Turn it off when you want a stable crosshair with no animation.'],
        ['Do pro players use a center dot?', 'Some do, while many use four short lines with a small open center. The better choice is the one you can find quickly without covering the target.'],
        ['Are outer lines necessary?', 'No. They are optional and most compact setups work with inner lines or a center dot alone.'],
      ],
      recommendedCrosshairIds: ['tenz', 'aspas-dot', 'forsaken', 'small-dot-thick'],
      cta: 'Compare working crosshairs',
      metaTitle: 'VALORANT Crosshair Settings Explained | AimCodes',
      metaDescription: 'Learn what color, outlines, center dot, inner lines, outer lines, movement error and firing error do in VALORANT, with working crosshairs to test.',
    },
    colors: {
      eyebrow: 'SEE THE CENTER FASTER',
      title: 'Which VALORANT crosshair color should you use?',
      intro: 'There is no magic color for every map. Choose a color that separates from both the environment and your enemy outline, then test it on the scenes you actually play.',
      summaryTitle: 'The short answer',
      summary: 'Cyan and green are the safest all-round starting points. White works best with a thin outline. Yellow and red can be excellent on some maps but disappear into similarly colored walls and effects.',
      sections: [
        {
          title: 'Cyan: the safest first test',
          paragraphs: ['Cyan is bright, uncommon on many map surfaces, and easy to separate from red or yellow enemy outlines. That is why it appears in so many compact competitive setups.', 'It can blend into blue-gray areas, so keep green or white as a fallback rather than forcing one color everywhere.'],
          bullets: ['Good for: general play and compact pro-style shapes.', 'Watch for: blue lighting and cool-toned walls.', 'Try with: TenZ, aspas, or Boaster shapes.'],
        },
        {
          title: 'Green: bright and easy to reacquire',
          paragraphs: ['Green is easy to spot during fast target switches and works well with red enemy outlines. It is a strong alternative when cyan feels too close to the map palette.', 'Avoid shades that blend into plants, Viper effects, or green ability visuals.'],
          bullets: ['Good for: fast entries and players who lose tiny sights.', 'Watch for: green effects and vegetation.', 'Try with: Jinggg or a short open cross.'],
        },
        {
          title: 'White: clean, but give it contrast',
          paragraphs: ['White keeps the screen neutral and makes simple dots look clean. Bright walls can erase it, especially when outlines are disabled.', 'A thin dark outline usually makes white much more reliable without changing the shape too much.'],
          bullets: ['Good for: dots, minimal crosses, and neutral visuals.', 'Watch for: bright sky and pale walls.', 'Try with: f0rsakeN, Demon1, or Less.'],
        },
        {
          title: 'Yellow, red, and pink: strong situational choices',
          paragraphs: ['Yellow can pop against dark interiors, while red can feel direct and aggressive. Pink and magenta are useful when you want high separation from green or brown map surfaces.', 'These colors are more map-dependent. Test them before committing, especially if the enemy outline uses a similar hue.'],
          bullets: ['Yellow: bright, but can blend into warm walls and highlights.', 'Red: clear on cool maps, but competes with red enemy outlines.', 'Pink: distinctive and useful for both playful and competitive shapes.'],
        },
        {
          title: 'Match color to yellow, purple, or red enemy outlines',
          paragraphs: ['Your crosshair and enemy outline should remain visually separate. If both use similar colors, the center can disappear exactly when it reaches the target.', 'Start with cyan or green against a yellow outline, yellow or green against a purple outline, and cyan, green, white, or pink against a red outline. These are quick test combinations, not rules for every monitor and map.'],
          bullets: ['Yellow enemy outline: test cyan or green.', 'Purple enemy outline: test yellow, green, or white.', 'Red enemy outline: test cyan, green, white, or pink.'],
        },
        {
          title: 'How to choose in two minutes',
          paragraphs: ['Pick one shape and preview it in cyan, green, and white. Do not change the size at the same time. Keep the color your eyes locate first after looking away from the center.', 'Then repeat on a bright and a dark scene. The winner should stay readable in both without demanding attention.'],
          bullets: ['Same shape, three colors.', 'One bright scene and one dark scene.', 'Copy only after the color survives both tests.'],
        },
      ],
      faq: [
        ['What is the most visible VALORANT crosshair color?', 'Cyan and green are reliable starting points, but the most visible option depends on the map, enemy outline, monitor, and your own vision.'],
        ['Should a white crosshair use outlines?', 'Usually yes if it disappears on bright walls. Keep the outline thin so the crosshair does not become bulky.'],
        ['Can AimCodes change a crosshair code color?', 'Yes. Select a supported color in the preview and the copied profile code updates while keeping the original shape.'],
      ],
      recommendedCrosshairIds: ['tenz', 'jinggg', 'forsaken', 'heart-pink'],
      cta: 'Test colors on a map',
      metaTitle: 'Best VALORANT Crosshair Color by Enemy Outline | AimCodes',
      metaDescription: 'Choose a VALORANT crosshair color for yellow, purple, or red enemy outlines. Compare cyan, green, white, yellow and pink on real map scenes.',
    },
  },
  es: {
    settings: {
      eyebrow: 'DEJA DE COPIAR NÚMEROS AL AZAR',
      title: '¿Qué deberías cambiar en tu mira?',
      intro: 'Entiende qué cambia cada opción importante y elige una mira que encaje con tu forma de apuntar en lugar de copiar números a ciegas.',
      summaryTitle: 'Un punto de partida fiable',
      summary: 'Empieza con cian o verde, líneas interiores cortas, un pequeño hueco central y los errores de movimiento y disparo desactivados. Usa contorno solo si la mira se pierde en paredes claras.',
      sections: [
        { title: 'El color y el contorno controlan la visibilidad', paragraphs: ['El color debe permitirte recuperar el centro después de un giro rápido, una habilidad o un cambio de objetivo. Cian y verde funcionan bien en muchas superficies.', 'El contorno añade un borde oscuro. Déjalo fino cuando la mira se pierda y quítalo si empieza a tapar cabezas lejanas.'], bullets: ['Color: prueba primero cian, verde, blanco o amarillo.', 'Opacidad del contorno: solo la necesaria para separar la mira del mapa.', 'Grosor del contorno: mantenlo fino salvo que tengas un problema real de visibilidad.'] },
        { title: 'Punto central o centro abierto', paragraphs: ['El punto marca el centro exacto y va bien para el one tap. Una cruz de cuatro líneas con hueco deja ver la cabeza y ofrece una forma más fácil de seguir.', 'Si pierdes un micropunto, engórdalo o cambia a una cruz corta. Una mira más pequeña no sirve si no la encuentras durante el duelo.'], bullets: ['Punto: preciso y limpio, pero más fácil de perder.', 'Centro abierto: deja visible al rival.', 'Centro cerrado: se encuentra rápido, pero tapa algo más.'] },
        { title: 'Las líneas interiores forman la mira principal', paragraphs: ['La longitud marca hasta dónde llegan las líneas, el grosor cuánto destacan y el desplazamiento abre o cierra el hueco central.', 'Como base compacta, prueba longitud 3–4, grosor 1–2 y desplazamiento 1–2. Cambia un valor cada vez.'], bullets: ['Longitud corta: menos ruido.', 'Más grosor: más visibilidad.', 'Más desplazamiento: más espacio alrededor de la cabeza.'] },
        { title: 'Las líneas exteriores son opcionales', paragraphs: ['Pueden ayudarte a seguir un centro muy pequeño, pero añaden ruido visual. La mayoría de miras competitivas simples las desactivan.', 'Úsalas solo si solucionan un problema concreto, como perder la mira durante movimientos rápidos.'], bullets: ['Las líneas interiores deben ser la referencia principal.', 'Las exteriores funcionan como apoyo.', 'Desactívalas para una mira estática más limpia.'] },
        { title: 'El error de movimiento y disparo anima la mira', paragraphs: ['El error de movimiento reacciona cuando moverte reduce la precisión. El de disparo muestra la inexactitud del arma. Sirven para aprender, pero pueden distraer.', 'Para una mira competitiva estable, desactiva ambos. En entrenamiento puedes activar temporalmente el error de movimiento.'], bullets: ['Entrenamiento: la animación puede dar feedback.', 'Competitivo: una mira estática se lee mejor.', 'La animación no sustituye el control del retroceso.'] },
        { title: 'Prueba los cambios de forma repetible', paragraphs: ['Usa el mismo mapa, color y distancia. Cambia solo un ajuste y conserva la versión cuyo centro encuentres antes.', 'En AimCodes puedes comparar códigos verificados en las mismas escenas, cambiar el color y copiar el resultado.'], bullets: ['Primero comprueba visibilidad.', 'Después, cuánto tapa el objetivo.', 'Finalmente, pruébala en el campo de tiro antes de ranked.'] },
      ],
      faq: [['¿Activo o desactivo el error de movimiento?', 'Actívalo temporalmente si estás aprendiendo cuándo pierdes precisión. Desactívalo para una mira estable.'], ['¿Los profesionales usan punto central?', 'Algunos sí; muchos prefieren cuatro líneas cortas con un pequeño hueco. Elige lo que veas rápido sin tapar al rival.'], ['¿Son necesarias las líneas exteriores?', 'No. Son opcionales y la mayoría de miras compactas funcionan solo con líneas interiores o un punto.']],
      recommendedCrosshairIds: ['tenz', 'aspas-dot', 'forsaken', 'small-dot-thick'], cta: 'Comparar miras que funcionan',
      metaTitle: 'Ajustes de Mira de VALORANT Explicados | AimCodes', metaDescription: 'Aprende para qué sirven el color, contorno, punto central, líneas, error de movimiento y error de disparo en VALORANT y prueba miras reales.',
    },
    colors: {
      eyebrow: 'ENCUENTRA EL CENTRO ANTES', title: '¿Qué color de mira deberías usar en VALORANT?', intro: 'No existe un color mágico para todos los mapas. Busca contraste con el escenario y el contorno de los enemigos, y pruébalo en las zonas donde juegas.',
      summaryTitle: 'La respuesta corta', summary: 'Cian y verde son los puntos de partida más seguros. El blanco funciona mejor con un contorno fino. Amarillo y rojo pueden destacar mucho, pero se pierden en paredes y efectos del mismo tono.',
      sections: [
        { title: 'Cian: la primera prueba más segura', paragraphs: ['Es brillante, poco común en muchas superficies y se separa bien de contornos enemigos rojos o amarillos.', 'Puede mezclarse con zonas azuladas, así que guarda verde o blanco como alternativa.'], bullets: ['Bueno para: juego general y miras compactas.', 'Cuidado con: iluminación azul y paredes frías.', 'Pruébalo con: TenZ, aspas o Boaster.'] },
        { title: 'Verde: brillante y fácil de recuperar', paragraphs: ['Se encuentra rápido al cambiar de objetivo y combina bien con contornos enemigos rojos.', 'Evita tonos que se mezclen con vegetación o habilidades verdes.'], bullets: ['Bueno para: entradas rápidas y miras pequeñas.', 'Cuidado con: efectos verdes.', 'Pruébalo con: Jinggg o una cruz abierta corta.'] },
        { title: 'Blanco: limpio, pero necesita contraste', paragraphs: ['El blanco hace que puntos y cruces simples se vean limpios, aunque puede desaparecer en paredes claras.', 'Un contorno oscuro fino suele resolverlo sin engordar demasiado la mira.'], bullets: ['Bueno para: puntos y cruces mínimas.', 'Cuidado con: cielo y paredes claras.', 'Pruébalo con: f0rsakeN, Demon1 o Less.'] },
        { title: 'Amarillo, rojo y rosa: opciones situacionales', paragraphs: ['El amarillo destaca en interiores oscuros; el rojo funciona mejor en mapas fríos; rosa y magenta separan bien del verde y el marrón.', 'Son colores más dependientes del mapa y del contorno enemigo.'], bullets: ['Amarillo: brillante, pero se mezcla con paredes cálidas.', 'Rojo: claro en mapas fríos, pero compite con contornos rojos.', 'Rosa: distinto y útil en miras divertidas o competitivas.'] },
        { title: 'Combina la mira con contornos amarillos, morados o rojos', paragraphs: ['Si la mira y el contorno enemigo usan colores parecidos, el centro desaparece justo cuando llega al objetivo.', 'Como prueba rápida, usa cian o verde con contorno amarillo; amarillo, verde o blanco con contorno morado; y cian, verde, blanco o rosa con contorno rojo.'], bullets: ['Contorno amarillo: prueba cian o verde.', 'Contorno morado: prueba amarillo, verde o blanco.', 'Contorno rojo: prueba cian, verde, blanco o rosa.'] },
        { title: 'Cómo elegir en dos minutos', paragraphs: ['Prueba la misma forma en cian, verde y blanco. No cambies el tamaño a la vez. Quédate con el color que encuentres antes después de apartar la vista.', 'Repite en una escena clara y otra oscura.'], bullets: ['Misma forma, tres colores.', 'Una escena clara y otra oscura.', 'Copia solo cuando supere ambas pruebas.'] },
      ],
      faq: [['¿Cuál es el color de mira más visible?', 'Cian y verde son buenos puntos de partida, pero depende del mapa, el contorno enemigo, tu monitor y tu vista.'], ['¿La mira blanca necesita contorno?', 'Normalmente sí cuando se pierde en paredes claras. Déjalo fino.'], ['¿AimCodes puede cambiar el color del código?', 'Sí. El color elegido se escribe en el código copiado sin cambiar la forma.']],
      recommendedCrosshairIds: ['tenz', 'jinggg', 'forsaken', 'heart-pink'], cta: 'Probar colores en un mapa',
      metaTitle: 'Mejor Color de Mira según el Contorno Enemigo | AimCodes', metaDescription: 'Elige color de mira para contornos enemigos amarillos, morados o rojos. Compara cian, verde, blanco, amarillo y rosa en mapas reales.',
    },
  },
  'pt-BR': {
    settings: {
      eyebrow: 'PARE DE COPIAR NÚMEROS NO ESCURO', title: 'O que vale mudar na sua mira?', intro: 'Entenda o que cada opção importante muda e escolha uma mira que combine com seu jeito de jogar, sem copiar números no escuro.',
      summaryTitle: 'Um ponto de partida confiável', summary: 'Comece com ciano ou verde, linhas internas curtas, um pequeno espaço no centro e erro de movimento e disparo desligados. Use contorno apenas se a mira sumir em paredes claras.',
      sections: [
        { title: 'Cor e contorno controlam a visibilidade', paragraphs: ['A cor precisa ajudar você a reencontrar o centro depois de uma habilidade, giro rápido ou troca de alvo. Ciano e verde funcionam em muitas superfícies.', 'O contorno cria uma borda escura. Deixe fino quando a mira sumir e desligue se começar a cobrir cabeças distantes.'], bullets: ['Cor: teste ciano, verde, branco ou amarelo.', 'Opacidade: só o suficiente para separar a mira do mapa.', 'Espessura: mantenha fina, salvo um problema real de visibilidade.'] },
        { title: 'Ponto central ou centro aberto', paragraphs: ['O ponto marca o meio exato e combina com one taps. Uma cruz de quatro linhas com espaço no centro deixa a cabeça visível e é mais fácil de acompanhar.', 'Se você perde um microponto, aumente a espessura ou use uma cruz curta. Menor não é melhor quando a mira some na luta.'], bullets: ['Ponto: preciso e limpo, mas fácil de perder.', 'Centro aberto: mantém o alvo visível.', 'Centro fechado: fácil de achar, mas cobre mais.'] },
        { title: 'Linhas internas formam a mira principal', paragraphs: ['Comprimento define até onde as linhas vão, espessura define o peso visual e deslocamento abre o espaço central.', 'Como base compacta, teste comprimento 3–4, espessura 1–2 e deslocamento 1–2. Mude um valor de cada vez.'], bullets: ['Linhas curtas: menos ruído.', 'Mais espessura: mais visibilidade.', 'Mais deslocamento: mais espaço ao redor da cabeça.'] },
        { title: 'Linhas externas são opcionais', paragraphs: ['Elas ajudam a acompanhar um centro muito pequeno, mas adicionam ruído. A maioria das miras competitivas simples desliga essa opção.', 'Use apenas quando resolver um problema claro, como perder o centro durante movimentos rápidos.'], bullets: ['Linhas internas são a referência principal.', 'Linhas externas funcionam como apoio.', 'Desligue para uma mira estática mais limpa.'] },
        { title: 'Erro de movimento e disparo animam a mira', paragraphs: ['Erro de movimento reage quando andar reduz a precisão. Erro de disparo mostra a imprecisão da arma. Podem ensinar, mas também distraem.', 'Para uma mira competitiva estável, desligue os dois. No treino, ative temporariamente o erro de movimento.'], bullets: ['Treino: a animação pode dar feedback.', 'Competitivo: uma mira estática é mais consistente.', 'A animação não substitui controle de recoil.'] },
        { title: 'Teste mudanças de forma repetível', paragraphs: ['Use o mesmo mapa, cor e distância. Mude uma opção por vez e fique com a versão cujo centro você encontra mais rápido.', 'No AimCodes, compare códigos verificados nas mesmas cenas, troque a cor e copie o resultado.'], bullets: ['Primeiro veja a visibilidade.', 'Depois, quanto cobre o alvo.', 'Por fim, teste no campo de treino antes da ranked.'] },
      ],
      faq: [['Erro de movimento ligado ou desligado?', 'Ligue temporariamente para aprender quando o movimento reduz a precisão. Desligue para uma mira estável.'], ['Pro players usam ponto central?', 'Alguns usam; muitos preferem quatro linhas curtas com pequeno espaço. Escolha o que você acha rápido sem cobrir o alvo.'], ['Linhas externas são necessárias?', 'Não. São opcionais e a maioria das miras compactas usa apenas linhas internas ou ponto.']],
      recommendedCrosshairIds: ['tenz', 'aspas-dot', 'forsaken', 'small-dot-thick'], cta: 'Comparar miras que funcionam',
      metaTitle: 'Configurações de Mira do VALORANT Explicadas | AimCodes', metaDescription: 'Entenda cor, contorno, ponto central, linhas, erro de movimento e erro de disparo no VALORANT e teste miras que funcionam.',
    },
    colors: {
      eyebrow: 'ACHE O CENTRO MAIS RÁPIDO', title: 'Qual cor de mira você deveria usar no VALORANT?', intro: 'Não existe uma cor mágica para todos os mapas. Busque contraste com o cenário e o contorno dos inimigos, depois teste nas cenas em que você joga.',
      summaryTitle: 'Resposta curta', summary: 'Ciano e verde são os pontos de partida mais seguros. Branco funciona melhor com contorno fino. Amarelo e vermelho podem destacar bastante, mas somem em paredes e efeitos parecidos.',
      sections: [
        { title: 'Ciano: o primeiro teste mais seguro', paragraphs: ['É brilhante, pouco comum em muitas superfícies e separa bem de contornos inimigos vermelhos ou amarelos.', 'Pode se misturar com áreas azuladas, então mantenha verde ou branco como alternativa.'], bullets: ['Bom para: uso geral e miras compactas.', 'Cuidado com: luz azul e paredes frias.', 'Teste com: TenZ, aspas ou Boaster.'] },
        { title: 'Verde: brilhante e fácil de reencontrar', paragraphs: ['É fácil de localizar em trocas rápidas de alvo e funciona bem com contorno inimigo vermelho.', 'Evite tons que se misturem com plantas ou habilidades verdes.'], bullets: ['Bom para: entrada rápida e miras pequenas.', 'Cuidado com: efeitos verdes.', 'Teste com: Jinggg ou uma cruz aberta curta.'] },
        { title: 'Branco: limpo, mas precisa de contraste', paragraphs: ['O branco deixa pontos e cruzes simples limpos, mas pode sumir em paredes claras.', 'Um contorno escuro fino costuma resolver sem deixar a mira pesada.'], bullets: ['Bom para: pontos e cruzes mínimas.', 'Cuidado com: céu e paredes claras.', 'Teste com: f0rsakeN, Demon1 ou Less.'] },
        { title: 'Amarelo, vermelho e rosa: escolhas situacionais', paragraphs: ['Amarelo aparece em interiores escuros; vermelho funciona melhor em mapas frios; rosa e magenta separam bem de verde e marrom.', 'São cores mais dependentes do mapa e do contorno inimigo.'], bullets: ['Amarelo: brilhante, mas mistura em paredes quentes.', 'Vermelho: claro em mapas frios, mas compete com contorno vermelho.', 'Rosa: diferente e útil em formatos divertidos ou competitivos.'] },
        { title: 'Combine a mira com contorno amarelo, roxo ou vermelho', paragraphs: ['Se a mira e o contorno inimigo usam cores parecidas, o centro some justamente quando chega ao alvo.', 'Como teste rápido, use ciano ou verde com contorno amarelo; amarelo, verde ou branco com contorno roxo; e ciano, verde, branco ou rosa com contorno vermelho.'], bullets: ['Contorno amarelo: teste ciano ou verde.', 'Contorno roxo: teste amarelo, verde ou branco.', 'Contorno vermelho: teste ciano, verde, branco ou rosa.'] },
        { title: 'Como escolher em dois minutos', paragraphs: ['Teste o mesmo formato em ciano, verde e branco. Não mude o tamanho junto. Fique com a cor que você reencontra primeiro.', 'Repita em uma cena clara e outra escura.'], bullets: ['Mesmo formato, três cores.', 'Uma cena clara e outra escura.', 'Copie só depois de passar nos dois testes.'] },
      ],
      faq: [['Qual é a cor de mira mais visível?', 'Ciano e verde são bons pontos de partida, mas depende do mapa, contorno inimigo, monitor e sua visão.'], ['Mira branca precisa de contorno?', 'Normalmente sim quando some em paredes claras. Mantenha o contorno fino.'], ['O AimCodes muda a cor do código?', 'Sim. A cor escolhida entra no código copiado sem alterar o formato.']],
      recommendedCrosshairIds: ['tenz', 'jinggg', 'forsaken', 'heart-pink'], cta: 'Testar cores em um mapa',
      metaTitle: 'Melhor Cor de Mira por Contorno Inimigo | AimCodes', metaDescription: 'Escolha a cor da mira para contorno inimigo amarelo, roxo ou vermelho. Compare ciano, verde, branco, amarelo e rosa em mapas reais.',
    },
  },
  'zh-CN': {
    settings: {
      eyebrow: '别再照抄参数', title: '准星怎么调才顺手？', intro: '颜色、轮廓、中心点、内外线和移动误差分别改了什么？看懂之后，再按自己的瞄准习惯动手。',
      summaryTitle: '一套稳妥的起步设置', summary: '先试青色或绿色、短内线、小幅中心留空，并关闭移动误差和射击误差。只有准星经常消失在亮色墙面时，才加一层细轮廓。',
      sections: [
        { title: '颜色和轮廓决定你能不能看见准星', paragraphs: ['好的颜色能让你在快速转身、技能特效和切换目标后立刻找回中心。青色和绿色在多数地图表面都比较稳定。', '轮廓会给准星加一圈深色边缘。亮墙上容易丢准星时开细轮廓；如果远距离开始挡头，就关掉或调薄。'], bullets: ['颜色：优先试青、绿、白、黄。', '轮廓透明度：够把准星和地图分开就行。', '轮廓粗细：没有明显可见度问题就不要加粗。'] },
        { title: '中心点和中心留空怎么选', paragraphs: ['中心点直接标出正中心，适合稳定单点。四条短线加小幅留空不会挡住头部，而且移动时更容易跟住整个形状。', '如果微型点经常在交战中消失，就把点加粗，或者换成短十字。看不见的小准星没有任何精度优势。'], bullets: ['中心点：干净精确，但更容易丢。', '中心留空：正中心不会挡住目标。', '中心闭合：更容易定位，但会多遮一点远处目标。'] },
        { title: '内线决定准星的主要造型', paragraphs: ['长度决定线伸多远，粗细决定醒目程度，偏移决定中心空隙大小。大多数竞技准星主要靠这三个值形成。', '紧凑起点可以先试长度 3–4、粗细 1–2、偏移 1–2。每次只改一个数，再用同一地图比较。'], bullets: ['线越短：画面越干净。', '线越粗：更容易看见。', '偏移越大：头部周围留空越多。'] },
        { title: '外线只是辅助，不是必选项', paragraphs: ['外线能帮助你跟住很小的中心，但也会增加视觉信息。多数简洁的职业风格准星会直接关闭外线。', '只有它能解决明确问题，例如快速移动时总丢中心，才值得保留。'], bullets: ['内线作为主要瞄准参照。', '外线只做第二层辅助。', '想要最干净的静态准星就关闭外线。'] },
        { title: '移动误差和射击误差会让准星动起来', paragraphs: ['移动误差会在走动影响精度时扩张或变化；射击误差会反映武器连续射击时的扩散。它们能帮助新手理解失准时机，但熟悉后也可能干扰视线。', '想要稳定的竞技准星就都关闭。练习停枪时，可以暂时开启移动误差作为反馈。'], bullets: ['训练：移动误差可以提供反馈。', '排位：静态准星更容易保持一致。', '动画不能代替压枪和停枪练习。'] },
        { title: '用可重复的方法测试参数', paragraphs: ['固定地图、颜色和观看距离，每次只改一个参数，留下你视线最快找到中心的版本。', 'AimCodes 可以把不同有效代码放在相同场景里比较。形状确定后再换色，并复制同步更新的代码。'], bullets: ['先检查可见度。', '再检查会不会遮挡目标。', '最后去训练场打一小轮再带进排位。'] },
      ],
      faq: [['移动误差应该开还是关？', '刚开始学习停枪时可以暂时开启；想要不会变化的稳定准星时就关闭。'], ['职业选手会用中心点吗？', '有人用小圆点，也有很多人用中心留空的四条短线。关键是快速看见中心，同时不挡住目标。'], ['外线有必要开吗？', '没有。外线只是可选辅助，大多数紧凑准星只需要内线或中心点。']],
      recommendedCrosshairIds: ['tenz', 'aspas-dot', 'forsaken', 'small-dot-thick'], cta: '对比可用准星',
      metaTitle: '无畏契约准星设置完整说明：内线、外线与误差 | AimCodes', metaDescription: '了解无畏契约准星颜色、轮廓、中心点、内线、外线、移动误差和射击误差分别有什么用，并直接试用有效准星。',
    },
    colors: {
      eyebrow: '更快看见中心', title: '无畏契约准星颜色怎么选', intro: '没有一种颜色能通吃所有地图。真正重要的是它能同时和场景、敌人轮廓拉开差异，并且你的眼睛能快速找回。',
      summaryTitle: '先说结论', summary: '青色和绿色是最稳妥的起点；白色最好配一层细轮廓；黄色和红色在部分地图很醒目，但遇到相近颜色的墙面和技能特效也更容易消失。',
      sections: [
        { title: '青色：最适合第一个试', paragraphs: ['青色亮度高，在不少地图表面并不常见，也容易和红色或黄色敌人轮廓区分，所以经常出现在紧凑竞技准星里。', '蓝灰色区域可能降低对比度，不要强行只用一种颜色，绿色或白色可以作为备选。'], bullets: ['适合：通用排位和紧凑职业风格。', '注意：蓝色灯光和冷色墙面。', '推荐搭配：TenZ、aspas、Boaster。'] },
        { title: '绿色：醒目，而且容易重新找回', paragraphs: ['快速切换目标时，绿色通常很容易被视线捕捉，也适合搭配红色敌人轮廓。', '植物、Viper 技能或其他绿色特效较多时，需要换一个色调。'], bullets: ['适合：快节奏突破和容易丢小准星的玩家。', '注意：绿色技能和植被。', '推荐搭配：Jinggg 或短线留空十字。'] },
        { title: '白色：干净，但要补对比度', paragraphs: ['白色不会给画面增加太多颜色干扰，尤其适合简单圆点和小十字，但明亮墙面很容易把它吃掉。', '一层细黑轮廓通常就能明显改善，同时不会让准星膨胀太多。'], bullets: ['适合：小圆点、微型十字和中性画面。', '注意：天空和浅色墙面。', '推荐搭配：f0rsakeN、Demon1、Less。'] },
        { title: '黄、红、粉：更看地图的选择', paragraphs: ['黄色在暗色室内很突出；红色更适合冷色地图；粉色和洋红色可以和绿色、棕色场景形成明显差异。', '它们更依赖地图和敌人轮廓，正式使用前一定要预览。'], bullets: ['黄色：很亮，但会融进暖色墙面。', '红色：冷色地图清楚，但会和红色敌人轮廓打架。', '粉色：辨识度高，趣味和竞技造型都能用。'] },
        { title: '黄色、紫色、红色敌人轮廓怎么配准星', paragraphs: ['准星和敌人轮廓太接近时，中心会在对准目标的一瞬间消失。', '快速起点可以这样试：黄色轮廓配青或绿；紫色轮廓配黄、绿或白；红色轮廓配青、绿、白或粉。最终仍要在自己的显示器和常玩地图里确认。'], bullets: ['黄色敌人轮廓：先试青色或绿色。', '紫色敌人轮廓：先试黄色、绿色或白色。', '红色敌人轮廓：先试青色、绿色、白色或粉色。'] },
        { title: '两分钟选出适合自己的颜色', paragraphs: ['固定同一个准星形状，依次试青、绿、白，不要同时改大小。视线先离开中心，再看哪种颜色最快被你找到。', '然后在亮场景和暗场景各试一次，两边都能看清再复制。'], bullets: ['同一个形状，对比三种颜色。', '一张亮场景和一张暗场景。', '两种场景都能看清再复制代码。'] },
      ],
      faq: [['无畏契约什么准星颜色最显眼？', '青色和绿色是可靠起点，但最终会受到地图、敌人轮廓、显示器和个人视觉影响。'], ['白色准星需要轮廓吗？', '如果经常在亮色墙面丢失，建议开一层细轮廓，不要加得太粗。'], ['AimCodes 换色会修改最终代码吗？', '会。选择支持的颜色后，复制代码会同步更新，同时保留原来的准星形状。']],
      recommendedCrosshairIds: ['tenz', 'jinggg', 'forsaken', 'heart-pink'], cta: '在地图中试颜色',
      metaTitle: '无畏契约准星颜色怎么配敌人轮廓 | AimCodes', metaDescription: '按黄色、紫色或红色敌人轮廓选择无畏契约准星颜色，在真实地图中对比青、绿、白、黄和粉色的可见度。',
    },
  },
}

export function articleCopy(locale, articleKey) {
  if (locale === 'ja') return japaneseArticles[articleKey] || articles.en[articleKey] || articles.en.settings
  return articles[locale]?.[articleKey]
    || expansionArticleCopy(locale, articleKey)
    || growthArticleCopy(locale, articleKey)
    || articles.en[articleKey]
    || articles.en.settings
}
