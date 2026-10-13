import { catalogCrosshairs } from '../data/catalogManifest.js'

const sourceById = new Map(catalogCrosshairs.map(item => [item.id, item]))

// Default browsing groups identical appearances. A search must still find each
// source profile: two players can share a shape without sharing its provenance.
export function searchCatalog({ crosshairs, sourceCrosshairs, query, language, activeFilter, recentIds, categoryLabel }) {
  const normalized = query.trim().toLocaleLowerCase(language)
  const entries = normalized || ['pro', 'recent'].includes(activeFilter) ? sourceCrosshairs : crosshairs
  return entries.filter((item) => {
    const matchesText = !normalized || [item.name, item.shortName, item.player, item.description, categoryLabel(item.category), item.colorName, item.colorKey, item.category, item.id.replaceAll('-', ' '), item.code, sourceById.get(item.id)?.name, sourceById.get(item.id)?.shortName]
      .join(' ').toLocaleLowerCase(language).includes(normalized)
    const matchesFilter = activeFilter === 'all'
      || (activeFilter === 'pro' && item.isPro)
      || (activeFilter === 'cute' && item.isCute)
      || (activeFilter === 'recent' && recentIds.includes(item.id))
      || item.category === activeFilter
    return matchesText && matchesFilter
  })
}
