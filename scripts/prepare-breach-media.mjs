// Rebuild derived media only; preserve official originals and unselected candidates.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/breach-2026-10-20`
const out = `${root}/public/images/agents/breach`
const processed = `${root}/data_processed/breach-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['aftershock', 'flash', 'fault', 'ultimate']
for (const key of keys) {
  await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
  execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
  execFileSync('ffmpeg', ['-y', '-ss', '0.5', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
  await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
console.log('Official Breach skill media prepared')
// INCURSIONS 83.8s: observed 1200x828 browser capture, image y147..653.
const portrait = await sharp(`${raw}/approved-83.8.png`).extract({ left: 300, top: 147, width: 900, height: 506 }).png().toBuffer()
await sharp(portrait).resize(1920, 1080, { fit: 'cover', position: 'center' }).webp({ quality: 89 }).toFile(`${out}/hero.webp`)
await sharp(portrait).resize(1200, 630, { fit: 'cover', position: 'center' }).jpeg({ quality: 88 }).toFile(`${out}/og.jpg`)
await sharp(portrait).resize(960, 755, { fit: 'cover', position: 'right top' }).webp({ quality: 89 }).toFile(`${out}/gallery/portrait.webp`)
// WHY WE FIGHT BACK: 43s workshop action and 136s face close-up.
// Observed screenshot content x0..1200, y147..653, with no player overlays.
await sharp(`${raw}/fightback-136.png`).extract({ left: 360, top: 147, width: 840, height: 506 }).resize(960, 755, { fit: 'cover', position: 'right top' }).webp({ quality: 89 }).toFile(`${out}/gallery/portrait.webp`)
await sharp(`${raw}/fightback-43.png`).extract({ left: 215, top: 147, width: 680, height: 506 }).resize(960, 755, { fit: 'cover', position: 'left top' }).webp({ quality: 89 }).toFile(`${out}/gallery/arm.webp`)
