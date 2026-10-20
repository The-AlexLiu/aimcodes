import { useEffect, useRef, useState } from 'react'
import { CHAMBER_IMAGE, CHAMBER_CINEMATIC, chamberArticleCopy } from '../seo/chamberContent.js'
import { CHAMBER_CROSSHAIR } from '../data/chamberCrosshair.js'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'
import AgentCrosshair from './AgentCrosshair.jsx'
import './hushAgent.css'
import './chamberAgent.css'

function AbilityVideo({ ability }) {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reducedMotion.matches && !navigator.connection?.saveData) video.play().catch(() => {})
      else if (!entry.isIntersecting) video.pause()
    }, { threshold: 0.35 })
    observer.observe(video)
    return () => { observer.disconnect(); video.pause() }
  }, [])
  return <figure className="hush-ability-media"><video ref={ref} controls muted loop playsInline preload="none" poster={`/images/agents/chamber/${ability.key}-poster.webp`} width="960" height="540" aria-label={ability.name} aria-describedby={`chamber-${ability.key}-effect`}><source src={`/images/agents/chamber/${ability.key}.mp4`} type="video/mp4" /></video></figure>
}

function CharacterMedia({ copy }) {
  const [playing, setPlaying] = useState(false)
  const [selected, setSelected] = useState(null)
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (selected) dialog.showModal()
    else if (dialog.open) dialog.close()
  }, [selected])
  return <>
    <section className="hush-section hush-story" id="chamber-story"><div className="hush-story-copy"><h2>{copy.storyTitle}</h2>{copy.story.map(p => <p key={p}>{p}</p>)}</div><div>
      <div className="hush-video-frame">{playing ? <iframe src="https://www.youtube-nocookie.com/embed/FUoqAn5T4h4?autoplay=1&rel=0" title={copy.cinematic} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <button className="hush-video-play" onClick={() => setPlaying(true)} aria-label={copy.play}><img src={CHAMBER_IMAGE} alt="" width="1920" height="1080" loading="lazy" /><span className="hush-play-symbol" aria-hidden="true">▶</span><span className="hush-video-label">{copy.cinematic}<small>VALORANT</small></span></button>}</div>
      <div className="hush-video-links"><a href={CHAMBER_CINEMATIC} target="_blank" rel="noreferrer">{copy.watchCinematic} ↗</a></div>
    </div></section>
    <section className="hush-section" id="chamber-gallery"><div className="hush-gallery-heading"><h2>{copy.galleryTitle}</h2><span>{copy.galleryHint}</span></div><div className="hush-gallery-grid">{copy.gallery.map(image => <figure key={image.key}><button onClick={() => setSelected(image)} aria-label={`${copy.expandImage}: ${image.label}`}><img src={image.src} alt={image.label} width={image.width} height={image.height} loading="lazy" /><span aria-hidden="true">↗</span></button></figure>)}</div>
      <dialog ref={dialogRef} className="hush-lightbox chamber-lightbox" aria-label={selected?.label || copy.galleryTitle} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null) }}>{selected && <div className="hush-lightbox-content"><form method="dialog"><button aria-label={copy.closeImage}>×</button></form><img src={selected.src} alt={selected.label} width={selected.width} height={selected.height} /></div>}</dialog>
    </section>
  </>
}

export default function ChamberAgentPage({ locale, onCopy }) {
  const copy = chamberArticleCopy(locale)
  const [expanded, setExpanded] = useState(false)
  return <article className="hush-page chamber-page"><SeoBreadcrumbs locale={locale} section="guides" current={copy.heroName} />
    <header className="hush-hero"><picture><source media="(max-width: 680px)" srcSet="/images/agents/chamber/hero-mobile.webp" /><img className="hush-hero-art" src={CHAMBER_IMAGE} alt={copy.imageAlt} width="1920" height="1080" fetchPriority="high" /></picture><div className="hush-hero-copy"><span className="hush-eyebrow">{copy.eyebrow}</span><h1>{copy.heroName}</h1><p>{copy.intro}</p><div className="hush-hero-actions"><a className="hush-primary" href="#chamber-abilities">{copy.watch}<span aria-hidden="true">↘</span></a></div></div></header>
    <section id="chamber-abilities" className="hush-section"><div className="hush-section-heading"><h2>{copy.kit}</h2></div><div className="hush-ability-list">{copy.abilities.map(ability => <section className="hush-ability" key={ability.key} aria-labelledby={`chamber-${ability.key}-title`}><div className="hush-ability-content"><header className="hush-ability-heading"><h3 id={`chamber-${ability.key}-title`}>{ability.name}</h3><div className="hush-binding"><img src={`/images/agents/chamber/${ability.key}.webp`} alt="" width="48" height="48" loading="lazy" /><small>{ability.binding}</small></div></header><div className="hush-ability-description"><p id={`chamber-${ability.key}-effect`}>{ability.effect}</p><p className="hush-controls">{ability.action}</p></div><AbilityVideo ability={ability} /></div></section>)}</div></section>
    <div className="hush-demo"><button className="hush-demo-toggle" aria-expanded={expanded} aria-controls="chamber-demo" onClick={() => setExpanded(!expanded)}><span aria-hidden="true">{expanded ? '−' : '▶'}</span>{expanded ? copy.closeDemo : copy.showDemo}</button><div id="chamber-demo" hidden={!expanded}>{expanded && <video className="chamber-overview-video" controls muted playsInline preload="metadata" poster="/images/agents/chamber/trademark-poster.webp" width="960" height="540" aria-label={copy.showDemo}><source src="/images/agents/chamber/abilities-overview.mp4" type="video/mp4" /></video>}</div></div>
    <CharacterMedia copy={copy} />
    <details className="hush-unlock"><summary>{copy.profileTitle}</summary><dl className="hush-quick-facts"><div><dt>{copy.originLabel}</dt><dd>{copy.origin}</dd></div><div><dt>{copy.roleLabel}</dt><dd>{copy.role}</dd></div></dl><p>{copy.profileBody}</p></details>
    <AgentCrosshair locale={locale} theme="chamber" crosshair={CHAMBER_CROSSHAIR} onCopy={onCopy} copy={{ ...copy, title: copy.themeTitle, description: copy.themeDescription }} />
    <p className="hush-credit"><a href="https://playvalorant.com/en-us/agents/chamber/" target="_blank" rel="noreferrer">{copy.credit} ↗</a></p>
  </article>
}
