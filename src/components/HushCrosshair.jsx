import AgentCrosshair from './AgentCrosshair.jsx'
import { HUSH_CROSSHAIR } from '../data/hushCrosshair.js'
import { hushCrosshairCopy } from '../i18n/hushCrosshairCopy.js'

export default function HushCrosshair({ locale, onCopy }) {
  return <AgentCrosshair locale={locale} onCopy={onCopy} theme="hush" crosshair={HUSH_CROSSHAIR} copy={hushCrosshairCopy(locale)} />
}
