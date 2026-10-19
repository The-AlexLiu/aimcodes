// Reviewed against the official 42.9s VALORANT ability preview.
export const HUSH_ABILITY_SOURCE = 'https://www.youtube.com/watch?v=XN_HF9KVT0M'
export const HUSH_ABILITY_MEDIA = Object.freeze([
  { key: 'telekinesis', start: 4, duration: 5.5 },
  { key: 'flow', start: 28.6, duration: 5.8 },
  { key: 'flashbulb', start: 23.5, duration: 4 },
  { key: 'displacement', start: 11.1, duration: 7.9 },
  { key: 'suspension', start: 35.1, duration: 7.6 },
].map(clip => Object.freeze({
  ...clip,
  src: `/images/agents/hush/abilities/${clip.key}.mp4`,
  poster: `/images/agents/hush/abilities/${clip.key}.webp`,
  icon: `/images/agents/hush/icons/${clip.key}.webp`,
  sourceUrl: `${HUSH_ABILITY_SOURCE}&t=${Math.floor(clip.start)}s`,
})))

const clipLabels = Object.freeze({
  en: { title: 'Ability demonstration', credit: 'Official gameplay · silent clip', source: 'Riot Games original' },
  'zh-CN': { title: '技能演示', credit: '官方实机 · 静音片段', source: 'Riot Games 原视频' },
  ja: { title: 'スキル映像', credit: '公式プレイ映像 · 音声なし', source: 'Riot Gamesの元動画' },
  es: { title: 'Demostración de habilidad', credit: 'Jugabilidad oficial · sin sonido', source: 'Original de Riot Games' },
  'pt-BR': { title: 'Demonstração da habilidade', credit: 'Gameplay oficial · sem som', source: 'Original da Riot Games' },
})
export function hushClipCopy(locale) { return clipLabels[locale] || clipLabels.en }


export const HUSH_GALLERY = Object.freeze([
  { key: 'cinematic-combat', width: 670, height: 376 },
  { key: 'cinematic-dinner', width: 670, height: 376 },
  { key: 'cinematic-reveal', width: 670, height: 376 },
].map(image => Object.freeze({ ...image, src: `/images/agents/hush/gallery/${image.key}.webp` })))
