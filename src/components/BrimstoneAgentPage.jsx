import AgentAbilityPage from './AgentAbilityPage.jsx'
import { BRIMSTONE_IMAGE, BRIMSTONE_CINEMATIC, brimstoneArticleCopy } from '../seo/brimstoneContent.js'
import { BRIMSTONE_CROSSHAIR } from '../data/brimstoneCrosshair.js'
import './brimstoneAgent.css'

export default function BrimstoneAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={brimstoneArticleCopy(locale)} theme="brimstone" image={BRIMSTONE_IMAGE} cinematic={BRIMSTONE_CINEMATIC} cinematicId="FUoqAn5T4h4" crosshair={BRIMSTONE_CROSSHAIR} />
}
