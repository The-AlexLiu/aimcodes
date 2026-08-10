import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CodeDialog from './components/CodeDialog.jsx'
import { BrandMark, BrandWordmark } from './components/BrandLogo.jsx'
import CrosshairCanvas from './components/CrosshairCanvas.jsx'
import CrosshairCard from './components/CrosshairCard.jsx'
import CrosshairFinder from './components/CrosshairFinder.jsx'
import CrosshairSeoDetails from './components/CrosshairSeoDetails.jsx'
import Icon from './components/Icon.jsx'
import ImportGuide from './components/ImportGuide.jsx'
import SeoCollectionDetails from './components/SeoCollectionDetails.jsx'
import SeoCollectionIntro from './components/SeoCollectionIntro.jsx'
import SeoPageIntro from './components/SeoPageIntro.jsx'
import SeoArticlePage from './components/SeoArticlePage.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import PublisherValueSection from './components/PublisherValueSection.jsx'
import TrustPage from './components/TrustPage.jsx'
import { isAdEligibleRoute } from './config/adPolicy.js'
import { crosshairs, filters } from './data/crosshairs.js'
import { crosshairColorPresets, previewBackgroundOptions as backgroundOptions } from './data/previewOptions.js'
import { createTranslator, languages, localizeCrosshair } from './i18n/translations.js'
import { collectionCopy, pageSlug, routeMetadata, seoCopy } from './seo/content.js'
import { localizedRoutePath, parseSeoRoute, routePath, SEO_COLLECTIONS, SEO_CROSSHAIR_IDS } from './seo/routes.js'
import { parseCrosshairCode, updateCrosshairColor } from './utils/crosshairCode.js'
import { dedupeCrosshairsByAppearance } from './utils/crosshairSimilarity.js'
import { setAnalyticsContext, trackEvent, trackPageView } from './utils/analytics.js'
import { createCrosshairShareUrl, isSharedCrosshairEntry, readSharedPreviewOptions } from './utils/shareLinks.js'

const RECENT_STORAGE_KEY = 'aimcodes-recent-v1'
const utilityFilters = ['recent']
const distinctCatalogCrosshairs = dedupeCrosshairsByAppearance(crosshairs)
const catalogOrder = new Map(distinctCatalogCrosshairs.map((item, index) => [item.id, index]))
const recommendedOrder = new Map(SEO_CROSSHAIR_IDS.map((id, index) => [id, index]))
const MAIN_PREVIEW_SCALE = 2.25

function readStoredValue(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null')
    return value ?? fallback
  } catch {
    return fallback
  }
}

async function copyToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  if (!copied) throw new Error('Copy command failed')
}

function hydrateCrosshair(item) {
  try {
    const parsed = parseCrosshairCode(item.code, { fallbackColor: item.color })
    return {
      ...item,
      color: parsed.color,
      colorKey: item.colorKey || parsed.colorKey,
      previewApproximate: parsed.approximate,
    }
  } catch {
    return { ...item, colorKey: item.colorKey || 'custom', previewInvalid: true }
  }
}

function readSharedColorOverride(colorKey, routeType, crosshairId) {
  if (routeType !== 'crosshair') return {}
  const color = crosshairColorPresets.find((option) => option.key === colorKey)
  const crosshair = crosshairs.find((item) => item.id === crosshairId)
  if (!color || !crosshair) return {}

  try {
    return { [crosshair.id]: updateCrosshairColor(crosshair.code, { preset: color.preset }) }
  } catch {
    return {}
  }
}

function updatePageMetadata(language, metadata) {
  document.documentElement.lang = language
  document.title = metadata.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description)
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title)
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', metadata.canonical)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', metadata.canonical)
}

export default function App() {
  const initialParams = useMemo(() => new URLSearchParams(window.location.search), [])
  const route = useMemo(() => parseSeoRoute(window.location.pathname), [])
  const [language] = useState(route.locale)
  const [recentIds, setRecentIds] = useState(() => readStoredValue(RECENT_STORAGE_KEY, []))
  const [selectedId, setSelectedId] = useState(() => route.crosshairId || crosshairs[0].id)
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [catalogSort, setCatalogSort] = useState('recommended')
  const [background, setBackground] = useState(() => readSharedPreviewOptions(initialParams).background)
  const [colorOverrides, setColorOverrides] = useState(() => readSharedColorOverride(readSharedPreviewOptions(initialParams).colorKey, route.type, route.crosshairId))
  const [toast, setToast] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [crosshairShareStatus, setCrosshairShareStatus] = useState('idle')
  const [showInstructions, setShowInstructions] = useState(false)
  const [showPreviewSettings, setShowPreviewSettings] = useState(true)
  const [mobileNav, setMobileNav] = useState(false)
  const [finderFocus, setFinderFocus] = useState(false)
  const [codeDialogItem, setCodeDialogItem] = useState(null)
  const toastTimer = useRef(null)
  const copiedTimer = useRef(null)
  const crosshairShareTimer = useRef(null)
  const searchAnalyticsTimer = useRef(null)
  const t = useMemo(() => createTranslator(language), [language])
  const currentLanguage = languages.find((item) => item.code === language) || languages[0]
  const showFinder = route.type === 'finder'
  const currentView = route.type
  const activeCollection = route.type === 'collection' ? SEO_COLLECTIONS[route.collectionKey] : null
  const sharedCrosshairEntry = isSharedCrosshairEntry(initialParams, route.type)

  const hydratedCrosshairs = useMemo(
    () => distinctCatalogCrosshairs.map(hydrateCrosshair),
    [],
  )

  const hydratedSourceCrosshairs = useMemo(
    () => crosshairs.map(hydrateCrosshair),
    [],
  )

  const allCrosshairs = useMemo(
    () => hydratedCrosshairs.map((item) => localizeCrosshair(item, language, t)),
    [hydratedCrosshairs, language, t],
  )

  const allSourceCrosshairs = useMemo(
    () => hydratedSourceCrosshairs.map((item) => localizeCrosshair(item, language, t)),
    [hydratedSourceCrosshairs, language, t],
  )

  const routeCrosshair = route.type === 'crosshair'
    ? allSourceCrosshairs.find((item) => item.id === route.crosshairId)
    : null
  const routeCrosshairCategory = routeCrosshair?.category || ''

  const storedSelected = routeCrosshair || allCrosshairs.find((item) => item.id === selectedId) || allCrosshairs[0]
  const activeBackground = backgroundOptions.find((option) => option.value === background) || backgroundOptions[0]
  const activeBackgroundName = t(`maps.${activeBackground.value}`)

  const visibleCrosshairs = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(language)
    const filtered = allCrosshairs.filter((item) => {
      const localizedCategory = t(`filters.${item.category}`)
      const matchesText = !normalized || [item.name, item.shortName, item.player, item.description, localizedCategory, item.colorName]
        .join(' ')
        .toLocaleLowerCase(language)
        .includes(normalized)
      const matchesFilter = activeFilter === 'all'
        || (activeFilter === 'pro' && item.isPro)
        || (activeFilter === 'cute' && item.isCute)
        || (activeFilter === 'recent' && recentIds.includes(item.id))
        || item.category === activeFilter
      return matchesText && matchesFilter
    })

    return filtered.sort((left, right) => {
      if (activeFilter === 'recent') return recentIds.indexOf(left.id) - recentIds.indexOf(right.id)
      if (catalogSort === 'name') return left.shortName.localeCompare(right.shortName, language, { sensitivity: 'base' })
      if (catalogSort === 'updated') {
        const byDate = String(right.sourceCheckedAt || '').localeCompare(String(left.sourceCheckedAt || ''))
        if (byDate) return byDate
      }

      const leftPriority = recommendedOrder.get(left.id) ?? Number.MAX_SAFE_INTEGER
      const rightPriority = recommendedOrder.get(right.id) ?? Number.MAX_SAFE_INTEGER
      if (leftPriority !== rightPriority) return leftPriority - rightPriority
      if (left.isPro !== right.isPro) return left.isPro ? -1 : 1
      return (catalogOrder.get(left.id) ?? 0) - (catalogOrder.get(right.id) ?? 0)
    })
  }, [activeFilter, allCrosshairs, catalogSort, language, query, recentIds, t])

  const displayedCrosshairs = (() => {
    if (route.type === 'catalog') return visibleCrosshairs
    if (route.type === 'home') {
      return SEO_CROSSHAIR_IDS.map((id) => allCrosshairs.find((item) => item.id === id)).filter(Boolean)
    }
    if (route.type === 'collection') {
      return activeCollection.crosshairIds.map((id) => allCrosshairs.find((item) => item.id === id)).filter(Boolean)
    }
    if (route.type === 'crosshair') {
      const sameCategory = allCrosshairs.filter((item) => item.id !== route.crosshairId && item.category === routeCrosshairCategory)
      const priority = SEO_CROSSHAIR_IDS.map((id) => allCrosshairs.find((item) => item.id === id))
        .filter((item) => item && item.id !== route.crosshairId)
      return [...sameCategory, ...priority]
        .filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index)
        .slice(0, 6)
    }
    return []
  })()

  const selectedBase = route.type !== 'crosshair' && visibleCrosshairs.length && !visibleCrosshairs.some((item) => item.id === storedSelected.id)
    ? visibleCrosshairs[0]
    : storedSelected
  const selectedOverrideCode = colorOverrides[selectedBase.id]
  const selected = selectedOverrideCode
    ? (() => {
        const recolored = hydrateCrosshair({ ...selectedBase, code: selectedOverrideCode, colorKey: undefined })
        return {
          ...recolored,
          name: t('preview.colorVariant', { name: selectedBase.shortName, color: t(`colors.${recolored.colorKey}`) }),
          description: t('preview.colorVariantDescription'),
          colorName: t(`colors.${recolored.colorKey}`),
        }
      })()
    : selectedBase
  const selectedCodeColorKey = (() => {
    try {
      return parseCrosshairCode(selected.code, { fallbackColor: selected.color }).colorKey
    } catch {
      return 'custom'
    }
  })()

  const activeCodeDialogItem = codeDialogItem
    ? { ...(allCrosshairs.find((item) => item.id === codeDialogItem.id) || {}), ...codeDialogItem }
    : null

  useEffect(() => {
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentIds))
  }, [recentIds])

  useEffect(() => {
    const metadata = routeMetadata(language, route, routeCrosshair)
    updatePageMetadata(language, metadata)
  }, [language, route, routeCrosshair])

  useEffect(() => {
    const metadata = routeMetadata(language, route, routeCrosshair)
    setAnalyticsContext({
      app_language: language,
      app_view: currentView,
      page_type: route.type,
      page_slug: pageSlug(route),
      crosshair_id: route.crosshairId || '',
      shared_entry: sharedCrosshairEntry,
    })
    trackPageView(window.location.pathname, metadata.title)
  }, [currentView, language, route, routeCrosshair, sharedCrosshairEntry])

  useEffect(() => {
    if (!sharedCrosshairEntry || !route.crosshairId) return
    trackEvent('share_landing', {
      content_type: 'crosshair',
      item_id: route.crosshairId,
      shared_color: initialParams.get('color') || 'original',
      shared_map: initialParams.get('mapa') || 'ascent',
    })
  }, [initialParams, route.crosshairId, sharedCrosshairEntry])

  useEffect(() => {
    if (searchAnalyticsTimer.current) window.clearTimeout(searchAnalyticsTimer.current)
    const normalizedQuery = query.trim()
    if (route.type !== 'catalog' || normalizedQuery.length < 2) return undefined

    searchAnalyticsTimer.current = window.setTimeout(() => {
      trackEvent('search_used', {
        query_length: normalizedQuery.length,
        results_count: visibleCrosshairs.length,
        has_results: visibleCrosshairs.length > 0,
      })
    }, 700)

    return () => {
      if (searchAnalyticsTimer.current) window.clearTimeout(searchAnalyticsTimer.current)
    }
  }, [query, route.type, visibleCrosshairs.length])

  useEffect(() => {
    if (selected.id === selectedId) return undefined
    const frame = window.requestAnimationFrame(() => setSelectedId(selected.id))
    return () => window.cancelAnimationFrame(frame)
  }, [selected.id, selectedId])

  const notify = (message, type = 'success') => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast({ message, type })
    toastTimer.current = window.setTimeout(() => setToast(null), 2400)
  }

  const copyCrosshair = async (item, options = {}) => {
    let copied = false
    try {
      await copyToClipboard(item.code)
      setCopiedId(item.id)
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
      copiedTimer.current = window.setTimeout(() => setCopiedId(null), 1800)
      notify(t('toast.copied', { name: item.shortName }))
      trackEvent('crosshair_code_copy', {
        crosshair_id: item.id,
        crosshair_name: item.shortName,
        crosshair_category: item.category,
        interaction_source: options.interactionSource || 'explore_preview',
      })
      copied = true
    } catch {
      setCodeDialogItem(item)
      notify(t('toast.copyBlocked'), 'error')
    }
    if (!options.keepDialogOpen && options.closeDialog) setCodeDialogItem(null)
    return copied
  }

  const shareCrosshair = async () => {
    if (crosshairShareStatus === 'working') return
    const shareUrl = createCrosshairShareUrl({
      origin: window.location.origin,
      locale: language,
      crosshairId: selected.id,
      background,
      colorKey: selectedCodeColorKey,
    })

    setCrosshairShareStatus('working')
    try {
      let method = 'link_code_copy'
      if (navigator.share) {
        await navigator.share({
          title: t('share.crosshairTitle', { name: selected.shortName }),
          text: t('share.crosshairText', { name: selected.shortName }),
          url: shareUrl,
        })
        method = 'native_share'
        setCrosshairShareStatus('shared')
        notify(t('toast.shared'))
      } else {
        await copyToClipboard(t('share.crosshairBundle', {
          name: selected.name,
          code: selected.code,
          url: shareUrl,
        }))
        setCrosshairShareStatus('copied')
        notify(t('toast.linkCopied'))
      }

      trackEvent('share', {
        method,
        content_type: 'crosshair',
        item_id: selected.id,
        crosshair_category: selected.category,
        shared_color: selectedCodeColorKey,
        shared_map: background,
        interaction_source: 'explore_preview',
      })
      if (crosshairShareTimer.current) window.clearTimeout(crosshairShareTimer.current)
      crosshairShareTimer.current = window.setTimeout(() => setCrosshairShareStatus('idle'), 2400)
    } catch (error) {
      if (error?.name === 'AbortError') {
        trackEvent('share_cancel', { content_type: 'crosshair', item_id: selected.id })
        setCrosshairShareStatus('idle')
        return
      }
      console.error('Unable to share the crosshair.', error)
      trackEvent('share_error', { content_type: 'crosshair', item_id: selected.id })
      setCrosshairShareStatus('error')
      notify(t('toast.shareFailed'), 'error')
      if (crosshairShareTimer.current) window.clearTimeout(crosshairShareTimer.current)
      crosshairShareTimer.current = window.setTimeout(() => setCrosshairShareStatus('idle'), 2400)
    }
  }

  const selectCrosshair = (item, interactionSource = 'catalog_grid') => {
    setSelectedId(item.id)
    setRecentIds((current) => [item.id, ...current.filter((id) => id !== item.id)].slice(0, 8))
    trackEvent('select_content', {
      content_type: 'crosshair',
      item_id: item.id,
      crosshair_name: item.shortName,
      crosshair_category: item.category,
      is_pro: Boolean(item.isPro),
      interaction_source: interactionSource,
    })
  }

  const changeCrosshairColor = (option) => {
    try {
      const nextCode = updateCrosshairColor(selected.code, { preset: option.preset })
      setColorOverrides((current) => ({ ...current, [selected.id]: nextCode }))
      trackEvent('crosshair_color_change', {
        crosshair_id: selected.id,
        color_key: option.key,
        interaction_source: 'explore_preview',
      })
    } catch {
      notify(t('errors.invalidColor'), 'error')
    }
  }

  const changeBackground = (nextBackground) => {
    setBackground(nextBackground)
    trackEvent('map_change', { map_name: nextBackground, interaction_source: 'explore_preview' })
  }

  const toggleInstructions = () => {
    const willOpen = !showInstructions
    setShowInstructions(willOpen)
    if (willOpen) trackEvent('import_guide_open', { interaction_source: 'explore_preview' })
  }

  const changeFilter = (nextFilter) => {
    setActiveFilter(nextFilter)
    trackEvent('filter_select', { filter_name: nextFilter })
  }

  const changeSort = (nextSort) => {
    setCatalogSort(nextSort)
    trackEvent('catalog_sort_change', { sort_name: nextSort })
  }

  const openRandomCrosshair = (pool, interactionSource) => {
    const candidates = (pool?.length ? pool : allCrosshairs).filter((item) => item.id !== selected.id)
    const next = candidates[Math.floor(Math.random() * candidates.length)] || pool?.[0] || allCrosshairs[0]
    selectCrosshair(next, interactionSource)
    trackEvent('random_crosshair', { crosshair_id: next.id, interaction_source: interactionSource })
    window.location.assign(routePath(language, { type: 'crosshair', crosshairId: next.id }))
  }

  const handleFinderFocusChange = useCallback((isFocused) => {
    setFinderFocus(isFocused)
    if (isFocused) setMobileNav(false)
  }, [])

  const changeLanguage = (nextLanguage) => {
    trackEvent('language_change', { from_language: language, to_language: nextLanguage })
    setMobileNav(false)
    const params = new URLSearchParams()
    if (background !== 'ascent' && (route.type === 'home' || route.type === 'crosshair')) params.set('mapa', background)
    if (route.type === 'crosshair' && crosshairColorPresets.some((option) => option.key === selectedCodeColorKey)) params.set('color', selectedCodeColorKey)
    for (const key of ['challenge', 'rank', 'utm_source', 'utm_medium', 'utm_campaign', 'qa', 'ga_debug']) {
      const value = initialParams.get(key)
      if (value) params.set(key, value)
    }
    const queryString = params.toString()
    window.location.assign(`${localizedRoutePath(nextLanguage, route)}${queryString ? `?${queryString}` : ''}`)
  }

  const exitFinder = () => {
    window.location.assign(routePath(language, { type: 'catalog' }))
  }

  return (
    <div className={`app-shell ${finderFocus ? 'is-finder-focus' : ''}`} data-locale={language}>
      <header className="topbar">
        <a className="brand" href={routePath(language, { type: 'home' })} aria-label={`AimCodes · ${t('nav.explore')}`}>
          <BrandMark />
          <BrandWordmark />
        </a>
        <nav className={mobileNav ? 'is-open' : ''} aria-label={t('nav.explore')}>
          <a className={route.type === 'catalog' || route.type === 'crosshair' || route.type === 'collection' ? 'is-active' : ''} href={routePath(language, { type: 'catalog' })}>{t('nav.explore')}</a>
          <a className={showFinder ? 'is-active' : ''} href={routePath(language, { type: 'finder' })} onClick={() => trackEvent('finder_open', { interaction_source: 'navigation' })}>{t('nav.finder')}</a>
        </nav>
        <label className="language-selector" title={t('language.label')}>
          <Icon name="globe" size={17} />
          <span className="language-value"><b>{currentLanguage.short}</b><em>{currentLanguage.label}</em></span>
          <Icon name="chevronDown" size={14} />
          <select value={language} onChange={(event) => changeLanguage(event.target.value)} aria-label={t('language.label')}>
            {languages.map((item) => <option value={item.code} key={item.code}>{item.label}</option>)}
          </select>
        </label>
        <button className="mobile-menu" type="button" aria-label={t('nav.explore')} aria-expanded={mobileNav} onClick={() => setMobileNav(!mobileNav)}>
          <Icon name="menu" />
        </button>
      </header>

      <main id="top" data-ad-eligible={isAdEligibleRoute(route) ? 'true' : 'false'} className={showFinder ? 'finder-main' : route.type === 'guide' || route.type === 'article' || route.type === 'trust' ? 'guide-main' : ''}>
        {route.type === 'notFound' ? (
          <section className="not-found-page">
            <span>404</span>
            <h1>{seoCopy(language).notFound.title}</h1>
            <p>{seoCopy(language).notFound.body}</p>
            <a className="primary-button" href={routePath(language, { type: 'catalog' })}>{seoCopy(language).notFound.action}</a>
          </section>
        ) : route.type === 'guide' ? (
          <ImportGuide locale={language} />
        ) : route.type === 'article' ? (
          <SeoArticlePage locale={language} articleKey={route.articleKey} crosshairs={allCrosshairs} />
        ) : route.type === 'trust' ? (
          <TrustPage locale={language} pageKey={route.pageKey} />
        ) : showFinder ? (
          <CrosshairFinder crosshairs={allCrosshairs} onExit={exitFinder} onCopy={copyCrosshair} onFocusChange={handleFinderFocusChange} t={t} />
        ) : (
          <>
        {(route.type === 'home' || route.type === 'catalog') && <SeoPageIntro locale={language} type={route.type} />}
        {route.type === 'collection' && <SeoCollectionIntro locale={language} collectionKey={route.collectionKey} />}

        {route.type === 'catalog' && <div className="search-bar">
          <Icon name="search" size={21} />
          <input
            aria-label={t('search.label')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && visibleCrosshairs[0]) selectCrosshair(visibleCrosshairs[0], 'search_enter')
              if (event.key === 'Escape') setQuery('')
            }}
            placeholder={t('search.placeholder')}
          />
          {query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label={t('search.clear')}><Icon name="x" size={17} /></button>}
          <span className="search-shortcut" aria-hidden="true">/</span>
        </div>}

        {(route.type === 'home' || route.type === 'crosshair') && <section className="workspace" aria-label={t('workspace.label')}>
          <div className="preview-frame">
            <img src={activeBackground.image} alt={t('preview.mapAlt', { map: activeBackgroundName })} width="914" height="514" loading="eager" decoding="async" fetchPriority="high" />
            <CrosshairCanvas crosshair={selected} scale={MAIN_PREVIEW_SCALE} label={t('card.test', { name: selected.name })} />
            <div className="hud-map" aria-hidden="true"><strong>{activeBackgroundName.toLocaleUpperCase(language)}</strong></div>
            <span className="hud-ticks" aria-hidden="true" />
            <span className="corner corner-tl" />
            <span className="corner corner-tr" />
            <span className="corner corner-bl" />
            <span className="corner corner-br" />
          </div>

          <aside className={`detail-panel ${selected.isCute ? 'is-cute' : ''}`}>
            <span className="panel-cut" aria-hidden="true" />
            <div className="detail-heading">
              {route.type === 'crosshair' ? <h1>{selected.name}</h1> : <h2>{selected.name}</h2>}
              <p>{selected.description}</p>
            </div>

            <button className="settings-toggle" type="button" onClick={() => setShowPreviewSettings(!showPreviewSettings)} aria-expanded={showPreviewSettings} aria-controls="preview-settings">
              {t('preview.settings')} <Icon name="chevronDown" size={16} />
            </button>
            <div className={`preview-settings ${showPreviewSettings ? 'is-open' : ''}`} id="preview-settings">
              <div className="panel-divider" />
              <fieldset className="background-picker">
                <legend>{t('preview.background')}</legend>
                <div className="background-options">
                  {backgroundOptions.map((option) => (
                    <button key={option.value} className={`background-option ${background === option.value ? 'is-selected' : ''}`} type="button" onClick={() => changeBackground(option.value)} aria-pressed={background === option.value}>
                      <span className="background-swatch"><img src={option.image} alt="" width="914" height="514" loading="lazy" decoding="async" /></span>
                      <span>{t(`maps.${option.value}`)}</span>
                      {background === option.value && <i><Icon name="check" size={12} strokeWidth={2.6} /></i>}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="crosshair-color-picker">
                <legend>{t('preview.crosshairColor')}</legend>
                <div className="crosshair-color-options">
                  {crosshairColorPresets.map((option) => (
                    <button
                      className={selectedCodeColorKey === option.key ? 'is-selected' : ''}
                      type="button"
                      onClick={() => changeCrosshairColor(option)}
                      aria-label={t(`colors.${option.key}`)}
                      aria-pressed={selectedCodeColorKey === option.key}
                      title={t(`colors.${option.key}`)}
                      key={option.key}
                    >
                      <span style={{ background: option.hex }} />
                    </button>
                  ))}
                </div>
                <p className="control-help">{t('preview.colorHelp')}</p>
              </fieldset>
            </div>

            <div className="action-row is-shareable">
              <button className="primary-button" type="button" onClick={() => copyCrosshair(selected, { interactionSource: 'explore_preview' })}>
                <Icon name={copiedId === selected.id ? 'check' : 'copy'} /> {copiedId === selected.id ? t('actions.copied') : t('actions.copy')}
              </button>
              <button className="secondary-button" type="button" onClick={toggleInstructions} aria-expanded={showInstructions}>
                <Icon name="gamepad" /> {t('actions.import')}
              </button>
              <button className="secondary-button share-crosshair-button" type="button" onClick={shareCrosshair} disabled={crosshairShareStatus === 'working'} aria-live="polite">
                <Icon name={crosshairShareStatus === 'shared' || crosshairShareStatus === 'copied' ? 'check' : 'share'} />
                {crosshairShareStatus === 'working'
                  ? t('share.crosshairWorking')
                  : crosshairShareStatus === 'shared'
                    ? t('share.crosshairShared')
                    : crosshairShareStatus === 'copied'
                      ? t('share.crosshairCopied')
                      : crosshairShareStatus === 'error'
                        ? t('share.crosshairError')
                        : t('share.crosshairAction')}
              </button>
            </div>
            {showInstructions && (
              <ol className="instruction-box">
                <li>{t('instructions.one')}</li>
                <li>{t('instructions.two')}</li>
                <li>{t('instructions.three')}</li>
              </ol>
            )}
          </aside>
        </section>}

        {route.type === 'crosshair' && (
          <CrosshairSeoDetails crosshair={selected} locale={language} />
        )}

        {(route.type === 'home' || route.type === 'catalog' || route.type === 'crosshair' || route.type === 'collection') && <section className="collection-section" id="collection">
          {route.type === 'catalog' || route.type === 'collection' ? (
            <div className="catalog-summary">
              <h2 className={route.type === 'catalog' ? 'visually-hidden' : ''}>{route.type === 'collection' ? collectionCopy(language, route.collectionKey).gridTitle : t('collection.title')}</h2>
              <span>{t(displayedCrosshairs.length === 1 ? 'collection.countOne' : 'collection.countMany', { count: displayedCrosshairs.length })}</span>
              <button type="button" onClick={() => openRandomCrosshair(displayedCrosshairs, route.type === 'collection' ? 'collection_random' : 'catalog_random')}>
                <Icon name="rotate" size={16} /> {t('actions.random')}
              </button>
            </div>
          ) : (
            <div className="collection-heading">
              <div className="collection-title-block">
                <BrandMark compact />
                <div>
                  <h2>{route.type === 'home' ? seoCopy(language).home.popular : seoCopy(language).detail.related}</h2>
                  <p>{route.type === 'home' ? seoCopy(language).home.popularBody : t('collection.subtitle')}</p>
                </div>
              </div>
              <div className="collection-meta">
                <span>{t(displayedCrosshairs.length === 1 ? 'collection.countOne' : 'collection.countMany', { count: displayedCrosshairs.length })}</span>
                {route.type === 'crosshair' && (
                  <button type="button" onClick={() => openRandomCrosshair(displayedCrosshairs, 'related_random')}>
                    <Icon name="rotate" size={15} /> {t('actions.random')}
                  </button>
                )}
              </div>
            </div>
          )}
          {route.type === 'catalog' && <div className="filters" aria-label={t('filters.label')}>
            <div className="filter-tabs">
              {[...filters, ...(recentIds.length >= 2 ? utilityFilters : [])].map((filter) => (
                <button key={filter} type="button" className={activeFilter === filter ? 'is-active' : ''} onClick={() => changeFilter(filter)}>
                  {t(`filters.${filter}`)}
                </button>
              ))}
            </div>
            <label className="catalog-sort">
              <span>{t('sort.label')}</span>
              <select value={catalogSort} onChange={(event) => changeSort(event.target.value)}>
                <option value="recommended">{t('sort.recommended')}</option>
                <option value="name">{t('sort.name')}</option>
                <option value="updated">{t('sort.updated')}</option>
              </select>
              <Icon name="chevronDown" size={14} />
            </label>
          </div>}

          {displayedCrosshairs.length > 0 ? (
            <div className="crosshair-grid">
              {displayedCrosshairs.map((item) => (
                <CrosshairCard key={item.id} crosshair={item} href={routePath(language, { type: 'crosshair', crosshairId: item.id })} selected={route.type !== 'catalog' && route.type !== 'collection' && selected.id === item.id} copied={copiedId === item.id} onSelect={selectCrosshair} onCopy={copyCrosshair} t={t} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-crosshair">+</span>
              <h3>{t('empty.filteredTitle')}</h3>
              <p>{t('empty.filteredBody')}</p>
              <button type="button" onClick={() => setQuery('')}>{t('actions.clear')}</button>
            </div>
          )}
        </section>}
        {route.type === 'collection' && <SeoCollectionDetails locale={language} collectionKey={route.collectionKey} />}
        {(route.type === 'home' || route.type === 'catalog') && <PublisherValueSection locale={language} type={route.type} />}
          </>
        )}
      </main>

      <SiteFooter locale={language} />

      {toast && <div className={`toast ${toast.type === 'error' ? 'is-error' : ''}`} role="status"><span><Icon name={toast.type === 'error' ? 'x' : 'check'} size={15} strokeWidth={2.5} /></span>{toast.message}</div>}
      {activeCodeDialogItem && <CodeDialog crosshair={activeCodeDialogItem} onClose={() => setCodeDialogItem(null)} onCopy={copyCrosshair} t={t} />}
    </div>
  )
}
