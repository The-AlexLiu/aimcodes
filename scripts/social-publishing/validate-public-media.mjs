import assert from 'node:assert/strict'
import { stat } from 'node:fs/promises'
import { readJson, absolutePath } from './lib.mjs'

const plan = await readJson('data_raw/social-content-plan.json')
let totalBytes = 0

for (const campaign of plan.campaigns.filter((item) => item.status === 'approved_for_draft')) {
  const path = `public/media/social/${campaign.id}.mp4`
  const info = await stat(absolutePath(path))
  assert.ok(info.size > 100_000, `${path} is unexpectedly small`)
  assert.ok(info.size < 25 * 1024 * 1024, `${path} exceeds the 25 MB seed limit`)
  totalBytes += info.size
}

console.log(`Validated ${plan.campaigns.length} public social videos (${(totalBytes / 1024 / 1024).toFixed(1)} MB total).`)
