// Preserve official originals in data_raw; write derived public media only.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/clove-2026-10-20`
const out = `${root}/public/images/agents/clove`
const processed = `${root}/data_processed/clove-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['pick-me-up', 'meddle', 'ruse', 'ultimate']
for (const key of keys) {
 await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
 execFileSync('ffmpeg', ['-y', '-ss', '0.5', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
 await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
// Official 2 WORLDS trailer QL0LUaxWUOI, captured in Ego Lite on 2026-10-20.
// Only the video picture: no player controls, channel information or other page content.
const crop = { left: 0, top: 90, width: 1360, height: 475 }
const face = await sharp(`${raw}/frame-77.png`).extract(crop).png().toBuffer()
await sharp(face).resize(1920,1080,{fit:'cover',position:'center'}).webp({quality:89}).toFile(`${out}/hero.webp`)
await sharp(face).resize(1200,630,{fit:'cover',position:'center'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
for (const [sec,key] of [[60,'spectral'],[91,'return']]) {
 await sharp(`${raw}/frame-${sec}.png`).extract(crop).resize(1200,675,{fit:'cover',position:'center'}).webp({quality:89}).toFile(`${out}/gallery/${key}.webp`)
}
console.log('Clove official derived media prepared')
