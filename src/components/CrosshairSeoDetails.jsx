import Icon from './Icon.jsx'
import { detailCopy, seoCopy } from '../seo/content.js'

const settingLabels = {
  en: { dot: 'Center dot', outline: 'Outline', inner: 'Inner lines', outer: 'Outer lines', color: 'Color', on: 'On', off: 'Off', copied: 'Copied' },
  es: { dot: 'Punto central', outline: 'Contorno', inner: 'Líneas internas', outer: 'Líneas externas', color: 'Color', on: 'Sí', off: 'No', copied: 'Copiado' },
  'pt-BR': { dot: 'Ponto central', outline: 'Contorno', inner: 'Linhas internas', outer: 'Linhas externas', color: 'Cor', on: 'Sim', off: 'Não', copied: 'Copiado' },
  'zh-CN': { dot: '中心点', outline: '轮廓', inner: '内侧线条', outer: '外侧线条', color: '颜色', on: '开启', off: '关闭', copied: '已复制' },
}

function settingRows(crosshair, locale) {
  const labels = settingLabels[locale] || settingLabels.en
  const rows = []
  if (crosshair.settings?.dot) rows.push([labels.dot, crosshair.settings.dot.enabled ? labels.on : labels.off])
  if (crosshair.settings?.outline !== undefined) rows.push([labels.outline, crosshair.settings.outline ? labels.on : labels.off])
  if (crosshair.settings?.inner) rows.push([labels.inner, crosshair.settings.inner.enabled ? labels.on : labels.off])
  if (crosshair.settings?.outer) rows.push([labels.outer, crosshair.settings.outer.enabled ? labels.on : labels.off])
  rows.push([labels.color, crosshair.colorName])
  return rows
}

export default function CrosshairSeoDetails({ crosshair, locale }) {
  const labels = seoCopy(locale).detail
  const details = detailCopy(locale, crosshair.id)
  const rows = settingRows(crosshair, locale)

  return (
    <section className="seo-detail-content" aria-label={labels.code}>
      <div className="seo-code-panel">
        <div>
          <span>{labels.code}</span>
          <code title={crosshair.code}>{crosshair.code}</code>
        </div>
      </div>

      <div className="seo-detail-grid">
        <article>
          <h2>{labels.bestFor}</h2>
          <p>{details.bestFor}</p>
        </article>
        <article>
          <h2>{labels.tradeoff}</h2>
          <p>{details.tradeoff}</p>
        </article>
        <article>
          <h2>{labels.settings}</h2>
          <dl>
            {rows.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}
          </dl>
        </article>
        <article>
          <h2>{labels.import}</h2>
          <ol>{labels.importSteps.map((step) => <li key={step}>{step}</li>)}</ol>
        </article>
      </div>
      <p className="seo-verified"><Icon name="check" size={14} /> {labels.verified}: {crosshair.sourceCheckedAt || '2026-08-04'}</p>
    </section>
  )
}
