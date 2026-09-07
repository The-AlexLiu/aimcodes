// Each guide answers a different diagnostic task; shared UI labels only.
const content = {
  en: {
    yellowEnemies: {
      title: 'VALORANT crosshair colors for yellow enemy outlines',
      intro: 'If your crosshair gets lost exactly when it touches an enemy, test the color pairing before changing the size.',
      summary: 'Start by comparing cyan and magenta against yellow outlines, with white plus a thin dark outline as a backup. These are test candidates, not a universal best color. Keep the shape fixed and judge the pairing in your own game.',
      sections: [
        ['Separate the crosshair from the enemy outline', 'The crosshair color and the enemy highlight color do different jobs. Changing the crosshair code does not change enemy outlines. Yellow-on-yellow can make the center harder to distinguish on the target even when it looks clear on a wall.'],
        ['Try three pairings, one shape', 'Use cyan (#00FFFF) first, magenta (#FF00FF) second, and white (#FFFFFF) with a thin dark outline third. Cyan and magenta offer a hue difference from yellow; white depends more on its outline. These are AimCodes comparison suggestions, not a Riot ranking or a color-vision guarantee.'],
        ['Run a short in-game comparison', 'Use the same weapon, crosshair size and enemy outline setting. For each color, check a bright wall, a dark corner and the edge of an enemy head. Look away from the center, then reacquire it. Keep the color you can recover without staring at the sight. Website map previews help compare backgrounds but do not reproduce your enemy highlights or vision.'],
        ['Save a backup instead of changing everything', 'If all three choices disappear, try one more unit of thickness or a thin outline before making the entire shape larger. Save the original profile first. You can enter a six-digit RGB value under the custom crosshair color setting, then confirm the imported profile still has the intended color.'],
      ],
      faq: [['Is cyan always best for yellow enemies?', 'No. Your map, display, visual needs and outline settings all matter. Compare several colors under the same conditions.'], ['Does a code include the enemy outline color?', 'No. A crosshair code controls the sight, not the enemy highlight setting.']],
      metaDescription: 'Compare cyan, magenta and outlined white VALORANT crosshairs with yellow enemy outlines. Use a practical visibility test instead of a universal color ranking.',
    },
    offCenter: {
      title: 'Does your VALORANT crosshair look off center?',
      intro: 'Work out whether the problem is the shape, the screenshot or the display before changing a setup that already feels good.',
      summary: 'Crosshair offset moves lines away from the center; it is not an X/Y control for moving the whole sight. Compare a simple dot and a balanced cross at your normal display settings. A shape that looks uneven is not enough to prove the game is aiming off center.',
      sections: [
        ['Check the original game image', 'Use an uncropped screenshot from your own game, not a social video, resized thumbnail or browser preview. Borders, letterboxing and resizing can change where the visible frame appears to begin. Identify the gameplay area before judging its center.'],
        ['Isolate the shape', 'Save your code, then import a simple dot or balanced four-line cross into a spare profile. Turn off outer lines for the comparison. If the new reference looks centered and only the decorated shape looks odd, focus on line length, thickness and outlines rather than changing the display.'],
        ['Understand what offset can and cannot fix', 'Offset is the gap between the line groups and the aiming center. Increasing it opens the shape; it does not shift the whole crosshair left or right. Different horizontal and vertical lengths can make a sight feel unbalanced without moving its aiming origin. Compare equal lengths before adding decorative layers back.'],
        ['Check scaling, then document a repeatable issue', 'Return to your normal native display settings for the test and compare screenshots at 100% scale. Tiny odd/even pixel shapes can look different after scaling. If the issue persists across simple profiles, record the resolution, display mode and uncropped screenshot for support. Do not use unverified overlays or registry tweaks as a centering fix.'],
      ],
      faq: [['Can I move the whole crosshair with offset?', 'No. Offset changes spacing around its center, not the screen position of the whole sight.'], ['Does looking off center mean bullets land off center?', 'Not by itself. Visual imbalance, spread and recoil are different issues. Test a simple reference before drawing that conclusion.']],
      metaDescription: 'Check an off-center-looking VALORANT crosshair with a simple dot, balanced lines and an uncropped screenshot. Learn why gap offset does not move the whole sight.',
    },
    stretched: {
      title: 'Stretched VALORANT crosshair: code or display scaling?',
      intro: 'A wide crosshair and a stretched screen can look similar in a clip, but they are not the same setting.',
      summary: 'For a wider crosshair only, adjust horizontal and vertical line lengths independently or copy a wide code. A crosshair code does not set screen resolution, stretch enemy models or reproduce another player’s monitor setup.',
      sections: [
        ['Choose the effect you actually want', 'If you want longer left and right arms, change the crosshair geometry. If the entire recorded image looks stretched, inspect display and video scaling separately. Do not assume a creator’s wide-looking screenshot reveals their original in-game settings.'],
        ['Make the shape wide without changing resolution', 'In the game’s crosshair settings, unlink horizontal and vertical inner-line lengths with the chain icon. Increase the horizontal length while keeping a short vertical reference. Start by comparing length 6 horizontally and 2 vertically at thickness 1 or 2; this is a starting experiment, not a required competitive preset.'],
        ['Compare at the size you actually play', 'Keep your normal resolution and display mode. Compare the new shape with a balanced plus at normal scale, on a distant head and a doorway edge. If the horizontal arm masks the edge, shorten it. A large website preview is useful for inspecting structure, not for deciding final in-game visibility.'],
        ['Know what is not carried in the code', 'The code carries crosshair settings, not desktop scaling or recording settings. A pure center dot also does not have separate inner-line arms to stretch: changing line length only matters if those lines are enabled. Use the decoder to inspect the profile, and avoid third-party display hacks just to copy a visual style.'],
      ],
      faq: [['Does a stretched crosshair need stretched resolution?', 'No. Independent line lengths create a wide shape at your normal resolution.'], ['Can a code make targets wider?', 'No. Crosshair settings do not change enemy model size or hitboxes.']],
      metaDescription: 'Make a wide VALORANT crosshair without changing resolution. Separate line geometry from display scaling and compare horizontal and vertical lengths safely.',
    },
    invisible: {
      title: 'VALORANT crosshair not visible? Check these settings',
      intro: 'Separate a rejected import from a profile that loads but cannot be seen. They need different fixes.',
      summary: 'For an accepted but invisible profile, check that at least one dot or line group is enabled with visible opacity and size. Then check contrast and the correct aiming profile. Keep a backup of the old code before resetting anything.',
      sections: [
        ['First decide whether the import succeeded', 'If the game rejects the code, use the code-not-working guide instead. If the profile was accepted, select it deliberately and test a plain dot in a spare slot. Do not delete your existing profiles to investigate one visibility problem.'],
        ['Find an element that can actually be drawn', 'A disabled dot and disabled inner and outer lines leave no visible center. An enabled element can still vanish with zero opacity, zero line length or an extremely small size. Turn on one simple element, raise its opacity and use a readable size before rebuilding the rest.'],
        ['Distinguish contrast from disappearance', 'If the sight is visible on a dark wall but lost on a bright surface, it is likely a contrast problem rather than an empty profile. Try cyan or magenta, a thin outline, or slightly thicker lines while keeping other settings fixed. Do not assume the smallest possible dot is the right choice for your screen.'],
        ['Check the aiming state that has the problem', 'Primary, aim-down-sights and sniper scope settings are separate contexts. Notice whether the problem appears only when aiming down sights or using a scope, and inspect that section rather than changing the working primary profile. If a simple visible setup still disappears, save the exact weapon, mode and screenshot for support. The website preview cannot diagnose every weapon-specific state.'],
      ],
      faq: [['Why can I see the preview but not my in-game crosshair?', 'The selected game profile, aiming state, background, scaling or opacity may differ. Start with the correct profile and one visible element.'], ['Should I reset everything first?', 'No. Save the code and test a spare profile first. Reset only the settings you can restore.']],
      metaDescription: 'Fix an invisible VALORANT crosshair by checking enabled elements, opacity, size, contrast and aiming profiles. Keep your old code before testing a reset.',
    },
  },
  'zh-CN': {
    yellowEnemies: {
      title: '无畏契约黄色敌人轮廓配什么准星颜色？', intro: '准星一碰到敌人就看不清？先试颜色搭配，别急着把整个准星放大。',
      summary: '先固定造型，对比青色、洋红色，再把带细黑边的白色作为备选。这是试色顺序，不是所有人通用的最优答案，最后要在自己的游戏画面里判断。',
      sections: [
        ['先分清两种颜色', '准星颜色和敌人轮廓颜色是两个设置。复制准星代码不会顺带修改敌人高亮。黄色准星在墙上很清楚，不代表放到黄色敌人边缘时还一样好找。'],
        ['同一个造型，试三组搭配', '依次试青色 #00FFFF、洋红色 #FF00FF，以及带细黑边的白色 #FFFFFF。前两种主要靠色相区分黄色，白色更依赖黑边。这是 AimCodes 的对比建议，不是官方排名，也不能替代你的实际视觉感受。'],
        ['进游戏做一次短对比', '固定武器、准星大小和敌人轮廓，分别看亮墙、暗角和敌人头部边缘。把视线移开再找回中心，留下不用盯着就能找到的颜色。网页地图预览只能帮你比较背景，不能还原你游戏里的敌人高亮与显示效果。'],
        ['都不好找时再调粗细', '先保留原来的配置，再试着增加一档粗细或加一层细轮廓，不必一下把全部线条拉大。自定义颜色使用六位 RGB 色值；导入后也要确认选中的配置确实是刚调整的那套。'],
      ], faq: [['黄色敌人一定配青色最好吗？', '不一定。地图、屏幕和个人视觉都会影响结果，固定其他设置再比较更靠谱。'], ['准星代码能改敌人轮廓吗？', '不能。代码管准星，敌人高亮需要另外设置。']],
      metaDescription: '黄色敌人轮廓配什么无畏契约准星颜色？对比青色、洋红色和带黑边白色，按亮墙、暗角、头部边缘测试可见度。',
    },
    offCenter: {
      title: '无畏契约准星看着不居中？这样排查', intro: '先分清是造型、截图还是显示缩放的问题，不要因为一张图就改掉顺手的配置。',
      summary: '准星偏移量调的是线条离中心的间隙，不是把整个准星往左或往右挪。用普通圆点和横竖等长十字对照，先判断是不是真的存在显示偏差。',
      sections: [
        ['先看没有裁剪的游戏截图', '不要用短视频截图、网页放大预览或被缩放过的缩略图判断中心。黑边、裁剪和录屏拉伸都会改变你看到的画面边界，先确认实际游戏区域。'],
        ['用简单造型排除视觉错觉', '保存旧代码，在备用配置里换成圆点或横竖等长的四线十字，先关外线。如果只有装饰造型看着歪，优先检查线长、粗细和轮廓，不要立刻改分辨率。'],
        ['偏移量不能把整个准星移位', '加大偏移量只是拉开线条与中心的距离。横线长、竖线短也可能让重心看起来不同，但不等于瞄准原点变了。先把横竖长度设成一样，再逐层加回装饰。'],
        ['还不对，再排查显示环境', '恢复平时的原生显示设置，用 100% 比例看原始截图。很小的奇偶像素造型在缩放后可能有视觉差异。如果简单圆点也持续异常，记录分辨率、显示模式和未裁剪截图给客服，不要先用来路不明的覆盖层或注册表补丁。'],
      ], faq: [['偏移量能让准星向左移动吗？', '不能。它改变中心周围的间隙，不改变整个准星在屏幕上的位置。'], ['看着偏就代表子弹也偏吗？', '不能直接这样判断。视觉重心、散布和后坐力不是一回事，先用简单参照排查。']],
      metaDescription: '无畏契约准星看着偏心、不在正中间？从原始截图、简单圆点、横竖线长和显示缩放排查，分清间隙偏移与真正的显示问题。',
    },
    stretched: {
      title: '无畏契约拉伸准星：宽造型和拉伸画面有什么区别', intro: '视频里看起来更宽的准星，不一定靠拉伸分辨率做出来。先确定你要改的是准星还是整张画面。',
      summary: '只想让横线更长，直接分别调横竖长度，或者复制宽准星代码即可。准星代码不包含分辨率，也不会把敌人模型或命中范围变宽。',
      sections: [
        ['先选你真正想要的效果', '只想拉长左右两根线，就改准星造型；如果整张录像都变宽了，要另外看显示和视频缩放。不能根据一张创作者截图反推出他的完整游戏设置。'],
        ['不改分辨率也能做宽准星', '在游戏准星设置中，断开内线横竖长度之间的链条图标，增大横向长度并保留较短竖线。可以从横长 6、竖长 2、粗细 1 或 2 开始比较，这只是试手感的起点，不是竞技标准答案。'],
        ['按平时玩的尺寸比较', '保持常用分辨率和显示模式，拿宽十字与普通加号对比远处头部、门边。如果横线遮住目标边缘，就缩短一点。网页放大图适合检查结构，最终可见度要回游戏里判断。'],
        ['代码不负责画面拉伸', '代码只携带准星设置，不携带桌面缩放或录屏参数。纯中心点没有可分别拉长的内线手臂；只有打开内线时，修改线长才有意义。可以先用解析器看清配置，不用为了模仿一种造型安装第三方显示补丁。'],
      ], faq: [['宽准星一定要拉伸分辨率吗？', '不需要。横竖线长分开调，就能在原来的分辨率下做宽造型。'], ['拉伸准星代码能让敌人更宽吗？', '不能。准星设置不改变敌人模型或命中范围。']],
      metaDescription: '分清无畏契约宽准星代码和拉伸分辨率：单独调整横竖线长，对比普通十字，不改显示设置也能尝试横向造型。',
    },
    invisible: {
      title: '无畏契约准星看不见怎么办？', intro: '代码导入失败和导入成功却看不见，是两种问题。先分清再改，别把旧配置全删了。',
      summary: '已导入却看不见时，先确认至少一个中心点或线组处于开启状态，而且透明度、大小可见。再查背景对比度，以及当前是在腰射、开镜还是狙击镜状态。',
      sections: [
        ['先确认是不是导入成功', '游戏直接拒绝代码时，去看代码无法使用的排查页。已经接受配置时，主动选中它，再用备用位置试一个普通圆点。不要为了排查一个配置删除其他顺手的准星。'],
        ['至少留一个能画出来的元素', '中心点、内线、外线全关就没有可见参照。开着也可能因为透明度为零、线长为零或尺寸太小而看不到。先开启一个简单元素，调到明显可见，再逐步恢复其他部分。'],
        ['区分消失和融进背景', '暗墙上有、亮墙上没有，往往更像对比度不足。保持造型不变，试青色或洋红色、细轮廓，或者稍微加粗。别为了追求最小圆点，让自己每次拉枪都找不到中心。'],
        ['只在开镜时不见，要查对应设置', '主准星、瞄准射击和狙击镜是不同情境。记录问题是否只在某把武器开镜时出现，再检查那一栏，不要把正常的主准星也改掉。简单可见配置仍然异常时，保留武器、模式和截图给客服；网页预览不能诊断所有武器状态。'],
      ], faq: [['网页里有，游戏里为什么没有？', '可能选错配置、瞄准状态不同，或透明度、背景与缩放不一致。先用正确配置里的一个明显元素确认。'], ['要先重置全部吗？', '不用。先保存代码、在备用配置测试，只重置能恢复的设置。']],
      metaDescription: '无畏契约准星导入后看不见？按开启状态、透明度、大小、背景对比和开镜配置排查。先保存旧代码，不用一上来全部重置。',
    },
  },
  es: {
    yellowEnemies: {
      title: 'Color de mira de VALORANT para enemigos amarillos', intro: 'Si pierdes el centro al apuntar al rival, prueba la combinación de colores antes de agrandar la mira.',
      summary: 'Compara cian y magenta con los contornos amarillos; deja blanco con borde oscuro como alternativa. Son candidatos para probar, no un color ganador para todos.',
      sections: [
        ['Dos colores, dos ajustes', 'El color de mira y el resaltado del enemigo son independientes. Importar un código no cambia el contorno del rival. Amarillo sobre amarillo puede verse bien en la pared y confundirse justo al apuntar a la cabeza.'],
        ['Tres combinaciones con la misma forma', 'Prueba cian #00FFFF, magenta #FF00FF y blanco #FFFFFF con contorno oscuro fino. Los dos primeros se diferencian del amarillo por el tono; el blanco depende más del borde. Es una sugerencia de AimCodes, no una clasificación de Riot ni una garantía para todas las necesidades visuales.'],
        ['Comprueba el objetivo dentro del juego', 'Mantén arma, tamaño y resaltado fijos. Mira una pared clara, una esquina oscura y el borde de una cabeza. Aparta la vista y busca el centro otra vez. La vista previa del sitio compara fondos, pero no reproduce tus contornos de enemigos ni tu pantalla.'],
        ['Guarda una alternativa', 'Si ninguna opción se ve bien, sube un punto el grosor o añade contorno antes de ampliar todo. Guarda el perfil anterior. El color personalizado acepta seis dígitos RGB; confirma el perfil activo después de importar.'],
      ], faq: [['¿Cian siempre es mejor?', 'No. Depende del mapa, la pantalla y tu visión. Compara sin cambiar el resto.'], ['¿El código cambia el contorno enemigo?', 'No. Solo cambia la mira.']],
      metaDescription: 'Compara cian, magenta y blanco con borde para enemigos amarillos en VALORANT. Prueba visibilidad en paredes y cabezas antes de elegir el color.',
    },
    offCenter: {
      title: '¿Tu mira de VALORANT parece descentrada?', intro: 'Distingue entre forma, captura y escalado antes de cambiar una configuración que te funciona.',
      summary: 'El offset separa las líneas del centro: no mueve toda la mira a izquierda o derecha. Compara un punto simple y una cruz equilibrada con tus ajustes normales.',
      sections: [
        ['Revisa una captura original', 'Usa una captura propia sin recortar, no un vídeo social ni una miniatura ampliada. Bordes y escalado pueden cambiar el centro aparente. Identifica primero el área real de juego.'],
        ['Aísla el diseño', 'Guarda el código y prueba un punto o una cruz de brazos iguales en otro perfil. Desactiva las líneas exteriores. Si solo la forma decorada parece torcida, revisa longitud, grosor y contorno antes de tocar la resolución.'],
        ['No uses el offset para desplazarla', 'El offset abre el hueco alrededor del centro; no cambia su posición en pantalla. Longitudes horizontales y verticales distintas pueden parecer desequilibradas. Iguala los brazos y añade las capas otra vez, una por una.'],
        ['Comprueba el escalado', 'Vuelve a los ajustes nativos habituales y mira la captura al 100%. Las formas diminutas pueden verse distintas al redimensionar. Si falla también con un punto simple, documenta resolución, modo y captura para soporte. Evita overlays o cambios de registro sin verificar.'],
      ], faq: [['¿El offset mueve toda la mira?', 'No, cambia el espacio respecto al centro.'], ['¿Una mira que parece torcida desvía las balas?', 'No se puede concluir eso. Equilibrio visual, dispersión y retroceso son problemas distintos.']],
      metaDescription: 'Comprueba una mira de VALORANT que parece descentrada con un punto simple, líneas equilibradas y una captura original. Entiende qué cambia el offset.',
    },
    stretched: {
      title: 'Mira estirada de VALORANT: código o resolución', intro: 'Una cruz ancha y una pantalla estirada pueden parecer iguales en un clip, pero no son el mismo ajuste.',
      summary: 'Para ensanchar solo la mira, ajusta las longitudes horizontal y vertical por separado. El código no cambia la resolución ni el tamaño de los enemigos.',
      sections: [
        ['Elige qué quieres ensanchar', 'Para brazos laterales largos cambia la geometría. Si toda la grabación está estirada, revisa el escalado de pantalla y vídeo por separado. Una captura no revela todos los ajustes del creador.'],
        ['Hazlo con la longitud de líneas', 'Desactiva la cadena entre las longitudes interiores. Prueba horizontal 6 y vertical 2, con grosor 1 o 2 como experimento inicial, no como configuración obligatoria para ranked. Mantén una referencia vertical corta.'],
        ['Compara a tamaño normal', 'Conserva tu resolución habitual y compara con una cruz equilibrada sobre una cabeza lejana y el borde de una puerta. Acorta los brazos si tapan el objetivo. La ampliación web sirve para ver estructura, no para decidir visibilidad final.'],
        ['Lo que no guarda el código', 'No guarda escalado del escritorio ni de la grabación. Un punto central puro no tiene brazos que puedas estirar: la longitud afecta a líneas activadas. Inspecciona el perfil con el decodificador y evita parches de pantalla para copiar un diseño.'],
      ], faq: [['¿Hace falta resolución estirada?', 'No. Las longitudes independientes bastan para una cruz ancha.'], ['¿El código ensancha los enemigos?', 'No modifica modelos ni hitboxes.']],
      metaDescription: 'Crea una mira ancha de VALORANT sin cambiar resolución. Distingue el código del escalado de pantalla y ajusta longitudes horizontales y verticales.',
    },
    invisible: {
      title: 'No se ve la mira de VALORANT: qué revisar', intro: 'Un código rechazado y una mira importada pero invisible necesitan soluciones distintas.',
      summary: 'Si se importó bien, activa al menos un punto o grupo de líneas con opacidad y tamaño visibles. Después revisa contraste y el perfil de apuntado correcto.',
      sections: [
        ['Confirma la importación', 'Si el juego rechaza el código, ve a la guía de códigos que no funcionan. Si lo acepta, selecciona el perfil y prueba un punto simple en otro espacio. No borres tus demás perfiles.'],
        ['Deja un elemento visible', 'Con punto, líneas interiores y exteriores desactivados no queda referencia. Opacidad cero, longitud cero o tamaño demasiado pequeño también pueden ocultarla. Activa un elemento legible y reconstruye el diseño desde ahí.'],
        ['Comprueba el fondo', 'Si aparece en paredes oscuras pero no claras, prueba contraste antes de reiniciar. Cambia a cian o magenta, añade un borde fino o algo de grosor sin cambiar todo a la vez. El punto más pequeño no siempre se ve mejor.'],
        ['Identifica cuándo ocurre', 'Principal, apuntado con mira y visor de francotirador son contextos distintos. Si solo ocurre al apuntar con un arma, revisa esa sección. Si persiste con un perfil sencillo, guarda arma, modo y captura para soporte; la vista previa web no reproduce todos los estados.'],
      ], faq: [['¿Por qué se ve en la web y no en el juego?', 'Puede cambiar el perfil activo, el estado de apuntado, el fondo o la opacidad.'], ['¿Restablezco todo?', 'Primero guarda el código y prueba un perfil de reserva.']],
      metaDescription: 'Si no ves la mira de VALORANT, revisa elementos activados, opacidad, tamaño, contraste y perfiles de apuntado. Guarda tu código antes de restablecer.',
    },
  },
  'pt-BR': {
    yellowEnemies: {
      title: 'Cor de mira do VALORANT para inimigos amarelos', intro: 'A mira some justo em cima do inimigo? Teste as cores antes de aumentar o desenho inteiro.',
      summary: 'Compare ciano e magenta com contornos amarelos; deixe branco com borda escura fina como reserva. São opções para testar, não uma cor perfeita para todo mundo.',
      sections: [
        ['Separe os dois ajustes', 'A cor da mira e o destaque do inimigo são independentes. Importar um código não muda o contorno do rival. Amarelo sobre amarelo pode ficar claro na parede e confuso na borda da cabeça.'],
        ['Três cores, a mesma mira', 'Teste ciano #00FFFF, magenta #FF00FF e branco #FFFFFF com contorno escuro fino. Os dois primeiros contrastam com o tom amarelo; o branco depende mais da borda. É uma sugestão do AimCodes, não um ranking da Riot nem garantia para toda necessidade visual.'],
        ['Compare dentro do jogo', 'Mantenha arma, tamanho e destaque do inimigo. Confira parede clara, canto escuro e borda da cabeça. Olhe para outro lugar e encontre o centro de novo. A prévia do site compara cenários, mas não reproduz os destaques do seu jogo ou sua tela.'],
        ['Guarde uma alternativa', 'Se todas somem, aumente uma unidade de espessura ou use contorno antes de ampliar tudo. Salve o perfil antigo. A cor personalizada usa seis dígitos RGB; confira o perfil selecionado depois de importar.'],
      ], faq: [['Ciano é sempre melhor?', 'Não. Mapa, tela e visão mudam o resultado. Compare mantendo o resto igual.'], ['O código muda o contorno inimigo?', 'Não, ele controla apenas a mira.']],
      metaDescription: 'Compare ciano, magenta e branco com borda para inimigos amarelos no VALORANT. Teste paredes e cabeças antes de escolher a cor da mira.',
    },
    offCenter: {
      title: 'Sua mira do VALORANT parece fora do centro?', intro: 'Confira desenho, captura e escala antes de mexer em uma configuração que já funciona para você.',
      summary: 'O offset afasta as linhas do centro; não desloca a mira inteira para os lados. Compare um ponto simples e uma cruz equilibrada na sua tela normal.',
      sections: [
        ['Use uma captura sem cortes', 'Não julgue pelo vídeo de uma rede social ou por uma miniatura ampliada. Bordas, recortes e escala alteram o centro aparente. Identifique primeiro a área real do jogo.'],
        ['Isole o formato', 'Salve o código e teste um ponto ou cruz com braços iguais num perfil reserva. Desligue as linhas externas. Se só o desenho decorado parece torto, confira comprimento, espessura e contorno antes da resolução.'],
        ['Offset não desloca a mira toda', 'Ele abre o espaço em volta do centro. Braços horizontais e verticais diferentes podem parecer desequilibrados sem mudar a origem da mira. Iguale os comprimentos e recoloque as camadas uma por vez.'],
        ['Confira a escala', 'Volte aos ajustes nativos habituais e veja a captura em 100%. Formas minúsculas podem mudar visualmente ao redimensionar. Se até um ponto simples parece errado, registre resolução, modo e captura para o suporte. Evite overlays ou ajustes de registro não verificados.'],
      ], faq: [['Offset move a mira inteira?', 'Não, só muda o espaço em relação ao centro.'], ['Se parece torta, o tiro também sai torto?', 'Isso não basta para concluir. Equilíbrio visual, dispersão e recuo são coisas diferentes.']],
      metaDescription: 'Confira uma mira do VALORANT que parece fora do centro com ponto simples, linhas equilibradas e captura original. Entenda por que offset não desloca tudo.',
    },
    stretched: {
      title: 'Mira esticada no VALORANT: código ou resolução?', intro: 'Uma cruz larga e uma tela esticada podem parecer iguais num vídeo, mas vêm de ajustes diferentes.',
      summary: 'Para alargar só a mira, ajuste os comprimentos horizontal e vertical separadamente. O código não muda resolução, modelos dos inimigos ou hitboxes.',
      sections: [
        ['Escolha o efeito que procura', 'Para braços laterais maiores, altere o desenho. Se a gravação inteira está esticada, confira escala da tela e do vídeo separadamente. Uma imagem não revela toda a configuração do criador.'],
        ['Alargue pelas linhas', 'Desligue a corrente entre os comprimentos internos. Teste horizontal 6 e vertical 2 com espessura 1 ou 2 como ponto de partida, não como padrão obrigatório de ranked. Preserve uma referência vertical curta.'],
        ['Compare no tamanho real', 'Mantenha a resolução normal e compare com uma cruz equilibrada numa cabeça distante e na borda de uma porta. Encurte os braços se esconderem o alvo. A ampliação do site mostra a estrutura, não a visibilidade final no jogo.'],
        ['O código não inclui a tela', 'Ele não carrega escala do sistema nem da gravação. Um ponto central puro não tem braços para esticar: comprimento só afeta linhas ligadas. Inspecione o perfil no decodificador e evite patches de tela para imitar um desenho.'],
      ], faq: [['Preciso de resolução esticada?', 'Não. Comprimentos independentes já criam uma cruz larga.'], ['O código deixa o inimigo mais largo?', 'Não muda modelos nem hitboxes.']],
      metaDescription: 'Faça uma mira larga no VALORANT sem mudar a resolução. Separe código de mira e escala da tela e compare comprimentos horizontais e verticais.',
    },
    invisible: {
      title: 'Mira do VALORANT invisível: o que conferir', intro: 'Código rejeitado e perfil importado que não aparece são problemas diferentes.',
      summary: 'Se o código entrou, confira se pelo menos um ponto ou grupo de linhas está ligado, com opacidade e tamanho visíveis. Depois confira contraste e modo de mira.',
      sections: [
        ['Veja se importou mesmo', 'Se o jogo recusou o código, use o guia de código que não funciona. Se aceitou, selecione o perfil e teste um ponto simples num espaço reserva. Não apague os outros perfis.'],
        ['Mantenha algo que possa aparecer', 'Ponto, linhas internas e externas desligados deixam a mira vazia. Opacidade zero, comprimento zero ou tamanho minúsculo também escondem o desenho. Ligue um elemento legível antes de reconstruir as camadas.'],
        ['Separe falta de contraste de desaparecimento', 'Se aparece na parede escura e some na clara, teste ciano, magenta, contorno fino ou um pouco de espessura. Não mude tudo junto. O menor ponto nem sempre é o mais fácil de acompanhar.'],
        ['Observe o estado da arma', 'Principal, mira aberta ao apontar e luneta de sniper são contextos separados. Se falha só ao mirar com uma arma, confira a seção correspondente. Se persiste com um perfil simples, registre arma, modo e captura para suporte; a prévia web não simula todos os estados.'],
      ], faq: [['Por que aparece no site e não no jogo?', 'O perfil ativo, estado de mira, fundo, escala ou opacidade podem ser diferentes.'], ['Devo redefinir tudo?', 'Salve o código e teste um perfil reserva antes.']],
      metaDescription: 'Mira invisível no VALORANT? Confira elementos ligados, opacidade, tamanho, contraste e perfis de mira. Salve o código antigo antes de redefinir.',
    },
  },
  ja: {
    yellowEnemies: {
      title: 'VALORANT 黄色の敵ハイライトに合うクロスヘアの色', intro: '敵に重なった瞬間に照準を見失うなら、サイズを変える前に色の組み合わせを試しましょう。',
      summary: '同じ形でシアンとマゼンタを比較し、細い黒縁付きの白を予備に。全員に最適な色ではなく、自分のゲーム画面で比べるための候補です。',
      sections: [
        ['照準と敵ハイライトは別設定', 'クロスヘアコードを読み込んでも敵のハイライト色は変わりません。黄色同士だと壁では見えても、敵の頭の端で中心を見失うことがあります。'],
        ['同じ形で3色を試す', 'シアン #00FFFF、マゼンタ #FF00FF、細い暗い輪郭を付けた白 #FFFFFF の順に比較。前の2色は黄色との色相差、白は輪郭に頼る部分が大きくなります。AimCodesの比較案であり、Riot公式の順位や色覚への保証ではありません。'],
        ['ゲーム内で短く比較する', '武器、照準サイズ、敵ハイライトを固定し、明るい壁、暗い角、敵の頭の輪郭を確認。一度視線を外し、中心をすぐ見つけ直せる色を選びます。サイトのマップは背景の比較用で、実際の敵ハイライトや画面の見え方は再現しません。'],
        ['見えないときだけ太さも調整', '元のコードを保存し、全体を大きくする前に太さを1段階上げるか細い輪郭を追加。カスタムカラーには6桁のRGB値を使います。インポート後は選択中のプロファイルも確認してください。'],
      ], faq: [['黄色の敵には必ずシアンが最適？', 'いいえ。マップ、モニター、見え方によって変わります。他の設定を固定して比べましょう。'], ['コードで敵の色も変わる？', '変わりません。コードはクロスヘアの設定です。']],
      metaDescription: '黄色の敵ハイライトに合うVALORANTクロスヘアの色を比較。シアン、マゼンタ、黒縁付き白を明るい壁・暗い角・頭の輪郭で試します。',
    },
    offCenter: {
      title: 'VALORANT クロスヘアが中心からずれて見えるとき', intro: '使い慣れた設定を変える前に、形、画像の切り抜き、表示倍率を切り分けましょう。',
      summary: 'オフセットは中心から線までの隙間で、照準全体を左右に動かす設定ではありません。通常の表示設定でドットと縦横同じ長さの十字を比較します。',
      sections: [
        ['切り抜いていない画像で確認', 'SNS動画や拡大されたサムネイルではなく、自分のゲームの元画像を使います。黒帯、切り抜き、拡大縮小は見かけの中心を変えるので、まず実際のゲーム表示領域を確認。'],
        ['形だけを切り分ける', 'コードを保存し、別プロファイルで単純なドットや均等な十字を試します。アウターラインは一度オフ。装飾付きだけが偏って見えるなら、解像度より先に長さ、太さ、輪郭を確認。'],
        ['オフセットで全体の位置は変わらない', '値を増やすと中心の隙間が広がります。縦横の長さが違うと重心が違って見えても、照準の原点が移動したとは限りません。長さをそろえてから装飾を一層ずつ戻しましょう。'],
        ['表示倍率を確認して記録', '普段のネイティブ表示に戻し、元画像を100%で比較。小さな形は拡大縮小で見え方が変わります。単純なドットでも続くなら解像度、表示モード、未加工画像をサポート用に記録。未確認のオーバーレイやレジストリ変更は避けます。'],
      ], faq: [['オフセットで照準を左に動かせる？', 'できません。中心からの線の間隔を変える設定です。'], ['ずれて見えると弾もずれる？', 'それだけでは判断できません。形の重心、弾の拡散、反動は別の問題です。']],
      metaDescription: 'VALORANTクロスヘアが中心からずれて見える原因を、元画像・単純なドット・縦横ライン・表示倍率で切り分け。オフセットの役割も説明。',
    },
    stretched: {
      title: 'VALORANT 横長クロスヘアと引き伸ばし解像度の違い', intro: '動画で横長に見える照準が、画面全体の引き伸ばしで作られているとは限りません。',
      summary: '照準だけを横長にするなら縦横のライン長を別々に調整。クロスヘアコードに解像度は含まれず、敵モデルや当たり判定の幅も変わりません。',
      sections: [
        ['変えたいものを決める', '左右の線だけを長くしたいなら形の設定です。動画全体が伸びているなら、画面や録画の拡大縮小を別に確認。一枚の画像から配信者の全設定は分かりません。'],
        ['ライン長で横長を作る', 'ゲームのインナーライン長にある鎖を解除し、横を長く縦を短くします。横6、縦2、太さ1か2から比較できますが、競技用の決まりではなく試すための出発点です。'],
        ['普段のサイズで試す', '解像度と表示モードを維持し、通常の十字と遠い頭や入口の端で比較。横線が敵を隠すなら短くします。サイトの拡大画像は構造を見るためのもので、最終的な視認性はゲームで確認。'],
        ['コードに含まれないもの', 'デスクトップや録画の倍率はコードに入りません。中心ドットだけなら伸ばす腕がないため、ライン長の変更はラインを有効にした場合に意味があります。デコーダーで設定を確認し、模倣のためだけに外部の表示改変ツールを入れないでください。'],
      ], faq: [['引き伸ばし解像度が必要？', '不要です。縦横の長さを分ければ通常の解像度で横長にできます。'], ['コードで敵が横に広がる？', 'いいえ。敵モデルや当たり判定は変わりません。']],
      metaDescription: 'VALORANTの横長クロスヘアと引き伸ばし画面を区別。解像度を変えずに縦横ラインを調整し、通常の十字と比較する手順を紹介。',
    },
    invisible: {
      title: 'VALORANT クロスヘアが見えないときの確認手順', intro: 'コードが拒否される問題と、読み込めたのに見えない問題は分けて調べましょう。',
      summary: '読み込み済みなら、ドットかラインを少なくとも一つ有効にして、不透明度とサイズを確認。その後で背景とのコントラストと照準モードを調べます。',
      sections: [
        ['インポートできたかを確認', 'コードが拒否された場合はコードのトラブルガイドへ。受け付けられたら対象プロファイルを選び、予備スロットで単純なドットを試します。他の設定を消す必要はありません。'],
        ['描画できる要素を残す', 'ドット、インナー、アウターが全部オフだと目印がありません。有効でも不透明度ゼロ、長さゼロ、極端に小さいサイズでは見失います。一つをはっきり見える状態にしてから組み直します。'],
        ['背景に埋もれていないか', '暗い壁では見えて明るい壁では消えるなら、まず色をシアンやマゼンタに変更。細い輪郭や少しの太さも試せます。一度に全部変えず、最小ドットにこだわりすぎないこと。'],
        ['どの照準モードで起きるか', 'プライマリ、ADS、スナイパースコープは別の状況です。特定の武器で覗いたときだけなら、その設定欄を確認。単純な形でも続く場合は武器、モード、画像を記録してサポートへ。サイトのプレビューはすべての武器状態を再現しません。'],
      ], faq: [['サイトでは見えるのにゲームでは見えない？', '選択プロファイル、照準モード、背景、倍率、不透明度が違う可能性があります。'], ['全部リセットするべき？', 'まずコードを保存し、予備プロファイルで試してください。']],
      metaDescription: 'VALORANTクロスヘアが見えないときは、有効な要素・不透明度・サイズ・背景・照準モードを確認。元のコードを保存してから切り分けます。',
    },
  },
}

const related = {
  yellowEnemies: { recommendedCrosshairIds: ['tenz', 'forsaken', 'needle-cyan', 'jinggg'], relatedArticleKeys: ['colors', 'customColor', 'invisible'], relatedCollectionKeys: ['cyan', 'pink', 'white'], relatedToolKeys: ['comparison', 'preview'] },
  offCenter: { recommendedCrosshairIds: ['tenz', 'scream-dot', 'small-dot-thick', 'demon1'], relatedArticleKeys: ['gapOffset', 'thickness', 'stretched'], relatedCollectionKeys: ['dot', 'plus'], relatedToolKeys: ['decoder', 'comparison'] },
  stretched: { recommendedCrosshairIds: ['tenz', 'needle-cyan', 'wide-axis-apex', 'wide-axis-bolt'], relatedArticleKeys: ['innerVsOuter', 'offCenter'], relatedCollectionKeys: ['horizontal', 'plus'], relatedToolKeys: ['generator', 'decoder'] },
  invisible: { recommendedCrosshairIds: ['tenz', 'forsaken', 'small-dot-thick', 'jinggg'], relatedArticleKeys: ['notWorking', 'yellowEnemies', 'resetCrosshair'], relatedCollectionKeys: ['withOutlines', 'static'], relatedToolKeys: ['decoder', 'preview'] },
}
const labels = {
  en: ['GET BACK TO A CLEAR SIGHT', 'Quick answer', 'Compare a simple reference'],
  es: ['RECUPERA UNA MIRA CLARA', 'Respuesta rápida', 'Compara una referencia sencilla'],
  'pt-BR': ['VOLTE A ENXERGAR A MIRA', 'Resposta rápida', 'Compare uma referência simples'],
  'zh-CN': ['先看清，再调顺手', '先说结论', '用简单准星对照一下'],
  ja: ['見やすい照準に戻そう', '先に答え', '単純な目印と比較'],
}
export const searchIntentArticleKeys = Object.freeze(Object.keys(related))
export function searchIntentArticleCopy(locale, key) {
  const item = content[locale]?.[key]
  if (!item) return null
  const [eyebrow, summaryTitle, cta] = labels[locale]
  return { ...item, ...related[key], eyebrow, summaryTitle, cta,
    metaTitle: `${item.title} | AimCodes`,
    sections: item.sections.map(([title, paragraph]) => ({ title, paragraphs: [paragraph], bullets: [] })),
    // Source supports independent line lengths, custom colors and aiming contexts,
    // not our color suggestions or diagnostic conclusions.
    sources: [{ label: 'Riot Games — VALORANT 5.04', url: 'https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-5-04/' }],
  }
}
