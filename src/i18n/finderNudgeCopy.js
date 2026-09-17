const finderNudgeCopy = {
  en: {
    eyebrow: 'FIND YOUR FIT',
    title: 'Got a code. Want a setup that fits?',
    body: 'Run 3 quick rounds to see your aim style before choosing your next crosshair.',
    meta: '3 rounds · about 10 sec · no sign-in',
    cta: 'Start free test',
    mobileLabel: 'Find your fit',
    close: 'Close test hint',
  },
  'zh-CN': {
    eyebrow: '帮你选准星',
    title: '代码已复制，要不要看看哪套更适合你？',
    body: '做完 3 轮反应测试，先了解自己的瞄准风格，再选下一款准星。',
    meta: '3 轮 · 约 10 秒 · 不用登录',
    cta: '开始免费测试',
    mobileLabel: '测测反应',
    close: '关闭测试提示',
  },
  ja: {
    eyebrow: '自分に合う照準を探す',
    title: 'コードはコピー済み。次は自分向けのセットを探す？',
    body: '3ラウンドの反応テストで、自分のエイム傾向を見てから次のクロスヘアを選べます。',
    meta: '3 ラウンド · 約 10 秒 · 登録不要',
    cta: '無料でテストする',
    mobileLabel: '反応を測る',
    close: 'テストの案内を閉じる',
  },
  es: {
    eyebrow: 'ENCUENTRA TU ESTILO',
    title: '¿Ya copiaste un código? Encuentra una mira que encaje.',
    body: 'Haz 3 rondas rápidas para ver tu estilo de puntería antes de elegir la siguiente mira.',
    meta: '3 rondas · unos 10 s · sin registro',
    cta: 'Hacer prueba gratis',
    mobileLabel: 'Encuentra tu estilo',
    close: 'Cerrar sugerencia de prueba',
  },
  'pt-BR': {
    eyebrow: 'ENCONTRE SEU ESTILO',
    title: 'Já copiou um código? Encontre uma mira que combine.',
    body: 'Faça 3 rodadas rápidas para ver seu estilo de mira antes de escolher a próxima.',
    meta: '3 rodadas · cerca de 10 s · sem cadastro',
    cta: 'Fazer teste grátis',
    mobileLabel: 'Encontrar minha mira',
    close: 'Fechar sugestão de teste',
  },
}

export function getFinderNudgeCopy(locale) {
  return finderNudgeCopy[locale] || finderNudgeCopy.en
}
