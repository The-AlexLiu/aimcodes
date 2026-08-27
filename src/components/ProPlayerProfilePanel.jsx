import { proPlayerProfileForCrosshair } from '../data/proPlayerProfiles.js'
import { proPlayerProfileCopy } from '../seo/proPlayerProfileContent.js'

export default function ProPlayerProfilePanel({ crosshair, locale }) {
  const profile = proPlayerProfileForCrosshair(crosshair.id)
  if (!profile) return null

  const copy = proPlayerProfileCopy(locale, profile)
  const facts = [
    [copy.labels.realName, profile.realName],
    [copy.labels.country, copy.country],
    [copy.labels.team, profile.team],
    [copy.labels.role, copy.role],
    [copy.labels.status, copy.status],
  ]

  return (
    <section className="pro-player-profile-panel" aria-labelledby={`pro-player-${profile.id}`}>
      <div className="pro-player-profile-intro">
        <img src={profile.image} width="300" height="300" alt={profile.imageAlt} />
        <div>
          <span>{copy.status}</span>
          <h2 id={`pro-player-${profile.id}`}>{profile.player}</h2>
          <p>{copy.bio}</p>
        </div>
      </div>
      <dl className="pro-player-facts">
        {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        <div className="is-wide"><dt>{copy.labels.highlight}</dt><dd>{copy.highlight}</dd></div>
      </dl>
      {profile.profileSourceUrl && (
        <p className="pro-player-profile-source">
          <a href={profile.profileSourceUrl} target="_blank" rel="noreferrer">{copy.labels.source}</a>
        </p>
      )}
    </section>
  )
}
