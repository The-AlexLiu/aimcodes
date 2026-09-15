const finderNudgeCopy = {
  en: {
    eyebrow: 'FIND YOUR FIT',
    title: 'Not sure which crosshair feels right?',
    body: 'Run a quick reaction check, then get a recommendation built around your pace.',
    meta: '3 rounds · about 10 sec · no sign-in',
    cta: 'Start free test',
    mobileLabel: 'Find your fit',
    close: 'Close test hint',
  },
  'zh-CN': {
    eyebrow: '帮你选准星',
    title: '不确定哪种准星更顺手？',
    body: '做一轮反应测试，再按你的节奏推荐更适合的准星。',
    meta: '3 轮 · 约 10 秒 · 不用登录',
    cta: '开始免费测试',
    mobileLabel: '测测反应',
    close: '关闭测试提示',
  },
  ja: {
    eyebrow: '自分に合う照準を探す',
    title: 'どのクロスヘアが合うか迷う？',
    body: '短い反応テストで、あなたのペースに合う照準を見つけましょう。',
    meta: '3 ラウンド · 約 10 秒 · 登録不要',
    cta: '無料でテストする',
    mobileLabel: '反応を測る',
    close: 'テストの案内を閉じる',
  },
  es: {
    eyebrow: 'ENCUENTRA TU ESTILO',
    title: '¿No sabes qué mira se siente mejor?',
    body: 'Haz una prueba rápida de reacción y recibe una recomendación según tu ritmo.',
    meta: '3 rondas · unos 10 s · sin registro',
    cta: 'Hacer prueba gratis',
    mobileLabel: 'Encuentra tu estilo',
    close: 'Cerrar sugerencia de prueba',
  },
  'pt-BR': {
    eyebrow: 'ENCONTRE SEU ESTILO',
    title: 'Não sabe qual mira combina com você?',
    body: 'Faça um teste rápido de reação e receba uma recomendação para o seu ritmo.',
    meta: '3 rodadas · cerca de 10 s · sem cadastro',
    cta: 'Fazer teste grátis',
    mobileLabel: 'Encontrar minha mira',
    close: 'Fechar sugestão de teste',
  },
}

export function getFinderNudgeCopy(locale) {
  return finderNudgeCopy[locale] || finderNudgeCopy.en
}
