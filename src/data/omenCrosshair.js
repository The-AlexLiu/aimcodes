import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const OMEN_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#aaa4ff',
  outline: true, outlineOpacity: 0.7, outlineThickness: 1,
  dot: false, dotOpacity: 1, dotSize: 2,
  inner: false, innerOpacity: 1, innerLength: 5, innerThickness: 1, innerOffset: 1,
  outer: true, outerOpacity: 1, outerLength: 3, outerThickness: 3, outerOffset: 4,
  movementError: false, firingError: false,
})
const s = OMEN_GENERATOR_SETTINGS
export const OMEN_CROSSHAIR = Object.freeze({
  id: 'omen-theme', name: 'Omen Shards', shortName: 'Omen Shards', category: 'custom',
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
