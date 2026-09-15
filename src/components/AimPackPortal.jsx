import { useEffect, useMemo, useRef, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import Icon from './Icon.jsx'
import { previewBackgroundOptions } from '../data/previewOptions.js'
import { paidPackCopy } from '../i18n/paidPackCopy.js'
import { AIM_PACK_CHECKOUT_STORAGE_KEY, generateAimPack } from '../utils/paidPack.js'
import { copyText } from '../utils/share.js'
import { trackEvent } from '../utils/analytics.js'

function localPreviewEnabled() {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname)
    && new URLSearchParams(window.location.search).get('paid_preview') === '1'
}

function previewEntitlement(crosshairs) {
  return {
    id: 'preview',
    regenerationsRemaining: 2,
    version: 1,
    pack: generateAimPack({ average: 247, consistency: 31, profile: 'balanced', mode: 'ranked', visual: 'balanced' }, crosshairs.map((item) => item.id), 1),
  }
}

function PackView({ entitlement, content, crosshairs, locale, onRegenerate }) {
  const [copied, setCopied] = useState('')
  const firstCopyTracked = useRef(false)
  const deliveryTracked = useRef(false)
  const map = previewBackgroundOptions[0]
  const byId = useMemo(() => new Map(crosshairs.map((item) => [item.id, item])), [crosshairs])

  const copyCode = async (item) => {
    await copyText(item.code)
    setCopied(item.id)
    window.setTimeout(() => setCopied(''), 1600)
    trackEvent('premium_pack_code_copy', { product_id: 'aimcodes_crosshair_pack_v1', crosshair_id: item.id, pack_role: entitlement.pack.find((slot) => slot.crosshairId === item.id)?.role })
    if (!firstCopyTracked.current) {
      firstCopyTracked.current = true
      trackEvent('pack_first_code_copy', { product_id: 'aimcodes_crosshair_pack_v1', crosshair_id: item.id, pack_version: entitlement.version })
    }
  }

  useEffect(() => {
    trackEvent('premium_pack_view', { product_id: 'aimcodes_crosshair_pack_v1', pack_version: entitlement.version })
    if (!deliveryTracked.current) {
      deliveryTracked.current = true
      trackEvent('delivery_confirmed', { product_id: 'aimcodes_crosshair_pack_v1', delivery_method: 'entitlement', pack_version: entitlement.version })
    }
  }, [entitlement.version])

  return (
    <section className="aim-pack-portal aim-pack-portal--pack">
      <header className="aim-pack-portal__hero"><span>{content.eyebrow}</span><h1>{content.packTitle}</h1><p>{content.packBody}</p><div aria-hidden="true">05 / LOADOUT</div></header>
      <div className="aim-pack-grid">
        {entitlement.pack.map((slot, index) => {
          const item = byId.get(slot.crosshairId)
          if (!item) return null
          return (
            <article className="aim-pack-card" key={`${slot.role}-${item.id}`}>
              <div className="aim-pack-card__preview">
                <img src={map.image} alt="" />
                <CrosshairCanvas crosshair={item} scale={2.15} label={item.name} />
                <span>0{index + 1}</span>
              </div>
              <div className="aim-pack-card__body"><span>{content.roles[slot.role]}</span><h2>{item.shortName}</h2><p>{item.description}</p><button type="button" onClick={() => copyCode(item)}><Icon name={copied === item.id ? 'check' : 'copy'} size={17} />{copied === item.id ? content.copied : content.copy}</button></div>
            </article>
          )
        })}
      </div>
      <footer className="aim-pack-portal__footer"><div><strong>{content.regenerations.replace('{count}', entitlement.regenerationsRemaining)}</strong><small>Version {entitlement.version} · {locale}</small></div><button type="button" onClick={onRegenerate} disabled={entitlement.regenerationsRemaining < 1}><Icon name="rotate" size={17} />{content.regenerate}</button></footer>
    </section>
  )
}

function RecoveryView({ content, locale }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')
  const submit = async (event) => {
    event.preventDefault()
    setState('working')
    try {
      const response = await fetch('/api/aim-pack/recover', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, locale }) })
      const payload = await response.json().catch(() => ({}))
      setState(payload.deliveryAvailable === false ? 'support' : 'sent')
    } finally {
      setState((current) => current === 'working' ? 'sent' : current)
    }
  }
  return <section className="aim-pack-portal aim-pack-recovery"><span>{content.eyebrow}</span><h1>{content.recoveryTitle}</h1><p>{content.recoveryBody}</p>{state === 'sent' ? <p className="aim-pack-recovery__success" role="status"><Icon name="check" size={18} />{content.recoverySent}</p> : state === 'support' ? <p className="aim-pack-recovery__success" role="status"><Icon name="info" size={18} />{content.recoveryUnavailable} <a href="mailto:contact@aimcodes.com">contact@aimcodes.com</a></p> : <form onSubmit={submit}><label>{content.email}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label><button className="primary-button" type="submit" disabled={state === 'working'}>{content.send}</button></form>}</section>
}

export default function AimPackPortal({ pageKey, locale, crosshairs }) {
  const content = paidPackCopy(locale)
  const isPreview = localPreviewEnabled()
  const [state, setState] = useState(() => pageKey === 'recover' ? 'recover' : isPreview ? 'pack' : 'loading')
  const [entitlement, setEntitlement] = useState(() => isPreview ? previewEntitlement(crosshairs) : null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (pageKey === 'recover' || isPreview) return

    const controller = new AbortController()
    const loadPack = async () => {
      if (pageKey === 'complete') {
        let checkout
        try { checkout = JSON.parse(sessionStorage.getItem(AIM_PACK_CHECKOUT_STORAGE_KEY) || 'null') } catch { checkout = null }
        if (!checkout?.orderId || !checkout?.statusToken || !checkout?.claimToken) { setState('recovery-needed'); return }
        setMessage(content.waiting)
        for (let attempt = 0; attempt < 18; attempt += 1) {
          const response = await fetch('/api/aim-pack/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(checkout), signal: controller.signal })
          const payload = await response.json().catch(() => ({}))
          if (payload.claimUrl) { sessionStorage.removeItem(AIM_PACK_CHECKOUT_STORAGE_KEY); window.location.replace(payload.claimUrl); return }
          if (payload.state === 'failed') { setState('recovery-needed'); return }
          await new Promise((resolve) => window.setTimeout(resolve, Math.min(5000, 800 + attempt * 300)))
        }
        setState('recovery-needed')
        return
      }
      const response = await fetch('/api/aim-pack/entitlement', { headers: { Accept: 'application/json' }, signal: controller.signal })
      if (response.status === 401) { setState('recovery-needed'); return }
      const payload = await response.json()
      if (!response.ok || !payload.entitlement) throw new Error('entitlement_unavailable')
      setEntitlement(payload.entitlement)
      setState('pack')
    }
    loadPack().catch((error) => { if (error.name !== 'AbortError') setState('recovery-needed') })
    return () => controller.abort()
  }, [content.waiting, isPreview, pageKey])

  const regenerate = async () => {
    if (entitlement?.id === 'preview') {
      const nextVersion = entitlement.version + 1
      setEntitlement({ ...entitlement, version: nextVersion, regenerationsRemaining: entitlement.regenerationsRemaining - 1, pack: generateAimPack({ average: 247, consistency: 31, profile: 'balanced', mode: 'ranked', visual: 'balanced' }, crosshairs.map((item) => item.id), nextVersion) })
      return
    }
    setState('loading')
    const response = await fetch('/api/aim-pack/regenerate', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
    const payload = await response.json().catch(() => ({}))
    if (response.ok && payload.entitlement) { setEntitlement(payload.entitlement); setState('pack'); trackEvent('premium_pack_regenerate', { product_id: 'aimcodes_crosshair_pack_v1', pack_version: payload.entitlement.version }) } else setState('recovery-needed')
  }

  if (state === 'recover') return <RecoveryView content={content} locale={locale} />
  if (state === 'pack' && entitlement) return <PackView entitlement={entitlement} content={content} crosshairs={crosshairs} locale={locale} onRegenerate={regenerate} />
  if (state === 'recovery-needed') return <section className="aim-pack-portal aim-pack-wait"><Icon name="info" size={28} /><h1>{content.recoveryTitle}</h1><p>{content.support}</p><a className="primary-button" href={`/${locale.toLowerCase()}/recover-aim-pack/`}>{content.recoveryTitle}</a></section>
  return <section className="aim-pack-portal aim-pack-wait" aria-busy="true"><Icon name="target" size={30} /><h1>{message || content.loading}</h1><p>{content.support}</p></section>
}
