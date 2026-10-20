import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const MIKS_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#c5a0ff',
  outline: true, outlineOpacity: 0.7, outlineThickness: 1,
  dot: true, dotOpacity: 1, dotSize: 1,
  inner: true, innerOpacity: 1, innerLength: 3, innerVerticalLength: 0, innerThickness: 2, innerOffset: 3,
  outer: true, outerOpacity: 1, outerLength: 2, outerVerticalLength: 0, outerThickness: 4, outerOffset: 9,
  movementError: false, firingError: false,
})
const s = MIKS_GENERATOR_SETTINGS
export const MIKS_CROSSHAIR = Object.freeze({
  id: 'miks-theme', name: 'Miks Pulse', shortName: 'Miks Pulse', category: 'custom',
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
