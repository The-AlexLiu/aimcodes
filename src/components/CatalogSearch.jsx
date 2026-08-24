import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

export default function CatalogSearch({ query, firstResult, resultCount, onQueryChange, onClear, onSelect, t }) {
  const inputRef = useRef(null)

  useEffect(() => {
    const focusSearch = (event) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target
      const isTyping = target instanceof HTMLElement && (
        target.matches('input, textarea, select') || target.isContentEditable
      )
      if (isTyping) return

      event.preventDefault()
      inputRef.current?.focus()
    }

    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  return (
    <div className="catalog-search-shell">
      <div className="search-bar">
        <Icon name="search" size={21} />
        <input
          ref={inputRef}
          type="search"
          aria-label={t('search.label')}
          aria-keyshortcuts="/"
          autoComplete="off"
          autoCapitalize="none"
          enterKeyHint="search"
          spellCheck={false}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && firstResult) onSelect(firstResult, 'search_enter')
            if (event.key === 'Escape') {
              onClear()
            }
          }}
          placeholder={t('search.placeholder')}
        />
        {query && <button type="button" className="clear-search" onClick={onClear} aria-label={t('search.clear')}><Icon name="x" size={17} /></button>}
        <span className="search-shortcut" aria-hidden="true">/</span>
      </div>
      <span className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        {t(resultCount === 1 ? 'collection.countOne' : 'collection.countMany', { count: resultCount })}
      </span>
    </div>
  )
}
