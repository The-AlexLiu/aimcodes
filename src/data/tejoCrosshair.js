import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const TEJO_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#ffc76b',
  outline: true, outlineOpacity: 0.7, outlineThickness: 1,
  dot: true, dotOpacity: 1, dotSize: 2,
  inner: true, innerOpacity: 1, innerLength: 8, innerVerticalLength: 1, innerThickness: 1, innerOffset: 3,
  outer: true, outerOpacity: 1, outerLength: 1, outerThickness: 2, outerOffset: 12,
  movementError: false, firingError: false,
})
const s = TEJO_GENERATOR_SETTINGS
export const TEJO_CROSSHAIR = Object.freeze({
  id: 'tejo-theme', name: 'Tejo Targeting Reticle', shortName: 'Tejo Targeting Reticle', category: 'custom',
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
