import { BrandMark } from './BrandLogo.jsx'
import CatalogControls from './CatalogControls.jsx'
import CrosshairCard from './CrosshairCard.jsx'
import Icon from './Icon.jsx'
import { seoCopy } from '../seo/content.js'
import { routePath } from '../seo/routes.js'

export default function CrosshairCollectionSection({
  locale,
  route,
  displayedCrosshairs,
  visibleCrosshairs,
  selected,
  copiedId,
  filters,
  recentIds,
  activeFilter,
  catalogSort,
  catalogPageSize,
  onSelect,
  onCopy,
  onFilterChange,
  onSortChange,
  onRandom,
  onLoadMore,
  onClear,
  t,
}) {
  const count = route.type === 'catalog' ? visibleCrosshairs.length : displayedCrosshairs.length

  return (
    <section className={`collection-section ${route.type === 'home' ? 'is-home' : route.type === 'catalog' ? 'is-catalog' : ''}`} id="collection">
      {route.type === 'collection' ? (
        <div className="catalog-summary">
          <h2>{t('collection.title')}</h2>
          <span>{t(displayedCrosshairs.length === 1 ? 'collection.countOne' : 'collection.countMany', { count: displayedCrosshairs.length })}</span>
          <button type="button" onClick={() => onRandom(displayedCrosshairs, 'collection_random')}>
            <Icon name="rotate" size={16} /> {t('actions.random')}
          </button>
        </div>
      ) : (
        <div className="collection-heading">
          <div className="collection-title-block">
            <BrandMark compact />
            <div>
              <h2>{route.type === 'home' ? seoCopy(locale).home.popular : route.type === 'catalog' ? seoCopy(locale).catalog.gridTitle : seoCopy(locale).detail.related}</h2>
              <p>{route.type === 'home' ? seoCopy(locale).home.popularBody : route.type === 'catalog' ? seoCopy(locale).catalog.gridBody : t('collection.subtitle')}</p>
            </div>
          </div>
          <div className="collection-meta">
            <span>{t(count === 1 ? 'collection.countOne' : 'collection.countMany', { count })}</span>
            {route.type === 'home' && (
              <a className="collection-view-all" href={routePath(locale, { type: 'catalog' })}>{seoCopy(locale).home.primary}</a>
            )}
            {route.type === 'crosshair' && (
              <button type="button" onClick={() => onRandom(displayedCrosshairs, 'related_random')}>
                <Icon name="rotate" size={15} /> {t('actions.random')}
              </button>
            )}
          </div>
        </div>
      )}

      {route.type === 'catalog' && (
        <CatalogControls
          locale={locale}
          filters={filters}
          recentIds={recentIds}
          activeFilter={activeFilter}
          catalogSort={catalogSort}
          resultCount={visibleCrosshairs.length}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
          onRandom={() => onRandom(visibleCrosshairs, 'catalog_random')}
          t={t}
        />
      )}

      {displayedCrosshairs.length > 0 ? (
        <>
          <div className="crosshair-grid">
            {displayedCrosshairs.map((item) => (
              <CrosshairCard key={item.id} crosshair={item} href={routePath(locale, { type: 'crosshair', crosshairId: item.id })} selected={route.type !== 'catalog' && route.type !== 'collection' && selected.id === item.id} copied={copiedId === item.id} onSelect={onSelect} onCopy={onCopy} t={t} />
            ))}
          </div>
          {route.type === 'catalog' && displayedCrosshairs.length < visibleCrosshairs.length && (
            <div className="catalog-load-more">
              <span>{t('catalogUx.showing', { shown: displayedCrosshairs.length, total: visibleCrosshairs.length })}</span>
              <button type="button" onClick={() => onLoadMore(catalogPageSize)}>{t('catalogUx.loadMore')}</button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <span className="empty-crosshair">+</span>
          <h3>{t('empty.filteredTitle')}</h3>
          <p>{t('empty.filteredBody')}</p>
          <button type="button" onClick={onClear}>{t('actions.clear')}</button>
        </div>
      )}
    </section>
  )
}
