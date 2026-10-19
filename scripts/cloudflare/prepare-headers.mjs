import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// Carry the existing Netlify cache and security policy into Static Assets.
const target = resolve(process.argv[2] || 'dist')
const config = await readFile('netlify.toml', 'utf8')
const sections = config.split('[[headers]]').slice(1)
const lines = []
for (const section of sections) {
  const path = section.match(/for\s*=\s*"([^"]+)"/)?.[1]
  if (!path) continue
  lines.push(path.replace(/^\/\*\//, '/:locale/'))
  for (const match of section.matchAll(/^\s+([\w-]+)\s*=\s*"([^"]+)"/gm)) lines.push(`  ${match[1]}: ${match[2]}`)
  lines.push('')
}
if (process.argv.includes('--preview')) lines.push('/*', '  X-Robots-Tag: noindex, nofollow', '')
await writeFile(resolve(target, '_headers'), lines.join('\n'))
console.log('Prepared static cache and security headers')
