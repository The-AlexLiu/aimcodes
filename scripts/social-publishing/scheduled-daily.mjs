import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { chromium } from 'playwright-core'
import { absolutePath } from './lib.mjs'
import { inspectCover, inspectVideo } from './media-inspector.mjs'

const TIMEZONE_OFFSET_HOURS = 8
const MINIMUM_LEAD_MINUTES = 30
const COPY_MODEL = process.env.SOCIAL_COPY_MODEL || 'gemini-2.5-flash-lite'
const VISION_MODEL = process.env.SOCIAL_VISION_MODEL || 'qwen3-vl-flash'
const QUALITY_THRESHOLD = Number(process.env.SOCIAL_QUALITY_THRESHOLD || 90)
const writeEnabled = process.env.AIMCODES_SOCIAL_ALLOW_SCHEDULE === 'YES'
const requestedDate = process.env.SOCIAL_SCHEDULE_DATE?.trim()

const slots = [
  { platform: 'tiktok', hour: 12, minute: 30, channelVariable: 'BUFFER_TIKTOK_CHANNEL_ID' },
  { platform: 'instagram', hour: 19, minute: 30, channelVariable: 'BUFFER_INSTAGRAM_CHANNEL_ID' },
  { platform: 'youtube', hour: 22, minute: 30, channelVariable: 'BUFFER_YOUTUBE_CHANNEL_ID' },
]

function required(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function beijingParts(date = new Date()) {
  const shifted = new Date(date.getTime() + TIMEZONE_OFFSET_HOURS * 60 * 60 * 1000)
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  }
}

function addDays(parts, days) {
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days))
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() }
}

function parseDate(value) {
  if (!value) return beijingParts()
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) throw new Error('SOCIAL_SCHEDULE_DATE must use YYYY-MM-DD')
  const parts = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) }
  const check = new Date(Date.UTC(parts.year, parts.month - 1, parts.day))
  if (check.getUTCFullYear() !== parts.year || check.getUTCMonth() + 1 !== parts.month || check.getUTCDate() !== parts.day) {
    throw new Error('SOCIAL_SCHEDULE_DATE is not a valid date')
  }
  return parts
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function dateToken(parts) {
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`
}

function dueAtFor(slot) {
  let parts = parseDate(requestedDate)
  let due = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, slot.hour - TIMEZONE_OFFSET_HOURS, slot.minute))
  if (!requestedDate && due.getTime() <= Date.now() + MINIMUM_LEAD_MINUTES * 60 * 1000) {
    parts = addDays(parts, 1)
    due = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, slot.hour - TIMEZONE_OFFSET_HOURS, slot.minute))
  }
  if (due.getTime() <= Date.now() + MINIMUM_LEAD_MINUTES * 60 * 1000) {
    throw new Error(`${slot.platform}: scheduled time needs at least ${MINIMUM_LEAD_MINUTES} minutes of lead time`)
  }
  return { dueAt: due.toISOString(), localDate: dateToken(parts) }
}

function safeToken(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
}

function base64DataUrl(path, mime = 'image/png') {
  return readFile(path).then((buffer) => `data:${mime};base64,${buffer.toString('base64')}`)
}

function extractJson(text) {
  const cleaned = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start < 0 || end <= start) throw new Error('Model did not return a JSON object')
  return JSON.parse(cleaned.slice(start, end + 1))
}

async function callModel({ model, prompt, images = [] }) {
  const apiKey = required('AIHUBMIX_API_KEY')
  const content = [{ type: 'text', text: prompt }]
  for (const image of images) content.push({ type: 'image_url', image_url: { url: image } })
  const response = await fetch('https://aihubmix.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, temperature: 0.35, messages: [{ role: 'user', content }] }),
    signal: AbortSignal.timeout(90_000),
  })
  const raw = await response.text()
  if (!response.ok) throw new Error(`${model} request failed with HTTP ${response.status}: ${raw.slice(0, 240)}`)
  const payload = JSON.parse(raw)
  const message = payload.choices?.[0]?.message?.content
  const text = Array.isArray(message) ? message.map((item) => item.text || '').join('') : message
  return extractJson(text)
}

async function writeCanvasPng(page, path, drawExpression) {
  const dataUrl = await page.evaluate(drawExpression)
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, Buffer.from(dataUrl.split(',')[1], 'base64'))
}

async function renderCreative(browser, { platform, seed, directory }) {
  const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1280, height: 900 } })
  const url = new URL(`file://${absolutePath('public/tools/social-renderer/index.html')}`)
  url.searchParams.set('lang', 'en')
  url.searchParams.set('platform', platform)
  url.searchParams.set('auto', '1')
  url.searchParams.set('seed', seed)
  url.searchParams.set('coverFrame', '1')
  url.searchParams.set('format', 'mp4')
  await page.goto(url.href, { waitUntil: 'load' })
  await page.waitForFunction(() => window.__promoReady === true)
  const supported = await page.evaluate(() => window.__supportedPromoVideoTypes?.mp4 || '')
  if (!supported.includes('video/mp4')) throw new Error(`${platform}: Chrome cannot render MP4 in this runner`)

  const creative = await page.evaluate(() => window.__promoCreative())
  const duration = await page.evaluate(() => window.__promoVideoDuration())
  const coverPath = resolve(directory, 'cover.png')
  await writeCanvasPng(page, coverPath, () => {
    window.__drawPromoCover(false)
    return document.querySelector('#promo').toDataURL('image/png')
  })

  const frameTimes = [0.7, 2.8, 5.7, 8.8, Math.min(11.5, duration - 0.2)]
  const framePaths = frameTimes.map((_, index) => resolve(directory, `frame-${index + 1}.png`))
  for (let index = 0; index < frameTimes.length; index += 1) {
    const dataUrl = await page.evaluate((time) => {
      window.__drawPromoVideoFrame(time, false)
      return document.querySelector('#promo').toDataURL('image/png')
    }, frameTimes[index])
    await writeFile(framePaths[index], Buffer.from(dataUrl.split(',')[1], 'base64'))
  }

  const sourceVideoPath = resolve(directory, 'video-source.mp4')
  const videoPath = resolve(directory, 'video.mp4')
  const downloadPromise = page.waitForEvent('download', { timeout: 90_000 })
  await page.click('#render-video')
  const download = await downloadPromise
  await download.saveAs(sourceVideoPath)
  const renderMetadata = await page.evaluate(() => ({
    mime: window.__videoMime,
    bytes: window.__videoBlobSize,
    hasAudio: window.__videoHasAudio,
  }))
  await page.close()
  run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', sourceVideoPath,
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '20', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', videoPath,
  ])
  return { creative, duration, coverPath, framePaths, videoPath, renderMetadata }
}

function validateCopy(copy, platform, creative) {
  const errors = []
  const caption = String(copy.caption || '').trim()
  if (caption.length < 45 || caption.length > 520) errors.push('caption length must be 45-520 characters')
  if (/https?:\/\/|www\./i.test(caption)) errors.push('caption must not contain a raw URL')
  if (!caption.includes(String(creative.average))) errors.push('caption must include the actual average score')
  if (!caption.toLowerCase().includes(String(creative.crosshair).replaceAll('-', ' ').split(' ')[0].toLowerCase())) {
    errors.push('caption must mention the rendered crosshair')
  }
  const hashtags = caption.match(/#[A-Za-z0-9_]+/g) || []
  if (hashtags.length < 2 || hashtags.length > 5) errors.push('caption must contain 2-5 hashtags')
  if (platform === 'youtube') {
    if (!copy.title?.trim() || copy.title.length > 100) errors.push('YouTube title must be 1-100 characters')
    if (!copy.description?.trim() || copy.description.length > 1200) errors.push('YouTube description must be 1-1200 characters')
  }
  return errors
}

async function generateCopy(platform, creative, seed) {
  const prompt = `You are the English social editor for AimCodes, a VALORANT crosshair and reaction-test site.
Create platform-native copy for one short video. Return JSON only with keys: caption, title, description.

Facts that MUST remain exact:
- platform: ${platform}
- scores: ${creative.scores.join(' / ')} ms
- average: ${creative.average} ms
- reaction rank: ${creative.rank}
- matched crosshair id: ${creative.crosshair}
- creative seed: ${seed}

Requirements:
- Sound like a real VALORANT player, playful and concise, not corporate.
- Caption must mention ${creative.average} ms and the crosshair name.
- Caption must contain 2-5 relevant hashtags.
- Never place a raw URL in the caption. Instagram and TikTok use “link in bio”.
- Avoid unsupported claims, spam, keyword stuffing, fake urgency, and repeating the renderer draft verbatim.
- For YouTube, title <= 70 characters and description <= 600 characters. A single clean URL may appear only in the YouTube description: https://aimcodes.com/en/reaction-time-test/
- For Instagram/TikTok, title and description may be empty strings.

Renderer draft for inspiration only:
${creative.socialCopy}`
  return callModel({ model: COPY_MODEL, prompt })
}

async function reviewVisuals({ platform, creative, coverPath, framePaths, renderMetadata }) {
  const images = await Promise.all([coverPath, ...framePaths].map((path) => base64DataUrl(path)))
  const prompt = `Act as a strict mobile-video QA reviewer for an AimCodes VALORANT short.
Image 1 is the vertical cover. Images 2-6 are chronological frames from the 13-second video.
Return JSON only with keys: pass (boolean), score (integer 0-100), issues (array of short strings), summary (string).

Rendered facts: platform=${platform}; scores=${creative.scores.join('/')}; average=${creative.average}; rank=${creative.rank}; crosshair=${creative.crosshair}; audio=${renderMetadata.hasAudio}.
Fail if any frame is blank, text is clipped/overlapping/illegible, the UI looks unfinished, scores appear before a click result, the cover is weak, the sequence is incoherent, or visible facts contradict the rendered facts. Ignore normal differences between frames. Passing requires a score of at least ${QUALITY_THRESHOLD}.`
  const review = await callModel({ model: VISION_MODEL, prompt, images })
  review.score = Number(review.score)
  review.pass = review.pass === true && Number.isFinite(review.score) && review.score >= QUALITY_THRESHOLD
  review.issues = Array.isArray(review.issues) ? review.issues : ['Vision model returned malformed issues']
  return review
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', env: process.env, ...options })
  if (result.status !== 0) throw new Error(`${command} failed: ${(result.stderr || result.stdout || '').trim().slice(0, 600)}`)
  return result.stdout.trim()
}

async function uploadR2(path, key, contentType) {
  const endpoint = required('R2_ENDPOINT').replace(/\/$/, '')
  const bucket = required('R2_BUCKET')
  const accessKey = required('R2_ACCESS_KEY_ID')
  const secret = required('R2_SECRET_ACCESS_KEY')
  run('curl', [
    '--fail', '--silent', '--show-error', '--retry', '3',
    '--aws-sigv4', 'aws:amz:auto:s3', '--user', `${accessKey}:${secret}`,
    '-H', `Content-Type: ${contentType}`, '--upload-file', path,
    `${endpoint}/${bucket}/${key}`,
  ])
  const publicUrl = `${required('R2_PUBLIC_BASE_URL').replace(/\/$/, '')}/${key}`
  run('curl', ['--fail', '--silent', '--show-error', '--retry', '3', '--head', publicUrl])
  return publicUrl
}

function bufferPayload({ slot, copy, creative, videoUrl, dueAt }) {
  const channelId = required(slot.channelVariable)
  const common = {
    schedulingType: 'automatic',
    dueAt,
    channelId,
    mode: 'customScheduled',
    source: 'aimcodes-social-automation',
    aiAssisted: true,
    saveToDraft: false,
    text: slot.platform === 'youtube' ? copy.description : copy.caption,
    assets: [{ video: { url: videoUrl, metadata: { thumbnailOffset: 12_050, title: copy.title || `${creative.average} ms AimCodes challenge` } } }],
  }
  if (slot.platform === 'instagram') {
    common.metadata = { instagram: { type: 'reel', shouldShareToFeed: true, isAiGenerated: false } }
  } else if (slot.platform === 'tiktok') {
    common.metadata = { tiktok: { isAiGenerated: false } }
  } else {
    common.metadata = { youtube: {
      title: copy.title,
      privacy: 'public',
      categoryId: '20',
      license: 'youtube',
      notifySubscribers: false,
      embeddable: true,
      madeForKids: false,
      isAiGenerated: false,
    } }
  }
  return common
}

async function alreadyCompleted(url) {
  const response = await fetch(url, { method: 'HEAD' })
  return response.ok
}

async function scheduleWithBuffer(payload, payloadPath) {
  await writeFile(payloadPath, `${JSON.stringify(payload, null, 2)}\n`)
  if (!writeEnabled) {
    run('buffer', ['posts', 'create', '--input', payloadPath, '--dry-run', '--output', 'json', '--no-color'])
    return { mode: 'dry-run', status: 'validated' }
  }
  const response = run('buffer', ['posts', 'create', '--input', payloadPath, '--output', 'json', '--no-color'])
  return JSON.parse(response)
}

for (const name of [
  'AIHUBMIX_API_KEY', 'BUFFER_API_KEY', 'R2_ENDPOINT', 'R2_BUCKET', 'R2_PUBLIC_BASE_URL',
  'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'BUFFER_INSTAGRAM_CHANNEL_ID',
  'BUFFER_TIKTOK_CHANNEL_ID', 'BUFFER_YOUTUBE_CHANNEL_ID',
]) required(name)

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const summary = { generatedAt: new Date().toISOString(), writeEnabled, copyModel: COPY_MODEL, visionModel: VISION_MODEL, posts: [] }

try {
  for (const slot of slots) {
    const schedule = dueAtFor(slot)
    const prefix = `social/${schedule.localDate}/${slot.platform}`
    const manifestUrl = `${required('R2_PUBLIC_BASE_URL').replace(/\/$/, '')}/${prefix}/manifest.json`
    if (await alreadyCompleted(manifestUrl)) {
      console.log(`SKIP ${slot.platform}: ${schedule.localDate} is already scheduled`)
      summary.posts.push({ platform: slot.platform, status: 'already_scheduled', dueAt: schedule.dueAt, manifestUrl })
      continue
    }

    const seed = safeToken(`${schedule.localDate}-${slot.platform}-daily`)
    const directory = absolutePath(`output/social-publishing/scheduled/${schedule.localDate}/${slot.platform}`)
    await mkdir(directory, { recursive: true })
    console.log(`RENDER ${slot.platform} -> ${schedule.dueAt}`)
    const rendered = await renderCreative(browser, { platform: slot.platform, seed, directory })
    const [video, cover] = await Promise.all([inspectVideo(rendered.videoPath), inspectCover(rendered.coverPath)])
    const deterministicErrors = []
    if (!video.hasVideo || !video.hasAudio) deterministicErrors.push('MP4 must contain video and audio tracks')
    if (!video.duration || video.duration < 12 || video.duration > 14.5) deterministicErrors.push(`unexpected duration: ${video.duration}`)
    if (cover.width !== 1080 || cover.height !== 1920 || cover.format !== 'png') deterministicErrors.push('cover must be a 1080x1920 PNG')
    if (!rendered.renderMetadata.hasAudio) deterministicErrors.push('renderer reported a missing audio track')
    if (deterministicErrors.length) throw new Error(`${slot.platform}: ${deterministicErrors.join('; ')}`)

    const copy = await generateCopy(slot.platform, rendered.creative, seed)
    const copyErrors = validateCopy(copy, slot.platform, rendered.creative)
    if (copyErrors.length) throw new Error(`${slot.platform}: copy QA failed: ${copyErrors.join('; ')}`)
    const visualReview = await reviewVisuals({ platform: slot.platform, ...rendered })
    await writeFile(resolve(directory, 'quality-review.json'), `${JSON.stringify({ deterministicErrors, copyErrors, visualReview }, null, 2)}\n`)
    if (!visualReview.pass) throw new Error(`${slot.platform}: visual QA blocked scheduling (${visualReview.score}/100): ${visualReview.issues.join('; ')}`)

    const fingerprint = createHash('sha256').update(await readFile(rendered.videoPath)).digest('hex').slice(0, 16)
    const videoKey = `${prefix}/${fingerprint}.mp4`
    const coverKey = `${prefix}/${fingerprint}-cover.png`
    const [videoUrl, coverUrl] = await Promise.all([
      uploadR2(rendered.videoPath, videoKey, 'video/mp4'),
      uploadR2(rendered.coverPath, coverKey, 'image/png'),
    ])
    const payload = bufferPayload({ slot, copy, creative: rendered.creative, videoUrl, dueAt: schedule.dueAt })
    const bufferResult = await scheduleWithBuffer(payload, resolve(directory, 'buffer-payload.json'))
    const manifest = {
      version: 1,
      platform: slot.platform,
      dueAt: schedule.dueAt,
      seed,
      fingerprint,
      videoUrl,
      coverUrl,
      creative: rendered.creative,
      copy,
      quality: visualReview,
      bufferResult,
      scheduled: writeEnabled,
      createdAt: new Date().toISOString(),
    }
    const manifestPath = resolve(directory, 'manifest.json')
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
    if (writeEnabled) await uploadR2(manifestPath, `${prefix}/manifest.json`, 'application/json')
    summary.posts.push({ platform: slot.platform, status: writeEnabled ? 'scheduled' : 'dry_run', dueAt: schedule.dueAt, qualityScore: visualReview.score, videoUrl, coverUrl })
    console.log(`PASS ${slot.platform}: quality ${visualReview.score}/100 · ${writeEnabled ? 'scheduled' : 'dry-run'}`)
  }
} finally {
  await browser.close()
}

const summaryPath = absolutePath('output/social-publishing/scheduled/latest-summary.json')
await mkdir(dirname(summaryPath), { recursive: true })
await writeFile(summaryPath, `${JSON.stringify(summary, null, 2)}\n`)
console.log(`SUMMARY ${summaryPath}`)
