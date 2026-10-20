// Rebuild derived media only; preserve official originals and unselected candidates.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/skye-2026-10-20`
const out = `${root}/public/images/agents/skye`
const processed = `${root}/data_processed/skye-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['heal', 'tiger', 'hawk', 'ultimate']
for (const key of keys) {
  await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
  execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
  execFileSync('ffmpeg', ['-y', '-ss', '0.5', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
  await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
console.log('Official Skye skill media prepared')
// Official reveal trailer, observed video rectangle x16/y68, 822x462 in Ego Lite.
for (const sec of [29, 32]) await sharp(`${raw}/trailer-${sec}.png`).extract({ left: 16, top: 68, width: 822, height: 462 }).png().toFile(`${processed}/frame-${sec}.png`)
// Enlarge the face and upper body for the hero; leave the top of the head intact.
const portrait = await sharp(`${processed}/frame-29.png`).extract({ left: 230, top: 0, width: 400, height: 330 }).png().toBuffer()
await sharp(portrait).resize(1920, 1080, { fit: 'cover', position: 'top' }).webp({ quality: 89 }).toFile(`${out}/hero.webp`)
await sharp(portrait).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 88 }).toFile(`${out}/og.jpg`)
await sharp(portrait).resize(960, 640, { fit: 'cover', position: 'top' }).webp({ quality: 89 }).toFile(`${out}/gallery/portrait.webp`)
await sharp(`${processed}/frame-32.png`).extract({ left: 180, top: 0, width: 610, height: 462 }).resize(960, 640, { fit: 'cover', position: 'top' }).webp({ quality: 89 }).toFile(`${out}/gallery/companion.webp`)
