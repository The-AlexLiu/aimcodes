import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { chromium } from 'playwright-core'
import { absolutePath, parseArgs, readJson } from './lib.mjs'

const { values } = parseArgs(process.argv.slice(2))
const count = Math.max(1, Math.min(12, Number(values.count) || 4))
const batchSeed = values.seed || new Date().toISOString().slice(0, 10)
const plan = await readJson('data_raw/social-content-plan.json')
const campaigns = plan.campaigns.filter((item) => item.status === 'approved_for_draft')
const output = {
  version: 1,
  generatedAt: new Date().toISOString(),
  batchSeed,
  variantsPerLanguage: count,
  items: [],
}

const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  for (const campaign of campaigns) {
    for (let index = 1; index <= count; index += 1) {
      const seed = `${batchSeed}-${campaign.language}-${String(index).padStart(2, '0')}`
      const url = new URL('file://' + absolutePath(campaign.asset.rendererPath))
      url.search = campaign.asset.rendererQuery
      url.searchParams.set('seed', seed)
      url.searchParams.set('auto', '1')
      url.searchParams.delete('crosshair')
      url.searchParams.delete('scores')
      url.searchParams.delete('cover')
      await page.goto(url.href, { waitUntil: 'load' })
      await page.waitForFunction(() => window.__promoReady === true)
      const creative = await page.evaluate(() => window.__promoCreative())
      const timeline = await page.evaluate(() => window.__promoAudioTimeline())
      output.items.push({
        id: `${campaign.id}-${String(index).padStart(2, '0')}`,
        campaignId: campaign.id,
        language: campaign.language,
        seed,
        rendererQuery: url.searchParams.toString(),
        variant: creative.variant,
        music: creative.music,
        crosshair: creative.crosshair,
        scores: creative.scores,
        average: creative.average,
        rank: creative.rank,
        coverStyle: creative.coverStyle,
        socialCopy: creative.socialCopy,
        timelineDuration: timeline.duration,
      })
    }
  }
} finally {
  await browser.close()
}

for (const campaign of campaigns) {
  const variants = output.items.filter((item) => item.campaignId === campaign.id)
  const uniqueQueries = new Set(variants.map((item) => item.rendererQuery))
  const uniqueCopies = new Set(variants.map((item) => item.socialCopy))
  const uniqueVideoInputs = new Set(variants.map((item) => JSON.stringify({
    crosshair: item.crosshair,
    scores: item.scores,
    variant: item.variant,
    coverStyle: item.coverStyle,
  })))
  if (uniqueQueries.size !== variants.length || uniqueCopies.size !== variants.length || uniqueVideoInputs.size !== variants.length) {
    throw new Error(`Duplicate creative detected for ${campaign.language}; choose a different --seed and regenerate`)
  }
}

const target = absolutePath(values.out || `output/social-publishing/creative-batches/${batchSeed}.json`)
await mkdir(dirname(target), { recursive: true })
await writeFile(target, `${JSON.stringify(output, null, 2)}\n`, { flag: 'wx' })
console.log(`Generated ${output.items.length} reproducible creative variants -> ${target}`)
