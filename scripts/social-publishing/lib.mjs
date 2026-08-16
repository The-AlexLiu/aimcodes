import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { dirname, isAbsolute, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateCampaignMedia } from './media-inspector.mjs'

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
export const defaultPlanPath = 'data_raw/social-content-plan.json'
export const defaultChannelMapPath = 'output/social-publishing/channel-map.json'
export const defaultMediaMapPath = 'output/social-publishing/media-map.json'
export const allowedPlatforms = ['instagram', 'tiktok', 'youtube', 'facebook']

export function absolutePath(value) {
  return isAbsolute(value) ? value : resolve(projectRoot, value)
}

export async function readJson(path) {
  return JSON.parse(await readFile(absolutePath(path), 'utf8'))
}

export async function pathExists(path) {
  try {
    await access(absolutePath(path), constants.F_OK)
    return true
  } catch {
    return false
  }
}

export async function writeJson(path, value) {
  const target = absolutePath(path)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, `${JSON.stringify(value, null, 2)}\n`, { flag: 'wx' })
}

export async function writeText(path, value) {
  const target = absolutePath(path)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, value, { flag: 'wx' })
}

export function parseArgs(argv) {
  const values = {}
  const flags = new Set()
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index]
    if (!item.startsWith('--')) continue
    const key = item.slice(2)
    const next = argv[index + 1]
    if (!next || next.startsWith('--')) flags.add(key)
    else {
      values[key] = next
      index += 1
    }
  }
  return { values, flags }
}

export function addUtm(destinationUrl, platform, campaignId) {
  const url = new URL(destinationUrl)
  url.searchParams.set('utm_source', platform)
  url.searchParams.set('utm_medium', 'organic_social')
  url.searchParams.set('utm_campaign', 'aimcodes_social')
  url.searchParams.set('utm_content', campaignId)
  return url.toString()
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function validatePlatformCopy(campaign, platform, copy, errors) {
  const prefix = `${campaign.id}.${platform}`
  if (!copy || typeof copy !== 'object') {
    errors.push(`${prefix}: missing platform copy`)
    return
  }

  if (platform === 'youtube') {
    if (!copy.title?.trim()) errors.push(`${prefix}: YouTube title is required`)
    if (copy.title?.length > 100) errors.push(`${prefix}: YouTube title exceeds 100 characters`)
    if (!copy.description?.trim()) errors.push(`${prefix}: YouTube description is required`)
    if (copy.privacy !== 'private') errors.push(`${prefix}: first-pass YouTube drafts must stay private`)
    if (copy.categoryId !== '20') errors.push(`${prefix}: AimCodes YouTube content must use Gaming category 20`)
    if (copy.madeForKids !== false) errors.push(`${prefix}: madeForKids must be explicitly false`)
    return
  }

  if (!copy.caption?.trim()) errors.push(`${prefix}: caption is required`)
  if (copy.caption?.length > 2200) errors.push(`${prefix}: caption exceeds 2200 characters`)
  if (platform === 'instagram' && !['reel', 'post'].includes(copy.type)) {
    errors.push(`${prefix}: Instagram type must be reel or post`)
  }
  if (platform === 'facebook' && !['reel', 'post'].includes(copy.type)) {
    errors.push(`${prefix}: Facebook type must be reel or post`)
  }
}

export async function validatePlan(plan, { checkLocalAssets = true } = {}) {
  const errors = []
  const warnings = []
  const ids = new Set()

  if (plan.version !== 1) errors.push('plan.version must be 1')
  if (plan.approvalPolicy !== 'buffer_draft_requires_human_review') {
    errors.push('approvalPolicy must remain buffer_draft_requires_human_review')
  }
  if (!Array.isArray(plan.campaigns) || plan.campaigns.length === 0) {
    errors.push('campaigns must contain at least one campaign')
    return { errors, warnings }
  }

  for (const campaign of plan.campaigns) {
    if (!campaign.id?.match(/^[a-z0-9-]+$/)) errors.push('campaign id must use lowercase letters, numbers, and hyphens')
    if (ids.has(campaign.id)) errors.push(`${campaign.id}: duplicate campaign id`)
    ids.add(campaign.id)
    if (!['approved_for_draft', 'needs_review', 'paused'].includes(campaign.status)) {
      errors.push(`${campaign.id}: unsupported status ${campaign.status}`)
    }
    if (!['en', 'es', 'pt-br', 'zh-cn'].includes(campaign.language)) {
      errors.push(`${campaign.id}: unsupported language ${campaign.language}`)
    }
    if (!isHttpsUrl(campaign.destinationUrl) || new URL(campaign.destinationUrl).hostname !== 'aimcodes.com') {
      errors.push(`${campaign.id}: destinationUrl must be an HTTPS aimcodes.com URL`)
    }
    if (campaign.asset?.kind !== 'video') errors.push(`${campaign.id}: only video assets are supported in v1`)
    if (!campaign.asset?.rendererPath) errors.push(`${campaign.id}: rendererPath is required`)
    if (!campaign.asset?.rendererQuery) errors.push(`${campaign.id}: rendererQuery is required`)
    if (!campaign.asset?.localVideoPath?.endsWith('.mp4')) errors.push(`${campaign.id}: localVideoPath must be an MP4`)
    if (!campaign.asset?.localCoverPath?.endsWith('.png')) errors.push(`${campaign.id}: localCoverPath must be a PNG`)
    if (!Number.isInteger(campaign.asset?.thumbnailOffsetMs) || campaign.asset.thumbnailOffsetMs < 0) {
      errors.push(`${campaign.id}: thumbnailOffsetMs must be a non-negative integer`)
    }
    if (campaign.asset?.rendererPath && !(await pathExists(campaign.asset.rendererPath))) {
      errors.push(`${campaign.id}: renderer not found at ${campaign.asset.rendererPath}`)
    }
    if (checkLocalAssets && campaign.asset?.localVideoPath && !(await pathExists(campaign.asset.localVideoPath))) {
      warnings.push(`${campaign.id}: local video is not present; regenerate it before upload`)
    }
    if (checkLocalAssets && campaign.asset?.localCoverPath && !(await pathExists(campaign.asset.localCoverPath))) {
      warnings.push(`${campaign.id}: local cover is not present; regenerate it before upload`)
    }
    if (checkLocalAssets && campaign.asset?.localVideoPath && campaign.asset?.localCoverPath
      && await pathExists(campaign.asset.localVideoPath) && await pathExists(campaign.asset.localCoverPath)) {
      const mediaValidation = await validateCampaignMedia(campaign)
      errors.push(...mediaValidation.errors)
    }

    const platforms = Object.keys(campaign.platforms || {})
    if (platforms.length === 0) errors.push(`${campaign.id}: at least one platform is required`)
    for (const platform of platforms) {
      if (!allowedPlatforms.includes(platform)) errors.push(`${campaign.id}: unsupported platform ${platform}`)
      else validatePlatformCopy(campaign, platform, campaign.platforms[platform], errors)
    }
  }

  return { errors, warnings }
}

function platformPayload(campaign, platform, channelId, videoUrl) {
  const copy = campaign.platforms[platform]
  const trackedUrl = addUtm(campaign.destinationUrl, platform, campaign.id)
  const base = {
    schedulingType: 'automatic',
    channelId,
    mode: 'addToQueue',
    source: 'aimcodes-social-agent',
    aiAssisted: true,
    saveToDraft: true,
    assets: [{ video: { url: videoUrl, metadata: {
      thumbnailOffset: campaign.asset.thumbnailOffsetMs,
      title: platform === 'youtube' ? copy.title : `${campaign.id} video`,
    } } }],
  }

  if (platform === 'instagram') return {
    ...base,
    text: `${copy.caption}\n\n${trackedUrl}`,
    metadata: { instagram: { type: copy.type, shouldShareToFeed: copy.shareToFeed, isAiGenerated: false } },
  }
  if (platform === 'tiktok') return {
    ...base,
    text: `${copy.caption}\n\n${trackedUrl}`,
    metadata: { tiktok: { isAiGenerated: copy.isAiGenerated } },
  }
  if (platform === 'youtube') return {
    ...base,
    text: `${copy.description}\n\n${trackedUrl}`,
    metadata: { youtube: {
      title: copy.title,
      privacy: copy.privacy,
      categoryId: copy.categoryId,
      license: 'youtube',
      notifySubscribers: false,
      embeddable: true,
      madeForKids: copy.madeForKids,
      isAiGenerated: false,
    } },
  }
  return {
    ...base,
    text: `${copy.caption}\n\n${trackedUrl}`,
    metadata: { facebook: { type: copy.type } },
  }
}

export function buildBundle(plan, channelMap, mediaMap) {
  const errors = []
  const posts = []
  const organizationId = channelMap.organizationId
  if (!organizationId || organizationId.startsWith('BUFFER_')) errors.push('Buffer organizationId is not configured')
  const activePlatforms = channelMap.activePlatforms || allowedPlatforms
  for (const platform of activePlatforms) {
    if (!allowedPlatforms.includes(platform)) errors.push(`Unsupported active platform: ${platform}`)
  }

  for (const campaign of plan.campaigns.filter((item) => item.status === 'approved_for_draft')) {
    const videoUrl = mediaMap[campaign.id]?.videoUrl
    const coverUrl = mediaMap[campaign.id]?.coverUrl
    if (!isHttpsUrl(videoUrl) || new URL(videoUrl).hostname === 'media.example.com') {
      errors.push(`${campaign.id}: public HTTPS videoUrl is not configured`)
      continue
    }
    if (!isHttpsUrl(coverUrl) || new URL(coverUrl).hostname === 'media.example.com') {
      errors.push(`${campaign.id}: public HTTPS coverUrl is not configured`)
      continue
    }
    for (const platform of Object.keys(campaign.platforms).filter((item) => activePlatforms.includes(item))) {
      const channelId = channelMap.channels?.[platform]
      if (!channelId || channelId.startsWith('BUFFER_')) {
        errors.push(`${campaign.id}.${platform}: Buffer channel ID is not configured`)
        continue
      }
      posts.push({
        key: `${campaign.id}--${platform}`,
        campaignId: campaign.id,
        language: campaign.language,
        platform,
        localVideoPath: campaign.asset.localVideoPath,
        localCoverPath: campaign.asset.localCoverPath,
        coverUrl,
        coverRequired: true,
        destinationUrl: campaign.destinationUrl,
        payload: platformPayload(campaign, platform, channelId, videoUrl),
      })
    }
  }
  return { errors, bundle: { version: 1, organizationId, createdAt: new Date().toISOString(), posts } }
}

export function assertDraftOnlyPayload(post) {
  const errors = []
  if (post.payload.saveToDraft !== true) errors.push(`${post.key}: saveToDraft must be true`)
  if (post.payload.mode !== 'addToQueue') errors.push(`${post.key}: mode must remain addToQueue`)
  if (post.payload.dueAt) errors.push(`${post.key}: dueAt is forbidden during draft creation`)
  if (post.payload.metadata?.youtube?.privacy !== undefined && post.payload.metadata.youtube.privacy !== 'private') {
    errors.push(`${post.key}: YouTube privacy must remain private during draft creation`)
  }
  return errors
}

export function reviewMarkdown(bundle) {
  const rows = bundle.posts.map((post) => {
    const title = post.payload.metadata?.youtube?.title || post.payload.text.split('\n')[0]
    return `| ${post.key} | ${post.language} | ${post.platform} | ${title.replaceAll('|', '\\|')} | 草稿待审 |`
  }).join('\n')
  return `# AimCodes 社媒草稿审核单\n\n- 生成时间：${bundle.createdAt}\n- 安全策略：只创建 Buffer 草稿；不排期、不公开。\n- 草稿数量：${bundle.posts.length}\n\n| 草稿 | 语言 | 平台 | 标题 / 首行 | 状态 |\n| --- | --- | --- | --- | --- |\n${rows}\n\n## 人工审核清单\n\n- [ ] 视频前 2 秒能看懂主题，画面无黑帧或错误文字\n- [ ] 视频包含原创背景节拍和测试反馈音，非静音\n- [ ] 1080 × 1920 PNG 封面已生成并检查安全区\n- [ ] 文案语言与素材语言一致，玩家口吻自然\n- [ ] 目标链接、语言路径和 UTM 正确\n- [ ] YouTube 保持 Private，其他平台保持 Buffer Draft\n- [ ] 音轨为 AimCodes 自制提示音 / 原创节拍，游戏画面和素材版权允许发布\n- [ ] 在 Buffer 内逐条预览后，才允许人工设置发布时间\n`
}
