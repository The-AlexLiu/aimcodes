import { useEffect, useRef, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import { previewBackgroundOptions } from '../data/previewOptions.js'
import { sageArticleCopy, SAGE_IMAGE } from '../seo/sageContent.js'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'
import { SAGE_CROSSHAIR } from '../data/sageCrosshair.js'
import { SAGE_CINEMATIC } from '../seo/sageMedia.js'
import { routePath } from '../seo/routes.js'
import './hushAgent.css'
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
  return <figure className="hush-ability-media">
    <video ref={videoRef} controls muted loop playsInline preload="none" poster={`/images/agents/sage/${ability.key}-poster.webp`} width="960" height="540" aria-label={ability.name} aria-describedby={`${ability.key}-title`}>
      <source src={`/images/agents/sage/${ability.key}.mp4`} type="video/mp4" /><a href="https://playvalorant.com/en-us/agents/sage/">Riot Games</a>
    </video></figure>
}

function Cinematic({ copy }) {
  const [playing, setPlaying] = useState(false)
  return <div className="hush-video-frame">{playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${SAGE_CINEMATIC.id}?autoplay=1&rel=0`} title={copy.cinematic} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <button className="hush-video-play" onClick={()=>setPlaying(true)} aria-label={copy.play}><img src={copy.gallery[0].src} alt="" width="1280" height="540" loading="lazy"/><span className="hush-play-symbol" aria-hidden="true">▶</span><span className="hush-video-label">{copy.cinematic}<small>VALORANT</small></span></button>}</div>
}

function Gallery({ copy }) {
  const [selected, setSelected] = useState(null)
  const dialogRef = useRef(null)
  useEffect(()=>{const dialog=dialogRef.current;if(selected) dialog.showModal();else if(dialog.open) dialog.close()},[selected])
  return <section className="hush-section" id="sage-gallery"><div className="hush-gallery-heading"><h2>{copy.galleryTitle}</h2><span>{copy.galleryHint}</span></div><div className="hush-gallery-grid">{copy.gallery.map(image=><figure key={image.key}><button onClick={()=>setSelected(image)} aria-label={`${copy.expandImage}: ${image.label}`}><img src={image.src} alt={image.label} width={image.width} height={image.height} loading="lazy"/><span aria-hidden="true">↗</span></button><figcaption>{image.label}</figcaption></figure>)}</div><dialog ref={dialogRef} className="hush-lightbox sage-lightbox" aria-label={selected?.label||copy.galleryTitle} onClose={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget)setSelected(null)}}>{selected&&<div className="hush-lightbox-content"><form method="dialog"><button aria-label={copy.closeImage}>×</button></form><img src={selected.src} alt={selected.label} width={selected.width} height={selected.height}/><p>{selected.label}</p></div>}</dialog></section>
}

function Overview({ copy }) {
  const [expanded, setExpanded] = useState(false)
  return <div className="hush-demo"><button className="hush-demo-toggle" aria-expanded={expanded} aria-controls="sage-overview" onClick={()=>setExpanded(!expanded)}><span aria-hidden="true">{expanded?'−':'▶'}</span>{expanded?copy.closeDemo:copy.showDemo}</button><div id="sage-overview" hidden={!expanded}>{expanded&&<video className="sage-overview-video" controls muted playsInline preload="metadata" poster="/images/agents/sage/wall-poster.webp" width="768" height="432" aria-label={copy.showDemo}><source src="/images/agents/sage/abilities-overview.mp4" type="video/mp4"/></video>}</div></div>
}

function ThemeCrosshair({ copy, onCopy, locale }) {
  const [mapIndex,setMapIndex]=useState(0)
  const [zoom,setZoom]=useState(false)
  const [status,setStatus]=useState('')
  const map=previewBackgroundOptions[mapIndex]
  async function handleCopy(){try{const success=await onCopy({...SAGE_CROSSHAIR,name:copy.themeName,shortName:copy.themeName},{interactionSource:'sage_article'});setStatus(success?copy.copied:copy.failed)}catch{setStatus(copy.failed)}}
  return <section className="hush-crosshair hush-section" id="crosshair" aria-labelledby="theme-title"><div className="hush-crosshair-preview"><div className="hush-crosshair-map"><img src={map.image} alt={copy.maps[mapIndex]} width="914" height="514" loading="lazy"/><CrosshairCanvas crosshair={SAGE_CROSSHAIR} scale={zoom?5:1} label={copy.themeName}/><span className="hush-crosshair-scale">{zoom?'5×':copy.actual}</span><button className="hush-crosshair-zoom" aria-pressed={zoom} aria-label={zoom?copy.actual:copy.zoom} onClick={()=>setZoom(!zoom)}>{zoom?'1×':'5×'}</button></div><label className="hush-crosshair-map-picker">{copy.map}<select value={mapIndex} onChange={e=>setMapIndex(Number(e.target.value))}>{previewBackgroundOptions.map((map,index)=><option key={map.value} value={index}>{copy.maps[index]}</option>)}</select></label></div><div className="hush-crosshair-copy"><h2 id="theme-title">{copy.themeTitle}</h2><p>{copy.themeDescription}</p><div className="hush-crosshair-actions"><button className="hush-primary" onClick={handleCopy}>{copy.copy}</button></div><span className="sage-copy-status" role="status">{status}</span><label className="sage-code-label">{copy.code}<textarea readOnly aria-label={copy.code} value={SAGE_CROSSHAIR.code} onFocus={e=>e.target.select()}/></label><details className="hush-crosshair-import"><summary>{copy.importTitle}</summary><p>{copy.importBody}</p></details><a className="hush-crosshair-more" href={routePath(locale,{type:'catalog'})}>{copy.more} →</a></div></section>
}

export default function SageAgentPage({ locale, onCopy }) {
  const copy=sageArticleCopy(locale)
  return <article className="hush-page sage-page"><SeoBreadcrumbs locale={locale} section="guides" current={copy.heroName}/>
    <header className="hush-hero"><img className="hush-hero-art" src={SAGE_IMAGE} alt={copy.imageAlt} width="1280" height="540" fetchPriority="high"/><div className="hush-hero-copy"><span className="hush-eyebrow">{copy.eyebrow}</span><h1>{copy.heroName}</h1><p>{copy.intro}</p><div className="hush-hero-actions"><a className="hush-primary" href="#abilities">{copy.watch}<span aria-hidden="true">↘</span></a></div></div></header>
    <section id="abilities" className="hush-section"><div className="hush-section-heading"><h2>{copy.kit}</h2></div><div className="hush-ability-list">{copy.abilities.map(ability=><section className="hush-ability" key={ability.key} id={ability.key} aria-labelledby={`${ability.key}-title`}><div className="hush-ability-content"><header className="hush-ability-heading"><h3 id={`${ability.key}-title`}>{ability.name}<small>{ability.common}</small></h3><div className="hush-binding"><img className="ability-icon" src={`/images/agents/sage/${ability.key}.webp`} alt="" width="48" height="48" loading="lazy"/></div></header><div className="hush-ability-description"><p>{ability.effect}</p><h4>{ability.question}</h4><p className="hush-controls">{ability.body}</p></div><AbilityVideo ability={ability}/></div></section>)}</div></section>
    <Overview copy={copy}/>
    <section className="hush-section hush-story" id="sage-story"><div className="hush-story-copy"><h2>{copy.storyTitle}</h2>{copy.story.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div><div><Cinematic copy={copy}/><div className="hush-video-links"><a href={SAGE_CINEMATIC.url} target="_blank" rel="noreferrer">{copy.watchCinematic} ↗</a></div></div></section>
    <Gallery copy={copy}/>
    <details className="hush-unlock"><summary>{copy.profileTitle}</summary><dl className="hush-quick-facts"><div><dt>{copy.originLabel}</dt><dd>{copy.origin}</dd></div><div><dt>{copy.roleLabel}</dt><dd>{copy.role}</dd></div></dl><p>{copy.profileBody}</p></details>
    <ThemeCrosshair copy={copy} onCopy={onCopy} locale={locale}/>
    <details className="hush-unlock sage-sources"><summary>{copy.sourcesTitle}</summary><p>{copy.sourceNote}</p>{copy.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</details><p className="hush-credit"><a href={SAGE_CINEMATIC.url} target="_blank" rel="noreferrer">{copy.credit} ↗</a></p>
  </article>
}
