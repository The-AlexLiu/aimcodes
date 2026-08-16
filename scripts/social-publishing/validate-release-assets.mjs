import { readJson } from './lib.mjs'
import { validateCampaignMedia } from './media-inspector.mjs'

const plan = await readJson('data_raw/social-content-plan.json')
const campaigns = plan.campaigns.filter((item) => item.status === 'approved_for_draft')
const failures = []

for (const campaign of campaigns) {
  const result = await validateCampaignMedia(campaign)
  failures.push(...result.errors)
  const audio = result.video?.hasAudio ? 'audio yes' : 'audio no'
  const cover = result.cover ? `${result.cover.width}x${result.cover.height} ${result.cover.format}` : 'cover unavailable'
  console.log(`${result.errors.length ? 'FAIL' : 'PASS'} ${campaign.id} · ${audio} · ${cover}`)
}

if (failures.length) {
  console.error(failures.map((error) => `ERROR ${error}`).join('\n'))
  process.exit(1)
}

console.log(`Validated ${campaigns.length} release videos with audio and matching vertical covers.`)
