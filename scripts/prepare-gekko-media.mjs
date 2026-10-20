// Preserve official originals in data_raw; write derived public media only.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/gekko-2026-10-20`
const out = `${root}/public/images/agents/gekko`
const processed = `${root}/data_processed/gekko-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['mosh', 'wingman', 'dizzy', 'ultimate']
for (const key of keys) {
 await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
 execFileSync('ffmpeg', ['-y', '-ss', '0.5', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
 await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
// Official trailer iYFh_XAXSPk; browser capture. Exclude controls and info icon.
const face = await sharp(`${raw}/clean-90.png`).extract({ left: 25, top: 93, width: 1090, height: 454 }).png().toBuffer()
await sharp(face).resize(1920,1080,{fit:'cover',position:'left'}).webp({quality:89}).toFile(`${out}/hero.webp`)
await sharp(face).resize(1200,630,{fit:'cover',position:'left'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
for (const [sec, key] of [[120,'buddies'],[160,'reyna']]) {
 await sharp(`${raw}/clean-${sec}.png`).extract({left:25,top:93,width:1090,height:454}).resize(1200,675,{fit:'cover',position:'center'}).webp({quality:89}).toFile(`${out}/gallery/${key}.webp`)
}
console.log('Gekko official derived media prepared')
