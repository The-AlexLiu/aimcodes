import { readFile } from 'node:fs/promises'

const measurementId = 'G-2VMCECN5S6'
const files = [
  'src/utils/analytics.js',
  'src/App.jsx',
  'src/components/CrosshairFinder.jsx',
  'src/components/ValorantPlaybookPage.jsx',
]

const sources = Object.fromEntries(await Promise.all(files.map(async (file) => [file, await readFile(file, 'utf8')])))
const source = Object.values(sources).join('\n')
const requiredEvents = [
  'page_view',
  'ai_referral_landing',
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
  'share_sheet_open',
  'share_card_open',
  'share_download',
  'share_native',
  'share_link_copy',
  'playbook_export',
  'share_landing',
  'challenge_landing',
  'challenge_start',
  'challenge_complete',
  'challenge_won',
]

const missingEvents = requiredEvents.filter((eventName) => !source.includes(`'${eventName}'`))
const directShareCallFiles = files.filter((file) => file !== 'src/utils/analytics.js' && sources[file].includes("trackEvent('share'"))
const reservedTrafficParameters = ['source', 'medium', 'campaign', 'campaign_id', 'term', 'content']
const leakedTrafficParameters = reservedTrafficParameters.filter((parameter) => new RegExp(`\\b${parameter}\\s*:`).test(source))
if (!source.includes(measurementId)) throw new Error(`Missing GA4 measurement ID: ${measurementId}`)
if (!source.includes("'aimcodes.com'")) throw new Error('Missing production analytics host: aimcodes.com')
if (!source.includes("get('qa') === '1'")) throw new Error('Missing ?qa=1 analytics exclusion guard.')
if (!source.includes("get('analytics_optout') === '1'")) throw new Error('Missing persistent analytics opt-out guard.')
if (!source.includes("get('analytics_optin') === '1'")) throw new Error('Missing analytics opt-in recovery guard.')
if (missingEvents.length) throw new Error(`Missing GA4 events: ${missingEvents.join(', ')}`)
if (source.includes('search_term: normalizedQuery')) throw new Error('Raw search terms must not be sent to GA4.')
if (!source.includes('interaction_source')) throw new Error('Missing interaction_source event attribution parameter.')
if (!source.includes('ai_provider') || !source.includes('referring_host') || !source.includes('landing_path')) throw new Error('Missing AI referral attribution parameters.')
if (!source.includes("provider: 'chatgpt'") || !source.includes("provider: 'perplexity'") || !source.includes("provider: 'claude'")) throw new Error('Missing known AI referral providers.')
if (!source.includes('trackShareSuccess')) throw new Error('Successful share actions must use the canonical trackShareSuccess helper.')
if (!source.includes("contentType: 'playbook'")) throw new Error('Missing canonical Playbook share tracking.')
if (directShareCallFiles.length) throw new Error(`Direct share event calls bypass the canonical helper: ${directShareCallFiles.join(', ')}`)
if (leakedTrafficParameters.length) throw new Error(`Reserved traffic-source parameters used in product events: ${leakedTrafficParameters.join(', ')}`)

console.log(`GA4 validation passed: ${measurementId}, ${requiredEvents.length} required funnel events, interaction_source guard, production-only host guard, persistent internal-test exclusion, and no raw search term collection.`)
