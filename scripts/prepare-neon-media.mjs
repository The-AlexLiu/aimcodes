// Rebuild derived files only. Original Riot files and browser captures stay in data_raw.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('..',import.meta.url))
const raw=`${root}/data_raw/neon-2026-10-20`, out=`${root}/public/images/agents/neon`, processed=`${root}/data_processed/neon-media`
await mkdir(`${out}/gallery`,{recursive:true});await mkdir(processed,{recursive:true})
const keys=['lane','relay','gear','ultimate']
for(const key of keys){
 await sharp(`${raw}/${key}.png`).resize(96).webp({quality:90}).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg',['-y','-i',`${raw}/${key}.mp4`,'-vf','scale=960:-2','-c:v','libx264','-crf','25','-preset','fast','-an','-movflags','+faststart',`${out}/${key}.mp4`],{stdio:'pipe'})
 execFileSync('ffmpeg',['-y','-ss','0.5','-i',`${out}/${key}.mp4`,'-frames:v','1',`${processed}/${key}.png`],{stdio:'pipe'})
 await sharp(`${processed}/${key}.png`).webp({quality:84}).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`,keys.map(k=>`file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg',['-y','-f','concat','-safe','0','-i',`${processed}/concat.txt`,'-c','copy','-movflags','+faststart',`${out}/abilities-overview.mp4`],{stdio:'pipe'})
// Crop the observed video rectangle; remove top-right info card and bottom controls.
for(const sec of [26,34,40,48,146])await sharp(`${raw}/watch-${sec}.png`).extract({left:30,top:85,width:780,height:390}).png().toFile(`${processed}/frame-${sec}.png`)
await sharp(`${processed}/frame-34.png`).resize(1920,1080,{fit:'cover',position:'right top'}).webp({quality:88}).toFile(`${out}/hero.webp`)
await sharp(`${processed}/frame-48.png`).resize(1200,630,{fit:'cover',position:'top'}).jpeg({quality:87}).toFile(`${out}/og.jpg`)
for(const [sec,key] of [[34,'room'],[48,'hair'],[40,'music']])await (key==='music' ? sharp(`${processed}/frame-${sec}.png`).extract({left:330,top:65,width:400,height:290}) : sharp(`${processed}/frame-${sec}.png`)).resize(960,755,{fit:'cover',position:'right top'}).webp({quality:88}).toFile(`${out}/gallery/${key}.webp`)
console.log('Neon derived media prepared')
