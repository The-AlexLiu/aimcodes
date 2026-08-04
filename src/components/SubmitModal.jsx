import { useMemo, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import Icon from './Icon.jsx'
import useDialogA11y from '../hooks/useDialogA11y.js'
import { createLocalCrosshair, parseCrosshairCode } from '../utils/crosshairCode.js'

export default function MyCrosshairsModal({ items, onClose, onAdd, onDelete, onSelect, onCopy, t }) {
  const [form, setForm] = useState({ name: '', code: '', source: '' })
  const [error, setError] = useState('')
  const [savedMessage, setSavedMessage] = useState('')
  const dialogRef = useDialogA11y(onClose, 'input[name="crosshair-name"]')

  const parsedPreview = useMemo(() => {
    if (!form.code.trim()) return null
    try {
      const parsed = parseCrosshairCode(form.code)
      return {
        parsed,
        crosshair: {
          name: form.name.trim() || t('modal.newName'),
          code: parsed.code,
          color: parsed.color,
        },
      }
    } catch (previewError) {
      return { error: t(`errors.${previewError.code || previewError.message}`) }
    }
  }, [form.code, form.name, t])

  const submit = (event) => {
    event.preventDefault()
    setSavedMessage('')
    if (form.name.trim().length < 2) {
      setError(t('errors.nameShort'))
      return
    }
    try {
      const item = createLocalCrosshair(form)
      onAdd(item)
      setForm({ name: '', code: '', source: '' })
      setError('')
      setSavedMessage(t('modal.saved'))
    } catch (submitError) {
      setError(t(`errors.${submitError.code || submitError.message}`))
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section ref={dialogRef} className="modal my-crosshairs-modal" role="dialog" aria-modal="true" aria-labelledby="my-crosshairs-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label={t('codeDialog.close')}>
          <Icon name="x" />
        </button>
        <h2 id="my-crosshairs-title">{t('modal.title')}</h2>
        <p>{t('modal.intro')}</p>

        {items.length > 0 && (
          <div className="saved-crosshairs" aria-label={t('modal.savedList')}>
            {items.map((item) => (
              <article className="saved-crosshair-row" key={item.id}>
                <button className="saved-crosshair-select" type="button" onClick={() => { onSelect(item); onClose() }}>
                  <span className="saved-crosshair-preview"><CrosshairCanvas crosshair={item} scale={1.7} label={t('card.test', { name: item.name })} /></span>
                  <span><strong>{item.shortName}</strong><small>{t('modal.test')}</small></span>
                </button>
                <button className="icon-button saved-row-action" type="button" onClick={() => onCopy(item)} aria-label={t('modal.copy', { name: item.name })}><Icon name="copy" size={18} /></button>
                <button className="icon-button saved-row-action is-danger" type="button" onClick={() => onDelete(item)} aria-label={t('modal.delete', { name: item.name })}><Icon name="trash" size={18} /></button>
              </article>
            ))}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="modal-form-heading">
            <strong>{items.length ? t('modal.addAnother') : t('modal.addFirst')}</strong>
            <span>{t('modal.instant')}</span>
          </div>
          <label>
            {t('modal.name')}
            <input name="crosshair-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder={t('modal.namePlaceholder')} />
          </label>
          <label>
            {t('modal.code')}
            <textarea value={form.code} onChange={(event) => { setForm({ ...form, code: event.target.value }); setError(''); setSavedMessage('') }} placeholder="0;P;c;5;..." rows="3" spellCheck="false" />
          </label>

          {parsedPreview?.crosshair && (
            <div className="import-preview is-valid">
              <span className="import-preview-canvas"><CrosshairCanvas crosshair={parsedPreview.crosshair} scale={2} label={t('card.test', { name: parsedPreview.crosshair.name })} /></span>
              <span><strong>{t('modal.recognized')}</strong><small>{t('modal.generated', { color: t(`colors.${parsedPreview.parsed.colorKey}`) })}</small></span>
              <Icon name="check" size={18} />
            </div>
          )}
          {parsedPreview?.error && form.code.trim().length >= 10 && <p className="inline-validation is-error"><Icon name="x" size={15} /> {parsedPreview.error}</p>}

          <label>
            {t('modal.source')} <span>{t('modal.optional')}</span>
            <input value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value })} placeholder={t('modal.sourcePlaceholder')} type="url" />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          {savedMessage && <p className="form-success" role="status"><Icon name="check" size={15} /> {savedMessage}</p>}
          <button className="primary-button modal-submit" type="submit" disabled={!parsedPreview?.crosshair}>
            <Icon name="bookmark" size={18} /> {t('actions.save')}
          </button>
        </form>
      </section>
    </div>
  )
}
