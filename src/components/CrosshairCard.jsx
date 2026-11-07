import CrosshairCanvas from './CrosshairCanvas.jsx'
import Icon from './Icon.jsx'

export default function CrosshairCard({ crosshair, href, selected, copied, onSelect, onCopy, showCode = false, shapeLabel, t }) {
  const copyButton = (
    <button
      className={`icon-button card-copy${copied ? ' is-copied' : ''}`}
      type="button"
      aria-label={copied ? t('card.copied', { name: crosshair.name }) : t('card.copy', { name: crosshair.name })}
      title={copied ? t('actions.copiedShort') : t('actions.copyShort')}
      onClick={(event) => {
        event.stopPropagation()
        onCopy(crosshair, { interactionSource: 'catalog_card' })
      }}
    >
      <Icon name={copied ? 'check' : 'copy'} size={18} />
      <span>{copied ? t('actions.copiedShort') : t('actions.copyShort')}</span>
    </button>
  )

  return (
    <article className={`crosshair-card ${shapeLabel ? 'is-comparison' : ''} ${selected ? 'is-selected' : ''} ${crosshair.isCute ? 'is-cute' : ''} ${showCode ? 'has-code' : ''}`}>
      {!shapeLabel && copyButton}
      <a className="card-select" href={href} onClick={() => onSelect(crosshair, 'catalog_card')} aria-current={selected ? 'page' : undefined} aria-label={t('card.test', { name: shapeLabel ? `${crosshair.name}, ${shapeLabel}, 1× and 4×` : crosshair.name })}>
        {selected && (
          <span className="selected-mark" aria-label={t('card.selected')}>
            <Icon name="check" size={14} strokeWidth={2.4} />
          </span>
        )}
        <span className="card-preview">
          {shapeLabel ? [1, 4].map((scale) => (
            <span className="comparison-scale" key={scale}>
              <span className="comparison-sample"><CrosshairCanvas crosshair={crosshair} scale={scale} label={crosshair.name} /></span>
              <span>{scale}×</span>
            </span>
          )) : <CrosshairCanvas crosshair={crosshair} scale={crosshair.previewScale || 1.8} label={t('card.test', { name: crosshair.name })} />}
        </span>
        <span className="card-info">
          <span className="card-title">{crosshair.shortName}</span>
          {shapeLabel && <span className="comparison-shape">{shapeLabel}</span>}
        </span>
        {!shapeLabel && !crosshair.isPro && crosshair.isCute && <span className={`pro-label cute-label ${crosshair.category === 'fun' ? 'is-fun' : ''}`}>{t(`badges.${crosshair.category === 'fun' ? 'fun' : 'cute'}`)}</span>}
      </a>
      {shapeLabel && copyButton}
      {showCode && (
        <details className="card-code">
          <summary>{t('modal.code')}</summary>
          <code>{crosshair.code}</code>
        </details>
      )}
    </article>
  )
}
