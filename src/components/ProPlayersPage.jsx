import { proPlayerProfiles } from '../data/proPlayerProfiles.js'
import { proPlayerHubCopy } from '../seo/proPlayerContent.js'
import { proPlayerProfileCopy } from '../seo/proPlayerProfileContent.js'
import { routePath } from '../seo/routes.js'

export default function ProPlayersPage({ locale, crosshairs }) {
  const copy = proPlayerHubCopy(locale)
  const profiles = proPlayerProfiles.map((profile) => ({
    ...profile,
    crosshair: crosshairs.find((item) => item.id === profile.crosshairId),
  })).filter((profile) => profile.crosshair)

  return (
    <section className="pro-players-page">
      <nav className="page-breadcrumb" aria-label="Breadcrumb">
        <a href={routePath(locale, { type: 'home' })}>AimCodes</a><span>/</span><span>{copy.breadcrumb}</span>
      </nav>
      <header className="pro-players-hero">
        <span>{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </header>
      <div className="pro-player-grid">
        {profiles.map((profile) => {
          const { player, crosshair, crosshairId } = profile
          const playerCopy = proPlayerProfileCopy(locale, profile)
          return (
          <article className="pro-player-card" key={crosshairId}>
            <img className="pro-player-avatar" src={profile.image} width="300" height="300" alt={profile.imageAlt} loading="lazy" />
            <div className="pro-player-card-copy">
              <span>{profile.team} · {playerCopy.role}</span>
              <h2>{player}</h2>
              <p>{playerCopy.bio}</p>
              <small>{copy.crosshairLabel}: {crosshair.name}</small>
              <a href={routePath(locale, { type: 'crosshair', crosshairId })}>{copy.viewProfile}</a>
            </div>
          </article>
          )
        })}
      </div>
    </section>
  )
}
