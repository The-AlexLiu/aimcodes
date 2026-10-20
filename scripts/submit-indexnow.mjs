import fs from 'node:fs/promises'

const host = 'aimcodes.com'
const origin = `https://${host}`
const explicitUrls = process.env.INDEXNOW_URLS?.split(/\s+/).filter(Boolean) ?? []
const sitemapFlag = process.argv.indexOf('--sitemap-file')
let candidates = explicitUrls
if (!candidates.length) {
  let sitemap
  if (sitemapFlag !== -1) {
    const file = process.argv[sitemapFlag + 1]
    if (!file || file.startsWith('--')) throw new Error('--sitemap-file requires a path')
    sitemap = await fs.readFile(file, 'utf8')
  } else {
    const response = await fetch(`${origin}/sitemap.xml`, { signal: AbortSignal.timeout(30_000) })
    if (!response.ok) throw new Error(`Sitemap fetch failed with HTTP ${response.status}`)
    sitemap = await response.text()
  }
  // The generated main sitemap contains canonical, indexable HTML pages only.
  candidates = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(match => match[1].replaceAll('&amp;', '&'))
}
const urls = [...new Set(candidates.map(value => {
  const url = new URL(value)
  if (url.origin !== origin || url.username || url.password || url.search || url.hash || /\.xml$/i.test(url.pathname)) {
    throw new Error('IndexNow list must contain canonical aimcodes.com page URLs')
  }
  return url.href
}))]
if (!urls.length) throw new Error('IndexNow URL list is empty')
if (process.argv.includes('--dry-run')) {
  console.log(`IndexNow dry run: ${urls.length} canonical page URLs prepared; no notification sent`)
  process.exit(0)
}

// The existing public ownership-verification key stays inside this process.
const keyFiles = (await fs.readdir('public')).filter(name => /^[a-f0-9]{32}\.txt$/i.test(name))
if (keyFiles.length !== 1) throw new Error(`Expected exactly one IndexNow key file, found ${keyFiles.length}`)
const keyFile = keyFiles[0]
const key = (await fs.readFile(`public/${keyFile}`, 'utf8')).trim()
if (!/^[a-f0-9]{32}$/i.test(key) || `${key}.txt`.toLowerCase() !== keyFile.toLowerCase()) throw new Error('IndexNow ownership file is invalid')

for (let offset = 0; offset < urls.length; offset += 10_000) {
  const batch = urls.slice(offset, offset + 10_000)
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    signal: AbortSignal.timeout(30_000),
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation: `${origin}/${keyFile}`, urlList: batch }),
  })
  if (!response.ok) throw new Error(`IndexNow rejected submission with HTTP ${response.status}`)
  console.log(`IndexNow accepted ${batch.length} URL notifications (HTTP ${response.status}); indexing is not guaranteed`)
}
