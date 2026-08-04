import { useEffect, useMemo, useRef, useState } from 'react'
import CodeDialog from './components/CodeDialog.jsx'
import { BrandMark, BrandWordmark } from './components/BrandLogo.jsx'
import CrosshairCanvas from './components/CrosshairCanvas.jsx'
import CrosshairCard from './components/CrosshairCard.jsx'
import CrosshairFinder from './components/CrosshairFinder.jsx'
import Icon from './components/Icon.jsx'
import { crosshairs, filters } from './data/crosshairs.js'
import { crosshairColorPresets, previewBackgroundOptions as backgroundOptions } from './data/previewOptions.js'
import { createTranslator, languages, localizeCrosshair } from './i18n/translations.js'
import { buildLocalizedUrl, DEFAULT_LOCALE, localeFromPath, localePath, normalizeLocale } from './i18n/localeRoutes.js'
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

function initialLanguage(searchParams) {
  return localeFromPath(window.location.pathname)
    || normalizeLocale(searchParams.get('lang'))
    || DEFAULT_LOCALE
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
  const [language] = useState(() => initialLanguage(initialParams))
  const [recentIds, setRecentIds] = useState(() => readStoredValue(RECENT_STORAGE_KEY, []))
  const [selectedId, setSelectedId] = useState(() => initialParams.get('mira') || crosshairs[0].id)
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [background, setBackground] = useState(() => backgroundOptions.some((item) => item.value === initialParams.get('mapa')) ? initialParams.get('mapa') : 'ascent')
  const [colorOverrides, setColorOverrides] = useState({})
  const [toast, setToast] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [showFinder, setShowFinder] = useState(() => initialParams.get('finder') === '1')
  const [showInstructions, setShowInstructions] = useState(false)
  const [showPreviewSettings, setShowPreviewSettings] = useState(true)
  const [mobileNav, setMobileNav] = useState(false)
  const [codeDialogItem, setCodeDialogItem] = useState(null)
  const toastTimer = useRef(null)
  const copiedTimer = useRef(null)
  const searchAnalyticsTimer = useRef(null)
  const t = useMemo(() => createTranslator(language), [language])
  const currentLanguage = languages.find((item) => item.code === language) || languages[0]
  const currentView = showFinder ? 'finder' : 'explore'

  const hydratedCrosshairs = useMemo(
    () => distinctCatalogCrosshairs.map(hydrateCrosshair),
    [],
  )

  const allCrosshairs = useMemo(
    () => hydratedCrosshairs.map((item) => localizeCrosshair(item, language, t)),
    [hydratedCrosshairs, language, t],
  )

  const storedSelected = allCrosshairs.find((item) => item.id === selectedId) || allCrosshairs[0]
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

  const selectedBase = visibleCrosshairs.length && !visibleCrosshairs.some((item) => item.id === storedSelected.id)
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
    document.documentElement.lang = language
    document.title = t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('meta.title'))
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('meta.description'))
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', t('meta.title'))
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', t('meta.description'))
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://aimcodes.com${localePath(language)}`)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://aimcodes.com${localePath(language)}`)
  }, [language, t])

  useEffect(() => {
    setAnalyticsContext({ app_language: language, app_view: currentView })
    trackPageView(currentView, `${t('meta.title')} · ${t(currentView === 'finder' ? 'nav.finder' : 'nav.explore')}`)
  }, [currentView, language, t])

  useEffect(() => {
    if (searchAnalyticsTimer.current) window.clearTimeout(searchAnalyticsTimer.current)
    const normalizedQuery = query.trim()
    if (showFinder || normalizedQuery.length < 2) return undefined

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
  }, [query, showFinder, visibleCrosshairs.length])

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

  const resetExplore = (event) => {
    event?.preventDefault()
    setQuery('')
    setActiveFilter('all')
    setShowFinder(false)
    setMobileNav(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const changeLanguage = (nextLanguage) => {
    trackEvent('language_change', { from_language: language, to_language: nextLanguage })
    setMobileNav(false)
    window.location.assign(buildLocalizedUrl(nextLanguage, {
      search: window.location.search,
      hash: window.location.hash,
      params: {
        finder: showFinder ? '1' : null,
        mira: selectedId === crosshairs[0].id ? null : selectedId,
        mapa: background === 'ascent' ? null : background,
      },
    }))
  }

  const openFinder = () => {
    trackEvent('finder_open', { source: 'navigation' })
    setShowFinder(true)
    setMobileNav(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell" data-locale={language}>
      <header className="topbar">
        <a className="brand" href={localePath(language)} aria-label={`AimCodes · ${t('nav.explore')}`} onClick={resetExplore}>
          <BrandMark />
          <BrandWordmark />
        </a>
        <nav className={mobileNav ? 'is-open' : ''} aria-label={t('nav.explore')}>
          <button className={!showFinder ? 'is-active' : ''} type="button" onClick={resetExplore}>{t('nav.explore')}</button>
          <button className={showFinder ? 'is-active' : ''} type="button" onClick={openFinder}>{t('nav.finder')}</button>
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

      <main id="top" className={showFinder ? 'finder-main' : ''}>
        {showFinder ? (
          <CrosshairFinder crosshairs={allCrosshairs} onExit={resetExplore} onCopy={copyCrosshair} t={t} />
        ) : (
          <>
        <div className="search-bar">
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
        </div>

        <section className="workspace" aria-label={t('workspace.label')}>
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
              <h1>{selected.name}</h1>
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
        </section>

        <section className="collection-section" id="collection">
          <div className="collection-heading">
            <div className="collection-title-block">
              <BrandMark compact />
              <div>
                <h2>{t('collection.title')}</h2>
                <p>{t('collection.subtitle')}</p>
              </div>
            </div>
            <span>{t(visibleCrosshairs.length === 1 ? 'collection.countOne' : 'collection.countMany', { count: visibleCrosshairs.length })}</span>
          </div>
          <div className="filters" aria-label={t('filters.label')}>
            <div className="filter-tabs">
              {[...filters, ...utilityFilters].map((filter) => (
                <button key={filter} type="button" className={activeFilter === filter ? 'is-active' : ''} onClick={() => changeFilter(filter)}>
                  {t(`filters.${filter}`)}
                </button>
              ))}
            </div>
          </div>

          {visibleCrosshairs.length > 0 ? (
            <div className="crosshair-grid">
              {visibleCrosshairs.map((item) => (
                <CrosshairCard key={item.id} crosshair={item} selected={selected.id === item.id} copied={copiedId === item.id} onSelect={selectCrosshair} onCopy={copyCrosshair} t={t} />
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
        </section>
          </>
        )}
      </main>

      {toast && <div className={`toast ${toast.type === 'error' ? 'is-error' : ''}`} role="status"><span><Icon name={toast.type === 'error' ? 'x' : 'check'} size={15} strokeWidth={2.5} /></span>{toast.message}</div>}
      {activeCodeDialogItem && <CodeDialog crosshair={activeCodeDialogItem} onClose={() => setCodeDialogItem(null)} onCopy={copyCrosshair} t={t} />}
    </div>
  )
}
