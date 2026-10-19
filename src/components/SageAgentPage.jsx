import { useEffect, useRef, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import { previewBackgroundOptions } from '../data/previewOptions.js'
import { sageArticleCopy, SAGE_IMAGE } from '../seo/sageContent.js'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'
import { SAGE_CROSSHAIR } from '../data/sageCrosshair.js'
import './sageAgent.css'

function AbilityVideo({ ability }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reducedMotion.matches && !navigator.connection?.saveData) {
        video.play().catch(() => {})
      } else if (!entry.isIntersecting) video.pause()
    }, { threshold: 0.35 })
    observer.observe(video)
    return () => { observer.disconnect(); video.pause() }
  }, [])
  return <figure className="ability-media">
    <video ref={videoRef} controls muted loop playsInline preload="none" poster={`/images/agents/sage/${ability.key}-poster.webp`} width="960" height="540" aria-label={ability.name} aria-describedby={`${ability.key}-title`}>
      <source src={`/images/agents/sage/${ability.key}.mp4`} type="video/mp4" /><a href="https://playvalorant.com/en-us/agents/sage/">Riot Games</a>
    </video></figure>
}

function ThemeCrosshair({ copy, onCopy }) {
  const [mapIndex, setMapIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [status, setStatus] = useState('')
  const crosshair = SAGE_CROSSHAIR
  const map = previewBackgroundOptions[mapIndex]
  async function handleCopy() {
    try { const success = await onCopy({ ...crosshair, name: copy.themeName, shortName: copy.themeName }, { interactionSource: 'sage_article' }); setStatus(success ? copy.copied : copy.failed) }
    catch { setStatus(copy.failed) }
  }
  return <section className="sage-theme" id="crosshair" aria-labelledby="theme-title">
    <div className="section-heading"><h2 id="theme-title">{copy.themeTitle}</h2><p>{copy.themeDescription}</p></div>
    <div className="theme-grid">
      <div><div className="map-preview"><img src={map.image} alt={copy.maps[mapIndex]} width="914" height="514" /><CrosshairCanvas crosshair={crosshair} scale={zoom ? 5 : 1} label={copy.themeName} /><span className="scale">{zoom ? '5×' : copy.actual}</span><button className="zoom" aria-pressed={zoom} onClick={() => setZoom(!zoom)}>{zoom ? copy.actual : copy.zoom}</button></div>
        <label className="map-select">{copy.map}<select value={mapIndex} onChange={event => setMapIndex(Number(event.target.value))}>{previewBackgroundOptions.map((item, index) => <option key={item.value} value={index}>{copy.maps[index]}</option>)}</select></label>
      </div>
      <div className="theme-controls">
        <h3>{copy.themeName}</h3>

        <div className="control-actions"><button className="primary" onClick={handleCopy}>{copy.copy}</button></div>
        <span className="status" role="status">{status}</span>
        <label className="code-label">{copy.code}<textarea aria-label={copy.code} readOnly value={crosshair.code} onFocus={event => event.target.select()} /></label>
        <details><summary>{copy.importTitle}</summary><p>{copy.importBody}</p></details>
      </div>
    </div>
  </section>
}

export default function SageAgentPage({ locale, onCopy }) {
  const copy = sageArticleCopy(locale)
  return <article className="sage-page">
    <SeoBreadcrumbs locale={locale} section="guides" current={copy.heroName} />
    <section className="sage-hero"><img src={SAGE_IMAGE} alt={copy.imageAlt} width="1280" height="540" fetchPriority="high" /><div className="hero-copy"><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.heroName}</h1><p>{copy.intro}</p><nav aria-label={copy.title}><a className="primary" href="#abilities">{copy.watch} ↓</a><a href="#crosshair">{copy.tryTheme} ↗</a></nav></div></section>
    <section id="abilities" className="abilities"><div className="section-heading"><h2>{copy.kit}</h2></div>
      <div className="sage-ability-cards">{copy.abilities.map((ability, index) => <section className="ability" id={ability.key} key={ability.key} aria-labelledby={`${ability.key}-title`}>
        <div className="ability-copy"><div className="ability-topline"><span>0{index + 1} / {ability.english}</span><img className="ability-icon" src={`/images/agents/sage/${ability.key}.webp`} alt="" width="64" height="64" loading="lazy" /></div><h2 id={`${ability.key}-title`}>{ability.name}<small>{ability.common}</small></h2><p className="ability-effect">{ability.effect}</p><h3>{ability.question}</h3><p className="ability-action">{ability.body}</p></div>
        <AbilityVideo ability={ability} />
      </section>)}</div>
    </section>
    <ThemeCrosshair copy={copy} onCopy={onCopy} />
    <details className="source-notes"><summary>{copy.sourcesTitle}</summary><p>{copy.sourceNote}</p>{copy.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</details>
  </article>
}
