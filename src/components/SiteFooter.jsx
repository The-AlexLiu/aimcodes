import { routePath } from '../seo/routes.js'
import { seoCopy } from '../seo/content.js'
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../config/contact.js'
import { BrandMark, BrandWordmark } from './BrandLogo.jsx'

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
          <nav className="site-footer-column" aria-label={content.browse}>
            <span>{content.browse}</span>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'best' })}>{content.best}</a>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'pro' })}>{content.pro}</a>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'dot' })}>{content.dot}</a>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'cute' })}>{content.cute}</a>
            <a href={routePath(locale, { type: 'collection', collectionKey: 'small' })}>{content.small}</a>
          </nav>
          <nav className="site-footer-column" aria-label={content.resources}>
            <span>{content.resources}</span>
            <a href={routePath(locale, { type: 'finder' })}>{content.finder}</a>
            <a href={routePath(locale, { type: 'guide' })}>{content.guide}</a>
            <a href={routePath(locale, { type: 'article', articleKey: 'settings' })}>{content.settings}</a>
            <a href={routePath(locale, { type: 'article', articleKey: 'colors' })}>{content.colors}</a>
          </nav>
          <nav className="site-footer-column" aria-label={content.trust}>
            <span>{content.trust}</span>
            <a href={routePath(locale, { type: 'trust', pageKey: 'about' })}>{content.about}</a>
            <a href={routePath(locale, { type: 'trust', pageKey: 'privacy' })}>{content.privacy}</a>
            <a href={routePath(locale, { type: 'trust', pageKey: 'terms' })}>{content.terms}</a>
            <a href={routePath(locale, { type: 'trust', pageKey: 'contact' })}>{content.contact}</a>
          </nav>
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
