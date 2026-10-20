import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const VETO_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#69d9ff',
  outline: true, outlineOpacity: 0.7, outlineThickness: 1,
  dot: false, dotOpacity: 1, dotSize: 1,
  inner: true, innerOpacity: 1, innerLength: 0, innerVerticalLength: 1, innerThickness: 8, innerOffset: 5,
  outer: true, outerOpacity: 1, outerLength: 8, outerVerticalLength: 0, outerThickness: 1, outerOffset: 3,
  movementError: false, firingError: false,
})
const s = VETO_GENERATOR_SETTINGS
export const VETO_CROSSHAIR = Object.freeze({
  id: 'veto-theme', name: 'Veto Split Shield', shortName: 'Veto Split Shield', category: 'custom',
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
