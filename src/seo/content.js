import { localeRoutes } from '../i18n/localeRoutes.js'
import { crosshairSlug, routePath } from './routes.js'
import { articleCopy } from './articles.js'

export const SITE_ORIGIN = 'https://aimcodes.com'
export const OG_IMAGE_PATH = '/og-aimcodes.png'
export const SEO_CONTENT_UPDATED_AT = '2026-08-08'

const copy = {
  en: {
    home: {
      eyebrow: 'VALORANT CROSSHAIR LAB',
      title: 'VALORANT crosshair codes you can try before you copy',
      intro: 'Preview working crosshair codes on real map scenes, change the color, and copy the one that feels right.',
      primary: 'Browse all crosshairs',
      secondary: 'Take the reaction test',
      popular: 'Popular crosshair codes',
      popularBody: 'Start with pro-style essentials and a couple of playful picks.',
    },
    catalog: {
      eyebrow: '60+ WORKING CODES',
      title: 'Browse VALORANT crosshair codes',
      intro: 'Search by player or style, preview every shape, and copy a code straight into VALORANT.',
    },
    topics: { title: 'Start with a collection' },
    collections: {
      best: {
        label: 'Best crosshairs', eyebrow: 'CURATED STARTING POINTS', title: 'Best VALORANT crosshairs to try first', intro: 'Eight reliable shapes for ranked, first-shot precision, and fast target switching—each ready to preview and copy.', gridTitle: '8 crosshairs worth testing',
        body: ['There is no single crosshair that fits every player. The best starting point is a clean shape that stays visible without covering the head.', 'This shortlist mixes open-center classics, compact dots, and tight pro layouts. Preview each one on the same map, then keep the shape that your eyes find fastest.'],
        faq: [['What makes a VALORANT crosshair good?', 'A useful crosshair stays visible, marks the center clearly, and does not hide the target. Size and gap should match how you aim.'], ['Should beginners use a dot or a cross?', 'A small cross with an open center is usually easier to track. A dot can feel more precise, but it is also easier to lose during movement.'], ['What color should I use?', 'Cyan and green are popular because they stand out on many maps. AimCodes lets you test six colors before copying the final code.']],
        metaTitle: 'Best VALORANT Crosshair Codes to Try | AimCodes', metaDescription: 'Try 8 of the best VALORANT crosshair codes on real map scenes. Compare pro layouts, dots, and compact shapes, change color, and copy a working code.',
      },
      pro: {
        label: 'Pro crosshairs', eyebrow: 'PRO PLAYER CODES', title: 'VALORANT pro player crosshair codes', intro: 'Preview crosshairs inspired by TenZ, aspas, f0rsakeN, Demon1, ScreaM, Less, Boaster, cNed, and Jinggg.', gridTitle: 'Pro crosshairs in this collection',
        body: ['Pro players often switch settings, so a player name is a strong starting point rather than a permanent rule. The useful part is the shape: gap, line length, dot size, and visibility.', 'Open every code on the same map scene, compare how quickly you reacquire the center, and copy the version that fits your own screen.'],
        faq: [['Do pro players always use the same crosshair?', 'No. Pros can change crosshairs between patches, maps, or even matches. Treat each code as a tested starting point.'], ['Which pro crosshair is easiest to start with?', 'TenZ and Jinggg use compact line-based shapes that are easier to track than a very small dot for many players.'], ['Can I change a pro crosshair color?', 'Yes. Changing the color keeps the original shape, and AimCodes updates the copied profile code to match your choice.']],
        metaTitle: 'VALORANT Pro Player Crosshair Codes | AimCodes', metaDescription: 'Preview and copy VALORANT pro player crosshair codes for TenZ, aspas, Demon1, f0rsakeN, ScreaM, Less, Boaster, cNed, and Jinggg.',
      },
      dot: {
        label: 'Dot crosshairs', eyebrow: 'SMALL CENTER, CLEAN SCREEN', title: 'VALORANT dot crosshair codes', intro: 'Five compact dot and micro-cross options for players who want a precise center with minimal screen clutter.', gridTitle: 'Dot crosshairs to compare',
        body: ['Dot crosshairs keep the target visible and make the exact center obvious. They work well for calm first shots and head-level placement.', 'The tradeoff is visibility: the smaller the dot, the easier it is to lose in utility or bright scenery. Test the same shape in cyan, green, yellow, and red before deciding.'],
        faq: [['Is a dot crosshair good in VALORANT?', 'It can be excellent for precise taps and disciplined placement. Players who spray often may prefer short lines around the center.'], ['What dot size should I use?', 'Start small but clearly visible at your resolution. If you lose it during movement, use a thicker dot or add short inner lines.'], ['Can a dot crosshair have an outline?', 'Yes. An outline improves contrast on bright backgrounds, although a heavy outline can make the dot look larger.']],
        metaTitle: 'VALORANT Dot Crosshair Codes & Preview | AimCodes', metaDescription: 'Compare 5 working VALORANT dot crosshair codes on real map scenes. Test compact dots and micro crosses, change color, and copy the final code.',
      },
      cute: {
        label: 'Cute crosshairs', eyebrow: 'CUTE, BUT STILL AIMABLE', title: 'Cute VALORANT crosshair codes', intro: 'Cat, pig, heart, flower, and bunny crosshairs that are playful on screen and still keep a clear aiming center.', gridTitle: 'Cute crosshairs in this collection',
        body: ['Cute crosshairs are built from the same valid profile settings as competitive layouts. The difference is how the lines and dots combine into a recognizable shape.', 'They are larger than most pro crosshairs, so preview them before queueing. Use them for clips, casual matches, or whenever a tiny flower is better for your mental.'],
        faq: [['Do cute VALORANT crosshair codes work in game?', 'Yes. Every code in this collection is parsed and validated by AimCodes before it is published.'], ['Which cute crosshair is the smallest?', 'The heart and flower options are more compact than the cat and pig faces. Preview them on a map to compare the real screen space.'], ['Can I recolor a cat or heart crosshair?', 'Yes. Pick a preset color and the copied code will keep the shape while using the new color.']],
        metaTitle: 'Cute VALORANT Crosshair Codes: Cat, Heart & More | AimCodes', metaDescription: 'Try working cute VALORANT crosshair codes including cat, pig, heart, flower, and bunny shapes. Preview, recolor, and copy each code.',
      },
      small: {
        label: 'Small crosshairs', eyebrow: 'LESS SCREEN, CLEAR CENTER', title: 'Small VALORANT crosshair codes', intro: 'Six compact dots and short-line crosshairs for players who want a precise center without covering distant targets.', gridTitle: 'Small crosshairs to compare',
        body: ['A small crosshair leaves more of the target visible and makes head-level placement easier to judge. The best version is still large enough for your eyes to recover after a fast turn.', 'This collection mixes micro dots, open centers, and tight line-based shapes. Compare them on the same scene before deciding whether you need a thicker point, a wider gap, or stronger color contrast.'],
        faq: [['Is a small crosshair better in VALORANT?', 'It can improve target visibility and precise placement, but only if you can still find it quickly during movement and utility.'], ['What is the difference between a small crosshair and a dot?', 'A dot uses one central mark. A small crosshair can use short lines around an open or closed center, giving your eyes more shape to track.'], ['How do I make a small crosshair easier to see?', 'Try cyan or green, add a thin outline, or increase thickness by one step before making the whole shape larger.']],
        metaTitle: 'Small VALORANT Crosshair Codes & Live Preview | AimCodes', metaDescription: 'Try 6 small VALORANT crosshair codes on real map scenes. Compare micro dots, compact pro layouts and short crosses, recolor them, and copy a working code.',
      },
    },
    detail: {
      code: 'Crosshair code', copy: 'Copy code', bestFor: 'Best for', tradeoff: 'What to expect', settings: 'Key settings', import: 'Import in VALORANT', related: 'Try another crosshair', verified: 'Code checked',
      importSteps: ['Open Settings in VALORANT.', 'Choose Crosshair, then Import Profile Code.', 'Paste the code and save the new profile.'],
      defaultBest: 'Players who want a clear, repeatable reference point without covering the target.',
      defaultTradeoff: 'Test it on your usual resolution and map brightness before taking it into ranked.',
    },
    guide: {
      eyebrow: '60-SECOND SETUP',
      title: 'How to import, copy, and share crosshair codes in VALORANT',
      intro: 'Add a code in three steps, export your own setup, copy a player while spectating, and fix the most common import problems.',
      steps: [
        ['Copy a code', 'Open a crosshair page on AimCodes and press Copy code.'],
        ['Open Crosshair settings', 'In VALORANT, open Settings → Crosshair and choose Import Profile Code.'],
        ['Paste and test', 'Paste the code, name the profile, and try it in the practice range before queueing.'],
      ],
      cta: 'Browse crosshair codes',
    },
    footer: { browse: 'Crosshair codes', finder: 'Reaction test', guide: 'Import guide', best: 'Best crosshairs', pro: 'Pro crosshairs', cute: 'Cute crosshairs', dot: 'Dot crosshairs', small: 'Small crosshairs', settings: 'Crosshair settings', colors: 'Crosshair colors', note: 'Built for faster crosshair testing.', social: 'Follow AimCodes' },
    notFound: { title: 'That crosshair missed', body: 'This page does not exist. Head back to the crosshair catalog and pick another one.', action: 'Browse crosshairs' },
    meta: {
      homeTitle: 'VALORANT Crosshair Codes & Live Preview | AimCodes',
      homeDescription: 'Preview working VALORANT crosshair codes on real maps, change colors, copy codes, and use a reaction test to find your next crosshair.',
      catalogTitle: 'VALORANT Crosshair Codes: Pro, Dot & Fun Picks | AimCodes',
      catalogDescription: 'Browse 60+ working VALORANT crosshair codes. Preview pro, dot, small, cute, and fun crosshairs, then copy any code in one click.',
      finderTitle: 'VALORANT Reaction Time Test & Crosshair Picker | AimCodes',
      finderDescription: 'Test your reaction time in three rounds, get a playful VALORANT rank, and receive one crosshair recommendation you can preview and copy.',
      guideTitle: 'How to Import a Crosshair Code in VALORANT | AimCodes',
      guideDescription: 'Learn how to import, export, share, and troubleshoot VALORANT crosshair profile codes, including spectator copy commands and common fixes.',
    },
  },
  es: {
    home: {
      eyebrow: 'LABORATORIO DE MIRAS DE VALORANT',
      title: 'Códigos de mira de VALORANT para probar antes de copiar',
      intro: 'Prueba códigos que funcionan sobre mapas reales, cambia el color y copia la mira que más te guste.',
      primary: 'Ver todas las miras', secondary: 'Hacer la prueba de reacción', popular: 'Miras populares', popularBody: 'Empieza por miras de estilo profesional y algunas opciones divertidas.',
    },
    catalog: { eyebrow: 'MÁS DE 60 CÓDIGOS', title: 'Explora códigos de mira de VALORANT', intro: 'Busca por jugador o estilo, prueba cada forma y copia el código directamente en VALORANT.' },
    topics: { title: 'Empieza por una colección' },
    collections: {
      best: {
        label: 'Mejores miras', eyebrow: 'UNA SELECCIÓN PARA EMPEZAR', title: 'Las mejores miras de VALORANT para probar primero', intro: 'Ocho formas fiables para competitivo, precisión en la primera bala y cambios rápidos de objetivo, listas para probar y copiar.', gridTitle: '8 miras que merece la pena probar',
        body: ['No existe una única mira perfecta para todos. El mejor punto de partida es una forma limpia que se vea bien sin tapar la cabeza.', 'Esta selección mezcla centros abiertos, puntos compactos y configuraciones de pros. Pruébalas en el mismo mapa y quédate con la que tus ojos encuentren más rápido.'],
        faq: [['¿Qué hace que una mira de VALORANT sea buena?', 'Debe verse con claridad, marcar bien el centro y no ocultar al rival. El tamaño y el hueco dependen de tu forma de apuntar.'], ['¿Es mejor empezar con punto o con cruz?', 'Una cruz pequeña con centro abierto suele ser más fácil de seguir. El punto puede sentirse más preciso, pero también se pierde con más facilidad.'], ['¿Qué color de mira funciona mejor?', 'El cian y el verde destacan en muchos mapas. En AimCodes puedes probar seis colores antes de copiar el código final.']],
        metaTitle: 'Mejores códigos de mira de VALORANT | AimCodes', metaDescription: 'Prueba 8 de las mejores miras de VALORANT en mapas reales. Compara configuraciones pro, puntos y formas compactas, cambia el color y copia el código.',
      },
      pro: {
        label: 'Miras de pros', eyebrow: 'CÓDIGOS DE JUGADORES PRO', title: 'Códigos de mira de jugadores profesionales de VALORANT', intro: 'Prueba las miras de TenZ, aspas, f0rsakeN, Demon1, ScreaM, Less, Boaster, cNed y Jinggg.', gridTitle: 'Miras profesionales de esta colección',
        body: ['Los profesionales cambian sus ajustes con frecuencia, así que el nombre del jugador es un buen punto de partida, no una regla permanente. Lo importante es la forma, el hueco y la visibilidad.', 'Abre cada código sobre el mismo mapa, compara cuánto tardas en recuperar el centro y copia la opción que mejor encaje con tu pantalla.'],
        faq: [['¿Los profesionales usan siempre la misma mira?', 'No. Pueden cambiarla entre parches, mapas o partidas. Usa cada código como un punto de partida ya probado.'], ['¿Qué mira profesional es más fácil para empezar?', 'Las formas compactas con líneas de TenZ y Jinggg suelen ser más fáciles de seguir que un punto muy pequeño.'], ['¿Puedo cambiar el color de una mira profesional?', 'Sí. AimCodes conserva la forma y actualiza el código copiado con el color que elijas.']],
        metaTitle: 'Códigos de mira de pros de VALORANT | AimCodes', metaDescription: 'Prueba y copia miras de pros de VALORANT como TenZ, aspas, Demon1, f0rsakeN, ScreaM, Less, Boaster, cNed y Jinggg.',
      },
      dot: {
        label: 'Miras de punto', eyebrow: 'CENTRO PEQUEÑO, PANTALLA LIMPIA', title: 'Códigos de mira de punto de VALORANT', intro: 'Cinco puntos y microcruces para quienes buscan un centro preciso con el mínimo ruido en pantalla.', gridTitle: 'Miras de punto para comparar',
        body: ['Las miras de punto dejan visible al rival y muestran el centro exacto. Funcionan bien para primeras balas tranquilas y una colocación disciplinada.', 'El riesgo es perderlas entre habilidades o fondos claros. Prueba la misma forma en cian, verde, amarillo y rojo antes de decidir.'],
        faq: [['¿Es buena una mira de punto en VALORANT?', 'Puede ser excelente para taps precisos. Si disparas muchas ráfagas, quizá prefieras líneas cortas alrededor del centro.'], ['¿Qué tamaño de punto debería usar?', 'Empieza con uno pequeño pero visible en tu resolución. Si lo pierdes al moverte, usa un punto más grueso o añade líneas cortas.'], ['¿Puede llevar contorno una mira de punto?', 'Sí. El contorno mejora el contraste en fondos claros, aunque uno muy grueso hará que el punto parezca mayor.']],
        metaTitle: 'Códigos de mira de punto de VALORANT | AimCodes', metaDescription: 'Compara 5 códigos de mira de punto de VALORANT en mapas reales. Prueba puntos compactos y microcruces, cambia el color y copia el código.',
      },
      cute: {
        label: 'Miras bonitas', eyebrow: 'BONITAS Y TODAVÍA APUNTAN', title: 'Códigos de miras bonitas de VALORANT', intro: 'Miras de gato, cerdito, corazón, flor y conejo con un centro reconocible para seguir apuntando.', gridTitle: 'Miras bonitas de esta colección',
        body: ['Estas miras usan los mismos ajustes válidos que una configuración competitiva. La diferencia está en cómo las líneas y los puntos forman una figura reconocible.', 'Son más grandes que la mayoría de miras pro, así que pruébalas antes de entrar en cola. Van perfectas para clips, partidas casuales o mejorar el mental.'],
        faq: [['¿Funcionan en el juego estas miras bonitas?', 'Sí. AimCodes analiza y valida todos los códigos de esta colección antes de publicarlos.'], ['¿Cuál ocupa menos espacio?', 'El corazón y la flor son más compactos que las caras de gato y cerdito. Compáralos sobre un mapa para verlo.'], ['¿Puedo cambiar el color del gato o el corazón?', 'Sí. Elige un color y el código copiado conservará la forma con el nuevo tono.']],
        metaTitle: 'Miras bonitas de VALORANT: gato, corazón y más | AimCodes', metaDescription: 'Prueba miras bonitas de VALORANT con formas de gato, cerdito, corazón, flor y conejo. Cambia el color y copia códigos que funcionan.',
      },
      small: {
        label: 'Miras pequeñas', eyebrow: 'MENOS PANTALLA, CENTRO CLARO', title: 'Códigos de miras pequeñas de VALORANT', intro: 'Seis puntos compactos y cruces de líneas cortas para apuntar con precisión sin tapar objetivos lejanos.', gridTitle: 'Miras pequeñas para comparar',
        body: ['Una mira pequeña deja más visible al rival y facilita mantener la altura de la cabeza. La mejor opción sigue siendo lo bastante grande para recuperarla después de un giro rápido.', 'Esta colección mezcla micropuntos, centros abiertos y líneas muy compactas. Compáralas sobre la misma escena antes de elegir más grosor, hueco o contraste.'],
        faq: [['¿Es mejor una mira pequeña en VALORANT?', 'Puede mejorar la visibilidad del objetivo y la precisión, siempre que puedas encontrarla rápido entre movimiento y habilidades.'], ['¿Qué diferencia hay entre una mira pequeña y un punto?', 'El punto usa una sola marca central. Una mira pequeña puede usar líneas cortas alrededor de un centro abierto o cerrado.'], ['¿Cómo hago más visible una mira pequeña?', 'Prueba cian o verde, añade un contorno fino o aumenta un nivel el grosor antes de agrandar toda la forma.']],
        metaTitle: 'Códigos de miras pequeñas de VALORANT | AimCodes', metaDescription: 'Prueba 6 miras pequeñas de VALORANT en mapas reales. Compara micropuntos, configuraciones pro compactas y cruces cortas, cambia el color y copia el código.',
      },
    },
    detail: {
      code: 'Código de mira', copy: 'Copiar código', bestFor: 'Ideal para', tradeoff: 'Qué puedes esperar', settings: 'Ajustes principales', import: 'Importar en VALORANT', related: 'Prueba otra mira', verified: 'Código revisado',
      importSteps: ['Abre los ajustes de VALORANT.', 'Entra en Mira y elige Importar código de perfil.', 'Pega el código y guarda el perfil.'],
      defaultBest: 'Jugadores que buscan una referencia clara y estable sin tapar al rival.', defaultTradeoff: 'Pruébala con tu resolución y el brillo habitual del mapa antes de usarla en competitivo.',
    },
    guide: {
      eyebrow: 'LISTO EN 60 SEGUNDOS', title: 'Cómo importar, copiar y compartir miras en VALORANT', intro: 'Añade un código en tres pasos, exporta tu mira, copia a un jugador mientras observas y corrige los errores más comunes.',
      steps: [['Copia un código', 'Abre una mira en AimCodes y pulsa Copiar código.'], ['Abre los ajustes de mira', 'En VALORANT, abre Ajustes → Mira y elige Importar código de perfil.'], ['Pega y prueba', 'Pega el código, ponle un nombre y pruébalo en el campo de tiro antes de jugar.']], cta: 'Ver códigos de mira',
    },
    footer: { browse: 'Códigos de mira', finder: 'Prueba de reacción', guide: 'Guía de importación', best: 'Mejores miras', pro: 'Miras de pros', cute: 'Miras bonitas', dot: 'Miras de punto', small: 'Miras pequeñas', settings: 'Ajustes de mira', colors: 'Colores de mira', note: 'Hecho para probar miras más rápido.', social: 'Sigue a AimCodes' },
    notFound: { title: 'Esta mira falló el tiro', body: 'La página no existe. Vuelve al catálogo y elige otra mira.', action: 'Ver miras' },
    meta: {
      homeTitle: 'Códigos de mira de VALORANT y vista previa | AimCodes', homeDescription: 'Prueba códigos de mira de VALORANT en mapas reales, cambia colores, copia códigos y encuentra tu próxima mira con una prueba de reacción.',
      catalogTitle: 'Códigos de mira de VALORANT: pros, puntos y más | AimCodes', catalogDescription: 'Explora más de 60 códigos de mira de VALORANT que funcionan. Prueba miras de pros, pequeñas, bonitas y originales y copia el código.',
      finderTitle: 'Prueba de reacción y selector de mira de VALORANT | AimCodes', finderDescription: 'Mide tu reacción en tres rondas, consigue un rango divertido de VALORANT y recibe una mira para probar y copiar.',
      guideTitle: 'Cómo importar un código de mira en VALORANT | AimCodes', guideDescription: 'Aprende a importar, exportar, compartir y corregir códigos de mira de VALORANT, incluido el comando para copiar mientras observas.',
    },
  },
  'pt-BR': {
    home: {
      eyebrow: 'LABORATÓRIO DE MIRAS DO VALORANT', title: 'Códigos de mira do VALORANT para testar antes de copiar', intro: 'Teste códigos que funcionam em mapas reais, troque a cor e copie a mira que combina com você.', primary: 'Ver todas as miras', secondary: 'Fazer o teste de reação', popular: 'Miras populares', popularBody: 'Comece por opções de estilo profissional e algumas escolhas divertidas.',
    },
    catalog: { eyebrow: 'MAIS DE 60 CÓDIGOS', title: 'Explore códigos de mira do VALORANT', intro: 'Busque por jogador ou estilo, teste cada formato e copie o código direto para o VALORANT.' },
    topics: { title: 'Comece por uma coleção' },
    collections: {
      best: {
        label: 'Melhores miras', eyebrow: 'UMA SELEÇÃO PARA COMEÇAR', title: 'As melhores miras do VALORANT para testar primeiro', intro: 'Oito formatos confiáveis para ranqueada, precisão no primeiro tiro e trocas rápidas de alvo, prontos para testar e copiar.', gridTitle: '8 miras que valem o teste',
        body: ['Não existe uma mira perfeita para todo mundo. O melhor ponto de partida é um formato limpo, visível e que não esconda a cabeça do alvo.', 'Esta seleção mistura centros abertos, pontos compactos e configurações de profissionais. Teste todas no mesmo mapa e escolha a que seus olhos encontram mais rápido.'],
        faq: [['O que faz uma mira do VALORANT ser boa?', 'Ela precisa aparecer com clareza, marcar o centro e não esconder o alvo. O tamanho e o espaço central dependem do seu jeito de mirar.'], ['É melhor começar com ponto ou cruz?', 'Uma cruz pequena com centro aberto costuma ser mais fácil de acompanhar. O ponto pode ser mais preciso, mas também some com mais facilidade.'], ['Qual cor de mira funciona melhor?', 'Ciano e verde se destacam em muitos mapas. No AimCodes você testa seis cores antes de copiar o código final.']],
        metaTitle: 'Melhores códigos de mira do VALORANT | AimCodes', metaDescription: 'Teste 8 das melhores miras do VALORANT em mapas reais. Compare miras pro, pontos e formatos compactos, troque a cor e copie o código.',
      },
      pro: {
        label: 'Miras de pro', eyebrow: 'CÓDIGOS DE JOGADORES PRO', title: 'Códigos de mira de jogadores profissionais do VALORANT', intro: 'Teste as miras de TenZ, aspas, f0rsakeN, Demon1, ScreaM, Less, Boaster, cNed e Jinggg.', gridTitle: 'Miras profissionais desta coleção',
        body: ['Jogadores profissionais trocam ajustes com frequência, então o nome do jogador é um bom ponto de partida, não uma regra permanente. O que importa é o formato, o espaço e a visibilidade.', 'Abra cada código no mesmo mapa, compare quanto tempo leva para reencontrar o centro e copie a opção que combina com a sua tela.'],
        faq: [['Os profissionais usam sempre a mesma mira?', 'Não. Eles podem mudar entre patches, mapas ou partidas. Use cada código como um ponto de partida já testado.'], ['Qual mira profissional é mais fácil para começar?', 'Os formatos compactos com linhas de TenZ e Jinggg costumam ser mais fáceis de acompanhar do que um ponto muito pequeno.'], ['Posso mudar a cor de uma mira profissional?', 'Sim. O AimCodes mantém o formato e atualiza o código copiado com a cor escolhida.']],
        metaTitle: 'Códigos de mira de pro do VALORANT | AimCodes', metaDescription: 'Teste e copie miras de pros do VALORANT como TenZ, aspas, Demon1, f0rsakeN, ScreaM, Less, Boaster, cNed e Jinggg.',
      },
      dot: {
        label: 'Miras de ponto', eyebrow: 'CENTRO PEQUENO, TELA LIMPA', title: 'Códigos de mira de ponto do VALORANT', intro: 'Cinco pontos e microcruzes para quem quer um centro preciso com o mínimo de informação na tela.', gridTitle: 'Miras de ponto para comparar',
        body: ['Miras de ponto deixam o alvo visível e mostram o centro exato. Funcionam bem para primeiro tiro controlado e posicionamento na linha da cabeça.', 'O risco é perder o ponto entre habilidades ou cenários claros. Teste o mesmo formato em ciano, verde, amarelo e vermelho antes de decidir.'],
        faq: [['Mira de ponto é boa no VALORANT?', 'Pode ser ótima para taps precisos. Se você usa mais rajadas, talvez prefira linhas curtas ao redor do centro.'], ['Qual tamanho de ponto devo usar?', 'Comece pequeno, mas visível na sua resolução. Se perder durante o movimento, use um ponto mais grosso ou linhas curtas.'], ['Uma mira de ponto pode ter contorno?', 'Sim. O contorno melhora o contraste em fundos claros, mas um contorno pesado faz o ponto parecer maior.']],
        metaTitle: 'Códigos de mira de ponto do VALORANT | AimCodes', metaDescription: 'Compare 5 códigos de mira de ponto do VALORANT em mapas reais. Teste pontos compactos e microcruzes, troque a cor e copie o código.',
      },
      cute: {
        label: 'Miras fofas', eyebrow: 'FOFAS E AINDA DÁ PARA MIRAR', title: 'Códigos de miras fofas do VALORANT', intro: 'Miras de gato, porquinho, coração, flor e coelho com um centro claro para continuar acertando.', gridTitle: 'Miras fofas desta coleção',
        body: ['Essas miras usam os mesmos ajustes válidos de uma configuração competitiva. A diferença está em como linhas e pontos formam um desenho reconhecível.', 'Elas são maiores que a maioria das miras pro, então teste antes da fila. Funcionam bem para clipes, partidas casuais ou para dar uma força ao mental.'],
        faq: [['Essas miras fofas funcionam no jogo?', 'Sim. O AimCodes analisa e valida todos os códigos desta coleção antes de publicar.'], ['Qual mira fofa ocupa menos espaço?', 'O coração e a flor são mais compactos que os rostos de gato e porquinho. Compare no mapa para ver a diferença.'], ['Posso mudar a cor do gato ou do coração?', 'Sim. Escolha uma cor e o código copiado manterá o formato com o novo tom.']],
        metaTitle: 'Miras fofas do VALORANT: gato, coração e mais | AimCodes', metaDescription: 'Teste miras fofas do VALORANT em formato de gato, porquinho, coração, flor e coelho. Troque a cor e copie códigos que funcionam.',
      },
      small: {
        label: 'Miras pequenas', eyebrow: 'MENOS TELA, CENTRO CLARO', title: 'Códigos de miras pequenas do VALORANT', intro: 'Seis pontos compactos e cruzes de linhas curtas para mirar com precisão sem cobrir alvos distantes.', gridTitle: 'Miras pequenas para comparar',
        body: ['Uma mira pequena deixa o alvo mais visível e facilita manter a linha da cabeça. A melhor opção ainda precisa ser grande o bastante para você reencontrar depois de um giro rápido.', 'Esta coleção mistura micropontos, centros abertos e linhas compactas. Compare na mesma cena antes de escolher mais espessura, espaço ou contraste.'],
        faq: [['Mira pequena é melhor no VALORANT?', 'Pode melhorar a visibilidade do alvo e a precisão, desde que você ainda encontre o centro rápido durante movimento e habilidades.'], ['Qual é a diferença entre mira pequena e ponto?', 'O ponto usa uma única marca central. A mira pequena pode usar linhas curtas ao redor de um centro aberto ou fechado.'], ['Como deixar uma mira pequena mais visível?', 'Teste ciano ou verde, adicione um contorno fino ou aumente um nível da espessura antes de ampliar todo o formato.']],
        metaTitle: 'Códigos de Miras Pequenas do VALORANT | AimCodes', metaDescription: 'Teste 6 miras pequenas do VALORANT em mapas reais. Compare micropontos, configurações pro compactas e cruzes curtas, troque a cor e copie o código.',
      },
    },
    detail: {
      code: 'Código da mira', copy: 'Copiar código', bestFor: 'Ideal para', tradeoff: 'O que esperar', settings: 'Ajustes principais', import: 'Importar no VALORANT', related: 'Teste outra mira', verified: 'Código verificado',
      importSteps: ['Abra as Configurações do VALORANT.', 'Entre em Mira e escolha Importar código de perfil.', 'Cole o código e salve o perfil.'],
      defaultBest: 'Jogadores que querem uma referência clara e estável sem esconder o alvo.', defaultTradeoff: 'Teste na sua resolução e no brilho normal dos mapas antes de levar para a ranqueada.',
    },
    guide: {
      eyebrow: 'PRONTO EM 60 SEGUNDOS', title: 'Como importar, copiar e compartilhar miras no VALORANT', intro: 'Adicione um código em três passos, exporte sua mira, copie outro jogador e resolva os erros mais comuns.',
      steps: [['Copie um código', 'Abra uma mira no AimCodes e toque em Copiar código.'], ['Abra as opções de mira', 'No VALORANT, abra Configurações → Mira e escolha Importar código de perfil.'], ['Cole e teste', 'Cole o código, dê um nome ao perfil e teste no campo de treino antes da partida.']], cta: 'Ver códigos de mira',
    },
    footer: { browse: 'Códigos de mira', finder: 'Teste de reação', guide: 'Guia de importação', best: 'Melhores miras', pro: 'Miras de pro', cute: 'Miras fofas', dot: 'Miras de ponto', small: 'Miras pequenas', settings: 'Configurações de mira', colors: 'Cores de mira', note: 'Feito para testar miras mais rápido.', social: 'Siga a AimCodes' },
    notFound: { title: 'Essa mira errou o tiro', body: 'A página não existe. Volte ao catálogo e escolha outra mira.', action: 'Ver miras' },
    meta: {
      homeTitle: 'Códigos de mira do VALORANT e prévia ao vivo | AimCodes', homeDescription: 'Teste códigos de mira do VALORANT em mapas reais, troque cores, copie códigos e encontre sua próxima mira com um teste de reação.',
      catalogTitle: 'Códigos de mira do VALORANT: pro, ponto e diversão | AimCodes', catalogDescription: 'Explore mais de 60 códigos de mira do VALORANT que funcionam. Teste miras profissionais, pequenas, fofas e divertidas e copie o código.',
      finderTitle: 'Teste de reação e seletor de mira do VALORANT | AimCodes', finderDescription: 'Teste sua reação em três rodadas, receba um rank divertido do VALORANT e ganhe uma indicação de mira para testar e copiar.',
      guideTitle: 'Como importar um código de mira no VALORANT | AimCodes', guideDescription: 'Aprenda a importar, exportar, compartilhar e corrigir códigos de mira do VALORANT, incluindo o comando para copiar enquanto assiste.',
    },
  },
  'zh-CN': {
    home: {
      eyebrow: '无畏契约准星试用站', title: '先试效果，再复制无畏契约准星代码', intro: '把准星放进真实地图里看效果，换个顺眼的颜色，满意后直接复制代码。', primary: '查看全部准星', secondary: '测试反应速度', popular: '热门准星代码', popularBody: '先从职业选手风格和几款有趣准星开始试。',
    },
    catalog: { eyebrow: '60+ 个可用代码', title: '浏览无畏契约准星代码', intro: '按选手或样式搜索，在地图里试过效果后，直接复制到游戏。' },
    topics: { title: '按类型直接开选' },
    collections: {
      best: {
        label: '最佳准星', eyebrow: '不知道选谁就从这里开始', title: '值得优先试的无畏契约准星', intro: '8 款适合排位、第一枪定位和快速转移目标的可靠准星，都能直接预览和复制。', gridTitle: '先试这 8 款准星',
        body: ['准星没有唯一答案。更稳妥的起点，是一个看得清、找得快、又不会挡住头线的简单造型。', '这组准星包含中心留空的十字、小圆点和紧凑职业同款。固定一张地图逐个试，留下你第一眼最容易找到中心的那款。'],
        faq: [['什么样的无畏契约准星算好用？', '中心明确、在多数场景中看得见，同时不遮挡目标。线长、间距和大小要配合你自己的瞄准习惯。'], ['新手更适合小圆点还是十字？', '多数人会更容易跟住中心留空的小十字。小圆点更利于精确单点，但在移动和技能特效里也更容易丢。'], ['准星用什么颜色更显眼？', '青色和绿色在多数地图中比较醒目。AimCodes 可以先试 6 种颜色，再复制最终代码。']],
        metaTitle: '无畏契约最佳准星代码推荐 | AimCodes', metaDescription: '在真实地图中试用 8 款值得优先尝试的无畏契约准星，对比职业同款、小圆点和紧凑造型，换色后直接复制代码。',
      },
      pro: {
        label: '职业准星', eyebrow: '职业选手同款代码', title: '无畏契约职业选手准星代码', intro: '直接试 TenZ、aspas、f0rsakeN、Demon1、ScreaM、Less、Boaster、cNed 和 Jinggg 的准星。', gridTitle: '本页职业选手准星',
        body: ['职业选手也会频繁更换设置，所以选手名字更适合作为起点，而不是永远不变的标准答案。真正值得比较的是形状、间距、线长和可见度。', '把不同准星放在同一张地图里试，观察自己能多快找回中心，再复制最适合自己屏幕和习惯的那款。'],
        faq: [['职业选手会一直用同一个准星吗？', '不会。选手可能随版本、地图甚至单场比赛更换准星，所以这里的代码更适合作为经过实战验证的起点。'], ['哪款职业准星更适合新手？', 'TenZ 和 Jinggg 的紧凑线条更容易跟住，通常比极小圆点更适合刚开始寻找手感的玩家。'], ['职业准星可以换颜色吗？', '可以。AimCodes 会保留原有形状，同时把你选择的颜色写进最终复制代码。']],
        metaTitle: '无畏契约职业选手准星代码大全 | AimCodes', metaDescription: '预览并复制 TenZ、aspas、Demon1、f0rsakeN、ScreaM、Less、Boaster、cNed 和 Jinggg 的无畏契约职业准星代码。',
      },
      dot: {
        label: '小圆点准星', eyebrow: '中心更小，画面更干净', title: '无畏契约小圆点准星代码', intro: '5 款紧凑小圆点和微型十字，适合想要明确中心、又不想让准星遮挡画面的玩家。', gridTitle: '值得对比的小圆点准星',
        body: ['小圆点不会挡住太多目标，也能直接标出精确中心，适合重视第一枪和头线预瞄的玩家。', '代价是容易在技能特效或明亮背景里丢失。确定形状后，再用青、绿、黄、红几种颜色试一遍，差别会很明显。'],
        faq: [['无畏契约小圆点准星好用吗？', '它很适合精确单点和稳定预瞄。习惯连续扫射的玩家，可能会更喜欢中心周围带短线的造型。'], ['小圆点应该设多大？', '先从小而清楚的尺寸开始。如果移动时经常找不到，就增加点的厚度，或者在周围加几条短线。'], ['小圆点可以加轮廓吗？', '可以。轮廓能提高亮色背景下的对比度，但太粗也会让圆点看起来更大。']],
        metaTitle: '无畏契约小圆点准星代码与预览 | AimCodes', metaDescription: '在真实地图中对比 5 款可用的无畏契约小圆点准星代码，试用紧凑圆点和微型十字，换色后直接复制。',
      },
      cute: {
        label: '可爱准星', eyebrow: '可爱归可爱，中心也得能瞄', title: '无畏契约可爱准星代码', intro: '猫猫、猪猪、爱心、花朵和兔兔准星，造型够有趣，正中心也仍然看得清。', gridTitle: '本页可爱准星',
        body: ['可爱准星同样由游戏支持的配置参数拼出来，只是线条和中心点组合成了更容易辨认的图案。', '它们普遍比职业准星更大，排位前最好先在地图里看看。娱乐局、录素材，或者单纯想给心态加点 Buff，都很合适。'],
        faq: [['这些可爱准星真的能在游戏里用吗？', '可以。本页所有代码在发布前都经过 AimCodes 解析和可用性校验。'], ['哪款可爱准星占画面更小？', '爱心和花朵比猫脸、猪脸更紧凑。直接放到地图里预览，最容易看出实际占用范围。'], ['猫猫和爱心准星能换颜色吗？', '可以。选择预设颜色后，复制出的代码会保留原图案并同步使用新颜色。']],
        metaTitle: '无畏契约可爱准星代码：猫猫、爱心与花朵 | AimCodes', metaDescription: '试用可用的无畏契约可爱准星代码，包括猫猫、猪猪、爱心、花朵和兔兔造型，预览、换色并直接复制。',
      },
      small: {
        label: '小准星', eyebrow: '少挡画面，中心得看得清', title: '无畏契约小准星代码', intro: '6 款微型圆点和短线准星，适合想要精确中心、又不希望遮挡远距离目标的玩家。', gridTitle: '值得对比的小准星',
        body: ['小准星能保留更多目标画面，也更容易判断头线位置。但它不能小到快速转身后连自己都找不到。', '这组准星包含微型圆点、中心留空和紧凑短线。固定同一张场景逐个试，再决定需要加粗中心、扩大间距还是换一个更醒目的颜色。'],
        faq: [['无畏契约小准星一定更好吗？', '它能减少遮挡并提高精确定位，但前提是你在移动和技能特效中仍然能快速找到中心。'], ['小准星和小圆点有什么区别？', '小圆点只用一个中心标记；小准星还可以用几条短线围绕留空或闭合中心，更容易让视线跟住。'], ['小准星看不清怎么调整？', '先试青色或绿色，再开一层细轮廓，或者只把粗细提高一级，不要直接把整个造型放大。']],
        metaTitle: '无畏契约小准星代码与地图预览 | AimCodes', metaDescription: '在真实地图中试用 6 款无畏契约小准星代码，对比微型圆点、紧凑职业同款和短线十字，换色后直接复制有效代码。',
      },
    },
    detail: {
      code: '准星代码', copy: '复制代码', bestFor: '适合谁', tradeoff: '用起来什么感觉', settings: '主要参数', import: '导入无畏契约', related: '再试一个准星', verified: '代码校验',
      importSteps: ['打开《无畏契约》设置。', '进入“准星”，点击“导入准星配置代码”。', '粘贴代码并保存新的准星方案。'],
      defaultBest: '想要中心明确、容易重复定位，同时不希望准星遮挡目标的玩家。', defaultTradeoff: '正式排位前，建议用自己的分辨率和常玩地图先试一局。',
    },
    guide: {
      eyebrow: '一分钟完成', title: '无畏契约准星代码怎么导入、复制和分享', intro: '三步导入代码，还能导出自己的准星、观战复制队友，并排查常见导入问题。',
      steps: [['复制准星代码', '打开 AimCodes 的准星页面，点击“复制代码”。'], ['进入准星设置', '打开《无畏契约》设置，进入“准星”，选择“导入准星配置代码”。'], ['粘贴并试用', '粘贴代码、保存方案，先去训练场看看是否顺手。']], cta: '浏览准星代码',
    },
    footer: { browse: '准星代码', finder: '反应测试', guide: '导入教程', best: '最佳准星', pro: '职业准星', cute: '可爱准星', dot: '小圆点准星', small: '小准星', settings: '准星设置说明', colors: '准星颜色选择', note: '让试准星这件事快一点。', social: '关注 AimCodes' },
    notFound: { title: '这枪空了', body: '这个页面不存在，回准星库再挑一个吧。', action: '返回准星库' },
    meta: {
      homeTitle: '无畏契约准星代码与地图预览 | AimCodes', homeDescription: '在真实地图中预览可用的无畏契约准星代码，自定义颜色，一键复制，还能通过反应测试找到更适合自己的准星。',
      catalogTitle: '无畏契约准星代码大全：职业、小点与趣味准星 | AimCodes', catalogDescription: '浏览 60 多个可用的无畏契约准星代码，预览职业同款、小圆点、小准星、可爱和整活样式，一键复制到游戏。',
      finderTitle: '无畏契约反应速度测试与准星推荐 | AimCodes', finderDescription: '完成三轮反应速度测试，看看自己的无畏契约反应段位，并获得一个可以直接预览和复制的准星推荐。',
      guideTitle: '无畏契约准星代码怎么导入、导出与复制 | AimCodes', guideDescription: '完整了解无畏契约准星代码的导入、导出、观战复制和常见报错排查，并直接试用有效准星。',
    },
  },
}

const priorityDetails = {
  tenz: {
    en: ['Fast target switching and players who like a familiar open center.', 'Four short lines keep the head visible while giving you a clear center reference.'],
    es: ['Cambios rápidos de objetivo y jugadores que prefieren un centro abierto.', 'Cuatro líneas cortas dejan ver la cabeza y mantienen una referencia clara.'],
    'pt-BR': ['Trocas rápidas de alvo e quem prefere o centro aberto.', 'Quatro linhas curtas deixam a cabeça visível e mantêm uma referência clara.'],
    'zh-CN': ['适合喜欢中心留空、需要快速切换目标的玩家。', '四条短线不会挡住头线，同时又能给出明确的中心参照。'],
  },
  'aspas-dot': {
    en: ['Precise first shots and players who prefer a compact center dot.', 'The small dot leaves most of the target visible and is easy to place on a head line.'],
    es: ['Primeros disparos precisos y jugadores que prefieren un punto compacto.', 'El pequeño punto deja visible casi todo el objetivo y se coloca bien a la altura de la cabeza.'],
    'pt-BR': ['Primeiros tiros precisos e quem prefere um ponto compacto.', 'O pequeno ponto deixa quase todo o alvo visível e encaixa bem na linha da cabeça.'],
    'zh-CN': ['适合重视第一枪、喜欢紧凑中心点的玩家。', '小巧的中心点几乎不遮挡目标，很适合贴着头线移动。'],
  },
  forsaken: {
    en: ['Players who want a tiny sight and plenty of space around the target.', 'Minimal marks create a precise center without adding much visual noise.'],
    es: ['Jugadores que quieren una mira mínima y mucho espacio alrededor del objetivo.', 'Las pequeñas marcas señalan el centro sin añadir ruido visual.'],
    'pt-BR': ['Quem quer uma mira mínima e bastante espaço ao redor do alvo.', 'Marcas pequenas definem o centro sem adicionar ruído visual.'],
    'zh-CN': ['适合喜欢极小准星、希望目标周围保持干净的玩家。', '几条极短的线标出中心，不会给画面增加太多干扰。'],
  },
  demon1: {
    en: ['Calm crosshair placement and players who trust a simple center point.', 'A clean dot makes the exact center obvious with almost no extra shape.'],
    es: ['Colocación tranquila de la mira y jugadores que confían en un punto simple.', 'Un punto limpio marca el centro exacto sin formas innecesarias.'],
    'pt-BR': ['Posicionamento calmo e quem confia em um ponto central simples.', 'Um ponto limpo mostra o centro exato sem formatos extras.'],
    'zh-CN': ['适合准星预瞄稳定、习惯用简单中心点定位的玩家。', '干净的中心点直接标出位置，没有多余线条分散注意力。'],
  },
  'scream-dot': {
    en: ['One-tap practice and players who want a bold center with subtle support lines.', 'The center dot stays dominant while the short inner lines make it easier to reacquire.'],
    es: ['Práctica de un toque y jugadores que quieren un centro marcado con líneas discretas.', 'El punto central domina y las líneas cortas ayudan a recuperarlo rápidamente.'],
    'pt-BR': ['Treino de one tap e quem quer um centro marcante com linhas discretas.', 'O ponto central domina e as linhas curtas ajudam a encontrá-lo novamente.'],
    'zh-CN': ['适合练习单点，以及喜欢醒目中心但仍想保留短线参照的玩家。', '中心点足够突出，周围短线又能帮助视线快速找回准星。'],
  },
  less: {
    en: ['Controlled bursts and players who like a tight, closed center.', 'The compact shape is easy to track without taking much screen space.'],
    es: ['Ráfagas controladas y jugadores que prefieren un centro pequeño y cerrado.', 'La forma compacta se sigue con facilidad y ocupa poco espacio.'],
    'pt-BR': ['Rajadas controladas e quem prefere um centro pequeno e fechado.', 'O formato compacto é fácil de acompanhar e ocupa pouco espaço.'],
    'zh-CN': ['适合控制短点射，以及喜欢紧凑闭合中心的玩家。', '造型体积很小，移动时容易跟住，也不会占太多画面。'],
  },
  'cat-pink': {
    en: ['Casual games, clips, and players who want a playful crosshair that still has a center.', 'The blocks form a recognizable cat face while keeping the aiming point in the middle.'],
    es: ['Partidas casuales, clips y jugadores que quieren una mira divertida con un centro útil.', 'Los bloques forman una cara de gato reconocible y mantienen el punto de mira en el centro.'],
    'pt-BR': ['Partidas casuais, clipes e quem quer uma mira divertida sem perder o centro.', 'Os blocos formam um rosto de gato reconhecível e mantêm o ponto de mira no meio.'],
    'zh-CN': ['适合娱乐局、录制视频，以及想要有趣造型又不想丢掉中心点的玩家。', '线块能看出猫脸和耳朵，正中心仍然保留了瞄准位置。'],
  },
  'pig-pink': {
    en: ['Fun matches and players who want a bigger novelty crosshair with a clear middle.', 'Wide blocks create a pig face and snout, making it intentionally bold on screen.'],
    es: ['Partidas divertidas y jugadores que quieren una mira grande y original con un centro claro.', 'Los bloques forman la cara y el hocico de un cerdito y se ven muy marcados en pantalla.'],
    'pt-BR': ['Partidas divertidas e quem quer uma mira grande e diferente com centro claro.', 'Os blocos formam o rosto e o focinho de um porquinho e ficam bem marcantes na tela.'],
    'zh-CN': ['适合娱乐局，以及想要醒目整活造型、同时保留明确中心的玩家。', '宽大的线块拼出猪脸和猪鼻，画面存在感会比常规准星更强。'],
  },
  boaster: {
    en: ['Players who want a compact cross with no empty gap at the center.', 'Connected cyan lines are easy to locate, but cover slightly more of a distant target.'],
    es: ['Jugadores que quieren una cruz compacta sin hueco en el centro.', 'Las líneas cian conectadas se encuentran rápido, pero tapan algo más un objetivo lejano.'],
    'pt-BR': ['Quem quer uma cruz compacta sem espaço vazio no centro.', 'As linhas ciano conectadas são fáceis de achar, mas cobrem um pouco mais o alvo distante.'],
    'zh-CN': ['适合喜欢中心闭合、希望快速找到准星位置的玩家。', '连在一起的青色短线很醒目，但瞄远距离目标时会比留空准星多挡一点画面。'],
  },
  cned: {
    en: ['Players who prefer a solid, traditional cross for steady placement.', 'The longer white lines are easy to follow, though they take more screen space than a dot.'],
    es: ['Jugadores que prefieren una cruz sólida y tradicional para colocar la mira.', 'Las líneas blancas son fáciles de seguir, aunque ocupan más que un punto.'],
    'pt-BR': ['Quem prefere uma cruz sólida e tradicional para posicionar a mira.', 'As linhas brancas são fáceis de acompanhar, mas ocupam mais espaço que um ponto.'],
    'zh-CN': ['适合喜欢传统实心十字、依靠线条稳定预瞄的玩家。', '较长的白色线条很容易跟住，但占用画面会比小圆点更多。'],
  },
  jinggg: {
    en: ['Fast entries and players who want a small open center with strong contrast.', 'Short green lines stay readable while leaving the target visible through the middle.'],
    es: ['Entradas rápidas y jugadores que quieren un centro abierto pequeño y visible.', 'Las líneas verdes cortas se ven bien y dejan visible al rival en el centro.'],
    'pt-BR': ['Entradas rápidas e quem quer um centro aberto pequeno e visível.', 'As linhas verdes curtas aparecem bem e deixam o alvo visível no meio.'],
    'zh-CN': ['适合快节奏突破，以及想要紧凑留空中心的玩家。', '短绿线对比度高，中心又不会挡住目标，转移视线时比较容易找回。'],
  },
  'heart-pink': {
    en: ['Clips and casual matches where you want a compact playful shape.', 'The heart is smaller than the character faces, but still busier than a competitive dot.'],
    es: ['Clips y partidas casuales donde quieres una forma divertida y compacta.', 'El corazón ocupa menos que las caras, pero sigue siendo más llamativo que un punto competitivo.'],
    'pt-BR': ['Clipes e partidas casuais para quem quer um formato divertido e compacto.', 'O coração ocupa menos que os rostos, mas ainda chama mais atenção que um ponto competitivo.'],
    'zh-CN': ['适合娱乐局和录素材，想整活但又不希望图案太大的玩家。', '爱心比猫脸、猪脸更紧凑，不过视觉信息仍会比竞技小圆点更多。'],
  },
  'flower-pink': {
    en: ['Players who want a recognizable flower without losing the center completely.', 'The petal shape is balanced around the middle, but it is intentionally larger than a pro crosshair.'],
    es: ['Jugadores que quieren una flor reconocible sin perder por completo el centro.', 'Los pétalos rodean bien el centro, pero la mira es más grande que una configuración pro.'],
    'pt-BR': ['Quem quer uma flor reconhecível sem perder totalmente o centro.', 'As pétalas ficam equilibradas ao redor do meio, mas a mira é maior que uma configuração pro.'],
    'zh-CN': ['适合想要明显花朵造型、同时仍能辨认中心位置的玩家。', '花瓣围绕中心分布得比较均衡，但整体尺寸会明显大于职业准星。'],
  },
  'bunny-white': {
    en: ['Casual games and players who want a light-colored novelty crosshair.', 'The bunny silhouette is easy to recognize, but bright walls can reduce the contrast of the white lines.'],
    es: ['Partidas casuales y jugadores que quieren una mira original de color claro.', 'La silueta de conejo se reconoce bien, pero las paredes claras reducen el contraste.'],
    'pt-BR': ['Partidas casuais e quem quer uma mira diferente de cor clara.', 'A silhueta de coelho é fácil de reconhecer, mas paredes claras reduzem o contraste.'],
    'zh-CN': ['适合娱乐局，以及喜欢浅色兔兔造型的玩家。', '兔子轮廓辨识度很高，但白色线条在明亮墙面上会更容易丢失。'],
  },
  'small-dot-thick': {
    en: ['Precise tapping with a dot that is small but easier to keep visible.', 'The thicker pixel is easier to reacquire than a micro dot, while covering a little more of the head.'],
    es: ['Taps precisos con un punto pequeño que resulta más fácil de ver.', 'El píxel grueso se recupera mejor que un micropunto, aunque tapa un poco más la cabeza.'],
    'pt-BR': ['Taps precisos com um ponto pequeno, mas mais fácil de enxergar.', 'O pixel grosso é mais fácil de reencontrar que um microponto, mas cobre um pouco mais a cabeça.'],
    'zh-CN': ['适合想练精确单点，但又觉得微型圆点太容易丢的玩家。', '较粗的像素点更容易被视线找回，代价是会比极小圆点多遮挡一点头线。'],
  },
  'needle-cyan': {
    en: ['Players who want a narrow center marker with very little horizontal clutter.', 'The slim cyan shape feels precise, but its unusual proportions need a few rounds to learn.'],
    es: ['Jugadores que quieren una marca central estrecha y poco ruido horizontal.', 'La forma cian es precisa, pero sus proporciones necesitan unas rondas de adaptación.'],
    'pt-BR': ['Quem quer uma marca central estreita e pouco ruído horizontal.', 'O formato ciano parece preciso, mas suas proporções exigem algumas rodadas de adaptação.'],
    'zh-CN': ['适合喜欢狭长中心标记、希望横向画面尽量干净的玩家。', '细长青色造型定位很精确，但比例比较特别，需要几局适应。'],
  },
}

export function seoCopy(locale) {
  return copy[locale] || copy.en
}

export function collectionCopy(locale, collectionKey) {
  return seoCopy(locale).collections?.[collectionKey] || seoCopy(locale).collections.best
}

export function detailCopy(locale, crosshairId) {
  const localized = priorityDetails[crosshairId]?.[locale]
  const base = seoCopy(locale).detail
  return {
    bestFor: localized?.[0] || base.defaultBest,
    tradeoff: localized?.[1] || base.defaultTradeoff,
  }
}

export function routeMetadata(locale, route, crosshair) {
  const localized = seoCopy(locale)
  const canonical = `${SITE_ORIGIN}${routePath(locale, route)}`
  let title = localized.meta.homeTitle
  let description = localized.meta.homeDescription

  if (route.type === 'catalog') {
    title = localized.meta.catalogTitle
    description = localized.meta.catalogDescription
  } else if (route.type === 'collection') {
    const collection = collectionCopy(locale, route.collectionKey)
    title = collection.metaTitle
    description = collection.metaDescription
  } else if (route.type === 'finder') {
    title = localized.meta.finderTitle
    description = localized.meta.finderDescription
  } else if (route.type === 'guide') {
    title = localized.meta.guideTitle
    description = localized.meta.guideDescription
  } else if (route.type === 'article') {
    const article = articleCopy(locale, route.articleKey)
    title = article.metaTitle
    description = article.metaDescription
  } else if (route.type === 'crosshair' && crosshair) {
    const names = {
      en: `${crosshair.shortName} VALORANT Crosshair Code & Preview | AimCodes`,
      es: `${crosshair.shortName}: código de mira de VALORANT | AimCodes`,
      'pt-BR': `${crosshair.shortName}: código de mira do VALORANT | AimCodes`,
      'zh-CN': `${crosshair.shortName} 无畏契约准星代码与预览 | AimCodes`,
    }
    const descriptions = {
      en: `Preview the ${crosshair.shortName} VALORANT crosshair on real maps, change its color, and copy the working profile code in one click.`,
      es: `Prueba la mira ${crosshair.shortName} de VALORANT en mapas reales, cambia el color y copia el código de perfil en un clic.`,
      'pt-BR': `Teste a mira ${crosshair.shortName} do VALORANT em mapas reais, troque a cor e copie o código de perfil em um clique.`,
      'zh-CN': `在真实地图中预览 ${crosshair.shortName} 无畏契约准星，切换颜色并一键复制可用的准星配置代码。`,
    }
    title = names[locale] || names.en
    description = descriptions[locale] || descriptions.en
  } else if (route.type === 'notFound') {
    title = `${localized.notFound.title} | AimCodes`
    description = localized.notFound.body
  }

  return { title, description, canonical, image: `${SITE_ORIGIN}${OG_IMAGE_PATH}` }
}

export function alternateUrls(route) {
  return Object.entries(localeRoutes).map(([locale, config]) => ({
    locale,
    hreflang: config.hreflang,
    url: `${SITE_ORIGIN}${routePath(locale, route)}`,
  }))
}

export function crosshairUrl(locale, id) {
  return `${SITE_ORIGIN}${routePath(locale, { type: 'crosshair', crosshairId: id })}`
}

export function crosshairBreadcrumbName(locale, crosshair) {
  if (locale === 'zh-CN') return `${crosshair.shortName} 准星`
  if (locale === 'es') return `Mira ${crosshair.shortName}`
  if (locale === 'pt-BR') return `Mira ${crosshair.shortName}`
  return `${crosshair.shortName} crosshair`
}

export function collectionBreadcrumbName(locale, collectionKey) {
  return collectionCopy(locale, collectionKey).label
}

export function pageSlug(route) {
  if (route.type === 'crosshair') return crosshairSlug(route.crosshairId)
  if (route.type === 'collection') return route.collectionKey
  if (route.type === 'article') return route.articleKey
  return route.type
}
