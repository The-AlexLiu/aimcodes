// Rebuild derived media from the locally retained official source files.
// Download/source URLs and the browser screenshot crop are recorded in docs/TEJO_MEDIA_SOURCES_2026-10-20.json.
import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

const raw = resolve('data_raw/tejo-2026-10-20')
const processed = resolve('data_processed/tejo-2026-10-20')
const output = resolve('public/images/agents/tejo')
await mkdir(processed, { recursive: true })
await mkdir(`${output}/gallery`, { recursive: true })
const keys = ['drone', 'delivery', 'salvo', 'ultimate']
for (const key of keys) {
  await sharp(`${raw}/${key}.png`).webp({ quality: 90 }).toFile(`${output}/${key}.webp`)
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', `${raw}/${key}.mp4`, '-vf', 'scale=960:540', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-an', '-movflags', '+faststart', `${output}/${key}.mp4`])
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', '3', '-i', `${output}/${key}.mp4`, '-frames:v', '1', `${processed}/${key}-poster.png`])
  await sharp(`${processed}/${key}-poster.png`).webp({ quality: 82 }).toFile(`${output}/${key}-poster.webp`)
}
await writeFile(`${processed}/concat.txt`, keys.map(key => `file '${output}/${key}.mp4'\n`).join(''))
execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', `${processed}/concat.txt`, '-c', 'copy', '-movflags', '+faststart', `${output}/abilities-overview.mp4`])
await sharp(`${raw}/article-0.jpg`).resize(1920, 1080).webp({ quality: 88 }).toFile(`${output}/hero.webp`)
await sharp(`${raw}/article-0.jpg`).resize(1200, 630).jpeg({ quality: 88 }).toFile(`${output}/og.jpg`)
await sharp(`${raw}/trailer-88.png`).extract({ left: 320, top: 64, width: 640, height: 640 }).resize(960, 960).webp({ quality: 88 }).toFile(`${output}/gallery/advance.webp`)
