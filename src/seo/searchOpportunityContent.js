// Evidence and query-to-URL decisions: docs/SEO_KEYWORD_EXPANSION_2026-09-28.md.
// These additions enrich existing EN/JA pages without creating synonym routes.
const collectionUpdates = {
  en: {
    dot: {
      quickPicksTitle: 'White dot or tiny dot-style cross?',
      quickPicks: [
        { id: 'demon1', label: 'White center dot', reason: 'The listed Demon1 profile has a size-2 center dot, an outline and no inner or outer lines.' },
        { id: 'tap-dot-apex', label: 'Tiny white dot-style cross', reason: 'Tap Dot Apex combines a size-1 dot with length-1, thickness-1 inner lines. It is not a pure one-pixel dot.' },
        { id: 'small-dot-thick', label: 'Thicker white center', reason: 'Pixel combines a size-2 dot with thickness-4 inner lines. Try this when the finer center disappears.' },
      ],
      extraFaq: [
        ['How do I make a white dot crosshair?', 'Choose white as the primary color, enable Center Dot and turn off inner and outer lines for a pure point. The white-dot profile linked above is a ready-made option; test its outline on both bright and dark map scenes.'],
        ['Is a very small dot crosshair always one pixel?', 'No. A profile called a dot may also contain short inner lines. Check the code settings: Tap Dot Apex has a size-1 center dot plus lines, while the listed Demon1 profile disables both line layers.'],
      ],
    },
    small: {
      introCollectionKeys: ['small', 'dot', 'plus', 'oneTap'],
      intro: 'Compare small dot-style crosshairs, tiny open crosses and short closed crosses. Use the examples below to choose how much center space and line thickness you want before copying a code.',
      quickPicksTitle: 'Three small crosshairs with different centers',
      quickPicks: [
        { id: 'micro-gap-apex', label: 'Tiny cyan open cross', reason: 'Micro Gap Apex: inner length 1, thickness 1, offset 1; center dot off, outline on.' },
        { id: 'micro-gap-bolt', label: 'Small white cross with a gap', reason: 'Micro Gap Bolt: inner length 1, thickness 1, offset 2; center dot and outline off.' },
        { id: 'small-dot-thick', label: 'Small dot-style center', reason: 'Pixel: size-2 center dot plus length-1, thickness-4 inner lines with offset 0. More visible, but it covers more of the target.' },
      ],
      settingsTitle: 'Small crosshair settings: length, thickness and gap',
      settings: [
        'Compare Micro Gap Apex and Micro Gap Bolt above for two tiny open centers. Their code settings are shown alongside each link; color and outline also differ, so match those before judging the gap alone.',
        'For a smaller cross, shorten inner lines first. For a thinner cross, reduce thickness. Offset changes the space around the center rather than line weight.',
        'Use full opacity and compare at normal resolution. If the center disappears after a turn, try a clearer color or one step more thickness before shrinking it again.',
        'Import into a spare profile and test a distant target in the range. A tiny crosshair changes the visual reference, not weapon accuracy.',
      ],
      extraFaq: [['How do I make a small cross crosshair in VALORANT?', 'Use short inner lines with the center dot and outer lines off. Micro Gap Apex provides an actual length-1, thickness-1, offset-1 example above. Keep its outline only if the extra edge helps you find the center.']],
    },
    plus: {
      gridTitle: 'Plus crosshair codes: closed and open centers',
      quickPicksTitle: 'Compare two compact plus settings',
      quickPicks: [
        { id: 'compact-cross-apex', label: 'Closed red plus', reason: 'Compact Cross Apex uses inner length 2, thickness 3 and offset 0. Center dot, outer lines and outline are off.' },
        { id: 'compact-cross-drift', label: 'White plus with a small gap', reason: 'Compact Cross Drift uses length 2, thickness 3 and offset 1, with an outline. Match color and outline before comparing the gap.' },
      ],
      extraFaq: [['Can a plus crosshair have no gap?', 'Yes. Set inner-line offset to 0 for a closed center, as in Compact Cross Apex above. Increase offset for an opening; neither setting changes bullet accuracy.']],
    },
    cute: {
      introCollectionKeys: ['cute', 'animals', 'funny', 'pink'],
      quickPicksTitle: 'Open a cat, bunny or heart crosshair code',
      quickPicks: [
        { id: 'cat-pink', label: 'Cat / kitty crosshair', reason: 'Open the cat profile to preview its face, change the color and copy the full code.' },
        { id: 'bunny-white', label: 'Bunny crosshair', reason: 'Preview the white bunny at normal scale before copying. Its broad lines can obscure a distant target.' },
        { id: 'heart-pink', label: 'Heart crosshair', reason: 'Try the pink heart on a bright and a dark map scene, then copy the profile in your preferred color.' },
      ],
      extraFaq: [
        ['Where is the cat or kitty crosshair code?', 'Open the Cat / kitty link above, check the map preview and press Copy code. Import the complete profile in VALORANT Crosshair settings; a screenshot of the shape is not an import code.'],
        ['Can I change a pink heart crosshair to another color?', 'Yes. Choose a supported color in the profile preview before pressing Copy code. The copied profile uses that color while retaining the shape.'],
      ],
    },
    funny: {
      extraFaq: [['Are meme crosshair codes different from funny crosshair codes?', 'Meme and funny describe the same playful use here. This collection contains the joke shapes; use the cute or animal links for a particular cat, bunny or heart rather than browsing every large frame.']],
    },
  },
  ja: {
    cute: {
      introCollectionKeys: ['cute', 'animals', 'funny', 'pink'],
      quickPicksTitle: '猫・うさぎ・ハートのコードを選ぶ',
      quickPicks: [
        { id: 'cat-pink', label: '猫のクロスヘアコード', reason: '猫の顔をマップ上で確認し、色を選んでコードをコピーできます。' },
        { id: 'bunny-white', label: 'うさぎのクロスヘアコード', reason: '白いうさぎを通常倍率で確認。遠くの敵に重ねたとき、太いラインが邪魔にならないか試してください。' },
        { id: 'heart-pink', label: 'ハートのクロスヘアコード', reason: 'ピンクのハートを明暗の違うマップで比較。色を変更してからコードをコピーできます。' },
      ],
      faq: [
        ['VALORANTの猫・うさぎ・ハートのコードはどこ？', '上の形ごとのリンクを開き、プレビューのコピーボタンから取得できます。画像ではなく、設定を記録したコード全体をコピーしてください。'],
        ['かわいいクロスヘアをインポートするには？', '設定のクロスヘア画面でプロファイルコードのインポートを開き、コピーした全文を貼り付けます。普段の設定を残すため、別のプロファイルで試してください。'],
        ['ハートや猫の色を変えても形は残る？', 'AimCodesのプレビューで対応する色を選ぶと、その色を反映したコードをコピーできます。形は保たれますが、背景とのコントラストは変わるので通常倍率で確認しましょう。'],
        ['ランクでも使いやすい？', '形が大きいと遠くの敵を隠しやすくなります。射撃場で中心をすぐ見つけられるか試し、必要なら小型の設定に戻してください。武器の精度は変わりません。'],
      ],
      relatedArticleKeys: ['copy', 'notWorking', 'colors'],
      metaDescription: 'VALORANTのかわいいクロスヘアを比較。猫・うさぎ・ハートの個別コードへ直接進み、マップでプレビューして色を変更し、コピーできます。',
    },
    funny: {
      introCollectionKeys: ['funny', 'cute', 'animals', 'small'],
      gridTitle: 'VALORANT ネタクロスヘアのコード一覧',
      settings: ['カードのコード欄を開くと全文を確認できます。使う形を選び、コピーボタンからコードを取得してください。', '設定 → クロスヘアからプロファイルコードをインポート。普段のランク用設定は別のプロファイルに残しましょう。', '猫・うさぎ・ハートが欲しい場合は、かわいいクロスヘアのページへ。ここではアーケード風やグリッチ風、大きなフレームも比較できます。', '拡大表示だけで決めず、通常倍率と明暗の違うマップで中心の見やすさを確認してください。'],
      faq: [
        ['ネタクロスヘアのコードはコピーできる？', 'はい。各カードからコードをコピーできます。コード欄では全文を確認でき、ゲームのクロスヘア設定にインポートして試せます。'],
        ['面白い形を使うために画像やMODが必要？', '掲載しているのは通常のクロスヘア設定を表すプロファイルコードです。形の画像を取り込んだり、MODを入れたりする必要はありません。'],
        ['うさぎや猫だけを探すには？', '関連する「かわいいクロスヘア」から形別のコードへ進めます。大きなネタ形より小さめの見た目を探すときも、まずそこで比べてください。'],
        ['コードを入れるとエラーになる場合は？', '全文をコピーし直し、説明文や余分な空白を除いてください。色の入力欄ではなくプロファイルのインポート欄を使い、保存枠も確認します。詳しい切り分けは関連ガイドで説明しています。'],
      ],
      relatedArticleKeys: ['notWorking', 'copy'],
      metaDescription: 'VALORANTの面白いネタクロスヘア100種類をプレビュー。カードでコードを確認してコピーし、別プロファイルへインポート。猫やうさぎの一覧も案内します。',
    },
  },
}

export function enrichCollectionCopy(locale, key, content) {
  const update = collectionUpdates[locale]?.[key]
  if (!update) return content
  const { extraFaq = [], ...fields } = update
  return { ...content, ...fields, faq: [...(fields.faq || content.faq), ...extraFaq] }
}

