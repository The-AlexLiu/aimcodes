import AgentAbilityPage from './AgentAbilityPage.jsx'
import { ISO_IMAGE, ISO_CINEMATIC, isoArticleCopy } from '../seo/isoContent.js'
import { ISO_CROSSHAIR } from '../data/isoCrosshair.js'
import './isoAgent.css'

export default function IsoAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={isoArticleCopy(locale)} theme="iso" image={ISO_IMAGE} cinematic={ISO_CINEMATIC} cinematicId="8OgcHAv6Jvk" crosshair={ISO_CROSSHAIR} />
}
