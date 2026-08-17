const shared = {
  en: { eyebrow: 'FIX YOUR CROSSHAIR FAST', summaryTitle: 'Quick answer', cta: 'Crosshairs to test' },
  es: { eyebrow: 'AJUSTA TU MIRA SIN PERDER TIEMPO', summaryTitle: 'Respuesta rápida', cta: 'Miras para probar' },
  'pt-BR': { eyebrow: 'AJUSTE SUA MIRA SEM ENROLAÇÃO', summaryTitle: 'Resposta rápida', cta: 'Miras para testar' },
  'zh-CN': { eyebrow: '少走弯路，直接调准', summaryTitle: '先说结论', cta: '顺手试试这些准星' },
}

const relations = {
  exportCrosshair: { recommendedCrosshairIds: ['tenz', 'aspas-dot', 'forsaken', 'jinggg'], relatedArticleKeys: ['shareCrosshair', 'copy', 'notWorking'], relatedCollectionKeys: ['pro', 'best'], relatedToolKeys: ['decoder', 'preview'] },
  shareCrosshair: { recommendedCrosshairIds: ['tenz', 'aspas-dot', 'heart-pink', 'circle-dot-cyan'], relatedArticleKeys: ['exportCrosshair', 'copy'], relatedCollectionKeys: ['funny', 'best'], relatedToolKeys: ['preview', 'comparison'] },
  resetCrosshair: { recommendedCrosshairIds: ['tenz', 'aspas-dot', 'jinggg', 'small-dot-thick'], relatedArticleKeys: ['saveMultiple', 'settings', 'notWorking'], relatedCollectionKeys: ['beginner', 'minimalist'], relatedToolKeys: ['generator', 'preview'] },
  saveMultiple: { recommendedCrosshairIds: ['tenz', 'aspas-dot', 'jinggg', 'heart-pink'], relatedArticleKeys: ['exportCrosshair', 'resetCrosshair', 'shareCrosshair'], relatedCollectionKeys: ['pro', 'cute'], relatedToolKeys: ['comparison', 'preview'] },
  customColor: { recommendedCrosshairIds: ['tenz', 'jinggg', 'forsaken', 'heart-pink'], relatedArticleKeys: ['colors', 'outlinesOnOff'], relatedCollectionKeys: ['cyan', 'green', 'pink'], relatedToolKeys: ['generator', 'preview'] },
  outlinesOnOff: { recommendedCrosshairIds: ['forsaken', 'demon1', 'tenz', 'needle-cyan'], relatedArticleKeys: ['colors', 'thickness'], relatedCollectionKeys: ['withOutlines', 'withoutOutlines'], relatedToolKeys: ['comparison', 'generator'] },
  centerDotOnOff: { recommendedCrosshairIds: ['aspas-dot', 'demon1', 'tenz', 'jinggg'], relatedArticleKeys: ['makeDot', 'dotVsCross', 'gapOffset'], relatedCollectionKeys: ['centerDot', 'dot'], relatedToolKeys: ['comparison', 'generator'] },
  innerVsOuter: { recommendedCrosshairIds: ['tenz', 'forsaken', 'boaster', 'compact-green'], relatedArticleKeys: ['settings', 'thickness', 'gapOffset'], relatedCollectionKeys: ['minimalist', 'beginner'], relatedToolKeys: ['generator', 'comparison'] },
  thickness: { recommendedCrosshairIds: ['tenz', 'small-dot-thick', 'forsaken', 'compact-green'], relatedArticleKeys: ['outlinesOnOff', 'gapOffset', 'settings'], relatedCollectionKeys: ['thin', 'thick'], relatedToolKeys: ['generator', 'preview'] },
  gapOffset: { recommendedCrosshairIds: ['tenz', 'forsaken', 'jinggg', 'needle-cyan'], relatedArticleKeys: ['centerDotOnOff', 'thickness', 'placement'], relatedCollectionKeys: ['openCenter', 'closed'], relatedToolKeys: ['generator', 'comparison'] },
}

const pages = {
  en: {
    exportCrosshair: {
      title: 'How to export a VALORANT crosshair code',
      intro: 'Turn the profile you already use into one clean code you can back up or send to a teammate.',
      summary: 'Open Settings → Crosshair, select the correct profile, choose Export Profile Code, and copy the full string. Save it as plain text before changing the profile.',
      sections: [
        ['Export the profile you actually use', 'Select the intended crosshair profile before pressing the export icon. Copy the entire code from the first character to the last; a missing segment can make the code fail on import.'],
        ['Keep a backup outside the game', 'Store the code with a clear profile name in notes or a password-free text file. A screenshot is not a backup because it cannot be imported and may hide exact settings.'],
        ['Test the exported code', 'Import the code into a spare profile slot and compare the shape, color, outlines, center dot, and line settings. This catches an incomplete copy before you share it.'],
      ],
      faq: [['Does exporting remove my current crosshair?', 'No. Exporting copies the profile as text; it does not delete the saved profile.'], ['Why is the exported code so long?', 'The string stores multiple crosshair sections and their settings, so it must be copied completely.']],
      metaTitle: 'How to Export a VALORANT Crosshair Code | AimCodes', metaDescription: 'Export a VALORANT crosshair profile as a code, save a clean backup, and test the code before sharing it.',
    },
    shareCrosshair: {
      title: 'How to share a VALORANT crosshair',
      intro: 'Send a profile code that your teammate can import in seconds instead of rebuilding every setting by hand.',
      summary: 'Export the correct profile, send the raw code without extra punctuation, and ask the recipient to paste it into Import Profile Code. Include a preview link only when they want to see the shape first.',
      sections: [
        ['Share the code, not a settings screenshot', 'A profile code preserves the actual color, dot, outlines, and line geometry. A screenshot is useful for context but cannot recreate the profile reliably.'],
        ['Keep the message copy-safe', 'Put the code on its own line. Avoid adding quotation marks, emoji, spaces, or a period directly next to it, because those characters can be copied accidentally.'],
        ['Confirm the result after import', 'The recipient should open the imported profile and test it at normal scale. If the preview differs, compare custom color and outlines before assuming the code is broken.'],
      ],
      faq: [['Can I send a crosshair code in Discord or chat?', 'Yes. Send it as plain text or in a code block so no characters are changed.'], ['Can someone copy my crosshair while spectating?', 'A teammate can use the in-game copy command while spectating you when that feature is available.']],
      metaTitle: 'How to Share a VALORANT Crosshair Code | AimCodes', metaDescription: 'Share a VALORANT crosshair safely with a clean profile code, an optional preview, and a quick import check.',
    },
    resetCrosshair: {
      title: 'How to reset your VALORANT crosshair',
      intro: 'Get back to a clean, predictable profile without losing a setup you may want later.',
      summary: 'Export your current code first, then create or select a clean profile and rebuild only the settings you need. Keep the backup until the replacement has survived a practice session.',
      sections: [
        ['Back up before resetting', 'Export the current profile even if it feels unusable. That gives you a one-click route back and lets you compare exactly what changed.'],
        ['Start clean instead of changing everything at once', 'Use a fresh profile with one compact shape, a visible color, and error animations off. Add outlines only if the center disappears on bright walls.'],
        ['Verify the reset in the range', 'Check a bright wall, a dark wall, and a distant target. Rename the profile only after it feels readable, then remove old experiments later.'],
      ],
      faq: [['Will resetting change weapon accuracy?', 'No. Crosshair settings change the visual reference, not the weapon’s underlying accuracy.'], ['Should I delete my old profile immediately?', 'No. Keep an exported backup until the new setup feels reliable.']],
      metaTitle: 'How to Reset Your VALORANT Crosshair Safely | AimCodes', metaDescription: 'Reset a VALORANT crosshair without losing your old setup: export a backup, build a clean profile, and test it correctly.',
    },
    saveMultiple: {
      title: 'How to save multiple crosshairs in VALORANT',
      intro: 'Keep ranked, training, and fun crosshairs organized so switching profiles does not become another settings menu fight.',
      summary: 'Create separate named profiles, export important codes as backups, and assign each profile one clear job. Delete near-duplicates before your profile list becomes hard to scan.',
      sections: [
        ['Give every profile one purpose', 'Use names such as Ranked Cyan, Training Error, or Funny Cat. A useful name tells you why the profile exists, not only what color it uses.'],
        ['Back up the profiles worth keeping', 'Export the code after a profile feels settled. Store the name and code together so you can restore it even after cleaning up the in-game list.'],
        ['Avoid a list full of tiny variations', 'Keep one baseline, one training profile, and a few deliberate alternatives. If two profiles differ by one value you cannot notice, keep the easier one to recognize.'],
      ],
      faq: [['Can I keep more than one crosshair profile?', 'Yes. VALORANT supports multiple saved profiles that you can name and switch between.'], ['What should I back up?', 'Export any profile you would be annoyed to rebuild, especially custom colors and unusual shapes.']],
      metaTitle: 'How to Save Multiple Crosshairs in VALORANT | AimCodes', metaDescription: 'Organize multiple VALORANT crosshair profiles for ranked, training and fun, with names and export-code backups.',
    },
    customColor: {
      title: 'How to use a custom crosshair color in VALORANT',
      intro: 'Use a hex color that stays visible on your maps and remains separate from the enemy outline.',
      summary: 'Choose Custom in Crosshair Color, enter a valid six-digit hex value, and test it on both bright and dark scenes. Change only the color first so you can judge contrast fairly.',
      sections: [
        ['Start from contrast, not a favorite color', 'A good custom color should stay separate from map surfaces, ability effects, and the enemy highlight. Cyan, green, white, and pink are useful starting families.'],
        ['Enter a clean hex value', 'Use six hexadecimal characters for red, green, and blue. If the value is rejected, remove spaces and symbols, then confirm that every character is 0–9 or A–F.'],
        ['Test before copying the final code', 'Preview one shape in several colors without changing thickness or gap. Once the winner is clear, export or copy the updated profile code.'],
      ],
      faq: [['Does a custom color change the crosshair shape?', 'No. It changes the color while the line, dot, and outline settings stay the same.'], ['Why does my custom color look different in game?', 'Monitor settings, map lighting, outlines, and surrounding colors can change perceived contrast.']],
      metaTitle: 'VALORANT Custom Crosshair Color: Hex Guide | AimCodes', metaDescription: 'Set a custom VALORANT crosshair color with a valid hex value, test contrast, and copy an updated profile code.',
    },
    outlinesOnOff: {
      title: 'VALORANT crosshair outlines: on or off?',
      intro: 'Use outlines to rescue contrast—not as a default layer that makes every small crosshair bulky.',
      summary: 'Turn outlines on when a thin or white crosshair disappears against bright surfaces. Leave them off when the base color is already clear and the extra edge covers too much of a distant target.',
      sections: [
        ['What outlines actually change', 'Outlines add a dark border around enabled crosshair elements. They improve separation from the map but also increase the apparent size of the shape.'],
        ['When outlines help', 'White, yellow, and very thin crosshairs often benefit most. Test a pale wall, the sky, and ability-heavy fights before deciding.'],
        ['When outlines get in the way', 'A thick outline can close a small center gap or make a dot feel larger. Reduce outline thickness or turn it off instead of shrinking the whole crosshair.'],
      ],
      faq: [['Do outlines make a crosshair more accurate?', 'No. They only change visibility and apparent size.'], ['Should a cyan crosshair use outlines?', 'Only if cyan disappears on the scenes you play; many cyan shapes remain clear without them.']],
      metaTitle: 'VALORANT Crosshair Outlines: On or Off? | AimCodes', metaDescription: 'Decide whether VALORANT crosshair outlines should be on or off by comparing contrast, size, and target coverage.',
    },
    centerDotOnOff: {
      title: 'VALORANT center dot: on or off?',
      intro: 'Choose between an exact filled center and an open gap that leaves the enemy head visible.',
      summary: 'Turn the center dot on for a strong exact reference or a dot-only setup. Turn it off when four inner lines already define the center and you want less target coverage.',
      sections: [
        ['What the center dot adds', 'The dot gives your eyes one filled point to return to, which can help deliberate taps and compact profiles. Size and opacity decide how dominant it feels.'],
        ['Why an open center can feel cleaner', 'With the dot off, a small gap lets you see the target through the middle. Short inner lines still show the exact aiming area without filling it.'],
        ['Compare the two fairly', 'Keep color, line length, and thickness unchanged. Toggle only the center dot and check which version you recover faster after looking away.'],
      ],
      faq: [['Is a center dot better for headshots?', 'It can make the center obvious, but it does not change weapon accuracy or guarantee headshots.'], ['Can I use a dot without inner lines?', 'Yes. Disable inner and outer lines to create a dot-only profile.']],
      metaTitle: 'VALORANT Center Dot: On or Off? | AimCodes', metaDescription: 'Compare a VALORANT center dot with an open-center crosshair and choose the option with better visibility and target coverage.',
    },
    innerVsOuter: {
      title: 'VALORANT inner lines vs outer lines',
      intro: 'Know which line group should carry the aim and which one is only adding noise.',
      summary: 'Use inner lines as the main aiming shape. Keep outer lines off unless they solve a clear tracking or feedback problem, because they add screen space without improving weapon accuracy.',
      sections: [
        ['Inner lines define the working center', 'Length, thickness, opacity, and offset create most competitive dots and crosses. Tune these first before adding a second line layer.'],
        ['Outer lines are optional support', 'Outer lines can make a tiny center easier to locate or display separate error behavior. They also make the profile busier during fast fights.'],
        ['Build from the center outward', 'Start with outer lines off. Make the inner shape readable at normal scale, then enable outer lines only when you can name the problem they fix.'],
      ],
      faq: [['Are outer lines necessary in VALORANT?', 'No. Many clear competitive profiles use only inner lines or a center dot.'], ['Can inner and outer lines use different error settings?', 'Yes, which can be useful for practice, but the extra motion may distract in matches.']],
      metaTitle: 'VALORANT Inner Lines vs Outer Lines | AimCodes', metaDescription: 'Learn what VALORANT inner and outer crosshair lines do, which settings define the center, and when outer lines help.',
    },
    thickness: {
      title: 'VALORANT crosshair thickness explained',
      intro: 'Make the center easier to see without turning a clean shape into a block over the target.',
      summary: 'Start with thin lines, then increase thickness only when the crosshair disappears during fast movement or on bright scenes. Recheck the center gap after every change.',
      sections: [
        ['Thickness changes visibility and coverage', 'Thicker lines are easier to recover, but they cover more pixels around a distant head. The best value depends on resolution, line length, and outline use.'],
        ['Adjust one layer at a time', 'Change inner-line thickness first. If outlines are enabled, test them separately because a thick outline can make a thin line look much larger.'],
        ['Test at normal scale', 'Zoomed previews exaggerate clean edges. Judge the crosshair at your real game resolution on both bright and dark scenes.'],
      ],
      faq: [['Is a thinner crosshair always better?', 'No. A crosshair you lose during a duel is not useful, even if it covers fewer pixels.'], ['Do outlines count toward perceived thickness?', 'Yes. They add a border that makes the overall shape look larger.']],
      metaTitle: 'VALORANT Crosshair Thickness Explained | AimCodes', metaDescription: 'Choose VALORANT crosshair thickness by balancing visibility, outlines, resolution, and target coverage.',
    },
    gapOffset: {
      title: 'VALORANT crosshair gap and offset explained',
      intro: 'Open enough space to see the target without making four separate lines feel disconnected.',
      summary: 'Offset controls how far the lines sit from the center. Use a small gap for a compact reference, a wider gap to keep the head visible, and test changes together with line length.',
      sections: [
        ['Offset creates the center gap', 'A low offset pulls lines toward the middle; a higher value opens the center. The same offset can feel different when line thickness changes.'],
        ['Match gap to line length', 'Short lines usually need a modest gap to remain recognizable. Long lines with a wide gap can feel scattered and slow to read.'],
        ['Use the target as the test', 'Place the crosshair over a distant head-sized reference. If the center is hidden, open the gap; if the lines no longer point clearly to the middle, close it slightly.'],
      ],
      faq: [['Is offset the same as crosshair gap?', 'In practical use, inner-line offset is the setting that opens or closes the visible center gap.'], ['What gap is best for headshots?', 'Use the smallest gap that keeps the target visible and still makes the center obvious to you.']],
      metaTitle: 'VALORANT Crosshair Gap & Offset Explained | AimCodes', metaDescription: 'Understand VALORANT crosshair gap and inner-line offset, then balance center visibility with line length and thickness.',
    },
  },
}

const localized = {
  es: {
    exportCrosshair: ['Cómo exportar un código de mira en VALORANT', 'Convierte la mira que ya usas en un código que puedas guardar o enviar.', 'Abre Ajustes → Mira, selecciona el perfil correcto, usa Exportar código de perfil y copia la cadena completa.', [['Exporta el perfil correcto', 'Selecciona primero la mira que quieres compartir. Copia el código desde el primer carácter hasta el último para no romper la importación.'], ['Guarda una copia fuera del juego', 'Anota juntos el nombre y el código. Una captura sirve de referencia, pero no permite recuperar todos los valores.'], ['Comprueba el código', 'Impórtalo en un perfil libre y revisa color, contorno, punto central y líneas antes de enviarlo.']], [['¿Exportar borra mi mira?', 'No. Solo copia sus ajustes como texto.'], ['¿Por qué el código es tan largo?', 'Porque incluye varias secciones y todos sus valores.']]],
    shareCrosshair: ['Cómo compartir una mira de VALORANT', 'Envía un código que tu compañero pueda importar sin copiar ajustes uno por uno.', 'Exporta el perfil correcto, coloca el código en una línea separada y pide que lo peguen en Importar código de perfil.', [['Comparte el código, no solo una captura', 'El código conserva color, punto, contorno y geometría; una imagen solo enseña el aspecto.'], ['Evita caracteres extra', 'No pegues comillas, emojis, espacios ni puntos junto al código. Un bloque de código ayuda a copiarlo limpio.'], ['Revisa el resultado', 'Después de importar, probadlo a escala normal y comprobad primero color personalizado y contornos.']], [['¿Puedo enviarlo por Discord?', 'Sí, mejor como texto sin formato o bloque de código.'], ['¿Se puede copiar al espectar?', 'Sí, cuando el comando del juego está disponible para el jugador observado.']]],
    resetCrosshair: ['Cómo restablecer tu mira de VALORANT', 'Vuelve a un perfil limpio sin perder una configuración que quizá quieras recuperar.', 'Exporta primero tu código actual y crea un perfil limpio. Conserva la copia hasta probar la nueva mira en el campo de práctica.', [['Haz una copia antes', 'Exporta el perfil aunque ahora no te guste; así podrás volver y comparar los cambios.'], ['Empieza con pocos ajustes', 'Usa una forma compacta, un color visible y los errores desactivados. Añade contorno solo si falta contraste.'], ['Pruébala antes de borrar', 'Comprueba una pared clara, una oscura y un objetivo lejano antes de limpiar perfiles antiguos.']], [['¿Restablecer cambia la precisión?', 'No. Solo cambia la referencia visual.'], ['¿Borro el perfil antiguo?', 'No hasta que el nuevo funcione bien y tengas una copia.']]],
    saveMultiple: ['Cómo guardar varias miras en VALORANT', 'Ordena perfiles para competitivo, práctica y diversión sin perder tiempo en el menú.', 'Crea perfiles con nombres claros, exporta los importantes y elimina variantes que apenas se distinguen.', [['Dale una función a cada perfil', 'Nombres como Competitivo Cian o Práctica Error explican para qué sirve cada mira.'], ['Guarda los códigos importantes', 'Conserva nombre y código juntos para poder restaurarlos después.'], ['Evita duplicados casi iguales', 'Quédate con una base y unas pocas alternativas que solucionen problemas distintos.']], [['¿Puedo guardar varias miras?', 'Sí, VALORANT permite crear y cambiar entre varios perfiles.'], ['¿Qué perfiles conviene exportar?', 'Los que no quieras reconstruir, sobre todo colores personalizados y formas raras.']]],
    customColor: ['Cómo usar un color de mira personalizado en VALORANT', 'Elige un color hexadecimal visible que no se confunda con el contorno enemigo.', 'Selecciona color personalizado, escribe un valor hexadecimal válido de seis caracteres y pruébalo en escenas claras y oscuras.', [['Busca contraste', 'El color debe separarse del mapa, las habilidades y el resaltado enemigo; cian, verde, blanco y rosa son buenos puntos de partida.'], ['Escribe un hexadecimal limpio', 'Usa seis caracteres 0–9 o A–F, sin espacios ni símbolos adicionales.'], ['Prueba antes de copiar', 'Mantén la misma forma y cambia solo el color para comparar con justicia.']], [['¿Cambiar el color modifica la forma?', 'No. Las líneas, el punto y el contorno siguen iguales.'], ['¿Por qué se ve distinto en partida?', 'Influyen el monitor, la iluminación del mapa y los colores alrededor.']]],
    outlinesOnOff: ['Contorno de mira en VALORANT: ¿activado o desactivado?', 'Usa el contorno para recuperar contraste, no para engordar todas las miras pequeñas.', 'Actívalo cuando una mira fina o blanca desaparezca en fondos claros; apágalo si tapa demasiado el objetivo.', [['Qué cambia el contorno', 'Añade un borde oscuro y mejora la separación, pero también aumenta el tamaño aparente.'], ['Cuándo ayuda', 'Suele favorecer a miras blancas, amarillas o muy finas en paredes claras.'], ['Cuándo estorba', 'Un borde grueso puede cerrar el hueco central o convertir un punto pequeño en un bloque.']], [['¿Mejora la precisión?', 'No. Solo cambia la visibilidad.'], ['¿La mira cian necesita contorno?', 'Solo si desaparece en tus mapas habituales.']]],
    centerDotOnOff: ['Punto central en VALORANT: ¿activado o desactivado?', 'Elige entre un centro lleno muy claro y un hueco que deja ver la cabeza.', 'Activa el punto para una referencia exacta; apágalo cuando las líneas interiores ya marquen el centro y quieras menos cobertura.', [['Qué aporta el punto', 'Da a la vista un centro lleno al que volver, útil en tiros deliberados y perfiles compactos.'], ['Por qué dejar el centro abierto', 'Un hueco pequeño permite ver el objetivo mientras cuatro líneas cortas siguen señalando el medio.'], ['Compara solo una variable', 'Mantén color, largo y grosor, y cambia únicamente el punto central.']], [['¿Ayuda a dar más headshots?', 'Puede hacer el centro más claro, pero no cambia la precisión del arma.'], ['¿Puedo usar solo un punto?', 'Sí, desactiva líneas interiores y exteriores.']]],
    innerVsOuter: ['Líneas interiores vs exteriores en VALORANT', 'Decide qué líneas forman la referencia principal y cuáles solo añaden ruido.', 'Ajusta primero las líneas interiores. Deja las exteriores apagadas salvo que resuelvan un problema claro de seguimiento o aprendizaje.', [['Las interiores forman el centro', 'Largo, grosor, opacidad y separación crean la mayoría de miras competitivas.'], ['Las exteriores son apoyo opcional', 'Pueden ayudar a encontrar un centro pequeño, pero ocupan más pantalla.'], ['Construye desde dentro', 'Haz legible la forma interior antes de activar otra capa.']], [['¿Son necesarias las líneas exteriores?', 'No. Muchas miras usan solo interiores o punto central.'], ['¿Pueden tener errores distintos?', 'Sí, aunque tanto movimiento puede distraer.']]],
    thickness: ['Grosor de mira en VALORANT: cómo ajustarlo', 'Haz visible el centro sin convertir una forma limpia en un bloque sobre el objetivo.', 'Empieza fino y aumenta el grosor solo si pierdes la mira. Revisa el hueco central después de cada cambio.', [['Visibilidad frente a cobertura', 'Las líneas gruesas se encuentran antes, pero cubren más píxeles de una cabeza lejana.'], ['Cambia una capa cada vez', 'Ajusta primero las líneas interiores y prueba el contorno por separado.'], ['Mira a escala real', 'Un zoom exagera los bordes; decide con tu resolución normal y escenas claras y oscuras.']], [['¿Más fino siempre es mejor?', 'No si pierdes la mira durante el duelo.'], ['¿El contorno aumenta el grosor visual?', 'Sí, el borde hace que la forma parezca mayor.']]],
    gapOffset: ['Separación y offset de mira en VALORANT', 'Abre espacio para ver el objetivo sin separar tanto las líneas que se pierda el centro.', 'El offset aleja las líneas del centro. Usa un hueco pequeño para una referencia compacta y uno mayor para dejar visible la cabeza.', [['El offset crea el hueco', 'Un valor bajo acerca las líneas; uno alto abre el centro. El grosor cambia cómo se percibe.'], ['Combínalo con el largo', 'Líneas cortas suelen necesitar una separación moderada para seguir formando una figura clara.'], ['Usa la cabeza como prueba', 'Si el centro tapa el objetivo, abre; si las líneas ya no apuntan al medio, cierra un poco.']], [['¿Offset y gap son lo mismo?', 'En la práctica, el offset interior controla el hueco visible.'], ['¿Qué hueco sirve para headshots?', 'El menor que deje ver el objetivo y mantenga claro el centro.']]],
  },
  'pt-BR': {
    exportCrosshair: ['Como exportar um código de mira no VALORANT', 'Transforme a mira que você usa em um código fácil de guardar ou enviar.', 'Abra Configurações → Mira, selecione o perfil correto, use Exportar código do perfil e copie a sequência inteira.', [['Exporte o perfil certo', 'Selecione a mira desejada antes de exportar e copie do primeiro ao último caractere.'], ['Guarde fora do jogo', 'Salve nome e código juntos. Uma captura mostra o visual, mas não restaura os valores.'], ['Teste o código', 'Importe em um espaço livre e confira cor, contorno, ponto central e linhas.']], [['Exportar apaga minha mira?', 'Não. Apenas copia as configurações como texto.'], ['Por que o código é longo?', 'Ele guarda várias seções e todos os valores da mira.']]],
    shareCrosshair: ['Como compartilhar uma mira do VALORANT', 'Envie um código que seu duo possa importar sem copiar cada ajuste.', 'Exporte o perfil, envie o código em uma linha separada e peça para colá-lo em Importar código do perfil.', [['Compartilhe o código', 'O código mantém cor, ponto, contorno e geometria; a captura serve apenas de referência.'], ['Evite caracteres extras', 'Não cole aspas, emoji, espaço ou ponto junto do código.'], ['Confira depois de importar', 'Teste em escala normal e revise cor personalizada e contornos antes de culpar o código.']], [['Posso enviar pelo Discord?', 'Sim, de preferência como texto simples ou bloco de código.'], ['Dá para copiar ao assistir?', 'Sim, quando o comando do jogo está disponível para o jogador observado.']]],
    resetCrosshair: ['Como redefinir sua mira do VALORANT', 'Volte a um perfil limpo sem perder uma configuração que talvez queira recuperar.', 'Exporte o código atual, crie um perfil simples e mantenha o backup até testar a nova mira no treino.', [['Faça backup primeiro', 'Exporte o perfil mesmo que ele esteja ruim; isso permite voltar e comparar.'], ['Comece simples', 'Use forma compacta, cor visível e erros desligados. Ative contorno só se faltar contraste.'], ['Teste antes de apagar', 'Confira parede clara, parede escura e alvo distante.']], [['Redefinir muda a precisão?', 'Não. Só muda a referência visual.'], ['Devo apagar o perfil antigo?', 'Não antes de confirmar o novo e guardar um backup.']]],
    saveMultiple: ['Como salvar várias miras no VALORANT', 'Organize perfis para competitivo, treino e diversão sem brigar com o menu.', 'Crie perfis com nomes claros, exporte os importantes e elimine variações quase idênticas.', [['Dê uma função a cada perfil', 'Nomes como Ranked Ciano ou Treino Erro explicam por que a mira existe.'], ['Guarde os códigos importantes', 'Salve nome e código juntos para restaurar depois.'], ['Evite duplicatas', 'Mantenha uma base e poucas alternativas que resolvam problemas diferentes.']], [['Posso ter várias miras?', 'Sim, o VALORANT permite salvar e alternar perfis.'], ['Quais devo exportar?', 'As que seriam chatas de reconstruir, especialmente cores e formas personalizadas.']]],
    customColor: ['Como usar uma cor personalizada de mira no VALORANT', 'Escolha uma cor hexadecimal que apareça no mapa e não se misture ao destaque inimigo.', 'Selecione cor personalizada, digite seis caracteres hexadecimais válidos e teste em cenas claras e escuras.', [['Procure contraste', 'A cor precisa se separar do mapa, habilidades e destaque inimigo. Ciano, verde, branco e rosa são bons começos.'], ['Digite um hexadecimal limpo', 'Use seis caracteres 0–9 ou A–F, sem espaços ou símbolos.'], ['Teste antes de copiar', 'Mantenha o mesmo formato e altere apenas a cor.']], [['A cor muda o formato?', 'Não. Linhas, ponto e contorno permanecem iguais.'], ['Por que muda dentro do jogo?', 'Monitor, luz do mapa e cores ao redor alteram o contraste percebido.']]],
    outlinesOnOff: ['Contorno da mira no VALORANT: ligado ou desligado?', 'Use o contorno para recuperar contraste, não para deixar toda mira pequena pesada.', 'Ligue quando uma mira fina ou branca sumir em fundos claros; desligue se ela cobrir demais o alvo.', [['O que o contorno muda', 'Ele adiciona uma borda escura e melhora a separação, mas aumenta o tamanho visual.'], ['Quando ajuda', 'Branco, amarelo e linhas muito finas costumam ganhar contraste em paredes claras.'], ['Quando atrapalha', 'Uma borda grossa pode fechar o centro ou transformar um ponto pequeno em bloco.']], [['Contorno melhora a precisão?', 'Não. Só muda visibilidade e tamanho aparente.'], ['Ciano precisa de contorno?', 'Somente se desaparecer nas cenas em que você joga.']]],
    centerDotOnOff: ['Ponto central no VALORANT: ligado ou desligado?', 'Escolha entre um centro preenchido bem claro e um espaço aberto que mostra a cabeça.', 'Ligue o ponto para uma referência exata; desligue quando as linhas internas já mostram o centro e você quer cobrir menos.', [['O que o ponto acrescenta', 'Ele dá aos olhos um centro preenchido, útil para taps e perfis compactos.'], ['Por que abrir o centro', 'Um espaço pequeno deixa o alvo visível enquanto quatro linhas apontam para o meio.'], ['Compare uma coisa por vez', 'Mantenha cor, comprimento e espessura e altere apenas o ponto.']], [['Ajuda a acertar headshots?', 'Pode deixar o centro claro, mas não muda a precisão da arma.'], ['Posso usar só o ponto?', 'Sim, desligue linhas internas e externas.']]],
    innerVsOuter: ['Linhas internas vs externas no VALORANT', 'Saiba qual camada deve guiar a mira e qual só está adicionando ruído.', 'Use linhas internas como forma principal. Deixe as externas desligadas, salvo quando resolverem um problema claro.', [['As internas formam o centro', 'Comprimento, espessura, opacidade e deslocamento criam a maioria das miras competitivas.'], ['As externas são apoio opcional', 'Elas podem facilitar encontrar um centro pequeno, mas ocupam mais tela.'], ['Construa de dentro para fora', 'Deixe a forma interna legível antes de ativar outra camada.']], [['Linhas externas são necessárias?', 'Não. Muitas miras usam apenas internas ou ponto.'], ['Podem ter erros diferentes?', 'Sim, mas o movimento extra pode distrair.']]],
    thickness: ['Espessura da mira no VALORANT: como ajustar', 'Deixe o centro visível sem transformar uma forma limpa em um bloco.', 'Comece fino e aumente só quando perder a mira. Confira novamente o espaço central após cada mudança.', [['Visibilidade e cobertura', 'Linhas grossas aparecem rápido, mas cobrem mais pixels de uma cabeça distante.'], ['Mude uma camada por vez', 'Ajuste linhas internas primeiro e teste o contorno separadamente.'], ['Teste em escala real', 'Decida na resolução do jogo, em cenas claras e escuras.']], [['Mais fino é sempre melhor?', 'Não se você perde a mira no duelo.'], ['Contorno aumenta a espessura visual?', 'Sim, a borda faz a forma parecer maior.']]],
    gapOffset: ['Espaço e offset da mira no VALORANT', 'Abra espaço para enxergar o alvo sem separar tanto as linhas que o centro desapareça.', 'O offset afasta as linhas do centro. Use espaço pequeno para uma referência compacta e maior para mostrar a cabeça.', [['O offset cria o espaço', 'Valor baixo aproxima as linhas; valor alto abre o centro. A espessura muda a percepção.'], ['Combine com o comprimento', 'Linhas curtas precisam de um espaço moderado para continuar formando uma figura clara.'], ['Use a cabeça como teste', 'Se o centro cobre o alvo, abra; se as linhas não apontam para o meio, feche um pouco.']], [['Offset e gap são iguais?', 'Na prática, o offset interno controla o espaço visível.'], ['Qual espaço é bom para headshots?', 'O menor que mostra o alvo e mantém o centro claro.']]],
  },
  'zh-CN': {
    exportCrosshair: ['无畏契约准星代码怎么导出', '把你正在用的准星变成一串可以备份、也可以直接发给队友的代码。', '打开设置 → 准星，选中正确的配置，再点击导出准星配置代码。完整复制后先存一份纯文本备份。', [['先确认导出的是哪一套', '导出前切到目标准星，从第一个字符复制到最后一个字符，漏一段就可能无法导入。'], ['在游戏外留一份备份', '把准星名称和代码放在一起。截图只能看外观，不能还原完整参数。'], ['自己导入测试一次', '用空闲配置槽导入，核对颜色、轮廓、中心点和线条，再把代码发给别人。']], [['导出会删除当前准星吗？', '不会，导出只是把设置复制成文本。'], ['为什么准星代码这么长？', '因为它需要保存多组准星元素和全部参数。']]],
    shareCrosshair: ['无畏契约准星怎么分享给队友', '直接发一串能导入的代码，比让队友照着截图抄参数快得多。', '先导出正确配置，把代码单独放一行，再让对方粘贴到“导入准星配置代码”。', [['发代码，不要只发截图', '代码能保留颜色、中心点、轮廓和线条；截图只能让人看个大概。'], ['别让多余字符混进去', '代码旁边不要紧贴引号、表情、空格或句号，发在代码块里最稳。'], ['导入后再对一遍', '用正常比例看效果。如果不一样，先检查自定义颜色和轮廓，不要马上认定代码坏了。']], [['可以通过聊天软件发送吗？', '可以，最好用纯文本或代码块，避免字符被修改。'], ['观战时能直接复制吗？', '游戏允许时，可以对正在观战的队友使用复制准星命令。']]],
    resetCrosshair: ['无畏契约准星怎么重置', '把准星恢复到干净好用的状态，同时别把以后可能想找回的配置弄丢。', '先导出当前准星，再新建一套简洁配置。新准星去训练场试过之前，旧备份先留着。', [['重置前先备份', '就算当前准星很难用也先导出，方便随时恢复，也能看清自己到底改了什么。'], ['从少量参数开始', '先用紧凑形状、醒目颜色，关闭误差动画；只有亮墙上看不清时才加轮廓。'], ['确认好用再清理', '分别看亮墙、暗墙和远距离目标，确定稳定后再删旧实验配置。']], [['重置会改变武器精准度吗？', '不会，只会改变瞄准时看到的参考图形。'], ['旧配置要马上删吗？', '不用，等新配置稳定并且备份完成再处理。']]],
    saveMultiple: ['无畏契约怎么保存多套准星', '把排位、练枪和娱乐准星分清楚，切换时不用在配置列表里翻半天。', '给每套准星起一个能说明用途的名字，重要配置导出备份，肉眼几乎看不出区别的重复版本直接精简。', [['一套准星只负责一件事', '例如“排位青色”“练停枪误差”“猫猫娱乐”，名字应该告诉你为什么要留它。'], ['重要配置都留代码', '把名称和导出代码存一起，清理游戏内列表后也能恢复。'], ['别堆一排微小变体', '保留一套基准和几套解决不同问题的版本，看不出区别的只留更顺眼的一套。']], [['可以同时保存多套准星吗？', '可以，无畏契约支持建立并切换多个准星配置。'], ['哪些准星最值得备份？', '重新调起来麻烦的都值得，尤其是自定义颜色和特殊造型。']]],
    customColor: ['无畏契约怎么使用自定义准星颜色', '选一个在地图里醒目、又不会和敌人轮廓混在一起的十六进制颜色。', '在准星颜色中选择自定义，输入六位有效十六进制值，再到亮场景和暗场景各看一次。', [['先看对比度，别只看喜好', '颜色要和地图、技能特效、敌人轮廓拉开差异。青、绿、白、粉都适合作为起点。'], ['输入干净的颜色值', '只使用 0–9 或 A–F 组成的六位字符，不要带空格和其他符号。'], ['复制前固定形状对比', '形状、粗细和间距都不变，只换颜色，才能看出哪个真的更容易找到。']], [['换颜色会改变准星形状吗？', '不会，线条、中心点和轮廓参数都会保留。'], ['为什么游戏里颜色看起来不一样？', '显示器、地图光线、轮廓和周围颜色都会影响实际对比度。']]],
    outlinesOnOff: ['无畏契约准星轮廓开还是关', '轮廓是用来救对比度的，不是给所有小准星统一加粗。', '白色或细准星在亮墙上消失时就开；本身已经很清楚、加完反而挡住远处目标时就关。', [['轮廓到底改了什么', '它会在准星元素外加一层暗边，提高和地图的区分度，同时也让图形看起来更大。'], ['什么时候值得开', '白色、黄色和极细准星最容易从亮墙轮廓中受益。'], ['什么时候会碍事', '过粗的轮廓会把小间隙填上，甚至让一个小点变成方块。']], [['开轮廓会更准吗？', '不会，只会改变可见度和视觉大小。'], ['青色准星需要轮廓吗？', '只有在你常玩的场景里会丢失时才需要。']]],
    centerDotOnOff: ['无畏契约准星中心点开还是关', '在“明确的实心中心”和“能看见敌人头部的留空中心”之间做选择。', '想要一个非常明确的落点就开中心点；四条内线已经能指向中心、又不想挡目标时就关。', [['中心点带来什么', '它给视线一个实心落点，适合单点和紧凑配置，大小与透明度决定存在感。'], ['留空中心为什么更干净', '关掉中心点后，小间隙可以露出目标，四条短线仍会指向正中。'], ['只改一个变量来对比', '颜色、线长和粗细保持不变，只切换中心点，看哪套更快被你找回。']], [['中心点更容易爆头吗？', '它可能让中心更明确，但不会改变武器精准度。'], ['能不能只保留中心点？', '可以，把内线和外线都关闭即可。']]],
    innerVsOuter: ['无畏契约准星内线和外线有什么区别', '先分清哪层线负责瞄准，哪层线只是让画面变得更忙。', '内线应该承担主要瞄准功能；外线只有在确实能解决跟踪或训练问题时才值得保留。', [['内线决定主要形状', '长度、粗细、透明度和偏移量，基本就能组合出常见竞技准星。'], ['外线只是可选辅助', '它能让极小中心更好找，也会占用更多画面并增加动态干扰。'], ['从中心往外调', '先关外线，把内线调到正常比例下清楚可用，再决定要不要第二层。']], [['外线是必须的吗？', '不是，很多清爽竞技准星只用内线或中心点。'], ['内线和外线能设置不同误差吗？', '可以，但同时出现的动态变化也可能干扰对枪。']]],
    thickness: ['无畏契约准星粗细怎么调', '让中心更容易看见，但别把干净的小准星调成挡住目标的大方块。', '先从细线开始，只有快速转身或亮场景下经常丢准星时才加粗；每次加粗后都重新看中心间隙。', [['粗细会同时影响可见度和遮挡', '粗线更容易被眼睛抓到，也会覆盖远处头部周围更多像素。'], ['一次只改一层', '先改内线粗细；如果开了轮廓，单独测试它，因为轮廓会明显增加视觉体积。'], ['一定按正常比例判断', '放大预览会让边缘显得很漂亮，最终仍要按自己的游戏分辨率看亮暗场景。']], [['越细就一定越好吗？', '不一定。对枪时总把它弄丢，再小也没有意义。'], ['轮廓会让准星显得更粗吗？', '会，外边缘会增加整个图形的视觉大小。']]],
    gapOffset: ['无畏契约准星间隙和偏移量怎么调', '给目标留出一点空间，但别把四条线拆得太散，连中心在哪里都看不出来。', '内线偏移量决定线条离中心多远：小间隙更紧凑，大间隙更容易看见敌人头部，还要和线长一起调。', [['偏移量就是中心间隙的来源', '数值小会把线拉近，数值大就会打开中心；同样数值在不同粗细下看起来也不同。'], ['间隙要和线长配套', '短线通常需要适中的间隙才能保持完整形状，长线再配大间隙会显得很散。'], ['直接拿头部大小来测试', '如果中心挡住头部就打开一点；如果四条线已经不能明确指向中心，就稍微收回来。']], [['偏移量就是准星间隙吗？', '实际调整时，内线偏移量就是控制可见中心间隙的主要设置。'], ['爆头准星用多大间隙？', '用既能露出目标、又能让你马上判断中心的最小间隙。']]],
  },
}

function makeArticle(locale, articleKey) {
  const source = locale === 'en' ? pages.en[articleKey] : localized[locale]?.[articleKey]
  if (!source) return null
  const base = locale === 'en'
    ? source
    : { title: source[0], intro: source[1], summary: source[2], sections: source[3], faq: source[4] }
  return {
    ...relations[articleKey],
    eyebrow: shared[locale].eyebrow,
    title: base.title,
    intro: base.intro,
    summaryTitle: shared[locale].summaryTitle,
    summary: base.summary,
    sections: base.sections.map(([title, paragraph]) => ({ title, paragraphs: [paragraph], bullets: [] })),
    faq: base.faq,
    cta: shared[locale].cta,
    metaTitle: base.metaTitle || `${base.title} | AimCodes`,
    metaDescription: base.metaDescription || base.intro,
  }
}

export function growthArticleCopy(locale, articleKey) {
  return makeArticle(locale, articleKey)
}
