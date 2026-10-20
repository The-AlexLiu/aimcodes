// Derived files only. Official originals and browser captures remain in data_raw.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/kayo-2026-10-20`
const out = `${root}/public/images/agents/kayo`
const processed = `${root}/data_processed/kayo-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['frag', 'flash', 'zero', 'ultimate']
for (const key of keys) {
 await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
 execFileSync('ffmpeg', ['-y', '-ss', '0.5', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
 await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
console.log('KAY/O official skill media prepared')
// Official reveal, eU1l7eBy2_Y, 116s and 112s. Browser video rectangle x16/y68/1040x585.
const face = await sharp(`${raw}/frame-116.png`).extract({ left: 16, top: 68, width: 1040, height: 585 }).png().toBuffer()
await sharp(face).resize(1920, 1080).webp({ quality: 89 }).toFile(`${out}/hero.webp`)
await sharp(face).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 88 }).toFile(`${out}/og.jpg`)
// Crop the combat shot toward KAY/O, removing distant scenery without inventing detail.
await sharp(`${raw}/frame-112.png`).extract({ left: 396, top: 68, width: 660, height: 585 }).resize(960, 755, { fit: 'cover', position: 'right' }).webp({ quality: 89 }).toFile(`${out}/gallery/battle.webp`)
