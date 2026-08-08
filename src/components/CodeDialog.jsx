import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import useDialogA11y from '../hooks/useDialogA11y.js'

export default function CodeDialog({ crosshair, onClose, onCopy, t }) {
  const codeRef = useRef(null)
  const dialogRef = useDialogA11y(onClose, 'textarea')

  useEffect(() => {
    codeRef.current?.select()
  }, [])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section ref={dialogRef} className="modal code-dialog" role="dialog" aria-modal="true" aria-labelledby="code-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label={t('codeDialog.close')}>
          <Icon name="x" />
        </button>
        <h2 id="code-dialog-title">{t('codeDialog.title')}</h2>
        <p>{t('codeDialog.body')}</p>
        <label className="code-dialog-label" htmlFor="full-crosshair-code">{crosshair.name}</label>
        <textarea ref={codeRef} id="full-crosshair-code" value={crosshair.code} readOnly rows="4" />
        <button className="primary-button modal-submit" type="button" onClick={() => onCopy(crosshair, { keepDialogOpen: true, interactionSource: 'code_dialog' })}>
          <Icon name="copy" size={18} /> {t('actions.copy')}
        </button>
      </section>
    </div>
  )
}
