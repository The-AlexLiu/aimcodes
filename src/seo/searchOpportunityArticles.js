// Query evidence: docs/SEO_KEYWORD_EXPANSION_2026-09-28.md.
const copySource = { label: 'Riot Games — VALORANT Patch Notes 5.04', url: 'https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-5-04/' }
const shootingSource = { label: 'Riot Games — VALORANT Patch Notes 4.10', url: 'https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-4-10/' }

export function enrichArticleCopy(locale, key, content) {
  if (locale === 'en' && key === 'firingError') return {
    ...content,
    title: 'VALORANT shooting error: graph vs firing-error crosshair',
    intro: 'Looking for the Shooting Error graph or the Firing Error crosshair setting? Both help you inspect inaccuracy, but one shows recent shots in a graph and the other changes your aiming reference as you fire.',
    summary: 'The Shooting Error graph records recent shots; Firing Error animates crosshair lines. Turning the crosshair setting off keeps that reference steady without removing weapon spread. Choose the display that helps you diagnose your shots.',
    sections: [{ title: 'Shooting Error graph vs crosshair feedback', paragraphs: ['Riot introduced the Shooting Error performance graph in patch 4.10 to show recent-shot values. It presents the information from crosshair error settings in a form you can review after an engagement. It is a separate display, not a crosshair code.'], bullets: ['Use the graph when you want to review recent shots.', 'Use crosshair error feedback when you want a visible cue around the aiming point.', 'Neither display changes weapon accuracy.'] }, ...content.sections],
    faq: [
      ['Is shooting error the same as firing error?', 'The search term can mean two things: the Shooting Error performance graph, or the Firing Error crosshair setting. The graph displays recent-shot information; the crosshair setting changes the aiming reference while firing.'],
      ['Should I turn firing error on or off?', 'Try it in the range to notice changes between taps and bursts. Turn it off if the moving reference distracts you; the weapon still has the same spread and recoil.'],
      ['Will a static crosshair remove shooting error?', 'No. Disabling movement and firing error changes the display only. Stopping, burst timing and weapon behavior still affect the shot.'],
    ],
    sources: [...content.sources, shootingSource],
    relatedCollectionKeys: ['static', 'phantom'],
    metaTitle: 'VALORANT Shooting Error: Graph vs Crosshair Setting | AimCodes',
    metaDescription: 'Understand the VALORANT Shooting Error graph and Firing Error crosshair setting. Compare their feedback, decide when to use each, and try static codes.',
  }
  if (locale === 'en' && key === 'copy') return {
    ...content,
    title: 'How to copy a crosshair in VALORANT: /cc or a profile code',
    intro: 'Copy a teammate’s crosshair while spectating with /cc or /crosshair copy. If you already have a code from a website or friend, paste it into Import Profile Code in Crosshair settings instead.',
    sections: [...content.sections, { title: 'Copy a code from a website instead of a spectator', paragraphs: ['Open the profile you want on AimCodes, choose the color and press Copy code. In VALORANT, open Settings → Crosshair → Import Profile Code and paste the complete string.'], bullets: ['A profile code belongs in the import field, not normal chat.', 'The /cc command belongs in chat while spectating; it does not accept a pasted profile string.', 'Keep your old profile so you can compare both in the range.'] }],
    faq: [...content.faq, ['Is /crosshair copy different from /cc?', 'Riot documents both commands for the same task: saving the crosshair of the player you are spectating as a new profile.'], ['Where do I paste a crosshair code?', 'Use Import Profile Code in VALORANT Crosshair settings. Do not put the string in chat or in the custom-color field.']],
    metaTitle: 'How to Copy a Crosshair in VALORANT: /cc & Codes | AimCodes',
    metaDescription: 'Copy a teammate’s VALORANT crosshair with /cc or /crosshair copy, or import a code from a website. Find the saved profile and check common copy problems.',
  }
  if (locale === 'ja' && key === 'copy') return {
    ...content,
    title: 'VALORANT クロスヘアのコピーコマンドとコード入力方法',
    intro: '味方を観戦中なら /cc または /crosshair copy。サイトで取得したコードなら、クロスヘア設定のインポート欄に入力します。使う場所が違うので、手元にあるものに合わせて選びましょう。',
    sections: [...content.sections, { title: 'サイトのコードを入力する場所', paragraphs: ['コード全文をコピーし、設定 → クロスヘアでプロファイルコードのインポートを開きます。チャットや色の入力欄ではありません。保存後は選択中のプロファイルを確認してください。'], bullets: ['観戦中のコピー：チャットに /cc または /crosshair copy。', '文字列のコード：プロファイルのインポート欄に全文を貼り付け。', '保存できない：全文のコピーとプロファイルの空き枠を確認。'] }],
    faq: [
      ['味方のクロスヘアをコピーするコマンドは？', 'コピーしたいプレイヤーを観戦し、チャットに /cc または /crosshair copy と入力します。Riot公式のパッチ5.04で両方のコマンドが案内されています。'],
      ['/cc と /crosshair copy は違う？', 'どちらも観戦中のプレイヤーのクロスヘアを新しいプロファイルに保存するためのコマンドです。コード全文を後ろに付ける必要はありません。'],
      ['クロスヘアコードはどこに入力する？', '設定 → クロスヘアのプロファイルコードをインポートする欄です。チャットへの入力とは別の操作になります。'],
      ['コピーしたクロスヘアが見つからないときは？', 'クロスヘア設定で保存されたプロファイルを確認し、選択して名前を付けます。保存できていない場合は観戦対象と空き枠を確認し、もう一度試してください。'],
    ],
    sources: [copySource], relatedArticleKeys: ['notWorking'], relatedCollectionKeys: ['cute', 'small'],
    metaTitle: 'VALORANT クロスヘアコピー：/cc・コマンド・コード入力 | AimCodes',
    metaDescription: '味方のクロスヘアをコピーする /cc・/crosshair copy と、サイトのコードを入力する場所を解説。保存したプロファイルの確認とコピーできない場合の手順も。',
  }
  if (locale === 'ja' && key === 'notWorking') return {
    ...content,
    title: 'VALORANT クロスヘアをインポートできないときの確認手順',
    intro: 'コードが拒否される、保存できない、保存できたのに見えない。この3つを分けて確認すると、試すべき設定が絞れます。',
    summary: '全文をコピーし直し、プロファイルコードのインポート欄へ貼り付けます。保存枠も確認してください。読み込みに成功したのに見えない場合は、選択中のプロファイルと表示設定を調べます。',
    sections: [
      { title: 'コードが拒否される：文字列と入力欄を確認', paragraphs: ['コピー用ボタンから全文を取り直し、説明文・改行・余分な空白が付いていないか確認します。色の16進数入力欄やチャットではなく、プロファイルコードのインポート欄を使ってください。'], bullets: ['スクリーンショットの文字を手で写すより、コード全文をコピー。', 'AimCodesの解析ツールで読み取れても、現在のゲームでの動作を保証するものではありません。'] },
      { title: '保存できない：プロファイルの空き枠を確認', paragraphs: ['保存枠が埋まっている場合は、必要な設定を先にエクスポートして控えてから整理してください。普段の設定を失わないよう、残すプロファイルを確認します。'], bullets: [] },
      { title: '保存できたのに見えない：表示側を確認', paragraphs: ['読み込んだプロファイルが選択されているか確認し、色が背景に溶け込んでいないか、線や中心点の表示が無効になっていないかを調べます。元のコードを再インポートし、一度に複数の項目を変更しないでください。'], bullets: [] },
    ],
    faq: [
      ['VALORANTでクロスヘアをインポートできないのはなぜ？', 'まず全文がコピーされているか、正しいインポート欄を使っているか、保存枠があるかを確認してください。失敗した表示内容によって次の確認先が変わります。'],
      ['AimCodesで表示されるのにゲームで使えない？', 'サイトの解析・プレビューとゲーム内での受け付けは別です。元のコードを取り直し、ゲームのエラー表示を確認してください。サイトでの解析成功だけで現在のゲームへの互換性は保証できません。'],
      ['/cc が動かない場合も同じ手順？', '/cc は観戦中のプレイヤーをコピーするチャットコマンドです。観戦対象と保存枠を確認してください。サイトのコードはインポート欄へ貼り付けます。'],
    ],
    relatedArticleKeys: ['copy', 'invisible'],
    metaTitle: 'VALORANT クロスヘアをインポートできない？確認と対処 | AimCodes',
    metaDescription: 'クロスヘアコードの拒否・保存失敗・読み込み後に見えない問題を切り分け。全文コピー、正しい入力欄、保存枠、表示設定の順に確認できます。',
  }
  return content
}
