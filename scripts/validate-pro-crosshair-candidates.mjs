import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const data = JSON.parse(await readFile(resolve(projectRoot, 'data_processed/pro-crosshair-candidates.json'), 'utf8'))
const errorData = JSON.parse(await readFile(resolve(projectRoot, 'data_processed/pro-crosshair-errors.json'), 'utf8'))
const errors = []
const playerIds = new Set()

if (data.schemaVersion !== 1) errors.push('unsupported candidate schema version')
if (!data.publicationPolicy?.includes('primary source')) errors.push('publication policy must require a primary source')

for (const item of data.candidates || []) {
  if (!item.playerId || playerIds.has(item.playerId)) errors.push(`missing or duplicate playerId: ${item.playerId || '(empty)'}`)
  playerIds.add(item.playerId)
  if (!/^https:\/\//.test(item.sourceUrl || '')) errors.push(`${item.playerId}: missing HTTPS source URL`)
  if (item.status === 'verified' || item.status === 'publishable') errors.push(`${item.playerId}: automated collector may not publish or verify records`)
  if (item.parserStatus === 'accepted') {
    try {
      const parsed = parseCrosshairCode(item.code)
      if (![parsed.settings.dot, parsed.settings.inner, parsed.settings.outer].some((part) => part.enabled)) errors.push(`${item.playerId}: code has no visible component`)
    } catch (error) {
      errors.push(`${item.playerId}: accepted code fails parser (${error.code || error.message})`)
    }
  }
}

if (data.summary?.discovered !== data.candidates?.length) errors.push('summary discovered count does not match candidates')
const expectedErrorRows = data.candidates.filter((item) => item.status !== 'needs_primary_source')
if (errorData.count !== expectedErrorRows.length || errorData.errorRows?.length !== expectedErrorRows.length) {
  errors.push('error output count does not match rejected candidates')
}
if (expectedErrorRows.some((item, index) => item.sourceUrl !== errorData.errorRows?.[index]?.sourceUrl)) {
  errors.push('error output rows do not match rejected candidates')
}
if (errors.length) {
  console.error(`Pro candidate validation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log(`Pro candidate validation passed: ${data.candidates.length} research leads; none are auto-verified or auto-published.`)
