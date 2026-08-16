import assert from 'node:assert/strict'
import { stat } from 'node:fs/promises'
import { readJson, absolutePath } from './lib.mjs'
import { validateCampaignMedia } from './media-inspector.mjs'

const plan = await readJson('data_raw/social-content-plan.json')
let totalBytes = 0

for (const campaign of plan.campaigns.filter((item) => item.status === 'approved_for_draft')) {
  const videoPath = `public/media/social/${campaign.id}.mp4`
  const coverPath = `public/media/social/${campaign.id}-cover.png`
  const info = await stat(absolutePath(videoPath))
  assert.ok(info.size > 100_000, `${videoPath} is unexpectedly small`)
  assert.ok(info.size < 25 * 1024 * 1024, `${videoPath} exceeds the 25 MB seed limit`)
  totalBytes += info.size
  const result = await validateCampaignMedia({
    ...campaign,
    asset: { ...campaign.asset, localVideoPath: videoPath, localCoverPath: coverPath },
  })
  assert.deepEqual(result.errors, [], result.errors.join('\n'))
}

console.log(`Validated ${plan.campaigns.length} public social videos with audio and vertical covers (${(totalBytes / 1024 / 1024).toFixed(1)} MB total).`)
