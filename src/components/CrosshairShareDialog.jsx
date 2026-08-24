import CrosshairCanvas from './CrosshairCanvas.jsx'
import Icon from './Icon.jsx'
import useDialogA11y from '../hooks/useDialogA11y.js'

export default function CrosshairShareDialog({
  crosshair,
  mapName,
  colorName,
  isWeChatBrowser,
  showWeChatFallback,
  nativeShareAvailable,
  status,
  onClose,
  onNativeShare,
  onCopyLink,
  onCopyBundle,
  t,
}) {
  const dialogRef = useDialogA11y(onClose, showWeChatFallback || !nativeShareAvailable ? '[data-copy-link]' : '[data-share-primary]')
  const isWorking = status === 'working'
  const copyLinkButton = (
    <button data-copy-link className={showWeChatFallback || !nativeShareAvailable ? 'primary-button' : 'secondary-button'} type="button" onClick={onCopyLink} disabled={isWorking}>
      <Icon name={status === 'link_copied' ? 'check' : 'link'} size={18} />
      {status === 'link_copied'
        ? (showWeChatFallback ? t('share.wechatCopied') : t('share.linkCopied'))
        : (showWeChatFallback ? t('share.wechatCopyAction') : t('share.copyLink'))}
    </button>
  )

  return (
    <div className="modal-backdrop share-dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section ref={dialogRef} className="modal share-dialog" role="dialog" aria-modal="true" aria-labelledby="share-dialog-title" aria-describedby="share-dialog-body" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label={t('share.close')}>
          <Icon name="x" />
        </button>

        <span className="share-dialog-eyebrow">{t('share.eyebrow')}</span>
        <h2 id="share-dialog-title">{t('share.dialogTitle')}</h2>
        <p id="share-dialog-body">{t('share.dialogBody')}</p>

        <div className="share-dialog-preview">
          <span className="share-dialog-reticle" aria-hidden="true">
            <CrosshairCanvas crosshair={crosshair} scale={2.35} label="" />
          </span>
          <span className="share-dialog-preview-copy">
            <strong>{crosshair.name}</strong>
            <small>{t('share.previewMeta', { map: mapName, color: colorName })}</small>
          </span>
        </div>

        {isWeChatBrowser && (
          <div className="share-dialog-wechat-guide" role="note">
            <Icon name="info" size={18} />
            <span>
              <strong>{t('share.wechatGuideTitle')}</strong>
              <small>{t('share.wechatGuideBody')}</small>
            </span>
          </div>
        )}

        <div className="share-dialog-actions" role="group" aria-label={t('share.actionsLabel')}>
          {showWeChatFallback && copyLinkButton}
          {nativeShareAvailable && (
            <button data-share-primary className={showWeChatFallback ? 'secondary-button' : 'primary-button'} type="button" onClick={onNativeShare} disabled={isWorking}>
              <Icon name="share" size={18} />
              {isWorking ? t('share.crosshairWorking') : t('share.nativeAction')}
            </button>
          )}
          {!showWeChatFallback && copyLinkButton}
          <button className="share-dialog-bundle" type="button" onClick={onCopyBundle} disabled={isWorking}>
            <Icon name={status === 'bundle_copied' ? 'check' : 'copy'} size={18} />
            <span><strong>{status === 'bundle_copied' ? t('share.bundleCopied') : t('share.copyBundle')}</strong><small>{t('share.copyBundleHint')}</small></span>
          </button>
        </div>

        <p className="share-dialog-note" aria-live="polite">
          <Icon name="info" size={15} />
          {status === 'error'
            ? t('share.crosshairError')
            : (showWeChatFallback ? t('share.wechatFallbackHint') : t('share.statePreserved'))}
        </p>
      </section>
    </div>
  )
}
