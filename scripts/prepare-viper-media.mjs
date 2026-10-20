// Read-only originals; reproduce local derived files from recorded official sources.
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
const root=fileURLToPath(new URL('..',import.meta.url))
const raw=`${root}/data_raw/viper-2026-10-19`,out=`${root}/public/images/agents/viper`,processed=`${root}/data_processed/viper-media`
await mkdir(`${out}/gallery`,{recursive:true}); await mkdir(processed,{recursive:true})
for(const key of ['bite','cloud','wall','ultimate']) {
 await sharp(`${raw}/${key}.png`).resize(96).webp({quality:90}).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg',['-y','-i',`${raw}/${key}.mp4`,'-vf','scale=960:-2','-c:v','libx264','-crf','25','-preset','fast','-an','-movflags','+faststart',`${out}/${key}.mp4`],{stdio:'pipe'})
 execFileSync('ffmpeg',['-y','-ss','3','-i',`${out}/${key}.mp4`,'-frames:v','1',`${processed}/${key}-poster.png`],{stdio:'pipe'})
 await sharp(`${processed}/${key}-poster.png`).webp({quality:84}).toFile(`${out}/${key}-poster.webp`)
}
const list=['bite','cloud','wall','ultimate'].map(k=>`file '${out}/${k}.mp4'`).join('\n')
await writeFile(`${processed}/concat.txt`,list)
execFileSync('ffmpeg',['-y','-f','concat','-safe','0','-i',`${processed}/concat.txt`,'-c','copy','-movflags','+faststart',`${out}/abilities-overview.mp4`],{stdio:'pipe'})
console.log('Prepared official Viper ability media')
await sharp(`${raw}/official-hero.png`).extract({left:1850,top:0,width:1800,height:1012}).resize(1920,1080).webp({quality:88}).toFile(`${out}/hero.webp`)
await sharp(`${raw}/official-hero.png`).extract({left:1850,top:0,width:1800,height:1012}).resize(1200,630,{fit:'cover'}).jpeg({quality:87}).toFile(`${out}/og.jpg`)
for(const [seconds,key] of [[91,'retake-mask'],[91.5,'retake-fight']]) {
 await sharp(`${raw}/frames/frame-${seconds}.png`).extract({left:0,top:164,width:1200,height:499}).webp({quality:90}).toFile(`${out}/gallery/${key}.webp`)
}
console.log('Prepared official portrait and reviewed cinematic gallery')
