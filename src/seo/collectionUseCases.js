// These pages share selection mechanics, but each keeps its own user task.
const rows = {
  en: {
    sheriff: ['Compare a clear dot with a compact center for deliberate Sheriff shots.', 'Check whether the center covers a distant head, then look away and reacquire it. A dot that disappears is too small for your setup.'],
    visibility: ['Find a crosshair you can pick up against both bright walls and dark corners.', 'Keep the shape fixed while comparing color and outline. More thickness may improve visibility while covering more of the target.'],
    guardian: ['Try a small gap or a clear dot for controlled Guardian taps.', 'Keep the head visible through the center and compare the same angle at normal resolution. Adjust the gap before changing several settings together.'],
    outlaw: ['Compare a visible center for positioning before you scope with the Outlaw.', 'These previews show the primary crosshair. They do not preview the sniper scope; check your scoped settings separately in game.'],
    marshal: ['Choose a center you can find while moving between Marshal sightlines.', 'Compare a dot and an open cross before scoping. This browser preview does not reproduce the scoped reticle or prove hip-fire accuracy.'],
    burst: ['Keep a readable aiming reference between short bursts.', 'Compare a compact cross and a dot while practicing the pause between bursts. A static reference does not indicate that weapon accuracy has recovered.'],
    spray: ['Find a center that stays readable while you practice recoil control.', 'Compare line thickness against the target at your usual distance. The crosshair is a reference, not a recoil controller or a prediction of every bullet.'],
    longRange: ['Compare target coverage and visibility on distant angles.', 'Try an open center beside a fine dot. If the dot disappears, add visibility before shrinking it further; use your normal game resolution.'],
  },
  'zh-CN': {
    sheriff: ['用清楚的圆点和紧凑中心，对比警长单发瞄准时的遮挡。', '对着远处头部看中心是否挡住目标，再移开视线找回来。如果小点总是丢失，就加粗一点。'],
    visibility: ['在亮墙和暗角里，挑一个容易找回中心的准星。', '固定形状，再比较颜色和轮廓。加粗能帮助看清，也可能遮住更多目标。'],
    guardian: ['试试小间距十字和清楚的圆点，找适合戍卫单点的中心。', '保持正常分辨率，对准同一个角度，确认头部能从中心看清。先改间距，再决定是否调整其他参数。'],
    outlaw: ['为莽侠开镜前的摆位，选一个容易找回的中心。', '这里预览的是主准星，不展示狙击镜内的瞄准标记。开镜设置需要另进游戏确认。'],
    marshal: ['使用飞将在不同架枪点之间移动时，比较哪种中心容易看清。', '开镜前可以比较圆点和留空十字。网页不复现狙击镜，也不能证明不开镜射击的精度。'],
    burst: ['短连发之间，保留一个容易看清的瞄准参照。', '练习停枪间隔时，比较紧凑十字和圆点。静态准星一直不动，不能用它判断武器精度是否恢复。'],
    spray: ['练习压枪时，找一个不会被目标和画面变化淹没的中心。', '在常用距离比较线条粗细。准星只提供瞄准参照，不会替你压枪，也不会预测每一发落点。'],
    longRange: ['远距离对枪时，同时比较目标遮挡和中心清晰度。', '把留空十字和细圆点放在一起试。圆点看不清就先增加可见度，保持游戏常用分辨率比较。'],
  },
  es: {
    sheriff: ['Compara un punto claro y un centro compacto para disparos deliberados con Sheriff.', 'Comprueba si el centro tapa una cabeza lejana y si lo encuentras al volver la vista. Si pierdes el punto, aumenta su visibilidad.'],
    visibility: ['Busca un centro visible en paredes claras y esquinas oscuras.', 'Mantén la forma al comparar color y contorno. Más grosor puede ayudar a verlo, pero también tapa más al objetivo.'],
    guardian: ['Prueba una pequeña separación o un punto claro para tiros controlados con Guardian.', 'Compara el mismo ángulo con tu resolución habitual. Mantén visible la cabeza y cambia primero la separación.'],
    outlaw: ['Compara un centro visible para colocar la mira antes de usar la óptica del Outlaw.', 'Las vistas muestran la mira principal, no la óptica del francotirador. Comprueba la configuración con zoom dentro del juego.'],
    marshal: ['Elige un centro fácil de encontrar al cambiar de ángulo con Marshal.', 'Compara un punto y una cruz abierta antes de usar la óptica. La vista no reproduce la retícula con zoom ni demuestra precisión sin apuntar.'],
    burst: ['Mantén una referencia legible entre ráfagas cortas.', 'Compara cruz compacta y punto al practicar la pausa. Una referencia estática no indica que la precisión del arma se haya recuperado.'],
    spray: ['Busca un centro legible mientras practicas el control del retroceso.', 'Compara el grosor a tu distancia habitual. La mira no controla el retroceso ni predice cada impacto.'],
    longRange: ['Compara visibilidad y cobertura del objetivo a distancia.', 'Prueba un centro abierto junto a un punto fino. Si pierdes el punto, hazlo más visible y compara con tu resolución habitual.'],
  },
  'pt-BR': {
    sheriff: ['Compare um ponto claro e um centro compacto para tiros deliberados de Sheriff.', 'Veja se o centro cobre uma cabeça distante e se você o encontra ao voltar o olhar. Se perder o ponto, aumente a visibilidade.'],
    visibility: ['Encontre um centro visível em paredes claras e cantos escuros.', 'Mantenha o formato ao comparar cor e contorno. Mais espessura pode ajudar a enxergar, mas também cobre mais o alvo.'],
    guardian: ['Teste uma abertura pequena ou um ponto claro para tiros controlados de Guardian.', 'Compare o mesmo ângulo na resolução habitual. Deixe a cabeça visível e ajuste primeiro a abertura.'],
    outlaw: ['Compare um centro visível para posicionar a mira antes de abrir a luneta da Outlaw.', 'As prévias mostram a mira principal, não a luneta. Confira os ajustes com zoom separadamente no jogo.'],
    marshal: ['Escolha um centro fácil de encontrar ao trocar de ângulo com Marshal.', 'Compare ponto e cruz aberta antes de abrir a luneta. A prévia não reproduz a retícula com zoom nem comprova precisão sem mirar.'],
    burst: ['Mantenha uma referência legível entre rajadas curtas.', 'Compare cruz compacta e ponto ao praticar a pausa. Uma referência estática não indica que a precisão da arma voltou.'],
    spray: ['Encontre um centro legível enquanto pratica o controle de recuo.', 'Compare a espessura na distância habitual. A mira não controla o recuo nem prevê cada impacto.'],
    longRange: ['Compare visibilidade e cobertura do alvo à distância.', 'Teste um centro aberto ao lado de um ponto fino. Se perder o ponto, aumente a visibilidade e compare na resolução habitual.'],
  },
  ja: {
    sheriff: ['シェリフの単発射撃で、見やすいドットと小型の中心を比較します。', '遠くの頭を隠さず、視線を戻したときに見つかるか確認します。ドットを見失うなら視認性を上げてください。'],
    visibility: ['明るい壁と暗い角の両方で見つけやすい中心を選びます。', '形を固定して色と輪郭を比較します。太くすると見やすくなる一方、目標を隠す範囲も増えます。'],
    guardian: ['ガーディアンの単発射撃に、小さな隙間と明確なドットを試します。', '普段の解像度で同じ角度を比較し、中心から頭が見えるか確認します。まず隙間だけを調整してください。'],
    outlaw: ['アウトローでスコープを覗く前の位置合わせに、見やすい中心を比較します。', 'ここではプライマリクロスヘアを表示します。スコープ内の照準は再現しないため、ゲーム内で別途確認してください。'],
    marshal: ['マーシャルで射線を変えるときに見つけやすい中心を選びます。', 'スコープを覗く前のドットと開いた十字を比較します。プレビューはスコープ内の照準や腰撃ち精度を再現しません。'],
    burst: ['短いバーストの間も読み取りやすい照準を選びます。', '射撃間隔を練習しながら小型十字とドットを比較します。静的な照準だけでは精度の回復は判断できません。'],
    spray: ['リコイル制御の練習中も見やすい中心を探します。', '普段の距離で線の太さを比較します。クロスヘアは反動を制御せず、すべての着弾点を予測するものでもありません。'],
    longRange: ['遠距離での目標の隠れ方と中心の見やすさを比較します。', '隙間のある十字と細いドットを並べて試します。点を見失うなら視認性を上げ、普段の解像度で確認してください。'],
  },
}
const labels = {
  en: ['What to compare', 'Check it in game', 'Import into a spare profile and test at your usual distance. The preview does not change weapon accuracy.', 'Can this code improve weapon accuracy?'],
  'zh-CN': ['这组准星怎么比较', '进游戏确认', '导入备用配置，在常用距离试几枪。网页预览和准星代码不会改变武器精度。', '换这组代码能让武器更准吗？'],
  es: ['Qué comparar', 'Compruébalo en el juego', 'Importa a un perfil aparte y prueba a tu distancia habitual. La vista previa no cambia la precisión del arma.', '¿El código mejora la precisión del arma?'],
  'pt-BR': ['O que comparar', 'Confira no jogo', 'Importe em um perfil separado e teste na distância habitual. A prévia não muda a precisão da arma.', 'O código melhora a precisão da arma?'],
  ja: ['比較するポイント', 'ゲーム内で確認', '別のプロファイルにインポートし、普段の距離で試してください。プレビューやコードで武器の精度は変わりません。', 'コードで武器の精度は上がる？'],
}
export function completeCollectionUseCase(locale, key, content) {
  const row = rows[locale]?.[key]
  if (!row) return content
  const [selectionTitle, , check, question] = labels[locale]
  return { ...content, intro: row[0], body: [row[1], check],
    selection: [], settings: [],
    faq: [[question, check], [selectionTitle, row[1]]], metaDescription: row[0],
  }
}
