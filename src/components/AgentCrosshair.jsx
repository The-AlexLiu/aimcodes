import { useEffect, useRef, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import { previewBackgroundOptions } from '../data/previewOptions.js'
import { routePath } from '../seo/routes.js'
import { trackEvent } from '../utils/analytics.js'

export default function AgentCrosshair({ locale, onCopy, theme, crosshair, copy }) {
  const [background, setBackground] = useState('ascent')
  const [zoom, setZoom] = useState(false)
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef(null)
  const mapIndex = previewBackgroundOptions.findIndex(map => map.value === background)
  const map = previewBackgroundOptions[mapIndex]
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        trackEvent('theme_crosshair_view', { theme_id: theme, interaction_source: `${theme}_article` })
        observer.disconnect()
      }
    }, { threshold: 0.35 })
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [theme])
  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(timer)
  }, [copied])
  async function handleCopy() {
    const success = await onCopy({ ...crosshair, name: copy.title, shortName: copy.title }, { interactionSource: `${theme}_article` })
    if (success) setCopied(true)
  }
  return (
    <section ref={sectionRef} className="hush-crosshair hush-section" id={theme === 'sage' ? 'crosshair' : undefined} aria-labelledby={`${theme}-crosshair-title`}>
      <div className="hush-crosshair-preview">
        <div className="hush-crosshair-map">
          <img src={map.image} alt={copy.maps[mapIndex]} width="914" height="514" loading="lazy" />
          <CrosshairCanvas crosshair={crosshair} scale={zoom ? 5 : 1} label={copy.title} />
          <span className="hush-crosshair-scale">{zoom ? '5×' : copy.actual}</span>
          <button type="button" className="hush-crosshair-zoom" aria-label={zoom ? copy.actual : copy.zoom} aria-pressed={zoom} onClick={() => setZoom(value => !value)}>{zoom ? '1×' : '5×'}</button>
        </div>
        <label className="hush-crosshair-map-picker">{copy.map}
          <select value={background} onChange={event => setBackground(event.target.value)}>
            {previewBackgroundOptions.map((option, index) => <option key={option.value} value={option.value}>{copy.maps[index]}</option>)}
          </select>
        </label>
      </div>
      <div className="hush-crosshair-copy">
        <h2 id={`${theme}-crosshair-title`}>{copy.title}</h2>
        <p>{copy.description}</p>
        <div className="hush-crosshair-actions">
          <button type="button" className="hush-primary" onClick={handleCopy}>{copied ? copy.copied : copy.copy}</button>
          <a className="hush-secondary" href={`${routePath(locale, { type: 'tool', toolKey: 'generator' })}?theme=${theme}`}>{copy.adjust} ↗</a>
        </div>
        <span className="hush-crosshair-copy-status" role="status">{copied ? copy.copied : ''}</span>
        <details className="hush-crosshair-import"><summary>{copy.importTitle}</summary><p>{copy.importBody}</p></details>
        <a className="hush-crosshair-more" href={routePath(locale, { type: 'catalog' })}>{copy.more} →</a>
      </div>
    </section>
  )
}
