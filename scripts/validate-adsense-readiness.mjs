import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isAdEligibleRoute } from '../src/config/adPolicy.js'
import { localeRoutes } from '../src/i18n/localeRoutes.js'
import { seoCopy } from '../src/seo/content.js'
import { isIndexableRoute, routePath, TRUST_PAGE_KEYS } from '../src/seo/routes.js'
import { TRUST_UPDATED_AT, trustCopy } from '../src/seo/trustContent.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const errors = []

const adEligibleCases = [
  [{ type: 'home' }, true],
  [{ type: 'catalog' }, true],
  [{ type: 'finder' }, false],
  [{ type: 'notFound' }, false],
  [{ type: 'trust', pageKey: 'about' }, false],
  [{ type: 'crosshair', crosshairId: 'tenz' }, true],
  [{ type: 'crosshair', crosshairId: 'non-priority-example' }, false],
]

for (const [route, expected] of adEligibleCases) {
  if (isAdEligibleRoute(route) !== expected) errors.push(`ad policy mismatch for ${JSON.stringify(route)}`)
}

for (const locale of Object.keys(localeRoutes)) {
  const footer = seoCopy(locale).footer
  for (const key of ['about', 'privacy', 'terms', 'contact', 'independent']) {
    if (!footer[key]?.trim()) errors.push(`${locale}: missing footer trust copy ${key}`)
  }

  for (const pageKey of TRUST_PAGE_KEYS) {
    const page = trustCopy(locale, pageKey)
    if (!page.title || !page.intro || page.sections.length < 2) errors.push(`${locale}/${pageKey}: trust content is incomplete`)
    const path = routePath(locale, { type: 'trust', pageKey })
    const html = await readFile(resolve(distRoot, path.slice(1), 'index.html'), 'utf8')
    const expectedRobots = isIndexableRoute({ type: 'trust', pageKey }) ? 'index,follow,max-image-preview:large' : 'noindex,follow'
    if (!html.includes(`<meta name="robots" content="${expectedRobots}"`)) errors.push(`${path}: incorrect robots directive`)
    if (!html.includes(TRUST_UPDATED_AT)) errors.push(`${path}: missing visible update date`)
    if (!html.includes(page.title)) errors.push(`${path}: missing localized trust title`)
  }

  const homeHtml = await readFile(resolve(distRoot, routePath(locale, { type: 'home' }).slice(1), 'index.html'), 'utf8')
  for (const pageKey of TRUST_PAGE_KEYS) {
    const path = routePath(locale, { type: 'trust', pageKey })
    if (!homeHtml.includes(path)) errors.push(`${locale} home: missing static trust link ${path}`)
  }
}

const sourceFiles = await Promise.all([
  readFile(resolve(projectRoot, 'src/App.jsx'), 'utf8'),
  readFile(resolve(projectRoot, 'src/components/SiteFooter.jsx'), 'utf8'),
  readFile(resolve(projectRoot, 'src/seo/trustContent.js'), 'utf8'),
  readFile(resolve(projectRoot, 'src/config/contact.js'), 'utf8'),
])
const source = sourceFiles.join('\n')
if (!source.includes('data-ad-eligible')) errors.push('App: future ad-eligibility marker is missing')
if (!source.includes('https://www.riotgames.com/en/legal')) errors.push('Terms: Riot fan-content policy link is missing')
if (!source.includes('contact@aimcodes.com') || !source.includes('mailto:')) errors.push('Contact: public email correction channel is missing')
if (/github\.com\/The-AlexLiu/i.test(source)) errors.push('Contact: a private project GitHub address is exposed in public site copy')
if (/ca-pub-(?:0+|x+|your|example)/i.test(source)) errors.push('Source contains a placeholder AdSense publisher ID')
if (/\b(?:TODO|TBD)\b|example\.com/.test(sourceFiles[2])) errors.push('Trust content contains unfinished placeholder copy')

try {
  await access(resolve(distRoot, 'ads.txt'))
  const adsTxt = (await readFile(resolve(distRoot, 'ads.txt'), 'utf8')).trim()
  if (!/^google\.com, pub-\d+, DIRECT, f08c47fec0942fa0$/m.test(adsTxt)) errors.push('ads.txt exists but does not contain a valid Google publisher record')
} catch {
  // Correct before approval: a real publisher ID does not exist yet, so no placeholder file is deployed.
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated AdSense trust pages, future ad-placement allowlist, disclosures, and placeholder safety across ${Object.keys(localeRoutes).length} languages.`)
