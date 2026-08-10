import { isPriorityCrosshair } from '../seo/routes.js'

/**
 * This allowlist is intentionally conservative. It prevents future ad code from
 * appearing beside reaction-test controls, error states, legal pages, or thin
 * crosshair routes where an ad could be mistaken for a product action.
 */
export function isAdEligibleRoute(route) {
  if (['home', 'catalog', 'collection', 'article', 'guide'].includes(route.type)) return true
  return route.type === 'crosshair' && isPriorityCrosshair(route.crosshairId)
}
