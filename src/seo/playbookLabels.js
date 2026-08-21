const labels = Object.freeze({
  en: 'VALORANT map strategy board',
  es: 'Pizarra táctica de VALORANT',
  'pt-BR': 'Prancheta tática do VALORANT',
  'zh-CN': '无畏契约地图战术板',
  ja: 'VALORANTマップ作戦ボード',
})

export function playbookLabel(locale) {
  return labels[locale] || labels.en
}
