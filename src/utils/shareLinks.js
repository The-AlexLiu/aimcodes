import { routePath } from '../seo/routes.js'

const SHAREABLE_MAPS = new Set(['ascent', 'haven', 'bind'])
const SHAREABLE_COLORS = new Set(['white', 'green', 'cyan', 'yellow', 'red', 'pink'])

export function readSharedPreviewOptions(parameters) {
  const background = SHAREABLE_MAPS.has(parameters.get('mapa')) ? parameters.get('mapa') : 'ascent'
  const colorKey = SHAREABLE_COLORS.has(parameters.get('color')) ? parameters.get('color') : ''
  return { background, colorKey }
}

export function isSharedCrosshairEntry(parameters, routeType) {
  return routeType === 'crosshair'
    && parameters.get('utm_source') === 'share'
    && parameters.get('utm_medium') === 'crosshair'
}

export function createCrosshairShareUrl({ origin, locale, crosshairId, background = 'ascent', colorKey = '' }) {
  const url = new URL(routePath(locale, { type: 'crosshair', crosshairId }), origin)
  if (SHAREABLE_MAPS.has(background) && background !== 'ascent') url.searchParams.set('mapa', background)
  if (SHAREABLE_COLORS.has(colorKey)) url.searchParams.set('color', colorKey)
  url.searchParams.set('utm_source', 'share')
  url.searchParams.set('utm_medium', 'crosshair')
  url.searchParams.set('utm_campaign', crosshairId)
  return url.toString()
}
