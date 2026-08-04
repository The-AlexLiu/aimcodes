import { useEffect, useMemo, useRef } from 'react'
import { parseCrosshairCode } from '../utils/crosshairCode.js'

function drawRect(ctx, x, y, width, height, color, opacity, outline, outlineWidth) {
  const left = Math.round(x - width / 2)
  const top = Math.round(y - height / 2)
  const w = Math.max(1, Math.round(width))
  const h = Math.max(1, Math.round(height))

  if (outline.enabled) {
    ctx.fillStyle = `rgba(8, 10, 13, ${Math.min(1, outline.opacity)})`
    ctx.fillRect(left - outlineWidth, top - outlineWidth, w + outlineWidth * 2, h + outlineWidth * 2)
  }
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  ctx.fillRect(left, top, w, h)
  ctx.globalAlpha = 1
}

function drawLineSet(ctx, centerX, centerY, line, color, scale, outline) {
  if (!line?.enabled) return
  const horizontalLength = line.horizontalLength * scale
  const verticalLength = line.verticalLength * scale
  const thickness = Math.max(1, line.thickness * scale)
  const horizontalOffset = line.offset * scale + horizontalLength / 2
  const verticalOffset = line.offset * scale + verticalLength / 2
  const outlineWidth = Math.max(1, Math.round(outline.thickness * Math.max(1, scale * 0.5)))

  drawRect(ctx, centerX, centerY - verticalOffset, thickness, verticalLength, color, line.opacity, outline, outlineWidth)
  drawRect(ctx, centerX, centerY + verticalOffset, thickness, verticalLength, color, line.opacity, outline, outlineWidth)
  drawRect(ctx, centerX - horizontalOffset, centerY, horizontalLength, thickness, color, line.opacity, outline, outlineWidth)
  drawRect(ctx, centerX + horizontalOffset, centerY, horizontalLength, thickness, color, line.opacity, outline, outlineWidth)
}

export default function CrosshairCanvas({ crosshair, scale = 1, className = '', label }) {
  const canvasRef = useRef(null)
  const parsed = useMemo(() => {
    try {
      return parseCrosshairCode(crosshair.code, { fallbackColor: crosshair.color })
    } catch {
      return {
        color: crosshair.color || '#ffffff',
        settings: {
          outline: { enabled: true, opacity: 1, thickness: 1 },
          inner: { enabled: false },
          outer: { enabled: false },
          dot: { enabled: true, opacity: 1, size: 2 },
        },
      }
    }
  }, [crosshair])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, rect.width, rect.height)

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const pixelScale = Math.max(1, scale)
      const settings = parsed.settings

      drawLineSet(ctx, centerX, centerY, settings.outer, parsed.color, pixelScale, settings.outline)
      drawLineSet(ctx, centerX, centerY, settings.inner, parsed.color, pixelScale, settings.outline)

      if (settings.dot?.enabled) {
        const size = Math.max(1, settings.dot.size * pixelScale)
        const outlineWidth = Math.max(1, Math.round(settings.outline.thickness * Math.max(1, pixelScale * 0.5)))
        drawRect(ctx, centerX, centerY, size, size, parsed.color, settings.dot.opacity, settings.outline, outlineWidth)
      }
    }

    const observer = new ResizeObserver(render)
    observer.observe(canvas)
    render()
    return () => observer.disconnect()
  }, [parsed, scale])

  return (
    <canvas ref={canvasRef} className={`crosshair-canvas ${className}`} role="img" aria-label={label || crosshair.name}>
      {label || crosshair.name}
    </canvas>
  )
}
