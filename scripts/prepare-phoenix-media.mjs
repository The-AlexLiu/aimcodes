// Regenerate only derived media; original files under data_raw are read-only.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import {mkdir,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const root=fileURLToPath(new URL('..',import.meta.url));const raw=root+'/data_raw/phoenix-2026-10-19',out=root+'/public/images/agents/phoenix';await mkdir(out+'/gallery',{recursive:true});
const processed=root+'/data_processed/phoenix-media';await mkdir(processed,{recursive:true});
await sharp(raw+'/origins.jpg').webp({quality:86}).toFile(out+'/hero.webp');await sharp(raw+'/origins.jpg').resize(1200,630,{fit:'cover'}).jpeg({quality:87}).toFile(out+'/og.jpg');
for(const key of ['wall','fireball','flash','ultimate']){
 await sharp(raw+'/'+key+'.png').resize(96).webp({quality:90}).toFile(out+'/'+key+'.webp');
 execFileSync('ffmpeg',['-y','-i',raw+'/'+key+'.mp4','-vf','scale=960:-2','-c:v','libx264','-crf','25','-preset','fast','-an','-movflags','+faststart',out+'/'+key+'.mp4'],{stdio:'pipe'});
 execFileSync('ffmpeg',['-y','-ss','3','-i',out+'/'+key+'.mp4','-frames:v','1',processed+'/'+key+'-poster.png'],{stdio:'pipe'});
 await sharp(processed+'/'+key+'-poster.png').webp({quality:84}).toFile(out+'/'+key+'-poster.webp');
}
for (const [seconds, name] of [[35, 'duelists-punch'], [49, 'duelists-aim'], [77, 'duelists-closeup']]) {
 await sharp(`${raw}/duelists-frames/frame-${seconds}.png`).resize(1280).webp({quality:88}).toFile(`${out}/gallery/${name}.webp`);
}
const list=['wall','fireball','flash','ultimate'].map(k=>`file '${out}/${k}.mp4'`).join('\n');await writeFile(processed+'/concat.txt',list);execFileSync('ffmpeg',['-y','-f','concat','-safe','0','-i',processed+'/concat.txt','-c','copy','-movflags','+faststart',out+'/abilities-overview.mp4'],{stdio:'pipe'});
console.log('Prepared official Phoenix assets');
