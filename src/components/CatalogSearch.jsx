import Icon from './Icon.jsx'

export default function CatalogSearch({ query, firstResult, onQueryChange, onClear, onSelect, t }) {
  return (
    <div className="catalog-search-shell">
      <div className="search-bar">
        <Icon name="search" size={21} />
        <input
          aria-label={t('search.label')}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && firstResult) onSelect(firstResult, 'search_enter')
            if (event.key === 'Escape') onClear()
          }}
          placeholder={t('search.placeholder')}
        />
        {query && <button type="button" className="clear-search" onClick={onClear} aria-label={t('search.clear')}><Icon name="x" size={17} /></button>}
        <span className="search-shortcut" aria-hidden="true">/</span>
      </div>
    </div>
  )
}
