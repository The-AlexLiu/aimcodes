// Rebuild only derived media; retain the original official files and browser captures.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('..',import.meta.url))
const raw=`${root}/data_raw/raze-2026-10-19`, out=`${root}/public/images/agents/raze`, processed=`${root}/data_processed/raze-media`
await mkdir(`${out}/gallery`,{recursive:true});await mkdir(processed,{recursive:true})
for(const key of ['bot','satchel','grenade','ultimate']){
 await sharp(`${raw}/${key}.png`).resize(96).webp({quality:90}).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg',['-y','-i',`${raw}/${key}.mp4`,'-vf','scale=960:-2','-c:v','libx264','-crf','25','-preset','fast','-an','-movflags','+faststart',`${out}/${key}.mp4`],{stdio:'pipe'})
 execFileSync('ffmpeg',['-y','-ss','3','-i',`${out}/${key}.mp4`,'-frames:v','1',`${processed}/${key}.png`],{stdio:'pipe'})
 await sharp(`${processed}/${key}.png`).webp({quality:84}).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`,['bot','satchel','grenade','ultimate'].map(k=>`file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg',['-y','-f','concat','-safe','0','-i',`${processed}/concat.txt`,'-c','copy','-movflags','+faststart',`${out}/abilities-overview.mp4`],{stdio:'pipe'})
console.log('Raze ability media prepared')
// Browser crops from the verified official WARM UP watch page; no UI, subtitles or black bars.
const portrait={left:0,top:0,width:640,height:503}
await sharp(`${raw}/pure-130.png`).extract(portrait).resize(1920,1080,{fit:'cover',position:'top'}).webp({quality:88}).toFile(`${out}/hero.webp`)
await sharp(`${raw}/pure-130.png`).extract(portrait).resize(1200,630,{fit:'cover',position:'top'}).jpeg({quality:87}).toFile(`${out}/og.jpg`)
for(const [time,key,crop] of [[130,'headphones',portrait],[198,'training',{left:740,top:0,width:460,height:503}],[200,'rocket',{left:50,top:10,width:570,height:493}]]){
 await sharp(`${raw}/pure-${time}.png`).extract(crop).resize(960,755,{fit:'cover',position:'top'}).webp({quality:88}).toFile(`${out}/gallery/${key}.webp`)
}
