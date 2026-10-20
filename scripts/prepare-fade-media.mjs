// Derived files only. Official originals and browser captures remain in data_raw.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/fade-2026-10-20`
const out = `${root}/public/images/agents/fade`
const processed = `${root}/data_processed/fade-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['prowler', 'seize', 'haunt', 'ultimate']
for (const key of keys) {
 await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
 execFileSync('ffmpeg', ['-y', '-ss', '0.5', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
 await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
// Official trailer artwork; crop and focus are checked in the built page.
await sharp(`${raw}/trailer-art.jpg`).webp({ quality: 90 }).toFile(`${out}/hero.webp`)
await sharp(`${raw}/trailer-art.jpg`).resize(1200,630,{fit:'cover',position:'right'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
console.log('Fade skill media and hero prepared')
// Browser captures of the official trailer: 87.0s portrait/action and 89.0s nightmare.
// Theatre player visible rectangle x0/y56/1200x510; remove all browser/player UI.
await sharp(`${raw}/frame-86-b.png`).extract({left:690,top:166,width:430,height:360}).resize(960,540,{fit:'cover',position:'top'}).webp({quality:90}).toFile(`${out}/gallery/portrait.webp`)
await sharp(`${raw}/frame-88-b.png`).extract({left:300,top:130,width:850,height:430}).resize(960,540,{fit:'cover',position:'right'}).webp({quality:90}).toFile(`${out}/gallery/nightmare.webp`)
