import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const HUSH_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#ed9bda',
  outline: true, outlineOpacity: 0.8, outlineThickness: 1,
  dot: false, dotOpacity: 1, dotSize: 2,
  inner: true, innerOpacity: 1, innerLength: 4, innerThickness: 2, innerOffset: 2,
  outer: false, outerOpacity: 1, outerLength: 2, outerThickness: 2, outerOffset: 10,
  movementError: false, firingError: false,
})
const s = HUSH_GENERATOR_SETTINGS
export const HUSH_CROSSHAIR = Object.freeze({
  id: 'hush-theme', name: 'Hush', shortName: 'Hush', category: 'custom',
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
