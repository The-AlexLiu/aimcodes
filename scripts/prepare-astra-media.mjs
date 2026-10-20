// Only derived outputs are replaced. Official originals remain in data_raw.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/astra-2026-10-20`
const out = `${root}/public/images/agents/astra`
const processed = `${root}/data_processed/astra-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['form', 'gravity', 'nova', 'nebula', 'ultimate']
for (const key of keys) {
 await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.source`, '-vf', 'scale=960:540,fps=30', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
 execFileSync('ffmpeg', ['-y', '-ss', '1', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
 await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
// Official reveal -ylVnuPWlJM, 49s, 13s and 10s; browser video rectangle 14/56/1172/659.
const hero = await sharp(`${raw}/clean-49.png`).extract({ left: 14, top: 56, width: 1172, height: 659 }).png().toBuffer()
await sharp(hero).resize(1920,1080).webp({quality:89}).toFile(`${out}/hero.webp`)
await sharp(hero).resize(1200,630,{fit:'cover'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
await sharp(`${raw}/shot-13.png`).extract({left:14,top:56,width:1172,height:659}).resize(960,640,{fit:'cover'}).webp({quality:89}).toFile(`${out}/gallery/portrait.webp`)
await sharp(`${raw}/clean-10.png`).extract({left:14,top:56,width:1172,height:659}).resize(960,640,{fit:'cover'}).webp({quality:89}).toFile(`${out}/gallery/astral.webp`)
console.log('Astra: five official demonstrations and cinematic crops prepared')
