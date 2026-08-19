import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { crosshairs } from '../src/data/crosshairs.js'
import { indexableCrosshairIds, crosshairCollections } from '../src/data/catalogManifest.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { proPlayerProfiles } from '../src/data/proPlayerProfiles.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceData = JSON.parse(await readFile(resolve(projectRoot, 'data_raw/verified-pro-crosshair-sources.json'), 'utf8'))
const sourceById = new Map((sourceData.records || []).map((item) => [item.crosshairId, item]))
const published = crosshairs.filter((item) => item.verificationStatus === 'player_source')
const errors = []
const profileById = new Map(proPlayerProfiles.map((profile) => [profile.crosshairId, profile]))

if (sourceData.schemaVersion !== 1) errors.push('unsupported source schema version')
if (!sourceData.publicationPolicy?.includes('player-controlled')) errors.push('publication policy must require a player-controlled source')
if (sourceById.size !== sourceData.records?.length) errors.push('source registry contains duplicate crosshair IDs')

for (const item of published) {
  const source = sourceById.get(item.id)
  if (!source) {
    errors.push(`${item.id}: missing source registry record`)
    continue
  }
  if (!item.isPro || !item.player) errors.push(`${item.id}: published player source must be a named pro entry`)
  if (item.code !== source.code) errors.push(`${item.id}: published code does not match source snapshot`)
  if (item.sourceUrl !== source.channelUrl) errors.push(`${item.id}: channel URL does not match source snapshot`)
  if (item.sourceEvidenceUrl !== source.evidenceUrl) errors.push(`${item.id}: evidence URL does not match source snapshot`)
  if (item.sourceDocumentUrl !== source.documentUrl) errors.push(`${item.id}: document URL does not match source snapshot`)
  if (item.sourceCommand !== source.command) errors.push(`${item.id}: command does not match source snapshot`)
  if (item.sourceUpdatedAt !== source.sourceUpdatedAt) errors.push(`${item.id}: source update time does not match snapshot`)
  if (!/^https:\/\/www\.twitch\.tv\//.test(source.channelUrl || '')) errors.push(`${item.id}: channel URL must be a Twitch HTTPS URL`)
  if (!/^https:\/\/api\.streamelements\.com\//.test(source.evidenceUrl || '')) errors.push(`${item.id}: evidence URL must be a StreamElements HTTPS endpoint`)
  if (!/^\d{4}-\d{2}-\d{2}T/.test(source.sourceUpdatedAt || '')) errors.push(`${item.id}: sourceUpdatedAt must be an ISO timestamp`)
  if (!indexableCrosshairIds.includes(item.id)) errors.push(`${item.id}: verified player page must be indexable`)
  if (!crosshairCollections.pro.crosshairIds.includes(item.id)) errors.push(`${item.id}: verified player page must be linked from the pro collection`)
  const profile = profileById.get(item.id)
  if (!profile) {
    errors.push(`${item.id}: missing player profile`)
  } else {
    for (const key of ['realName', 'countryCode', 'team', 'roleKey', 'statusKey', 'highlightKey', 'image', 'imageSourceUrl', 'profileSourceUrl', 'checkedAt']) {
      if (!profile[key]) errors.push(`${item.id}: player profile is missing ${key}`)
    }
    if (!/^https:\/\//.test(profile.imageSourceUrl || '')) errors.push(`${item.id}: image source must be an HTTPS URL`)
    if (!/^https:\/\//.test(profile.profileSourceUrl || '')) errors.push(`${item.id}: profile source must be an HTTPS URL`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(profile.checkedAt || '')) errors.push(`${item.id}: checkedAt must use YYYY-MM-DD`)
    if (!/^\/images\/players\/[a-z0-9-]+\.png$/.test(profile.image || '')) errors.push(`${item.id}: player image must use the local player image directory`)
    else {
      try {
        await access(resolve(projectRoot, `public${profile.image}`))
      } catch {
        errors.push(`${item.id}: local player image does not exist`)
      }
    }
  }
  try {
    const parsed = parseCrosshairCode(item.code, { fallbackColor: item.color })
    if (![parsed.settings.dot, parsed.settings.inner, parsed.settings.outer].some((part) => part.enabled)) errors.push(`${item.id}: code has no visible primary component`)
  } catch (error) {
    errors.push(`${item.id}: source code fails parser (${error.code || error.message})`)
  }
}

for (const source of sourceData.records || []) {
  if (!published.some((item) => item.id === source.crosshairId)) errors.push(`${source.crosshairId}: source snapshot is not represented in the published catalog`)
}

if (errors.length) {
  console.error(`Verified pro validation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`Verified pro validation passed: ${published.length} player-controlled source snapshots match published, indexable pro profiles with sourced player facts and local portraits.`)
