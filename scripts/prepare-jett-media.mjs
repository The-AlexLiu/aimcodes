// Original downloads and screenshots remain read-only; regenerate derived assets only.
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/jett-2026-10-19`
const out = `${root}/public/images/agents/jett`
const processed = `${root}/data_processed/jett-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['cloudburst', 'updraft', 'tailwind', 'ultimate', 'drift']
for (const key of keys) {
  await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
  execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.${key === 'drift' ? 'webm' : 'mp4'}`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
  execFileSync('ffmpeg', ['-y', '-ss', '2', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}-poster.png`], { stdio: 'pipe' })
  await sharp(`${processed}/${key}-poster.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
const list = keys.map(key => `file '${out}/${key}.mp4'`).join('\n')
await writeFile(`${processed}/concat.txt`, list)
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
console.log('Prepared five official Jett ability videos and icons')
// Captured from Riot's official DUELISTS video. Crop removes player controls and source black bars.
const crop = { left: 16, top: 127, width: 822, height: 344 }
await sharp(`${raw}/duelists-60.png`).extract(crop).resize(1920,1080,{fit:'cover'}).webp({quality:88}).toFile(`${out}/hero.webp`)
await sharp(`${raw}/duelists-60.png`).extract(crop).resize(1200,630,{fit:'cover'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
for (const [seconds, name] of [[28,'duelists-knife'],['final-57','duelists-closeup']]) {
  await sharp(`${raw}/duelists-${seconds}.png`).extract(crop).resize(1280,536).webp({quality:88}).toFile(`${out}/gallery/${name}.webp`)
}
