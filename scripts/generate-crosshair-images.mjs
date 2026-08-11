import { mkdir, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { crosshairs } from '../src/data/crosshairs.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { crosshairSlug, SEO_COLLECTIONS, SEO_CROSSHAIR_IDS } from '../src/seo/routes.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicRoot = resolve(projectRoot, 'public')
const crosshairImageRoot = resolve(publicRoot, 'images/crosshairs')
const crosshairOgRoot = resolve(publicRoot, 'images/og/crosshairs')
const collectionOgRoot = resolve(publicRoot, 'images/og/collections')
const backgroundPath = resolve(projectRoot, 'src/assets/maps/ascent.jpg')
const brandMarkPath = resolve(publicRoot, 'brand/aimcodes-logo-transparent-v2.png')

const [backgroundBuffer, brandMarkBuffer] = await Promise.all([
  readFile(backgroundPath),
  readFile(brandMarkPath),
])
const backgroundDataUrl = `data:image/jpeg;base64,${backgroundBuffer.toString('base64')}`
const brandMarkDataUrl = `data:image/png;base64,${brandMarkBuffer.toString('base64')}`

await Promise.all([
  mkdir(crosshairImageRoot, { recursive: true }),
  mkdir(crosshairOgRoot, { recursive: true }),
  mkdir(collectionOgRoot, { recursive: true }),
])

const round = (value) => Number(Number(value).toFixed(2))

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function rectSvg({ x, y, width, height, color, opacity, outline, outlineWidth }) {
  const w = Math.max(1, round(width))
  const h = Math.max(1, round(height))
  const left = round(x - w / 2)
  const top = round(y - h / 2)
  const blocks = []

  if (outline.enabled) {
    blocks.push(`<rect x="${round(left - outlineWidth)}" y="${round(top - outlineWidth)}" width="${round(w + outlineWidth * 2)}" height="${round(h + outlineWidth * 2)}" fill="#080a0d" fill-opacity="${outline.opacity}" />`)
  }
  blocks.push(`<rect x="${left}" y="${top}" width="${w}" height="${h}" fill="${escapeAttribute(color)}" fill-opacity="${opacity}" />`)
  return blocks.join('')
}

function lineSetSvg(centerX, centerY, line, color, scale, outline) {
  if (!line?.enabled) return ''
  const horizontalLength = Math.max(1, line.horizontalLength * scale)
  const verticalLength = Math.max(1, line.verticalLength * scale)
  const thickness = Math.max(1, line.thickness * scale)
  const horizontalOffset = line.offset * scale + horizontalLength / 2
  const verticalOffset = line.offset * scale + verticalLength / 2
  const outlineWidth = Math.max(1, outline.thickness * Math.max(1, scale * 0.32))
  const options = { color, opacity: line.opacity, outline, outlineWidth }

  return [
    rectSvg({ ...options, x: centerX, y: centerY - verticalOffset, width: thickness, height: verticalLength }),
    rectSvg({ ...options, x: centerX, y: centerY + verticalOffset, width: thickness, height: verticalLength }),
    rectSvg({ ...options, x: centerX - horizontalOffset, y: centerY, width: horizontalLength, height: thickness }),
    rectSvg({ ...options, x: centerX + horizontalOffset, y: centerY, width: horizontalLength, height: thickness }),
  ].join('')
}

function crosshairSvg(crosshair, centerX, centerY, baseScale) {
  const parsed = parseCrosshairCode(crosshair.code, { fallbackColor: crosshair.color })
  const scale = Math.min(18, baseScale * Math.max(1, crosshair.previewScale || 1))
  const { settings } = parsed
  const blocks = [
    lineSetSvg(centerX, centerY, settings.outer, parsed.color, scale, settings.outline),
    lineSetSvg(centerX, centerY, settings.inner, parsed.color, scale, settings.outline),
  ]

  if (settings.dot?.enabled) {
    const size = Math.max(1, settings.dot.size * scale)
    const outlineWidth = Math.max(1, settings.outline.thickness * Math.max(1, scale * 0.32))
    blocks.push(rectSvg({
      x: centerX,
      y: centerY,
      width: size,
      height: size,
      color: parsed.color,
      opacity: settings.dot.opacity,
      outline: settings.outline,
      outlineWidth,
    }))
  }

  return blocks.join('')
}

function cornerMarks(width, height, inset, length) {
  const right = width - inset
  const bottom = height - inset
  return `<g fill="none" stroke="#ff5b57" stroke-width="6" stroke-linecap="square" opacity="0.96">
    <path d="M ${inset} ${inset + length} V ${inset} H ${inset + length}" />
    <path d="M ${right - length} ${inset} H ${right} V ${inset + length}" />
    <path d="M ${inset} ${bottom - length} V ${bottom} H ${inset + length}" />
    <path d="M ${right - length} ${bottom} H ${right} V ${bottom - length}" />
  </g>`
}

function previewSvg(crosshair, width, height, { square = false } = {}) {
  const centerX = width / 2
  const centerY = height / 2
  const logoSize = square ? 92 : 72
  const cornerInset = square ? 48 : 34
  const vignette = square ? 0.5 : 0.42
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <radialGradient id="focus" cx="50%" cy="50%" r="62%">
        <stop offset="0" stop-color="#091116" stop-opacity="0" />
        <stop offset="1" stop-color="#05090d" stop-opacity="${vignette}" />
      </radialGradient>
      <filter id="crosshairGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="2.2" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="#091116" />
    <image href="${backgroundDataUrl}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" />
    <rect width="${width}" height="${height}" fill="url(#focus)" />
    <g filter="url(#crosshairGlow)">${crosshairSvg(crosshair, centerX, centerY, square ? 10 : 8)}</g>
    ${cornerMarks(width, height, cornerInset, square ? 70 : 52)}
    <rect x="${cornerInset}" y="${cornerInset}" width="${logoSize}" height="${logoSize}" rx="18" fill="#071015" fill-opacity="0.82" stroke="#ff5b57" stroke-opacity="0.48" />
    <image href="${brandMarkDataUrl}" x="${cornerInset + 10}" y="${cornerInset + 10}" width="${logoSize - 20}" height="${logoSize - 20}" preserveAspectRatio="xMidYMid meet" />
  </svg>`)
}

async function createCrosshairImages(crosshair) {
  const slug = crosshairSlug(crosshair.id)
  const squareSvg = previewSvg(crosshair, 1080, 1080, { square: true })
  const ogSvg = previewSvg(crosshair, 1200, 630)

  await Promise.all([
    sharp(squareSvg).webp({ quality: 86, effort: 5 }).toFile(resolve(crosshairImageRoot, `${slug}.webp`)),
    sharp(ogSvg).jpeg({ quality: 88, chromaSubsampling: '4:4:4', mozjpeg: true }).toFile(resolve(crosshairOgRoot, `${slug}.jpg`)),
  ])
}

function collectionTileSvg(crosshair, x, y, width, height) {
  const centerX = x + width / 2
  const centerY = y + height / 2
  return `<g>
    <clipPath id="tile-${escapeAttribute(crosshair.id)}"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="22" /></clipPath>
    <g clip-path="url(#tile-${escapeAttribute(crosshair.id)})">
      <image href="${backgroundDataUrl}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" />
      <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#050b0f" fill-opacity="0.34" />
      <g>${crosshairSvg(crosshair, centerX, centerY, 7.2)}</g>
    </g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="22" fill="none" stroke="#46535e" stroke-width="2" />
  </g>`
}

function collectionSvg(collection) {
  const items = collection.crosshairIds
    .map((id) => crosshairs.find((crosshair) => crosshair.id === id))
    .filter(Boolean)
    .slice(0, 4)
  const positions = [
    [52, 52], [610, 52], [52, 326], [610, 326],
  ]
  const tiles = items.map((crosshair, index) => collectionTileSvg(crosshair, ...positions[index], 538, 252)).join('')
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#071015" />
    <defs><radialGradient id="collectionGlow" cx="50%" cy="15%" r="80%"><stop offset="0" stop-color="#ff5b57" stop-opacity="0.16" /><stop offset="1" stop-color="#071015" stop-opacity="0" /></radialGradient></defs>
    <rect width="1200" height="630" fill="url(#collectionGlow)" />
    ${tiles}
    ${cornerMarks(1200, 630, 24, 44)}
    <rect x="548" y="268" width="104" height="94" rx="24" fill="#071015" stroke="#ff5b57" stroke-width="3" />
    <image href="${brandMarkDataUrl}" x="562" y="275" width="76" height="76" preserveAspectRatio="xMidYMid meet" />
  </svg>`)
}

const imageCrosshairs = SEO_CROSSHAIR_IDS
  .map((id) => crosshairs.find((crosshair) => crosshair.id === id))
  .filter(Boolean)

if (imageCrosshairs.length !== SEO_CROSSHAIR_IDS.length) {
  throw new Error(`Expected ${SEO_CROSSHAIR_IDS.length} indexable crosshairs, found ${imageCrosshairs.length}`)
}

for (const crosshair of imageCrosshairs) await createCrosshairImages(crosshair)

for (const collection of Object.values(SEO_COLLECTIONS)) {
  await sharp(collectionSvg(collection))
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(resolve(collectionOgRoot, `${collection.slug}.jpg`))
}

console.log(`Generated ${imageCrosshairs.length} indexable standalone crosshair images, ${imageCrosshairs.length} crosshair OG images, and ${Object.keys(SEO_COLLECTIONS).length} collection OG images.`)
