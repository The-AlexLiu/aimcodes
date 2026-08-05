import { parseCrosshairCode } from './crosshairCode.js'
import QRCode from 'qrcode'

const LANDSCAPE_WIDTH = 1200
const LANDSCAPE_HEIGHT = 630
const PORTRAIT_WIDTH = 1080
const PORTRAIT_HEIGHT = 1440
const DISPLAY_FONT = '"Arial Narrow", "Roboto Condensed", "PingFang SC", "Microsoft YaHei", sans-serif'
const BODY_FONT = 'Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'

function roundedRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.roundRect(x, y, width, height, safeRadius)
}

function drawGrid(ctx, width, height) {
  ctx.save()
  ctx.strokeStyle = 'rgba(116, 144, 158, .08)'
  ctx.lineWidth = 1
  for (let x = 0; x <= width; x += 32) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  for (let y = 0; y <= height; y += 32) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  ctx.restore()
}

function drawBrand(ctx) {
  const x = 76
  const y = 70
  const markScale = 1.4
  const axisOuter = 17.5 * markScale
  const axisInner = 9.5 * markScale
  ctx.save()
  ctx.strokeStyle = '#ff5b57'
  ctx.lineWidth = 2.4 * markScale
  ctx.beginPath()
  ctx.arc(x, y, 8.8 * markScale, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x, y - axisOuter)
  ctx.lineTo(x, y - axisInner)
  ctx.moveTo(x, y + axisInner)
  ctx.lineTo(x, y + axisOuter)
  ctx.moveTo(x - axisOuter, y)
  ctx.lineTo(x - axisInner, y)
  ctx.moveTo(x + axisInner, y)
  ctx.lineTo(x + axisOuter, y)
  ctx.stroke()
  ctx.fillStyle = '#ff5b57'
  ctx.beginPath()
  ctx.arc(x, y, 2.25 * markScale, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#f6f8f9'
  ctx.font = `800 30px ${DISPLAY_FONT}`
  ctx.fillText('Aim', 119, 81)
  const aimWidth = ctx.measureText('Aim').width
  ctx.fillStyle = '#ff5b57'
  ctx.fillText('Codes', 119 + aimWidth, 81)
  ctx.restore()
}

function splitForWrapping(text) {
  const normalized = String(text || '').trim()
  if (!normalized) return []
  return /\s/.test(normalized) ? normalized.split(/\s+/) : Array.from(normalized)
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const parts = splitForWrapping(text)
  const usesSpaces = /\s/.test(String(text || '').trim())
  const lines = []
  let line = ''

  parts.forEach((part) => {
    const candidate = line ? `${line}${usesSpaces ? ' ' : ''}${part}` : part
    if (ctx.measureText(candidate).width <= maxWidth || !line) {
      line = candidate
      return
    }
    lines.push(line)
    line = part
  })
  if (line) lines.push(line)

  const visibleLines = lines.slice(0, maxLines)
  if (lines.length > maxLines) {
    let last = visibleLines[maxLines - 1]
    while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1)
    visibleLines[maxLines - 1] = `${last}…`
  }
  visibleLines.forEach((visibleLine, index) => ctx.fillText(visibleLine, x, y + index * lineHeight))
  return y + visibleLines.length * lineHeight
}

function drawRankEmblem(ctx, x, y, size, color) {
  const points = [
    [0.5, 0], [0.91, 0.24], [0.82, 0.78], [0.5, 1], [0.18, 0.78], [0.09, 0.24],
  ]
  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 24
  ctx.fillStyle = color
  ctx.beginPath()
  points.forEach(([px, py], index) => {
    const pointX = x + px * size
    const pointY = y + py * size
    if (index === 0) ctx.moveTo(pointX, pointY)
    else ctx.lineTo(pointX, pointY)
  })
  ctx.closePath()
  ctx.fill()
  ctx.shadowBlur = 0

  const centerX = x + size / 2
  const centerY = y + size * 0.49
  ctx.strokeStyle = '#0a1218'
  ctx.fillStyle = '#0a1218'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(centerX, centerY, 13, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(centerX, centerY, 3.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(centerX, centerY - 28)
  ctx.lineTo(centerX, centerY - 18)
  ctx.moveTo(centerX, centerY + 18)
  ctx.lineTo(centerX, centerY + 28)
  ctx.moveTo(centerX - 28, centerY)
  ctx.lineTo(centerX - 18, centerY)
  ctx.moveTo(centerX + 18, centerY)
  ctx.lineTo(centerX + 28, centerY)
  ctx.stroke()
  ctx.restore()
}

function drawCrosshairRect(ctx, x, y, width, height, color, opacity, outline, outlineWidth) {
  const left = Math.round(x - width / 2)
  const top = Math.round(y - height / 2)
  const safeWidth = Math.max(2, Math.round(width))
  const safeHeight = Math.max(2, Math.round(height))
  if (outline.enabled) {
    ctx.fillStyle = `rgba(5, 9, 12, ${Math.min(1, outline.opacity)})`
    ctx.fillRect(left - outlineWidth, top - outlineWidth, safeWidth + outlineWidth * 2, safeHeight + outlineWidth * 2)
  }
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  ctx.fillRect(left, top, safeWidth, safeHeight)
  ctx.globalAlpha = 1
}

function drawCrosshairLines(ctx, centerX, centerY, line, color, scale, outline) {
  if (!line?.enabled) return
  const horizontalLength = line.horizontalLength * scale
  const verticalLength = line.verticalLength * scale
  const thickness = Math.max(2, line.thickness * scale)
  const horizontalOffset = line.offset * scale + horizontalLength / 2
  const verticalOffset = line.offset * scale + verticalLength / 2
  const outlineWidth = Math.max(2, Math.round(outline.thickness * Math.max(1, scale * 0.35)))
  drawCrosshairRect(ctx, centerX, centerY - verticalOffset, thickness, verticalLength, color, line.opacity, outline, outlineWidth)
  drawCrosshairRect(ctx, centerX, centerY + verticalOffset, thickness, verticalLength, color, line.opacity, outline, outlineWidth)
  drawCrosshairRect(ctx, centerX - horizontalOffset, centerY, horizontalLength, thickness, color, line.opacity, outline, outlineWidth)
  drawCrosshairRect(ctx, centerX + horizontalOffset, centerY, horizontalLength, thickness, color, line.opacity, outline, outlineWidth)
}

function drawCrosshair(ctx, crosshair, centerX, centerY) {
  const parsed = parseCrosshairCode(crosshair.code, { fallbackColor: crosshair.color })
  const { settings } = parsed
  const scale = 6
  drawCrosshairLines(ctx, centerX, centerY, settings.outer, parsed.color, scale, settings.outline)
  drawCrosshairLines(ctx, centerX, centerY, settings.inner, parsed.color, scale, settings.outline)
  if (settings.dot?.enabled) {
    const size = Math.max(2, settings.dot.size * scale)
    const outlineWidth = Math.max(2, Math.round(settings.outline.thickness * 2))
    drawCrosshairRect(ctx, centerX, centerY, size, size, parsed.color, settings.dot.opacity, settings.outline, outlineWidth)
  }
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('share-card-export-failed'))
    }, 'image/png')
  })
}

function createCardCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  const background = ctx.createLinearGradient(0, 0, width, height)
  background.addColorStop(0, '#091117')
  background.addColorStop(0.62, '#0c151c')
  background.addColorStop(1, '#101b23')
  ctx.fillStyle = background
  ctx.fillRect(0, 0, width, height)
  drawGrid(ctx, width, height)
  return { canvas, ctx }
}

async function drawQrCode(ctx, value, x, y, size) {
  if (!value) return
  const qrCanvas = document.createElement('canvas')
  await QRCode.toCanvas(qrCanvas, value, {
    width: size,
    margin: 1,
    errorCorrectionLevel: 'M',
    color: { dark: '#0a1218', light: '#ffffff' },
  })
  ctx.fillStyle = '#ffffff'
  roundedRect(ctx, x, y, size, size, 12)
  ctx.fill()
  ctx.drawImage(qrCanvas, x, y, size, size)
}

function drawLandscapeCard({
  title,
  rankName,
  rankRange,
  average,
  unit,
  taunt,
  pickLabel,
  crosshair,
  footer,
  rankColor,
}) {
  const { canvas, ctx } = createCardCanvas(LANDSCAPE_WIDTH, LANDSCAPE_HEIGHT)

  ctx.strokeStyle = '#34434e'
  ctx.lineWidth = 2
  roundedRect(ctx, 48, 34, 1104, 562, 18)
  ctx.stroke()
  ctx.fillStyle = rankColor
  ctx.fillRect(48, 34, 5, 562)
  drawBrand(ctx)

  ctx.fillStyle = '#85939d'
  ctx.font = `800 18px ${DISPLAY_FONT}`
  ctx.letterSpacing = '2px'
  ctx.fillText(String(title || '').toLocaleUpperCase(), 76, 135)
  ctx.letterSpacing = '0px'

  drawRankEmblem(ctx, 76, 164, 112, rankColor)
  ctx.fillStyle = rankColor
  ctx.font = `850 78px ${DISPLAY_FONT}`
  ctx.fillText(rankName, 218, 240)

  ctx.fillStyle = '#f7f8f9'
  ctx.font = `850 112px ${DISPLAY_FONT}`
  ctx.fillText(String(average), 76, 400)
  const averageWidth = ctx.measureText(String(average)).width
  ctx.fillStyle = '#a7b2ba'
  ctx.font = `750 25px ${BODY_FONT}`
  ctx.fillText(unit, 86 + averageWidth, 398)

  ctx.fillStyle = '#7f8d97'
  ctx.font = `650 18px ${BODY_FONT}`
  ctx.fillText(rankRange, 78, 438)

  ctx.fillStyle = '#e6ebee'
  ctx.font = `720 27px ${BODY_FONT}`
  drawWrappedText(ctx, taunt, 76, 490, 650, 39, 2)

  ctx.fillStyle = '#0a1218'
  roundedRect(ctx, 790, 118, 306, 382, 15)
  ctx.fill()
  ctx.strokeStyle = '#34434e'
  ctx.lineWidth = 2
  roundedRect(ctx, 790, 118, 306, 382, 15)
  ctx.stroke()
  ctx.fillStyle = '#ff5b57'
  ctx.fillRect(790, 118, 306, 5)

  ctx.fillStyle = '#ff716d'
  ctx.font = `800 17px ${DISPLAY_FONT}`
  ctx.fillText(String(pickLabel || '').toLocaleUpperCase(), 820, 160)
  ctx.fillStyle = '#111d25'
  roundedRect(ctx, 820, 186, 246, 190, 11)
  ctx.fill()
  ctx.strokeStyle = '#293943'
  roundedRect(ctx, 820, 186, 246, 190, 11)
  ctx.stroke()
  drawCrosshair(ctx, crosshair, 943, 281)

  ctx.fillStyle = '#f4f6f7'
  ctx.font = `800 30px ${DISPLAY_FONT}`
  drawWrappedText(ctx, crosshair.name, 820, 421, 246, 36, 2)

  ctx.fillStyle = '#7f8c95'
  ctx.font = `600 17px ${BODY_FONT}`
  ctx.fillText(footer, 790, 558)
  ctx.fillStyle = '#ff5b57'
  ctx.fillRect(76, 556, 680, 2)

  return canvas
}

async function drawPortraitCard({
  title,
  rankName,
  rankRange,
  average,
  unit,
  taunt,
  pickLabel,
  crosshair,
  footer,
  rankColor,
  challengeTitle,
  challengeHint,
  challengeUrl,
}) {
  const { canvas, ctx } = createCardCanvas(PORTRAIT_WIDTH, PORTRAIT_HEIGHT)

  ctx.strokeStyle = '#34434e'
  ctx.lineWidth = 2
  roundedRect(ctx, 42, 34, 996, 1372, 22)
  ctx.stroke()
  ctx.fillStyle = rankColor
  ctx.fillRect(42, 34, 6, 1372)
  drawBrand(ctx)

  ctx.fillStyle = '#85939d'
  ctx.font = `800 20px ${DISPLAY_FONT}`
  ctx.letterSpacing = '2px'
  ctx.fillText(String(title || '').toLocaleUpperCase(), 76, 154)
  ctx.letterSpacing = '0px'

  drawRankEmblem(ctx, 76, 194, 132, rankColor)
  ctx.fillStyle = rankColor
  ctx.font = `850 90px ${DISPLAY_FONT}`
  ctx.fillText(rankName, 246, 290)

  ctx.fillStyle = '#f7f8f9'
  ctx.font = `850 190px ${DISPLAY_FONT}`
  ctx.fillText(String(average), 76, 520)
  const averageWidth = ctx.measureText(String(average)).width
  ctx.fillStyle = '#a7b2ba'
  ctx.font = `750 30px ${BODY_FONT}`
  ctx.fillText(unit, 90 + averageWidth, 513)

  ctx.fillStyle = '#7f8d97'
  ctx.font = `650 21px ${BODY_FONT}`
  ctx.fillText(rankRange, 80, 565)

  ctx.fillStyle = '#e6ebee'
  ctx.font = `720 34px ${BODY_FONT}`
  drawWrappedText(ctx, taunt, 76, 630, 928, 48, 2)

  ctx.fillStyle = '#0a1218'
  roundedRect(ctx, 76, 750, 928, 330, 18)
  ctx.fill()
  ctx.strokeStyle = '#34434e'
  ctx.lineWidth = 2
  roundedRect(ctx, 76, 750, 928, 330, 18)
  ctx.stroke()
  ctx.fillStyle = '#ff5b57'
  ctx.fillRect(76, 750, 928, 6)

  ctx.fillStyle = '#ff716d'
  ctx.font = `800 19px ${DISPLAY_FONT}`
  ctx.fillText(String(pickLabel || '').toLocaleUpperCase(), 112, 804)
  ctx.fillStyle = '#111d25'
  roundedRect(ctx, 112, 842, 270, 190, 12)
  ctx.fill()
  ctx.strokeStyle = '#293943'
  roundedRect(ctx, 112, 842, 270, 190, 12)
  ctx.stroke()
  drawCrosshair(ctx, crosshair, 247, 937)

  ctx.fillStyle = '#f4f6f7'
  ctx.font = `800 43px ${DISPLAY_FONT}`
  drawWrappedText(ctx, crosshair.name, 430, 904, 520, 52, 2)
  ctx.fillStyle = '#82909a'
  ctx.font = `620 21px ${BODY_FONT}`
  ctx.fillText(footer, 430, 1015)

  ctx.fillStyle = '#f7f8f9'
  ctx.font = `850 48px ${DISPLAY_FONT}`
  drawWrappedText(ctx, challengeTitle, 76, 1160, 670, 58, 2)
  ctx.fillStyle = '#9eabb4'
  ctx.font = `650 23px ${BODY_FONT}`
  drawWrappedText(ctx, challengeHint, 76, 1262, 650, 33, 2)
  ctx.fillStyle = '#ff5b57'
  ctx.fillRect(76, 1351, 650, 3)

  await drawQrCode(ctx, challengeUrl, 786, 1150, 178)
  ctx.fillStyle = '#aab5bc'
  ctx.font = `750 18px ${BODY_FONT}`
  ctx.textAlign = 'center'
  ctx.fillText('aimcodes.com', 875, 1360)
  ctx.textAlign = 'start'

  return canvas
}

export async function createResultShareCard(options) {
  const canvas = options.format === 'landscape'
    ? drawLandscapeCard(options)
    : await drawPortraitCard(options)
  return canvasToBlob(canvas)
}
