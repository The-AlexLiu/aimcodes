// Lightweight grid headings keep collection editorial content out of the app entry.
const funnyTitles = Object.freeze({
  "en": "Funny VALORANT crosshair codes to preview",
  "es": "Miras para probar",
  "pt-BR": "Miras para testar",
  "zh-CN": "直接预览这些准星",
  "ja": "VALORANT ネタクロスヘアのコード一覧"
})

export function funnyGridTitle(locale) {
  return funnyTitles[locale] || funnyTitles.en
}
