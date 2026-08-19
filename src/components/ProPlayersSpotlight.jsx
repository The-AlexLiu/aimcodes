import { proPlayerProfiles } from '../data/proPlayerProfiles.js'
import { proPlayerHubCopy } from '../seo/proPlayerContent.js'
import { proPlayerProfileCopy } from '../seo/proPlayerProfileContent.js'
import { routePath } from '../seo/routes.js'

export default function ProPlayersSpotlight({ locale, crosshairs }) {
  const copy = proPlayerHubCopy(locale)
  const profiles = proPlayerProfiles.slice(0, 4).map((profile) => ({
    ...profile,
    crosshair: crosshairs.find((item) => item.id === profile.crosshairId),
  })).filter((profile) => profile.crosshair)

  return (
    <section className="pro-player-spotlight" aria-labelledby="pro-player-spotlight-title">
      <div className="pro-player-spotlight-heading">
        <div><span>{copy.eyebrow}</span><h2 id="pro-player-spotlight-title">{copy.spotlightTitle}</h2><p>{copy.spotlightIntro}</p></div>
        <a href={routePath(locale, { type: 'players' })}>{copy.browseAll}</a>
      </div>
      <div className="pro-player-spotlight-grid">
        {profiles.map((profile) => {
          const playerCopy = proPlayerProfileCopy(locale, profile)
          return (
            <a className="pro-player-spotlight-card" href={routePath(locale, { type: 'crosshair', crosshairId: profile.crosshairId })} key={profile.crosshairId}>
              <img src={profile.image} width="300" height="300" alt="" loading="lazy" />
              <span><strong>{profile.player}</strong><small>{profile.team} · {playerCopy.role}</small></span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
