import sharp from 'sharp'
import { spawnSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { HUSH_ABILITY_SOURCE } from '../src/seo/hushMedia.js'

// Extract the actual per-ability symbol from Riot's English preview panels.
// Panel positions differ because the descriptions have different line counts.
const input = 'data_raw/hush-2026-10-19/official-abilities-hq.mp4'
const icons = [
  { key: 'telekinesis', time: 5, top: 278 },
  { key: 'flow', time: 30, top: 278 },
  { key: 'flashbulb', time: 24.5, top: 256 },
  { key: 'displacement', time: 13, top: 220 },
  { key: 'suspension', time: 37, top: 256 },
]
await mkdir('public/images/agents/hush/icons', { recursive: true })
await mkdir('output/hush-page-qa/icon-frames', { recursive: true })
for (const icon of icons) {
  const frame = `output/hush-page-qa/icon-frames/${icon.key}.png`
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(icon.time), '-i', input, '-frames:v', '1', frame])
  if (result.status !== 0) throw new Error(result.stderr.toString())
  await sharp(frame).extract({ left: 780, top: icon.top, width: 96, height: 96 })
    .webp({ quality: 95 }).toFile(`public/images/agents/hush/icons/${icon.key}.webp`)
}
await writeFile('data_raw/hush-2026-10-19/icon-provenance.json', JSON.stringify({ source: HUSH_ABILITY_SOURCE, input, cropWidth: 96, cropHeight: 96, left: 780, icons }, null, 2))
console.log(`Extracted ${icons.length} official preview icons.`)
