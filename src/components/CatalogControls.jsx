import { useState } from 'react'
import Icon from './Icon.jsx'
import SeoTopicLinks from './SeoTopicLinks.jsx'

const QUICK_FILTERS = ['all', 'pro', 'dot', 'cute']

export default function CatalogControls({
  locale,
  filters,
  recentIds,
  activeFilter,
  catalogSort,
  resultCount,
  onFilterChange,
  onSortChange,
  onRandom,
  t,
}) {
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const availableFilters = [...filters, ...(recentIds.length >= 2 ? ['recent'] : [])]

  return (
    <div className="catalog-controls">
      <div className="catalog-mobile-summary">
        <span>{t(resultCount === 1 ? 'collection.countOne' : 'collection.countMany', { count: resultCount })}</span>
        <div>
          <button type="button" onClick={onRandom}>
            <Icon name="rotate" size={16} /> {t('actions.random')}
          </button>
          <button
            className={showMoreFilters ? 'is-active' : ''}
            type="button"
            onClick={() => setShowMoreFilters((current) => !current)}
            aria-expanded={showMoreFilters}
            aria-controls="catalog-filter-panel"
          >
            <Icon name="sliders" size={16} /> {t('catalogUx.filters')}
          </button>
        </div>
      </div>

      <div className="catalog-quick-filters" aria-label={t('filters.label')}>
        {QUICK_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={activeFilter === filter ? 'is-active' : ''}
            onClick={() => onFilterChange(filter)}
          >
            {t(`filters.${filter}`)}
          </button>
        ))}
      </div>

      <div className={`filters ${showMoreFilters ? 'is-open' : ''}`} id="catalog-filter-panel" aria-label={t('filters.label')}>
        <div className="catalog-filter-heading">
          <strong>{t('filters.label')}</strong>
          <button type="button" onClick={() => setShowMoreFilters(false)} aria-label={t('catalogUx.closeFilters')}>
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="filter-tabs">
          {availableFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? 'is-active' : ''}
              onClick={() => onFilterChange(filter)}
            >
              {t(`filters.${filter}`)}
            </button>
          ))}
        </div>
        <label className="catalog-sort">
          <span>{t('sort.label')}</span>
          <select value={catalogSort} onChange={(event) => onSortChange(event.target.value)}>
            <option value="recommended">{t('sort.recommended')}</option>
            <option value="name">{t('sort.name')}</option>
            <option value="updated">{t('sort.updated')}</option>
          </select>
          <Icon name="chevronDown" size={14} />
        </label>
        <div className="catalog-topic-links">
          <SeoTopicLinks locale={locale} />
        </div>
      </div>
    </div>
  )
}
