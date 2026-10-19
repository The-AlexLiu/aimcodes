import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const VIPER_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#b7f34b',
  outline: true, outlineOpacity: 0.7, outlineThickness: 1,
  dot: true, dotOpacity: 1, dotSize: 3,
  inner: false, innerOpacity: 1, innerLength: 5, innerThickness: 1, innerOffset: 1,
  outer: false, outerOpacity: 1, outerLength: 2, outerThickness: 1, outerOffset: 9,
  movementError: false, firingError: false,
})
const s = VIPER_GENERATOR_SETTINGS
export const VIPER_CROSSHAIR = Object.freeze({
  id: 'viper-theme', name: 'Viper Toxin Dot', shortName: 'Viper Toxin Dot', category: 'custom',
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
