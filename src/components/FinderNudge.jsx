import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { getFinderNudgeCopy } from '../i18n/finderNudgeCopy.js'
import {
  dismissFinderNudge,
  markFinderNudgeShown,
  recordFinderNudgeEntry,
  shouldShowFinderNudge,
} from '../utils/finderNudge.js'
import { trackEvent } from '../utils/analytics.js'

const SUPPORTED_ROUTE_TYPES = new Set(['home', 'catalog', 'crosshair', 'collection', 'article', 'guide', 'tool'])
const MIN_DWELL_MS = 8000

function isHighIntentTrigger(type) {
  return type === 'code_copy'
}

function getScrollThreshold(routeType) {
  return routeType === 'article' || routeType === 'guide' || routeType === 'tool' ? 0.28 : 0.16
}

function preserveQaParameters() {
  const parameters = new URLSearchParams(window.location.search)
  const preserved = new URLSearchParams()
  for (const key of ['qa', 'ga_debug', 'analytics_optout']) {
    const value = parameters.get(key)
    if (value) preserved.set(key, value)
  }
  return preserved.toString()
}

export default function FinderNudge({ locale, route, finderHref, engagementSignal, blocked = false }) {
  const copy = getFinderNudgeCopy(locale)
  const mountedAt = useRef(0)
  const shown = useRef(false)
  const [dwellReady, setDwellReady] = useState(false)
  const [scrollReady, setScrollReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [trigger, setTrigger] = useState('')
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 680px)').matches)

  const isEligibleRoute = SUPPORTED_ROUTE_TYPES.has(route.type)

  useEffect(() => {
    if (!isEligibleRoute || !shouldShowFinderNudge()) return undefined
    mountedAt.current = Date.now()
    const timer = window.setTimeout(() => setDwellReady(true), MIN_DWELL_MS)
    return () => window.clearTimeout(timer)
  }, [isEligibleRoute])

  useEffect(() => {
    if (!isEligibleRoute || !shouldShowFinderNudge()) return undefined
    const updateScrollReadiness = () => {
      const documentHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      if (window.scrollY / documentHeight >= getScrollThreshold(route.type)) setScrollReady(true)
    }
    updateScrollReadiness()
    window.addEventListener('scroll', updateScrollReadiness, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollReadiness)
  }, [isEligibleRoute, route.type])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 680px)')
    const updateMobile = () => setMobile(media.matches)
    updateMobile()
    media.addEventListener('change', updateMobile)
    return () => media.removeEventListener('change', updateMobile)
  }, [])

  useEffect(() => {
    if (!isEligibleRoute || blocked || visible || shown.current) return
    const behaviorTrigger = engagementSignal?.type || ''
    const scrollTrigger = scrollReady ? `scroll_${route.type}` : ''
    const highIntentReady = isHighIntentTrigger(behaviorTrigger)
    if (!dwellReady && !highIntentReady) return
    if (!behaviorTrigger && !scrollTrigger) return
    if (!shouldShowFinderNudge()) return

    const nextTrigger = behaviorTrigger || scrollTrigger
    const timer = window.setTimeout(() => {
      if (shown.current || !shouldShowFinderNudge()) return
      shown.current = true
      markFinderNudgeShown()
      setTrigger(nextTrigger)
      setVisible(true)
      trackEvent('finder_nudge_view', {
        entry_page_type: route.type,
        nudge_trigger: nextTrigger,
        nudge_surface: mobile ? 'mobile_fab' : 'desktop_card',
        message_variant: highIntentReady ? 'post_copy_v2' : 'reaction_test_v1',
        shown_after_seconds: Math.round((Date.now() - mountedAt.current) / 1000),
      })
    }, behaviorTrigger ? 500 : 0)
    return () => window.clearTimeout(timer)
  }, [blocked, dwellReady, engagementSignal, isEligibleRoute, mobile, route.type, scrollReady, visible])

  useEffect(() => {
    if (!visible || !expanded) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [expanded, visible])

  if (!isEligibleRoute || !visible || blocked) return null

  const close = () => {
    dismissFinderNudge()
    setVisible(false)
    trackEvent('finder_nudge_dismiss', {
      entry_page_type: route.type,
      nudge_trigger: trigger || 'unknown',
      nudge_surface: mobile ? 'mobile_fab' : 'desktop_card',
    })
  }

  const openFinder = () => {
    recordFinderNudgeEntry({ pageType: route.type, trigger: trigger || 'unknown' })
    trackEvent('finder_nudge_click', {
      entry_page_type: route.type,
      nudge_trigger: trigger || 'unknown',
      nudge_surface: mobile ? 'mobile_fab' : 'desktop_card',
      message_variant: isHighIntentTrigger(trigger) ? 'post_copy_v2' : 'reaction_test_v1',
    })
    trackEvent('finder_open', { interaction_source: 'finder_nudge' })
    const qa = preserveQaParameters()
    window.location.assign(`${finderHref}${qa ? `?${qa}` : ''}`)
  }

  if (mobile && !expanded) {
    return (
      <button className="finder-nudge finder-nudge--fab" type="button" onClick={() => setExpanded(true)} aria-label={copy.mobileLabel}>
        <Icon name="target" size={20} />
        <span>{copy.mobileLabel}</span>
      </button>
    )
  }

  return (
    <aside className={`finder-nudge finder-nudge--card ${mobile ? 'is-mobile-card' : ''}`} aria-label={copy.title}>
      <button className="finder-nudge__close" type="button" onClick={close} aria-label={copy.close}>
        <Icon name="x" size={16} />
      </button>
      <div className="finder-nudge__eyebrow"><Icon name="target" size={14} />{copy.eyebrow}</div>
      <h2>{copy.title}</h2>
      <p>{copy.body}</p>
      <span className="finder-nudge__meta">{copy.meta}</span>
      <button className="finder-nudge__cta" type="button" onClick={openFinder}>{copy.cta}<Icon name="arrowRight" size={16} /></button>
    </aside>
  )
}
