import { useEffect, useState } from 'react'
import { routePath } from '../seo/routes.js'
import { seoCopy } from '../seo/content.js'
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../config/contact.js'
import { BrandMark, BrandWordmark } from './BrandLogo.jsx'
import Icon from './Icon.jsx'

function FooterColumn({ label, children }) {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 680px)').matches)
  const [isOpen, setIsOpen] = useState(() => !window.matchMedia('(max-width: 680px)').matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 680px)')
    const syncLayout = (event) => {
      setIsMobile(event.matches)
      setIsOpen(!event.matches)
    }

    mediaQuery.addEventListener('change', syncLayout)
    return () => mediaQuery.removeEventListener('change', syncLayout)
  }, [])

  return (
    <section className="site-footer-column">
      <button
        className="site-footer-column-toggle"
        type="button"
        onClick={() => isMobile && setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-disabled={!isMobile}
        tabIndex={isMobile ? 0 : -1}
      >
        <span>{label}</span>
        <Icon name="chevronDown" size={16} />
      </button>
      <nav aria-label={label} hidden={!isOpen}>{children}</nav>
    </section>
  )
}

export default function SiteFooter({ locale }) {
  const content = seoCopy(locale).footer
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-identity">
          <a className="site-footer-brand" href={routePath(locale, { type: 'home' })} aria-label="AimCodes">
            <BrandMark compact />
            <BrandWordmark />
          </a>
          <p>{content.note}</p>
        </div>
        <div className="site-footer-menus">
          <FooterColumn label={content.browse}>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'best' })}>{content.best}</a>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'pro' })}>{content.pro}</a>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'dot' })}>{content.dot}</a>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'cute' })}>{content.cute}</a>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'small' })}>{content.small}</a>
          </FooterColumn>
          <FooterColumn label={content.resources}>
            <a href={routePath(locale, { type: 'finder' })}>{content.finder}</a>
            <a href={routePath(locale, { type: 'guide' })}>{content.guide}</a>
            <a href={routePath(locale, { type: 'article', articleKey: 'settings' })}>{content.settings}</a>
            <a href={routePath(locale, { type: 'article', articleKey: 'colors' })}>{content.colors}</a>
          </FooterColumn>
          <FooterColumn label={content.trust}>
            <a href={routePath(locale, { type: 'trust', pageKey: 'about' })}>{content.about}</a>
            <a href={routePath(locale, { type: 'trust', pageKey: 'privacy' })}>{content.privacy}</a>
            <a href={routePath(locale, { type: 'trust', pageKey: 'terms' })}>{content.terms}</a>
            <a href={routePath(locale, { type: 'trust', pageKey: 'contact' })}>{content.contact}</a>
          </FooterColumn>
        </div>
      </div>
      <div className="site-footer-bottom">
        <p className="site-footer-disclosure">{content.independent}</p>
        <div className="site-footer-email">
          <span>{content.email}</span>
          <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
        </div>
      </div>
    </footer>
  )
}
