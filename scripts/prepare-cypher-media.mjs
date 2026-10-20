// Regenerate public derivatives from preserved official assets and trailer captures.
import sharp from 'sharp'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('..',import.meta.url))
const raw=`${root}/data_raw/cypher-2026-10-20`,out=`${root}/public/images/agents/cypher`,processed=`${root}/data_processed/cypher-media`
await mkdir(`${out}/gallery`,{recursive:true});await mkdir(processed,{recursive:true})
const keys=['trapwire','cage','spycam','ultimate']
for(const key of keys){
 await sharp(`${raw}/${key}.png`).resize(96).webp({quality:90}).toFile(`${out}/${key}.webp`)
 // CN official Trapwire demo reflects the updated slow/reveal behavior.
 const source=key==='trapwire'?'trapwire-cn':key
 execFileSync('ffmpeg',['-y','-i',`${raw}/${source}.mp4`,'-vf','scale=960:540','-r','30','-c:v','libx264','-crf','25','-preset','fast','-an','-movflags','+faststart',`${out}/${key}.mp4`],{stdio:'pipe'})
 execFileSync('ffmpeg',['-y','-ss','2','-i',`${out}/${key}.mp4`,'-frames:v','1',`${processed}/${key}.png`],{stdio:'pipe'})
 await sharp(`${processed}/${key}.png`).webp({quality:84}).toFile(`${out}/${key}-poster.webp`)
 execFileSync('ffmpeg',['-y','-i',`${out}/${key}.mp4`,'-t','8','-c','copy',`${processed}/${key}-clip.mp4`],{stdio:'pipe'})
}
await writeFile(`${processed}/concat.txt`,keys.map(k=>`file '${processed}/${k}-clip.mp4'`).join('\n'))
execFileSync('ffmpeg',['-y','-f','concat','-safe','0','-i',`${processed}/concat.txt`,'-c','copy','-movflags','+faststart',`${out}/abilities-overview.mp4`],{stdio:'pipe'})
// Isolate the official character artwork; desktop and mobile framing verified separately.
await sharp(`${raw}/hero.png`).extract({left:2270,top:0,width:1600,height:1772}).resize(1920,1080,{fit:'cover',position:'top'}).webp({quality:90}).toFile(`${out}/hero.webp`)
await sharp(`${out}/hero.webp`).resize(1200,630,{fit:'cover',position:'top'}).jpeg({quality:88}).toFile(`${out}/og.jpg`)
// Pure picture x16/y115/822x369, excluding YouTube interface and black bars.
for(const [sec,key] of [[6,'gesture'],[10,'portrait']]){
 await sharp(`${raw}/frame-${sec}.png`).extract({left:16,top:115,width:822,height:369}).resize(960,540,{fit:'cover',position:'centre'}).webp({quality:90}).toFile(`${out}/gallery/${key}.webp`)
}
const official=JSON.parse(await readFile(`${raw}/en-us.json`,'utf8')).props.pageProps.page.blades
await writeFile(`${out}/sources.json`,JSON.stringify({collectedAt:'2026-10-20',copyright:'Riot Games',officialPages:['en-us','ja-jp','es-es','pt-br'].map(l=>`https://playvalorant.com/${l}/agents/cypher/`),cn:{endpoint:'https://api.val.qq.com/go/agame/graphql/graphiQL',agentId:10,trapwireVid:'p1281w45qyv'},hero:{url:official[1].backdrop.background.url,crop:{left:2270,top:0,width:1600,height:1772}},abilities:keys.map((key,i)=>({key,icon:official[2].groups[[2,0,1,3][i]].thumbnail.url,video:key==='trapwire'?'https://v.qq.com/x/page/p1281w45qyv.html':official[2].groups[[2,0,1,3][i]].content.media.sources[0].src,posterSeconds:2})),gallery:{url:'https://www.youtube.com/watch?v=9N_iC-Yc0FA',channel:'VALORANT (verified)',title:'CHECKMATE // Cypher’s Revenge Game Mode Trailer',note:'April Fools special, not current normal gameplay',frames:[{seconds:6,key:'gesture'},{seconds:10,key:'portrait'}],captureCrop:{left:16,top:115,width:822,height:369},output:'960x540 center crop'},patches:['https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-0-50/','https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-11-08/','https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-13-00/']},null,2)+'\n')
console.log('Prepared Cypher official media derivatives')
