import { crosshairSlug } from './routes.js'
import { expansionCollectionCopy } from './collectionExpansionContent.js'

const searchDisplayNames = Object.freeze({
  'cat-pink': Object.freeze({ en: 'Cat / Kitty', es: 'Gato', 'pt-BR': 'Gato', 'zh-CN': '猫猫' }),
  'pig-pink': Object.freeze({ en: 'Pig', es: 'Cerdito', 'pt-BR': 'Porquinho', 'zh-CN': '猪猪' }),
})

const copy = {
  en: {
    home: {
      tryNow: 'Try this crosshair',
      eyebrow: 'VALORANT CROSSHAIR LAB',
      title: '300+ VALORANT Aim Codes & Crosshair Codes',
      intro: 'Preview 300+ working crosshair profiles on real map scenes, switch colors, and copy the code that feels easiest to track.',
      primary: 'Browse all crosshairs',
      secondary: 'Take the reaction test',
      popular: 'Popular crosshair codes',
      popularBody: 'Start with pro-style essentials and a couple of playful picks.',
    },
    catalog: {
      eyebrow: '300+ WORKING CODES',
      title: 'VALORANT Crosshair Codes: 300+ Working Profiles',
      intro: 'Search by pro player or style, test each shape on a map, and copy a working profile code straight into VALORANT.',
      gridTitle: 'Crosshair library',
      gridBody: 'Pick a style, preview it, then copy the code.',
    },
    topics: { title: 'Start with a collection' },
    collections: {
      best: {
        label: 'Start here', eyebrow: 'NOT SURE WHAT TO PICK?', title: 'Best VALORANT Crosshair Codes to Try First', intro: 'A curated starting set for ranked, headshots, one-taps, and players who are still finding their aim style.', gridTitle: 'Compare these crosshairs',
        body: ['The best VALORANT crosshair is not automatically the smallest or the one used by the biggest pro. It should stay visible during a fight, mark the center quickly, and leave enough of the enemy head uncovered.', 'This shortlist mixes open-center classics, compact dots, and tight pro layouts. Test every pick on the same map scene, then keep the one you can find fastest after looking away from the center.'],
        faq: [['What is the best VALORANT crosshair?', 'A compact, static crosshair that stays visible without covering the target is the safest starting point. The right size and gap still depend on your screen and aim style.'], ['What crosshair is best for beginners?', 'A short four-line cross with a small open center is usually easier to track than a micro dot. Start visible, then reduce the size only if it still feels clear.'], ['What crosshair is best for headshots?', 'Use a compact dot or short cross that leaves the head visible. The crosshair gives you a reference; head-level placement and stopping before the shot do the real work.'], ['What color should I use?', 'Cyan and green are reliable first tests because they stand out on many maps. Compare the same shape in both colors before copying it.']],
        relatedArticleKeys: ['placement', 'dotVsCross', 'settings'], relatedToolKeys: ['comparison', 'preview'],
        metaTitle: '8 Working VALORANT Crosshair Codes for Ranked | AimCodes', metaDescription: 'Try 8 working VALORANT crosshair codes for ranked, headshots, beginners and one-taps. Preview every pick on a map and copy the code.',
      },
      pro: {
        label: 'Pro crosshairs', eyebrow: 'PRO PLAYER CODES', title: 'VALORANT pro player crosshair codes', intro: 'Preview and copy setups associated with TenZ, aspas, f0rsakeN, Demon1, Sacy, Saadhak, mwzera, Cortezia, Sato, and more.', gridTitle: 'Pro crosshairs in this collection',
        body: ['Pro players often switch settings, so a player name is a strong starting point rather than a permanent rule. The useful part is the shape: gap, line length, dot size, and visibility.', 'Open every code on the same map scene, compare how quickly you reacquire the center, and copy the version that fits your own screen.'],
        faq: [['Do pro players always use the same crosshair?', 'No. Pros can change crosshairs between patches, maps, or even matches. Treat each code as a tested starting point.'], ['Which pro crosshair is easiest to start with?', 'TenZ and Jinggg use compact line-based shapes that are easier to track than a very small dot for many players.'], ['Can I change a pro crosshair color?', 'Yes. Changing the color keeps the original shape, and AimCodes updates the copied profile code to match your choice.']],
        metaTitle: 'VALORANT Pro Player Crosshair Codes | AimCodes', metaDescription: 'Preview and copy VALORANT pro player crosshair codes for TenZ, aspas, Sacy, Saadhak, mwzera, Demon1, f0rsakeN, and more.',
      },
      dot: {
        label: 'Dot crosshairs', eyebrow: 'SMALL CENTER, CLEAN SCREEN', title: 'VALORANT dot crosshair codes', intro: 'Compare pure center dots first, then try a few micro-cross alternatives when a single point is too easy to lose.', gridTitle: 'Dot crosshairs to compare',
        body: ['A pure dot crosshair uses one center mark with the inner and outer lines turned off. It keeps the target visible and gives first bullets and head-level placement one exact reference point.', 'The tradeoff is visibility: the smaller the dot, the easier it is to lose in utility or bright scenery. Start with the true dots in this collection; if they disappear, compare a thicker point or micro cross before changing your whole setup.'],
        selectionTitle: 'Choose the dot you can still find in a fight', selection: ['Start with a thicker dot or micro cross before trying a one-pixel point.', 'Use the same map and color when comparing shapes.', 'Look away from the center, snap back, and keep the dot you find first.'],
        settingsTitle: 'A reliable dot starting point', settings: ['Center dot: on; inner and outer lines: off for a pure dot.', 'Opacity: full; size: small but still visible at your resolution.', 'Outline: thin and optional; cyan or green if the dot blends into the map.'],
        faq: [['Is a dot crosshair good in VALORANT?', 'It can be excellent for precise taps and disciplined placement. Players who spray often may prefer short lines around the center.'], ['What dot size should I use?', 'Start small but clearly visible at your resolution. If you lose it during movement, use a thicker dot or add short inner lines.'], ['Can a dot crosshair have an outline?', 'Yes. An outline improves contrast on bright backgrounds, although a heavy outline can make the dot look larger.']],
        relatedCollectionKeys: ['small', 'oneTap', 'circle'], relatedArticleKeys: ['makeDot', 'dotVsCross'], relatedToolKeys: ['preview', 'generator'],
        metaTitle: 'VALORANT Dot Crosshair Codes & Preview | AimCodes', metaDescription: 'Compare working VALORANT dot crosshair codes on real map scenes. Test compact dots and micro crosses, change color, and copy the final code.',
      },
      cute: {
        label: 'Cute crosshairs', eyebrow: 'CUTE, BUT STILL AIMABLE', title: 'Cute VALORANT crosshair codes', intro: 'Cat, pig, heart, flower, and bunny crosshairs that are playful on screen and still keep a clear aiming center.', gridTitle: 'Cute crosshairs in this collection',
        body: ['Cute crosshairs are built from the same valid profile settings as competitive layouts. The difference is how the lines and dots combine into a recognizable shape.', 'Open Cat, Pig, Heart, Flower, and Bunny on the same map before queueing. The faces are bolder, while Heart and Flower keep more of the target visible.'],
        faq: [['Do cute VALORANT crosshair codes work in game?', 'Yes. Every code in this collection is parsed and validated by AimCodes before it is published.'], ['Which cute crosshair is the smallest?', 'The heart and flower options are more compact than the cat and pig faces. Preview them on a map to compare the real screen space.'], ['Can I recolor a cat or heart crosshair?', 'Yes. Pick a preset color and the copied code will keep the shape while using the new color.']],
        relatedArticleKeys: ['colors'], relatedToolKeys: ['preview', 'generator'],
        metaTitle: 'Cute VALORANT Crosshair Codes: Cat, Heart & More | AimCodes', metaDescription: 'Try working cute VALORANT crosshair codes including cat, pig, heart, flower, and bunny shapes. Preview, recolor, and copy each code.',
      },
      small: {
        label: 'Small crosshairs', eyebrow: 'LESS SCREEN, CLEAR CENTER', title: 'Small & tiny VALORANT crosshair codes', intro: 'Compare tiny dots, compact pro layouts, and short-line crosshairs without covering distant targets.', gridTitle: 'Small crosshairs to compare',
        body: ['A small crosshair leaves more of the target visible and makes head-level placement easier to judge. The smallest VALORANT crosshair is not automatically the best one: it still needs to be easy to recover after a fast turn.', 'This collection separates three useful styles: tiny center dots for the cleanest view, short closed crosses for a stronger center, and open micro crosses that leave the head visible. Compare them on the same scene before changing thickness, gap, or color.'],
        selectionTitle: 'Pick the smallest crosshair you can still track', selection: ['Start with a short cross, then move to a tiny dot only if the center stays visible.', 'Compare every shape at normal scale on the same map scene.', 'Keep the smallest option you can find again immediately after looking away.'],
        settingsTitle: 'Small crosshair visibility checks', settings: ['Use full opacity before adding more size.', 'Try cyan, green, or a thin outline when the center blends into a wall.', 'Increase thickness by one step before making every line longer.'],
        faq: [['Is a small crosshair better in VALORANT?', 'It can improve target visibility and precise placement, but only if you can still find it quickly during movement and utility.'], ['What is the smallest VALORANT crosshair?', 'A one-pixel center dot is the smallest possible visual reference, but many players track a tiny four-line cross more reliably.'], ['What is the difference between a small crosshair and a dot?', 'A dot uses one central mark. A small crosshair can use short lines around an open or closed center, giving your eyes more shape to track.'], ['How do I make a small crosshair easier to see?', 'Try cyan or green, add a thin outline, or increase thickness by one step before making the whole shape larger.']],
        relatedCollectionKeys: ['dot', 'oneTap', 'headshot'], relatedArticleKeys: ['makeDot', 'dotVsCross', 'placement'], relatedToolKeys: ['comparison', 'preview'],
        metaTitle: 'Small & Tiny VALORANT Crosshair Codes | AimCodes', metaDescription: 'Compare small and tiny VALORANT crosshair codes on real map scenes. Try micro dots, compact pro layouts and short crosses, then copy a working code.',
      },
    },
    detail: {
      code: 'Crosshair code', copy: 'Copy code', bestFor: 'Best for', tradeoff: 'How it feels', settings: 'Key settings', import: 'Take it into VALORANT', related: 'Try another crosshair', compareStyle: 'Compare this style',
      importSteps: ['Open Settings in VALORANT.', 'Choose Crosshair, then Import Profile Code.', 'Paste the code and save the new profile.'],
      defaultBest: 'Players who want a clear, repeatable reference point without covering the target.',
      defaultTradeoff: 'Test it on your usual resolution and map brightness before taking it into ranked.',
    },
    guide: {
      eyebrow: '60-SECOND SETUP',
      title: 'How to Import a Crosshair Code in VALORANT',
      intro: 'Copy a profile code, open Settings → Crosshair → Import Profile Code, paste it, and save. The full guide also covers exporting, spectator copy, and common import errors.',
      steps: [
        ['Copy a code', 'Open a crosshair page on AimCodes and press Copy code.'],
        ['Open Crosshair settings', 'In VALORANT, open Settings → Crosshair and choose Import Profile Code.'],
        ['Paste and test', 'Paste the code, name the profile, and try it in the practice range before queueing.'],
      ],
      cta: 'Browse crosshair codes',
    },
    footer: { browse: 'Crosshair codes', resources: 'Guides & tools', finder: 'Reaction test', guide: 'Import guide', best: 'Popular picks', pro: 'Pro crosshairs', cute: 'Cute crosshairs', dot: 'Dot crosshairs', small: 'Small crosshairs', settings: 'Crosshair settings', colors: 'Crosshair colors', note: 'Built for faster crosshair testing.', email: 'Email AimCodes', trust: 'Site information', about: 'How we check codes', privacy: 'Privacy & cookies', terms: 'Terms & fan content', contact: 'Report a problem', independent: 'Independent fan project. Not affiliated with Riot Games.' },
    notFound: { title: 'That crosshair missed', body: 'This page does not exist. Head back to the crosshair catalog and pick another one.', action: 'Browse crosshairs' },
    meta: {
      homeTitle: '300+ VALORANT Aim Codes & Crosshair Codes | AimCodes',
      homeDescription: 'Copy 300+ working VALORANT aim and crosshair codes. Preview pro, dot, small and fun profiles on real maps, change colors, and pick your next code.',
      catalogTitle: '300+ Working VALORANT Crosshair Codes | AimCodes',
      catalogDescription: 'Browse 300+ working VALORANT crosshair codes by style and use case. Preview each profile on a map, change its color, and copy the code.',
      finderTitle: 'VALORANT Reaction Time Test & Crosshair Picker | AimCodes',
      finderDescription: 'Test your reaction time in three rounds, get a playful VALORANT rank, and receive one crosshair recommendation you can preview and copy.',
      guideTitle: 'How to Import a Crosshair Code in VALORANT | AimCodes',
      guideDescription: 'Learn how to import, export, share, and troubleshoot VALORANT crosshair profile codes, including spectator copy commands and common fixes.',
    },
  },
  es: {
    home: {
      tryNow: 'Probar esta mira',
      eyebrow: 'LABORATORIO DE MIRAS DE VALORANT',
      title: 'Códigos de mira de VALORANT para probar antes de copiar',
      intro: 'Empieza con códigos de mira que funcionan, pruébalos sobre mapas reales, cambia el color y copia el que más te guste.',
      primary: 'Ver todas las miras', secondary: 'Hacer la prueba de reacción', popular: 'Miras populares', popularBody: 'Empieza por miras de estilo profesional y algunas opciones divertidas.',
    },
    catalog: { eyebrow: 'MÁS DE 60 CÓDIGOS', title: 'Explora códigos de mira de VALORANT', intro: 'Busca por jugador o estilo, prueba cada forma y copia el código directamente en VALORANT.', gridTitle: 'Biblioteca de miras', gridBody: 'Elige un estilo, pruébalo y copia el código.' },
    topics: { title: 'Empieza por una colección' },
    collections: {
      best: {
        label: 'Empieza aquí', eyebrow: '¿NO SABES CUÁL ELEGIR?', title: 'Miras de VALORANT que vale la pena probar', intro: 'Una selección rápida para competitivo, primeras balas limpias y cambios de objetivo, lista para probar y copiar.', gridTitle: 'Prueba primero estas miras',
        body: ['No existe una única mira perfecta para todos. El mejor punto de partida es una forma limpia que se vea bien sin tapar la cabeza.', 'Esta selección mezcla centros abiertos, puntos compactos y configuraciones de pros. Pruébalas en el mismo mapa y quédate con la que tus ojos encuentren más rápido.'],
        faq: [['¿Qué hace que una mira de VALORANT sea buena?', 'Debe verse con claridad, marcar bien el centro y no ocultar al rival. El tamaño y el hueco dependen de tu forma de apuntar.'], ['¿Es mejor empezar con punto o con cruz?', 'Una cruz pequeña con centro abierto suele ser más fácil de seguir. El punto puede sentirse más preciso, pero también se pierde con más facilidad.'], ['¿Qué color de mira funciona mejor?', 'El cian y el verde destacan en muchos mapas. En AimCodes puedes probar seis colores antes de copiar el código final.']],
        relatedArticleKeys: ['placement', 'dotVsCross', 'settings'], relatedToolKeys: ['comparison', 'preview'],
        metaTitle: 'Mejores códigos de mira de VALORANT | AimCodes', metaDescription: 'Prueba 8 de las mejores miras de VALORANT en mapas reales. Compara configuraciones pro, puntos y formas compactas, cambia el color y copia el código.',
      },
      pro: {
        label: 'Miras de pros', eyebrow: 'CÓDIGOS DE JUGADORES PRO', title: 'Códigos de mira de jugadores profesionales de VALORANT', intro: 'Prueba y copia las configuraciones de TenZ, aspas, f0rsakeN, Demon1, Sacy, Saadhak, mwzera, Cortezia, Sato y más.', gridTitle: 'Miras profesionales de esta colección',
        body: ['Los profesionales cambian sus ajustes con frecuencia, así que el nombre del jugador es un buen punto de partida, no una regla permanente. Lo importante es la forma, el hueco y la visibilidad.', 'Abre cada código sobre el mismo mapa, compara cuánto tardas en recuperar el centro y copia la opción que mejor encaje con tu pantalla.'],
        faq: [['¿Los profesionales usan siempre la misma mira?', 'No. Pueden cambiarla entre parches, mapas o partidas. Usa cada código como un punto de partida ya probado.'], ['¿Qué mira profesional es más fácil para empezar?', 'Las formas compactas con líneas de TenZ y Jinggg suelen ser más fáciles de seguir que un punto muy pequeño.'], ['¿Puedo cambiar el color de una mira profesional?', 'Sí. AimCodes conserva la forma y actualiza el código copiado con el color que elijas.']],
        metaTitle: 'Códigos de mira de pros de VALORANT | AimCodes', metaDescription: 'Prueba y copia miras de pros de VALORANT como TenZ, aspas, Sacy, Saadhak, mwzera, Demon1, f0rsakeN y más.',
      },
      dot: {
        label: 'Miras de punto', eyebrow: 'CENTRO PEQUEÑO, PANTALLA LIMPIA', title: 'Códigos de mira de punto de VALORANT', intro: 'Puntos compactos y microcruces para quienes buscan un centro preciso con el mínimo ruido en pantalla.', gridTitle: 'Miras de punto para comparar',
        body: ['Las miras de punto dejan visible al rival y muestran el centro exacto. Funcionan bien para primeras balas tranquilas y una colocación disciplinada.', 'El riesgo es perderlas entre habilidades o fondos claros. Prueba la misma forma en cian, verde, amarillo y rojo antes de decidir.'],
        selectionTitle: 'Elige el punto que no desaparece en el duelo', selection: ['Empieza con un punto grueso o una microcruz antes de bajar a un solo píxel.', 'Compara todas las formas en el mismo mapa y con el mismo color.', 'Aparta la vista, vuelve al centro y quédate con la que encuentres primero.'],
        settingsTitle: 'Una base fiable para empezar', settings: ['Punto central: activado; líneas interiores y exteriores: desactivadas para un punto puro.', 'Opacidad: completa; tamaño: pequeño, pero visible en tu resolución.', 'Contorno: fino y opcional; prueba cian o verde si el punto se pierde en el mapa.'],
        faq: [['¿Es buena una mira de punto en VALORANT?', 'Puede ser excelente para taps precisos. Si disparas muchas ráfagas, quizá prefieras líneas cortas alrededor del centro.'], ['¿Qué tamaño de punto debería usar?', 'Empieza con uno pequeño pero visible en tu resolución. Si lo pierdes al moverte, usa un punto más grueso o añade líneas cortas.'], ['¿Puede llevar contorno una mira de punto?', 'Sí. El contorno mejora el contraste en fondos claros, aunque uno muy grueso hará que el punto parezca mayor.']],
        relatedCollectionKeys: ['small', 'oneTap', 'circle'], relatedArticleKeys: ['makeDot', 'dotVsCross'], relatedToolKeys: ['preview', 'generator'],
        metaTitle: 'Códigos de mira de punto de VALORANT | AimCodes', metaDescription: 'Compara códigos de mira de punto de VALORANT en mapas reales. Prueba puntos compactos y microcruces, cambia el color y copia el código.',
      },
      cute: {
        label: 'Miras bonitas', eyebrow: 'BONITAS Y TODAVÍA APUNTAN', title: 'Códigos de miras bonitas de VALORANT', intro: 'Miras de gato, cerdito, corazón, flor y conejo con un centro reconocible para seguir apuntando.', gridTitle: 'Miras bonitas de esta colección',
        body: ['Estas miras usan los mismos ajustes válidos que una configuración competitiva. La diferencia está en cómo las líneas y los puntos forman una figura reconocible.', 'Prueba Gato, Cerdito, Corazón, Flor y Conejo sobre el mismo mapa antes de jugar. Las caras son más grandes; Corazón y Flor dejan ver mejor al rival.'],
        faq: [['¿Funcionan en el juego estas miras bonitas?', 'Sí. AimCodes analiza y valida todos los códigos de esta colección antes de publicarlos.'], ['¿Cuál ocupa menos espacio?', 'El corazón y la flor son más compactos que las caras de gato y cerdito. Compáralos sobre un mapa para verlo.'], ['¿Puedo cambiar el color del gato o el corazón?', 'Sí. Elige un color y el código copiado conservará la forma con el nuevo tono.']],
        relatedArticleKeys: ['colors'], relatedToolKeys: ['preview', 'generator'],
        metaTitle: 'Miras bonitas de VALORANT: gato, corazón y más | AimCodes', metaDescription: 'Prueba miras bonitas de VALORANT con formas de gato, cerdito, corazón, flor y conejo. Cambia el color y copia códigos que funcionan.',
      },
      small: {
        label: 'Miras pequeñas', eyebrow: 'MENOS PANTALLA, CENTRO CLARO', title: 'Códigos de miras pequeñas de VALORANT', intro: 'Puntos compactos y cruces de líneas cortas para apuntar con precisión sin tapar objetivos lejanos.', gridTitle: 'Miras pequeñas para comparar',
        body: ['Una mira pequeña deja más visible al rival y facilita mantener la altura de la cabeza. La mejor opción sigue siendo lo bastante grande para recuperarla después de un giro rápido.', 'Esta colección mezcla micropuntos, centros abiertos y líneas muy compactas. Compáralas sobre la misma escena antes de elegir más grosor, hueco o contraste.'],
        selectionTitle: 'Elige la mira más pequeña que todavía puedas seguir', selection: ['Empieza con una cruz corta y prueba un micropunto solo si no lo pierdes.', 'Compara todas a escala normal y sobre el mismo mapa.', 'Quédate con la opción más pequeña que vuelves a encontrar de inmediato.'],
        settingsTitle: 'Comprueba la visibilidad antes de copiar', settings: ['Usa opacidad completa antes de aumentar el tamaño.', 'Prueba cian, verde o un contorno fino si se pierde en la pared.', 'Aumenta primero un nivel el grosor antes de alargar todas las líneas.'],
        faq: [['¿Es mejor una mira pequeña en VALORANT?', 'Puede mejorar la visibilidad del objetivo y la precisión, siempre que puedas encontrarla rápido entre movimiento y habilidades.'], ['¿Qué diferencia hay entre una mira pequeña y un punto?', 'El punto usa una sola marca central. Una mira pequeña puede usar líneas cortas alrededor de un centro abierto o cerrado.'], ['¿Cómo hago más visible una mira pequeña?', 'Prueba cian o verde, añade un contorno fino o aumenta un nivel el grosor antes de agrandar toda la forma.']],
        relatedCollectionKeys: ['dot', 'oneTap', 'headshot'], relatedArticleKeys: ['makeDot', 'dotVsCross', 'placement'], relatedToolKeys: ['comparison', 'preview'],
        metaTitle: 'Códigos de miras pequeñas de VALORANT | AimCodes', metaDescription: 'Prueba miras pequeñas de VALORANT en mapas reales. Compara micropuntos, configuraciones pro compactas y cruces cortas, cambia el color y copia el código.',
      },
    },
    detail: {
      code: 'Código de mira', copy: 'Copiar código', bestFor: 'Ideal para', tradeoff: 'Qué sensación da', settings: 'Ajustes principales', import: 'Llévala a VALORANT', related: 'Prueba otra mira', compareStyle: 'Compara este estilo',
      importSteps: ['Abre los ajustes de VALORANT.', 'Entra en Mira y elige Importar código de perfil.', 'Pega el código y guarda el perfil.'],
      defaultBest: 'Jugadores que buscan una referencia clara y estable sin tapar al rival.', defaultTradeoff: 'Pruébala con tu resolución y el brillo habitual del mapa antes de usarla en competitivo.',
    },
    guide: {
      eyebrow: 'LISTO EN 60 SEGUNDOS', title: 'Cómo importar un código de mira en VALORANT', intro: 'Copia un código, abre Ajustes → Mira → Importar código de perfil, pégalo y guarda. Después puedes exportar, copiar al observar y resolver errores comunes.',
      steps: [['Copia un código', 'Abre una mira en AimCodes y pulsa Copiar código.'], ['Abre los ajustes de mira', 'En VALORANT, abre Ajustes → Mira y elige Importar código de perfil.'], ['Pega y prueba', 'Pega el código, ponle un nombre y pruébalo en el campo de tiro antes de jugar.']], cta: 'Ver códigos de mira',
    },
    footer: { browse: 'Códigos de mira', resources: 'Guías y herramientas', finder: 'Prueba de reacción', guide: 'Guía de importación', best: 'Recomendadas', pro: 'Miras de pros', cute: 'Miras bonitas', dot: 'Miras de punto', small: 'Miras pequeñas', settings: 'Ajustes de mira', colors: 'Colores de mira', note: 'Hecho para probar miras más rápido.', email: 'Escribe a AimCodes', trust: 'Información del sitio', about: 'Cómo comprobamos los códigos', privacy: 'Privacidad y cookies', terms: 'Términos y contenido de fans', contact: 'Avisar de un problema', independent: 'Proyecto independiente de fans. No afiliado a Riot Games.' },
    notFound: { title: 'Esta mira falló el tiro', body: 'La página no existe. Vuelve al catálogo y elige otra mira.', action: 'Ver miras' },
    meta: {
      homeTitle: 'Códigos de mira de VALORANT y vista previa | AimCodes', homeDescription: 'Prueba códigos de mira de VALORANT en mapas reales, cambia colores, copia códigos y encuentra tu próxima mira con una prueba de reacción.',
      catalogTitle: '300+ códigos de mira de VALORANT | AimCodes', catalogDescription: 'Explora más de 300 códigos de mira de VALORANT que funcionan. Filtra por estilo y uso, prueba cada mira y copia el código.',
      finderTitle: 'Prueba de reacción y selector de mira de VALORANT | AimCodes', finderDescription: 'Mide tu reacción en tres rondas, consigue un rango divertido de VALORANT y recibe una mira para probar y copiar.',
      guideTitle: 'Cómo importar un código de mira en VALORANT | AimCodes', guideDescription: 'Aprende a importar, exportar, compartir y corregir códigos de mira de VALORANT, incluido el comando para copiar mientras observas.',
    },
  },
  'pt-BR': {
    home: {
      tryNow: 'Testar esta mira',
      eyebrow: 'LABORATÓRIO DE MIRAS DO VALORANT', title: 'Códigos de mira do VALORANT para testar antes de copiar', intro: 'Comece com códigos de mira que funcionam, teste em mapas reais, troque a cor e copie o que combina com você.', primary: 'Ver todas as miras', secondary: 'Fazer o teste de reação', popular: 'Miras populares', popularBody: 'Comece por opções de estilo profissional e algumas escolhas divertidas.',
    },
    catalog: { eyebrow: 'MAIS DE 60 CÓDIGOS', title: 'Explore códigos de mira do VALORANT', intro: 'Busque por jogador ou estilo, teste cada formato e copie o código direto para o VALORANT.', gridTitle: 'Biblioteca de miras', gridBody: 'Escolha um estilo, teste e copie o código.' },
    topics: { title: 'Comece por uma coleção' },
    collections: {
      best: {
        label: 'Comece aqui', eyebrow: 'NÃO SABE QUAL ESCOLHER?', title: 'Miras do VALORANT que valem o teste', intro: 'Uma seleção rápida para ranqueada, primeiro tiro limpo e troca de alvo, pronta para testar e copiar.', gridTitle: 'Teste estas miras primeiro',
        body: ['Não existe uma mira perfeita para todo mundo. O melhor ponto de partida é um formato limpo, visível e que não esconda a cabeça do alvo.', 'Esta seleção mistura centros abertos, pontos compactos e configurações de profissionais. Teste todas no mesmo mapa e escolha a que seus olhos encontram mais rápido.'],
        faq: [['O que faz uma mira do VALORANT ser boa?', 'Ela precisa aparecer com clareza, marcar o centro e não esconder o alvo. O tamanho e o espaço central dependem do seu jeito de mirar.'], ['É melhor começar com ponto ou cruz?', 'Uma cruz pequena com centro aberto costuma ser mais fácil de acompanhar. O ponto pode ser mais preciso, mas também some com mais facilidade.'], ['Qual cor de mira funciona melhor?', 'Ciano e verde se destacam em muitos mapas. No AimCodes você testa seis cores antes de copiar o código final.']],
        relatedArticleKeys: ['placement', 'dotVsCross', 'settings'], relatedToolKeys: ['comparison', 'preview'],
        metaTitle: 'Melhores códigos de mira do VALORANT | AimCodes', metaDescription: 'Teste 8 das melhores miras do VALORANT em mapas reais. Compare miras pro, pontos e formatos compactos, troque a cor e copie o código.',
      },
      pro: {
        label: 'Miras de pro', eyebrow: 'CÓDIGOS DE JOGADORES PRO', title: 'Códigos de mira de jogadores profissionais do VALORANT', intro: 'Teste e copie as configurações de TenZ, aspas, f0rsakeN, Demon1, Sacy, Saadhak, mwzera, Cortezia, Sato e mais.', gridTitle: 'Miras profissionais desta coleção',
        body: ['Jogadores profissionais trocam ajustes com frequência, então o nome do jogador é um bom ponto de partida, não uma regra permanente. O que importa é o formato, o espaço e a visibilidade.', 'Abra cada código no mesmo mapa, compare quanto tempo leva para reencontrar o centro e copie a opção que combina com a sua tela.'],
        faq: [['Os profissionais usam sempre a mesma mira?', 'Não. Eles podem mudar entre patches, mapas ou partidas. Use cada código como um ponto de partida já testado.'], ['Qual mira profissional é mais fácil para começar?', 'Os formatos compactos com linhas de TenZ e Jinggg costumam ser mais fáceis de acompanhar do que um ponto muito pequeno.'], ['Posso mudar a cor de uma mira profissional?', 'Sim. O AimCodes mantém o formato e atualiza o código copiado com a cor escolhida.']],
        metaTitle: 'Códigos de mira de pro do VALORANT | AimCodes', metaDescription: 'Teste e copie miras de pros do VALORANT como TenZ, aspas, Sacy, Saadhak, mwzera, Demon1, f0rsakeN e mais.',
      },
      dot: {
        label: 'Miras de ponto', eyebrow: 'MIRA PONTINHO, TELA LIMPA', title: 'Códigos de mira de ponto do VALORANT', intro: 'Teste miras de ponto, pontinhos compactos e microcruzes sem precisar importar cada código no jogo.', gridTitle: 'Miras de ponto para testar e copiar',
        body: ['A mira ponto deixa o alvo visível e mostra o centro exato. É uma boa escolha para primeiro tiro controlado, one tap e posicionamento na linha da cabeça.', 'O risco é perder o ponto entre habilidades ou cenários claros. Teste o mesmo formato em ciano, verde, amarelo e vermelho; se ainda sumir, aumente a espessura antes de trocar toda a mira.'],
        selectionTitle: 'Escolha o ponto que não some na trocação', selection: ['Comece com um ponto mais grosso ou microcruz antes de testar um único pixel.', 'Compare todas as opções no mesmo mapa e com a mesma cor.', 'Desvie o olhar, volte ao centro e fique com a mira que você reencontra primeiro.'],
        settingsTitle: 'Uma configuração de ponto para começar', settings: ['Ponto central: ligado; linhas internas e externas: desligadas para um ponto puro.', 'Opacidade: total; tamanho: pequeno, mas ainda visível na sua resolução.', 'Contorno: fino e opcional; use ciano ou verde quando o ponto sumir no cenário.'],
        faq: [['Mira ponto é boa no VALORANT?', 'Pode ser ótima para taps precisos e para treinar a linha da cabeça. Se você usa rajadas longas, talvez prefira uma microcruz com linhas curtas.'], ['Como fazer uma mira de ponto no VALORANT?', 'Você pode ativar apenas o ponto central ou usar linhas internas muito curtas. Abra o guia ligado abaixo para copiar uma base que funciona e ajustar o tamanho.'], ['Qual tamanho de ponto devo usar?', 'Comece pequeno, mas visível na sua resolução. Se perder durante o movimento, aumente a espessura ou use linhas curtas.'], ['Uma mira de ponto pode ter contorno?', 'Sim. O contorno melhora o contraste em fundos claros, mas um contorno pesado faz o ponto parecer maior.']],
        relatedCollectionKeys: ['small', 'oneTap', 'circle'], relatedArticleKeys: ['makeDot', 'dotVsCross'], relatedToolKeys: ['preview', 'generator'],
        metaTitle: 'Mira Ponto VALORANT: Códigos de Pontinho | AimCodes', metaDescription: 'Teste códigos de mira ponto e mira pontinho do VALORANT em mapas reais. Compare formatos, troque a cor e copie uma configuração que funciona.',
      },
      cute: {
        label: 'Miras fofas', eyebrow: 'FOFAS E AINDA DÁ PARA MIRAR', title: 'Códigos de miras fofas do VALORANT', intro: 'Miras de gato, porquinho, coração, flor e coelho com um centro claro para continuar acertando.', gridTitle: 'Miras fofas desta coleção',
        body: ['Essas miras usam os mesmos ajustes válidos de uma configuração competitiva. A diferença está em como linhas e pontos formam um desenho reconhecível.', 'Teste Gato, Porquinho, Coração, Flor e Coelho no mesmo mapa antes da partida. Os rostos são maiores; Coração e Flor deixam mais do alvo visível.'],
        faq: [['Essas miras fofas funcionam no jogo?', 'Sim. O AimCodes analisa e valida todos os códigos desta coleção antes de publicar.'], ['Qual mira fofa ocupa menos espaço?', 'O coração e a flor são mais compactos que os rostos de gato e porquinho. Compare no mapa para ver a diferença.'], ['Posso mudar a cor do gato ou do coração?', 'Sim. Escolha uma cor e o código copiado manterá o formato com o novo tom.']],
        relatedArticleKeys: ['colors'], relatedToolKeys: ['preview', 'generator'],
        metaTitle: 'Miras fofas do VALORANT: gato, coração e mais | AimCodes', metaDescription: 'Teste miras fofas do VALORANT em formato de gato, porquinho, coração, flor e coelho. Troque a cor e copie códigos que funcionam.',
      },
      small: {
        label: 'Miras pequenas', eyebrow: 'MENOS TELA, CENTRO CLARO', title: 'Códigos de miras pequenas do VALORANT', intro: 'Pontos compactos e cruzes de linhas curtas para mirar com precisão sem cobrir alvos distantes.', gridTitle: 'Miras pequenas para comparar',
        body: ['Uma mira pequena deixa o alvo mais visível e facilita manter a linha da cabeça. A melhor opção ainda precisa ser grande o bastante para você reencontrar depois de um giro rápido.', 'Esta coleção mistura micropontos, centros abertos e linhas compactas. Compare na mesma cena antes de escolher mais espessura, espaço ou contraste.'],
        selectionTitle: 'Escolha a menor mira que você ainda consegue acompanhar', selection: ['Comece com uma cruz curta e teste o microponto só se ele não sumir.', 'Compare tudo em escala normal e no mesmo mapa.', 'Fique com a menor opção que você reencontra imediatamente.'],
        settingsTitle: 'Confira a visibilidade antes de copiar', settings: ['Use opacidade total antes de aumentar o tamanho.', 'Teste ciano, verde ou um contorno fino se o centro sumir na parede.', 'Aumente primeiro um nível da espessura antes de alongar todas as linhas.'],
        faq: [['Mira pequena é melhor no VALORANT?', 'Pode melhorar a visibilidade do alvo e a precisão, desde que você ainda encontre o centro rápido durante movimento e habilidades.'], ['Qual é a diferença entre mira pequena e ponto?', 'O ponto usa uma única marca central. A mira pequena pode usar linhas curtas ao redor de um centro aberto ou fechado.'], ['Como deixar uma mira pequena mais visível?', 'Teste ciano ou verde, adicione um contorno fino ou aumente um nível da espessura antes de ampliar todo o formato.']],
        relatedCollectionKeys: ['dot', 'oneTap', 'headshot'], relatedArticleKeys: ['makeDot', 'dotVsCross', 'placement'], relatedToolKeys: ['comparison', 'preview'],
        metaTitle: 'Códigos de Miras Pequenas do VALORANT | AimCodes', metaDescription: 'Teste miras pequenas do VALORANT em mapas reais. Compare micropontos, configurações pro compactas e cruzes curtas, troque a cor e copie o código.',
      },
    },
    detail: {
      code: 'Código da mira', copy: 'Copiar código', bestFor: 'Ideal para', tradeoff: 'Como ela se sente', settings: 'Ajustes principais', import: 'Leve para o VALORANT', related: 'Teste outra mira', compareStyle: 'Compare este estilo',
      importSteps: ['Abra as Configurações do VALORANT.', 'Entre em Mira e escolha Importar código de perfil.', 'Cole o código e salve o perfil.'],
      defaultBest: 'Jogadores que querem uma referência clara e estável sem esconder o alvo.', defaultTradeoff: 'Teste na sua resolução e no brilho normal dos mapas antes de levar para a ranqueada.',
    },
    guide: {
      eyebrow: 'PRONTO EM 60 SEGUNDOS', title: 'Como importar um código de mira no VALORANT', intro: 'Copie o código, abra Configurações → Mira → Importar código de perfil, cole e salve. O guia também cobre exportação, cópia ao assistir e erros comuns.',
      steps: [['Copie um código', 'Abra uma mira no AimCodes e toque em Copiar código.'], ['Abra as opções de mira', 'No VALORANT, abra Configurações → Mira e escolha Importar código de perfil.'], ['Cole e teste', 'Cole o código, dê um nome ao perfil e teste no campo de treino antes da partida.']], cta: 'Ver códigos de mira',
    },
    footer: { browse: 'Códigos de mira', resources: 'Guias e ferramentas', finder: 'Teste de reação', guide: 'Guia de importação', best: 'Mais populares', pro: 'Miras de pro', cute: 'Miras fofas', dot: 'Miras de ponto', small: 'Miras pequenas', settings: 'Configurações de mira', colors: 'Cores de mira', note: 'Feito para testar miras mais rápido.', email: 'Fale com o AimCodes', trust: 'Informações do site', about: 'Como a gente confere os códigos', privacy: 'Privacidade e cookies', terms: 'Termos e conteúdo de fãs', contact: 'Avisar de um problema', independent: 'Projeto independente de fãs. Sem afiliação com a Riot Games.' },
    notFound: { title: 'Essa mira errou o tiro', body: 'A página não existe. Volte ao catálogo e escolha outra mira.', action: 'Ver miras' },
    meta: {
      homeTitle: 'Códigos de mira do VALORANT e prévia ao vivo | AimCodes', homeDescription: 'Teste códigos de mira do VALORANT em mapas reais, troque cores, copie códigos e encontre sua próxima mira com um teste de reação.',
      catalogTitle: '300+ códigos de mira do VALORANT | AimCodes', catalogDescription: 'Explore mais de 300 códigos de mira do VALORANT que funcionam. Filtre por estilo e uso, teste cada mira e copie o código.',
      finderTitle: 'Teste de reação e seletor de mira do VALORANT | AimCodes', finderDescription: 'Teste sua reação em três rodadas, receba um rank divertido do VALORANT e ganhe uma indicação de mira para testar e copiar.',
      guideTitle: 'Como importar um código de mira no VALORANT | AimCodes', guideDescription: 'Aprenda a importar, exportar, compartilhar e corrigir códigos de mira do VALORANT, incluindo o comando para copiar enquanto assiste.',
    },
  },
  'zh-CN': {
    home: {
      tryNow: '立即试用这个准星',
      eyebrow: '无畏契约准星试用站', title: '先试效果，再复制无畏契约准星代码', intro: '先挑一个可用的无畏契约准星代码，在真实地图里试效果、换颜色，再复制顺眼的那一个。', primary: '查看全部准星', secondary: '测试反应速度', popular: '热门准星代码', popularBody: '先从职业选手风格和几款有趣准星开始试。',
    },
    catalog: { eyebrow: '300+ 个可用代码', title: '浏览无畏契约准星代码', intro: '按打法、形状或选手搜索，在地图里试过效果后，直接复制到游戏。', gridTitle: '准星库', gridBody: '挑一个样式，先试效果，再复制代码。' },
    topics: { title: '按类型直接开选' },
    collections: {
      best: {
        label: '先从这里挑', eyebrow: '不知道选谁？', title: '这些准星值得先试', intro: '想打排位、稳第一枪或者快速切目标，都可以先从这组里找手感。', gridTitle: '先试这组准星',
        body: ['准星没有唯一答案。更稳妥的起点，是一个看得清、找得快、又不会挡住头线的简单造型。', '这组准星包含中心留空的十字、小圆点和紧凑职业同款。固定一张地图逐个试，留下你第一眼最容易找到中心的那款。'],
        faq: [['什么样的无畏契约准星算好用？', '中心明确、在多数场景中看得见，同时不遮挡目标。线长、间距和大小要配合你自己的瞄准习惯。'], ['新手更适合小圆点还是十字？', '多数人会更容易跟住中心留空的小十字。小圆点更利于精确单点，但在移动和技能特效里也更容易丢。'], ['准星用什么颜色更显眼？', '青色和绿色在多数地图中比较醒目。AimCodes 可以先试 6 种颜色，再复制最终代码。']],
        relatedArticleKeys: ['placement', 'dotVsCross', 'settings'], relatedToolKeys: ['comparison', 'preview'],
        metaTitle: '无畏契约最佳准星代码推荐 | AimCodes', metaDescription: '在真实地图中试用值得优先尝试的无畏契约准星，对比职业同款、小圆点和紧凑造型，换色后直接复制代码。',
      },
      pro: {
        label: '职业准星', eyebrow: '职业选手同款代码', title: '无畏契约职业选手准星代码', intro: '直接试 TenZ、aspas、f0rsakeN、Demon1、Sacy、Saadhak、mwzera、Cortezia、Sato 等选手的准星。', gridTitle: '本页职业选手准星',
        body: ['职业选手也会频繁更换设置，所以选手名字更适合作为起点，而不是永远不变的标准答案。真正值得比较的是形状、间距、线长和可见度。', '把不同准星放在同一张地图里试，观察自己能多快找回中心，再复制最适合自己屏幕和习惯的那款。'],
        faq: [['职业选手会一直用同一个准星吗？', '不会。选手可能随版本、地图甚至单场比赛更换准星，所以这里的代码更适合作为经过实战验证的起点。'], ['哪款职业准星更适合新手？', 'TenZ 和 Jinggg 的紧凑线条更容易跟住，通常比极小圆点更适合刚开始寻找手感的玩家。'], ['职业准星可以换颜色吗？', '可以。AimCodes 会保留原有形状，同时把你选择的颜色写进最终复制代码。']],
        metaTitle: '无畏契约职业选手准星代码大全 | AimCodes', metaDescription: '预览并复制 TenZ、aspas、Sacy、Saadhak、mwzera、Demon1、f0rsakeN 等职业选手的无畏契约准星代码。',
      },
      dot: {
        label: '小圆点准星', eyebrow: '中心更小，画面更干净', title: '无畏契约小圆点准星代码', intro: '紧凑小圆点和微型十字，适合想要明确中心、又不想让准星遮挡画面的玩家。', gridTitle: '值得对比的小圆点准星',
        body: ['小圆点不会挡住太多目标，也能直接标出精确中心，适合重视第一枪和头线预瞄的玩家。', '代价是容易在技能特效或明亮背景里丢失。确定形状后，再用青、绿、黄、红几种颜色试一遍，差别会很明显。'],
        selectionTitle: '别选一打架就消失的圆点', selection: ['先从较粗圆点或微型十字开始，再尝试单像素圆点。', '固定同一张地图和颜色，只比较造型。', '视线离开中心再移回来，留下第一眼能找回的那款。'],
        settingsTitle: '一套稳妥的圆点起步参数', settings: ['纯圆点：开启中心点，关闭内线和外线。', '透明度拉满；尺寸尽量小，但必须能在当前分辨率下看清。', '轮廓保持细且按需开启；融进背景时优先试青色或绿色。'],
        faq: [['无畏契约小圆点准星好用吗？', '它很适合精确单点和稳定预瞄。习惯连续扫射的玩家，可能会更喜欢中心周围带短线的造型。'], ['小圆点应该设多大？', '先从小而清楚的尺寸开始。如果移动时经常找不到，就增加点的厚度，或者在周围加几条短线。'], ['小圆点可以加轮廓吗？', '可以。轮廓能提高亮色背景下的对比度，但太粗也会让圆点看起来更大。']],
        relatedCollectionKeys: ['small', 'oneTap', 'circle'], relatedArticleKeys: ['makeDot', 'dotVsCross'], relatedToolKeys: ['preview', 'generator'],
        metaTitle: '无畏契约小圆点准星代码与预览 | AimCodes', metaDescription: '在真实地图中对比可用的无畏契约小圆点准星代码，试用紧凑圆点和微型十字，换色后直接复制。',
      },
      cute: {
        label: '可爱准星', eyebrow: '可爱归可爱，中心也得能瞄', title: '无畏契约可爱准星代码', intro: '猫猫、猪猪、爱心、花朵和兔兔准星，造型够有趣，正中心也仍然看得清。', gridTitle: '本页可爱准星',
        body: ['可爱准星同样由游戏支持的配置参数拼出来，只是线条和中心点组合成了更容易辨认的图案。', '开局前把猫猫、猪猪、爱心、花朵和兔兔放到同一张地图里比一下。猫脸和猪脸更醒目，爱心和花朵则更少遮挡目标。'],
        faq: [['这些可爱准星真的能在游戏里用吗？', '可以。本页所有代码在发布前都经过 AimCodes 解析和可用性校验。'], ['哪款可爱准星占画面更小？', '爱心和花朵比猫脸、猪脸更紧凑。直接放到地图里预览，最容易看出实际占用范围。'], ['猫猫和爱心准星能换颜色吗？', '可以。选择预设颜色后，复制出的代码会保留原图案并同步使用新颜色。']],
        relatedArticleKeys: ['colors'], relatedToolKeys: ['preview', 'generator'],
        metaTitle: '无畏契约可爱准星代码：猫猫、爱心与花朵 | AimCodes', metaDescription: '试用可用的无畏契约可爱准星代码，包括猫猫、猪猪、爱心、花朵和兔兔造型，预览、换色并直接复制。',
      },
      small: {
        label: '小准星', eyebrow: '少挡画面，中心得看得清', title: '无畏契约小准星代码', intro: '微型圆点和短线准星，适合想要精确中心、又不希望遮挡远距离目标的玩家。', gridTitle: '值得对比的小准星',
        body: ['小准星能保留更多目标画面，也更容易判断头线位置。但它不能小到快速转身后连自己都找不到。', '这组准星包含微型圆点、中心留空和紧凑短线。固定同一张场景逐个试，再决定需要加粗中心、扩大间距还是换一个更醒目的颜色。'],
        selectionTitle: '选你还能跟住的最小尺寸', selection: ['先用短十字，确认中心不会丢，再尝试微型圆点。', '固定同一张地图，用正常比例逐个对比。', '视线移开后还能立刻找回的最小款，才是真正适合你的尺寸。'],
        settingsTitle: '复制前先检查可见度', settings: ['先保持满透明度，不要一上来放大整个准星。', '中心融进墙面时，优先试青色、绿色或一层细轮廓。', '先把粗细增加一级，再考虑加长全部线条。'],
        faq: [['无畏契约小准星一定更好吗？', '它能减少遮挡并提高精确定位，但前提是你在移动和技能特效中仍然能快速找到中心。'], ['小准星和小圆点有什么区别？', '小圆点只用一个中心标记；小准星还可以用几条短线围绕留空或闭合中心，更容易让视线跟住。'], ['小准星看不清怎么调整？', '先试青色或绿色，再开一层细轮廓，或者只把粗细提高一级，不要直接把整个造型放大。']],
        relatedCollectionKeys: ['dot', 'oneTap', 'headshot'], relatedArticleKeys: ['makeDot', 'dotVsCross', 'placement'], relatedToolKeys: ['comparison', 'preview'],
        metaTitle: '无畏契约小准星代码与地图预览 | AimCodes', metaDescription: '在真实地图中试用无畏契约小准星代码，对比微型圆点、紧凑职业同款和短线十字，换色后直接复制有效代码。',
      },
    },
    detail: {
      code: '准星代码', copy: '复制代码', bestFor: '适合谁', tradeoff: '手感怎么样', settings: '主要参数', import: '带进无畏契约', related: '再试一个准星', compareStyle: '对比同类准星',
      importSteps: ['打开《无畏契约》设置。', '进入“准星”，点击“导入准星配置代码”。', '粘贴代码并保存新的准星方案。'],
      defaultBest: '想要中心明确、容易重复定位，同时不希望准星遮挡目标的玩家。', defaultTradeoff: '正式排位前，建议用自己的分辨率和常玩地图先试一局。',
    },
    guide: {
      eyebrow: '一分钟完成', title: '无畏契约准星代码怎么导入', intro: '复制代码，打开“设置 → 准星 → 导入准星配置代码”，粘贴并保存。下面还能查看导出、观战复制和报错排查。',
      steps: [['复制准星代码', '打开 AimCodes 的准星页面，点击“复制代码”。'], ['进入准星设置', '打开《无畏契约》设置，进入“准星”，选择“导入准星配置代码”。'], ['粘贴并试用', '粘贴代码、保存方案，先去训练场看看是否顺手。']], cta: '浏览准星代码',
    },
    footer: { browse: '准星代码', resources: '教程与工具', finder: '反应测试', guide: '导入教程', best: '热门推荐', pro: '职业准星', cute: '可爱准星', dot: '小圆点准星', small: '小准星', settings: '准星设置说明', colors: '准星颜色选择', note: '让试准星这件事快一点。', email: '联系 AimCodes', trust: '站点信息', about: '看看我们怎么筛代码', privacy: '隐私与 Cookie', terms: '条款与玩家内容', contact: '反馈问题', independent: '玩家独立项目，与 Riot Games 无隶属关系。' },
    notFound: { title: '这枪空了', body: '这个页面不存在，回准星库再挑一个吧。', action: '返回准星库' },
    meta: {
      homeTitle: '无畏契约准星代码与地图预览 | AimCodes', homeDescription: '在真实地图中预览可用的无畏契约准星代码，自定义颜色，一键复制，还能通过反应测试找到更适合自己的准星。',
      catalogTitle: '300+ 无畏契约准星代码：小点、十字与趣味准星 | AimCodes', catalogDescription: '浏览 300 多个可用的无畏契约准星代码，按打法与样式筛选，预览职业同款、小圆点、小准星和趣味造型，一键复制到游戏。',
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
    en: ['Precise first shots and players who prefer a compact, closed center.', 'The short cyan lines meet in the middle, making the exact center easy to reacquire without covering much of the target.'],
    es: ['Primeros disparos precisos y jugadores que prefieren un centro compacto y cerrado.', 'Las líneas cian cortas se unen en el centro y ayudan a recuperarlo sin tapar demasiado al rival.'],
    'pt-BR': ['Primeiros tiros precisos e quem prefere um centro compacto e fechado.', 'As linhas ciano curtas se encontram no meio e ajudam a reencontrar o centro sem cobrir muito o alvo.'],
    'zh-CN': ['适合重视第一枪、喜欢紧凑闭合中心的玩家。', '四条青色短线在中心闭合，容易快速找回准星，又不会遮住太多目标。'],
  },
  forsaken: {
    en: ['Players who want a tiny sight and plenty of space around the target. It suits calm head-level taps more than long sprays.', 'Minimal marks keep the screen clean. If the white lines disappear in utility or bright walls, try cyan before choosing a larger shape.'],
    es: ['Para quien quiere una mira mínima y mucho espacio alrededor del rival. Va mejor con taps tranquilos a la cabeza que con sprays largos.', 'Las marcas pequeñas limpian la pantalla. Si el blanco se pierde entre habilidades o paredes claras, prueba el cian antes de agrandarla.'],
    'pt-BR': ['Para quem quer uma mira mínima e bastante espaço ao redor do alvo. Combina mais com taps calmos na cabeça do que com sprays longos.', 'As marcas pequenas deixam a tela limpa. Se o branco sumir nas habilidades ou paredes claras, teste ciano antes de aumentar a mira.'],
    'zh-CN': ['适合喜欢极小准星、希望目标周围保持干净的玩家，更偏向稳准的头线单点，不太照顾长扫射。', '几条极短的白线几乎不挡画面；如果在技能和亮墙里容易丢，先换成青色，不必急着放大准星。'],
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
    en: ['Casual games, clips, and players who want the most recognizable animal crosshair. The center is still usable, so the joke does not completely take over your aim.', 'The ears and face are larger than a normal crosshair and can cover distant heads. Switch to Heart if you want a playful shape with less screen coverage.'],
    es: ['Partidas casuales, clips y quien quiere la mira de animal más reconocible. El centro sigue siendo útil, así que la broma no se come toda la puntería.', 'Las orejas y la cara ocupan más que una mira normal y pueden tapar cabezas lejanas. Prueba Corazón si quieres algo divertido y más compacto.'],
    'pt-BR': ['Partidas casuais, clipes e quem quer a mira de animal mais fácil de reconhecer. O centro ainda funciona, então a brincadeira não toma conta da mira.', 'As orelhas e o rosto ocupam mais espaço e podem cobrir cabeças distantes. Teste Coração se quiser um formato divertido e mais compacto.'],
    'zh-CN': ['适合娱乐局、录素材，以及想要一眼就能认出的动物准星。中心点仍然能用，不会为了猫脸彻底放弃瞄准。', '猫耳和脸型会比常规准星更占画面，远距离可能遮头；如果想整活但更紧凑，可以接着试爱心准星。'],
  },
  'pig-pink': {
    en: ['Fun matches and players who want a bold pig crosshair with a clear middle. It is easier to spot than a micro dot when the screen gets busy.', 'The wide face and snout take more space than Cat, Heart, or Flower. Keep it for close fights and clips rather than tiny long-range targets.'],
    es: ['Partidas divertidas y quien quiere una mira de cerdito grande con el centro claro. Se encuentra más rápido que un micropunto cuando la pantalla se llena.', 'La cara y el hocico ocupan más que Gato, Corazón o Flor. Va mejor en peleas cercanas y clips que contra objetivos lejanos.'],
    'pt-BR': ['Partidas divertidas e quem quer uma mira de porquinho marcante com centro claro. É mais fácil de achar que um microponto quando a tela fica cheia.', 'O rosto e o focinho ocupam mais que Gato, Coração ou Flor. Use mais em lutas próximas e clipes do que em alvos distantes.'],
    'zh-CN': ['适合娱乐局，以及想要醒目猪猪造型、同时保留明确中心的玩家。画面一乱，它会比微型小点更容易找回来。', '猪脸和猪鼻比猫猫、爱心和花朵更占画面，近距离整活很合适，远距离小目标就不一定舒服。'],
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
  sacy: {
    en: ['Players who want a familiar 1-4-2-2 setup for clean first bullets and quick target switches.', 'The open cyan center stays readable on most maps, but the four-line shape takes more room than a dot.'],
    es: ['Jugadores que quieren la clásica 1-4-2-2 para primeras balas limpias y cambios rápidos de objetivo.', 'El centro cian abierto se ve bien en la mayoría de mapas, aunque ocupa más que un punto.'],
    'pt-BR': ['Quem quer a clássica 1-4-2-2 para primeiras balas limpas e trocas rápidas de alvo.', 'O centro ciano aberto aparece bem na maioria dos mapas, mas ocupa mais espaço que um ponto.'],
    'zh-CN': ['适合喜欢经典 1-4-2-2 参数、重视第一枪和快速转移目标的玩家。', '青色留空中心在大多数地图都很醒目，但四线造型会比小圆点多占一点画面。'],
  },
  saadhak: {
    en: ['Players who want several reference points around a tiny center for bursts and corrections.', 'The inner and outer layers are easy to track, but add more visual detail than a minimalist crosshair.'],
    es: ['Jugadores que quieren varias referencias alrededor de un centro pequeño para ráfagas y correcciones.', 'Las capas interiores y exteriores se siguen bien, pero añaden más detalle que una mira minimalista.'],
    'pt-BR': ['Quem quer várias referências ao redor de um centro pequeno para rajadas e correções.', 'As camadas internas e externas são fáceis de acompanhar, mas têm mais informação que uma mira minimalista.'],
    'zh-CN': ['适合短点射时需要多层参照、方便修正枪线的玩家。', '中心点和内外线条都容易跟住，但视觉信息会比极简准星更多。'],
  },
  mwzera: {
    en: ['Players who want a very compact closed cross and do not mind testing a dark color.', 'The black center is precise on bright walls but can disappear in shadows; recolor it before changing the shape.'],
    es: ['Jugadores que quieren una cruz cerrada muy compacta y no les importa probar un color oscuro.', 'El centro negro es preciso en paredes claras, pero se pierde en sombras; cambia el color antes que la forma.'],
    'pt-BR': ['Quem quer uma cruz fechada bem compacta e topa testar uma cor escura.', 'O centro preto fica preciso em paredes claras, mas pode sumir nas sombras; troque a cor antes do formato.'],
    'zh-CN': ['适合喜欢极紧凑闭合十字、愿意尝试深色准星的玩家。', '黑色中心在亮墙上很精准，暗处却容易丢；先换颜色，不必急着换造型。'],
  },
  cortezia: {
    en: ['Players who want the exact center marked by a simple outlined dot.', 'The outline keeps the black dot readable on dark areas, though it covers slightly more than an unoutlined micro dot.'],
    es: ['Jugadores que quieren marcar el centro exacto con un punto sencillo y contorneado.', 'El contorno mantiene visible el punto negro en zonas oscuras, aunque tapa algo más que un micropunto sin borde.'],
    'pt-BR': ['Quem quer marcar o centro exato com um ponto simples e contornado.', 'O contorno mantém o ponto preto visível nas áreas escuras, mas cobre um pouco mais que um microponto sem borda.'],
    'zh-CN': ['适合想用一个带轮廓小点直接标记准星中心的玩家。', '轮廓能让黑点在暗处更容易看见，代价是会比无轮廓微型点多遮一点目标。'],
  },
  sato: {
    en: ['Players who want a compact cross with a narrow gap for controlled taps and bursts.', 'The black lines feel clean against bright scenery but need a brighter color on darker corners.'],
    es: ['Jugadores que quieren una cruz compacta con un hueco estrecho para taps y ráfagas controladas.', 'Las líneas negras quedan limpias sobre zonas claras, pero necesitan otro color en esquinas oscuras.'],
    'pt-BR': ['Quem quer uma cruz compacta com espaço estreito para taps e rajadas controladas.', 'As linhas pretas ficam limpas em áreas claras, mas pedem uma cor mais viva nos cantos escuros.'],
    'zh-CN': ['适合喜欢窄间距紧凑十字、以控制单点和短点射为主的玩家。', '黑色短线在亮区很干净，但打暗角时最好换成更亮的颜色。'],
  },
  tteuw: {
    en: ['Players who want a visible center dot with tiny line references around it.', 'The extra inner and outer pixels make the center easy to follow, but movement error can add motion while you move.'],
    es: ['Jugadores que quieren un punto visible con pequeñas referencias alrededor.', 'Los píxeles interiores y exteriores ayudan a seguir el centro, pero el error de movimiento puede añadir movimiento al desplazarte.'],
    'pt-BR': ['Quem quer um ponto visível com pequenas referências ao redor.', 'Os pixels internos e externos ajudam a acompanhar o centro, mas o erro de movimento pode mexer a mira enquanto você anda.'],
    'zh-CN': ['适合想要醒目中心点、又希望周围有极短线条辅助定位的玩家。', '内外小线条更容易跟住中心，但开启移动误差后，走动时准星会发生变化。'],
  },
  'heart-pink': {
    en: ['Clips and casual matches where you want a compact playful shape. It is the easiest step down from the larger Cat and Pig faces.', 'The heart leaves more of a distant target visible, but still has more visual detail than a competitive dot.'],
    es: ['Clips y partidas casuales donde quieres una forma divertida y compacta. Es el cambio más fácil si Gato o Cerdito te parecen demasiado grandes.', 'El corazón deja más visible al rival lejano, aunque sigue teniendo más detalle que un punto competitivo.'],
    'pt-BR': ['Clipes e partidas casuais para quem quer um formato divertido e compacto. É a troca mais fácil se Gato ou Porquinho parecerem grandes demais.', 'O coração deixa mais do alvo distante visível, mas ainda tem mais detalhe que um ponto competitivo.'],
    'zh-CN': ['适合娱乐局和录素材，想整活但又不希望图案太大的玩家；如果猫猫、猪猪太挡，这款最容易接着试。', '爱心会给远距离目标留下更多空间，不过视觉信息仍然比竞技小圆点多。'],
  },
  'flower-pink': {
    en: ['Players who want a recognizable flower without losing the center completely. The balanced petals make it less face-heavy than Cat or Pig.', 'It stays readable around the middle, but is still larger than a pro crosshair. Try cyan if pink blends into warm map areas.'],
    es: ['Para quien quiere una flor reconocible sin perder el centro. Los pétalos equilibrados pesan menos en pantalla que las caras de Gato o Cerdito.', 'El centro se lee bien, pero sigue siendo mayor que una mira pro. Prueba el cian si el rosa se mezcla con zonas cálidas.'],
    'pt-BR': ['Para quem quer uma flor reconhecível sem perder o centro. As pétalas equilibradas pesam menos na tela que os rostos de Gato ou Porquinho.', 'O centro continua legível, mas a mira é maior que uma configuração pro. Teste ciano se o rosa sumir em áreas quentes.'],
    'zh-CN': ['适合想要明显花朵造型、同时仍能辨认中心的玩家。花瓣分布比较均衡，不会像猫脸和猪脸那样把视觉重量压在一块。', '整体仍然大于职业准星；如果粉色在暖色地图区域里不够明显，可以直接换成青色。'],
  },
  'bunny-white': {
    en: ['Casual games and players who want a lighter animal shape than the full Cat or Pig faces. The tall ears stay recognizable without filling the whole center.', 'White looks clean on darker walls but can disappear in bright areas. Recolor it cyan or green before making the shape larger.'],
    es: ['Partidas casuales y quien quiere una forma de animal más ligera que las caras de Gato o Cerdito. Las orejas se reconocen sin llenar todo el centro.', 'El blanco queda limpio sobre paredes oscuras, pero se pierde en zonas claras. Cámbialo a cian o verde antes de agrandarlo.'],
    'pt-BR': ['Partidas casuais e quem quer um formato de animal mais leve que os rostos de Gato ou Porquinho. As orelhas aparecem sem preencher todo o centro.', 'O branco fica limpo em paredes escuras, mas some em áreas claras. Troque para ciano ou verde antes de aumentar a mira.'],
    'zh-CN': ['适合娱乐局，以及想要比猫脸、猪脸更轻一点的动物造型。高高的兔耳很好认，又不会把整个中心塞满。', '白色在暗墙上很干净，但亮区容易丢；先换成青色或绿色，不必为了可见度把图案继续放大。'],
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
  return seoCopy(locale).collections?.[collectionKey]
    || expansionCollectionCopy(locale, collectionKey)
    || seoCopy(locale).collections.best
}

export function detailCopy(locale, crosshairOrId) {
  const crosshairId = typeof crosshairOrId === 'string' ? crosshairOrId : crosshairOrId?.id
  const generated = typeof crosshairOrId === 'object' ? crosshairOrId?.seoDetails?.[locale] : null
  const localized = priorityDetails[crosshairId]?.[locale]
  const base = seoCopy(locale).detail
  return {
    bestFor: generated?.bestFor || localized?.[0] || base.defaultBest,
    tradeoff: generated?.tradeoff || localized?.[1] || base.defaultTradeoff,
  }
}

export function detailHeading(locale, crosshair) {
  const searchName = crosshairDisplayName(locale, crosshair)
  const headings = {
    en: `${searchName} VALORANT crosshair`,
    es: `Mira ${searchName} de VALORANT`,
    'pt-BR': `Mira ${searchName} do VALORANT`,
    'zh-CN': `${searchName} 无畏契约准星`,
  }
  return headings[locale] || headings.en
}

export function crosshairDisplayName(locale, crosshair) {
  return searchDisplayNames[crosshair.id]?.[locale] || crosshair.shortName
}

export function pageSlug(route) {
  if (route.type === 'crosshair') return crosshairSlug(route.crosshairId)
  if (route.type === 'collection') return route.collectionKey
  if (route.type === 'article') return route.articleKey
  if (route.type === 'tool') return route.toolKey
  return route.type
}
