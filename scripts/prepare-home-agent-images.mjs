import { stat, writeFile } from 'node:fs/promises'
import sharp from 'sharp'
import { HOME_AGENT_IDS } from '../src/data/agentDirectory.js'

// Retain the downloaded PNG sources and their full transparent framing.
const images = []
for (const id of HOME_AGENT_IDS) {
  const source = `public/images/agents/home/${id}.png`
  const originalBytes = (await stat(source)).size
  const variants = []
  for (const width of [640, 960]) {
    const path = `public/images/agents/home/${id}-${width}.webp`
    const info = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 100, effort: 6 }).toFile(path)
    const meta = await sharp(path).metadata()
    if (!meta.hasAlpha) throw new Error(`${path} lost transparency`)
    variants.push({ path: path.replace('public', ''), width: info.width, height: info.height, bytes: info.size })
  }
  images.push({ id, source: source.replace('public', ''), originalBytes, variants })
}
const report = { generatedAt: new Date().toISOString(), quality: 82, alphaQuality: 100, images }
await writeFile('docs/HOME_AGENT_IMAGE_VARIANTS.json', `${JSON.stringify(report, null, 2)}\n`)
for (const width of [640, 960]) {
  const before = images.reduce((sum, image) => sum + image.originalBytes, 0)
  const after = images.reduce((sum, image) => sum + image.variants.find(variant => variant.width === width).bytes, 0)
  console.log(`${width}px: ${before} -> ${after} bytes (${(100 * (1 - after / before)).toFixed(1)}% reduction)`)
}
