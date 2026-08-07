import { routePath } from '../seo/routes.js'
import { seoCopy } from '../seo/content.js'
import { SOCIAL_LINKS } from '../config/socialLinks.js'
import { BrandMark, BrandWordmark } from './BrandLogo.jsx'
import Icon from './Icon.jsx'

export default function SiteFooter({ locale }) {
  const content = seoCopy(locale).footer
  return (
    <footer className="site-footer">
      <div className="site-footer-identity">
        <a className="site-footer-brand" href={routePath(locale, { type: 'home' })} aria-label="AimCodes">
          <BrandMark compact />
          <BrandWordmark />
        </a>
        <p>{content.note}</p>
      </div>
      <nav className="site-footer-nav" aria-label="AimCodes">
        <a href={routePath(locale, { type: 'catalog' })}>{content.browse}</a>
        <a href={routePath(locale, { type: 'finder' })}>{content.finder}</a>
        <a href={routePath(locale, { type: 'guide' })}>{content.guide}</a>
      </nav>
      <div className="site-footer-social-row">
        <span>{content.social}</span>
        <nav className="site-footer-socials" aria-label={content.social}>
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label} — AimCodes`}
              title={`${item.label} — AimCodes`}
            >
              <Icon name={item.id} size={17} strokeWidth={1.9} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
