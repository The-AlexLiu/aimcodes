import { catalogExpansionCrosshairs, funnyExpansionCrosshairs } from '../data/crosshairs.js'

export const languages = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'ja', short: '日', label: '日本語' },
  { code: 'es', short: 'ES', label: 'Español' },
  { code: 'zh-CN', short: '中', label: '简体中文' },
  { code: 'pt-BR', short: 'PT', label: 'Português' },
]

export const dictionaries = {
  en: {
    meta: { title: 'AimCodes — find a crosshair that feels right', description: 'Try VALORANT crosshairs on real maps and copy a code in seconds.' },
    nav: { explore: 'Browse', finder: 'Pick for me', resources: 'Guides & tools', mine: 'My crosshairs', more: 'More', close: 'Close menu', primary: 'Main navigation', collections: 'Crosshair styles', learn: 'Guides and tools', generator: 'Crosshair generator' },
    language: { label: 'Choose language' },
    maps: { ascent: 'Ascent', haven: 'Haven', bind: 'Bind' },
    search: { label: 'Search crosshairs', placeholder: 'Search by player, color, or style…', clear: 'Clear search' },
    workspace: { label: 'Try this crosshair' },
    hud: { live: 'LIVE', attack: 'ATTACK', preview: 'CODE PREVIEW', coordinates: 'X: 0  Y: 0' },
    actions: { copy: 'Copy code', copied: 'Copied', copyShort: 'Copy', copiedShort: 'Copied', import: 'How to use it', clear: 'Clear search', save: 'Save crosshair', random: 'Surprise me' },
    favorites: { add: 'Save this crosshair', remove: 'Remove saved crosshair', saved: 'Saved', removed: 'Removed' },
    instructions: { one: 'Open Settings in VALORANT.', two: 'Go to Crosshair → Import Profile Code.', three: 'Paste the code and you’re done.' },
    preview: { settings: 'Change map or color', mapZoom: 'Map and size', background: 'Map', crosshairColor: 'Crosshair color', colorHelp: 'Pick a color and the code updates with it.', colorVariant: '{name} · {color}', colorVariantDescription: 'Same shape, new color. The code is ready to copy.', zoom: 'Preview size', base: 'Default', reset: 'Back to default size', reduce: 'Make preview smaller', increase: 'Make preview bigger', help: 'This only changes the preview size, not the code.', viewFull: 'Show code', fullTitle: 'View and copy the full code', mapAlt: '{map} gameplay scene' },
    integrity: { invalid: 'We couldn’t read this code. Try it in VALORANT before using it.', approximate: 'The preview may look a little different because the code uses its own color.', valid: 'This preview comes from the code. Movement and firing error are turned off.' },
    source: { label: 'From:', checked: 'checked', saved: 'saved', proNote: 'Players can change crosshairs, so try it before you keep it.', communityNote: 'Give it a quick test in VALORANT before you use it.' },
    collection: { title: 'More crosshairs', subtitle: 'Pick one, try it, and copy the code.', countOne: '{count} crosshair', countMany: '{count} crosshairs' },
    filters: { label: 'Browse crosshairs', all: 'All', pro: 'Pro picks', dot: 'Dots', small: 'Small', classic: 'Classic', cute: 'Cute', fun: 'Fun', favorites: 'Saved', recent: 'Recently viewed', mine: 'Mine' },
    sort: { label: 'Sort', recommended: 'Recommended', name: 'Name A–Z', updated: 'Recently updated' },
    catalogUx: { filters: 'Filters', closeFilters: 'Close filters', backToResults: 'Back to crosshairs', loadMore: 'Show more crosshairs', showing: 'Showing {shown} of {total}' },
    loading: { route: 'Almost there — getting this page ready…' },
    colors: { label: 'Color', filter: 'Choose a color', white: 'White', black: 'Black', green: 'Green', lime: 'Lime', chartreuse: 'Yellow green', yellow: 'Yellow', cyan: 'Cyan', pink: 'Pink', red: 'Red', custom: 'Original color' },
    badges: { pro: 'Pro', cute: 'Cute', fun: 'Fun' },
    empty: { filteredTitle: 'Nothing here yet', filteredBody: 'Try a different search or category.' },
    toast: { copied: 'Copied the code for “{name}”', copyBlocked: 'Copy didn’t work, so we opened the code for you.', shared: 'Shared', linkCopied: 'Link and code copied', linkOnlyCopied: 'Share link copied', textCopied: 'Name and code copied', shareFailed: 'Sharing didn’t work. Try again.', deleted: 'Crosshair removed' },
    share: { crosshairAction: 'Send this crosshair', crosshairWorking: 'Opening share…', crosshairShared: 'Sent', crosshairCopied: 'Link + code copied', crosshairError: 'Try again', crosshairTitle: '{name} crosshair code', crosshairText: 'Try this {name} crosshair in VALORANT.', crosshairBundle: '{name} — VALORANT crosshair\n\nCode:\n{code}\n\nPreview the map and color here:\n{url}', eyebrow: 'READY TO SEND', dialogTitle: 'Send this crosshair', dialogBody: 'The exact map and color stay in the link. Your teammate can preview it and copy the code.', previewMeta: '{map} · {color}', actionsLabel: 'Share options', nativeAction: 'Share with apps', copyLink: 'Copy preview link', linkCopied: 'Preview link copied', copyBundle: 'Copy code + link', bundleCopied: 'Code + link copied', copyBundleHint: 'Best for Discord or team chat', statePreserved: 'This link keeps your selected map and color.', wechatGuideTitle: 'Sharing inside WeChat', wechatGuideBody: 'Tap ··· in the top-right and choose “Send to Chat”. If the contact list still will not open, copy the link below and paste it into the chat.', wechatCopyAction: 'Copy link for WeChat', wechatCopied: 'Link copied — paste it in WeChat', wechatFallbackHint: 'If WeChat cannot open your contacts, copy the link and paste it into the chat.', close: 'Close share options' },
    confirm: { delete: 'Remove “{name}” from your crosshairs?' },
    card: { copy: 'Copy {name} code', copied: '{name} code copied', test: 'Preview {name}', selected: 'Selected' },
    codeDialog: { close: 'Close', title: 'Copy crosshair code', body: 'Automatic copy didn’t work. Select the code below and copy it manually.' },
    modal: { title: 'Save your own crosshair', intro: 'Paste a code to try it here. It stays in this browser.', savedList: 'Your crosshairs', test: 'Try this one', addAnother: 'Add another', addFirst: 'Add your first one', instant: 'Preview as you type', name: 'Name', namePlaceholder: 'e.g. My small crosshair', code: 'Crosshair code', recognized: 'Looks good', generated: '{color} · ready to preview', source: 'Where did you find it?', optional: '(optional)', sourcePlaceholder: 'Post, video, or profile link', saved: 'Saved in this browser.', newName: 'My crosshair', copy: 'Copy {name} code', delete: 'Remove {name}' },
    errors: { nameShort: 'Give it a name with at least 2 characters.', tooShort: 'Paste the full crosshair code.', invalidChars: 'VALORANT won’t recognize some characters in this code.', missingPrimary: 'This code is missing its main crosshair section.', invalidColor: 'Use a valid six-digit color.' },
    local: { description: 'A crosshair you saved', descriptionApprox: 'Your saved crosshair · color preview may vary', sourceGiven: 'Link you added', sourceBrowser: 'Saved in this browser' },
    finder: {
      title: 'Let’s pick your crosshair', subtitle: 'Three clicks. One crosshair that fits.', exit: 'Leave test', round: 'ROUND {current} OF {total}', playArea: 'Reaction test area', millisecondsShort: 'ms',
      introTitle: 'HOW FAST ARE YOU?', introHint: 'Click to start the 3-round test', wait: 'NOT YET', waitHint: 'Click when the area turns green', clickNow: 'NOW!', readyHint: 'Click as fast as you can', tooSoon: 'TOO EARLY', tooSoonHint: 'That one doesn’t count. Get ready again.', tooSlow: 'TOO SLOW', tooSlowHint: 'That round expired. Get ready and try again.', reactionTime: '{time} ms', nextHint: 'Nice. Next round coming up…', progressLabel: '{completed} of {total} rounds done',
      legendReady: 'Green means go', legendEarly: 'Red means too early', deviceNote: 'Your screen, mouse, and device can all affect the result.',
      resultsTitle: 'Your reaction rank', resultsSubtitle: 'See your rank. Grab your crosshair.', testAgain: 'Go again', yourResults: 'YOUR RESULT', average: 'AVERAGE', consistency: 'CONSISTENCY', earlyClicks: 'EARLY CLICKS', roundTimes: 'ROUND TIMES', interpretation: 'PLAY STYLE',
      profiles: { precision: 'Fast and precise', balanced: 'Balanced', steady: 'Steady', visibility: 'Easy to spot' },
      reactionRank: 'REACTION RANK', rankPlacement: 'This run: {average} {unit} · {range}',
      ranks: { iron: 'Iron', bronze: 'Bronze', silver: 'Silver', gold: 'Gold', platinum: 'Platinum', diamond: 'Diamond', ascendant: 'Ascendant', immortal: 'Immortal', radiant: 'Radiant' },
      rankTaunts: { iron: 'The enemy had time to reload before you reacted.', bronze: 'You got there—right after the enemy fired.', silver: 'Your reactions are online. Mostly.', gold: 'Fast enough to stop asking, “How did I die?”', platinum: 'Your hand can keep up. Now don’t whiff.', diamond: 'That was quick. You can’t blame the setup anymore.', ascendant: 'They barely peeked and you were already firing.', immortal: 'That speed is getting suspicious.', radiant: 'Stop testing—you’re practically pre-firing every peek.' },
      recommended: 'OUR PICK FOR YOU', rankReasons: { iron: 'Go bold and easy to spot. Your crosshair should not be harder to find than the enemy.', bronze: 'A bigger, brighter center is easier to catch when you swing.', silver: 'A clear center saves a beat and helps your first shot catch up.', gold: 'Your reactions are fine; a compact sight helps you settle the first bullet.', platinum: 'Small and clear gives you less to think about when switching targets.', diamond: 'Your eyes keep up, so a micro sight leaves the target cleaner.', ascendant: 'You’re fast enough for a tiny sight—keep the head line open.', immortal: 'You don’t need a giant reminder. Clean and minimal wins here.', radiant: 'The crosshair only confirms the spot. Your reactions do the rest.' },
      shareResult: 'Challenge a teammate', sharePreparing: 'Making card…', shareSaved: 'Card saved—send it', shareShared: 'Challenge sent', shareError: 'Try again', shareTitle: 'My AimCodes reaction rank', shareText: 'I hit {rank} with an average of {average} {unit}. Can you beat it?', shareCardTitle: 'MY REACTION RANK', shareCardPick: 'MY CROSSHAIR PICK', shareCardFooter: 'Reaction test · aimcodes.com',
      sharePanelEyebrow: 'YOUR CHALLENGE CARD', sharePanelTitle: 'Think your teammate is faster?', sharePanelBody: 'Send the card and challenge link. They get three rounds to beat your {average} {unit}.', sharePreviewAlt: 'Preview of your reaction result card', downloadShareCard: 'Download result card', copyChallengeLink: 'Copy challenge link', challengeLinkCopied: 'Challenge link copied', shareCardChallengeTitle: 'Think you can beat me?', shareCardChallengeHint: 'Beat my {average} {unit} · aimcodes.com',
      challengeLabel: 'Reaction challenge', challengeLandingTitle: 'Someone challenged you with {score} {unit}', challengeLandingBody: 'Three rounds. Beat their time and take the bragging rights.', challengeWon: 'You were {difference} {unit} faster. Round won.', challengeMissed: 'You missed by {difference} {unit}. Run it back?', challengeTied: 'Exact tie. That deserves one more round.',
      copyHelp: 'The color is already in the code. Copy it and import it in VALORANT.', rankRanges: 'WHERE YOU LANDED', rankRangesHint: 'Faster ranks are on the right. Your screen and mouse can change the score.', yourTier: 'YOU', backExplore: 'Back to crosshairs',
    },
  },
  ja: {
    meta: { title: 'AimCodes — 自分に合うVALORANTクロスヘアを探す', description: 'VALORANTの実際のマップでクロスヘアを試し、コードをすぐにコピーできます。' },
    nav: { explore: 'クロスヘア', finder: '自分に合う照準', resources: 'ガイド・ツール', mine: '保存した照準', more: 'メニュー', close: 'メニューを閉じる', primary: 'メインナビゲーション', collections: 'スタイルから探す', learn: 'ガイドとツール', generator: 'クロスヘア生成' },
    language: { label: '言語を選択' },
    maps: { ascent: 'アセント', haven: 'ヘイヴン', bind: 'バインド' },
    search: { label: 'クロスヘアを検索', placeholder: '選手名・色・スタイルで検索…', clear: '検索を消す' },
    workspace: { label: 'このクロスヘアを試す' },
    hud: { live: 'ライブ', attack: 'アタッカー', preview: 'コードプレビュー', coordinates: 'X: 0  Y: 0' },
    actions: { copy: 'コードをコピー', copied: 'コピーしました', copyShort: 'コピー', copiedShort: 'コピー済み', import: 'ゲームへの入れ方', clear: '検索を消す', save: 'クロスヘアを保存', random: 'ランダムに選ぶ' },
    favorites: { add: 'このクロスヘアを保存', remove: '保存から外す', saved: '保存しました', removed: '削除しました' },
    instructions: { one: 'VALORANTの設定を開きます。', two: 'クロスヘア → プロファイルコードをインポートを選びます。', three: 'コードを貼り付けて保存すれば完了です。' },
    preview: { settings: 'マップ・色を変更', mapZoom: 'マップとサイズ', background: 'マップ', crosshairColor: 'クロスヘアの色', colorHelp: '色を選ぶと、コピーするコードにも反映されます。', colorVariant: '{name}・{color}', colorVariantDescription: '形はそのまま、色だけ変更。コードはすぐコピーできます。', zoom: 'プレビューサイズ', base: '標準', reset: '標準サイズに戻す', reduce: '小さく表示', increase: '大きく表示', help: '表示サイズだけが変わり、コード自体は変わりません。', viewFull: 'コードを見る', fullTitle: 'クロスヘアコードを確認してコピー', mapAlt: '{map}のゲーム画面' },
    integrity: { invalid: 'このコードを読み取れませんでした。使用前にVALORANTで確認してください。', approximate: 'コード固有の色を使うため、プレビューと少し違って見える場合があります。', valid: 'コードから描画したプレビューです。移動エラーと射撃エラーはオフです。' },
    source: { label: '参照元：', checked: '確認済み', saved: '保存済み', proNote: '選手は設定を変更することがあります。使う前に自分の画面で試してください。', communityNote: '使う前に射撃場で一度試してみてください。' },
    collection: { title: 'もっと見る', subtitle: '気になる形を選び、試してからコードをコピー。', countOne: '{count}件', countMany: '{count}件' },
    filters: { label: '絞り込み', all: 'すべて', pro: 'プロ使用', dot: 'ドット', small: '小さい', classic: '定番', cute: 'かわいい', fun: '面白い', favorites: '保存済み', recent: '最近見た', mine: '自分の照準' },
    sort: { label: '並び順', recommended: 'おすすめ順', name: '名前順', updated: '更新が新しい順' },
    catalogUx: { filters: '絞り込み', closeFilters: '絞り込みを閉じる', backToResults: 'クロスヘア一覧へ', loadMore: 'もっと表示', showing: '{total}件中{shown}件を表示' },
    loading: { route: 'もうすぐです。ページを準備しています…' },
    colors: { label: '色', filter: '色を選ぶ', white: '白', black: '黒', green: '緑', lime: 'ライム', chartreuse: '黄緑', yellow: '黄', cyan: 'シアン', pink: 'ピンク', red: '赤', custom: '元の色' },
    badges: { pro: 'プロ', cute: 'かわいい', fun: 'ネタ' },
    empty: { filteredTitle: '該当するクロスヘアがありません', filteredBody: '検索語やカテゴリを変えてみてください。' },
    toast: { copied: '「{name}」のコードをコピーしました', copyBlocked: '自動コピーできなかったため、コードを表示しました。', shared: '共有しました', linkCopied: 'リンクとコードをコピーしました', linkOnlyCopied: '共有リンクをコピーしました', textCopied: '名前とコードをコピーしました', shareFailed: '共有できませんでした。もう一度お試しください。', deleted: 'クロスヘアを削除しました' },
    share: { crosshairAction: 'このクロスヘアを共有', crosshairWorking: '共有メニューを開いています…', crosshairShared: '共有済み', crosshairCopied: 'リンクとコードをコピー済み', crosshairError: 'もう一度試す', crosshairTitle: '{name}のクロスヘアコード', crosshairText: 'VALORANTで{name}のクロスヘアを試してみよう。', crosshairBundle: '{name} — VALORANTクロスヘア\n\nコード：\n{code}\n\nマップと色のプレビュー：\n{url}', eyebrow: '送信準備OK', dialogTitle: 'このクロスヘアをフレンドへ', dialogBody: '選んだマップと色をそのまま共有。相手はプレビューを見て、すぐコードをコピーできます。', previewMeta: '{map}・{color}', actionsLabel: '共有方法', nativeAction: 'アプリで共有', copyLink: 'プレビューリンクをコピー', linkCopied: 'リンクをコピーしました', copyBundle: 'コード＋リンクをコピー', bundleCopied: 'コード＋リンクをコピー済み', copyBundleHint: 'Discordやチームチャット向け', statePreserved: '選んだマップと色はリンクに保存されます。', wechatGuideTitle: 'WeChat内で共有する', wechatGuideBody: '右上の「…」から「チャットに送信」を選んでください。連絡先を選べない場合は、下のボタンでリンクをコピーしてチャットに貼り付けられます。', wechatCopyAction: 'WeChat用リンクをコピー', wechatCopied: 'コピーしました — WeChatに貼り付けてください', wechatFallbackHint: 'WeChatで連絡先を選べない場合は、リンクをコピーしてチャットに貼り付けてください。', close: '共有メニューを閉じる' },
    confirm: { delete: '「{name}」を保存したクロスヘアから削除しますか？' },
    card: { copy: '{name}のコードをコピー', copied: '{name}のコードをコピーしました', test: '{name}を試す', selected: '選択中' },
    codeDialog: { close: '閉じる', title: 'クロスヘアコードをコピー', body: '自動コピーできませんでした。下のコードを選択してコピーしてください。' },
    modal: { title: '自分のクロスヘアを保存', intro: 'コードを貼り付けると、ここで試せます。このブラウザだけに保存されます。', savedList: '保存したクロスヘア', test: 'この照準を試す', addAnother: 'もう1件追加', addFirst: '最初のクロスヘアを追加', instant: '入力しながらプレビュー', name: '名前', namePlaceholder: '例：小さいシアン照準', code: 'クロスヘアコード', recognized: 'コードを読み取れました', generated: '{color}・プレビューできます', source: 'どこで見つけましたか？', optional: '（任意）', sourcePlaceholder: '投稿・動画・プロフィールのURL', saved: 'このブラウザに保存しました。', newName: 'マイクロスヘア', copy: '{name}のコードをコピー', delete: '{name}を削除' },
    errors: { nameShort: '名前は2文字以上で入力してください。', tooShort: 'クロスヘアコードを最後まで貼り付けてください。', invalidChars: 'VALORANTで認識されない文字が含まれています。', missingPrimary: 'メインクロスヘアの設定が見つかりません。', invalidColor: '6桁のカラーコードを入力してください。' },
    local: { description: '保存したクロスヘア', descriptionApprox: '保存したクロスヘア・色の表示は実際と異なる場合があります', sourceGiven: '登録したリンク', sourceBrowser: 'このブラウザに保存' },
    finder: {
      title: '自分に合うクロスヘアを選ぶ', subtitle: '3回クリック。結果に合う照準を1つ提案します。', exit: 'テストを終了', round: '{total}回中{current}回目', playArea: '反応速度テスト', millisecondsShort: 'ms',
      introTitle: '反応速度を測ってみよう', introHint: 'クリックして3回のテストを開始', wait: 'まだ！', waitHint: 'エリアが緑になったらクリック', clickNow: '今！', readyHint: 'できるだけ速くクリック', tooSoon: 'フライング', tooSoonHint: 'この回はノーカウント。もう一度構えよう。', tooSlow: '遅すぎます', tooSlowHint: '時間切れです。もう一度試そう。', reactionTime: '{time} ms', nextHint: 'いい感じ。次のラウンドへ…', progressLabel: '{total}回中{completed}回完了',
      legendReady: '緑になったらクリック', legendEarly: '赤はフライング', deviceNote: '画面・マウス・端末によって結果が変わることがあります。',
      resultsTitle: 'あなたの反応ランク', resultsSubtitle: 'ランクを確認して、おすすめのクロスヘアを持ち帰ろう。', testAgain: 'もう一度', yourResults: '今回の結果', average: '平均', consistency: '安定度', earlyClicks: 'フライング', roundTimes: '各ラウンド', interpretation: 'プレイ傾向',
      profiles: { precision: '速くて正確', balanced: 'バランス型', steady: '安定型', visibility: '見失いにくさ重視' },
      reactionRank: '反応ランク', rankPlacement: '今回：{average}{unit}・{range}',
      ranks: { iron: 'アイアン', bronze: 'ブロンズ', silver: 'シルバー', gold: 'ゴールド', platinum: 'プラチナ', diamond: 'ダイヤモンド', ascendant: 'アセンダント', immortal: 'イモータル', radiant: 'レディアント' },
      rankTaunts: { iron: '反応する前に相手がリロードできそうです。', bronze: '間に合った。相手が撃った直後に。', silver: '反応は起動済み。たぶん。', gold: '「今のどうやって負けた？」はもう言えません。', platinum: '目と手は合っています。あとは外さないだけ。', diamond: 'かなり速い。デバイスのせいにはできません。', ascendant: '相手が顔を出す前から撃てそうです。', immortal: 'その速さ、少し怪しいです。', radiant: 'もう測らなくて大丈夫。ほぼプリファイアです。' },
      recommended: 'あなたへのおすすめ', rankReasons: { iron: 'まずは大きく、見失わない照準。敵より探しにくいクロスヘアはやめよう。', bronze: '明るく少し大きい中心なら、ピークした瞬間に拾いやすい。', silver: '中心がはっきりした形で、最初の1発を迷わず置こう。', gold: '反応は十分。コンパクトな照準で初弾を落ち着かせよう。', platinum: '小さく明確な照準なら、切り返しで考えることが減る。', diamond: '目が追いつくので、マイクロ照準で敵を隠さない形が合う。', ascendant: '小さい照準を使える速さ。ヘッドラインを空けよう。', immortal: '大きな目印は不要。シンプルでクリーンな形が合う。', radiant: 'クロスヘアは位置確認だけ。反応が残りを片付けます。' },
      shareResult: 'フレンドに挑戦', sharePreparing: '画像を作成中…', shareSaved: '画像を保存しました', shareShared: '挑戦を送りました', shareError: 'もう一度試す', shareTitle: 'AimCodes反応ランク', shareText: '平均{average}{unit}で{rank}でした。超えられる？', shareCardTitle: 'MY REACTION RANK', shareCardPick: 'おすすめクロスヘア', shareCardFooter: '反応速度テスト・aimcodes.com',
      sharePanelEyebrow: '挑戦カード', sharePanelTitle: 'フレンドのほうが速い？', sharePanelBody: 'カードとリンクを送ろう。3回であなたの{average}{unit}に挑戦できます。', sharePreviewAlt: '反応速度結果カードのプレビュー', downloadShareCard: '結果カードを保存', copyChallengeLink: '挑戦リンクをコピー', challengeLinkCopied: '挑戦リンクをコピーしました', shareCardChallengeTitle: 'この記録を超えられる？', shareCardChallengeHint: '{average}{unit}を超えよう・aimcodes.com',
      challengeLabel: '反応速度チャレンジ', challengeLandingTitle: '{score}{unit}の記録に挑戦', challengeLandingBody: '3回勝負。記録を抜いて自慢しよう。', challengeWon: '{difference}{unit}速い。あなたの勝ち。', challengeMissed: 'あと{difference}{unit}。もう一度？', challengeTied: 'まさかの同タイム。もう1回勝負。',
      copyHelp: '選んだ色はコードに反映済みです。コピーしてVALORANTにインポートしてください。', rankRanges: 'ランク表', rankRangesHint: '右ほど高速。画面やマウスでも記録は変わります。', yourTier: 'あなた', backExplore: 'クロスヘア一覧へ',
    },
  },
  es: {
    meta: { title: 'AimCodes — encuentra una mira que te guste', description: 'Prueba miras de VALORANT en mapas reales y copia el código en segundos.' },
    nav: { explore: 'Ver miras', finder: 'Elige por mí', resources: 'Guías y herramientas', mine: 'Mis miras', more: 'Más', close: 'Cerrar menú', primary: 'Navegación principal', collections: 'Estilos de mira', learn: 'Guías y herramientas', generator: 'Generador de miras' },
    language: { label: 'Cambiar idioma' },
    maps: { ascent: 'Ascent', haven: 'Haven', bind: 'Bind' },
    search: { label: 'Buscar miras', placeholder: 'Busca por jugador, color o estilo…', clear: 'Borrar búsqueda' },
    workspace: { label: 'Prueba esta mira' },
    hud: { live: 'EN VIVO', attack: 'ATAQUE', preview: 'VISTA POR CÓDIGO', coordinates: 'X: 0  Y: 0' },
    actions: { copy: 'Copiar código', copied: 'Copiado', copyShort: 'Copiar', copiedShort: 'Copiado', import: 'Cómo usarla', clear: 'Borrar búsqueda', save: 'Guardar mira', random: 'Una al azar' },
    favorites: { add: 'Guardar esta mira', remove: 'Quitar de guardadas', saved: 'Guardada', removed: 'Eliminada' },
    instructions: { one: 'Abre los ajustes de VALORANT.', two: 'Ve a Mira → Importar código de perfil.', three: 'Pega el código y listo.' },
    preview: { settings: 'Cambiar mapa o color', mapZoom: 'Mapa y tamaño', background: 'Mapa', crosshairColor: 'Color de la mira', colorHelp: 'Elige un color y el código cambiará con él.', colorVariant: '{name} · {color}', colorVariantDescription: 'La misma forma, con otro color. El código ya está listo para copiar.', zoom: 'Tamaño de la vista', base: 'Normal', reset: 'Volver al tamaño normal', reduce: 'Hacer la mira más pequeña', increase: 'Hacer la mira más grande', help: 'Solo cambia el tamaño de la vista, no el código.', viewFull: 'Ver código', fullTitle: 'Ver y copiar el código completo', mapAlt: 'Escena de juego de {map}' },
    integrity: { invalid: 'No pudimos leer este código. Pruébalo en VALORANT antes de usarlo.', approximate: 'La vista puede cambiar un poco porque el código usa su propio color.', valid: 'La vista sale del código. Los errores de movimiento y disparo están desactivados.' },
    source: { label: 'De:', checked: 'revisada', saved: 'guardada', proNote: 'Los jugadores pueden cambiar de mira, así que pruébala antes.', communityNote: 'Pruébala un momento en VALORANT antes de quedártela.' },
    collection: { title: 'Más miras', subtitle: 'Elige una, pruébala y copia el código.', countOne: '{count} mira', countMany: '{count} miras' },
    filters: { label: 'Buscar por tipo', all: 'Todas', pro: 'De pros', dot: 'Puntos', small: 'Pequeñas', classic: 'Clásicas', cute: 'Bonitas', fun: 'Originales', favorites: 'Guardadas', recent: 'Vistas', mine: 'Mías' },
    sort: { label: 'Orden', recommended: 'Recomendadas', name: 'Nombre A–Z', updated: 'Actualizadas' },
    catalogUx: { filters: 'Filtros', closeFilters: 'Cerrar filtros', backToResults: 'Volver a las miras', loadMore: 'Ver más miras', showing: 'Mostrando {shown} de {total}' },
    loading: { route: 'Ya casi está. Preparando la página…' },
    colors: { label: 'Color', filter: 'Elegir color', white: 'Blanco', black: 'Negro', green: 'Verde', lime: 'Verde lima', chartreuse: 'Verde amarillo', yellow: 'Amarillo', cyan: 'Cian', pink: 'Rosa', red: 'Rojo', custom: 'Color original' },
    badges: { pro: 'De pro', cute: 'Bonita', fun: 'Original' },
    empty: { filteredTitle: 'No hay ninguna por aquí', filteredBody: 'Prueba otra búsqueda o categoría.' },
    toast: { copied: 'Código de “{name}” copiado', copyBlocked: 'No se pudo copiar, así que abrimos el código para ti.', shared: 'Compartida', linkCopied: 'Enlace y código copiados', linkOnlyCopied: 'Enlace para compartir copiado', textCopied: 'Nombre y código copiados', shareFailed: 'No se pudo compartir. Inténtalo de nuevo.', deleted: 'Mira eliminada' },
    share: { crosshairAction: 'Enviar esta mira', crosshairWorking: 'Abriendo opciones…', crosshairShared: 'Enviada', crosshairCopied: 'Enlace y código copiados', crosshairError: 'Reintentar', crosshairTitle: 'Código de la mira {name}', crosshairText: 'Prueba esta mira {name} en VALORANT.', crosshairBundle: '{name} — mira de VALORANT\n\nCódigo:\n{code}\n\nPrueba el mapa y el color aquí:\n{url}', eyebrow: 'LISTA PARA ENVIAR', dialogTitle: 'Envía esta mira', dialogBody: 'El enlace conserva el mapa y el color que elegiste. Tu compañero puede verla y copiar el código.', previewMeta: '{map} · {color}', actionsLabel: 'Opciones para compartir', nativeAction: 'Compartir con una app', copyLink: 'Copiar enlace de vista previa', linkCopied: 'Enlace copiado', copyBundle: 'Copiar código + enlace', bundleCopied: 'Código + enlace copiados', copyBundleHint: 'Ideal para Discord o el chat del equipo', statePreserved: 'El mapa y el color elegidos se guardan en el enlace.', wechatGuideTitle: 'Compartir desde WeChat', wechatGuideBody: 'Toca ··· arriba a la derecha y elige “Enviar al chat”. Si no puedes elegir un contacto, copia el enlace y pégalo en el chat.', wechatCopyAction: 'Copiar enlace para WeChat', wechatCopied: 'Enlace copiado — pégalo en WeChat', wechatFallbackHint: 'Si WeChat no abre tus contactos, copia el enlace y pégalo en el chat.', close: 'Cerrar opciones para compartir' },
    confirm: { delete: '¿Quitar “{name}” de tus miras?' },
    card: { copy: 'Copiar código de {name}', copied: 'Código de {name} copiado', test: 'Probar {name}', selected: 'Seleccionada' },
    codeDialog: { close: 'Cerrar', title: 'Copiar código de mira', body: 'La copia automática no funcionó. Selecciona el código y cópialo a mano.' },
    modal: { title: 'Guarda tu propia mira', intro: 'Pega un código para probarlo. Se quedará en este navegador.', savedList: 'Tus miras', test: 'Probar esta', addAnother: 'Añadir otra', addFirst: 'Añadir la primera', instant: 'Vista al momento', name: 'Nombre', namePlaceholder: 'Ej.: Mi mira pequeña', code: 'Código de mira', recognized: 'Todo bien', generated: '{color} · lista para probar', source: '¿Dónde la encontraste?', optional: '(opcional)', sourcePlaceholder: 'Enlace al post, vídeo o perfil', saved: 'Guardada en este navegador.', newName: 'Mi mira', copy: 'Copiar código de {name}', delete: 'Quitar {name}' },
    errors: { nameShort: 'Ponle un nombre de al menos 2 caracteres.', tooShort: 'Pega el código completo de la mira.', invalidChars: 'VALORANT no reconocerá algunos caracteres de este código.', missingPrimary: 'A este código le falta la parte principal de la mira.', invalidColor: 'Usa un color válido de seis dígitos.' },
    local: { description: 'Una mira que guardaste', descriptionApprox: 'Tu mira guardada · el color puede verse distinto', sourceGiven: 'Enlace que añadiste', sourceBrowser: 'Guardada en este navegador' },
    finder: {
      title: 'Te ayudamos a elegir', subtitle: 'Tres clics y una mira para ti.', exit: 'Salir', round: 'RONDA {current} DE {total}', playArea: 'Zona de prueba de reacción', millisecondsShort: 'ms',
      introTitle: 'A VER QUÉ TAN RÁPIDO ERES', introHint: 'Haz clic para empezar las 3 rondas', wait: 'TODAVÍA NO', waitHint: 'Haz clic cuando la zona se ponga verde', clickNow: '¡AHORA!', readyHint: 'Haz clic lo más rápido que puedas', tooSoon: 'TE ADELANTASTE', tooSoonHint: 'Esa no cuenta. Prepárate otra vez.', tooSlow: 'DEMASIADO TARDE', tooSlowHint: 'Esa ronda caducó. Prepárate y vuelve a intentarlo.', reactionTime: '{time} ms', nextHint: 'Bien. La siguiente ya viene…', progressLabel: '{completed} de {total} rondas listas',
      legendReady: 'Verde: haz clic', legendEarly: 'Rojo: te adelantaste', deviceNote: 'La pantalla, el ratón y el dispositivo pueden cambiar el resultado.',
      resultsTitle: 'Tu rango de reacción', resultsSubtitle: 'Mira tu rango. Llévate tu mira.', testAgain: 'Otra vez', yourResults: 'TU RESULTADO', average: 'MEDIA', consistency: 'REGULARIDAD', earlyClicks: 'CLICS ANTES DE TIEMPO', roundTimes: 'TIEMPOS', interpretation: 'TU ESTILO',
      profiles: { precision: 'Rápido y preciso', balanced: 'Equilibrado', steady: 'Tranquilo y estable', visibility: 'Fácil de ver' },
      reactionRank: 'RANGO DE REACCIÓN', rankPlacement: 'Esta ronda: {average} {unit} · {range}',
      ranks: { iron: 'Hierro', bronze: 'Bronce', silver: 'Plata', gold: 'Oro', platinum: 'Platino', diamond: 'Diamante', ascendant: 'Ascendente', immortal: 'Inmortal', radiant: 'Radiante' },
      rankTaunts: { iron: 'Al rival le dio tiempo de recargar antes de que reaccionaras.', bronze: 'Llegaste… justo después del primer disparo enemigo.', silver: 'Tus reflejos ya cargaron. Casi siempre.', gold: 'Ya no puedes decir “¿pero cómo morí?” en cada ronda.', platinum: 'La mano sigue a los ojos. Ahora no falles.', diamond: 'Eso fue rápido. Ya no vale culpar al equipo.', ascendant: 'El rival apenas asomó y tú ya estabas disparando.', immortal: 'Esa velocidad empieza a dar miedo.', radiant: 'Deja la prueba: casi haces prefire en cada ángulo.' },
      recommended: 'NUESTRA ELECCIÓN', rankReasons: { iron: 'Usa una mira grande y clara. Que no cueste más verla que al rival.', bronze: 'Un centro más grande y brillante aparece rápido al asomarte.', silver: 'Un centro claro te ahorra un instante y ayuda al primer tiro.', gold: 'De reflejos vas bien; una mira compacta ayuda a clavar la primera bala.', platinum: 'Pequeña y clara: menos dudas cuando cambias de objetivo.', diamond: 'Tus ojos siguen el ritmo; una mira mínima deja el blanco limpio.', ascendant: 'Te sobra velocidad para una mira pequeña y una línea de cabeza despejada.', immortal: 'No necesitas una mira gigante. Aquí gana lo limpio y mínimo.', radiant: 'La mira solo confirma el punto. Tus reflejos hacen el resto.' },
      shareResult: 'Retar a un amigo', sharePreparing: 'Creando imagen…', shareSaved: 'Tarjeta guardada—envíala', shareShared: 'Reto enviado', shareError: 'Reintentar', shareTitle: 'Mi rango de reacción en AimCodes', shareText: 'Conseguí {rank} con una media de {average} {unit}. ¿Me superas?', shareCardTitle: 'MI RANGO DE REACCIÓN', shareCardPick: 'MI MIRA ELEGIDA', shareCardFooter: 'Prueba de reacción · aimcodes.com',
      sharePanelEyebrow: 'TU TARJETA DE RETO', sharePanelTitle: '¿Tu amigo dice que es más rápido?', sharePanelBody: 'Envíale la tarjeta y el enlace. Tiene tres rondas para superar tus {average} {unit}.', sharePreviewAlt: 'Vista previa de tu tarjeta de reacción', downloadShareCard: 'Descargar tarjeta', copyChallengeLink: 'Copiar enlace del reto', challengeLinkCopied: 'Enlace copiado', shareCardChallengeTitle: '¿Crees que me superas?', shareCardChallengeHint: 'Supera mis {average} {unit} · aimcodes.com',
      challengeLabel: 'Reto de reacción', challengeLandingTitle: 'Te han retado con {score} {unit}', challengeLandingBody: 'Tres rondas. Supera su tiempo y presume la victoria.', challengeWon: 'Fuiste {difference} {unit} más rápido. Ronda ganada.', challengeMissed: 'Te faltaron {difference} {unit}. ¿Otra ronda?', challengeTied: 'Empate exacto. Esto pide otra ronda.',
      copyHelp: 'El color ya va dentro del código. Cópialo e impórtalo en VALORANT.', rankRanges: '¿DÓNDE QUEDASTE?', rankRangesHint: 'Los rangos más rápidos están a la derecha. Tu pantalla y ratón también influyen.', yourTier: 'TÚ', backExplore: 'Volver a las miras',
    },
  },
  'zh-CN': {
    meta: { title: 'AimCodes — 找到顺手的准星', description: '在真实地图里试准星，喜欢就直接复制代码。' },
    nav: { explore: '找准星', finder: '帮我选', resources: '教程与工具', mine: '我的准星', more: '更多', close: '关闭菜单', primary: '主导航', collections: '按样式找', learn: '教程和工具', generator: '准星生成器' },
    language: { label: '选择语言' },
    maps: { ascent: '亚海悬城', haven: '隐世修所', bind: '源工重镇' },
    search: { label: '搜索准星', placeholder: '搜选手、颜色或样式…', clear: '清空搜索' },
    workspace: { label: '试试这个准星' },
    hud: { live: '实时', attack: '进攻方', preview: '代码预览', coordinates: 'X: 0  Y: 0' },
    actions: { copy: '复制代码', copied: '已复制', copyShort: '复制', copiedShort: '已复制', import: '怎么导入', clear: '清空搜索', save: '保存准星', random: '随便来一个' },
    favorites: { add: '保存这个准星', remove: '取消保存', saved: '已保存', removed: '已取消' },
    instructions: { one: '打开《无畏契约》，进入“设置”。', two: '找到“准星”，点击“导入准星配置代码”。', three: '粘贴代码，确认就好了。' },
    preview: { settings: '换地图或颜色', mapZoom: '地图和大小', background: '地图', crosshairColor: '准星颜色', colorHelp: '选好颜色后，复制的代码也会跟着变。', colorVariant: '{name} · {color}', colorVariantDescription: '样式不变，只换颜色。复制代码时会自动带上。', zoom: '预览大小', base: '默认', reset: '恢复默认大小', reduce: '缩小预览', increase: '放大预览', help: '这里只是放大预览，不会改动代码。', viewFull: '查看代码', fullTitle: '查看并复制完整代码', mapAlt: '{map}游戏画面' },
    integrity: { invalid: '这个代码没识别出来，建议先到游戏里试一下。', approximate: '这个准星用了特殊颜色，预览可能会有一点差别。', valid: '画面根据代码生成，移动和射击误差暂未开启。' },
    source: { label: '来自：', checked: '已查看', saved: '已保存', proNote: '选手可能会换准星，喜欢的话先到游戏里试试。', communityNote: '建议先在游戏里试一局，再决定要不要用。' },
    collection: { title: '更多准星', subtitle: '挑一个，试试看，喜欢就复制。', countOne: '{count} 个准星', countMany: '{count} 个准星' },
    filters: { label: '按类型找准星', all: '全部', pro: '职业同款', dot: '小圆点', small: '小准星', classic: '十字', cute: '可爱', fun: '整活', favorites: '已保存', recent: '最近看过', mine: '我的' },
    sort: { label: '排序', recommended: '推荐优先', name: '名称顺序', updated: '最近更新' },
    catalogUx: { filters: '筛选', closeFilters: '关闭筛选', backToResults: '返回准星列表', loadMore: '继续加载准星', showing: '已显示 {shown} / {total}' },
    loading: { route: '马上就好，正在准备页面…' },
    colors: { label: '颜色', filter: '选择颜色', white: '白色', black: '黑色', green: '绿色', lime: '黄绿色', chartreuse: '嫩黄色', yellow: '黄色', cyan: '青色', pink: '粉色', red: '红色', custom: '特殊颜色' },
    badges: { pro: '职业同款', cute: '可爱', fun: '整活' },
    empty: { filteredTitle: '这里还没有合适的准星', filteredBody: '换个关键词或分类试试。' },
    toast: { copied: '“{name}”的代码已复制', copyBlocked: '没能自动复制，代码已经打开，可以手动复制。', shared: '已经分享', linkCopied: '链接和代码已复制', linkOnlyCopied: '分享链接已复制', textCopied: '名称和代码已复制', shareFailed: '分享失败，再试一次吧。', deleted: '准星已移除' },
    share: { crosshairAction: '把这个准星发给队友', crosshairWorking: '正在打开分享…', crosshairShared: '已发给队友', crosshairCopied: '链接和代码已复制', crosshairError: '再试一次', crosshairTitle: '{name} 准星代码', crosshairText: '这个 {name} 准星可以直接预览和复制。', crosshairBundle: '{name}｜无畏契约准星\n\n准星代码：\n{code}\n\n预览地图和颜色：\n{url}', eyebrow: '准备发给队友', dialogTitle: '分享这个准星', dialogBody: '你选的地图和颜色都会跟着链接走，队友打开就能看效果、复制代码。', previewMeta: '{map} · {color}', actionsLabel: '分享方式', nativeAction: '打开系统分享', copyLink: '只复制预览链接', linkCopied: '预览链接已复制', copyBundle: '复制代码和链接', bundleCopied: '代码和链接已复制', copyBundleHint: '适合发到群聊或 Discord', statePreserved: '链接会保留你当前选的地图和颜色。', wechatGuideTitle: '在微信里发送', wechatGuideBody: '点右上角“···”，再选“发送给朋友”。如果还是选不了好友，就复制下面的链接，回到聊天里粘贴。', wechatCopyAction: '复制链接，发到微信', wechatCopied: '链接已复制，去微信粘贴给好友', wechatFallbackHint: '微信里选不了好友时，复制链接后回到聊天里粘贴即可。', close: '关闭分享面板' },
    confirm: { delete: '要移除“{name}”吗？' },
    card: { copy: '复制{name}的代码', copied: '{name}的代码已复制', test: '试试{name}', selected: '正在使用' },
    codeDialog: { close: '关闭', title: '复制准星代码', body: '自动复制没成功，请全选下面的代码再手动复制。' },
    modal: { title: '保存自己的准星', intro: '粘贴代码就能试，内容只保存在当前浏览器。', savedList: '你保存的准星', test: '试试这个', addAnother: '再加一个', addFirst: '添加第一个准星', instant: '边填边看', name: '准星名称', namePlaceholder: '例如：我的小准星', code: '准星代码', recognized: '代码没问题', generated: '{color} · 可以预览', source: '在哪里找到的？', optional: '（选填）', sourcePlaceholder: '帖子、视频或选手主页链接', saved: '已经保存在这个浏览器里。', newName: '我的准星', copy: '复制{name}的代码', delete: '移除{name}' },
    errors: { nameShort: '名称至少写 2 个字。', tooShort: '请粘贴完整的准星代码。', invalidChars: '代码里有《无畏契约》无法识别的字符。', missingPrimary: '这个代码缺少主要准星部分。', invalidColor: '请输入正确的六位颜色代码。' },
    local: { description: '你保存的准星', descriptionApprox: '你保存的准星 · 颜色可能略有差别', sourceGiven: '你添加的链接', sourceBrowser: '保存在当前浏览器' },
    finder: {
      title: '帮你挑一个准星', subtitle: '测 3 次反应，马上给你结果。', exit: '退出', round: '第 {current} 轮，共 {total} 轮', playArea: '反应测试区域', millisecondsShort: '毫秒',
      introTitle: '来，看看你的反应有多快', introHint: '点一下开始，一共 3 轮', wait: '先别点', waitHint: '测试区域变成绿色后再点', clickNow: '就是现在！', readyHint: '快点！', tooSoon: '抢跑了', tooSoonHint: '这次不算，再来。', tooSlow: '这轮超时了', tooSlowHint: '这次不计成绩，马上重来。', reactionTime: '{time} 毫秒', nextHint: '不错，下一轮马上来…', progressLabel: '完成 {completed} / {total} 轮',
      legendReady: '测试区域变绿就点', legendEarly: '变红说明抢跑了', deviceNote: '屏幕、鼠标和设备性能都会影响成绩。',
      resultsTitle: '你的反应段位', resultsSubtitle: '看完段位，拿走推荐准星。', testAgain: '再测一次', yourResults: '你的结果', average: '平均反应', consistency: '稳定程度', earlyClicks: '抢跑次数', roundTimes: '每轮成绩', interpretation: '你的风格',
      profiles: { precision: '又快又稳', balanced: '比较均衡', steady: '稳扎稳打', visibility: '醒目优先' },
      reactionRank: '反应段位', rankPlacement: '本轮 {average} {unit} · {range}',
      ranks: { iron: '黑铁', bronze: '青铜', silver: '白银', gold: '黄金', platinum: '铂金', diamond: '钻石', ascendant: '超凡', immortal: '神话', radiant: '无畏战魂' },
      rankTaunts: { iron: '敌人都换完弹了，你才反应过来。', bronze: '能点到，但通常要等对面先开枪。', silver: '反应上线了，只是偶尔还在加载。', gold: '不错，至少不会总被“怎么死的”困扰。', platinum: '手已经跟上眼睛，接下来别空枪。', diamond: '这反应够快，输的话就不能怪设备了。', ascendant: '对面刚露头，你的枪已经响了。', immortal: '这速度有点离谱，排位里最好也这么快。', radiant: '别测了，对面还没露头你都快开枪了。' },
      recommended: '为你选的准星', rankReasons: { iron: '先用醒目一点的闭合准星，别让准星比敌人还难找。', bronze: '大一点、亮一点，先保证抬枪时能立刻看见。', silver: '清楚的中心能帮你少找半拍，第一枪更容易跟上。', gold: '你已经不缺反应，紧凑准星更适合把第一枪压稳。', platinum: '小而清楚的中心，切目标时少一点犹豫。', diamond: '视线跟得上，微型准星能把目标留得更干净。', ascendant: '反应够快，交给小准星，把屏幕空间还给爆头线。', immortal: '这种速度不需要大准星提醒你，越干净越利落。', radiant: '准星只负责确认位置，剩下的交给你的反应。' },
      shareResult: '点名挑战一个队友', sharePreparing: '正在生成…', shareSaved: '战绩卡已保存，发出去吧', shareShared: '挑战已发出', shareError: '再试一次', shareTitle: '我的 AimCodes 反应段位', shareText: '我测出了{rank}，平均 {average} {unit}。你能比我快吗？', shareCardTitle: '我的反应段位', shareCardPick: '本轮推荐准星', shareCardFooter: '反应测试 · aimcodes.com',
      sharePanelEyebrow: '你的挑战卡', sharePanelTitle: '队友说他反应比你快？', sharePanelBody: '把战绩卡和挑战链接发给他，给他 3 轮机会打破你的 {average} {unit}。', sharePreviewAlt: '反应战绩卡预览', downloadShareCard: '下载战绩卡', copyChallengeLink: '复制挑战链接', challengeLinkCopied: '挑战链接已复制', shareCardChallengeTitle: '你能比我快吗？', shareCardChallengeHint: '来破我的 {average} {unit} · aimcodes.com',
      challengeLabel: '反应挑战', challengeLandingTitle: '有人用 {score} {unit} 向你发起挑战', challengeLandingBody: '测 3 轮。赢下他的成绩，再把战绩甩回去。', challengeWon: '你快了 {difference} {unit}，这回合你赢了。', challengeMissed: '还差 {difference} {unit}。要不要再来一轮？', challengeTied: '一毫秒不差。再来一轮分胜负。',
      copyHelp: '颜色已经写进代码，复制后直接导入游戏就行。', rankRanges: '大家都在哪一档', rankRangesHint: '越往右越快；屏幕和鼠标也会影响成绩。', yourTier: '你', backExplore: '返回找准星',
    },
  },
  'pt-BR': {
    meta: { title: 'AimCodes — encontre uma mira que combine com você', description: 'Teste miras de VALORANT em mapas reais e copie o código em segundos.' },
    nav: { explore: 'Ver miras', finder: 'Escolha por mim', resources: 'Guias e ferramentas', mine: 'Minhas miras', more: 'Mais', close: 'Fechar menu', primary: 'Navegação principal', collections: 'Estilos de mira', learn: 'Guias e ferramentas', generator: 'Gerador de mira' },
    language: { label: 'Trocar idioma' },
    maps: { ascent: 'Ascent', haven: 'Haven', bind: 'Bind' },
    search: { label: 'Buscar miras', placeholder: 'Busque por jogador, cor ou estilo…', clear: 'Limpar busca' },
    workspace: { label: 'Teste esta mira' },
    hud: { live: 'AO VIVO', attack: 'ATAQUE', preview: 'PRÉVIA PELO CÓDIGO', coordinates: 'X: 0  Y: 0' },
    actions: { copy: 'Copiar código', copied: 'Copiado', copyShort: 'Copiar', copiedShort: 'Copiado', import: 'Como usar', clear: 'Limpar busca', save: 'Salvar mira', random: 'Sortear uma' },
    favorites: { add: 'Salvar esta mira', remove: 'Remover das salvas', saved: 'Salva', removed: 'Removida' },
    instructions: { one: 'Abra as configurações do VALORANT.', two: 'Vá em Mira → Importar código de perfil.', three: 'Cole o código e pronto.' },
    preview: { settings: 'Trocar mapa ou cor', mapZoom: 'Mapa e tamanho', background: 'Mapa', crosshairColor: 'Cor da mira', colorHelp: 'Escolha uma cor e o código muda junto.', colorVariant: '{name} · {color}', colorVariantDescription: 'Mesmo formato, outra cor. O código já está pronto para copiar.', zoom: 'Tamanho da prévia', base: 'Normal', reset: 'Voltar ao tamanho normal', reduce: 'Diminuir a mira', increase: 'Aumentar a mira', help: 'Só muda o tamanho da prévia, não o código.', viewFull: 'Ver código', fullTitle: 'Ver e copiar o código completo', mapAlt: 'Cena de jogo em {map}' },
    integrity: { invalid: 'Não conseguimos ler este código. Teste no VALORANT antes de usar.', approximate: 'A prévia pode mudar um pouco porque o código usa uma cor própria.', valid: 'A prévia vem do código. Erros de movimento e tiro estão desligados.' },
    source: { label: 'De:', checked: 'conferida', saved: 'salva', proNote: 'Os jogadores podem trocar de mira, então teste antes.', communityNote: 'Teste rapidinho no VALORANT antes de escolher.' },
    collection: { title: 'Mais miras', subtitle: 'Escolha uma, teste e copie o código.', countOne: '{count} mira', countMany: '{count} miras' },
    filters: { label: 'Buscar por tipo', all: 'Todas', pro: 'De pro', dot: 'Pontos', small: 'Pequenas', classic: 'Clássicas', cute: 'Fofas', fun: 'Diferentes', favorites: 'Salvas', recent: 'Vistas', mine: 'Minhas' },
    sort: { label: 'Ordem', recommended: 'Recomendadas', name: 'Nome A–Z', updated: 'Atualizadas' },
    catalogUx: { filters: 'Filtros', closeFilters: 'Fechar filtros', backToResults: 'Voltar para as miras', loadMore: 'Ver mais miras', showing: 'Mostrando {shown} de {total}' },
    loading: { route: 'Quase pronto. Preparando a página…' },
    colors: { label: 'Cor', filter: 'Escolher cor', white: 'Branco', black: 'Preto', green: 'Verde', lime: 'Verde-limão', chartreuse: 'Verde-amarelo', yellow: 'Amarelo', cyan: 'Ciano', pink: 'Rosa', red: 'Vermelho', custom: 'Cor original' },
    badges: { pro: 'De pro', cute: 'Fofa', fun: 'Diferente' },
    empty: { filteredTitle: 'Não tem nenhuma por aqui', filteredBody: 'Tente outra busca ou categoria.' },
    toast: { copied: 'Código da “{name}” copiado', copyBlocked: 'Não deu para copiar, então abrimos o código para você.', shared: 'Compartilhada', linkCopied: 'Link e código copiados', linkOnlyCopied: 'Link de compartilhamento copiado', textCopied: 'Nome e código copiados', shareFailed: 'Não deu para compartilhar. Tente de novo.', deleted: 'Mira removida' },
    share: { crosshairAction: 'Mandar esta mira', crosshairWorking: 'Abrindo opções…', crosshairShared: 'Enviada', crosshairCopied: 'Link e código copiados', crosshairError: 'Tentar de novo', crosshairTitle: 'Código da mira {name}', crosshairText: 'Teste esta mira {name} no VALORANT.', crosshairBundle: '{name} — mira de VALORANT\n\nCódigo:\n{code}\n\nTeste o mapa e a cor aqui:\n{url}', eyebrow: 'PRONTA PARA ENVIAR', dialogTitle: 'Mande esta mira', dialogBody: 'O link mantém o mapa e a cor escolhidos. Seu duo pode testar a prévia e copiar o código.', previewMeta: '{map} · {color}', actionsLabel: 'Opções de compartilhamento', nativeAction: 'Compartilhar com um app', copyLink: 'Copiar link da prévia', linkCopied: 'Link da prévia copiado', copyBundle: 'Copiar código + link', bundleCopied: 'Código + link copiados', copyBundleHint: 'Ideal para Discord ou chat do time', statePreserved: 'O mapa e a cor escolhidos ficam salvos no link.', wechatGuideTitle: 'Compartilhar dentro do WeChat', wechatGuideBody: 'Toque em ··· no canto superior direito e escolha “Enviar para o chat”. Se os contatos não abrirem, copie o link e cole na conversa.', wechatCopyAction: 'Copiar link para o WeChat', wechatCopied: 'Link copiado — cole no WeChat', wechatFallbackHint: 'Se o WeChat não abrir seus contatos, copie o link e cole na conversa.', close: 'Fechar opções de compartilhamento' },
    confirm: { delete: 'Remover “{name}” das suas miras?' },
    card: { copy: 'Copiar código da {name}', copied: 'Código da {name} copiado', test: 'Testar {name}', selected: 'Selecionada' },
    codeDialog: { close: 'Fechar', title: 'Copiar código da mira', body: 'A cópia automática não funcionou. Selecione o código abaixo e copie manualmente.' },
    modal: { title: 'Salve sua própria mira', intro: 'Cole um código para testar. Ele fica só neste navegador.', savedList: 'Suas miras', test: 'Testar esta', addAnother: 'Adicionar outra', addFirst: 'Adicionar a primeira', instant: 'Prévia na hora', name: 'Nome', namePlaceholder: 'Ex.: Minha mira pequena', code: 'Código da mira', recognized: 'Tudo certo', generated: '{color} · pronta para testar', source: 'Onde você encontrou?', optional: '(opcional)', sourcePlaceholder: 'Link do post, vídeo ou perfil', saved: 'Salva neste navegador.', newName: 'Minha mira', copy: 'Copiar código da {name}', delete: 'Remover {name}' },
    errors: { nameShort: 'Dê um nome com pelo menos 2 caracteres.', tooShort: 'Cole o código completo da mira.', invalidChars: 'O VALORANT não vai reconhecer alguns caracteres deste código.', missingPrimary: 'Este código está sem a parte principal da mira.', invalidColor: 'Use uma cor válida de seis dígitos.' },
    local: { description: 'Uma mira que você salvou', descriptionApprox: 'Sua mira salva · a cor pode ficar um pouco diferente', sourceGiven: 'Link que você adicionou', sourceBrowser: 'Salva neste navegador' },
    finder: {
      title: 'A gente escolhe para você', subtitle: 'Três cliques e uma mira para chamar de sua.', exit: 'Sair', round: 'RODADA {current} DE {total}', playArea: 'Área do teste de reação', millisecondsShort: 'ms',
      introTitle: 'VAMOS VER SEU TEMPO DE REAÇÃO', introHint: 'Clique para começar as 3 rodadas', wait: 'AINDA NÃO', waitHint: 'Clique quando a área ficar verde', clickNow: 'AGORA!', readyHint: 'Clique o mais rápido que puder', tooSoon: 'VOCÊ SE ADIANTOU', tooSoonHint: 'Essa não conta. Prepare-se de novo.', tooSlow: 'DEMOROU DEMAIS', tooSlowHint: 'Essa rodada expirou. Prepare-se e tente de novo.', reactionTime: '{time} ms', nextHint: 'Boa. A próxima já vem…', progressLabel: '{completed} de {total} rodadas prontas',
      legendReady: 'Verde: clique', legendEarly: 'Vermelho: foi cedo demais', deviceNote: 'Sua tela, mouse e aparelho podem mudar o resultado.',
      resultsTitle: 'Seu elo de reação', resultsSubtitle: 'Veja seu elo. Leve sua mira.', testAgain: 'De novo', yourResults: 'SEU RESULTADO', average: 'MÉDIA', consistency: 'REGULARIDADE', earlyClicks: 'CLIQUES ADIANTADOS', roundTimes: 'TEMPOS', interpretation: 'SEU ESTILO',
      profiles: { precision: 'Rápido e preciso', balanced: 'Equilibrado', steady: 'Calmo e estável', visibility: 'Fácil de ver' },
      reactionRank: 'ELO DE REAÇÃO', rankPlacement: 'Nesta rodada: {average} {unit} · {range}',
      ranks: { iron: 'Ferro', bronze: 'Bronze', silver: 'Prata', gold: 'Ouro', platinum: 'Platina', diamond: 'Diamante', ascendant: 'Ascendente', immortal: 'Imortal', radiant: 'Radiante' },
      rankTaunts: { iron: 'Deu tempo de o inimigo recarregar antes da sua reação.', bronze: 'Você chegou… logo depois do primeiro tiro inimigo.', silver: 'Seus reflexos carregaram. Na maior parte do tempo.', gold: 'Já dá para parar de perguntar “como eu morri?” toda rodada.', platinum: 'A mão acompanha os olhos. Agora não erre.', diamond: 'Foi rápido. Não dá mais para culpar o equipamento.', ascendant: 'O inimigo mal apareceu e você já estava atirando.', immortal: 'Essa velocidade está ficando suspeita.', radiant: 'Pode parar: você quase dá prefire em qualquer ângulo.' },
      recommended: 'NOSSA ESCOLHA', rankReasons: { iron: 'Use uma mira grande e fácil de ver. Ela não pode ser mais difícil de achar que o inimigo.', bronze: 'Um centro maior e mais brilhante aparece rápido quando você abre o ângulo.', silver: 'Um centro claro economiza um instante e ajuda o primeiro tiro.', gold: 'Seus reflexos já dão conta; uma mira compacta ajuda a firmar a primeira bala.', platinum: 'Pequena e clara: menos dúvida na hora de trocar de alvo.', diamond: 'Seus olhos acompanham; uma mira mínima deixa o alvo mais limpo.', ascendant: 'Você tem velocidade para uma mira pequena e a linha de cabeça livre.', immortal: 'Você não precisa de uma mira gigante. Aqui, limpa e mínima funciona melhor.', radiant: 'A mira só confirma o ponto. Seus reflexos fazem o resto.' },
      shareResult: 'Desafiar um amigo', sharePreparing: 'Criando imagem…', shareSaved: 'Card salvo—mande agora', shareShared: 'Desafio enviado', shareError: 'Tentar de novo', shareTitle: 'Meu elo de reação no AimCodes', shareText: 'Cheguei a {rank} com média de {average} {unit}. Consegue superar?', shareCardTitle: 'MEU ELO DE REAÇÃO', shareCardPick: 'MINHA MIRA INDICADA', shareCardFooter: 'Teste de reação · aimcodes.com',
      sharePanelEyebrow: 'SEU CARD DE DESAFIO', sharePanelTitle: 'Seu amigo acha que é mais rápido?', sharePanelBody: 'Mande o card e o link. Ele terá três rodadas para superar seus {average} {unit}.', sharePreviewAlt: 'Prévia do seu card de reação', downloadShareCard: 'Baixar card do resultado', copyChallengeLink: 'Copiar link do desafio', challengeLinkCopied: 'Link copiado', shareCardChallengeTitle: 'Acha que me supera?', shareCardChallengeHint: 'Supere meus {average} {unit} · aimcodes.com',
      challengeLabel: 'Desafio de reação', challengeLandingTitle: 'Alguém desafiou você com {score} {unit}', challengeLandingBody: 'Três rodadas. Bata o tempo e fique com o direito de provocar.', challengeWon: 'Você foi {difference} {unit} mais rápido. Rodada vencida.', challengeMissed: 'Faltaram {difference} {unit}. Vai outra?', challengeTied: 'Empate exato. Isso pede mais uma rodada.',
      copyHelp: 'A cor já está no código. Copie e importe no VALORANT.', rankRanges: 'ONDE VOCÊ FICOU?', rankRangesHint: 'Os elos mais rápidos ficam à direita. Sua tela e mouse também influenciam.', yourTier: 'VOCÊ', backExplore: 'Voltar para as miras',
    },
  },
}

const catalogExpansionCopy = Object.fromEntries(
  [...catalogExpansionCrosshairs, ...funnyExpansionCrosshairs].map((item) => [item.id, item.localizedCopy]),
)

export const crosshairCopy = {
  ...catalogExpansionCopy,
  'aspas-dot': {
    en: ['Aspas — closed cyan cross', 'Aspas', 'Short cyan lines connected at the center'], es: ['Aspas — cruz cian cerrada', 'Aspas', 'Líneas cian cortas unidas en el centro'], 'zh-CN': ['Aspas — 青色闭合十字', 'Aspas', '四条青色短线连接在中心'], 'pt-BR': ['Aspas — cruz ciano fechada', 'Aspas', 'Linhas ciano curtas conectadas no centro'],
  },
  tenz: {
    en: ['TenZ — classic cyan', 'TenZ', 'Four short lines with an open center'], es: ['TenZ — clásica cian', 'TenZ', 'Cuatro líneas cortas con centro abierto'], 'zh-CN': ['TenZ — 经典青色准星', 'TenZ', '四条短线，中间留空'], 'pt-BR': ['TenZ — clássica ciano', 'TenZ', 'Quatro linhas curtas com centro aberto'],
  },
  forsaken: {
    en: ['f0rsakeN — white micro', 'f0rsakeN', 'Four minimal, well-spaced lines'], es: ['f0rsakeN — micro blanca', 'f0rsakeN', 'Cuatro líneas mínimas bien separadas'], 'zh-CN': ['f0rsakeN — 白色微型准星', 'f0rsakeN', '四条极短且间距清晰的线'], 'pt-BR': ['f0rsakeN — micro branca', 'f0rsakeN', 'Quatro traços mínimos e bem espaçados'],
  },
  demon1: {
    en: ['Demon1 — white dot', 'Demon1', 'Simple white dot for precision'], es: ['Demon1 — punto blanco', 'Demon1', 'Punto blanco simple para precisión'], 'zh-CN': ['Demon1 — 白色点状准星', 'Demon1', '强调精准度的简洁白点'], 'pt-BR': ['Demon1 — ponto branco', 'Demon1', 'Ponto branco simples para precisão'],
  },
  'scream-dot': {
    en: ['ScreaM — white dot', 'ScreaM Dot', 'Center dot with subtle inner lines'], es: ['ScreaM — punto blanco', 'Punto de ScreaM', 'Punto central con líneas interiores discretas'], 'zh-CN': ['ScreaM — 白色小点', 'ScreaM 小点', '中心小点配上很短的内线'], 'pt-BR': ['ScreaM — ponto branco', 'Ponto do ScreaM', 'Ponto central com linhas internas discretas'],
  },
  less: {
    en: ['Less — closed cross', 'Less', 'Defined center with very short lines'], es: ['Less — cruz cerrada', 'Less', 'Centro marcado con líneas muy cortas'], 'zh-CN': ['Less — 闭合十字', 'Less', '短线闭合，中心清晰'], 'pt-BR': ['Less — cruz fechada', 'Less', 'Centro marcado com linhas muito curtas'],
  },
  boaster: {
    en: ['Boaster — closed cyan', 'Boaster', 'Cyan lines connected at the center'], es: ['Boaster — cian cerrada', 'Boaster', 'Líneas cian unidas en el centro'], 'zh-CN': ['Boaster — 青色闭合准星', 'Boaster', '青色线条连接至中心'], 'pt-BR': ['Boaster — ciano fechada', 'Boaster', 'Linhas ciano ligadas ao centro'],
  },
  cned: {
    en: ['cNed — white cross', 'cNed', 'Clean continuous white cross'], es: ['cNed — cruz blanca', 'cNed', 'Cruz blanca continua y limpia'], 'zh-CN': ['cNed — 白色十字', 'cNed', '干净的连续白色十字'], 'pt-BR': ['cNed — cruz branca', 'cNed', 'Cruz contínua, branca e limpa'],
  },
  jinggg: {
    en: ['Jinggg — compact green', 'Jinggg', 'Small green crosshair with open center'], es: ['Jinggg — verde compacta', 'Jinggg', 'Pequeña, verde y con centro abierto'], 'zh-CN': ['Jinggg — 绿色紧凑准星', 'Jinggg', '小巧绿色，中间留空'], 'pt-BR': ['Jinggg — verde compacta', 'Jinggg', 'Pequena, verde e com centro aberto'],
  },
  sacy: {
    en: ['Sacy — classic cyan', 'Sacy', 'Four short cyan lines with an open center'], es: ['Sacy — clásica cian', 'Sacy', 'Cuatro líneas cian cortas con centro abierto'], 'zh-CN': ['Sacy — 经典青色准星', 'Sacy', '四条青色短线，中间留空'], 'pt-BR': ['Sacy — clássica ciano', 'Sacy', 'Quatro linhas ciano curtas com centro aberto'],
  },
  saadhak: {
    en: ['Saadhak — layered white', 'Saadhak', 'A fine dot with inner and outer support lines'], es: ['Saadhak — blanca en capas', 'Saadhak', 'Punto fino con líneas interiores y exteriores'], 'zh-CN': ['Saadhak — 白色分层准星', 'Saadhak', '细小中心点配合内外两层线条'], 'pt-BR': ['Saadhak — branca em camadas', 'Saadhak', 'Ponto fino com linhas internas e externas de apoio'],
  },
  mwzera: {
    en: ['mwzera — closed black cross', 'mwzera', 'Short black lines connected at the center'], es: ['mwzera — cruz negra cerrada', 'mwzera', 'Líneas negras cortas unidas en el centro'], 'zh-CN': ['mwzera — 黑色闭合十字', 'mwzera', '四条黑色短线连接在中心'], 'pt-BR': ['mwzera — cruz preta fechada', 'mwzera', 'Linhas pretas curtas conectadas no centro'],
  },
  cortezia: {
    en: ['Cortezia — black dot', 'Cortezia', 'A black center dot with an outline'], es: ['Cortezia — punto negro', 'Cortezia', 'Punto negro central con contorno'], 'zh-CN': ['Cortezia — 黑色点状准星', 'Cortezia', '带轮廓的黑色中心点'], 'pt-BR': ['Cortezia — ponto preto', 'Cortezia', 'Ponto preto central com contorno'],
  },
  sato: {
    en: ['Sato — compact black', 'Sato', 'Short black lines with a narrow center'], es: ['Sato — negra compacta', 'Sato', 'Líneas negras cortas con un centro estrecho'], 'zh-CN': ['Sato — 黑色紧凑准星', 'Sato', '四条黑色短线，中间留出窄缝'], 'pt-BR': ['Sato — preta compacta', 'Sato', 'Linhas pretas curtas com centro estreito'],
  },
  tteuw: {
    en: ['Tteuw — layered white dot', 'Tteuw', 'A dot with minimal inner and outer lines'], es: ['Tteuw — punto blanco en capas', 'Tteuw', 'Punto con líneas interiores y exteriores mínimas'], 'zh-CN': ['Tteuw — 白色分层点', 'Tteuw', '中心点配合极短的内外线条'], 'pt-BR': ['Tteuw — ponto branco em camadas', 'Tteuw', 'Ponto com linhas internas e externas mínimas'],
  },
  yay: {
    en: ['yay — white cross', 'yay', 'Four continuous white lines'], es: ['yay — cruz blanca', 'yay', 'Cuatro líneas blancas continuas'], 'zh-CN': ['yay — 白色十字', 'yay', '四条连续白线'], 'pt-BR': ['yay — cruz branca', 'yay', 'Cruz branca de quatro linhas contínuas'],
  },
  'recoil-c': {
    en: ['Recoil C — classic cyan', 'Recoil C', 'Popular recent community code'], es: ['Recoil C — clásica cian', 'Recoil C', 'Código reciente popular de la comunidad'], 'zh-CN': ['经典青色准星', '经典青色', '最近很受欢迎的一款社区准星'], 'pt-BR': ['Recoil C — ciano clássica', 'Recoil C', 'Código popular recente da comunidade'],
  },
  'vcrdb-dot': {
    en: ['Micro dot', 'Micro dot', 'A tiny community-made dot'], es: ['Micropunto', 'Micropunto', 'Un punto muy pequeño creado por la comunidad'], 'zh-CN': ['微型小点', '微型点', '一个非常小的点状准星'], 'pt-BR': ['Micro ponto', 'Micro ponto', 'Um ponto bem pequeno feito pela comunidade'],
  },
  'cat-pink': {
    en: ['Pink cat face', 'Kitty', 'Compact ears and a center form a cat face'], es: ['Cara de gato rosa', 'Gatito', 'Orejas compactas y un centro forman una cara de gato'], 'zh-CN': ['粉色猫脸', '猫猫', '紧凑的双耳和中心拼成一张猫脸'], 'pt-BR': ['Rosto de gato rosa', 'Gatinho', 'Orelhas compactas e um centro formam um rosto de gato'],
  },
  'pig-pink': {
    en: ['Pink pig face', 'Piggy', 'Wide blocks form a square snout with ears'], es: ['Cara de cerdito rosa', 'Cerdito', 'Bloques anchos forman un hocico cuadrado con orejas'], 'zh-CN': ['粉色猪脸', '猪猪', '宽线块拼出方形猪鼻和两只耳朵'], 'pt-BR': ['Rosto de porquinho rosa', 'Porquinho', 'Blocos largos formam um focinho quadrado com orelhas'],
  },
  'heart-pink': {
    en: ['Love — static pink heart', 'Love', 'Static pink heart made from short lines'], es: ['Corazón rosa', 'Corazón', 'Un corazón rosa hecho con líneas cortas'], 'zh-CN': ['粉色爱心', '爱心', '几条短线拼成的粉色爱心'], 'pt-BR': ['Coração rosa', 'Coração', 'Um coração rosa feito com linhas curtas'],
  },
  'flower-pink': {
    en: ['Bloom — pink flower', 'Bloom', 'A compact flower for casual matches'], es: ['Flor rosa', 'Flor', 'Una flor pequeña para partidas casuales'], 'zh-CN': ['粉色花朵', '花朵', '小巧的粉色花朵，适合休闲局'], 'pt-BR': ['Flor rosa', 'Flor', 'Uma flor pequena para partidas casuais'],
  },
  'sakura-pink': {
    en: ['Sakura — pastel petals', 'Sakura', 'Soft pink petal-style community crosshair'], es: ['Sakura — pétalos rosa', 'Sakura', 'Una mira con pétalos de color rosa suave'], 'zh-CN': ['粉色樱花', '樱花', '柔和的粉色花瓣造型'], 'pt-BR': ['Sakura — pétalas rosas', 'Sakura', 'Uma mira com pétalas em rosa suave'],
  },
  'bunny-white': {
    en: ['Bunny — white ears', 'Bunny', 'Tall white lines suggest bunny ears'], es: ['Conejito — orejas blancas', 'Conejito', 'Las líneas blancas parecen orejas de conejo'], 'zh-CN': ['白色兔耳', '兔兔', '高低线条拼成一对兔耳'], 'pt-BR': ['Coelho — orelhas brancas', 'Coelho', 'As linhas brancas lembram orelhas de coelho'],
  },
  'small-dot-thick': {
    en: ['Pixel — thick white dot', 'Pixel', 'Compact dot with minimal arms and a solid center'], es: ['Píxel — punto blanco', 'Píxel', 'Punto compacto con brazos mínimos y centro sólido'], 'zh-CN': ['粗白点', '粗白点', '中心很紧凑，四边带一点短线'], 'pt-BR': ['Pixel — ponto branco', 'Pixel', 'Ponto compacto com braços mínimos e centro sólido'],
  },
  'square-box': {
    en: ['Box — white square', 'Box', 'Larger center block for high visibility'], es: ['Cuadro blanco', 'Cuadro', 'Un centro grande que se ve con facilidad'], 'zh-CN': ['白色方块', '白方块', '中心方块更大，一眼就能找到'], 'pt-BR': ['Bloco branco', 'Bloco', 'Um centro maior e fácil de enxergar'],
  },
  'circle-dot-cyan': {
    en: ['Orbit — cyan ring', 'Orbit', 'Four short lines form a tiny closed ring'], es: ['Órbita — anillo cian', 'Órbita', 'Cuatro líneas cortas forman un pequeño anillo'], 'zh-CN': ['青色圆环', '青色圆环', '四条短线组成一个小圆环'], 'pt-BR': ['Órbita — círculo ciano', 'Órbita', 'Quatro traços curtos formam um pequeno anel'],
  },
  'small-circle-cyan': {
    en: ['Halo — compact cyan ring', 'Halo', 'Short ring with a fine center dot'], es: ['Halo — anillo cian', 'Halo', 'Anillo pequeño con un punto fino en el centro'], 'zh-CN': ['青色小圆环', '小圆环', '小圆环中间再加一个细点'], 'pt-BR': ['Halo — círculo ciano', 'Halo', 'Anel pequeno com um ponto fino no centro'],
  },
  'square-green': {
    en: ['Cube — green square', 'Cube', 'Very thick lines form a center square'], es: ['Cubo — cuadrado verde', 'Cubo', 'Líneas gruesas forman un cuadrado en el centro'], 'zh-CN': ['绿色方框', '绿方框', '粗线围成一个醒目的绿色方框'], 'pt-BR': ['Cubo — quadrado verde', 'Cubo', 'Linhas grossas formam um quadrado no centro'],
  },
  'diamond-white': {
    en: ['Prism — white diamond', 'Prism', 'Inner and outer layers create a diamond sight'], es: ['Prisma — diamante blanco', 'Prisma', 'Dos capas de líneas forman un diamante'], 'zh-CN': ['白色钻石', '白钻石', '内外两层线条拼成钻石形状'], 'pt-BR': ['Prisma — diamante branco', 'Prisma', 'Duas camadas de linhas formam um diamante'],
  },
  'circle-diamond-green': {
    en: ['Gem — green diamond', 'Gem', 'Square dot with two layers of short lines'], es: ['Gema — diamante verde', 'Gema', 'Punto cuadrado con dos capas de líneas cortas'], 'zh-CN': ['绿色宝石', '绿宝石', '中心方点外面围着两层短线'], 'pt-BR': ['Gema — diamante verde', 'Gema', 'Ponto quadrado com duas camadas de linhas curtas'],
  },
  'flower-cyan': {
    en: ['Lotus — cyan flower', 'Lotus', 'Fine petals around a thick flower core'], es: ['Loto — flor cian', 'Loto', 'Pétalos finos alrededor de un centro grueso'], 'zh-CN': ['青色花朵', '青色花朵', '细花瓣围着一个厚实的花芯'], 'pt-BR': ['Lótus — flor ciano', 'Lótus', 'Pétalas finas ao redor de um centro grosso'],
  },
  'star-cyan': {
    en: ['Nova — cyan star', 'Nova', 'Bright center with four fine rays'], es: ['Nova — estrella cian', 'Nova', 'Centro brillante con cuatro rayos finos'], 'zh-CN': ['青色星星', '青色星星', '亮眼的中心加上四条细线'], 'pt-BR': ['Nova — estrela ciano', 'Nova', 'Centro brilhante com quatro raios finos'],
  },
  'shuriken-white': {
    en: ['Shuriken — white ninja star', 'Shuriken', 'Two line layers create a sharp star'], es: ['Shuriken — estrella ninja blanca', 'Shuriken', 'Dos capas de líneas forman una estrella afilada'], 'zh-CN': ['白色手里剑', '手里剑', '两层线条拼成锐利的星形'], 'pt-BR': ['Shuriken — estrela ninja branca', 'Shuriken', 'Duas camadas de linhas formam uma estrela afiada'],
  },
  'among-us-cyan': {
    en: ['Crewmate — cyan character', 'Crewmate', 'Thick blocks form a playful character silhouette'], es: ['Tripulante cian', 'Tripulante', 'Bloques gruesos forman un personaje divertido'], 'zh-CN': ['青色太空船员', '太空船员', '粗线块拼成一个太空船员'], 'pt-BR': ['Tripulante ciano', 'Tripulante', 'Blocos grossos formam um personagem divertido'],
  },
  'nerd-glasses': {
    en: ['Nerd — white glasses', 'Glasses', 'Horizontal bars and a center dot resemble glasses'], es: ['Gafas blancas', 'Gafas', 'Barras horizontales y un punto central forman unas gafas'], 'zh-CN': ['白色眼镜', '眼镜', '横线和中心点拼成眼镜造型'], 'pt-BR': ['Óculos brancos', 'Óculos', 'Barras horizontais e um ponto formam óculos'],
  },
  'pink-block': {
    en: ['Candy Bar — pink block', 'Candy Bar', 'Wide outlined pink bar for casual matches'], es: ['Barra rosa', 'Barra rosa', 'Una barra rosa ancha para partidas casuales'], 'zh-CN': ['粉色横条', '粉色横条', '一条带描边的宽粉色横条'], 'pt-BR': ['Barra rosa', 'Barra rosa', 'Uma barra rosa larga para partidas casuais'],
  },
  'hollow-mint': {
    en: ['Mint Ring — hollow mint circle', 'Mint Ring', 'Minimal open ring in bright mint'], es: ['Aro menta', 'Aro menta', 'Un aro pequeño y abierto en verde menta'], 'zh-CN': ['薄荷圆环', '薄荷圆环', '明亮的薄荷色空心圆环'], 'pt-BR': ['Anel menta', 'Anel menta', 'Um anel pequeno e aberto em verde menta'],
  },
  'blue-flower': {
    en: ['Bluebell — blue flower', 'Bluebell', 'Center dot with two layers of blue petals'], es: ['Campanilla azul', 'Campanilla', 'Punto central con dos capas de pétalos azules'], 'zh-CN': ['蓝色花朵', '蓝色花朵', '中心点外面围着两层蓝色花瓣'], 'pt-BR': ['Flor azul', 'Flor azul', 'Ponto central com duas camadas de pétalas azuis'],
  },
  'wide-horizontal': {
    en: ['Horizon — horizontal line', 'Horizon', 'Wide horizontal line with a square center'], es: ['Horizonte', 'Horizonte', 'Línea horizontal ancha con un centro cuadrado'], 'zh-CN': ['水平线', '水平线', '一条宽横线，中间带方形中心'], 'pt-BR': ['Horizonte', 'Horizonte', 'Linha horizontal larga com um centro quadrado'],
  },
  'dual-layer-green': {
    en: ['Vector — dual-layer green', 'Vector', 'Compact center with inner and outer lines'], es: ['Vector — verde doble', 'Vector', 'Centro compacto con líneas interiores y exteriores'], 'zh-CN': ['双层绿色', '双层绿', '紧凑中心加上内外两层短线'], 'pt-BR': ['Vetor — verde duplo', 'Vetor', 'Centro compacto com linhas internas e externas'],
  },
  'have-fun-green': {
    en: ['Radar — wide green sight', 'Radar', 'Two wide layers for an experimental reticle'], es: ['Radar — verde amplio', 'Radar', 'Dos capas anchas para una mira diferente'], 'zh-CN': ['宽幅绿色', '雷达', '两层宽线组成一个特别的绿色准星'], 'pt-BR': ['Radar — verde amplo', 'Radar', 'Duas camadas largas para uma mira diferente'],
  },
  'spark-pink': {
    en: ['Pink spark', 'Spark', 'A center dot with two layered star points'], es: ['Destello rosa', 'Destello', 'Un punto central con dos capas en forma de estrella'], 'zh-CN': ['粉色星芒', '星芒', '中心点外叠着两层星芒'], 'pt-BR': ['Faísca rosa', 'Faísca', 'Ponto central com duas camadas em forma de estrela'],
  },
  'needle-cyan': {
    en: ['Cyan needle dot', 'Needle', 'A single cyan pixel for maximum precision'], es: ['Punto aguja cian', 'Aguja', 'Un solo píxel cian para máxima precisión'], 'zh-CN': ['青色针点', '针点', '只有一个青色像素，目标遮挡最少'], 'pt-BR': ['Ponto agulha ciano', 'Agulha', 'Um único pixel ciano para máxima precisão'],
  },
  'pin-white': {
    en: ['White pin dot', 'Pin', 'A small white dot without an outline'], es: ['Punto alfiler blanco', 'Alfiler', 'Un punto blanco pequeño y sin contorno'], 'zh-CN': ['白色小点', '白色小点', '没有描边的干净白色小点'], 'pt-BR': ['Ponto alfinete branco', 'Alfinete', 'Ponto branco pequeno e sem contorno'],
  },
  'pulse-red': {
    en: ['Red pulse dot', 'Pulse', 'A solid medium red dot'], es: ['Punto pulso rojo', 'Pulso', 'Un punto rojo sólido de tamaño medio'], 'zh-CN': ['红色脉冲点', '脉冲点', '大小适中的实心红点'], 'pt-BR': ['Ponto pulso vermelho', 'Pulso', 'Ponto vermelho sólido de tamanho médio'],
  },
  'beacon-yellow': {
    en: ['Yellow beacon dot', 'Beacon', 'A large yellow core that is easy to track'], es: ['Punto faro amarillo', 'Faro', 'Un núcleo amarillo grande y fácil de seguir'], 'zh-CN': ['黄色信标点', '信标点', '醒目的大黄点，抬枪时很好找'], 'pt-BR': ['Ponto farol amarelo', 'Farol', 'Núcleo amarelo grande e fácil de encontrar'],
  },
  'micro-gap-cyan': {
    en: ['Cyan micro gap', 'Micro Gap', 'Four tiny lines with a narrow center gap'], es: ['Micro espacio cian', 'Micro espacio', 'Cuatro líneas mínimas con un hueco estrecho'], 'zh-CN': ['青色微距十字', '微距十字', '四条极短线，中间只留一格'], 'pt-BR': ['Micro espaço ciano', 'Micro espaço', 'Quatro traços mínimos com um vão estreito'],
  },
  'open-four-white': {
    en: ['White open four', 'Four Points', 'Four thin lines with a wide open center'], es: ['Cuatro puntas blancas', 'Cuatro puntas', 'Cuatro líneas finas con el centro bien abierto'], 'zh-CN': ['白色开放四线', '开放四线', '四条细线拉开，中心视野更空'], 'pt-BR': ['Quatro pontas brancas', 'Quatro pontas', 'Quatro linhas finas com centro bem aberto'],
  },
  'compact-green': {
    en: ['Green compact cross', 'Compact', 'A short green cross with a small center'], es: ['Cruz verde compacta', 'Compacta', 'Cruz verde corta con un centro pequeño'], 'zh-CN': ['绿色紧凑十字', '紧凑十字', '短绿线围着一个小中心'], 'pt-BR': ['Cruz verde compacta', 'Compacta', 'Cruz verde curta com centro pequeno'],
  },
  'slim-yellow': {
    en: ['Yellow slim cross', 'Slim', 'Long, very thin yellow lines'], es: ['Cruz amarilla fina', 'Fina', 'Líneas amarillas largas y muy finas'], 'zh-CN': ['黄色细长十字', '细长十字', '线条更长，但保持一像素的轻量感'], 'pt-BR': ['Cruz amarela fina', 'Slim', 'Linhas amarelas longas e muito finas'],
  },
  'wide-axis-red': {
    en: ['Red wide axis', 'Wide Axis', 'Horizontal arms are longer than the vertical ones'], es: ['Eje ancho rojo', 'Eje ancho', 'Los brazos horizontales son más largos que los verticales'], 'zh-CN': ['红色宽轴', '宽轴', '横向长、纵向短，适合盯住头线'], 'pt-BR': ['Eixo largo vermelho', 'Eixo largo', 'Braços horizontais mais longos que os verticais'],
  },
  'tall-axis-cyan': {
    en: ['Cyan tall axis', 'Tall Axis', 'Vertical arms are longer than the horizontal ones'], es: ['Eje alto cian', 'Eje alto', 'Los brazos verticales son más largos que los horizontales'], 'zh-CN': ['青色高轴', '高轴', '纵向长、横向短，中心依然留空'], 'pt-BR': ['Eixo alto ciano', 'Eixo alto', 'Braços verticais mais longos que os horizontais'],
  },
  'short-wings-white': {
    en: ['White short wings', 'Short Wings', 'Short side lines with a dark outline'], es: ['Alas cortas blancas', 'Alas cortas', 'Líneas laterales cortas con contorno oscuro'], 'zh-CN': ['白色短翼', '短翼', '带深色描边的短横翼'], 'pt-BR': ['Asas curtas brancas', 'Asas curtas', 'Traços laterais curtos com contorno escuro'],
  },
  'wing-dot-green': {
    en: ['Green wing dot', 'Wing Dot', 'A fine center dot with long horizontal arms'], es: ['Punto alado verde', 'Punto alado', 'Punto central fino con brazos horizontales largos'], 'zh-CN': ['绿色横翼点', '横翼点', '细点配长横翼，纵向遮挡更少'], 'pt-BR': ['Ponto alado verde', 'Ponto alado', 'Ponto fino com braços horizontais alongados'],
  },
  'vertical-dot-yellow': {
    en: ['Yellow vertical dot', 'Vertical Dot', 'A center dot with long vertical arms'], es: ['Punto vertical amarillo', 'Punto vertical', 'Punto central con brazos verticales largos'], 'zh-CN': ['黄色竖轴点', '竖轴点', '中心点配长竖线，横向视野更干净'], 'pt-BR': ['Ponto vertical amarelo', 'Ponto vertical', 'Ponto central com braços verticais alongados'],
  },
  'cross-dot-red': {
    en: ['Red cross dot', 'Cross Dot', 'A fine dot surrounded by four short lines'], es: ['Punto cruz rojo', 'Punto cruz', 'Un punto fino rodeado por cuatro líneas cortas'], 'zh-CN': ['红色小十字点', '十字点', '细点外围着四条短线'], 'pt-BR': ['Cross dot vermelho', 'Cross Dot', 'Ponto fino cercado por quatro linhas curtas'],
  },
  'twin-layer-cyan': {
    en: ['Cyan twin layer', 'Twin Layer', 'Thin inner lines and a compact outer layer'], es: ['Doble capa cian', 'Doble capa', 'Líneas interiores finas y una capa exterior compacta'], 'zh-CN': ['青色双层短线', '双层短线', '内层细线加外层短块，层次更清楚'], 'pt-BR': ['Duas camadas ciano', 'Duas camadas', 'Linhas internas finas e bloco externo compacto'],
  },
  'ripple-white': {
    en: ['White ripple', 'Ripple', 'A dot and two line distances with an outline'], es: ['Onda blanca', 'Onda', 'Un punto y dos distancias de línea con contorno'], 'zh-CN': ['白色涟漪', '涟漪', '中心点外有近远两层短线'], 'pt-BR': ['Ripple branca', 'Ripple', 'Ponto e duas distâncias de linhas com contorno'],
  },
  'stagger-green': {
    en: ['Green stagger', 'Stagger', 'Two offset axes arranged around a dot'], es: ['Ejes verdes alternados', 'Alternada', 'Dos ejes desplazados alrededor de un punto'], 'zh-CN': ['绿色错层轴', '错层轴', '两组长短轴错层围住中心点'], 'pt-BR': ['Stagger verde', 'Stagger', 'Dois eixos desencontrados ao redor de um ponto'],
  },
  'frame-yellow': {
    en: ['Yellow frame', 'Frame', 'A thick cross with four outer markers'], es: ['Marco amarillo', 'Marco', 'Una cruz gruesa con cuatro marcas exteriores'], 'zh-CN': ['黄色框架', '框架', '厚十字外再加四个定位短点'], 'pt-BR': ['Moldura amarela', 'Moldura', 'Cruz espessa com quatro marcadores externos'],
  },
  'petal-pink': {
    en: ['Pink petals', 'Petals', 'Two asymmetric layers resemble petals'], es: ['Pétalos rosas', 'Pétalos', 'Dos capas asimétricas recuerdan a unos pétalos'], 'zh-CN': ['粉色花瓣', '花瓣', '两层长短轴拼成四片花瓣'], 'pt-BR': ['Pétalas rosas', 'Pétalas', 'Duas camadas assimétricas lembram pétalas'],
  },
  'bow-pink': {
    en: ['Pink bow', 'Bow', 'A center dot with wide bow-shaped wings'], es: ['Lazo rosa', 'Lazo', 'Punto central con alas anchas en forma de lazo'], 'zh-CN': ['粉色蝴蝶结', '蝴蝶结', '中心点两侧展开成蝴蝶结'], 'pt-BR': ['Laço rosa', 'Laço', 'Ponto central com asas largas em forma de laço'],
  },
  'snowflake-white': {
    en: ['White snowflake', 'Snowflake', 'A center dot with two layers of fine rays'], es: ['Copo de nieve blanco', 'Copo de nieve', 'Punto central con dos capas de rayos finos'], 'zh-CN': ['白色雪花', '雪花', '中心点外伸出两层细小雪花枝'], 'pt-BR': ['Floco de neve branco', 'Floco de neve', 'Ponto central e duas camadas de raios finos'],
  },
  'clover-green': {
    en: ['Green clover', 'Clover', 'A solid center surrounded by four compact leaves'], es: ['Trébol verde', 'Trébol', 'Centro sólido rodeado por cuatro hojas compactas'], 'zh-CN': ['绿色四叶草', '四叶草', '实心中心外围着四片紧凑叶子'], 'pt-BR': ['Trevo verde', 'Trevo', 'Centro sólido cercado por quatro folhas compactas'],
  },
  'coordinate-yellow': {
    en: ['Yellow coordinates', 'Coordinates', 'Two opposing axes with a center dot'], es: ['Coordenadas amarillas', 'Coordenadas', 'Dos ejes opuestos con un punto central'], 'zh-CN': ['黄色坐标轴', '坐标轴', '两组相反长短轴围住中心点'], 'pt-BR': ['Coordenadas amarelas', 'Coordenadas', 'Dois eixos de comprimentos opostos com ponto central'],
  },
  'hourglass-cyan': {
    en: ['Cyan hourglass', 'Hourglass', 'Crossed inner and outer axes form an hourglass'], es: ['Reloj de arena cian', 'Reloj de arena', 'Los ejes interiores y exteriores forman un reloj de arena'], 'zh-CN': ['青色沙漏', '沙漏', '内外长短轴交错成沙漏轮廓'], 'pt-BR': ['Ampulheta ciano', 'Ampulheta', 'Eixos internos e externos cruzados formam uma ampulheta'],
  },
  'bullseye-red': {
    en: ['Red bullseye', 'Bullseye', 'A square core with two marker layers'], es: ['Diana roja', 'Diana', 'Núcleo cuadrado con dos capas de marcadores'], 'zh-CN': ['红色靶心', '靶心', '方形核心外叠着两层定位线'], 'pt-BR': ['Bullseye vermelho', 'Bullseye', 'Núcleo quadrado com duas camadas de marcação'],
  },
}

const japaneseCrosshairNames = Object.freeze({
  'cat-pink': ['ピンクの猫クロスヘア', '猫クロスヘア'],
  'pig-pink': ['ピンクの豚クロスヘア', '豚クロスヘア'],
  'heart-pink': ['ピンクのハートクロスヘア', 'ハート'],
  'flower-pink': ['ピンクの花クロスヘア', '花'],
  'sakura-pink': ['桜クロスヘア', '桜'],
  'bunny-white': ['白いうさぎクロスヘア', 'うさぎ'],
  'square-box': ['白い四角クロスヘア', '四角'],
  'circle-dot-cyan': ['シアンの円形クロスヘア', '円形'],
  'small-circle-cyan': ['小さいシアン円形クロスヘア', '小さい円'],
  'flower-cyan': ['シアンの花クロスヘア', 'シアンの花'],
  'shuriken-white': ['白い手裏剣クロスヘア', '手裏剣'],
  'among-us-cyan': ['クルーメイトクロスヘア', 'クルーメイト'],
  'nerd-glasses': ['白いメガネクロスヘア', 'メガネ'],
  'blue-flower': ['青い花クロスヘア', '青い花'],
  'spark-pink': ['ピンクの星形クロスヘア', '星形'],
  'snowflake-white': ['白い雪の結晶クロスヘア', '雪の結晶'],
  'clover-green': ['緑のクローバークロスヘア', 'クローバー'],
  'bow-pink': ['ピンクのリボンクロスヘア', 'リボン'],
})

function japaneseCrosshairCopy(item) {
  if (item.player) {
    return [`${item.player}のVALORANTクロスヘア`, item.player, 'プロ選手の設定を起点に、実際のマップで見え方を確認してからコピーできます。']
  }

  const fixed = japaneseCrosshairNames[item.id]
  const color = { white: '白', green: '緑', lime: 'ライム', chartreuse: '黄緑', yellow: '黄', cyan: 'シアン', pink: 'ピンク', red: '赤', black: '黒' }[item.colorKey] || ''
  const category = { dot: 'ドット', small: '小さい', classic: '定番', cute: 'かわいい', fun: '面白い' }[item.category] || 'カスタム'
  const suffix = item.shortName || item.name || item.id
  const name = fixed?.[0] || `${color ? `${color}の` : ''}${category}クロスヘア「${suffix}」`
  const shortName = fixed?.[1] || suffix
  const descriptions = {
    dot: '中心を小さく保ち、敵の頭を隠しにくいドット系クロスヘアです。',
    small: '短いラインで中心を追いやすく、細かなエイム調整に向く小型クロスヘアです。',
    classic: '中心を見つけやすく、ライフルで扱いやすい定番の十字クロスヘアです。',
    cute: '狙う中心を残しながら、見た目でも楽しめるかわいいクロスヘアです。',
    fun: '射撃場やカジュアルで試したくなる、形に特徴のあるネタ系クロスヘアです。',
  }
  return [name, shortName, descriptions[item.category] || '実際のマップで見え方を試し、コードをそのままコピーできます。']
}

function getPath(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object)
}

export function createTranslator(locale) {
  const dictionary = dictionaries[locale] || dictionaries.en
  return (key, variables = {}) => {
    const template = getPath(dictionary, key) ?? getPath(dictionaries.en, key) ?? key
    return String(template).replace(/\{(\w+)\}/g, (_, name) => variables[name] ?? `{${name}}`)
  }
}

export function localizeCrosshair(item, locale, t) {
  if (item.isLocal) {
    return {
      ...item,
      description: item.previewApproximate ? t('local.descriptionApprox') : t('local.description'),
      sourceName: item.sourceUrl ? t('local.sourceGiven') : t('local.sourceBrowser'),
      colorName: t(`colors.${item.colorKey || 'custom'}`),
    }
  }
  const copy = locale === 'ja'
    ? (crosshairCopy[item.id]?.ja || japaneseCrosshairCopy(item))
    : (crosshairCopy[item.id]?.[locale] || crosshairCopy[item.id]?.en)
  return {
    ...item,
    ...(copy ? { name: copy[0], shortName: copy[1], description: copy[2] } : {}),
    colorName: t(`colors.${item.colorKey || 'custom'}`),
  }
}

export function formatSourceDate(value, locale) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? new Date(`${value}T12:00:00`) : null
  if (!date || Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}
