import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const ASTRA_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#d5a0ff',
  outline: true, outlineOpacity: 0.7, outlineThickness: 1,
  dot: false, dotOpacity: 1, dotSize: 1,
  inner: true, innerOpacity: 1, innerLength: 7, innerVerticalLength: 3, innerThickness: 1, innerOffset: 0,
  outer: true, outerOpacity: 1, outerLength: 1, outerThickness: 2, outerOffset: 10,
  movementError: false, firingError: false,
})
const s = ASTRA_GENERATOR_SETTINGS
export const ASTRA_CROSSHAIR = Object.freeze({
  id: 'astra-theme', name: 'Astra Starburst', shortName: 'Astra Starburst', category: 'custom',
  color: s.customColor, colorKey: 'custom',
  code: generateCrosshairCode({
    colorPreset: s.colorPreset, customColor: s.customColor,
    outline: { enabled: s.outline, opacity: s.outlineOpacity, thickness: s.outlineThickness },
    dot: { enabled: s.dot, opacity: s.dotOpacity, size: s.dotSize },
    inner: { enabled: s.inner, opacity: s.innerOpacity, length: s.innerLength, verticalLength: s.innerVerticalLength, thickness: s.innerThickness, offset: s.innerOffset },
    outer: { enabled: s.outer, opacity: s.outerOpacity, length: s.outerLength, thickness: s.outerThickness, offset: s.outerOffset },
    movementError: s.movementError, firingError: s.firingError,
  }),
})
