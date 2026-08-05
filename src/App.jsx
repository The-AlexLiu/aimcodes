import { useEffect, useMemo, useRef, useState } from 'react'
import CodeDialog from './components/CodeDialog.jsx'
import { BrandMark, BrandWordmark } from './components/BrandLogo.jsx'
import CrosshairCanvas from './components/CrosshairCanvas.jsx'
import CrosshairCard from './components/CrosshairCard.jsx'
import CrosshairFinder from './components/CrosshairFinder.jsx'
import CrosshairSeoDetails from './components/CrosshairSeoDetails.jsx'
import Icon from './components/Icon.jsx'
import ImportGuide from './components/ImportGuide.jsx'
import SeoPageIntro from './components/SeoPageIntro.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import { crosshairs, filters } from './data/crosshairs.js'
import { crosshairColorPresets, previewBackgroundOptions as backgroundOptions } from './data/previewOptions.js'
import { createTranslator, languages, localizeCrosshair } from './i18n/translations.js'
import { pageSlug, routeMetadata, seoCopy } from './seo/content.js'
import { localizedRoutePath, parseSeoRoute, routePath, SEO_CROSSHAIR_IDS } from './seo/routes.js'
import { parseCrosshairCode, updateCrosshairColor } from './utils/crosshairCode.js'
import { dedupeCrosshairsByAppearance } from './utils/crosshairSimilarity.js'
import { setAnalyticsContext, trackEvent, trackPageView } from './utils/analytics.js'

const RECENT_STORAGE_KEY = 'aimcodes-recent-v1'
const utilityFilters = ['recent']
const distinctCatalogCrosshairs = dedupeCrosshairsByAppearance(crosshairs)
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

export default function App() {
  const initialParams = useMemo(() => new URLSearchParams(window.location.search), [])
  const route = useMemo(() => parseSeoRoute(window.location.pathname), [])
  const [language] = useState(route.locale)
  const [recentIds, setRecentIds] = useState(() => readStoredValue(RECENT_STORAGE_KEY, []))
  const [selectedId, setSelectedId] = useState(() => route.crosshairId || crosshairs[0].id)
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [background, setBackground] = useState(() => backgroundOptions.some((item) => item.value === initialParams.get('mapa')) ? initialParams.get('mapa') : 'ascent')
  const [colorOverrides, setColorOverrides] = useState({})
  const [toast, setToast] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showPreviewSettings, setShowPreviewSettings] = useState(true)
  const [mobileNav, setMobileNav] = useState(false)
  const [codeDialogItem, setCodeDialogItem] = useState(null)
  const toastTimer = useRef(null)
  const copiedTimer = useRef(null)
  const searchAnalyticsTimer = useRef(null)
  const t = useMemo(() => createTranslator(language), [language])
  const currentLanguage = languages.find((item) => item.code === language) || languages[0]
  const showFinder = route.type === 'finder'
  const currentView = route.type

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

  const storedSelected = routeCrosshair || allCrosshairs.find((item) => item.id === selectedId) || allCrosshairs[0]
  const activeBackground = backgroundOptions.find((option) => option.value === background) || backgroundOptions[0]
  const activeBackgroundName = t(`maps.${activeBackground.value}`)

  const visibleCrosshairs = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(language)
    return allCrosshairs.filter((item) => {
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
    }).sort((left, right) => {
      if (activeFilter !== 'recent') return 0
      return recentIds.indexOf(left.id) - recentIds.indexOf(right.id)
    })
  }, [activeFilter, allCrosshairs, language, query, recentIds, t])

  const displayedCrosshairs = useMemo(() => {
    if (route.type === 'catalog') return visibleCrosshairs
    if (route.type === 'home') {
      return SEO_CROSSHAIR_IDS.map((id) => allCrosshairs.find((item) => item.id === id)).filter(Boolean)
    }
    if (route.type === 'crosshair') {
      const sameCategory = allCrosshairs.filter((item) => item.id !== route.crosshairId && item.category === routeCrosshair?.category)
      const priority = SEO_CROSSHAIR_IDS.map((id) => allCrosshairs.find((item) => item.id === id))
        .filter((item) => item && item.id !== route.crosshairId)
      return [...sameCategory, ...priority]
        .filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index)
        .slice(0, 6)
    }
    return []
  }, [allCrosshairs, route.crosshairId, route.type, routeCrosshair?.category, visibleCrosshairs])

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
    document.documentElement.lang = language
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', metadata.canonical)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', metadata.canonical)
  }, [language, route, routeCrosshair])

  useEffect(() => {
    const metadata = routeMetadata(language, route, routeCrosshair)
    setAnalyticsContext({
      app_language: language,
      app_view: currentView,
      page_type: route.type,
      page_slug: pageSlug(route),
      crosshair_id: route.crosshairId || '',
    })
    trackPageView(window.location.pathname, metadata.title)
  }, [currentView, language, route, routeCrosshair])

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
        source: options.source || 'explore_preview',
      })
      copied = true
    } catch {
      setCodeDialogItem(item)
      notify(t('toast.copyBlocked'), 'error')
    }
    if (!options.keepDialogOpen && options.closeDialog) setCodeDialogItem(null)
    return copied
  }

  const selectCrosshair = (item, source = 'catalog_grid') => {
    setSelectedId(item.id)
    setRecentIds((current) => [item.id, ...current.filter((id) => id !== item.id)].slice(0, 8))
    trackEvent('select_content', {
      content_type: 'crosshair',
      item_id: item.id,
      crosshair_name: item.shortName,
      crosshair_category: item.category,
      is_pro: Boolean(item.isPro),
      source,
    })
  }

  const changeCrosshairColor = (option) => {
    try {
      const nextCode = updateCrosshairColor(selected.code, { preset: option.preset })
      setColorOverrides((current) => ({ ...current, [selected.id]: nextCode }))
      trackEvent('crosshair_color_change', {
        crosshair_id: selected.id,
        color_key: option.key,
        source: 'explore_preview',
      })
    } catch {
      notify(t('errors.invalidColor'), 'error')
    }
  }

  const changeBackground = (nextBackground) => {
    setBackground(nextBackground)
    trackEvent('map_change', { map_name: nextBackground, source: 'explore_preview' })
  }

  const toggleInstructions = () => {
    const willOpen = !showInstructions
    setShowInstructions(willOpen)
    if (willOpen) trackEvent('import_guide_open', { source: 'explore_preview' })
  }

  const changeFilter = (nextFilter) => {
    setActiveFilter(nextFilter)
    trackEvent('filter_select', { filter_name: nextFilter })
  }

  const changeLanguage = (nextLanguage) => {
    trackEvent('language_change', { from_language: language, to_language: nextLanguage })
    setMobileNav(false)
    const params = new URLSearchParams()
    if (background !== 'ascent' && (route.type === 'home' || route.type === 'crosshair')) params.set('mapa', background)
    const queryString = params.toString()
    window.location.assign(`${localizedRoutePath(nextLanguage, route)}${queryString ? `?${queryString}` : ''}`)
  }

  const exitFinder = () => {
    window.location.assign(routePath(language, { type: 'catalog' }))
  }

  return (
    <div className="app-shell" data-locale={language}>
      <header className="topbar">
        <a className="brand" href={routePath(language, { type: 'home' })} aria-label={`AimCodes · ${t('nav.explore')}`}>
          <BrandMark />
          <BrandWordmark />
        </a>
        <nav className={mobileNav ? 'is-open' : ''} aria-label={t('nav.explore')}>
          <a className={route.type === 'catalog' || route.type === 'crosshair' ? 'is-active' : ''} href={routePath(language, { type: 'catalog' })}>{t('nav.explore')}</a>
          <a className={showFinder ? 'is-active' : ''} href={routePath(language, { type: 'finder' })} onClick={() => trackEvent('finder_open', { source: 'navigation' })}>{t('nav.finder')}</a>
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

      <main id="top" className={showFinder ? 'finder-main' : route.type === 'guide' ? 'guide-main' : ''}>
        {route.type === 'notFound' ? (
          <section className="not-found-page">
            <span>404</span>
            <h1>{seoCopy(language).notFound.title}</h1>
            <p>{seoCopy(language).notFound.body}</p>
            <a className="primary-button" href={routePath(language, { type: 'catalog' })}>{seoCopy(language).notFound.action}</a>
          </section>
        ) : route.type === 'guide' ? (
          <ImportGuide locale={language} />
        ) : showFinder ? (
          <CrosshairFinder crosshairs={allCrosshairs} onExit={exitFinder} onCopy={copyCrosshair} t={t} />
        ) : (
          <>
        {(route.type === 'home' || route.type === 'catalog') && <SeoPageIntro locale={language} type={route.type} />}

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
            <img src={activeBackground.image} alt={t('preview.mapAlt', { map: activeBackgroundName })} />
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
              <p><Icon name="star" size={19} /> {selected.description}</p>
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
                      <span className="background-swatch"><img src={option.image} alt="" /></span>
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

            <div className="action-row">
              <button className="primary-button" type="button" onClick={() => copyCrosshair(selected, { source: 'explore_preview' })}>
                <Icon name={copiedId === selected.id ? 'check' : 'copy'} /> {copiedId === selected.id ? t('actions.copied') : t('actions.copy')}
              </button>
              <button className="secondary-button" type="button" onClick={toggleInstructions} aria-expanded={showInstructions}>
                <Icon name="gamepad" /> {t('actions.import')}
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
          <CrosshairSeoDetails crosshair={selected} locale={language} onCopy={copyCrosshair} copied={copiedId === selected.id} />
        )}

        {(route.type === 'home' || route.type === 'catalog' || route.type === 'crosshair') && <section className="collection-section" id="collection">
          <div className="collection-heading">
            <div className="collection-title-block">
              <BrandMark compact />
              <div>
                <h2>{route.type === 'home' ? seoCopy(language).home.popular : route.type === 'crosshair' ? seoCopy(language).detail.related : t('collection.title')}</h2>
                <p>{route.type === 'home' ? seoCopy(language).home.popularBody : t('collection.subtitle')}</p>
              </div>
            </div>
            <span>{t(displayedCrosshairs.length === 1 ? 'collection.countOne' : 'collection.countMany', { count: displayedCrosshairs.length })}</span>
          </div>
          {route.type === 'catalog' && <div className="filters" aria-label={t('filters.label')}>
            <div className="filter-tabs">
              {[...filters, ...utilityFilters].map((filter) => (
                <button key={filter} type="button" className={activeFilter === filter ? 'is-active' : ''} onClick={() => changeFilter(filter)}>
                  {t(`filters.${filter}`)}
                </button>
              ))}
            </div>
          </div>}

          {displayedCrosshairs.length > 0 ? (
            <div className="crosshair-grid">
              {displayedCrosshairs.map((item) => (
                <CrosshairCard key={item.id} crosshair={item} href={routePath(language, { type: 'crosshair', crosshairId: item.id })} selected={route.type !== 'catalog' && selected.id === item.id} copied={copiedId === item.id} onSelect={selectCrosshair} onCopy={copyCrosshair} t={t} />
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
          </>
        )}
      </main>

      <SiteFooter locale={language} />

      {toast && <div className={`toast ${toast.type === 'error' ? 'is-error' : ''}`} role="status"><span><Icon name={toast.type === 'error' ? 'x' : 'check'} size={15} strokeWidth={2.5} /></span>{toast.message}</div>}
      {activeCodeDialogItem && <CodeDialog crosshair={activeCodeDialogItem} onClose={() => setCodeDialogItem(null)} onCopy={copyCrosshair} t={t} />}
    </div>
  )
}
