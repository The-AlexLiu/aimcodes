import { useEffect, useRef, useState } from 'react'
import { featuredAgents, agentName } from '../data/agentDirectory.js'
import { agentsCopy } from '../seo/agentsContent.js'
import { routePath } from '../seo/routes.js'
import './agentDirectory.css'

const tones = ['#9adce6', '#9edbc5', '#9c9fe2', '#e8aa72', '#a6c6e5', '#d7bd7b', '#b0d16d', '#eead78', '#d3c4a2', '#c58cda', '#b8ce86', '#8ca9e5']

export default function HomeAgentSection({ locale }) {
  const copy = agentsCopy(locale)
  const sectionRef = useRef(null)
  const [nearViewport, setNearViewport] = useState(false)
  const [inViewport, setInViewport] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)
  const [decoded, setDecoded] = useState(() => new Set())

  useEffect(() => {
    const preload = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setNearViewport(true)
      preload.disconnect()
    }, { rootMargin: '500px 0px' })
    const visibility = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting))
    preload.observe(sectionRef.current)
    visibility.observe(sectionRef.current)
    const updateTab = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', updateTab)
    return () => {
      preload.disconnect()
      visibility.disconnect()
      document.removeEventListener('visibilitychange', updateTab)
    }
  }, [])

  async function markDecoded(image, id) {
    try {
      await image.decode()
    } catch {
      if (!image.naturalWidth) return
    }
    setDecoded(previous => previous.has(id) ? previous : new Set([...previous, id]))
  }
  return (
    <section ref={sectionRef} className="home-agents" aria-labelledby="home-agents-title">
      <header className="home-agents-heading">
        <div><h2 id="home-agents-title">{copy.homeTitle}</h2><p>{copy.intro}</p></div>
        <a className="home-agents-all" href={routePath(locale, { type: 'agents' })}>{copy.viewAll}<span aria-hidden="true"> ↗</span></a>
      </header>
      <div className="home-agents-window" data-visible={inViewport && tabVisible} role="region" aria-label={copy.homeTitle}>
        {[featuredAgents.slice(0, 6), featuredAgents.slice(6)].map((row, rowIndex) => <div className="home-agents-lane" key={rowIndex} data-ready={row.every(agent => decoded.has(agent.id))}><div className="home-agents-track">
          {[false, true].map(duplicate => <div className="home-agents-row" key={String(duplicate)} aria-hidden={duplicate || undefined}>{row.map((agent, index) => <a className="home-agent-tile" key={agent.id} href={routePath(locale, { type: 'article', articleKey: agent.id })} style={{ '--agent-tone': tones[rowIndex * 6 + index] }} tabIndex={duplicate ? -1 : undefined}>

            <img
              src={nearViewport ? `/images/agents/home/${agent.id}-640.webp` : undefined}
              srcSet={nearViewport ? `/images/agents/home/${agent.id}-640.webp 640w, /images/agents/home/${agent.id}-960.webp 960w` : undefined}
              sizes="(max-width: 600px) 303px, 376px"
              width="960" height="872" alt="" decoding="async" fetchPriority={inViewport ? 'auto' : 'low'}
              data-loaded={decoded.has(agent.id)} onLoad={event => markDecoded(event.currentTarget, agent.id)}
            />
            <div className="home-agent-label"><span>{copy.roles[agent.role]}</span><h3>{agentName(agent, locale)}</h3></div><span className="home-agent-arrow" aria-hidden="true">↗</span>
          </a>)}</div>)}
        </div></div>)}
      </div>

    </section>
  )
}
