import CrosshairCanvas from './CrosshairCanvas.jsx'
import Icon from './Icon.jsx'
import { crosshairColorPresets, previewBackgroundOptions as backgroundOptions } from '../data/previewOptions.js'
import { detailHeading } from '../seo/content.js'

export default function CrosshairPreviewWorkspace({
  locale,
  route,
  selected,
  selectedCodeColorKey,
  activeBackground,
  activeBackgroundName,
  background,
  showPreviewSettings,
  showInstructions,
  copiedId,
  shareStatus,
  previewScale,
  onToggleSettings,
  onBackgroundChange,
  onColorChange,
  onCopy,
  onToggleInstructions,
  onShare,
  t,
}) {
  return (
    <section className="workspace" id="preview" aria-label={t('workspace.label')}>
      <div className="preview-frame">
        <img src={activeBackground.image} alt={t('preview.mapAlt', { map: activeBackgroundName })} width="914" height="514" loading="eager" decoding="async" fetchPriority="high" />
        <CrosshairCanvas crosshair={selected} scale={previewScale} label={t('card.test', { name: selected.name })} />
        <div className="hud-map" aria-hidden="true"><strong>{activeBackgroundName.toLocaleUpperCase(locale)}</strong></div>
        <span className="hud-ticks" aria-hidden="true" />
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />
      </div>

      <aside className={`detail-panel ${selected.isCute ? 'is-cute' : ''}`}>
        <span className="panel-cut" aria-hidden="true" />
        <div className="detail-heading">
          {route.type === 'crosshair' ? <h1>{detailHeading(locale, selected)}</h1> : <h2>{selected.name}</h2>}
          <p>{selected.description}</p>
        </div>

        <button className="settings-toggle" type="button" onClick={onToggleSettings} aria-expanded={showPreviewSettings} aria-controls="preview-settings">
          {t('preview.settings')} <Icon name="chevronDown" size={16} />
        </button>
        <div className={`preview-settings ${showPreviewSettings ? 'is-open' : ''}`} id="preview-settings">
          <div className="panel-divider" />
          <fieldset className="background-picker">
            <legend>{t('preview.background')}</legend>
            <div className="background-options">
              {backgroundOptions.map((option) => (
                <button key={option.value} className={`background-option ${background === option.value ? 'is-selected' : ''}`} type="button" onClick={() => onBackgroundChange(option.value)} aria-pressed={background === option.value}>
                  <span className="background-swatch"><img src={option.image} alt="" width="914" height="514" loading="lazy" decoding="async" /></span>
                  <span>{t(`maps.${option.value}`)}</span>
                  {background === option.value && <i><Icon name="check" size={12} strokeWidth={2.6} /></i>}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="crosshair-color-picker">
            <legend>{t('preview.crosshairColor')}</legend>
            <div className="crosshair-color-options">
              {crosshairColorPresets.map((option) => (
                <button
                  className={selectedCodeColorKey === option.key ? 'is-selected' : ''}
                  type="button"
                  onClick={() => onColorChange(option)}
                  aria-label={t(`colors.${option.key}`)}
                  aria-pressed={selectedCodeColorKey === option.key}
                  title={t(`colors.${option.key}`)}
                  key={option.key}
                >
                  <span style={{ background: option.hex }} />
                </button>
              ))}
            </div>
            <p className="control-help">{t('preview.colorHelp')}</p>
          </fieldset>
        </div>

        <div className="action-row is-shareable">
          <button className="primary-button" type="button" onClick={() => onCopy(selected, { interactionSource: 'explore_preview' })}>
            <Icon name={copiedId === selected.id ? 'check' : 'copy'} /> {copiedId === selected.id ? t('actions.copied') : t('actions.copy')}
          </button>
          <button className="secondary-button" type="button" onClick={onToggleInstructions} aria-expanded={showInstructions}>
            <Icon name="gamepad" /> {t('actions.import')}
          </button>
          <button className="secondary-button share-crosshair-button" type="button" onClick={onShare} disabled={shareStatus === 'working'} aria-live="polite">
            <Icon name={shareStatus === 'shared' || shareStatus === 'copied' ? 'check' : 'share'} />
            {shareStatus === 'working'
              ? t('share.crosshairWorking')
              : shareStatus === 'shared'
                ? t('share.crosshairShared')
                : shareStatus === 'copied'
                  ? t('share.crosshairCopied')
                  : shareStatus === 'error'
                    ? t('share.crosshairError')
                    : t('share.crosshairAction')}
          </button>
        </div>
        {showInstructions && (
          <ol className="instruction-box">
            <li>{t('instructions.one')}</li>
            <li>{t('instructions.two')}</li>
            <li>{t('instructions.three')}</li>
          </ol>
        )}
      </aside>
    </section>
  )
}
