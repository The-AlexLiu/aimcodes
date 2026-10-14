import { useState } from 'react'
import { createTranslator } from '../i18n/translations.js'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import { previewBackgroundOptions, crosshairColorPresets } from '../data/previewOptions.js'
import { reviewCopy } from '../seo/octoberReviewContent.js'
import { routePath } from '../seo/routes.js'
import { updateCrosshairColor } from '../utils/crosshairCode.js'

export default function CrosshairColorComparison({ locale, crosshair }) {
  const [background, setBackground] = useState('ascent')
  if (!crosshair) return null
  const copy = reviewCopy(locale).colors
  const t = createTranslator(locale)
  const map = previewBackgroundOptions.find((item) => item.value === background) || previewBackgroundOptions[0]
  return (
    <section className="color-comparison" aria-labelledby="color-comparison-title">
      <h2 id="color-comparison-title">{copy.compareTitle}</h2>
      <p>{copy.compareBody}</p>
      <label className="tool-field">
        <span>{copy.map}</span>
        <select value={background} onChange={(event) => setBackground(event.target.value)}>
          {previewBackgroundOptions.map((option) => <option key={option.value} value={option.value}>{t(`maps.${option.value}`)}</option>)}
        </select>
      </label>
      <div className="color-comparison-grid">
        {['cyan', 'green', 'white'].map((key, index) => {
          const color = crosshairColorPresets.find((item) => item.key === key)
          const code = updateCrosshairColor(crosshair.code, { preset: color.preset })
          const item = { ...crosshair, code, color: color.hex, colorKey: key }
          const href = `${routePath(locale, { type: 'crosshair', crosshairId: crosshair.id })}?color=${key}&mapa=${background}`
          return (
            <article key={key}>
              <h3>{copy.names[index]} <code>{color.hex.toUpperCase()}</code></h3>
              <div className="tool-preview-frame">
                <img src={map.image} width="914" height="514" alt={t(`maps.${map.value}`)} loading="lazy" />
                <CrosshairCanvas crosshair={item} scale={1.25} label={`${crosshair.shortName} · ${copy.names[index]}`} />
              </div>
              <a href={href}>{copy.open} →</a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
