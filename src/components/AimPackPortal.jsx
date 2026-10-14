import { useEffect, useMemo, useRef, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import Icon from './Icon.jsx'
import { previewBackgroundOptions, crosshairColorPresets } from '../data/previewOptions.js'
import { paidPackCopy } from '../i18n/paidPackCopy.js'
import { createTranslator } from '../i18n/translations.js'
import { updateCrosshairColor } from '../utils/crosshairCode.js'
import useDialogA11y from '../hooks/useDialogA11y.js'
import { readCheckoutDraft } from '../utils/checkoutDraft.js'
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

function RebuildDialog({ content, count, onClose, onConfirm }) {
  const ref = useDialogA11y(onClose)
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="aim-pack-confirm" ref={ref} role="dialog" aria-modal="true" aria-labelledby="rebuild-title" onMouseDown={event => event.stopPropagation()}><h2 id="rebuild-title">{content.confirmRegenerate}</h2><p>{content.confirmBody.replace('{count}', count)}</p><button type="button" className="primary-button" onClick={onConfirm}>{content.confirm}</button><button type="button" onClick={onClose}>{content.cancel}</button></section></div>
}

function PackCard({ item, slot, index, map, content, t, onFirstCopy }) {
  const [color, setColor] = useState('')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const preset = crosshairColorPresets.find(option => option.key === color)
  const code = preset ? updateCrosshairColor(item.code, preset) : item.code
  const crosshair = { ...item, code }
  const copyCode = async () => {
    try {
      await copyText(code)
      setCopied(true); setCopyError(false)
      window.setTimeout(() => setCopied(false), 1600)
      trackEvent('premium_pack_code_copy', { product_id: 'aimcodes_crosshair_pack_v1', crosshair_id: item.id, pack_role: slot.role })
      onFirstCopy(item.id)
    } catch { setCopyError(true) }
  }
  return <article className="aim-pack-card"><div className="aim-pack-card__preview"><img src={map.image} alt="" /><CrosshairCanvas crosshair={crosshair} scale={2.15} label={item.name} /><span>0{index + 1}</span></div><div className="aim-pack-card__body"><span>{content.roles[slot.role]}</span><h2>{item.shortName}</h2><p>{item.description}</p><p className="aim-pack-reason">{slot.reason === slot.role ? content.roleReasons[slot.role] : content.legacyReason}</p><label className="aim-pack-color">{content.colorLabel}<select value={color} onChange={event => { setColor(event.target.value); setCopied(false); setCopyError(false) }}><option value="">{content.originalColor}</option>{crosshairColorPresets.map(option => <option value={option.key} key={option.key}>{t(`colors.${option.key}`)}</option>)}</select></label><button type="button" onClick={copyCode}><Icon name={copied ? 'check' : 'copy'} size={17} />{copied ? content.copied : content.copy}</button>{copyError && <div role="alert"><p>{content.copyError}</p><textarea aria-label={content.manualCopy} readOnly value={code} onFocus={event => event.target.select()} /></div>}</div></article>
}

function PackView({ entitlement, content, crosshairs, locale, onRegenerate, busy, error }) {
  const [confirm, setConfirm] = useState(false)
  const [mapKey, setMapKey] = useState('ascent')
  const [version, setVersion] = useState(entitlement.version)
  const firstCopyTracked = useRef(false)
  const deliveryTracked = useRef(false)
  const map = previewBackgroundOptions.find(option => option.value === mapKey) || previewBackgroundOptions[0]
  const byId = useMemo(() => new Map(crosshairs.map(item => [item.id, item])), [crosshairs])
  const t = useMemo(() => createTranslator(locale), [locale])
  const versions = entitlement.versions?.length ? entitlement.versions : [{ version: entitlement.version, pack: entitlement.pack }]
  const selected = versions.find(item => item.version === version) || versions.at(-1)
  const firstCopy = (id) => {
    if (firstCopyTracked.current) return
    firstCopyTracked.current = true
    trackEvent('pack_first_code_copy', { product_id: 'aimcodes_crosshair_pack_v1', crosshair_id: id, pack_version: selected.version })
  }
  useEffect(() => {
    trackEvent('premium_pack_view', { product_id: 'aimcodes_crosshair_pack_v1', pack_version: entitlement.version })
    if (!deliveryTracked.current) {
      deliveryTracked.current = true
      trackEvent('delivery_confirmed', { product_id: 'aimcodes_crosshair_pack_v1', delivery_method: 'entitlement', pack_version: entitlement.version })
    }
  }, [entitlement.version])
  return <section className="aim-pack-portal aim-pack-portal--pack">
    <header className="aim-pack-portal__hero"><span>{content.eyebrow}</span><h1>{content.packTitle}</h1><p>{content.packBody}</p><div aria-hidden="true">05 / LOADOUT</div></header>
    <p className="aim-pack-start">{content.startHere}</p>
    <div className="aim-pack-controls"><label>{content.versionsLabel}<select value={selected.version} disabled={busy} onChange={event => setVersion(Number(event.target.value))}>{versions.map(item => <option value={item.version} key={item.version}>{content.versionLabel.replace('{version}', item.version)}</option>)}</select></label><label>{content.mapLabel}<select value={mapKey} onChange={event => setMapKey(event.target.value)}>{previewBackgroundOptions.map(option => <option value={option.value} key={option.value}>{t(`maps.${option.value}`)}</option>)}</select></label></div>
    <div className="aim-pack-grid">{selected.pack.map((slot, index) => { const item = byId.get(slot.crosshairId); return item ? <PackCard key={`${selected.version}-${slot.role}-${item.id}`} item={item} slot={slot} index={index} map={map} content={content} t={t} onFirstCopy={firstCopy} /> : null })}</div>
    {error && <p className="premium-pack-error" role="alert">{error}</p>}
    <footer className="aim-pack-portal__footer"><div><strong>{content.regenerations.replace('{count}', entitlement.regenerationsRemaining)}</strong><small>{content.versionLabel.replace('{version}', selected.version)}</small></div><button type="button" onClick={() => setConfirm(true)} disabled={busy || entitlement.regenerationsRemaining < 1}><Icon name="rotate" size={17} />{busy ? content.rebuilding : content.regenerate}</button></footer>
    <details className="aim-pack-import"><summary>{content.importTitle}</summary><ol><li>{t('instructions.one')}</li><li>{t('instructions.two')}</li><li>{t('instructions.three')}</li></ol></details>
    <p><a href={`/${locale.toLowerCase()}/recover-aim-pack/`}>{content.recoveryTitle}</a></p>
    {confirm && <RebuildDialog content={content} count={entitlement.regenerationsRemaining - 1} onClose={() => setConfirm(false)} onConfirm={async () => { setConfirm(false); const updated = await onRegenerate(); if (updated) setVersion(updated.version) }} />}
  </section>
}

function RecoveryView({ content, locale }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')
  const submit = async (event) => {
    event.preventDefault()
    setState('working')
    try {
      const response = await fetch('/api/aim-pack/recover', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, locale }), signal: AbortSignal.timeout(20000) })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok || payload.accepted !== true) throw new Error('recovery_failed')
      setState(payload.deliveryAvailable === false ? 'support' : 'sent')
    } catch {
      setState('error')
    }
  }
  return <section className="aim-pack-portal aim-pack-recovery"><span>{content.eyebrow}</span><h1>{content.recoveryTitle}</h1><p>{content.recoveryBody}</p>{state === 'sent' ? <p className="aim-pack-recovery__success" role="status"><Icon name="check" size={18} />{content.recoverySent}<small className="aim-pack-recovery-hint">{content.recoveryHint}</small><a href="mailto:contact@aimcodes.com">contact@aimcodes.com</a></p> : state === 'support' ? <p className="aim-pack-recovery__success" role="status"><Icon name="info" size={18} />{content.recoveryUnavailable} <a href="mailto:contact@aimcodes.com">contact@aimcodes.com</a></p> : <form onSubmit={submit}>{state === 'error' && <p role="alert">{content.recoveryError}</p>}<label>{content.email}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label><button className="primary-button" type="submit" disabled={state === 'working'}>{state === 'working' ? content.sending : content.send}</button></form>}</section>
}

export default function AimPackPortal({ pageKey, locale, crosshairs }) {
  const content = paidPackCopy(locale)
  const isPreview = localPreviewEnabled()
  const [state, setState] = useState(() => pageKey === 'recover' ? 'recover' : isPreview ? 'pack' : 'loading')
  const [entitlement, setEntitlement] = useState(() => isPreview ? previewEntitlement(crosshairs) : null)
  const [message, setMessage] = useState('')
  const [retry, setRetry] = useState(0)
  const [rebuilding, setRebuilding] = useState(false)
  const [packError, setPackError] = useState('')
  const regenerationLock = useRef(false)

  useEffect(() => {
    if (pageKey === 'recover' || isPreview) return

    const controller = new AbortController()
    const loadPack = async () => {
      if (pageKey === 'complete') {
        const parameters = new URLSearchParams(window.location.search)
        if (parameters.get('cancelled') === '1') { setState('cancelled'); return }
        let checkout
        try { checkout = JSON.parse(sessionStorage.getItem(AIM_PACK_CHECKOUT_STORAGE_KEY) || 'null') } catch { checkout = null }
        if (!checkout?.orderId || !checkout?.statusToken || !checkout?.claimToken) { setState('recovery-needed'); return }
        setMessage(content.waiting)
        if (checkout.provider === 'paypal') {
          const paypalOrderId = parameters.get('token') || checkout.paypalOrderId
          if (paypalOrderId !== checkout.paypalOrderId) { setState('confirmation-error'); return }
          const response = await fetch('/api/aim-pack/paypal-capture', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: checkout.orderId, statusToken: checkout.statusToken, paypalOrderId }), signal: AbortSignal.any([controller.signal, AbortSignal.timeout(30000)]),
          })
          if (!response.ok) { setState('confirmation-error'); return }
          trackEvent('checkout_browser_complete', { product_id: 'aimcodes_crosshair_pack_v1', provider: 'paypal' })
          window.history.replaceState(null, '', window.location.pathname)
        }
        for (let attempt = 0; attempt < 18; attempt += 1) {
          const response = await fetch('/api/aim-pack/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(checkout), signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]) })
          const payload = await response.json().catch(() => ({}))
          if (payload.claimUrl) { sessionStorage.removeItem(AIM_PACK_CHECKOUT_STORAGE_KEY); window.location.replace(payload.claimUrl); return }
          if (payload.state === 'failed') { setState('recovery-needed'); return }
          await new Promise((resolve) => window.setTimeout(resolve, Math.min(5000, 800 + attempt * 300)))
        }
        setState('recovery-needed')
        return
      }
      const response = await fetch('/api/aim-pack/entitlement', { headers: { Accept: 'application/json' }, signal: AbortSignal.any([controller.signal, AbortSignal.timeout(20000)]) })
      if (response.status === 401) { setState('recovery-needed'); return }
      const payload = await response.json()
      if (!response.ok || !payload.entitlement) throw new Error('entitlement_unavailable')
      setEntitlement(payload.entitlement)
      setState('pack')
    }
    loadPack().catch((error) => { if (error.name !== 'AbortError') setState(pageKey === 'complete' ? 'confirmation-error' : 'load-error') })
    return () => controller.abort()
  }, [content.waiting, isPreview, pageKey, retry])

  const regenerate = async () => {
    if (regenerationLock.current) return null
    regenerationLock.current = true
    setRebuilding(true); setPackError('')
    try {
      let updated
      if (entitlement?.id === 'preview') {
        const version = entitlement.version + 1
        const pack = generateAimPack({ average: 247, consistency: 31, profile: 'balanced', mode: 'ranked', visual: 'balanced' }, crosshairs.map(item => item.id), version)
        updated = { ...entitlement, version, pack, regenerationsRemaining: entitlement.regenerationsRemaining - 1, versions: [...(entitlement.versions || [{ version: entitlement.version, pack: entitlement.pack }]), { version, pack }] }
      } else {
        const response = await fetch('/api/aim-pack/regenerate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ expectedVersion: entitlement.version }), signal: AbortSignal.timeout(20000) })
        const payload = await response.json().catch(() => ({}))
        if (!response.ok || !payload.entitlement) throw new Error('regeneration_failed')
        updated = payload.entitlement
      }
      setEntitlement(updated)
      trackEvent('premium_pack_regenerate', { product_id: 'aimcodes_crosshair_pack_v1', pack_version: updated.version })
      return updated
    } catch { setPackError(content.regenerateError); return null }
    finally { regenerationLock.current = false; setRebuilding(false) }
  }

  if (state === 'load-error') return <section className="aim-pack-portal aim-pack-wait"><h1>{content.loadError}</h1><button type="button" className="primary-button" onClick={() => { setState('loading'); setRetry(value => value + 1) }}>{content.reloadPack}</button><a href={`/${locale.toLowerCase()}/recover-aim-pack/`}>{content.recoveryTitle}</a></section>
  if (state === 'cancelled') return <section className="aim-pack-portal aim-pack-wait"><h1>{content.cancelledTitle}</h1><p>{content.cancelledBody}</p><a className="primary-button" href={`/${locale.toLowerCase()}/reaction-time-test/?resume=1`}>{readCheckoutDraft() ? content.resume : content.backToTest}</a></section>
  if (state === 'confirmation-error') return <section className="aim-pack-portal aim-pack-wait"><h1>{content.confirmationError}</h1><p>{content.confirmationHelp}</p><button className="primary-button" type="button" onClick={() => { setState('loading'); setRetry(value => value + 1) }}>{content.retry}</button><a href={`/${locale.toLowerCase()}/recover-aim-pack/`}>{content.recoveryTitle}</a></section>
  if (state === 'recover') return <RecoveryView content={content} locale={locale} />
  if (state === 'pack' && entitlement) return <PackView entitlement={entitlement} content={content} crosshairs={crosshairs} locale={locale} onRegenerate={regenerate} busy={rebuilding} error={packError} />
  if (state === 'recovery-needed') return <section className="aim-pack-portal aim-pack-wait"><Icon name="info" size={28} /><h1>{content.recoveryTitle}</h1><p>{content.recoveryBody}</p><a className="primary-button" href={`/${locale.toLowerCase()}/recover-aim-pack/`}>{content.recoveryTitle}</a><a href={`/${locale.toLowerCase()}/reaction-time-test/`}>{content.backToTest}</a></section>
  return <section className="aim-pack-portal aim-pack-wait" aria-busy="true"><Icon name="target" size={30} /><h1>{message || content.loading}</h1><p>{content.support}</p></section>
}
