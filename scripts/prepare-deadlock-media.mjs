// Retain Riot originals in data_raw; only derived media goes to public.
import sharp from 'sharp'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/deadlock-2026-10-20`
const out = `${root}/public/images/agents/deadlock`
const processed = `${root}/data_processed/deadlock-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['barrier', 'sensor', 'gravnet', 'ultimate']
for (const key of keys) {
 await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:540,setsar=1,fps=30', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
 execFileSync('ffmpeg', ['-y', '-ss', '0.5', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
 await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
// The official UNMADE watch page, captured in Ego Lite. Player chrome hidden only for capture.
// Actual picture bounds x136/y140/w1228/h523; crop excludes the other character for the hero.
const heroCrop = { left: 610, top: 140, width: 720, height: 523 }
const face = await sharp(`${raw}/clean-110.png`).extract(heroCrop).png().toBuffer()
await sharp(face).resize(1920,1080,{fit:'cover',position:'top'}).webp({quality:89}).toFile(`${out}/hero.webp`)
await sharp(face).resize(1200,630,{fit:'cover',position:'top'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
for (const [sec,key] of [[110,'corridor'],[230,'aiming']]) {
 await sharp(`${raw}/clean-${sec}.png`).extract({left:136,top:140,width:1228,height:523}).resize(1200,675,{fit:'cover',position:'center'}).webp({quality:89}).toFile(`${out}/gallery/${key}.webp`)
}
const official = JSON.parse(await readFile(`${raw}/en-us.json`, 'utf8')).props.pageProps.page.blades[2].groups
await writeFile(`${out}/sources.json`, JSON.stringify({ retrievedAt:'2026-10-20', official:'https://playvalorant.com/en-us/agents/deadlock/', china:'https://api.val.qq.com/go/agame/graphql/graphiQL (agent 22)', abilities: keys.map((key,i)=>({key,icon:official[[1,0,2,3][i]].thumbnail.url,video:official[[1,0,2,3][i]].content.media.sources[0].src})), cinematic:'https://www.youtube.com/watch?v=sUoSPryMZr0',channel:'VALORANT (verified)',frames:{hero:{seconds:110,crop:heroCrop},corridor:{seconds:110,crop:{left:136,top:140,width:1228,height:523}},aiming:{seconds:230,crop:{left:136,top:140,width:1228,height:523}}},derived:{hero:'1920x1080 WebP',og:'1200x630 JPEG',gallery:'1200x675 WebP',videos:'960x540 H264 muted 30fps'},note:'Riot gameplay demos are illustrative legacy footage. Bindings follow patch 10.04 and current China official data: C Barrier, Q Sensor, E GravNet, X Annihilation. No legacy HUD values asserted.'},null,2)+'\n')
console.log('Deadlock official media prepared')
