import { catalogCrosshairs, crosshairCollections } from './catalogManifest.js'
import { dedupeCrosshairsByAppearance } from '../utils/crosshairSimilarity.js'

export const distinctCatalogCrosshairs = dedupeCrosshairsByAppearance(catalogCrosshairs)
const visibleIds = new Set(distinctCatalogCrosshairs.map(item => item.id))

export function collectionDisplayIds(key) {
  return crosshairCollections[key].crosshairIds.filter(id => key === 'pro' || visibleIds.has(id))
}
