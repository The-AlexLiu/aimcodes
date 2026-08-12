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
const assetFiles = await readdir(assetsRoot)
const jsChunks = assetFiles.filter((name) => name.endsWith('.js'))
const requiredLazyChunks = [
  'CrosshairFinder-',
  'CrosshairToolsPage-',
  'HomeResourceDirectory-',
  'SeoArticlePage-',
]
const errors = []

if (entryRawKb > 430) errors.push(`entry script is ${entryRawKb.toFixed(1)} KB; budget is 430 KB`)
if (entryGzipKb > 145) errors.push(`entry script gzip is ${entryGzipKb.toFixed(1)} KB; budget is 145 KB`)
for (const prefix of requiredLazyChunks) {
  if (!jsChunks.some((name) => name.startsWith(prefix))) errors.push(`missing lazy chunk: ${prefix}`)
}

const largestChunks = (await Promise.all(jsChunks.map(async (name) => ({
  name,
  bytes: (await stat(resolve(assetsRoot, name))).size,
})))).sort((a, b) => b.bytes - a.bytes).slice(0, 5)

if (errors.length) {
  console.error(`Performance budget failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`Performance budget passed: entry ${entryRawKb.toFixed(1)} KB raw / ${entryGzipKb.toFixed(1)} KB gzip; ${jsChunks.length} JavaScript chunks.`)
console.log(`Largest chunks: ${largestChunks.map((item) => `${item.name} ${(item.bytes / 1024).toFixed(1)} KB`).join(', ')}`)
