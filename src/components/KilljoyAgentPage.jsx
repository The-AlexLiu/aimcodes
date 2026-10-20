import AgentAbilityPage from './AgentAbilityPage.jsx'
import { KILLJOY_IMAGE, KILLJOY_CINEMATIC, killjoyArticleCopy } from '../seo/killjoyContent.js'
import { KILLJOY_CROSSHAIR } from '../data/killjoyCrosshair.js'
import './killjoyAgent.css'

export default function KilljoyAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={killjoyArticleCopy(locale)} theme="killjoy" image={KILLJOY_IMAGE} cinematic={KILLJOY_CINEMATIC} cinematicId="OyLHi34Qzv4" crosshair={KILLJOY_CROSSHAIR} />
}
