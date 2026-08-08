import { readFile } from 'node:fs/promises'

const measurementId = 'G-2VMCECN5S6'
const files = [
  'src/utils/analytics.js',
  'src/App.jsx',
  'src/components/CrosshairFinder.jsx',
]

const source = (await Promise.all(files.map((file) => readFile(file, 'utf8')))).join('\n')
const requiredEvents = [
  'page_view',
  'finder_open',
  'finder_start',
  'finder_false_start',
  'finder_complete',
  'finder_exit',
  'select_content',
  'crosshair_code_copy',
  'crosshair_color_change',
  'map_change',
  'filter_select',
  'search_used',
  'language_change',
  'import_guide_open',
  'share',
  'share_card_open',
  'share_download',
  'share_native',
  'share_link_copy',
  'challenge_landing',
  'challenge_start',
  'challenge_complete',
  'challenge_won',
]

const missingEvents = requiredEvents.filter((eventName) => !source.includes(`'${eventName}'`))
if (!source.includes(measurementId)) throw new Error(`Missing GA4 measurement ID: ${measurementId}`)
if (!source.includes("'aimcodes.com'")) throw new Error('Missing production analytics host: aimcodes.com')
if (!source.includes("get('qa') === '1'")) throw new Error('Missing ?qa=1 analytics exclusion guard.')
if (missingEvents.length) throw new Error(`Missing GA4 events: ${missingEvents.join(', ')}`)
if (source.includes('search_term: normalizedQuery')) throw new Error('Raw search terms must not be sent to GA4.')

console.log(`GA4 validation passed: ${measurementId}, ${requiredEvents.length} required funnel events, production-only host guard, and no raw search term collection.`)
