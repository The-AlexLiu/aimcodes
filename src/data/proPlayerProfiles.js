import { verifiedProCrosshairs } from './verifiedProCrosshairs.js'

const profileFacts = Object.freeze({
  'aspas-dot': Object.freeze({
    realName: 'Erick Santos', countryCode: 'BR', team: 'MIBR', roleKey: 'duelist', statusKey: 'active',
    highlightKey: 'champions2022', image: '/images/players/aspas.png', imageAlt: 'aspas',
    imageSourceUrl: 'https://www.vlr.gg/player/8480/aspas',
    profileSourceUrl: 'https://liquipedia.net/valorant/Aspas', checkedAt: '2026-08-19',
  }),
  sacy: Object.freeze({
    realName: 'Gustavo Henrique Rossi da Silva', countryCode: 'BR', team: 'MIBR', roleKey: 'initiator', statusKey: 'creator',
    highlightKey: 'champions2022Madrid2024', image: '/images/players/sacy.png', imageAlt: 'Sacy',
    imageSourceUrl: 'https://www.vlr.gg/player/659/sacy',
    profileSourceUrl: 'https://liquipedia.net/valorant/Sacy', checkedAt: '2026-08-19',
  }),
  saadhak: Object.freeze({
    realName: 'Matias Delipetro', countryCode: 'AR', team: 'KRÜ Esports', roleKey: 'iglFlex', statusKey: 'active',
    highlightKey: 'champions2022Igl', image: '/images/players/saadhak.png', imageAlt: 'Saadhak',
    imageSourceUrl: 'https://www.vlr.gg/player/727/saadhak',
    profileSourceUrl: 'https://www.vlr.gg/595315/saadhak-and-less-reunite-on-kr', checkedAt: '2026-08-19',
  }),
  mwzera: Object.freeze({
    realName: 'Leonardo da Silva Serrati', countryCode: 'BR', team: 'KRÜ Esports', roleKey: 'flex', statusKey: 'active',
    highlightKey: 'firstStrikeBrazil', image: '/images/players/mwzera.png', imageAlt: 'mwzera',
    imageSourceUrl: 'https://www.vlr.gg/player/939/mwzera',
    profileSourceUrl: 'https://liquipedia.net/valorant/Mwzera', checkedAt: '2026-08-19',
  }),
  cortezia: Object.freeze({
    realName: 'Gabriel Cortez', countryCode: 'BR', team: 'Sentinels', roleKey: 'sentinelController', statusKey: 'active',
    highlightKey: 'internationalRookie', image: '/images/players/cortezia.png', imageAlt: 'Cortezia',
    imageSourceUrl: 'https://www.vlr.gg/player/5395/cortezia',
    profileSourceUrl: 'https://www.vlr.gg/player/5395/cortezia', checkedAt: '2026-08-19',
  }),
  sato: Object.freeze({
    realName: 'Eduardo Kenzo Nagahama Sato', countryCode: 'BR', team: 'LEVIATÁN', roleKey: 'duelist', statusKey: 'active',
    highlightKey: 'mastersLondon2026', image: '/images/players/sato.png', imageAlt: 'Sato',
    imageSourceUrl: 'https://www.vlr.gg/player/21659/sato',
    profileSourceUrl: 'https://www.vlr.gg/player/21659/sato', checkedAt: '2026-08-19',
  }),
  tteuw: Object.freeze({
    realName: 'Matheus Sena', countryCode: 'BR', team: 'MIBR', roleKey: 'creator', statusKey: 'creator',
    highlightKey: 'brazilCreator', image: '/images/players/tteuw.png', imageAlt: 'Tteuw',
    imageSourceUrl: 'https://www.twitch.tv/tteuw',
    profileSourceUrl: 'https://prosettings.net/players/tteuw/', checkedAt: '2026-08-19',
  }),
})

/**
 * Public player profiles are intentionally derived from player-controlled
 * crosshair sources. Gear remains empty until a product and its source can be
 * checked independently; affiliate URLs must never be used as evidence.
 */
export const proPlayerProfiles = Object.freeze(
  verifiedProCrosshairs.map((crosshair) => {
    const facts = profileFacts[crosshair.id]
    if (!facts) throw new Error(`Missing public profile facts for ${crosshair.id}`)
    return Object.freeze({
      id: crosshair.id,
      slug: crosshair.id,
      player: crosshair.player,
      crosshairId: crosshair.id,
      sourceType: 'player_channel',
      ...facts,
      gear: Object.freeze([]),
    })
  }),
)

export const PRO_PLAYER_IDS = Object.freeze(proPlayerProfiles.map((profile) => profile.id))

export function proPlayerProfileForCrosshair(crosshairId) {
  return proPlayerProfiles.find((profile) => profile.crosshairId === crosshairId) || null
}
