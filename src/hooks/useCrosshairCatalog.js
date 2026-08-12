import { useMemo } from 'react'
import { catalogCrosshairs, crosshairCollections, indexableCrosshairIds } from '../data/catalogManifest.js'
import { localizeCrosshair } from '../i18n/translations.js'
import { parseCrosshairCode } from '../utils/crosshairCode.js'
import { dedupeCrosshairsByAppearance } from '../utils/crosshairSimilarity.js'

const distinctCatalogCrosshairs = dedupeCrosshairsByAppearance(catalogCrosshairs)
const catalogOrder = new Map(distinctCatalogCrosshairs.map((item, index) => [item.id, index]))
const recommendedOrder = new Map(indexableCrosshairIds.map((id, index) => [id, index]))

function hydrateCrosshair(item) {
  try {
    const parsed = parseCrosshairCode(item.code, { fallbackColor: item.color })
    const parsedSettings = {
      outline: parsed.settings.outline.enabled,
      inner: { ...parsed.settings.inner },
      outer: { ...parsed.settings.outer },
      dot: { ...parsed.settings.dot },
      movementError: { ...parsed.settings.movementError },
      firingError: { ...parsed.settings.firingError },
    }
    return {
      ...item,
      color: parsed.color,
      colorKey: item.colorKey || parsed.colorKey,
      settings: item.settings || parsedSettings,
      previewApproximate: parsed.approximate,
    }
  } catch {
    return { ...item, colorKey: item.colorKey || 'custom', previewInvalid: true }
  }
}

export function useCrosshairCatalog({
  language,
  t,
  route,
  selectedId,
  query,
  activeFilter,
  catalogSort,
  catalogLimit,
  recentIds,
  colorOverrides,
}) {
  const hydratedCrosshairs = useMemo(() => distinctCatalogCrosshairs.map(hydrateCrosshair), [])
  const hydratedSourceCrosshairs = useMemo(() => catalogCrosshairs.map(hydrateCrosshair), [])
  const allCrosshairs = useMemo(
    () => hydratedCrosshairs.map((item) => localizeCrosshair(item, language, t)),
    [hydratedCrosshairs, language, t],
  )
  const allSourceCrosshairs = useMemo(
    () => hydratedSourceCrosshairs.map((item) => localizeCrosshair(item, language, t)),
    [hydratedSourceCrosshairs, language, t],
  )

  const routeCrosshair = route.type === 'crosshair'
    ? allSourceCrosshairs.find((item) => item.id === route.crosshairId)
    : null
  const storedSelected = routeCrosshair || allCrosshairs.find((item) => item.id === selectedId) || allCrosshairs[0]

  const visibleCrosshairs = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(language)
    const filtered = allCrosshairs.filter((item) => {
      const localizedCategory = t(`filters.${item.category}`)
      const matchesText = !normalized || [item.name, item.shortName, item.player, item.description, localizedCategory, item.colorName]
        .join(' ')
        .toLocaleLowerCase(language)
        .includes(normalized)
      const matchesFilter = activeFilter === 'all'
        || (activeFilter === 'pro' && item.isPro)
        || (activeFilter === 'cute' && item.isCute)
        || (activeFilter === 'recent' && recentIds.includes(item.id))
        || item.category === activeFilter
      return matchesText && matchesFilter
    })

    return filtered.sort((left, right) => {
      if (activeFilter === 'recent') return recentIds.indexOf(left.id) - recentIds.indexOf(right.id)
      if (catalogSort === 'name') return left.shortName.localeCompare(right.shortName, language, { sensitivity: 'base' })
      if (catalogSort === 'updated') {
        const byDate = String(right.sourceCheckedAt || '').localeCompare(String(left.sourceCheckedAt || ''))
        if (byDate) return byDate
      }

      const leftPriority = recommendedOrder.get(left.id) ?? Number.MAX_SAFE_INTEGER
      const rightPriority = recommendedOrder.get(right.id) ?? Number.MAX_SAFE_INTEGER
      if (leftPriority !== rightPriority) return leftPriority - rightPriority
      if (left.isPro !== right.isPro) return left.isPro ? -1 : 1
      return (catalogOrder.get(left.id) ?? 0) - (catalogOrder.get(right.id) ?? 0)
    })
  }, [activeFilter, allCrosshairs, catalogSort, language, query, recentIds, t])

  let displayedCrosshairs = []
  if (route.type === 'catalog') displayedCrosshairs = visibleCrosshairs.slice(0, catalogLimit)
  if (route.type === 'home') {
    displayedCrosshairs = indexableCrosshairIds.map((id) => allCrosshairs.find((item) => item.id === id)).filter(Boolean).slice(0, 8)
  }
  if (route.type === 'collection') {
    const collectionCatalog = route.collectionKey === 'pro' ? allSourceCrosshairs : allCrosshairs
    displayedCrosshairs = crosshairCollections[route.collectionKey].crosshairIds.map((id) => collectionCatalog.find((item) => item.id === id)).filter(Boolean)
  }
  if (route.type === 'crosshair') {
    const indexed = indexableCrosshairIds.map((id) => allCrosshairs.find((item) => item.id === id))
      .filter((item) => item && item.id !== route.crosshairId)
    const sameCategory = indexed.filter((item) => item.category === (routeCrosshair?.category || ''))
    displayedCrosshairs = [...sameCategory, ...indexed]
      .filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index)
      .slice(0, 6)
  }

  const selectedBase = route.type !== 'crosshair' && visibleCrosshairs.length && !visibleCrosshairs.some((item) => item.id === storedSelected.id)
    ? visibleCrosshairs[0]
    : storedSelected
  const selectedOverrideCode = colorOverrides[selectedBase.id]
  const selected = selectedOverrideCode
    ? (() => {
        const recolored = hydrateCrosshair({ ...selectedBase, code: selectedOverrideCode, colorKey: undefined })
        return {
          ...recolored,
          name: t('preview.colorVariant', { name: selectedBase.shortName, color: t(`colors.${recolored.colorKey}`) }),
          description: t('preview.colorVariantDescription'),
          colorName: t(`colors.${recolored.colorKey}`),
        }
      })()
    : selectedBase

  let selectedCodeColorKey = 'custom'
  try {
    selectedCodeColorKey = parseCrosshairCode(selected.code, { fallbackColor: selected.color }).colorKey
  } catch {
    // Invalid codes are already surfaced by catalog validation and the preview state.
  }

  return {
    allCrosshairs,
    routeCrosshair,
    visibleCrosshairs,
    displayedCrosshairs,
    selected,
    selectedCodeColorKey,
  }
}
