// Derived media only; official originals stay in data_raw.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('..',import.meta.url))
const raw=`${root}/data_raw/sova-2026-10-20`,out=`${root}/public/images/agents/sova`,processed=`${root}/data_processed/sova-media`
await mkdir(`${out}/gallery`,{recursive:true});await mkdir(processed,{recursive:true})
const keys=['drone','shock','recon','ultimate']
for(const key of keys){
 await sharp(`${raw}/${key}.png`).resize(96).webp({quality:90}).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg',['-y','-i',`${raw}/${key}.mp4`,'-vf','scale=960:-2','-c:v','libx264','-crf','25','-preset','fast','-an','-movflags','+faststart',`${out}/${key}.mp4`],{stdio:'pipe'})
 execFileSync('ffmpeg',['-y','-ss','0.5','-i',`${out}/${key}.mp4`,'-frames:v','1',`${processed}/${key}.png`],{stdio:'pipe'})
 await sharp(`${processed}/${key}.png`).webp({quality:84}).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`,keys.map(k=>`file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg',['-y','-f','concat','-safe','0','-i',`${processed}/concat.txt`,'-c','copy','-movflags','+faststart',`${out}/abilities-overview.mp4`],{stdio:'pipe'})
console.log('Sova official ability media prepared')
// Observed official cinematic viewport: x16 y68, 892x380, captured in Ego Lite.
for(const sec of [305,350,355])await sharp(`${raw}/reckoning-${sec}.png`).extract({left:16,top:68,width:892,height:380}).png().toFile(`${processed}/frame-${sec}.png`)
await sharp(`${processed}/frame-305.png`).resize(1920,1080,{fit:'cover',position:'top'}).webp({quality:88}).toFile(`${out}/hero.webp`)
await sharp(`${processed}/frame-305.png`).resize(1200,630,{fit:'cover',position:'top'}).jpeg({quality:87}).toFile(`${out}/og.jpg`)
await sharp(`${processed}/frame-355.png`).extract({left:160,top:0,width:500,height:380}).resize(960,640,{fit:'cover',position:'top'}).webp({quality:88}).toFile(`${out}/gallery/scout.webp`)
await sharp(`${processed}/frame-350.png`).extract({left:490,top:0,width:402,height:380}).resize(960,640,{fit:'cover',position:'top'}).webp({quality:88}).toFile(`${out}/gallery/bow.webp`)
console.log('Sova cinematic crops prepared')
