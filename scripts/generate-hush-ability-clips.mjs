import sharp from 'sharp'
import { spawnSync } from 'node:child_process'
import { access, mkdir, writeFile, stat } from 'node:fs/promises'
import { HUSH_ABILITY_MEDIA, HUSH_ABILITY_SOURCE } from '../src/seo/hushMedia.js'

const input = 'data_raw/hush-2026-10-19/official-abilities-hq.mp4'
await access(input)
await mkdir('public/images/agents/hush/abilities', { recursive: true })
await mkdir('output/hush-page-qa/clip-frames', { recursive: true })

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' })
  if (result.status !== 0) throw new Error(result.stderr || `${command} failed`)
  return result.stdout
}

const records = []
for (const clip of HUSH_ABILITY_MEDIA) {
  const output = `public${clip.src}`
  // The original vertical video embeds the actual 1080×608 gameplay at y=742.
  // Crop the surrounding explanatory panels; keep the full gameplay width.
  run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(clip.start), '-i', input,
    '-t', String(clip.duration), '-vf', 'crop=1080:608:0:742,scale=768:432,fps=24',
    '-an', '-c:v', 'libx264', '-crf', '25', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output])
  const frame = `output/hush-page-qa/clip-frames/${clip.key}.png`
  run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', '0.4', '-i', output, '-frames:v', '1', frame])
  await sharp(frame).webp({ quality: 83 }).toFile(`public${clip.poster}`)
  const info = JSON.parse(run('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', output]))
  if (info.streams.some(stream => stream.codec_type === 'audio')) throw new Error(`${clip.key}: unexpected audio`)
  if (Math.abs(Number(info.format.duration) - clip.duration) > 0.2) throw new Error(`${clip.key}: duration mismatch`)
  records.push({ ...clip, bytes: (await stat(output)).size, width: info.streams[0].width, height: info.streams[0].height })
}
await writeFile('data_raw/hush-2026-10-19/clip-provenance.json', JSON.stringify({ source: HUSH_ABILITY_SOURCE, input, crop: '1080:608:0:742', records }, null, 2))
console.log(JSON.stringify({ clips: records.length, totalBytes: records.reduce((sum, clip) => sum + clip.bytes, 0), records }, null, 2))
