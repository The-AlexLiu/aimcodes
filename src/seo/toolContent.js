import { japaneseTools } from './japaneseContent.js'
import { playbookSeoCopy } from './playbookContent.js'

const toolContent = {
  en: {
    generator: {
      eyebrow: 'BUILD IT, TEST IT, COPY IT', title: 'VALORANT crosshair generator', intro: 'Shape a crosshair with real profile settings, test it on a map, and copy a code the game can import.',
      guideTitle: 'Change one thing at a time', guideIntro: 'Start with a simple center, then tune color and line size. Small changes are much easier to judge than ten sliders moving at once.',
      tips: [
        { title: 'Lock in the center first', body: 'Choose a dot or an open cross before adding extra lines. The center should be obvious without covering a distant head.' },
        { title: 'Check bright and dark walls', body: 'If the shape disappears, change color or add a thin outline before making the whole crosshair larger.' },
        { title: 'Use error indicators for practice', body: 'Movement and firing error can teach timing, but many players turn them off in matches for a steadier picture.' },
      ],
      faq: [['Can I import the generated code?', 'Yes. AimCodes parses the finished profile again before the copy button is enabled.'], ['Will a new crosshair improve my aim?', 'It will not change weapon accuracy, but a center you can recover quickly can make aiming feel less distracting.']],
      metaTitle: 'VALORANT Crosshair Generator & Code Builder | AimCodes', metaDescription: 'Build a VALORANT crosshair with color, outline, center dot, inner and outer lines, movement error and firing error, then copy the code.',
    },
    decoder: {
      eyebrow: 'READ THE SETTINGS BEHIND A CODE', title: 'VALORANT crosshair code decoder', intro: 'Paste a profile code to check whether it works, see the shape, and read the settings hidden inside it.',
      guideTitle: 'Use the decoder before importing a mystery code', guideIntro: 'A valid code is not automatically a good fit. Check its center dot, line gap, outline, and error indicators before taking it into a match.',
      tips: [
        { title: 'Paste the full profile', body: 'Copy from the first character to the last value. Missing separators are the most common reason a code fails.' },
        { title: 'Read the shape, not the name', body: 'Player labels and social captions go out of date. The decoded settings show what the code actually draws.' },
        { title: 'Preview before you replace anything', body: 'Keep your current in-game profile until the decoded crosshair has passed a quick range test.' },
      ],
      faq: [['Why does a code fail to decode?', 'It is usually incomplete, contains extra spaces, or is not a VALORANT profile code. Copy the original string again.'], ['Does decoding change the code?', 'No. The decoder only reads the profile and draws a preview in your browser.']],
      metaTitle: 'VALORANT Crosshair Code Decoder | AimCodes', metaDescription: 'Paste a VALORANT crosshair code to validate it, preview the result and decode color, outline, center dot, inner lines and outer lines.',
    },
    preview: {
      eyebrow: 'PASTE IT, THEN PUT IT ON A MAP', title: 'VALORANT crosshair preview', intro: 'Paste a profile code and see it at a normal scale on three map scenes before you import it into the game.',
      guideTitle: 'A clean preview beats a zoomed screenshot', guideIntro: 'Judge the crosshair at normal scale. A shape that looks perfect when enlarged may cover too much of a distant target in game.',
      tips: [
        { title: 'Switch backgrounds', body: 'Use a warm wall and a brighter outdoor scene. A reliable color should stay easy to recover on both.' },
        { title: 'Look away, then return to center', body: 'If your eyes cannot find the center immediately, try a clearer color, a thin outline, or a slightly wider gap.' },
        { title: 'Finish in the practice range', body: 'The map preview checks visibility. Recoil, movement, resolution, and your monitor still need an in-game test.' },
      ],
      faq: [['Is the preview the same size as VALORANT?', 'It uses a normal comparison scale, but display size and resolution can still change how the crosshair feels.'], ['Can I preview any code?', 'You can preview any complete profile code that the AimCodes parser recognizes.']],
      metaTitle: 'VALORANT Crosshair Preview on Real Maps | AimCodes', metaDescription: 'Preview any valid VALORANT crosshair code on real map scenes. Change the background, inspect the shape and copy the validated profile code.',
    },
    comparison: {
      eyebrow: 'SAME MAP, HONEST COMPARISON', title: 'Compare VALORANT crosshairs', intro: 'Put two working crosshairs on the same scene and see which center your eyes pick up faster.',
      guideTitle: 'Compare for a reason', guideIntro: 'Start with one question: which crosshair is easier to recover after looking at another part of the scene? Then compare head coverage and color.',
      tips: [
        { title: 'Keep the background identical', body: 'A fair comparison uses the same map and scale. Otherwise the brighter scene may win instead of the better crosshair.' },
        { title: 'Compare similar colors first', body: 'Matching colors makes shape differences easier to see. Change color only after choosing the cleaner geometry.' },
        { title: 'Copy one, not both', body: 'Take the winner into the range for a short test. Switching between two profiles every round makes the result harder to judge.' },
      ],
      faq: [['What should I compare first?', 'Check how quickly you find the center, then whether the shape covers a distant head.'], ['Does AimCodes rank one crosshair as better?', 'No. The tool keeps the scene equal so you can choose the shape that works for your eyes.']],
      metaTitle: 'Compare VALORANT Crosshairs Side by Side | AimCodes', metaDescription: 'Compare two working VALORANT crosshairs side by side on the same map scene, then copy the profile you prefer.',
    },
  },
  es: {
    generator: {
      eyebrow: 'CRÉALA, PRUÉBALA Y CÓPIALA', title: 'Generador de miras de VALORANT', intro: 'Dale forma con ajustes reales, pruébala sobre un mapa y copia un código que el juego pueda importar.',
      guideTitle: 'Cambia una cosa cada vez', guideIntro: 'Empieza por un centro sencillo y después ajusta color y líneas. Así sabrás qué cambio mejora de verdad la mira.',
      tips: [{ title: 'Primero, el centro', body: 'Elige punto o cruz abierta antes de añadir más líneas. Debes ver el centro sin tapar una cabeza lejana.' }, { title: 'Prueba paredes claras y oscuras', body: 'Si la mira desaparece, cambia el color o añade un contorno fino antes de hacerla más grande.' }, { title: 'Errores para entrenar', body: 'Los indicadores de movimiento y disparo enseñan el timing, pero muchos jugadores los apagan en partida.' }],
      faq: [['¿Puedo importar el código generado?', 'Sí. AimCodes vuelve a leer el perfil antes de activar el botón de copia.'], ['¿Una mira nueva mejora la puntería?', 'No cambia la precisión del arma, pero un centro fácil de encontrar puede distraerte menos.']],
      metaTitle: 'Generador de Miras y Códigos de VALORANT | AimCodes', metaDescription: 'Crea una mira de VALORANT con color, contorno, punto, líneas y errores de movimiento y disparo; después copia el código.',
    },
    decoder: {
      eyebrow: 'LEE LOS AJUSTES DEL CÓDIGO', title: 'Decodificador de códigos de mira de VALORANT', intro: 'Pega un código, comprueba si funciona, mira la forma y descubre los ajustes que lleva dentro.',
      guideTitle: 'Revisa los códigos desconocidos antes de importarlos', guideIntro: 'Que el código sea válido no significa que sea para ti. Mira el punto, la separación, el contorno y los indicadores de error.',
      tips: [{ title: 'Pega el perfil completo', body: 'Copia desde el primer carácter hasta el último valor. Los separadores que faltan suelen romper el código.' }, { title: 'Fíate de la forma', body: 'Los nombres de pros y los posts envejecen. Los ajustes decodificados enseñan lo que el código dibuja hoy.' }, { title: 'No borres tu mira todavía', body: 'Guarda tu perfil actual hasta probar la nueva mira unos minutos en el campo de tiro.' }],
      faq: [['¿Por qué no se puede leer el código?', 'Suele estar incompleto, tener espacios extra o no ser un perfil de VALORANT. Vuelve a copiarlo.'], ['¿El decodificador modifica el código?', 'No. Solo lee el perfil y dibuja una vista previa en el navegador.']],
      metaTitle: 'Decodificador de Códigos de Mira VALORANT | AimCodes', metaDescription: 'Pega un código de mira de VALORANT para validarlo, ver el resultado y leer color, contorno, punto y líneas.',
    },
    preview: {
      eyebrow: 'PÉGALA Y PONLA EN EL MAPA', title: 'Vista previa de miras de VALORANT', intro: 'Pega un código y míralo a escala normal sobre tres mapas antes de importarlo al juego.',
      guideTitle: 'Una vista normal vale más que una captura ampliada', guideIntro: 'Juzga la mira a escala normal. Ampliada puede verse limpia y aun así tapar demasiado en una pelea real.',
      tips: [{ title: 'Cambia el fondo', body: 'Prueba una pared cálida y una zona exterior clara. El color debe seguir apareciendo rápido en ambas.' }, { title: 'Aparta la vista y vuelve al centro', body: 'Si tardas en encontrarlo, prueba otro color, un contorno fino o un hueco algo mayor.' }, { title: 'Termina en el campo de tiro', body: 'La web comprueba visibilidad; resolución, movimiento y retroceso todavía necesitan una prueba en el juego.' }],
      faq: [['¿El tamaño es idéntico al del juego?', 'La escala sirve para comparar, pero la resolución y el tamaño de pantalla pueden cambiar la sensación.'], ['¿Puedo probar cualquier código?', 'Sí, siempre que sea un perfil completo que AimCodes pueda leer.']],
      metaTitle: 'Vista Previa de Miras VALORANT en Mapas | AimCodes', metaDescription: 'Prueba cualquier código válido de mira de VALORANT sobre mapas reales, cambia el fondo y copia el perfil validado.',
    },
    comparison: {
      eyebrow: 'MISMO MAPA, COMPARACIÓN LIMPIA', title: 'Compara miras de VALORANT', intro: 'Pon dos miras sobre la misma escena y descubre qué centro encuentran antes tus ojos.',
      guideTitle: 'Compara con una pregunta clara', guideIntro: 'Primero mira cuál recuperas antes después de apartar la vista. Después compara cuánto tapa y si el color aguanta.',
      tips: [{ title: 'Mismo fondo y misma escala', body: 'Si cambia el mapa, puede ganar la escena más clara y no la mejor mira.' }, { title: 'Empieza con colores parecidos', body: 'Así comparas la forma. Cambia el color después de elegir la geometría que te resulte más limpia.' }, { title: 'Lleva solo una al campo de tiro', body: 'Prueba la ganadora durante unos minutos; cambiar cada ronda hace más difícil notar una diferencia real.' }],
      faq: [['¿Qué comparo primero?', 'La velocidad con la que encuentras el centro y cuánto tapa una cabeza lejana.'], ['¿AimCodes decide cuál es mejor?', 'No. Igualamos la escena para que elijas la que funciona mejor para tus ojos.']],
      metaTitle: 'Comparar Miras de VALORANT Lado a Lado | AimCodes', metaDescription: 'Compara dos miras de VALORANT sobre el mismo mapa y copia el perfil que prefieras.',
    },
  },
  'pt-BR': {
    generator: {
      eyebrow: 'MONTE, TESTE E COPIE', title: 'Gerador de miras do VALORANT', intro: 'Monte sua mira com ajustes reais, teste no mapa e copie um código que o jogo consegue importar.',
      guideTitle: 'Mude uma coisa por vez', guideIntro: 'Comece por um centro simples e depois ajuste cor e linhas. Assim fica fácil saber qual mudança realmente ajudou.',
      tips: [{ title: 'Acerte o centro primeiro', body: 'Escolha ponto ou cruz aberta antes de adicionar mais linhas. O centro precisa aparecer sem cobrir uma cabeça distante.' }, { title: 'Teste paredes claras e escuras', body: 'Se a mira sumir, troque a cor ou use contorno fino antes de aumentar tudo.' }, { title: 'Use os erros para treinar', body: 'Indicadores de movimento e disparo ajudam no timing, mas muita gente desliga durante as partidas.' }],
      faq: [['Posso importar o código gerado?', 'Sim. O AimCodes lê o perfil novamente antes de liberar o botão de copiar.'], ['Uma mira nova melhora a precisão?', 'Ela não muda a arma, mas um centro fácil de reencontrar pode atrapalhar menos sua visão.']],
      metaTitle: 'Gerador de Miras e Códigos do VALORANT | AimCodes', metaDescription: 'Crie uma mira do VALORANT com cor, contorno, ponto, linhas e erros de movimento e disparo, depois copie o código.',
    },
    decoder: {
      eyebrow: 'LEIA OS AJUSTES DO CÓDIGO', title: 'Decodificador de código de mira do VALORANT', intro: 'Cole um código, confira se funciona, veja o formato e descubra os ajustes guardados nele.',
      guideTitle: 'Confira códigos desconhecidos antes de importar', guideIntro: 'Código válido não significa mira boa para você. Veja ponto, espaçamento, contorno e indicadores de erro antes da partida.',
      tips: [{ title: 'Cole o perfil inteiro', body: 'Copie do primeiro caractere ao último valor. Separadores faltando são o erro mais comum.' }, { title: 'Olhe o formato, não o nome', body: 'Nomes de pros e posts ficam desatualizados. Os ajustes mostram o que o código realmente desenha.' }, { title: 'Guarde sua mira atual', body: 'Não apague o perfil antigo antes de testar a nova mira por alguns minutos no treino.' }],
      faq: [['Por que o código não abre?', 'Normalmente está incompleto, tem espaços extras ou não é um perfil do VALORANT. Copie novamente.'], ['O decodificador altera o código?', 'Não. Ele só lê o perfil e monta uma prévia no navegador.']],
      metaTitle: 'Decodificador de Código de Mira VALORANT | AimCodes', metaDescription: 'Cole um código de mira do VALORANT para validar, visualizar e ler cor, contorno, ponto e linhas.',
    },
    preview: {
      eyebrow: 'COLE E LEVE PARA O MAPA', title: 'Prévia de mira do VALORANT', intro: 'Cole um código e veja em escala normal em três mapas antes de importar no jogo.',
      guideTitle: 'Prévia normal vale mais que print ampliado', guideIntro: 'Julgue em escala normal. Uma mira bonita ampliada pode cobrir espaço demais quando o alvo está longe.',
      tips: [{ title: 'Troque o fundo', body: 'Teste parede quente e área externa clara. Uma boa cor continua fácil de achar nas duas.' }, { title: 'Desvie o olhar e volte', body: 'Se o centro demora a aparecer, tente outra cor, contorno fino ou um espaço um pouco maior.' }, { title: 'Finalize no campo de treino', body: 'A prévia testa visibilidade; resolução, movimento e recuo ainda precisam do jogo.' }],
      faq: [['O tamanho é igual ao do VALORANT?', 'A escala é boa para comparar, mas monitor e resolução podem mudar a sensação.'], ['Posso testar qualquer código?', 'Sim, desde que seja um perfil completo que o AimCodes consiga ler.']],
      metaTitle: 'Prévia de Mira VALORANT em Mapas Reais | AimCodes', metaDescription: 'Teste qualquer código válido de mira do VALORANT em mapas reais, troque o fundo e copie o perfil validado.',
    },
    comparison: {
      eyebrow: 'MESMO MAPA, COMPARAÇÃO LIMPA', title: 'Compare miras do VALORANT', intro: 'Coloque duas miras na mesma cena e descubra qual centro seus olhos encontram mais rápido.',
      guideTitle: 'Compare com um objetivo', guideIntro: 'Primeiro veja qual centro você reencontra mais rápido. Depois compare quanto a mira cobre e se a cor continua visível.',
      tips: [{ title: 'Mesmo fundo e mesma escala', body: 'Se o mapa mudar, a cena mais clara pode ganhar no lugar da melhor mira.' }, { title: 'Comece com cores parecidas', body: 'Assim você compara o formato. Troque a cor só depois de escolher a geometria.' }, { title: 'Leve uma para o treino', body: 'Teste a vencedora por alguns minutos; alternar toda rodada deixa a comparação confusa.' }],
      faq: [['O que devo comparar primeiro?', 'A velocidade para achar o centro e quanto a mira cobre uma cabeça distante.'], ['O AimCodes escolhe a melhor?', 'Não. A ferramenta iguala a cena para você escolher o formato que funciona melhor para seus olhos.']],
      metaTitle: 'Comparar Miras do VALORANT Lado a Lado | AimCodes', metaDescription: 'Compare duas miras do VALORANT no mesmo mapa e copie o perfil que preferir.',
    },
  },
  'zh-CN': {
    generator: {
      eyebrow: '自己捏一个能用的准星', title: '无畏契约准星生成器', intro: '颜色、轮廓、中心点和线条都能直接调。放进地图看顺眼了，再复制代码进游戏。',
      guideTitle: '一次只动一个参数', guideIntro: '先把中心做清楚，再调颜色和线条。十个滑杆一起拉，只会让你不知道手感到底变在哪里。',
      tips: [{ title: '先定中心', body: '先选小圆点还是留空十字，别急着把内外线全打开。中心清楚，又不挡远处的头就够了。' }, { title: '亮墙暗墙都看一眼', body: '准星会融进墙里，先换颜色或加一层细轮廓，不要第一反应就是把它放大。' }, { title: '误差提示更适合练枪', body: '移动误差和射击误差能提醒节奏；打排位觉得画面乱，直接关掉更省心。' }],
      faq: [['生成的代码能直接导入吗？', '能。复制按钮出现前，AimCodes 会把最终代码重新读一遍，确认不是坏代码。'], ['换准星能让我枪法变好吗？', '准星不会改变武器精度，但中心更容易找，瞄准时就少一层干扰。']],
      metaTitle: '无畏契约准星生成器与代码生成工具 | AimCodes', metaDescription: '调整颜色、轮廓、中心点、内外线、移动误差和射击误差，实时预览并生成无畏契约准星代码。',
    },
    decoder: {
      eyebrow: '把这串代码拆开看看', title: '无畏契约准星代码解析器', intro: '把准星代码贴进来，马上看它能不能用、长什么样，以及里面到底调了哪些参数。',
      guideTitle: '来路不明的代码，先拆再导入', guideIntro: '能导入不代表适合你。先看中心点、间距、轮廓和误差提示，免得进游戏才发现挡头或晃眼。',
      tips: [{ title: '整段代码一次贴完', body: '从第一个字符复制到最后一个数值。少一个分隔符，就可能整串都读不出来。' }, { title: '看参数，别只信名字', body: '选手名字和社媒标题都可能过期，解析出来的造型才是这串代码现在真正画出的东西。' }, { title: '旧准星先别删', body: '新准星去训练场打几分钟再决定，别还没试就把顺手的配置覆盖掉。' }],
      faq: [['为什么代码读不出来？', '最常见的是复制不完整、多了空格，或者贴进来的根本不是无畏契约准星代码。重新从原文完整复制一次。'], ['解析会修改原代码吗？', '不会。这里仅读取参数并在浏览器里画出预览。']],
      metaTitle: '无畏契约准星代码解析器 | AimCodes', metaDescription: '粘贴无畏契约准星代码，检查有效性、预览效果并读取颜色、轮廓、中心点、内线和外线参数。',
    },
    preview: {
      eyebrow: '先放进地图看看', title: '无畏契约准星预览工具', intro: '粘贴一段准星代码，放进三张地图按正常比例看一遍，再决定要不要带进游戏。',
      guideTitle: '正常比例，比放大截图更有参考价值', guideIntro: '放大后再干净的准星，也可能在实战里挡住半个远点。这里先看真实占屏，再去训练场收尾。',
      tips: [{ title: '切几张地图', body: '暖色墙面和明亮室外都试一次。换了背景还能马上找回中心，这个颜色才算稳。' }, { title: '移开视线，再找中心', body: '回到画面时找不到准星，就试试更醒目的颜色、细轮廓或稍大的中心间距。' }, { title: '最后还是要进训练场', body: '网页能看清晰度，分辨率、移动和后坐力带来的感觉，还是得进游戏确认。' }],
      faq: [['网页里的大小和游戏完全一样吗？', '这里使用正常对比比例，但显示器尺寸和分辨率仍会影响实际观感。'], ['所有准星代码都能预览吗？', '只要是完整、能被 AimCodes 正常读取的配置代码，就可以预览。']],
      metaTitle: '无畏契约准星地图预览工具 | AimCodes', metaDescription: '把有效无畏契约准星代码放进真实地图场景中预览，切换背景、检查造型并复制已验证代码。',
    },
    comparison: {
      eyebrow: '同一张图，谁更顺眼', title: '无畏契约准星对比工具', intro: '两款准星放进同一场景、同一个比例里比，哪个中心更容易抓住，一眼就知道。',
      guideTitle: '先想清楚你要比什么', guideIntro: '先看移开视线后哪个中心更快找回来，再看挡不挡远点的头、换背景后会不会消失。',
      tips: [{ title: '背景和比例必须一样', body: '地图一换，可能只是更亮的场景赢了，不是准星更好用。' }, { title: '先用相近颜色比造型', body: '颜色接近，中心间距和线条差异更容易看清。选定造型后再挑颜色。' }, { title: '只带赢家进训练场', body: '挑一款打几分钟再下结论。每回合来回换，反而很难判断真实手感。' }],
      faq: [['对比时先看什么？', '先看你多久能找到中心，再看准星会不会盖住远处的头。'], ['AimCodes 会直接判定哪款更好吗？', '不会。工具只把场景拉到同一条件，最后还是你的眼睛和手感说了算。']],
      metaTitle: '无畏契约准星并排对比工具 | AimCodes', metaDescription: '在相同地图中并排比较两款可用无畏契约准星，并复制更适合你的配置。',
    },
  },
}

export function seoToolCopy(locale, toolKey) {
  if (toolKey === 'playbook') return playbookSeoCopy(locale)
  if (locale === 'ja') return japaneseTools[toolKey] || toolContent.en[toolKey] || toolContent.en.generator
  return toolContent[locale]?.[toolKey] || toolContent.en[toolKey] || toolContent.en.generator
}
