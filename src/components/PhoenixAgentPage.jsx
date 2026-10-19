import AgentAbilityPage from './AgentAbilityPage.jsx'
import { PHOENIX_IMAGE, PHOENIX_CINEMATIC, phoenixArticleCopy } from '../seo/phoenixContent.js'
import { PHOENIX_CROSSHAIR } from '../data/phoenixCrosshair.js'
import './phoenixAgent.css'

export default function PhoenixAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={phoenixArticleCopy(locale)} theme="phoenix" image={PHOENIX_IMAGE} cinematic={PHOENIX_CINEMATIC} cinematicId="e_E9W2vsRbQ" crosshair={PHOENIX_CROSSHAIR} />
}
