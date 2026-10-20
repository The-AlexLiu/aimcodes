import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const ISO_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#bda0ff',
  outline: true, outlineOpacity: 0.7, outlineThickness: 1,
  dot: false, dotOpacity: 1, dotSize: 2,
  inner: true, innerOpacity: 1, innerLength: 1, innerThickness: 4, innerOffset: 2,
  outer: true, outerOpacity: 1, outerLength: 1, outerThickness: 10, outerOffset: 6,
  movementError: false, firingError: false,
})
const s = ISO_GENERATOR_SETTINGS
export const ISO_CROSSHAIR = Object.freeze({
  id: 'iso-theme', name: 'Iso Double Frame', shortName: 'Iso Double Frame', category: 'custom',
  color: s.customColor, colorKey: 'custom',
  code: generateCrosshairCode({
    colorPreset: s.colorPreset, customColor: s.customColor,
    outline: { enabled: s.outline, opacity: s.outlineOpacity, thickness: s.outlineThickness },
    dot: { enabled: s.dot, opacity: s.dotOpacity, size: s.dotSize },
    inner: { enabled: s.inner, opacity: s.innerOpacity, length: s.innerLength, thickness: s.innerThickness, offset: s.innerOffset },
    outer: { enabled: s.outer, opacity: s.outerOpacity, length: s.outerLength, thickness: s.outerThickness, offset: s.outerOffset },
    movementError: s.movementError, firingError: s.firingError,
  }),
})
