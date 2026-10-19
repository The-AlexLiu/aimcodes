const copy = {
  en: { title: 'Explore free crosshairs', body: 'Preview a crosshair, try a different style, and copy the code.', browse: 'Browse crosshairs' },
  'zh-CN': { title: '挑一个准星试试', body: '预览不同样式，选好后直接复制代码。', browse: '浏览免费准星' },
  ja: { title: '無料のクロスヘアを探す', body: '見た目を確認して、気に入ったコードをコピー。', browse: 'クロスヘアを見る' },
  es: { title: 'Explora miras gratis', body: 'Prueba diferentes estilos y copia el código que te guste.', browse: 'Ver miras gratis' },
  'pt-BR': { title: 'Explore miras grátis', body: 'Veja diferentes estilos e copie o código que você gostar.', browse: 'Ver miras grátis' },
}
export const freeSiteCopy = locale => copy[locale] || copy.en
