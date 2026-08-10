import { access, readdir, readFile } from 'node:fs/promises'
import { dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const errors = []
let checkedLinks = 0

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) return htmlFiles(path)
    return extname(entry.name) === '.html' ? [path] : []
  }))
  return nested.flat()
}

function targetFile(href) {
  const clean = href.split('#')[0].split('?')[0]
  if (!clean || clean === '/') return resolve(distRoot, 'index.html')
  if (/\.[a-z0-9]+$/i.test(clean)) return resolve(distRoot, clean.slice(1))
  return resolve(distRoot, clean.slice(1), 'index.html')
}

for (const source of await htmlFiles(distRoot)) {
  const html = await readFile(source, 'utf8')
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1])
  for (const href of new Set(hrefs)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue
    checkedLinks += 1
    try {
      await access(targetFile(href))
    } catch {
      errors.push(`${source.replace(`${distRoot}/`, '')}: broken internal link ${href}`)
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${checkedLinks} internal links across generated HTML.`)
