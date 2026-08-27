import { crosshairStatisticShare, crosshairStatistics } from '../data/catalogStatistics.js'
import { collectionCopy } from '../seo/collectionContent.js'
import { crosshairStatisticsCopy } from '../seo/crosshairStatisticsContent.js'
import { routePath } from '../seo/routes.js'

const colorCollectionKeys = Object.freeze({
  white: 'white',
  cyan: 'cyan',
  red: 'red',
  pink: 'pink',
  green: 'green',
})

function StatisticsTable({ rows, labels, locale, collectionKeys = {} }) {
  return (
    <div className="crosshair-statistics-table-wrap">
      <table className="crosshair-statistics-table">
        <thead><tr><th>{labels.table.group}</th><th>{labels.table.codes}</th><th>{labels.table.share}</th></tr></thead>
        <tbody>
          {rows.map(({ key, count }) => {
            const collectionKey = collectionKeys[key]
            const label = labels[key] || key
            return (
              <tr key={key}>
                <th scope="row">
                  {collectionKey ? <a href={routePath(locale, { type: 'collection', collectionKey })}>{label}</a> : label}
                </th>
                <td>{count}</td>
                <td><span className="crosshair-statistics-share"><i style={{ width: `${crosshairStatisticShare(count)}%` }} />{crosshairStatisticShare(count)}%</span></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function CrosshairStatisticsPanel({ locale }) {
  const copy = crosshairStatisticsCopy(locale)
  const largestCollection = crosshairStatistics.collections.reduce((largest, collection) => collection.count > largest.count ? collection : largest)

  return (
    <section className="crosshair-statistics" aria-labelledby="crosshair-statistics-title">
      <header>
        <h2 id="crosshair-statistics-title">{copy.methodologyTitle}</h2>
        <p>{copy.methodology}</p>
      </header>
      <div className="crosshair-statistics-metrics">
        <article><strong>{crosshairStatistics.total}</strong><span>{copy.metrics.published}</span></article>
        <article><strong>{crosshairStatistics.proCount}</strong><span>{copy.metrics.pros}</span></article>
        <article><strong>{crosshairStatistics.colorCount}</strong><span>{copy.metrics.colors}</span></article>
        <article><strong>{largestCollection.count}</strong><span>{copy.metrics.largest}: {collectionCopy(locale, largestCollection.key).label}</span></article>
      </div>
      <div className="crosshair-statistics-grid">
        <section>
          <h3>{copy.colorTitle}</h3>
          <p>{copy.colorIntro}</p>
          <StatisticsTable rows={crosshairStatistics.colors} labels={{ ...copy, ...copy.colors }} locale={locale} collectionKeys={colorCollectionKeys} />
        </section>
        <section>
          <h3>{copy.categoryTitle}</h3>
          <p>{copy.categoryIntro}</p>
          <StatisticsTable rows={crosshairStatistics.categories} labels={{ ...copy, ...copy.categories }} locale={locale} />
        </section>
      </div>
      <section className="crosshair-statistics-collections">
        <h3>{copy.collectionTitle}</h3>
        <p>{copy.collectionIntro}</p>
        <div>
          {crosshairStatistics.collections.map(({ key, count }) => (
            <a href={routePath(locale, { type: 'collection', collectionKey: key })} key={key}>
              <strong>{count}</strong><span>{collectionCopy(locale, key).label}</span>
            </a>
          ))}
        </div>
      </section>
    </section>
  )
}
