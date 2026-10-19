import sharp from 'sharp'
import { mkdir, writeFile, stat } from 'node:fs/promises'

// Riot artwork / cinematic stills republished by Game*Spark / FISTBUMP.
// Keep the complete frame and existing watermark; never upscale or crop it.
const images = [
  { key: 'cinematic-combat', input: 'cinematic-02.png', source: 'https://www.gamespark.jp/imgs/zoom/1208110.png' },
  { key: 'cinematic-dinner', input: 'cinematic-10.png', source: 'https://www.gamespark.jp/imgs/zoom/1208118.png' },
  { key: 'cinematic-reveal', input: 'cinematic-06.png', source: 'https://www.gamespark.jp/imgs/zoom/1208114.png' },
]
await mkdir('public/images/agents/hush/gallery', { recursive: true })
const records = []
for (const item of images) {
  const src = `/images/agents/hush/gallery/${item.key}.webp`
  const info = await sharp(`data_raw/hush-2026-10-19/${item.input}`)
    .webp({ quality: 86 }).toFile(`public${src}`)
  records.push({ ...item, src, width: info.width, height: info.height, bytes: (await stat(`public${src}`)).size })
}
await writeFile('data_raw/hush-2026-10-19/gallery-provenance.json', JSON.stringify({
  publication: 'https://www.gamespark.jp/article/2026/10/18/173758.html',
  copyright: 'Riot Games; publication watermark retained', records,
}, null, 2))
console.log(records)
