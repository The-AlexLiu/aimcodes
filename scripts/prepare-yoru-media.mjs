// Rebuild only derived media; retain the original official files and browser captures.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('..',import.meta.url))
const raw=`${root}/data_raw/yoru-2026-10-20`, out=`${root}/public/images/agents/yoru`, processed=`${root}/data_processed/yoru-media`
await mkdir(`${out}/gallery`,{recursive:true});await mkdir(processed,{recursive:true})
for(const key of ['fakeout','flash','tether','ultimate']){
 await sharp(`${raw}/${key}.png`).resize(96).webp({quality:90}).toFile(`${out}/${key}.webp`)
 execFileSync('ffmpeg',['-y','-i',`${raw}/${key}.mp4`,'-vf','scale=960:-2','-c:v','libx264','-crf','25','-preset','fast','-an','-movflags','+faststart',`${out}/${key}.mp4`],{stdio:'pipe'})
 execFileSync('ffmpeg',['-y','-ss','3','-i',`${out}/${key}.mp4`,'-frames:v','1',`${processed}/${key}.png`],{stdio:'pipe'})
 await sharp(`${processed}/${key}.png`).webp({quality:84}).toFile(`${out}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`,['fakeout','flash','tether','ultimate'].map(k=>`file '${out}/${k}.mp4'`).join('\n'))
execFileSync('ffmpeg',['-y','-f','concat','-safe','0','-i',`${processed}/concat.txt`,'-c','copy','-movflags','+faststart',`${out}/abilities-overview.mp4`],{stdio:'pipe'})
console.log('Yoru ability media prepared')
// Browser captures from the official RETAKE watch page, excluding page UI and rounded edges.
for (const [time,key] of [[48,'pistol'],[113,'rift'],[145,'portrait']]) {
 await sharp(`${raw}/frame-${time}.png`).extract({left:22,top:74,width:810,height:330}).resize(960,755,{fit:'cover',position:time===48?'left':'centre'}).webp({quality:88}).toFile(`${out}/gallery/${key}.webp`)
}
const portrait = {left:45,top:75,width:535,height:330}
await sharp(`${raw}/frame-145.png`).extract(portrait).resize(1920,1080,{fit:'cover',position:'top'}).webp({quality:90}).toFile(`${out}/hero.webp`)
await sharp(`${raw}/frame-145.png`).extract(portrait).resize(1200,630,{fit:'cover',position:'top'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
