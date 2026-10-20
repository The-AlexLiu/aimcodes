// Only derived media is rewritten. Original official downloads and screenshots remain in data_raw.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/waylay-2026-10-20`
const out = `${root}/public/images/agents/waylay`
const processed = `${root}/data_processed/waylay-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['saturate', 'speed', 'refract', 'ultimate']
for (const key of keys) {
  await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
  execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
  execFileSync('ffmpeg', ['-y', '-ss', '0.5', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
  await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
console.log('Official Waylay skill media prepared')
// Observed animation image: x16/y125, 822x348; exclude letterbox and player overlays.
for (const sec of [76, 83, 84, 86]) {
  await sharp(`${raw}/watch-${sec}.png`).extract({ left: 30, top: 130, width: 780, height: 310 }).png().toFile(`${processed}/frame-${sec}.png`)
}
await sharp(`${processed}/frame-86.png`).resize(1920, 1080, { fit: 'cover', position: 'center' }).webp({ quality: 89 }).toFile(`${out}/hero.webp`)
await sharp(`${processed}/frame-86.png`).resize(1200, 630, { fit: 'cover', position: 'center' }).jpeg({ quality: 88 }).toFile(`${out}/og.jpg`)
for (const [sec, key, position] of [[83, 'turn', 'center'], [76, 'light', 'center'], [84, 'ready', 'center']]) {
  await sharp(`${processed}/frame-${sec}.png`).resize(960, 755, { fit: 'cover', position }).webp({ quality: 89 }).toFile(`${out}/gallery/${key}.webp`)
}
