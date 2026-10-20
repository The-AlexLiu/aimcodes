// Retain Riot originals in data_raw; only derived media goes to public.
import sharp from 'sharp'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const raw = `${root}/data_raw/killjoy-2026-10-20`
const out = `${root}/public/images/agents/killjoy`
const processed = `${root}/data_processed/killjoy-media`
await mkdir(`${out}/gallery`, { recursive: true })
await mkdir(processed, { recursive: true })
const keys = ['nanoswarm', 'alarmbot', 'turret', 'ultimate']
for (const key of keys) {
 await sharp(`${raw}/${key}.png`).resize(96).webp({ quality: 90 }).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg', ['-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:540,setsar=1,fps=30', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${out}/${key}.mp4`], { stdio: 'pipe' })
 execFileSync('ffmpeg', ['-y', '-ss', '0.5', '-i', `${out}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}.png`], { stdio: 'pipe' })
 await sharp(`${processed}/${key}.png`).webp({ quality: 84 }).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(k => `file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${out}/abilities-overview.mp4`], { stdio: 'pipe' })
// The official WARM UP watch page, captured in Ego Lite. Player chrome hidden only for capture.
// Actual picture bounds x0/y56/w1200/h503; crop excludes the other character for the hero.
const heroCrop = { left: 608, top: 56, width: 505, height: 420 }
const face = await sharp(`${raw}/clean-130.png`).extract(heroCrop).png().toBuffer()
await sharp(face).resize(1920,1080,{fit:'cover',position:'top'}).webp({quality:89}).toFile(`${out}/hero.webp`)
await sharp(face).resize(1200,630,{fit:'cover',position:'top'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
for (const [sec,key] of [[130,'watching'],[50,'workshop']]) {
 await sharp(`${raw}/clean-${sec}.png`).extract({left:0,top:56,width:1200,height:503}).resize(1200,675,{fit:'cover',position:'center'}).webp({quality:89}).toFile(`${out}/gallery/${key}.webp`)
}
const official = JSON.parse(await readFile(`${raw}/en-us.json`, 'utf8')).props.pageProps.page.blades[2].groups
await writeFile(`${out}/sources.json`, JSON.stringify({ retrievedAt:'2026-10-20', official:'https://playvalorant.com/en-us/agents/killjoy/', china:'https://api.val.qq.com/go/agame/graphql/graphiQL (agent 12)', abilities: keys.map((key,i)=>({key,icon:official[[2,0,1,3][i]].thumbnail.url,video:official[[2,0,1,3][i]].content.media.sources[0].src})), cinematic:'https://www.youtube.com/watch?v=OyLHi34Qzv4',channel:'VALORANT (verified)',frames:{hero:{seconds:130,crop:heroCrop},watching:{seconds:130,crop:{left:0,top:56,width:1200,height:503}},workshop:{seconds:50,crop:{left:0,top:56,width:1200,height:503}}},derived:{hero:'1920x1080 WebP',og:'1200x630 JPEG',gallery:'1200x675 WebP',videos:'960x540 H264 muted 30fps'},note:'Riot gameplay demos are illustrative legacy footage. Controls follow patch 12.04; no old cone angle or timings asserted.'},null,2)+'\n')
console.log('Killjoy official media prepared')
