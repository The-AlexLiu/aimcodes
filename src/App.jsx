import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CatalogSearch from './components/CatalogSearch.jsx'
import CrosshairCollectionSection from './components/CrosshairCollectionSection.jsx'
import CrosshairPreviewWorkspace from './components/CrosshairPreviewWorkspace.jsx'
import Icon from './components/Icon.jsx'
import SeoCollectionIntro from './components/SeoCollectionIntro.jsx'
import SeoPageIntro from './components/SeoPageIntro.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import PublisherValueSection from './components/PublisherValueSection.jsx'
import { isAdEligibleRoute } from './config/adPolicy.js'
import { catalogCrosshairs } from './data/catalogManifest.js'
import { filters } from './data/crosshairs.js'
import { crosshairColorPresets, previewBackgroundOptions as backgroundOptions } from './data/previewOptions.js'
import { createTranslator, languages } from './i18n/translations.js'
import { useCrosshairCatalog } from './hooks/useCrosshairCatalog.js'
import { pageSlug, seoCopy } from './seo/content.js'
import { localizedRoutePath, parseSeoRoute, routePath } from './seo/routes.js'
import { updateCrosshairColor } from './utils/crosshairCode.js'
import { setAnalyticsContext, trackEvent, trackPageView } from './utils/analytics.js'
import { createCrosshairShareUrl, isSharedCrosshairEntry, readSharedPreviewOptions } from './utils/shareLinks.js'

const RECENT_STORAGE_KEY = 'aimcodes-recent-v1'
const CATALOG_SESSION_KEY = 'aimcodes-catalog-session-v1'
const CATALOG_PAGE_SIZE = 48
const MAIN_PREVIEW_SCALE = 2.25

const CodeDialog = lazy(() => import('./components/CodeDialog.jsx'))
const CrosshairFinder = lazy(() => import('./components/CrosshairFinder.jsx'))
const CrosshairSeoDetails = lazy(() => import('./components/CrosshairSeoDetails.jsx'))
const CrosshairToolsPage = lazy(() => import('./components/CrosshairToolsPage.jsx'))
const HomeResourceDirectory = lazy(() => import('./components/HomeResourceDirectory.jsx'))
const ImportGuide = lazy(() => import('./components/ImportGuide.jsx'))
const SeoArticlePage = lazy(() => import('./components/SeoArticlePage.jsx'))
const SeoCollectionDetails = lazy(() => import('./components/SeoCollectionDetails.jsx'))
const TrustPage = lazy(() => import('./components/TrustPage.jsx'))

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function readStoredValue(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null')
    return value ?? fallback
  } catch {
    return fallback
  }
}

function readCatalogSession() {
  try {
    return JSON.parse(sessionStorage.getItem(CATALOG_SESSION_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeCatalogSession(value) {
  try {
    sessionStorage.setItem(CATALOG_SESSION_KEY, JSON.stringify(value))
  } catch {
    // Browsing and copying still work when session storage is unavailable.
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

function readSharedColorOverride(colorKey, routeType, crosshairId) {
  if (routeType !== 'crosshair') return {}
  const color = crosshairColorPresets.find((option) => option.key === colorKey)
  const crosshair = catalogCrosshairs.find((item) => item.id === crosshairId)
  if (!color || !crosshair) return {}

  try {
    return { [crosshair.id]: updateCrosshairColor(crosshair.code, { preset: color.preset }) }
  } catch {
    return {}
  }
}

function RouteLoading() {
  return (
    <section className="route-loading" aria-busy="true" aria-live="polite">
      <span className="route-loading__line is-title" />
      <span className="route-loading__line" />
      <span className="route-loading__panel" />
    </section>
  )
}

export default function App() {
  const initialParams = useMemo(() => new URLSearchParams(window.location.search), [])
  const route = useMemo(() => parseSeoRoute(window.location.pathname), [])
  const catalogSession = useMemo(() => route.type === 'catalog' ? readCatalogSession() : {}, [route.type])
  const [language] = useState(route.locale)
  const [recentIds, setRecentIds] = useState(() => readStoredValue(RECENT_STORAGE_KEY, []))
  const [selectedId, setSelectedId] = useState(() => route.crosshairId || catalogCrosshairs[0].id)
  const [query, setQuery] = useState(() => catalogSession.query || '')
  const [activeFilter, setActiveFilter] = useState(() => catalogSession.activeFilter || 'all')
  const [catalogSort, setCatalogSort] = useState(() => catalogSession.catalogSort || 'recommended')
  const [catalogLimit, setCatalogLimit] = useState(() => Math.max(CATALOG_PAGE_SIZE, Number(catalogSession.catalogLimit) || CATALOG_PAGE_SIZE))
  const [background, setBackground] = useState(() => readSharedPreviewOptions(initialParams).background)
  const [colorOverrides, setColorOverrides] = useState(() => readSharedColorOverride(readSharedPreviewOptions(initialParams).colorKey, route.type, route.crosshairId))
  const [toast, setToast] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [crosshairShareStatus, setCrosshairShareStatus] = useState('idle')
  const [showInstructions, setShowInstructions] = useState(false)
  const [showPreviewSettings, setShowPreviewSettings] = useState(() => route.type === 'crosshair' && !window.matchMedia('(max-width: 680px)').matches)
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
  const sharedCrosshairEntry = isSharedCrosshairEntry(initialParams, route.type)
  const activeBackground = backgroundOptions.find((option) => option.value === background) || backgroundOptions[0]
  const activeBackgroundName = t(`maps.${activeBackground.value}`)
  const {
    allCrosshairs,
    visibleCrosshairs,
    displayedCrosshairs,
    selected,
    selectedCodeColorKey,
  } = useCrosshairCatalog({
    language,
    t,
    route,
    selectedId,
    query,
    activeFilter,
    catalogSort,
    catalogLimit,
    recentIds,
    colorOverrides,
  })

  const activeCodeDialogItem = codeDialogItem
    ? { ...(allCrosshairs.find((item) => item.id === codeDialogItem.id) || {}), ...codeDialogItem }
    : null

  useEffect(() => {
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentIds))
  }, [recentIds])

  useEffect(() => {
    if (route.type !== 'catalog') return
    const current = readCatalogSession()
    writeCatalogSession({ ...current, query, activeFilter, catalogSort, catalogLimit })
  }, [activeFilter, catalogLimit, catalogSort, query, route.type])

  useEffect(() => {
    if (route.type !== 'catalog' || !catalogSession.restore || !catalogSession.scrollY) return
    const timer = window.setTimeout(() => {
      window.scrollTo(0, catalogSession.scrollY)
      writeCatalogSession({ ...catalogSession, restore: false })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [catalogSession, route.type])

  useEffect(() => {
    setAnalyticsContext({
      app_language: language,
      app_view: currentView,
      page_type: route.type,
      page_slug: pageSlug(route),
      crosshair_id: route.crosshairId || '',
      shared_entry: sharedCrosshairEntry,
    })
    trackPageView(window.location.pathname, document.title)
  }, [currentView, language, route, sharedCrosshairEntry])

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
    if (route.type === 'catalog') {
      writeCatalogSession({ query, activeFilter, catalogSort, catalogLimit, scrollY: window.scrollY, restore: true })
    }
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
    setCatalogLimit(CATALOG_PAGE_SIZE)
    trackEvent('filter_select', { filter_name: nextFilter })
  }

  const changeSort = (nextSort) => {
    setCatalogSort(nextSort)
    setCatalogLimit(CATALOG_PAGE_SIZE)
    trackEvent('catalog_sort_change', { sort_name: nextSort })
  }

  const openRandomCrosshair = (pool, interactionSource) => {
    const candidates = (pool?.length ? pool : allCrosshairs).filter((item) => item.id !== selected.id)
    const next = randomItem(candidates) || pool?.[0] || allCrosshairs[0]
    selectCrosshair(next, interactionSource)
    trackEvent('random_crosshair', { crosshair_id: next.id, interaction_source: interactionSource })
    window.location.assign(routePath(language, { type: 'crosshair', crosshairId: next.id }))
  }

  const handleFinderFocusChange = useCallback((isFocused) => {
    setFinderFocus(isFocused)
  }, [])

  const changeLanguage = (nextLanguage) => {
    trackEvent('language_change', { from_language: language, to_language: nextLanguage })
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

  const returnToCatalog = (event) => {
    try {
      const previous = new URL(document.referrer)
      if (previous.origin === window.location.origin && previous.pathname !== window.location.pathname) {
        event.preventDefault()
        window.history.back()
      }
    } catch {
      // The regular catalog link remains the fallback for direct visits.
    }
  }

  return (
    <div className={`app-shell ${finderFocus ? 'is-finder-focus' : ''}`} data-locale={language}>
      <SiteHeader
        locale={language}
        route={route}
        languages={languages}
        currentLanguage={currentLanguage}
        onLanguageChange={changeLanguage}
        onFinderOpen={() => trackEvent('finder_open', { interaction_source: 'navigation' })}
        t={t}
      />

      <main id="top" data-ad-eligible={isAdEligibleRoute(route) ? 'true' : 'false'} className={showFinder ? 'finder-main' : route.type === 'guide' || route.type === 'article' || route.type === 'trust' || route.type === 'tool' ? 'guide-main' : ''}>
        {route.type === 'notFound' ? (
          <section className="not-found-page">
            <span>404</span>
            <h1>{seoCopy(language).notFound.title}</h1>
            <p>{seoCopy(language).notFound.body}</p>
            <a className="primary-button" href={routePath(language, { type: 'catalog' })}>{seoCopy(language).notFound.action}</a>
          </section>
        ) : route.type === 'guide' ? (
          <Suspense fallback={<RouteLoading />}><ImportGuide locale={language} /></Suspense>
        ) : route.type === 'article' ? (
          <Suspense fallback={<RouteLoading />}><SeoArticlePage locale={language} articleKey={route.articleKey} crosshairs={allCrosshairs} /></Suspense>
        ) : route.type === 'tool' ? (
          <Suspense fallback={<RouteLoading />}><CrosshairToolsPage locale={language} toolKey={route.toolKey} crosshairs={allCrosshairs} onCopy={copyCrosshair} /></Suspense>
        ) : route.type === 'trust' ? (
          <Suspense fallback={<RouteLoading />}><TrustPage locale={language} pageKey={route.pageKey} /></Suspense>
        ) : showFinder ? (
          <Suspense fallback={<RouteLoading />}><CrosshairFinder crosshairs={allCrosshairs} onExit={exitFinder} onCopy={copyCrosshair} onFocusChange={handleFinderFocusChange} t={t} /></Suspense>
        ) : (
          <>
        {(route.type === 'home' || route.type === 'catalog') && <SeoPageIntro locale={language} type={route.type} />}
        {route.type === 'collection' && <SeoCollectionIntro locale={language} collectionKey={route.collectionKey} />}

        {route.type === 'catalog' && (
          <CatalogSearch
            query={query}
            firstResult={visibleCrosshairs[0]}
            onQueryChange={(value) => { setQuery(value); setCatalogLimit(CATALOG_PAGE_SIZE) }}
            onClear={() => { setQuery(''); setCatalogLimit(CATALOG_PAGE_SIZE) }}
            onSelect={selectCrosshair}
            t={t}
          />
        )}

        {route.type === 'crosshair' && (
          <div className="crosshair-return-row">
            <a href={routePath(language, { type: 'catalog' })} onClick={returnToCatalog}>
              <Icon name="arrowLeft" size={17} /> {t('catalogUx.backToResults')}
            </a>
          </div>
        )}

        {(route.type === 'home' || route.type === 'crosshair') && (
          <CrosshairPreviewWorkspace
            locale={language}
            route={route}
            selected={selected}
            selectedCodeColorKey={selectedCodeColorKey}
            activeBackground={activeBackground}
            activeBackgroundName={activeBackgroundName}
            background={background}
            showPreviewSettings={showPreviewSettings}
            showInstructions={showInstructions}
            copiedId={copiedId}
            shareStatus={crosshairShareStatus}
            previewScale={MAIN_PREVIEW_SCALE}
            onToggleSettings={() => setShowPreviewSettings(!showPreviewSettings)}
            onBackgroundChange={changeBackground}
            onColorChange={changeCrosshairColor}
            onCopy={copyCrosshair}
            onToggleInstructions={toggleInstructions}
            onShare={shareCrosshair}
            t={t}
          />
        )}

        {route.type === 'crosshair' && (
          <Suspense fallback={<RouteLoading />}><CrosshairSeoDetails crosshair={selected} locale={language} /></Suspense>
        )}

        {(route.type === 'home' || route.type === 'catalog' || route.type === 'crosshair' || route.type === 'collection') && (
          <CrosshairCollectionSection
            locale={language}
            route={route}
            displayedCrosshairs={displayedCrosshairs}
            visibleCrosshairs={visibleCrosshairs}
            selected={selected}
            copiedId={copiedId}
            filters={filters}
            recentIds={recentIds}
            activeFilter={activeFilter}
            catalogSort={catalogSort}
            catalogPageSize={CATALOG_PAGE_SIZE}
            onSelect={selectCrosshair}
            onCopy={copyCrosshair}
            onFilterChange={changeFilter}
            onSortChange={changeSort}
            onRandom={openRandomCrosshair}
            onLoadMore={(pageSize) => setCatalogLimit((current) => current + pageSize)}
            onClear={() => { setQuery(''); setCatalogLimit(CATALOG_PAGE_SIZE); changeFilter('all') }}
            t={t}
          />
        )}
        {route.type === 'collection' && <Suspense fallback={<RouteLoading />}><SeoCollectionDetails locale={language} collectionKey={route.collectionKey} /></Suspense>}
        {route.type === 'home' && <Suspense fallback={<RouteLoading />}><HomeResourceDirectory locale={language} /></Suspense>}
        {(route.type === 'home' || route.type === 'catalog') && <PublisherValueSection locale={language} type={route.type} />}
          </>
        )}
      </main>

      <SiteFooter locale={language} />

      {toast && <div className={`toast ${toast.type === 'error' ? 'is-error' : ''}`} role="status"><span><Icon name={toast.type === 'error' ? 'x' : 'check'} size={15} strokeWidth={2.5} /></span>{toast.message}</div>}
      {activeCodeDialogItem && (
        <Suspense fallback={null}>
          <CodeDialog crosshair={activeCodeDialogItem} onClose={() => setCodeDialogItem(null)} onCopy={copyCrosshair} t={t} />
        </Suspense>
      )}
    </div>
  )
}
