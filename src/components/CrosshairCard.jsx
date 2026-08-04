import CrosshairCanvas from './CrosshairCanvas.jsx'
import Icon from './Icon.jsx'

export default function CrosshairCard({ crosshair, selected, copied, onSelect, onCopy, t }) {
  return (
    <article className={`crosshair-card ${selected ? 'is-selected' : ''} ${crosshair.isCute ? 'is-cute' : ''}`}>
      <button
        className="icon-button card-copy"
        type="button"
        aria-label={copied ? t('card.copied', { name: crosshair.name }) : t('card.copy', { name: crosshair.name })}
        onClick={(event) => {
          event.stopPropagation()
          onCopy(crosshair, { source: 'catalog_card' })
        }}
      >
        <Icon name={copied ? 'check' : 'copy'} size={18} />
      </button>
      <button className="card-select" type="button" onClick={() => onSelect(crosshair, 'catalog_card')} aria-pressed={selected} aria-label={t('card.test', { name: crosshair.name })}>
        {selected && (
          <span className="selected-mark" aria-label={t('card.selected')}>
            <Icon name="check" size={14} strokeWidth={2.4} />
          </span>
        )}
        <span className="card-preview">
          <CrosshairCanvas crosshair={crosshair} scale={crosshair.previewScale || 1.8} label={t('card.test', { name: crosshair.name })} />
        </span>
        <span className="card-info">
          <span className="card-title">{crosshair.shortName}</span>
        </span>
        {crosshair.isPro && <span className="pro-label">{t('badges.pro')}</span>}
        {!crosshair.isPro && crosshair.isCute && <span className={`pro-label cute-label ${crosshair.category === 'fun' ? 'is-fun' : ''}`}>{t(`badges.${crosshair.category === 'fun' ? 'fun' : 'cute'}`)}</span>}
      </button>
    </article>
  )
}
