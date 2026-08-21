import { useEffect, useRef, useState } from 'react'
import { BrandMark, BrandWordmark } from './BrandLogo.jsx'
import Icon from './Icon.jsx'
import { routePath } from '../seo/routes.js'
import { seoCopy } from '../seo/content.js'
import { proPlayerHubCopy } from '../seo/proPlayerContent.js'
import { playbookLabel } from '../seo/playbookLabels.js'

export default function SiteHeader({
  locale,
  route,
  languages,
  currentLanguage,
  onLanguageChange,
  onFinderOpen,
  t,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const showFinder = route.type === 'finder'
  const exploreActive = route.type === 'catalog' || route.type === 'crosshair' || route.type === 'collection' || route.type === 'players'
  const resourcesActive = route.type === 'guide' || route.type === 'article' || route.type === 'tool'
  const content = seoCopy(locale)
  const playerContent = proPlayerHubCopy(locale)

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnOutsideClick = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="topbar" ref={headerRef}>
      <a className="brand" href={routePath(locale, { type: 'home' })} aria-label={`AimCodes · ${t('nav.explore')}`}>
        <BrandMark />
        <BrandWordmark />
      </a>

      <nav className="primary-nav" aria-label={t('nav.primary')}>
        <a className={exploreActive ? 'is-active' : ''} href={routePath(locale, { type: 'catalog' })}>{t('nav.explore')}</a>
        <a className={showFinder ? 'is-active' : ''} href={routePath(locale, { type: 'finder' })} onClick={onFinderOpen}>{t('nav.finder')}</a>
        <button
          className={resourcesActive || menuOpen ? 'is-active' : ''}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation-panel"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {t('nav.more')} <Icon name="chevronDown" size={15} />
        </button>
      </nav>

      <label className="language-selector" title={t('language.label')}>
        <Icon name="globe" size={17} />
        <span className="language-value"><b>{currentLanguage.short}</b><em>{currentLanguage.label}</em></span>
        <Icon name="chevronDown" size={14} />
        <select value={locale} onChange={(event) => onLanguageChange(event.target.value)} aria-label={t('language.label')}>
          {languages.map((item) => <option value={item.code} key={item.code}>{item.label}</option>)}
        </select>
      </label>

      <button
        className="mobile-menu"
        type="button"
        aria-label={menuOpen ? t('nav.close') : t('nav.more')}
        aria-expanded={menuOpen}
        aria-controls="site-navigation-panel"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <Icon name={menuOpen ? 'x' : 'menu'} />
      </button>

      <div className={`nav-drawer ${menuOpen ? 'is-open' : ''}`} id="site-navigation-panel">
        <nav className="nav-drawer-primary" aria-label={t('nav.primary')}>
          <a className={exploreActive ? 'is-active' : ''} href={routePath(locale, { type: 'catalog' })} onClick={closeMenu}>{t('nav.explore')}</a>
          <a className={showFinder ? 'is-active' : ''} href={routePath(locale, { type: 'finder' })} onClick={() => { closeMenu(); onFinderOpen() }}>{t('nav.finder')}</a>
        </nav>
        <nav className="nav-drawer-group" aria-label={t('nav.collections')}>
          <span>{t('nav.collections')}</span>
          <a href={routePath(locale, { type: 'collection', collectionKey: 'best' })} onClick={closeMenu}>{content.collections.best.label}</a>
          <a href={routePath(locale, { type: 'collection', collectionKey: 'pro' })} onClick={closeMenu}>{content.collections.pro.label}</a>
          <a href={routePath(locale, { type: 'collection', collectionKey: 'dot' })} onClick={closeMenu}>{content.collections.dot.label}</a>
          <a href={routePath(locale, { type: 'collection', collectionKey: 'cute' })} onClick={closeMenu}>{content.collections.cute.label}</a>
          <a href={routePath(locale, { type: 'collection', collectionKey: 'small' })} onClick={closeMenu}>{content.collections.small.label}</a>
          <a href={routePath(locale, { type: 'players' })} onClick={closeMenu}>{playerContent.navLabel}</a>
        </nav>
        <nav className="nav-drawer-group" aria-label={t('nav.learn')}>
          <span>{t('nav.learn')}</span>
          <a href={routePath(locale, { type: 'tool', toolKey: 'playbook' })} onClick={closeMenu}>{playbookLabel(locale)}</a>
          <a href={routePath(locale, { type: 'guide' })} onClick={closeMenu}>{content.footer.guide}</a>
          <a href={routePath(locale, { type: 'article', articleKey: 'settings' })} onClick={closeMenu}>{content.footer.settings}</a>
          <a href={routePath(locale, { type: 'article', articleKey: 'colors' })} onClick={closeMenu}>{content.footer.colors}</a>
          <a href={routePath(locale, { type: 'tool', toolKey: 'generator' })} onClick={closeMenu}>{t('nav.generator')}</a>
        </nav>
      </div>
    </header>
  )
}
