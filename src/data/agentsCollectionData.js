import { playbookAgents } from './playbookAgents.js'
import { JETT_IMAGE, jettArticleCopy } from '../seo/jettContent.js'
import { JETT_CROSSHAIR } from './jettCrosshair.js'
import { RAZE_IMAGE, razeArticleCopy } from '../seo/razeContent.js'
import { RAZE_CROSSHAIR } from './razeCrosshair.js'
import { PHOENIX_IMAGE, phoenixArticleCopy } from '../seo/phoenixContent.js'
import { PHOENIX_CROSSHAIR } from './phoenixCrosshair.js'
import { YORU_IMAGE, yoruArticleCopy } from '../seo/yoruContent.js'
import { YORU_CROSSHAIR } from './yoruCrosshair.js'
import { NEON_IMAGE, neonArticleCopy } from '../seo/neonContent.js'
import { NEON_CROSSHAIR } from './neonCrosshair.js'
import { REYNA_IMAGE, reynaArticleCopy } from '../seo/reynaContent.js'
import { REYNA_CROSSHAIR } from './reynaCrosshair.js'
import { ISO_IMAGE, isoArticleCopy } from '../seo/isoContent.js'
import { ISO_CROSSHAIR } from './isoCrosshair.js'
import { WAYLAY_IMAGE, waylayArticleCopy } from '../seo/waylayContent.js'
import { WAYLAY_CROSSHAIR } from './waylayCrosshair.js'
import { SOVA_IMAGE, sovaArticleCopy } from '../seo/sovaContent.js'
import { SOVA_CROSSHAIR } from './sovaCrosshair.js'
import { BREACH_IMAGE, breachArticleCopy } from '../seo/breachContent.js'
import { BREACH_CROSSHAIR } from './breachCrosshair.js'
import { SKYE_IMAGE, skyeArticleCopy } from '../seo/skyeContent.js'
import { SKYE_CROSSHAIR } from './skyeCrosshair.js'
import { KAYO_IMAGE, kayoArticleCopy } from '../seo/kayoContent.js'
import { KAYO_CROSSHAIR } from './kayoCrosshair.js'
import { FADE_IMAGE, fadeArticleCopy } from '../seo/fadeContent.js'
import { FADE_CROSSHAIR } from './fadeCrosshair.js'
import { GEKKO_IMAGE, gekkoArticleCopy } from '../seo/gekkoContent.js'
import { GEKKO_CROSSHAIR } from './gekkoCrosshair.js'
import { TEJO_IMAGE, tejoArticleCopy } from '../seo/tejoContent.js'
import { TEJO_CROSSHAIR } from './tejoCrosshair.js'
import { ASTRA_IMAGE, astraArticleCopy } from '../seo/astraContent.js'
import { ASTRA_CROSSHAIR } from './astraCrosshair.js'
import { VIPER_IMAGE, viperArticleCopy } from '../seo/viperContent.js'
import { VIPER_CROSSHAIR } from './viperCrosshair.js'
import { BRIMSTONE_IMAGE, brimstoneArticleCopy } from '../seo/brimstoneContent.js'
import { BRIMSTONE_CROSSHAIR } from './brimstoneCrosshair.js'
import { OMEN_IMAGE, omenArticleCopy } from '../seo/omenContent.js'
import { OMEN_CROSSHAIR } from './omenCrosshair.js'
import { HARBOR_IMAGE, harborArticleCopy } from '../seo/harborContent.js'
import { HARBOR_CROSSHAIR } from './harborCrosshair.js'
import { CLOVE_IMAGE, cloveArticleCopy } from '../seo/cloveContent.js'
import { CLOVE_CROSSHAIR } from './cloveCrosshair.js'
import { MIKS_IMAGE, miksArticleCopy } from '../seo/miksContent.js'
import { MIKS_CROSSHAIR } from './miksCrosshair.js'
import { KILLJOY_IMAGE, killjoyArticleCopy } from '../seo/killjoyContent.js'
import { KILLJOY_CROSSHAIR } from './killjoyCrosshair.js'
import { CYPHER_IMAGE, cypherArticleCopy } from '../seo/cypherContent.js'
import { CYPHER_CROSSHAIR } from './cypherCrosshair.js'
import { SAGE_IMAGE, sageArticleCopy } from '../seo/sageContent.js'
import { SAGE_CROSSHAIR } from './sageCrosshair.js'
import { CHAMBER_IMAGE, chamberArticleCopy } from '../seo/chamberContent.js'
import { CHAMBER_CROSSHAIR } from './chamberCrosshair.js'
import { DEADLOCK_IMAGE, deadlockArticleCopy } from '../seo/deadlockContent.js'
import { DEADLOCK_CROSSHAIR } from './deadlockCrosshair.js'
import { VYSE_IMAGE, vyseArticleCopy } from '../seo/vyseContent.js'
import { VYSE_CROSSHAIR } from './vyseCrosshair.js'
import { VETO_IMAGE, vetoArticleCopy } from '../seo/vetoContent.js'
import { VETO_CROSSHAIR } from './vetoCrosshair.js'
import { HUSH_IMAGE, hushArticleCopy } from '../seo/hushContent.js'
import { HUSH_CROSSHAIR } from './hushCrosshair.js'

// Shared published roster: reuse each detail page’s art, localized copy and code.
const pages = {
  jett: { portrait: '/images/agents/collection/jett.webp', image: JETT_IMAGE, copy: jettArticleCopy, crosshair: JETT_CROSSHAIR },
  raze: { portrait: '/images/agents/collection/raze.webp', image: RAZE_IMAGE, copy: razeArticleCopy, crosshair: RAZE_CROSSHAIR },
  phoenix: { portrait: '/images/agents/collection/phoenix.webp', image: PHOENIX_IMAGE, copy: phoenixArticleCopy, crosshair: PHOENIX_CROSSHAIR },
  yoru: { portrait: '/images/agents/collection/yoru.webp', image: YORU_IMAGE, copy: yoruArticleCopy, crosshair: YORU_CROSSHAIR },
  neon: { portrait: '/images/agents/collection/neon.webp', image: NEON_IMAGE, copy: neonArticleCopy, crosshair: NEON_CROSSHAIR },
  reyna: { portrait: '/images/agents/collection/reyna.webp', image: REYNA_IMAGE, copy: reynaArticleCopy, crosshair: REYNA_CROSSHAIR },
  iso: { portrait: '/images/agents/collection/iso.webp', image: ISO_IMAGE, copy: isoArticleCopy, crosshair: ISO_CROSSHAIR },
  waylay: { portrait: '/images/agents/collection/waylay.webp', image: WAYLAY_IMAGE, copy: waylayArticleCopy, crosshair: WAYLAY_CROSSHAIR },
  sova: { portrait: '/images/agents/collection/sova.webp', image: SOVA_IMAGE, copy: sovaArticleCopy, crosshair: SOVA_CROSSHAIR },
  breach: { portrait: '/images/agents/collection/breach.webp', image: BREACH_IMAGE, copy: breachArticleCopy, crosshair: BREACH_CROSSHAIR },
  skye: { portrait: '/images/agents/collection/skye.webp', image: SKYE_IMAGE, copy: skyeArticleCopy, crosshair: SKYE_CROSSHAIR },
  kayo: { portrait: '/images/agents/collection/kayo.webp', image: KAYO_IMAGE, copy: kayoArticleCopy, crosshair: KAYO_CROSSHAIR },
  fade: { portrait: '/images/agents/collection/fade.webp', image: FADE_IMAGE, copy: fadeArticleCopy, crosshair: FADE_CROSSHAIR },
  gekko: { portrait: '/images/agents/collection/gekko.webp', image: GEKKO_IMAGE, copy: gekkoArticleCopy, crosshair: GEKKO_CROSSHAIR },
  tejo: { portrait: '/images/agents/collection/tejo.webp', image: TEJO_IMAGE, copy: tejoArticleCopy, crosshair: TEJO_CROSSHAIR },
  astra: { portrait: '/images/agents/collection/astra.webp', image: ASTRA_IMAGE, copy: astraArticleCopy, crosshair: ASTRA_CROSSHAIR },
  viper: { portrait: '/images/agents/collection/viper.webp', image: VIPER_IMAGE, copy: viperArticleCopy, crosshair: VIPER_CROSSHAIR },
  brimstone: { portrait: '/images/agents/collection/brimstone.webp', image: BRIMSTONE_IMAGE, copy: brimstoneArticleCopy, crosshair: BRIMSTONE_CROSSHAIR },
  omen: { portrait: '/images/agents/collection/omen.webp', image: OMEN_IMAGE, copy: omenArticleCopy, crosshair: OMEN_CROSSHAIR },
  harbor: { portrait: '/images/agents/collection/harbor.webp', image: HARBOR_IMAGE, copy: harborArticleCopy, crosshair: HARBOR_CROSSHAIR },
  clove: { portrait: '/images/agents/collection/clove.webp', image: CLOVE_IMAGE, copy: cloveArticleCopy, crosshair: CLOVE_CROSSHAIR },
  miks: { portrait: '/images/agents/collection/miks.webp', image: MIKS_IMAGE, copy: miksArticleCopy, crosshair: MIKS_CROSSHAIR },
  killjoy: { portrait: '/images/agents/collection/killjoy.webp', image: KILLJOY_IMAGE, copy: killjoyArticleCopy, crosshair: KILLJOY_CROSSHAIR },
  cypher: { portrait: '/images/agents/collection/cypher.webp', image: CYPHER_IMAGE, copy: cypherArticleCopy, crosshair: CYPHER_CROSSHAIR },
  sage: { portrait: '/images/agents/collection/sage.webp', image: SAGE_IMAGE, copy: sageArticleCopy, crosshair: SAGE_CROSSHAIR },
  chamber: { portrait: '/images/agents/collection/chamber.webp', image: CHAMBER_IMAGE, copy: chamberArticleCopy, crosshair: CHAMBER_CROSSHAIR },
  deadlock: { portrait: '/images/agents/collection/deadlock.webp', image: DEADLOCK_IMAGE, copy: deadlockArticleCopy, crosshair: DEADLOCK_CROSSHAIR },
  vyse: { portrait: '/images/agents/collection/vyse.webp', image: VYSE_IMAGE, copy: vyseArticleCopy, crosshair: VYSE_CROSSHAIR },
  veto: { portrait: '/images/agents/collection/veto.webp', image: VETO_IMAGE, copy: vetoArticleCopy, crosshair: VETO_CROSSHAIR },
  hush: { image: HUSH_IMAGE, copy: hushArticleCopy, crosshair: HUSH_CROSSHAIR },
}

export const agentDirectory = Object.freeze([
  ...playbookAgents,
  { id: 'hush', name: 'Hush', names: { en: 'Hush', es: 'Hush', 'pt-BR': 'Hush', 'zh-CN': '遐思', ja: 'ハッシュ' }, role: 'duelist', asset: HUSH_IMAGE },
].map(agent => Object.freeze({ ...agent, ...pages[agent.id], portrait: pages[agent.id].portrait || pages[agent.id].image })))

export function agentDirectoryName(agent, locale) {
  return agent.copy(locale).heroName || agent.names[locale] || agent.name
}

export function filterAgents(query, role, locale) {
  const term = query.trim().normalize('NFKC').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
  return agentDirectory.filter(agent => {
    const names = [agent.id, agent.name, agentDirectoryName(agent, locale), ...Object.values(agent.names)]
      .join(' ').normalize('NFKC').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
    return (role === 'all' || agent.role === role) && (!term || names.includes(term))
  })
}
