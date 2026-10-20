// Derive public media from official downloads and observed MYTHS frames; keep originals intact.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('..',import.meta.url))
const raw=`${root}/data_raw/iso-2026-10-20`,out=`${root}/public/images/agents/iso`,processed=`${root}/data_processed/iso-media`
await mkdir(`${out}/gallery`,{recursive:true});await mkdir(processed,{recursive:true})
const keys=['wall','bolt','shield','ultimate']
for(const key of keys){
 await sharp(`${raw}/${key}.png`).resize(96).webp({quality:90}).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg',['-y','-i',`${raw}/${key}.mp4`,'-vf','scale=960:-2','-c:v','libx264','-crf','25','-preset','fast','-an','-movflags','+faststart',`${out}/${key}.mp4`],{stdio:'pipe'})
 execFileSync('ffmpeg',['-y','-ss','0.5','-i',`${out}/${key}.mp4`,'-frames:v','1',`${processed}/${key}.png`],{stdio:'pipe'})
 await sharp(`${processed}/${key}.png`).webp({quality:84}).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`,keys.map(k=>`file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg',['-y','-f','concat','-safe','0','-i',`${processed}/concat.txt`,'-c','copy','-movflags','+faststart',`${out}/abilities-overview.mp4`],{stdio:'pipe'})
for(const sec of [120,133,145])await sharp(`${raw}/watch-${sec}.png`).extract({left:16,top:68,width:892,height:380}).png().toFile(`${processed}/frame-${sec}.png`)
await sharp(`${processed}/frame-133.png`).resize(1920,1080,{fit:'cover',position:'top'}).webp({quality:88}).toFile(`${out}/hero.webp`)
await sharp(`${processed}/frame-133.png`).resize(1200,630,{fit:'cover'}).jpeg({quality:87}).toFile(`${out}/og.jpg`)
for(const [sec,key,left,width] of [[120,'duel',220,450],[145,'aftermath',345,520]])await sharp(`${processed}/frame-${sec}.png`).extract({left,top:0,width,height:380}).resize(960,640,{fit:'cover',position:'top'}).webp({quality:88}).toFile(`${out}/gallery/${key}.webp`)
console.log('Iso official media prepared')
