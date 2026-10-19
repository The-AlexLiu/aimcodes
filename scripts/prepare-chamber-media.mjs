// Rebuild derived assets only. Official originals and browser captures stay in data_raw.
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/chamber-2026-10-19`
const out = `${root}/public/images/agents/chamber`
const processed = `${root}/data_processed/chamber-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const portrait = { left: 850, top: 0, width: 2800, height: 1575 }
await sharp(`${raw}/official-banner.png`).extract(portrait).resize(1920, 1080).webp({ quality: 88 }).toFile(`${out}/hero.webp`)
await sharp(`${raw}/official-banner.png`).extract({ left: 2200, top: 0, width: 1470, height: 1470 }).resize(1080, 1080).webp({ quality: 88 }).toFile(`${out}/hero-mobile.webp`)
await sharp(`${out}/hero.webp`).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 87 }).toFile(`${out}/og.jpg`)
const keys = ['trademark', 'headhunter', 'rendezvous', 'ultimate']
for (const key of keys) {
  await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
  execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
  execFileSync('ffmpeg', ['-y', '-ss', '3', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}-poster.png`], { stdio: 'pipe' })
  await sharp(`${processed}/${key}-poster.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
for (const [file, name] of [['frame-35.png', 'accord-closeup'], ['frame-77.png', 'accord-watch'], ['frame-59.png', 'accord-aim']]) {
  await sharp(`${raw}/${file}`).resize(1280, 720, { fit: 'cover' }).webp({ quality: 88 }).toFile(`${out}/gallery/${name}.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(key => `file '${out}/${key}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
console.log('Prepared official Chamber assets')
