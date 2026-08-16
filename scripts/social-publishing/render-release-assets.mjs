import { execFileSync } from 'node:child_process'
import { copyFile, mkdir, mkdtemp, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright-core'
import { absolutePath, readJson } from './lib.mjs'

function createAudioBuffer(timeline, { sampleRate = 48_000 } = {}) {
  const durationSeconds = timeline.duration
  const frames = Math.ceil(durationSeconds * sampleRate)
  const samples = new Float32Array(frames)

  function tone(start, duration, frequency, volume = 0.06, type = 'sine') {
    const from = Math.max(0, Math.floor(start * sampleRate))
    const to = Math.min(frames, Math.floor((start + duration) * sampleRate))
    for (let frame = from; frame < to; frame += 1) {
      const elapsed = (frame - from) / sampleRate
      const progress = elapsed / duration
      const envelope = Math.sin(Math.PI * Math.min(1, progress)) ** 1.3
      const phase = 2 * Math.PI * frequency * elapsed
      const wave = type === 'square'
        ? Math.sign(Math.sin(phase))
        : type === 'triangle'
          ? (2 / Math.PI) * Math.asin(Math.sin(phase))
          : Math.sin(phase)
      samples[frame] += wave * volume * envelope
    }
  }

  const music = timeline.music || { bpm: 104, root: 55, notes: [220, 261.63, 329.63, 392] }

  // Original AimCodes synth bed. It is clearly audible, but remains under the
  // reaction cues so the green-screen and score moments stay easy to follow.
  const secondsPerBeat = 60 / music.bpm
  const beatCount = Math.ceil(durationSeconds / secondsPerBeat)
  for (let beat = 0; beat < beatCount; beat += 1) {
    const at = beat * secondsPerBeat
    tone(at, 0.18, Math.max(42, music.root * (beat % 4 === 0 ? 0.82 : 0.72)), beat % 4 === 0 ? 0.035 : 0.022, 'sine')
    tone(at + secondsPerBeat / 2, 0.035, 3600, 0.008, 'square')
    if (beat % 2 === 0) {
      const note = music.notes[(beat / 2) % music.notes.length]
      tone(at + secondsPerBeat * 0.12, secondsPerBeat * 0.62, note, 0.018, 'triangle')
    }
  }

  for (let frame = 0; frame < frames; frame += 1) {
    const elapsed = frame / sampleRate
    const fadeIn = Math.min(1, elapsed / 0.35)
    const fadeOut = Math.min(1, (durationSeconds - elapsed) / 0.45)
    const envelope = Math.max(0, Math.min(fadeIn, fadeOut))
    samples[frame] += Math.sin(2 * Math.PI * music.root * elapsed) * 0.009 * envelope
    samples[frame] += Math.sin(2 * Math.PI * music.root * 1.5 * elapsed) * 0.004 * envelope
  }

  for (const event of timeline.events) {
    if (event.kind === 'hook') {
      tone(event.at, 0.16, 440, 0.09, 'sine')
      tone(event.at + 0.12, 0.20, 660, 0.07, 'sine')
    } else if (event.kind === 'round_ready') {
      tone(event.at, 0.08, 280, 0.035, 'sine')
    } else if (event.kind === 'round_go') {
      tone(event.at, 0.13, 880, 0.12, 'square')
    } else if (event.kind === 'round_result') {
      tone(event.at, 0.10, 520, 0.075, 'sine')
    } else if (event.kind === 'final_result') {
      tone(event.at, 0.34, 392, 0.07, 'sine')
      tone(event.at + 0.12, 0.38, 588, 0.07, 'sine')
    } else if (event.kind === 'recommendation') {
      tone(event.at, 0.20, 740, 0.07, 'sine')
    } else if (event.kind === 'cta') {
      tone(event.at, 0.26, 494, 0.08, 'sine')
      tone(event.at + 0.16, 0.32, 740, 0.075, 'sine')
    }
  }

  const headerSize = 44
  const pcm = Buffer.alloc(frames * 2)
  for (let index = 0; index < frames; index += 1) {
    const sample = Math.max(-1, Math.min(1, samples[index]))
    pcm.writeInt16LE(Math.round(sample * 32767), index * 2)
  }
  const wav = Buffer.alloc(headerSize + pcm.length)
  wav.write('RIFF', 0)
  wav.writeUInt32LE(wav.length - 8, 4)
  wav.write('WAVEfmt ', 8)
  wav.writeUInt32LE(16, 16)
  wav.writeUInt16LE(1, 20)
  wav.writeUInt16LE(1, 22)
  wav.writeUInt32LE(sampleRate, 24)
  wav.writeUInt32LE(sampleRate * 2, 28)
  wav.writeUInt16LE(2, 32)
  wav.writeUInt16LE(16, 34)
  wav.write('data', 36)
  wav.writeUInt32LE(pcm.length, 40)
  pcm.copy(wav, 44)
  return wav
}

function validateTimeline(timeline, campaignId) {
  const expectedKinds = [
    'hook',
    'round_ready', 'round_go', 'round_result',
    'round_ready', 'round_go', 'round_result',
    'round_ready', 'round_go', 'round_result',
    'final_result', 'recommendation', 'cta',
  ]
  const kinds = timeline.events.map((event) => event.kind)
  if (JSON.stringify(kinds) !== JSON.stringify(expectedKinds)) {
    throw new Error(`${campaignId}: renderer audio timeline is incomplete or out of order`)
  }
  let previous = -1
  for (const event of timeline.events) {
    if (!Number.isFinite(event.at) || event.at <= previous || event.at >= timeline.duration) {
      throw new Error(`${campaignId}: invalid ${event.kind} cue at ${event.at}`)
    }
    previous = event.at
  }
}

async function renderCover(page, campaign) {
  const url = new URL('file://' + absolutePath(campaign.asset.rendererPath))
  url.search = campaign.asset.rendererQuery
  url.searchParams.set('cover', 'challenge')
  await page.goto(url.href, { waitUntil: 'load' })
  await page.waitForFunction(() => window.__promoReady === true)
  await page.evaluate(() => window.__drawPromoCover(false))
  const dataUrl = await page.locator('#promo').evaluate((canvas) => canvas.toDataURL('image/png'))
  const png = Buffer.from(dataUrl.split(',')[1], 'base64')
  const target = absolutePath(campaign.asset.localCoverPath)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, png)
  return page.evaluate(() => window.__promoAudioTimeline())
}

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

async function backupExistingAssets(campaigns) {
  const stamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-')
  const directory = absolutePath(`output/promo_assets/backups/release-assets-${stamp}`)
  let copied = 0
  for (const campaign of campaigns) {
    for (const key of ['localVideoPath', 'localCoverPath']) {
      const source = absolutePath(campaign.asset[key])
      if (!(await exists(source))) continue
      await mkdir(directory, { recursive: true })
      await copyFile(source, join(directory, `${campaign.id}-${key === 'localVideoPath' ? 'video.mp4' : 'cover.png'}`))
      copied += 1
    }
  }
  if (copied) console.log(`BACKUP ${copied} existing assets -> ${directory}`)
}

async function muxAudio(campaign, audioPath, workingDirectory) {
  const video = absolutePath(campaign.asset.localVideoPath)
  const source = join(workingDirectory, `${campaign.id}-silent.mp4`)
  const output = join(workingDirectory, `${campaign.id}-with-audio.mp4`)
  await copyFile(video, source)
  const swift = join(workingDirectory, 'mux.swift')
  const code = `
import AVFoundation
import Foundation

let args = CommandLine.arguments
let videoURL = URL(fileURLWithPath: args[1])
let audioURL = URL(fileURLWithPath: args[2])
let outputURL = URL(fileURLWithPath: args[3])
try? FileManager.default.removeItem(at: outputURL)
let videoAsset = AVURLAsset(url: videoURL)
let audioAsset = AVURLAsset(url: audioURL)
let composition = AVMutableComposition()
guard let videoSource = videoAsset.tracks(withMediaType: .video).first,
      let videoTrack = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid),
      let audioSource = audioAsset.tracks(withMediaType: .audio).first,
      let audioTrack = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) else {
  fatalError("Required media track missing")
}
let duration = videoAsset.duration
try videoTrack.insertTimeRange(CMTimeRange(start: .zero, duration: duration), of: videoSource, at: .zero)
try audioTrack.insertTimeRange(CMTimeRange(start: .zero, duration: min(duration, audioAsset.duration)), of: audioSource, at: .zero)
videoTrack.preferredTransform = videoSource.preferredTransform
guard let exporter = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality) else { fatalError("Exporter unavailable") }
exporter.outputURL = outputURL
exporter.outputFileType = .mp4
exporter.shouldOptimizeForNetworkUse = true
let semaphore = DispatchSemaphore(value: 0)
exporter.exportAsynchronously { semaphore.signal() }
semaphore.wait()
if exporter.status != .completed { fatalError(exporter.error?.localizedDescription ?? "Export failed") }
`
  await writeFile(swift, code)
  execFileSync('/usr/bin/swift', [swift, source, audioPath, output], { stdio: 'inherit' })
  await copyFile(output, video)
}

const plan = await readJson('data_raw/social-content-plan.json')
const campaigns = plan.campaigns.filter((item) => item.status === 'approved_for_draft')
await backupExistingAssets(campaigns)
const temporary = await mkdtemp(join(tmpdir(), 'aimcodes-social-'))
const browser = await chromium.launch({ channel: 'chrome', headless: true })

try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
  for (const campaign of campaigns) {
    const timeline = await renderCover(page, campaign)
    validateTimeline(timeline, campaign.id)
    const audioPath = join(temporary, `${campaign.id}-timeline-audio.wav`)
    await writeFile(audioPath, createAudioBuffer(timeline))
    await muxAudio(campaign, audioPath, temporary)
    console.log(`RENDERED ${campaign.id} timeline-synced audio + vertical cover`)
  }
} finally {
  await browser.close()
  await rm(temporary, { recursive: true, force: true })
}
