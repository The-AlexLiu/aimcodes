import { readFile, stat } from 'node:fs/promises'
import { dirname, extname, isAbsolute, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

function absolutePath(value) {
  return isAbsolute(value) ? value : resolve(projectRoot, value)
}

function includesAtom(buffer, atom) {
  return buffer.indexOf(Buffer.from(atom, 'ascii')) !== -1
}

function readMovieDuration(buffer) {
  const marker = buffer.indexOf(Buffer.from('mvhd', 'ascii'))
  if (marker < 0 || marker + 36 > buffer.length) return null
  const version = buffer[marker + 4]
  if (version === 0) {
    const timescale = buffer.readUInt32BE(marker + 16)
    const duration = buffer.readUInt32BE(marker + 20)
    return timescale ? duration / timescale : null
  }
  if (version === 1 && marker + 40 <= buffer.length) {
    const timescale = buffer.readUInt32BE(marker + 24)
    const duration = Number(buffer.readBigUInt64BE(marker + 28))
    return timescale ? duration / timescale : null
  }
  return null
}

export async function inspectVideo(videoPath) {
  const path = absolutePath(videoPath)
  const info = await stat(path)
  if (extname(path).toLowerCase() !== '.mp4') throw new Error(`${videoPath}: release video must be MP4`)
  const buffer = await readFile(path)
  const hasAudio = includesAtom(buffer, 'soun') && (includesAtom(buffer, 'mp4a') || includesAtom(buffer, 'aac '))
  const hasVideo = includesAtom(buffer, 'vide') && (includesAtom(buffer, 'avc1') || includesAtom(buffer, 'hvc1'))
  const duration = readMovieDuration(buffer)
  return {
    bytes: info.size,
    hasAudio,
    hasVideo,
    duration: Number.isFinite(duration) ? duration : null,
  }
}

export async function inspectCover(coverPath) {
  const path = absolutePath(coverPath)
  const info = await stat(path)
  const metadata = await sharp(path).metadata()
  return { bytes: info.size, width: metadata.width, height: metadata.height, format: metadata.format }
}

export async function validateCampaignMedia(campaign) {
  const errors = []
  let video = null
  let cover = null
  try {
    video = await inspectVideo(campaign.asset.localVideoPath)
    if (!video.hasVideo) errors.push(`${campaign.id}: release file has no playable video track`)
    if (!video.hasAudio) errors.push(`${campaign.id}: release video has no audio track`)
    if (!video.duration || video.duration < 3 || video.duration > 60) {
      errors.push(`${campaign.id}: release video duration must be between 3 and 60 seconds`)
    }
  } catch (error) {
    errors.push(`${campaign.id}: video inspection failed (${error.message})`)
  }
  try {
    cover = await inspectCover(campaign.asset.localCoverPath)
    if (cover.width !== 1080 || cover.height !== 1920) {
      errors.push(`${campaign.id}: cover must be 1080 x 1920, found ${cover.width} x ${cover.height}`)
    }
    if (cover.format !== 'png') errors.push(`${campaign.id}: cover must be PNG`)
  } catch (error) {
    errors.push(`${campaign.id}: cover inspection failed (${error.message})`)
  }
  return { errors, video, cover }
}
