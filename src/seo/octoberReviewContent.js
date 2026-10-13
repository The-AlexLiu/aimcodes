// Query and page evidence: docs/SEO_REVIEW_2026-10-13.md.
// These additions reuse existing routes; they do not expand the index.
export const octoberReviewCopy = {
  en: {
    catalog: { eyebrow: 'SEARCH · PREVIEW · COPY', title: 'VALORANT Crosshair Database & Codes', intro: 'Search the crosshair database by player, color or style. Preview a profile on a map, compare its shape, then copy the code into VALORANT.', metaTitle: 'VALORANT Crosshair Database & Codes | AimCodes', metaDescription: 'Search the VALORANT crosshair database for pro player, dot, small and funny profiles. Preview on maps, change colors and copy a working code.', help: 'Find a shape or build your own', helpBody: 'Try a player name such as aspas, a color such as cyan, or a style such as dot. The database includes player-source snapshots and AimCodes originals; a player label does not guarantee today’s settings.', links: ['Pick a starting code', 'Build a crosshair', 'Import a profile code'] },
    best: { title: 'Choose a starting shape', intro: 'Start with a dot, an open cross or a closed center. Compare the same map and color before changing more settings.', picks: [['tenz', 'TenZ · open cross', 'Short lines with room to see the target in the center.'], ['demon1', 'Demon1 · dot', 'One center mark; check whether you can still find it on bright walls.'], ['aspas-dot', 'aspas · closed cross', 'Short connected lines when an isolated dot is easy to lose.']], metaTitle: 'Best VALORANT Crosshair Codes to Preview & Copy | AimCodes', metaDescription: 'Choose a VALORANT crosshair code from dots, open crosses and compact player setups. Preview the same map, compare colors and copy a profile.', database: 'Search the full crosshair database' },
    colors: { title: 'Best VALORANT Crosshair Color: Compare Cyan, Green & White', intro: 'Keep one shape and compare cyan, green and white on the same map. Choose the color you can find quickly, then check it against your in-game enemy outline.', metaTitle: 'VALORANT Crosshair Colors: Cyan, Green & White | AimCodes', metaDescription: 'Compare cyan, green and white on the same VALORANT crosshair and map. Check color codes, outlines and visibility, then open a profile to copy.', section: 'Crosshair color and enemy outline are separate settings', paragraphs: ['A crosshair profile changes your aiming mark. It does not set the color of enemy outlines. Keep those two colors distinct when you test visibility.', 'For a white crosshair, also compare a thin outline in game. A browser map preview helps shortlist colors; it does not prove better accuracy or identical visibility on your monitor.'], compareTitle: 'One shape, three colors', compareBody: 'These previews keep the TenZ shape, scale and outline settings unchanged. Switch the map for all three, then open your preferred color to copy its code.', names: ['Cyan', 'Green', 'White'], open: 'Try this color', map: 'Comparison map' },
    profile: { title: 'What is a crosshair profile code?', body: 'It is the complete settings string, including its separators—not a player name or a color value. Copy the whole profile with the copy button. Use the decoder to inspect it, then import it into the game; browser parsing alone does not confirm current game compatibility.' },
    sourceDate: 'Source snapshot checked', sourceNote: 'A dated snapshot, not a claim about the player’s current setup.', toolLinks: ['Search existing codes', 'Import the finished profile', 'Read the crosshair settings'], guideLinks: ['Inspect a profile code', 'Fix an import error'], circleSettings: 'Make your own circle',
  },
  es: {
    catalog: { eyebrow: 'BUSCA · PRUEBA · COPIA', title: 'Base de datos de miras y códigos de VALORANT', intro: 'Busca por jugador, color o estilo. Prueba la mira sobre un mapa, compara la forma y copia el código en VALORANT.', metaTitle: 'Base de Datos de Miras y Códigos de VALORANT | AimCodes', metaDescription: 'Busca códigos de mira de VALORANT: pros, puntos, cruces pequeñas y formas divertidas. Prueba sobre mapas, cambia el color y copia el perfil.', help: 'Encuentra una forma o crea la tuya', helpBody: 'Prueba un nombre como aspas, un color como cian o un estilo como punto. La biblioteca reúne perfiles con fuente del jugador y diseños de AimCodes; el nombre no garantiza sus ajustes actuales.', links: ['Elegir un código', 'Crear una mira', 'Importar un perfil'] },
    best: { title: 'Elige una forma para empezar', intro: 'Empieza con punto, cruz abierta o centro cerrado. Mantén el mismo mapa y color para comparar.', picks: [['tenz', 'TenZ · cruz abierta', 'Líneas cortas que dejan ver el objetivo en el centro.'], ['demon1', 'Demon1 · punto', 'Una marca central; comprueba que la encuentras sobre paredes claras.'], ['aspas-dot', 'aspas · cruz cerrada', 'Líneas unidas si te cuesta seguir un punto aislado.']], metaTitle: 'Mejores Miras de VALORANT: Códigos para Copiar | AimCodes', metaDescription: 'Elige códigos de mira de VALORANT entre puntos, cruces abiertas y perfiles compactos. Prueba sobre el mismo mapa, compara colores y copia.', database: 'Buscar en toda la biblioteca de miras' },
    colors: { title: 'Colores de mira de VALORANT: cian, verde y blanco', intro: 'Mantén una forma y compara cian, verde y blanco en el mismo mapa. Después comprueba el contraste con el contorno del enemigo en el juego.', metaTitle: 'Colores de Mira de VALORANT: Cian, Verde y Blanco | AimCodes', metaDescription: 'Compara cian, verde y blanco con la misma mira y mapa de VALORANT. Revisa códigos de color, contornos y visibilidad; abre un perfil para copiar.', section: 'El color de la mira y el contorno enemigo son ajustes distintos', paragraphs: ['El perfil cambia la mira, no el color del contorno enemigo. Prueba colores que puedas distinguir al apuntar.', 'Si usas blanco, compara también un contorno fino en el juego. La vista previa ayuda a elegir; no demuestra más precisión ni reproduce tu monitor.'], compareTitle: 'Una forma, tres colores', compareBody: 'Estas vistas mantienen la forma de TenZ, la escala y el contorno. Cambia el mapa para las tres y abre el color que prefieras para copiar.', names: ['Cian', 'Verde', 'Blanco'], open: 'Probar este color', map: 'Mapa de comparación' },
    profile: { title: '¿Qué es un código de perfil de mira?', body: 'Es la cadena completa de ajustes, con sus separadores; no es el nombre del jugador ni un valor de color. Copia todo el perfil con el botón. Puedes inspeccionarlo en el decodificador y después importarlo; que el navegador lo lea no garantiza compatibilidad con la versión actual del juego.' },
    sourceDate: 'Fuente comprobada el', sourceNote: 'Perfil guardado en esa fecha; no confirma los ajustes actuales del jugador.', toolLinks: ['Buscar códigos existentes', 'Importar el perfil creado', 'Ver los ajustes de mira'], guideLinks: ['Inspeccionar un código', 'Corregir un error de importación'], circleSettings: 'Crear tu propio círculo',
  },
  'pt-BR': {
    catalog: { eyebrow: 'BUSQUE · TESTE · COPIE', title: 'Banco de miras e códigos do VALORANT', intro: 'Busque por jogador, cor ou estilo. Veja a mira no mapa, compare o formato e copie o código para o VALORANT.', metaTitle: 'Banco de Miras e Códigos do VALORANT | AimCodes', metaDescription: 'Busque códigos de mira do VALORANT: pros, pontos, cruzes pequenas e formatos divertidos. Teste nos mapas, troque a cor e copie o perfil.', help: 'Ache um formato ou crie o seu', helpBody: 'Tente um nome como aspas, uma cor como ciano ou um estilo como ponto. O banco reúne registros com fonte do jogador e criações do AimCodes; o nome não garante a configuração atual.', links: ['Escolher um código', 'Criar uma mira', 'Importar um perfil'] },
    best: { title: 'Escolha um formato para começar', intro: 'Comece com ponto, cruz aberta ou centro fechado. Compare no mesmo mapa e com a mesma cor.', picks: [['tenz', 'TenZ · cruz aberta', 'Linhas curtas com espaço para ver o alvo no centro.'], ['demon1', 'Demon1 · ponto', 'Uma marca central; confira se você a encontra em paredes claras.'], ['aspas-dot', 'aspas · cruz fechada', 'Linhas conectadas quando um ponto sozinho some da vista.']], metaTitle: 'Melhores Miras do VALORANT: Códigos para Copiar | AimCodes', metaDescription: 'Escolha códigos de mira do VALORANT entre pontos, cruzes abertas e perfis compactos. Teste no mesmo mapa, compare cores e copie o perfil.', database: 'Buscar no banco completo de miras' },
    colors: { title: 'Cores de mira do VALORANT: ciano, verde e branco', intro: 'Mantenha um formato e compare ciano, verde e branco no mesmo mapa. Depois confira o contraste com o contorno inimigo no jogo.', metaTitle: 'Cores de Mira do VALORANT: Ciano, Verde e Branco | AimCodes', metaDescription: 'Compare ciano, verde e branco com a mesma mira e mapa do VALORANT. Veja códigos de cor, contornos e visibilidade; abra um perfil para copiar.', section: 'Cor da mira e contorno inimigo são ajustes separados', paragraphs: ['O perfil muda a mira, não a cor do contorno inimigo. Procure duas cores que continuem distintas ao mirar.', 'Com branco, teste também um contorno fino no jogo. A prévia ajuda a escolher, mas não prova mais precisão nem reproduz seu monitor.'], compareTitle: 'Um formato, três cores', compareBody: 'As prévias mantêm o formato do TenZ, a escala e o contorno. Troque o mapa das três e abra a cor preferida para copiar o código.', names: ['Ciano', 'Verde', 'Branco'], open: 'Testar esta cor', map: 'Mapa de comparação' },
    profile: { title: 'O que é um código de perfil de mira?', body: 'É a sequência completa dos ajustes, com os separadores; não é o nome do jogador nem um valor de cor. Copie tudo pelo botão. Confira no decodificador e depois importe no jogo; a leitura no navegador não garante compatibilidade com a versão atual.' },
    sourceDate: 'Fonte conferida em', sourceNote: 'Registro daquela data; não confirma a configuração atual do jogador.', toolLinks: ['Buscar códigos existentes', 'Importar o perfil criado', 'Ver os ajustes de mira'], guideLinks: ['Conferir um código', 'Resolver erro de importação'], circleSettings: 'Criar seu próprio círculo',
  },
  'zh-CN': {
    catalog: { eyebrow: '搜索 · 预览 · 复制', title: '无畏契约准星库与代码', intro: '按选手、颜色或样式找准星。在地图里对比造型和可见度，再把代码复制到游戏。', metaTitle: '无畏契约准星库与代码：搜索、预览、复制 | AimCodes', metaDescription: '搜索无畏契约职业选手、小圆点、小十字和趣味准星代码。在地图中预览，调整颜色，复制完整配置。', help: '找现成代码，也可以自己调', helpBody: '试着搜 aspas、青色或小圆点。库里既有记录了选手来源的配置，也有 AimCodes 原创造型；选手名字不代表他今天还在用这套设置。', links: ['先挑一款', '自己调准星', '导入配置代码'] },
    best: { title: '从一种中心造型开始', intro: '先选圆点、留空十字或闭合中心。固定地图和颜色对比，再调其他参数。', picks: [['tenz', 'TenZ · 留空十字', '短线围着中心，瞄准时还能看见中间的目标。'], ['demon1', 'Demon1 · 圆点', '只留一个中心点，先确认亮墙上能不能找得到。'], ['aspas-dot', 'aspas · 闭合十字', '短线连在中心，适合容易丢掉孤立小点时试用。']], metaTitle: '无畏契约准星推荐与代码：预览后复制 | AimCodes', metaDescription: '从圆点、留空十字和紧凑选手配置中挑准星。在同一地图上预览、对比颜色，再复制代码。', database: '搜索完整准星库' },
    colors: { title: '无畏契约准星颜色：青、绿、白怎么选', intro: '固定一个造型，在同一地图里试青色、绿色和白色。选出容易找回中心的颜色，再去游戏里确认它和敌人轮廓是否好区分。', metaTitle: '无畏契约准星颜色：青色、绿色与白色对比 | AimCodes', metaDescription: '用相同准星和地图比较青、绿、白，查看颜色代码与轮廓取舍，再打开对应配置复制代码。', section: '准星颜色和敌人轮廓是两个设置', paragraphs: ['准星配置只调整瞄准标记，不会修改敌人轮廓颜色。对着目标时也能分清这两种颜色，才值得留下。', '白色准星还可以在游戏里试一层细轮廓。网页预览用于筛选候选，不代表命中率提升，也不能完全复现你的显示器。'], compareTitle: '同一造型，试三种颜色', compareBody: '下方保留 TenZ 的形状、比例和轮廓参数，只改颜色。切换地图后，打开喜欢的那款就能复制代码。', names: ['青色', '绿色', '白色'], open: '试这个颜色', map: '对比地图' },
    profile: { title: '准星配置代码是什么？', body: '它是包含分隔符的完整设置字符串，不是选手名，也不是颜色值。用复制按钮取整段代码，可以先在解析器里看设置，再导入游戏；网页能解析不代表当前游戏版本一定接受。' },
    sourceDate: '来源核验日期', sourceNote: '这是当时留存的配置，不代表选手现在仍使用它。', toolLinks: ['找现成代码', '导入生成的配置', '看看参数怎么调'], guideLinks: ['解析配置代码', '排查导入错误'], circleSettings: '自己做一个圆环',
  },
  ja: {
    catalog: { eyebrow: '検索 · プレビュー · コピー', title: 'VALORANT クロスヘアデータベース・コード一覧', intro: '選手名・色・形から検索し、マップ上で見比べてからコードをコピー。ドットも小さい十字も、同じ場面で試せます。', metaTitle: 'VALORANT クロスヘアデータベース・コード一覧 | AimCodes', metaDescription: '選手名や色、形でVALORANTクロスヘアコードを検索。ドット・小さい十字・ネタ系をマップで試し、色を変えてコピーできます。', help: 'コードを探す、または自分で作る', helpBody: 'aspasなどの選手名、シアンなどの色、ドットなどの形で検索できます。選手の出典付き設定とAimCodesのオリジナルを収録。名前があっても現在の設定とは限りません。', links: ['最初の候補を選ぶ', 'クロスヘアを作る', 'コードをインポート'] },
    best: { title: '中心の形から選ぶ', intro: 'ドット、中心が開いた十字、閉じた十字から試しましょう。同じマップと色で比べてから他の設定を変えます。', picks: [['tenz', 'TenZ · 中心が開いた十字', '短い線と中心の隙間で、狙った相手を見やすくします。'], ['demon1', 'Demon1 · ドット', '中心を一点で表示。明るい壁でも見失わないか確認。'], ['aspas-dot', 'aspas · 閉じた十字', '小さな点を見失うときに、中心でつながる短い線を試せます。']], metaTitle: 'VALORANT おすすめクロスヘアコード：試してコピー | AimCodes', metaDescription: 'ドット・開いた十字・コンパクトな選手設定から候補を選び、同じマップで色と形を比較してコードをコピー。', database: 'クロスヘアデータベースを検索' },
    colors: { title: 'VALORANT クロスヘアの色：シアン・緑・白を比較', intro: '形を固定し、同じマップでシアン・緑・白を比べます。見つけやすい色を選んだら、ゲーム内の敵の輪郭との区別も確認しましょう。', metaTitle: 'VALORANT クロスヘアの色：シアン・緑・白 | AimCodes', metaDescription: '同じクロスヘアとマップでシアン・緑・白を比較。カラーコード、輪郭、見やすさを確認してコピーできます。', section: 'クロスヘアの色と敵の輪郭は別の設定', paragraphs: ['プロファイルコードは照準の色を変えるもので、敵の輪郭の色は変えません。敵に重ねたときも区別できる組み合わせを試します。', '白は細い輪郭もゲーム内で比較してください。マップのプレビューは候補選び用で、命中率の向上や実際の画面との一致を証明するものではありません。'], compareTitle: '同じ形で3色を試す', compareBody: 'TenZの形・倍率・輪郭を固定し、色だけを変えています。3つの背景をまとめて切り替え、好みの色を開いてコピーできます。', names: ['シアン', '緑', '白'], open: 'この色を試す', map: '比較するマップ' },
    profile: { title: 'クロスヘアのプロファイルコードとは？', body: '区切り文字を含む設定の文字列全体です。選手名やカラーコードではありません。コピーボタンで全文を取得し、解析ツールで設定を確認してからインポートします。ブラウザで読めても現在のゲームで受け付けられるとは限りません。' },
    sourceDate: '出典の確認日', sourceNote: 'その日の設定記録です。選手の現在の設定とは限りません。', toolLinks: ['既存のコードを探す', '作ったコードをインポート', '設定の意味を見る'], guideLinks: ['コードの設定を確認', 'インポートの問題を確認'], circleSettings: '円形を自分で作る',
  },
}

export function reviewCopy(locale) {
  return octoberReviewCopy[locale] || octoberReviewCopy.en
}

export function enrichReviewCollection(locale, key, content) {
  const copy = reviewCopy(locale)
  if (key === 'best') return {
    ...content,
    intro: copy.best.intro,
    quickPicksTitle: copy.best.title,
    quickPicks: copy.best.picks.map(([id, label, reason]) => ({ id, label, reason })),
    introCollectionKeys: ['dot', 'small', 'funny'],
    relatedCollectionKeys: ['dot', 'small', 'circle'],
    relatedArticleKeys: [...new Set([...(content.relatedArticleKeys || []), 'colors'])],
    relatedToolKeys: [...new Set([...(content.relatedToolKeys || []), 'generator'])],
    metaTitle: copy.best.metaTitle,
    metaDescription: copy.best.metaDescription,
  }
  if (key === 'circle') return {
    ...content,
    relatedCollectionKeys: [...new Set([...(content.relatedCollectionKeys || []), 'dot'])],
    relatedArticleKeys: [...new Set([...(content.relatedArticleKeys || []), 'makeCircle'])],
    relatedToolKeys: [...new Set([...(content.relatedToolKeys || []), 'generator'])],
  }
  return content
}

export function enrichReviewArticle(locale, key, content) {
  if (key !== 'colors') return content
  const copy = reviewCopy(locale).colors
  return {
    ...content, title: copy.title, intro: copy.intro, metaTitle: copy.metaTitle, metaDescription: copy.metaDescription,
    sections: [{ title: copy.section, paragraphs: copy.paragraphs, bullets: [] }, ...content.sections],
    relatedCollectionKeys: ['dot', 'small'],
    relatedToolKeys: ['generator', 'comparison'],
  }
}
