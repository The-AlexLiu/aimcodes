const englishGuides = {
  copy: {
    title: "How to copy a teammate's crosshair in VALORANT", intro: 'Spectate the teammate whose crosshair you want, enter the /cc command, then save the copied setup as a crosshair profile.', summary: 'While you are spectating the player whose crosshair you want, open chat and enter /cc. VALORANT copies that crosshair into your available profiles; open Crosshair settings after the round to review and rename it.',
    sections: [
      ['Copy the crosshair you are watching', ['Wait until you are spectating the teammate, then type /cc in chat. The command copies the currently observed player, not a random teammate.'], ['Spectate the correct player first.', 'Enter /cc exactly as a chat command.', 'Check the saved profile before changing its settings.']],
      ['Find and test the copied profile', ['Open Settings → Crosshair and move through your saved profiles. Rename the copied profile so you can identify it later, then test it in the range.'], ['Keep your old profile until the new one feels right.', 'Test the center at normal resolution.', 'Export the code if you want to share it.']],
      ['When /cc does not copy anything', ['The command only works when a valid player crosshair can be observed. If it fails, confirm you are spectating, check that a profile slot is available, and try again after switching to the intended teammate.'], ['Do not paste a profile code into normal chat.', 'Free a profile slot if your list is full.', 'Use Import Profile Code for codes copied from a website.']],
    ],
    faq: [['What does /cc do in VALORANT?', 'It copies the crosshair of the player you are currently spectating into your crosshair profiles.'], ['Can I copy an enemy crosshair?', 'Only when the game lets you spectate that player and exposes the crosshair to the command.']],
    sources: [{ label: 'Riot Games — VALORANT Patch Notes 5.04', url: 'https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-5-04/' }],
    recommendedCrosshairIds: ['tenz', 'aspas-dot', 'jinggg', 'demon1'], relatedArticleKeys: ['notWorking', 'settings'], relatedCollectionKeys: ['pro', 'beginner'], relatedToolKeys: ['preview'],
    metaTitle: "How to Copy a Teammate's Crosshair in VALORANT | AimCodes", metaDescription: 'Use the /cc command to copy a teammate crosshair in VALORANT, find the saved profile, and fix the command when it does not work.',
  },
  notWorking: {
    title: 'VALORANT crosshair code not working? Fix it fast', intro: 'Use this checklist when a profile code will not import, shows “Something went wrong while importing your profile,” or looks different after you paste it.', summary: 'Seeing “Something went wrong while importing your profile”? Copy the complete code again, paste it into Import Profile Code rather than chat, and confirm you have room for another profile. If it imports but looks wrong, compare the actual settings instead of relying on a zoomed image.',
    sections: [
      ['Check the code before changing settings', ['A missing character, extra space, or truncated end can invalidate a profile code. Copy the original code again and avoid editing individual separators.'], ['Copy from the first character to the last.', 'Remove accidental spaces or line breaks.', 'Do not combine two codes.']],
      ['Fix “Something went wrong while importing your profile”', ['Open Settings → Crosshair and choose Import Profile Code. Paste the complete code there, not in chat or the profile-name field, and make sure an empty profile slot is available.'], ['Choose Import Profile Code.', 'Free a profile slot if the list is full.', 'Paste the complete code once and confirm.']],
      ['If the code imports but the preview differs', ['Preview size, resolution, outlines, and custom colors can make the same geometry look different. Compare inner lines, outer lines, center dot, and color in the saved profile.'], ['Check the game profile rather than a social screenshot.', 'Confirm the custom color value.', 'Try a verified AimCodes code to isolate the problem.']],
    ],
    faq: [['Why is my crosshair code invalid?', 'The code may be incomplete, contain extra characters, or have been pasted outside the import control.'], ['Can an old code stop working?', 'Profile formats can change, but most failures come from a damaged copy or the wrong import step. Use a recently verified source.']],
    sources: [{ label: 'Riot Games — VALORANT Patch Notes 4.05', url: 'https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-4-05/' }],
    recommendedCrosshairIds: ['tenz', 'aspas-dot', 'forsaken', 'small-dot-thick'], relatedArticleKeys: ['copy', 'settings'], relatedCollectionKeys: ['best'], relatedToolKeys: ['decoder', 'preview'],
    metaTitle: 'VALORANT Crosshair Code Not Working? Fix It | AimCodes', metaDescription: 'See “Something went wrong while importing your profile”? Fix a VALORANT crosshair code by checking the full code, profile slots and import screen.',
  },
  makeDot: {
    title: 'How to make a dot crosshair in VALORANT', intro: 'Build a clean center dot, remove unwanted lines, and keep the result visible enough for real fights.', summary: 'Enable Center Dot, disable inner and outer lines, then set a small dot size and full opacity. Add a thin outline or use cyan if the dot disappears on bright map surfaces.',
    sections: [
      ['Start with only the center dot', ['Open Crosshair settings, turn Center Dot on, and disable both Inner Lines and Outer Lines. This isolates one central mark.'], ['Center Dot: on.', 'Inner Lines: off.', 'Outer Lines: off.']],
      ['Choose size, opacity, and outline', ['Use full opacity and the smallest size you can still recover after looking away from the center. A thin outline can help white dots without making them feel much larger.'], ['Opacity: start at full.', 'Size: small but visible.', 'Outline: thin and optional.']],
      ['Test precision without losing visibility', ['A dot can feel precise but disappear during movement or utility. Compare a pure dot with a micro cross on the same scene before taking it into ranked.'], ['Test bright and dark walls.', 'Keep one backup color.', 'Do not assume one pixel is automatically better.']],
    ],
    faq: [['Is a dot crosshair good for VALORANT?', 'It is useful for deliberate taps and placement when you can still see it clearly.'], ['What dot size should I use?', 'Use the smallest size you can recover reliably at your own resolution.']],
    recommendedCrosshairIds: ['aspas-dot', 'demon1', 'needle-cyan', 'pin-white'], relatedArticleKeys: ['dotVsCross', 'settings'], relatedCollectionKeys: ['dot', 'oneTap'], relatedToolKeys: ['generator', 'preview'],
    metaTitle: 'How to Make a Dot Crosshair in VALORANT | AimCodes', metaDescription: 'Make a VALORANT dot crosshair by setting center dot, size, opacity, lines and outline. Test working dot codes before copying one.',
  },
  makeCircle: {
    title: 'How to make a circle crosshair in VALORANT', intro: 'Build or edit a circle crosshair with compact line layers, then compare your settings with ready-to-copy circle codes.', summary: 'This guide is for changing the settings yourself. A circle is an approximation built from short, closed line layers: keep the horizontal and vertical values balanced, close the offset, and preview at normal scale because a ring that looks perfect when enlarged may look square in game.',
    sections: [
      ['Build the ring from balanced lines', ['Use equal horizontal and vertical lengths so the shape remains symmetrical. Short lines with a closed offset create the most convincing small ring.'], ['Match horizontal and vertical length.', 'Keep the center offset low.', 'Use moderate thickness.']],
      ['Decide whether to keep a center dot', ['A dot makes the exact middle obvious but fills the hollow center. Turn it off when you want the target to remain visible through the ring.'], ['Dot on: stronger center reference.', 'Dot off: cleaner hollow center.', 'Avoid oversized outlines.']],
      ['Compare with a verified code', ['Circle shapes are sensitive to resolution and scale. Paste a working code into the AimCodes preview and compare it with your generated version on the same map.'], ['Preview at normal scale.', 'Check a distant target.', 'Copy only after the ring stays recognizable.']],
    ],
    faq: [['Can VALORANT make a perfect circle crosshair?', 'The settings create a pixel-style approximation rather than a mathematically smooth circle.'], ['Should a circle crosshair use a dot?', 'Use a dot for a stronger center or turn it off to keep the ring hollow.']],
    sources: [{ label: 'Riot Games — VALORANT Patch Notes 5.04', url: 'https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-5-04/' }],
    recommendedCrosshairIds: ['circle-dot-cyan', 'small-circle-cyan', 'hollow-mint', 'bullseye-red'], relatedArticleKeys: ['makeDot', 'dotVsCross'], relatedCollectionKeys: ['circle'], relatedToolKeys: ['generator', 'preview'],
    metaTitle: 'How to Make a Circle Crosshair in VALORANT | AimCodes', metaDescription: 'Build a VALORANT circle crosshair with balanced line settings, compare hollow and center-dot versions, and test ready-made circle codes.',
  },
  movementError: {
    title: 'VALORANT movement error crosshair: on or off?', intro: 'Movement error shows when moving has made your shot inaccurate. Use it to learn stop timing, then turn it off if the animation gets in the way.', summary: 'Movement error makes the crosshair react while movement reduces weapon accuracy. Turn it on in practice if you are learning to stop before shooting; turn it off for a stable center once that timing feels automatic.',
    sections: [
      ['What movement error shows', ['The crosshair expands or changes while your movement makes shots inaccurate. It is a visual warning, not a change to weapon accuracy.'], ['Moving still affects the weapon normally.', 'The crosshair only displays feedback.', 'Different movement states can produce different spread.']],
      ['Use it as a practice aid', ['Enable movement error in the range and practice stopping until the crosshair returns to its settled state before firing.'], ['Strafe, stop, then fire.', 'Watch the settled center.', 'Repeat without staring at the animation.']],
      ['When to turn it off', ['Once you understand stop timing, the moving shape can add noise during a duel. A static crosshair provides one repeatable reference for placement.'], ['Keep it on while learning.', 'Turn it off if the animation distracts.', 'Do not confuse feedback with recoil control.']],
    ],
    faq: [['Should movement error be on or off?', 'Use it temporarily for learning; turn it off when you want a stable competitive reference.'], ['Does movement error make shots more accurate?', 'No. It only visualizes the accuracy penalty already applied by movement.']],
    recommendedCrosshairIds: ['tenz', 'jinggg', 'compact-green', 'micro-gap-cyan'], relatedArticleKeys: ['movementVsFiring', 'staticVsDynamic', 'placement'], relatedCollectionKeys: ['beginner'], relatedToolKeys: ['generator'],
    metaTitle: 'VALORANT Movement Error Crosshair: On or Off? | AimCodes', metaDescription: 'See what the VALORANT movement error crosshair shows, when to turn it on for stop-timing practice, and when a static crosshair is easier to use.',
  },
  firingError: {
    title: 'What is firing error in VALORANT?', intro: 'Firing error is the crosshair animation that reacts to weapon inaccuracy during taps, bursts, and sprays. Use it for practice, or turn it off when you want a fixed center.', summary: 'Firing error makes the crosshair react to weapon inaccuracy while you shoot. It can show when a burst has spread, but it does not control recoil and may add distracting motion.',
    sections: [
      ['What firing error shows', ['The crosshair changes as repeated shots become less accurate. The feedback follows weapon behavior; it does not cause or reduce the spread.'], ['First bullets may stay tighter.', 'Longer bursts create more inaccuracy.', 'The animation is only a visual signal.']],
      ['Use it to learn burst reset timing', ['In the range, fire short bursts and wait for the crosshair to settle. This can help you see how long recovery takes before the next accurate burst.'], ['Compare taps and short bursts.', 'Wait for the settled state.', 'Practice with the weapon you actually use.']],
      ['Why many players keep it off', ['A moving reference is harder to place consistently on a head. Once reset timing is familiar, a static shape is usually easier to track.'], ['Turn it off for one stable center.', 'Learn recoil from weapon feedback too.', 'Do not chase the expanding lines during a spray.']],
    ],
    faq: [['Does firing error show recoil?', 'It reflects inaccuracy, but it is not a complete recoil guide and does not replace spray practice.'], ['Should firing error be on for the Phantom?', 'It can help during practice, but many players prefer a static center in real matches.']],
    sources: [{ label: 'Riot Games — VALORANT Patch Notes 3.03', url: 'https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-3-03/' }],
    recommendedCrosshairIds: ['tenz', 'boaster', 'compact-green', 'recoil-c'], relatedArticleKeys: ['movementVsFiring', 'staticVsDynamic'], relatedCollectionKeys: ['phantom'], relatedToolKeys: ['generator'],
    metaTitle: 'What Is Firing Error in VALORANT? On or Off? | AimCodes', metaDescription: 'See what firing error means in VALORANT, what the crosshair shows during taps and sprays, and when to turn the setting on or off.',
  },
  movementVsFiring: {
    title: 'Movement error vs firing error in VALORANT', intro: 'Separate the two crosshair feedback options so you know whether movement or repeated shots caused the animation. Players sometimes call firing error “shooting error”; both names refer to the same shooting-accuracy feedback.', summary: 'Movement error reacts before or while you shoot if you are still moving. Firing error reacts to inaccuracy created by shooting. Enable one at a time in practice to learn the difference.',
    sections: [
      ['Movement error starts with your movement', ['If the crosshair changes while strafing before a shot, movement error is providing the feedback. Stop fully and watch it settle.'], ['Triggered by inaccurate movement.', 'Useful for stop timing.', 'Can distract during peeks.']],
      ['Firing error starts with the shot sequence', ['If the crosshair expands through a burst after you have stopped, firing error is showing weapon inaccuracy and recovery.'], ['Triggered by shooting inaccuracy.', 'Useful for burst reset practice.', 'Not a recoil controller.']],
      ['Test one option at a time', ['Turn both off, then enable only movement error for one drill. Repeat with only firing error. This makes each signal easy to identify.'], ['Use the same weapon and distance.', 'Do not enable both during the first test.', 'Return to a static profile for comparison.']],
    ],
    faq: [['Are movement and firing error the same?', 'No. One responds to inaccurate movement; the other responds to weapon inaccuracy while shooting.'], ['Can I disable both?', 'Yes. Disabling both gives you a stable static crosshair.']],
    recommendedCrosshairIds: ['tenz', 'jinggg', 'boaster', 'compact-green'], relatedArticleKeys: ['movementError', 'firingError', 'staticVsDynamic'], relatedCollectionKeys: ['beginner'], relatedToolKeys: ['generator'],
    metaTitle: 'Movement Error vs Firing Error in VALORANT | AimCodes', metaDescription: 'Compare VALORANT movement error and firing error, learn what triggers each crosshair animation and test them one at a time.',
  },
  staticVsDynamic: {
    title: 'Static vs dynamic crosshairs in VALORANT', intro: 'Choose between one stable center and an animated crosshair that displays movement or firing inaccuracy.', summary: 'A static crosshair never changes shape, which makes placement consistent. A dynamic crosshair provides accuracy feedback, which can help learning but adds motion during fights.',
    sections: [
      ['Why static crosshairs are common', ['One fixed shape is easier to place at head height and compare across shots. It keeps the visual reference stable even when the weapon becomes inaccurate.'], ['Consistent center.', 'Less visual movement.', 'Does not display accuracy penalties.']],
      ['When a dynamic crosshair helps', ['Movement or firing error can teach new players when a shot is unlikely to be accurate. The feedback is most useful in deliberate practice.'], ['Shows movement feedback.', 'Shows firing inaccuracy.', 'Can become noisy in real fights.']],
      ['Use two profiles instead of compromising', ['Save one learning profile with an error option enabled and one static match profile. Switch after the drill instead of forcing one crosshair to do both jobs.'], ['Training profile: one feedback option.', 'Match profile: stable center.', 'Keep color and base shape similar for a fair comparison.']],
    ],
    faq: [['Do pros use static crosshairs?', 'Many competitive players use static layouts, though individual settings can change.'], ['Is a dynamic crosshair bad?', 'No. It is useful feedback when learning, but some players find the motion distracting.']],
    recommendedCrosshairIds: ['tenz', 'aspas-dot', 'jinggg', 'forsaken'], relatedArticleKeys: ['movementError', 'firingError', 'movementVsFiring'], relatedCollectionKeys: ['minimalist', 'beginner'], relatedToolKeys: ['generator', 'comparison'],
    metaTitle: 'Static vs Dynamic Crosshair in VALORANT | AimCodes', metaDescription: 'Compare static and dynamic VALORANT crosshairs, understand movement and firing feedback, and choose a stable or training setup.',
  },
  dotVsCross: {
    title: 'Dot vs cross crosshair in VALORANT', intro: 'Compare a precise single center mark with four short lines that are easier to track during movement.', summary: 'Choose a dot when you want the cleanest exact center and can keep it visible. Choose a short cross when you need more shape to reacquire without covering the target.',
    sections: [
      ['What a dot does well', ['A dot marks the exact center and leaves the rest of the target clear. It suits deliberate taps and disciplined placement.'], ['Very clean center.', 'Minimal target coverage.', 'Easy to lose when too small.']],
      ['What a short cross does well', ['Four lines create a larger visual pattern while a small gap can keep the head visible. It is easier for many players to follow during turns and bursts.'], ['More shape to track.', 'Adjustable center gap.', 'Can cover more when lines are long.']],
      ['Compare without changing everything', ['Use the same color and map, then switch only the shape. The better choice is the one you find faster after looking away from the center.'], ['Same color.', 'Same background.', 'Normal preview scale.']],
    ],
    faq: [['Is a dot more accurate than a cross?', 'No. It may feel more precise, but the crosshair shape does not change weapon accuracy.'], ['Which is better for beginners?', 'A short cross is usually easier to track than a tiny dot.']],
    recommendedCrosshairIds: ['aspas-dot', 'demon1', 'tenz', 'jinggg'], relatedArticleKeys: ['makeDot', 'settings'], relatedCollectionKeys: ['dot', 'minimalist', 'beginner'], relatedToolKeys: ['comparison', 'preview'],
    metaTitle: 'Dot vs Cross Crosshair in VALORANT | AimCodes', metaDescription: 'Compare dot and cross VALORANT crosshairs. Learn visibility, center gap and target coverage tradeoffs, then preview working codes.',
  },
  placement: {
    title: 'VALORANT crosshair placement guide', intro: 'Keep the center where an enemy head is likely to appear so your next duel needs less mouse movement.', summary: 'Place the crosshair at head height, hold it away from the corner based on expected swing speed, and move it through the map before the enemy appears. Good placement reduces the correction required after contact.',
    sections: [
      ['Build a head-height reference', ['Use map geometry, teammate models, boxes, and repeated wall details to learn common head height. Keep checking the line while you move.'], ['Use stable map landmarks.', 'Correct the height before the peek.', 'Practice both sides of common angles.']],
      ['Hold the correct distance from a corner', ['A very tight hold suits a slow shoulder peek; a wider hold gives you room for a fast swing. Match the distance to the opponent and your own reaction time.'], ['Do not glue the crosshair to every wall edge.', 'Hold wider for likely fast swings.', 'Adjust after seeing the opponent’s habits.']],
      ['Clear angles in a deliberate order', ['Move the crosshair from one likely position to the next instead of dragging it through empty space. Keep the center ready before your model becomes exposed.'], ['Clear one threat at a time.', 'Move the crosshair before the body.', 'Stop fully before the accurate shot.']],
    ],
    faq: [['What is crosshair placement?', 'It is keeping your aiming reference near the position where an enemy is most likely to appear.'], ['How high should my crosshair be?', 'Use expected enemy head height, adjusted for ramps, stairs, elevation, and distance.']],
    recommendedCrosshairIds: ['tenz', 'aspas-dot', 'forsaken', 'jinggg'], relatedArticleKeys: ['movementError', 'dotVsCross'], relatedCollectionKeys: ['headshot', 'oneTap'], relatedToolKeys: ['preview', 'comparison'],
    metaTitle: 'VALORANT Crosshair Placement Guide | AimCodes', metaDescription: 'Improve VALORANT crosshair placement with head-height references, correct corner distance and deliberate angle clearing.',
  },
}

const localeLabels = {
  en: { eyebrow: 'SOLVE THE CROSSHAIR PROBLEM', summaryTitle: 'Quick answer', cta: 'Crosshairs to test' },
  es: { eyebrow: 'RESUELVE EL PROBLEMA DE LA MIRA', summaryTitle: 'Respuesta rápida', cta: 'Miras para probar' },
  'pt-BR': { eyebrow: 'RESOLVA O PROBLEMA DA MIRA', summaryTitle: 'Resposta rápida', cta: 'Miras para testar' },
  'zh-CN': { eyebrow: '先把准星问题解决', summaryTitle: '快速结论', cta: '接着试这些准星' },
}

const localizedGuides = {
  es: {
    copy: ['Cómo copiar una mira en VALORANT', 'Especta al compañero correcto, escribe /cc en el chat y revisa el perfil guardado.', 'Mientras ves al jugador, usa /cc. Después abre Ajustes → Mira, busca el perfil copiado, cámbiale el nombre y pruébalo.', ['Copiar al jugador que observas', 'Encontrar y probar el perfil', 'Qué revisar si /cc no funciona']],
    notWorking: ['El código de mira de VALORANT no funciona: soluciones', 'Comprueba el código completo, la pantalla de importación y el espacio disponible para perfiles.', 'Copia otra vez el código sin espacios, pégalo en Importar código de perfil y compara los ajustes reales si la vista previa parece distinta.', ['Revisar el código completo', 'Usar la pantalla correcta', 'Resolver diferencias de vista previa']],
    makeDot: ['Cómo hacer una mira de punto en VALORANT', 'Activa el punto central, desactiva las líneas y conserva suficiente visibilidad.', 'Empieza con punto central, opacidad completa y líneas apagadas. Añade contorno fino o cian si se pierde.', ['Dejar solo el punto', 'Elegir tamaño y contorno', 'Probar sin perder visibilidad']],
    makeCircle: ['Cómo hacer una mira circular en VALORANT', 'Construye o edita una mira circular con líneas cortas y un desplazamiento cerrado.', 'Esta guía es para ajustar los valores tú mismo. La forma circular es una aproximación con líneas; compárala a escala normal con códigos listos para copiar.', ['Construir un aro simétrico', 'Decidir si usar punto central', 'Comparar con un código verificado']],
    movementError: ['Error de movimiento de la mira en VALORANT', 'La animación muestra cuándo moverte reduce la precisión; sirve para aprender a detenerse.', 'Úsala en práctica para ver cuándo la mira se asienta y desactívala si añade ruido en duelos.', ['Qué muestra el error de movimiento', 'Usarlo para practicar', 'Cuándo desactivarlo']],
    firingError: ['Error de disparo de la mira en VALORANT', 'La mira reacciona a la inexactitud durante disparos y ráfagas, pero no controla el recoil.', 'Úsalo para aprender el reinicio de las ráfagas y apágalo si el centro en movimiento distrae.', ['Qué muestra el error de disparo', 'Practicar el reinicio de ráfaga', 'Por qué muchos lo desactivan']],
    movementVsFiring: ['Error de movimiento vs error de disparo en VALORANT', 'Uno responde al movimiento inexacto; el otro, a la inexactitud creada al disparar.', 'Prueba una opción cada vez con el mismo arma para reconocer qué señal estás viendo.', ['El movimiento empieza antes del disparo', 'El error de disparo sigue la ráfaga', 'Probar una opción cada vez']],
    staticVsDynamic: ['Mira estática vs dinámica en VALORANT', 'La estática mantiene un centro fijo; la dinámica muestra feedback de precisión.', 'Usa una mira dinámica para aprender y un perfil estático cuando quieras una referencia constante.', ['Ventajas de la mira estática', 'Cuándo ayuda la dinámica', 'Guardar dos perfiles']],
    dotVsCross: ['Mira de punto vs cruz en VALORANT', 'El punto ofrece un centro limpio; la cruz corta da más forma para seguir con la vista.', 'Compara ambas con el mismo color y mapa. Elige la que encuentres antes sin tapar al rival.', ['Ventajas del punto', 'Ventajas de la cruz corta', 'Comparar sin cambiar todo']],
    placement: ['Guía de colocación de mira en VALORANT', 'Mantén el centro a la altura de la cabeza y preparado para la posición probable del rival.', 'Usa referencias del mapa, separa la mira de la esquina según el swing y limpia ángulos en orden.', ['Aprender la altura de cabeza', 'Separarse bien de la esquina', 'Limpiar ángulos con orden']],
  },
  'pt-BR': {
    copy: ['Como copiar uma mira no VALORANT', 'Especte o aliado certo, digite /cc no chat e confira o perfil salvo.', 'Enquanto observa o jogador, use /cc. Depois abra Configurações → Mira, encontre o perfil, renomeie e teste.', ['Copiar o jogador observado', 'Encontrar e testar o perfil', 'O que conferir se /cc falhar']],
    notWorking: ['Código de mira do VALORANT não funciona: soluções', 'Confira o código completo, a tela de importação e o espaço para perfis.', 'Copie novamente sem espaços, cole em Importar código de perfil e compare os ajustes reais se a prévia parecer diferente.', ['Revisar o código completo', 'Usar a tela correta', 'Resolver diferenças de prévia']],
    makeDot: ['Como fazer uma mira de ponto no VALORANT', 'Ative o ponto central, desligue as linhas e mantenha visibilidade suficiente.', 'Comece com ponto central, opacidade total e linhas desligadas. Use contorno fino ou ciano se sumir.', ['Deixar só o ponto', 'Escolher tamanho e contorno', 'Testar sem perder visibilidade']],
    makeCircle: ['Como fazer uma mira circular no VALORANT', 'Monte ou edite uma mira circular com linhas curtas e deslocamento fechado.', 'Este guia é para ajustar os valores por conta própria. O círculo é uma aproximação com linhas; compare em escala normal com códigos prontos para copiar.', ['Construir um anel simétrico', 'Decidir sobre o ponto central', 'Comparar com código verificado']],
    movementError: ['Erro de movimento da mira no VALORANT', 'A animação mostra quando o movimento reduz a precisão e ajuda a aprender a parar.', 'Use no treino para ver quando a mira assenta e desligue se adicionar ruído nas lutas.', ['O que o erro mostra', 'Usar para praticar', 'Quando desligar']],
    firingError: ['Erro de disparo da mira no VALORANT', 'A mira reage à imprecisão durante tiros e rajadas, mas não controla o recoil.', 'Use para aprender o reset da rajada e desligue se o centro em movimento distrair.', ['O que o erro de disparo mostra', 'Praticar o reset', 'Por que muitos desligam']],
    movementVsFiring: ['Erro de movimento vs erro de disparo no VALORANT', 'Um responde ao movimento impreciso; o outro, à imprecisão criada pelos tiros.', 'Teste uma opção por vez com a mesma arma para identificar cada sinal.', ['Movimento começa antes do tiro', 'Erro de disparo segue a rajada', 'Testar uma opção por vez']],
    staticVsDynamic: ['Mira estática vs dinâmica no VALORANT', 'A estática mantém o centro fixo; a dinâmica mostra feedback de precisão.', 'Use dinâmica para aprender e um perfil estático quando quiser referência constante.', ['Vantagens da estática', 'Quando a dinâmica ajuda', 'Salvar dois perfis']],
    dotVsCross: ['Mira de ponto vs cruz no VALORANT', 'O ponto oferece centro limpo; a cruz curta dá mais forma para acompanhar.', 'Compare com a mesma cor e mapa. Escolha o que você encontra mais rápido sem cobrir o alvo.', ['Vantagens do ponto', 'Vantagens da cruz curta', 'Comparar sem mudar tudo']],
    placement: ['Guia de posicionamento de mira no VALORANT', 'Mantenha o centro na altura da cabeça e pronto para a posição provável do inimigo.', 'Use referências do mapa, ajuste a distância da quina ao swing e limpe ângulos em ordem.', ['Aprender altura da cabeça', 'Segurar a distância certa da quina', 'Limpar ângulos em ordem']],
  },
  'zh-CN': {
    copy: ['无畏契约怎么复制队友准星', '先观战目标队友，在聊天框输入 /cc，再检查游戏保存的新准星方案。', '观战到正确玩家后输入 /cc。回合结束后打开设置 → 准星，找到复制结果、重新命名并试用。', ['复制正在观战的玩家', '找到并测试新方案', '/cc 没反应时检查什么']],
    notWorking: ['无畏契约准星代码无法使用怎么办', '先检查完整代码、正确导入入口和剩余准星方案位置。', '重新复制完整代码，粘贴到“导入准星配置代码”，如果预览不同，再逐项核对真实参数。', ['检查代码有没有缺失', '使用正确导入入口', '处理预览效果不同']],
    makeDot: ['无畏契约圆点准星怎么调', '开启中心点、关闭内外线，同时保留足够可见度。', '从中心点、满透明度和关闭内外线开始；亮墙上容易丢时，加细轮廓或换成青色。', ['只保留中心点', '选择大小和轮廓', '检查会不会丢失']],
    makeCircle: ['无畏契约圆形准星怎么调', '用对称短线和闭合偏移自己制作或修改圆形准星。', '这篇教程解决的是参数怎么调。圆形是像素线条形成的近似效果，调完后请和可直接复制的代码放在同一地图里对比。', ['拼出对称圆环', '决定是否保留中心点', '和已验证代码比较']],
    movementError: ['无畏契约移动误差准星是什么', '移动误差会显示移动导致的失准，适合用来学习停枪。', '训练时观察准星何时恢复稳定；熟悉停枪后，如果动画干扰交战就关闭。', ['移动误差显示什么', '把它当成训练反馈', '什么时候关闭']],
    firingError: ['无畏契约射击误差准星是什么', '射击误差会反映连射过程中的失准，但不会帮你控制后坐力。', '用它观察短点射的恢复时间；如果变化的中心干扰视线，就换回静态准星。', ['射击误差显示什么', '练习点射恢复', '为什么很多玩家关闭']],
    movementVsFiring: ['无畏契约移动误差和射击误差区别', '一个响应移动造成的失准，另一个响应开枪造成的失准。', '固定武器，每次只开一个选项练习，才能看清两种反馈的区别。', ['移动误差从开枪前开始', '射击误差跟随连射', '一次只测试一个']],
    staticVsDynamic: ['无畏契约静态准星和动态准星怎么选', '静态准星保持固定中心；动态准星会显示精度反馈。', '训练阶段可以用动态反馈，正式交战想要稳定参照时使用静态方案。', ['静态准星的优势', '动态准星什么时候有用', '分别保存两个方案']],
    dotVsCross: ['无畏契约圆点准星和十字准星怎么选', '圆点中心最干净，短十字则提供更多容易跟住的形状。', '固定颜色和地图只比较造型，选择更快被视线找到、又不会挡住目标的那款。', ['圆点的优势', '短十字的优势', '不要同时修改所有参数']],
    placement: ['无畏契约准星预瞄与摆位指南', '把中心提前放在敌人最可能出现的头部位置，减少看到人之后的鼠标修正。', '利用地图参照学习头线，根据对方横拉速度留出距离，并按顺序清理角度。', ['建立头线参照', '和墙角保持合适距离', '按顺序清理角度']],
  },
}

const localizedSectionBodies = {
  es: {
    copy: ['Espera a espectar al compañero correcto y escribe /cc. El comando copia al jugador observado.', 'Abre Ajustes → Mira, localiza el perfil nuevo, renómbralo y pruébalo antes de borrar tu configuración anterior.', 'Si falla, confirma que estás espectando y que queda espacio para otro perfil. Los códigos de una web se importan desde Ajustes, no desde el chat.'],
    notWorking: ['Un carácter ausente, un espacio o un final cortado invalida el código. Vuelve a copiarlo completo.', 'Pega el código en Importar código de perfil dentro de Ajustes → Mira, no en el chat ni en el nombre del perfil.', 'Si importa pero se ve distinto, compara color, contorno, punto y líneas reales; una captura ampliada puede engañar.'],
    makeDot: ['Activa Punto central y desactiva Líneas interiores y exteriores para dejar una sola marca.', 'Empieza con opacidad completa y el menor tamaño que aún encuentres. Usa contorno fino si el blanco se pierde.', 'Compara el punto con una microcruz sobre escenas claras y oscuras antes de ranked.'],
    makeCircle: ['Iguala las longitudes horizontal y vertical y usa un desplazamiento corto para aproximar un aro.', 'El punto central refuerza el medio, pero llena el hueco. Desactívalo si quieres ver al rival a través del aro.', 'La forma depende de resolución y escala. Compárala con un código verificado en el mismo mapa.'],
    movementError: ['La mira cambia mientras el movimiento reduce la precisión. Es feedback visual, no una mejora del arma.', 'Practica strafe, parada y disparo observando cuándo vuelve al estado estable.', 'Cuando ya controles la parada, una mira estática puede ser más limpia en duelos.'],
    firingError: ['La mira reacciona a la inexactitud de disparos repetidos, pero no reduce spread ni recoil.', 'Haz ráfagas cortas y espera a que la mira se cierre para aprender el tiempo de recuperación.', 'Si las líneas móviles distraen, vuelve a un centro estático y practica el patrón del arma.'],
    movementVsFiring: ['Si cambia antes de disparar mientras haces strafe, estás viendo error de movimiento.', 'Si se abre durante la ráfaga después de parar, estás viendo error de disparo.', 'Activa una sola opción por sesión de prueba y usa siempre la misma arma y distancia.'],
    staticVsDynamic: ['La mira estática conserva una referencia idéntica para colocación y seguimiento.', 'La dinámica enseña cuándo movimiento o disparos reducen precisión, pero añade animación.', 'Guarda un perfil de práctica con feedback y otro estático para partidas.'],
    dotVsCross: ['El punto deja el centro limpio y funciona bien para taps si no lo pierdes.', 'La cruz corta ofrece más forma para seguir durante giros y permite dejar un pequeño hueco.', 'Usa el mismo color, mapa y escala para comparar solo la geometría.'],
    placement: ['Aprende altura de cabeza con cajas, modelos y detalles repetidos del mapa.', 'No pegues siempre la mira a la esquina: deja más distancia cuando esperes un swing rápido.', 'Mueve la mira a la siguiente posición probable antes de exponer el cuerpo y detente para disparar.'],
  },
  'pt-BR': {
    copy: ['Espere até observar o aliado certo e digite /cc. O comando copia o jogador espectado.', 'Abra Configurações → Mira, encontre o perfil novo, renomeie e teste antes de apagar o anterior.', 'Se falhar, confirme que está espectando e que há espaço para outro perfil. Códigos de sites entram pelas Configurações, não pelo chat.'],
    notWorking: ['Um caractere faltando, espaço ou final cortado pode invalidar o código. Copie tudo novamente.', 'Cole em Importar código de perfil dentro de Configurações → Mira, não no chat nem no nome do perfil.', 'Se importar mas parecer diferente, compare cor, contorno, ponto e linhas reais; imagem ampliada pode enganar.'],
    makeDot: ['Ative Ponto central e desligue Linhas internas e externas para deixar uma única marca.', 'Comece com opacidade total e o menor tamanho que você ainda encontra. Use contorno fino se o branco sumir.', 'Compare o ponto com uma microcruz em cenas claras e escuras antes da ranked.'],
    makeCircle: ['Iguale comprimentos horizontal e vertical e use deslocamento curto para aproximar um anel.', 'O ponto reforça o meio, mas preenche o espaço. Desligue se quiser enxergar o alvo pelo anel.', 'A forma depende de resolução e escala. Compare com código verificado no mesmo mapa.'],
    movementError: ['A mira muda enquanto o movimento reduz a precisão. É feedback visual, não melhoria da arma.', 'Pratique strafe, parada e tiro observando quando volta ao estado estável.', 'Depois de aprender a parada, uma mira estática pode ser mais limpa nas lutas.'],
    firingError: ['A mira reage à imprecisão de tiros repetidos, mas não reduz spread nem recoil.', 'Faça rajadas curtas e espere fechar para aprender o tempo de recuperação.', 'Se as linhas móveis distraírem, volte ao centro estático e pratique o padrão da arma.'],
    movementVsFiring: ['Se muda antes do tiro durante o strafe, é erro de movimento.', 'Se abre durante a rajada depois de parar, é erro de disparo.', 'Ative apenas uma opção por teste e use a mesma arma e distância.'],
    staticVsDynamic: ['A mira estática mantém referência igual para posicionamento e acompanhamento.', 'A dinâmica ensina quando movimento ou tiros reduzem precisão, mas adiciona animação.', 'Salve um perfil de treino com feedback e outro estático para partidas.'],
    dotVsCross: ['O ponto deixa o centro limpo e funciona para taps quando você não o perde.', 'A cruz curta oferece mais forma para acompanhar e permite pequeno espaço central.', 'Use a mesma cor, mapa e escala para comparar apenas a geometria.'],
    placement: ['Aprenda altura da cabeça com caixas, modelos e detalhes repetidos do mapa.', 'Não cole sempre a mira na quina: segure mais longe quando esperar swing rápido.', 'Mova a mira para a próxima posição provável antes de expor o corpo e pare para atirar.'],
  },
  'zh-CN': {
    copy: ['等到观战正确队友后，在聊天框输入 /cc。命令复制的是当前观战玩家。', '打开设置 → 准星，找到新保存的方案，重新命名并测试，先不要删除原来的配置。', '如果失败，确认自己正在观战并且还有空余方案位置。网站代码要在设置里导入，不是发到聊天框。'],
    notWorking: ['少一个字符、多一个空格或结尾被截断，都可能让代码失效，请重新完整复制。', '进入设置 → 准星 → 导入准星配置代码，不要粘贴到聊天框或方案名称。', '代码能导入但效果不同，就核对颜色、轮廓、中心点和内外线；放大截图不代表游戏正常比例。'],
    makeDot: ['开启中心点，关闭内线和外线，只留下正中心标记。', '从满透明度和仍能被视线找回的最小尺寸开始；白点容易丢时使用细轮廓。', '正式排位前，把圆点和微型十字放到亮、暗场景里比较。'],
    makeCircle: ['让水平和垂直线长度一致，并缩小中心偏移，拼出近似圆环。', '中心点会加强正中心，但也会填掉圆环留空；想保留目标就关闭。', '圆形效果受分辨率和比例影响，请和已验证代码放在同一地图比较。'],
    movementError: ['移动降低精度时准星会变化，这只是视觉反馈，不会增强武器。', '练习横移、停稳、开枪，观察准星什么时候恢复稳定。', '熟悉停枪节奏后，如果动画影响对枪，就换回静态准星。'],
    firingError: ['连续开枪造成失准时准星会变化，但不会减少扩散或后坐力。', '练习短点射，并等待准星恢复，理解下一轮准确射击的间隔。', '如果变化线条干扰视线，就回到固定中心，再练武器本身的弹道。'],
    movementVsFiring: ['横移过程中、开枪之前准星就变化，说明是移动误差。', '停稳后连射过程中准星扩张，说明是射击误差。', '每轮只开启一个选项，并固定武器和距离，区别会更清楚。'],
    staticVsDynamic: ['静态准星始终提供相同中心，更适合预瞄和重复定位。', '动态准星能提示移动或开枪造成的失准，但会增加动画干扰。', '分别保存训练用动态方案和实战用静态方案，不必强迫一个准星兼顾全部任务。'],
    dotVsCross: ['圆点中心最干净，适合稳定单点，但过小时容易消失。', '短十字提供更多可跟踪形状，还能通过小幅留空保留目标。', '固定颜色、地图和显示比例，只比较造型差异。'],
    placement: ['利用箱子、队友模型和重复墙面细节，建立常见位置的头线参照。', '不要永远贴墙角放准星；预计对方快速横拉时，要提前留出更宽距离。', '身体暴露前先把准星移动到下一个高概率位置，停稳后再打准确第一枪。'],
  },
}

const localizedFaqs = {
  es: {
    copy: [['¿Qué hace /cc en VALORANT?', 'Copia la mira del jugador que estás espectando al listado de perfiles disponibles.'], ['¿Puedo pegar un código de una web con /cc?', 'No. Los códigos de perfil se pegan desde Ajustes → Mira → Importar código de perfil.']],
    notWorking: [['¿Por qué aparece que el código no es válido?', 'Suele faltar un carácter, sobrar un espacio o haberse pegado en el campo equivocado.'], ['¿Qué hago si importa pero se ve diferente?', 'Compara color, contorno, punto y líneas dentro del juego; una captura ampliada puede alterar la percepción.']],
    makeDot: [['¿Una mira de punto mejora la precisión?', 'No cambia el arma, pero ofrece una referencia central limpia si puedes verla bien.'], ['¿Qué tamaño de punto conviene?', 'El menor que puedas recuperar con la vista de forma consistente en tu resolución.']],
    makeCircle: [['¿VALORANT permite un círculo perfecto?', 'La figura es una aproximación de píxeles creada con líneas cortas.'], ['¿Conviene usar punto central?', 'Actívalo para marcar mejor el centro o apágalo para conservar el hueco del aro.']],
    movementError: [['¿El error de movimiento mejora la precisión?', 'No. Solo muestra visualmente la penalización que ya provoca el movimiento.'], ['¿Cuándo debo apagarlo?', 'Cuando ya controles la parada y la animación distraiga en los duelos.']],
    firingError: [['¿El error de disparo muestra el recoil?', 'Muestra inexactitud, pero no es una guía completa de recoil ni controla el spray.'], ['¿Debo usarlo en partida?', 'Puede ayudar en práctica; usa una mira estática si la animación te distrae.']],
    movementVsFiring: [['¿Son la misma opción?', 'No. Una responde al movimiento y la otra a la inexactitud generada al disparar.'], ['¿Puedo desactivar ambas?', 'Sí. Así obtienes una mira completamente estática.']],
    staticVsDynamic: [['¿Una mira dinámica es mala?', 'No. Es una herramienta de aprendizaje, aunque el movimiento puede distraer en combate.'], ['¿Por qué guardar dos perfiles?', 'Permite practicar con feedback y volver a una referencia estable sin rehacer ajustes.']],
    dotVsCross: [['¿El punto es más preciso que la cruz?', 'No cambia la precisión del arma; solo cambia tu referencia visual.'], ['¿Cuál suele ser más fácil para empezar?', 'Una cruz corta suele ser más fácil de encontrar que un micropunto.']],
    placement: [['¿Qué significa colocar bien la mira?', 'Mantener el centro cerca de donde probablemente aparecerá la cabeza del rival.'], ['¿Debo pegar la mira a la esquina?', 'No siempre; deja más espacio cuando esperes un swing rápido.']],
  },
  'pt-BR': {
    copy: [['O que o /cc faz no VALORANT?', 'Copia a mira do jogador que você está espectando para os perfis disponíveis.'], ['Posso colar código de site usando /cc?', 'Não. Códigos entram em Configurações → Mira → Importar código de perfil.']],
    notWorking: [['Por que o código aparece como inválido?', 'Normalmente falta um caractere, existe um espaço extra ou o código foi colado no campo errado.'], ['E se importar, mas parecer diferente?', 'Compare cor, contorno, ponto e linhas no jogo; uma imagem ampliada pode enganar.']],
    makeDot: [['A mira de ponto melhora a precisão?', 'Não altera a arma, mas oferece uma referência central limpa quando continua visível.'], ['Qual tamanho de ponto usar?', 'O menor que você consegue reencontrar de forma consistente na sua resolução.']],
    makeCircle: [['Dá para criar um círculo perfeito?', 'O formato é uma aproximação em pixels formada por linhas curtas.'], ['Devo manter o ponto central?', 'Ligue para reforçar o meio ou desligue para preservar o espaço do anel.']],
    movementError: [['O erro de movimento melhora a precisão?', 'Não. Ele só mostra a penalidade que o movimento já causa.'], ['Quando devo desligar?', 'Quando você já domina a parada e a animação distrai nas lutas.']],
    firingError: [['O erro de disparo mostra recoil?', 'Mostra imprecisão, mas não é um guia completo nem controla o spray.'], ['Devo usar em partidas?', 'Pode ajudar no treino; volte à mira estática se a animação distrair.']],
    movementVsFiring: [['As duas opções são iguais?', 'Não. Uma reage ao movimento e a outra à imprecisão dos tiros.'], ['Posso desligar ambas?', 'Sim. Isso cria uma mira totalmente estática.']],
    staticVsDynamic: [['Mira dinâmica é ruim?', 'Não. Ela ajuda no aprendizado, mas a animação pode distrair no combate.'], ['Por que salvar dois perfis?', 'Assim você treina com feedback e volta à referência estável sem refazer tudo.']],
    dotVsCross: [['O ponto é mais preciso que a cruz?', 'Não muda a precisão da arma; muda apenas a referência visual.'], ['Qual costuma ser mais fácil para iniciantes?', 'Uma cruz curta costuma ser mais fácil de encontrar que um microponto.']],
    placement: [['O que é posicionamento de mira?', 'É manter o centro perto de onde a cabeça do inimigo provavelmente aparecerá.'], ['Devo colar a mira na quina?', 'Nem sempre; segure mais longe quando esperar um swing rápido.']],
  },
  'zh-CN': {
    copy: [['/cc 在无畏契约里有什么作用？', '它会把当前观战玩家的准星复制到你的可用准星方案中。'], ['网站里的代码也用 /cc 吗？', '不是。网站代码要从设置 → 准星 → 导入准星配置代码粘贴。']],
    notWorking: [['为什么提示代码无效？', '常见原因是字符缺失、混入空格，或者代码被粘贴到错误输入框。'], ['代码能导入但看着不一样怎么办？', '在游戏里核对颜色、轮廓、中心点和内外线，放大截图可能会误导。']],
    makeDot: [['圆点准星会提高武器精度吗？', '不会改变武器数据，它只是提供更干净的中心参照。'], ['圆点多大合适？', '选择在你的分辨率下仍能稳定找回的最小尺寸。']],
    makeCircle: [['能调出完全圆形的准星吗？', '游戏用短像素线近似圆环，不是数学意义上的平滑圆。'], ['要不要保留中心点？', '想强化中心就开启；想保留圆环中空视野就关闭。']],
    movementError: [['移动误差会让枪更准吗？', '不会，它只显示移动本来就会造成的精度惩罚。'], ['什么时候适合关闭？', '熟悉停枪节奏后，如果动画影响对枪就可以关闭。']],
    firingError: [['射击误差就是后坐力提示吗？', '它反映失准，但不是完整压枪指南，也不会控制弹道。'], ['实战要不要开启？', '训练时可以使用；如果动画干扰中心定位，实战换回静态准星。']],
    movementVsFiring: [['移动误差和射击误差一样吗？', '不一样，一个响应移动失准，另一个响应开枪造成的失准。'], ['可以两个都关闭吗？', '可以，关闭后就是完全稳定的静态准星。']],
    staticVsDynamic: [['动态准星一定不好吗？', '不是，它能帮助学习精度反馈，只是实战动画可能会分散注意力。'], ['为什么建议保存两套方案？', '训练和实战可以直接切换，不需要每次重新调整参数。']],
    dotVsCross: [['圆点比十字更准吗？', '不会改变武器精度，只会改变你的视觉参照。'], ['新手更适合哪一种？', '短十字通常比微型圆点更容易被视线找回。']],
    placement: [['什么是准星摆位？', '提前把中心放在敌人最可能出现的头部位置附近。'], ['准星应该一直贴着墙角吗？', '不一定，预计对方快速横拉时要留出更宽距离。']],
  },
}

function localizedExpansion(locale, articleKey) {
  const localized = localizedGuides[locale]?.[articleKey]
  const english = englishGuides[articleKey]
  if (!localized || !english) return null
  const [title, intro, summary, sectionTitles] = localized
  const sections = english.sections.map((_, index) => ({
    title: sectionTitles[index],
    paragraphs: [localizedSectionBodies[locale][articleKey][index]],
    bullets: [],
  }))
  return {
    ...english,
    eyebrow: localeLabels[locale].eyebrow,
    title,
    intro,
    summaryTitle: localeLabels[locale].summaryTitle,
    summary,
    sections,
    faq: localizedFaqs[locale][articleKey],
    cta: localeLabels[locale].cta,
    metaTitle: `${title} | AimCodes`,
    metaDescription: intro,
  }
}

export function expansionArticleCopy(locale, articleKey) {
  const english = englishGuides[articleKey]
  if (!english) return null
  if (locale !== 'en') return localizedExpansion(locale, articleKey)
  return {
    ...english,
    eyebrow: localeLabels.en.eyebrow,
    summaryTitle: localeLabels.en.summaryTitle,
    cta: localeLabels.en.cta,
    sections: english.sections.map(([title, paragraphs, bullets]) => ({ title, paragraphs, bullets })),
  }
}
