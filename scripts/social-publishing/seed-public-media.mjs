import { copyFile, mkdir, stat } from 'node:fs/promises'
import { dirname } from 'node:path'
import { absolutePath, defaultMediaMapPath, readJson, writeJson } from './lib.mjs'

const plan = await readJson('data_raw/social-content-plan.json')
const mediaMap = {}

for (const campaign of plan.campaigns.filter((item) => item.status === 'approved_for_draft')) {
  const source = absolutePath(campaign.asset.localVideoPath)
  const destinationPath = `public/media/social/${campaign.id}.mp4`
  const destination = absolutePath(destinationPath)
  const sourceInfo = await stat(source)
  if (sourceInfo.size > 25 * 1024 * 1024) {
    throw new Error(`${campaign.id}: source video exceeds the 25 MB seed limit`)
  }
  await mkdir(dirname(destination), { recursive: true })
  await copyFile(source, destination)
  mediaMap[campaign.id] = { videoUrl: `https://aimcodes.com/media/social/${campaign.id}.mp4` }
  console.log(`SEEDED ${destinationPath} (${(sourceInfo.size / 1024 / 1024).toFixed(1)} MB)`)
}

if (await (async () => {
  try {
    await stat(absolutePath(defaultMediaMapPath))
    return true
  } catch {
    return false
  }
})()) {
  console.log(`SKIP ${defaultMediaMapPath} already exists; update it manually if needed`)
} else {
  await writeJson(defaultMediaMapPath, mediaMap)
  console.log(`CREATED ${defaultMediaMapPath}`)
}
