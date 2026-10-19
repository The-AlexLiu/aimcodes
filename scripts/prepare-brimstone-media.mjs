// Read preserved official originals; regenerate derived public assets only.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/brimstone-2026-10-19`
const out = `${root}/public/images/agents/brimstone`
const processed = `${root}/data_processed/brimstone-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['stim', 'incendiary', 'smoke', 'ultimate']
for (const key of keys) {
  await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
  execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
  execFileSync('ffmpeg', ['-y', '-ss', '3', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}-poster.png`], { stdio: 'pipe' })
  await sharp(`${processed}/${key}-poster.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(key => `file '${out}/${key}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
console.log('Prepared Brimstone official ability media')
// Official L’Accord trailer, browser frames captured without controls/subtitles.
await sharp(`${raw}/accord-72.png`).resize(1920,1080).webp({quality:88}).toFile(`${out}/hero.webp`)
await sharp(`${raw}/accord-72.png`).resize(1200,630,{fit:'cover'}).jpeg({quality:87}).toFile(`${out}/og.jpg`)
for (const [seconds,key] of [[69,'cover'],[71,'closeup']]) {
  await sharp(`${raw}/accord-${seconds}.png`).resize(1280,720).webp({quality:88}).toFile(`${out}/gallery/${key}.webp`)
}
