import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const KILLJOY_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#f4d35e',
  outline: true, outlineOpacity: 0.7, outlineThickness: 1,
  dot: false, dotOpacity: 1, dotSize: 1,
  inner: true, innerOpacity: 1, innerLength: 7, innerVerticalLength: 0, innerThickness: 1, innerOffset: 3,
  outer: true, outerOpacity: 1, outerLength: 0, outerVerticalLength: 3, outerThickness: 3, outerOffset: 5,
  movementError: false, firingError: false,
})
const s = KILLJOY_GENERATOR_SETTINGS
export const KILLJOY_CROSSHAIR = Object.freeze({
  id: 'killjoy-theme', name: 'Killjoy Circuit', shortName: 'Killjoy Circuit', category: 'custom',
  color: s.customColor, colorKey: 'custom',
  code: generateCrosshairCode({
    colorPreset: s.colorPreset, customColor: s.customColor,
    outline: { enabled: s.outline, opacity: s.outlineOpacity, thickness: s.outlineThickness },
    dot: { enabled: s.dot, opacity: s.dotOpacity, size: s.dotSize },
    inner: { enabled: s.inner, opacity: s.innerOpacity, length: s.innerLength, verticalLength: s.innerVerticalLength, thickness: s.innerThickness, offset: s.innerOffset },
    outer: { enabled: s.outer, opacity: s.outerOpacity, length: s.outerLength, verticalLength: s.outerVerticalLength, thickness: s.outerThickness, offset: s.outerOffset },
    movementError: s.movementError, firingError: s.firingError,
  }),
})
