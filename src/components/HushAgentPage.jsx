import { useEffect, useRef, useState } from 'react'
import { HUSH_IMAGE, HUSH_VIDEOS, hushArticleCopy } from '../seo/hushContent.js'
import { hushClipCopy } from '../seo/hushMedia.js'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'
import HushCrosshair from './HushCrosshair.jsx'
import './hushAgent.css'

function VideoPlayer({ video, label, ui, index, poster }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className={`hush-video-frame${index === 1 ? ' hush-video-portrait' : ''}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={`${label} · ${video.channel}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button className="hush-video-play" onClick={() => setPlaying(true)} aria-label={`${ui.play}: ${label}`}>
          <img src={poster || (index === 0 ? HUSH_IMAGE : '/images/agents/hush/gameplay.webp')} alt="" width={index === 0 ? 1440 : 720} height={index === 0 ? 810 : 1280} loading="lazy" />
          <span className="hush-play-symbol" aria-hidden="true">▶</span>
          <span className="hush-video-label">{label}<small>{video.channel}</small></span>
        </button>
      )}
    </div>
  )
}

function AbilityClip({ ability, locale }) {
  const videoRef = useRef(null)
  const labels = hushClipCopy(locale)
  useEffect(() => {
    const video = videoRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection?.saveData
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reducedMotion && !saveData) {
        video.play().catch(() => {})
      } else if (!entry.isIntersecting) {
        video.pause()
      }
    }, { threshold: 0.35 })
    observer.observe(video)
    return () => { observer.disconnect(); video.pause() }
  }, [])
  return (
    <figure className="hush-ability-media">
      <video ref={videoRef} controls muted loop playsInline preload="none" poster={ability.media.poster}
        width="768" height="432" aria-label={`${ability.label} · ${labels.title}`} aria-describedby={`hush-effect-${ability.media.key}`}>
        <source src={ability.media.src} type="video/mp4" />
        <a href={ability.media.sourceUrl}>{labels.source}</a>
      </video>
    </figure>
  )
}

function CharacterGallery({ images, ui }) {
  const [selected, setSelected] = useState(null)
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (selected) dialog.showModal()
    else if (dialog.open) dialog.close()
  }, [selected])
  return (
    <section id="hush-gallery" className="hush-section">
      <div className="hush-gallery-heading"><h2>{ui.galleryTitle}</h2><span>{ui.galleryHint}</span></div>
      <div className="hush-gallery-grid">
        {images.map(image => <figure key={image.key}>
          <button onClick={() => setSelected(image)} aria-label={`${ui.expandImage}: ${image.label}`}>
            <img src={image.src} alt={image.label} width={image.width} height={image.height} loading="lazy" />
            <span aria-hidden="true">↗</span>
          </button>
          <figcaption>{image.label}</figcaption>
        </figure>)}
      </div>
      <dialog ref={dialogRef} className="hush-lightbox" onClose={() => setSelected(null)}
        aria-label={selected?.label || ui.galleryTitle}
        onClick={event => { if (event.target === event.currentTarget) setSelected(null) }}>
        {selected && <div className="hush-lightbox-content">
          <form method="dialog"><button aria-label={ui.closeImage}>×</button></form>
          <img src={selected.src} alt={selected.label} width={selected.width} height={selected.height} />
          <p>{selected.label}</p>
        </div>}
      </dialog>
    </section>
  )
}

export default function HushAgentPage({ locale, onCopy }) {
  const [demoExpanded, setDemoExpanded] = useState(false)
  const content = hushArticleCopy(locale)
  const { ui } = content
  const video = HUSH_VIDEOS[1]
  const regions = locale === 'zh-CN' ? [['china', 3], ['international', 4]] : [['international', 4], ['china', 3]]

  return (
    <article className="hush-page">
      <SeoBreadcrumbs locale={locale} section="guides" current={locale === 'zh-CN' ? '遐思' : 'Hush'} />
      <header className="hush-hero">
        <img className="hush-hero-art" src={HUSH_IMAGE} alt={ui.imageAlt} width="1440" height="810" fetchPriority="high" />
        <div className="hush-hero-copy">
          <span className="hush-eyebrow">{content.eyebrow}</span>
          <h1>{ui.heroTitle}</h1>
          <p>{content.intro}</p>
          <div className="hush-hero-actions">
            <a className="hush-primary" href="#hush-abilities">{ui.kit}<span aria-hidden="true">↘</span></a>
          </div>
        </div>
      </header>

      <section id="hush-abilities" className="hush-section">
        <div className="hush-section-heading"><h2>{ui.kit}</h2></div>
        <p className="hush-section-note">{ui.kitNote}</p>
        <div className="hush-ability-list">
          {content.abilities.map((ability, index) => (
            <section key={ability.name} className={`hush-ability ${index === 4 ? 'hush-ultimate' : ''}`}>
              <div className="hush-ability-content">
                <header className="hush-ability-heading">
                  <h3>{ability.name}{ability.label !== ability.name && <small>{ability.label}</small>}</h3>
                  <div className="hush-binding"><img src={ability.media.icon} alt="" width="48" height="48" loading="lazy" /><small>{ability.binding}</small></div>
                </header>
                <div className="hush-ability-description">
                  <p id={`hush-effect-${ability.media.key}`}>{ability.body}</p>
                  <p className="hush-controls"><strong>{ui.action}</strong> {ability.action}</p>
                </div>
                <AbilityClip ability={ability} locale={locale} />
              </div>
            </section>
          ))}
        </div>
      </section>

        <div id="hush-videos" className="hush-demo">
          <button className="hush-demo-toggle" aria-expanded={demoExpanded} aria-controls="hush-demo-content" onClick={() => setDemoExpanded(!demoExpanded)}>
            <span aria-hidden="true">{demoExpanded ? '−' : '▶'}</span>{demoExpanded ? ui.closeDemo : ui.showDemo}
          </button>
          <div id="hush-demo-content" hidden={!demoExpanded}>
            {demoExpanded && <>
              <VideoPlayer key={video.id} video={video} index={1} label={ui.videoNames[1]} ui={ui} />
              <div className="hush-video-links"><a href={video.url} target="_blank" rel="noreferrer">{ui.watch} ↗</a></div>
            </>}
          </div>
        </div>

      <section id="hush-story" className="hush-section hush-story">
        <div className="hush-story-copy">
          <h2>{ui.storyTitle}</h2>
          {content.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div>
          <VideoPlayer video={HUSH_VIDEOS[0]} index={0} label="RISE AND FALL" poster={content.gallery[0].src} ui={ui} />
          <div className="hush-video-links"><a href={HUSH_VIDEOS[0].url} target="_blank" rel="noreferrer">{ui.watch} ↗</a><a href={content.sources[3].url} target="_blank" rel="noreferrer">{ui.chineseVideo} ↗</a></div>
        </div>
      </section>
      <CharacterGallery images={content.gallery} ui={ui} />

      <details className="hush-unlock">
        <summary>{ui.releaseLabel}</summary>
        <dl className="hush-quick-facts">
          {regions.map(([region, sourceIndex]) => <div key={region}><dt>{ui[region]}</dt><dd><a href={content.sources[sourceIndex].url} target="_blank" rel="noreferrer">{ui[`${region}Date`]}</a></dd></div>)}
        </dl>
        {regions.map(([region]) => <p key={region}><strong>{ui[region]}</strong> {region === 'china' ? ui.chinaUnlock : content.internationalUnlock}</p>)}
      </details>
      <HushCrosshair locale={locale} onCopy={onCopy} />
      <p className="hush-credit"><a href={HUSH_VIDEOS[1].url} target="_blank" rel="noreferrer">{ui.credit} ↗</a></p>
    </article>
  )
}
