// Keep Riot originals in data_raw; regenerate only the public derivatives.
import sharp from 'sharp'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/veto-2026-10-20`
const out = `${root}/public/images/agents/veto`
const processed = `${root}/data_processed/veto-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['crosscut', 'chokehold', 'interceptor', 'evolution']
for (const key of keys) {
 await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:540,setsar=1,fps=30', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
 execFileSync('ffmpeg', ['-y', '-ss', '2', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
 await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
// Frames captured from the official trailer in Ego Lite, after visual selection.
const frameRecords = JSON.parse(await readFile(`${raw}/frames.json`, 'utf8'))
for (const frame of frameRecords) {
 const picture = await sharp(`${raw}/${frame.file}`).extract(frame.crop).png().toBuffer()
 if (frame.key === 'hero') {
  await sharp(picture).resize(1920,1080,{fit:'cover',position:'center'}).webp({quality:89}).toFile(`${out}/hero.webp`)
  await sharp(picture).resize(1200,630,{fit:'cover',position:'center'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
 } else await sharp(picture).resize(1200,675,{fit:'cover',position:'center'}).webp({quality:89}).toFile(`${out}/gallery/${frame.key}.webp`)
}
const official = JSON.parse(await readFile(`${raw}/en-us.json`, 'utf8')).props.pageProps.page.blades[2].groups
await writeFile(`${out}/sources.json`, JSON.stringify({retrievedAt:'2026-10-20',official:'https://playvalorant.com/en-us/agents/veto/',china:'https://api.val.qq.com/go/agame/graphql/graphiQL (agent 28)',abilities:keys.map((key,i)=>({key,icon:official[[1,0,2,3][i]].thumbnail.url,video:official[[1,0,2,3][i]].content.media.sources[0].src})),cinematic:'https://www.youtube.com/watch?v=2FLY-gn-hGQ',channel:'VALORANT (verified)',frames:frameRecords,derived:{hero:'1920x1080 WebP',og:'1200x630 JPEG',gallery:'1200x675 WebP',videos:'960x540 H264 muted 30fps'},mechanics:'Bindings C Crosscut, Q Chokehold, E Interceptor, X Evolution follow official international gameplay HUD. China API image filenames place Q/E differently and are not used as binding evidence. Official clips illustrate skills, not current numeric balance.'},null,2)+'\n')
console.log('Veto official media prepared')
