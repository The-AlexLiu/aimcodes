// Rebuild only derived media; retain the original official files and browser captures.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('..',import.meta.url))
const raw=`${root}/data_raw/reyna-2026-10-20`, out=`${root}/public/images/agents/reyna`, processed=`${root}/data_processed/reyna-media`
await mkdir(`${out}/gallery`,{recursive:true});await mkdir(processed,{recursive:true})
for(const key of ['leer','devour','dismiss','ultimate']){
 await sharp(`${raw}/${key}.png`).resize(96).webp({quality:90}).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg',['-y','-i',`${raw}/${key}.mp4`,'-vf','scale=960:-2','-c:v','libx264','-crf','25','-preset','fast','-an','-movflags','+faststart',`${out}/${key}.mp4`],{stdio:'pipe'})
 execFileSync('ffmpeg',['-y','-ss','3','-i',`${out}/${key}.mp4`,'-frames:v','1',`${processed}/${key}.png`],{stdio:'pipe'})
 await sharp(`${processed}/${key}.png`).webp({quality:84}).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`,['leer','devour','dismiss','ultimate'].map(k=>`file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg',['-y','-f','concat','-safe','0','-i',`${processed}/concat.txt`,'-c','copy','-movflags','+faststart',`${out}/abilities-overview.mp4`],{stdio:'pipe'})
console.log('Reyna ability media prepared')
// Screenshots of the official SHATTERED watch page, captured after seeking and pausing.
const clean = {left:8,top:0,width:885,height:380}
await sharp(`${raw}/cinematic-280.png`).extract({left:20,top:0,width:550,height:380}).resize(1920,1080,{fit:'cover',position:'top'}).webp({quality:88}).toFile(`${out}/hero.webp`)
await sharp(`${raw}/cinematic-270.png`).extract(clean).resize(1200,630,{fit:'cover',position:'right'}).jpeg({quality:87}).toFile(`${out}/og.jpg`)
for(const [time,key,crop] of [[190,'corridor',{left:110,top:0,width:570,height:380}],[270,'empress',{left:380,top:0,width:510,height:380}],[280,'team',{left:20,top:0,width:520,height:380}]]){
 await sharp(`${raw}/cinematic-${time}.png`).extract(crop).resize(960,755,{fit:'cover',position:'top'}).webp({quality:88}).toFile(`${out}/gallery/${key}.webp`)
}
