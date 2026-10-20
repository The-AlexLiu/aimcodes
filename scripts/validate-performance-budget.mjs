import sharp from 'sharp'
import { HOME_AGENT_IDS } from '../src/data/agentDirectory.js'
import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

const projectRoot = resolve(import.meta.dirname, '..')
const distRoot = resolve(projectRoot, 'dist')
const assetsRoot = resolve(distRoot, 'assets')
const indexHtml = await readFile(resolve(distRoot, 'index.html'), 'utf8')
const entryMatch = indexHtml.match(/<script[^>]+src="(\/assets\/index-[^"]+\.js)"/)

if (!entryMatch) {
  console.error('Performance budget failed: production entry script not found in dist/index.html.')
  process.exit(1)
}

const entryPath = resolve(distRoot, entryMatch[1].replace(/^\//, ''))
const entryBytes = await readFile(entryPath)
const entryRawKb = entryBytes.length / 1024
const entryGzipKb = gzipSync(entryBytes).length / 1024
// The SEO collection index now contains 40 localized collection intents. Keep the
// raw entry budget explicit at 433 KB while retaining the stricter gzip guard.
// The catalog's contextual reaction-test CTA is part of the first-screen shell.
const entryRawBudgetKb = 433
const assetFiles = await readdir(assetsRoot)
const jsChunks = assetFiles.filter((name) => name.endsWith('.js'))
const requiredLazyChunks = [
  'CrosshairFinder-',
  'CrosshairToolsPage-',
  'HomeResourceDirectory-',
  'SeoArticlePage-',
]
const errors = []

if (entryRawKb > entryRawBudgetKb) errors.push(`entry script is ${entryRawKb.toFixed(1)} KB; budget is ${entryRawBudgetKb} KB`)
if (entryGzipKb > 145) errors.push(`entry script gzip is ${entryGzipKb.toFixed(1)} KB; budget is 145 KB`)
for (const prefix of requiredLazyChunks) {
  if (!jsChunks.some((name) => name.startsWith(prefix))) errors.push(`missing lazy chunk: ${prefix}`)
}

const largestChunks = (await Promise.all(jsChunks.map(async (name) => ({
  name,
  bytes: (await stat(resolve(assetsRoot, name))).size,
})))).sort((a, b) => b.bytes - a.bytes).slice(0, 5)

// Guard the real gallery payload, not only the JavaScript entry size.
const galleryBytes = {}
for (const width of [640, 960]) {
  let total = 0
  for (const id of HOME_AGENT_IDS) {
    const path = resolve(distRoot, `images/agents/home/${id}-${width}.webp`)
    try {
      const info = await stat(path)
      const meta = await sharp(path).metadata()
      total += info.size
      if (meta.width !== width || !meta.hasAlpha) errors.push(`${id}-${width}.webp must retain its responsive size and transparency`)
      if (info.size > (width === 640 ? 60 : 110) * 1024) errors.push(`${id}-${width}.webp exceeds its image budget`)
    } catch {
      errors.push(`missing or invalid gallery image: ${id}-${width}.webp`)
    }
  }
  galleryBytes[width] = total
  if (total > (width === 640 ? 550 : 900) * 1024) errors.push(`${width}px gallery exceeds its total image budget`)
}

if (errors.length) {
  console.error(`Performance budget failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`Performance budget passed: entry ${entryRawKb.toFixed(1)} KB raw / ${entryGzipKb.toFixed(1)} KB gzip; ${jsChunks.length} JavaScript chunks.`)
console.log(`Largest chunks: ${largestChunks.map((item) => `${item.name} ${(item.bytes / 1024).toFixed(1)} KB`).join(', ')}`)
console.log(`Gallery image budget passed: 640px ${(galleryBytes[640] / 1024).toFixed(1)} KB; 960px ${(galleryBytes[960] / 1024).toFixed(1)} KB across ${HOME_AGENT_IDS.length} agents.`)
