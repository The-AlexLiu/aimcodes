import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes design; not an official agent or player configuration.
export const JETT_GENERATOR_SETTINGS = Object.freeze({
  colorPreset: '8', customColor: '#a3efff',
  outline: true, outlineOpacity: 0.7, outlineThickness: 1,
  dot: true, dotOpacity: 1, dotSize: 1,
  inner: false, innerOpacity: 1, innerLength: 1, innerThickness: 4, innerOffset: 4,
  outer: true, outerOpacity: 1, outerLength: 1, outerThickness: 1, outerOffset: 6,
  movementError: false, firingError: false,
})
const s = JETT_GENERATOR_SETTINGS
export const JETT_CROSSHAIR = Object.freeze({
  id: 'jett-theme', name: 'Jett Five', shortName: 'Jett Five', category: 'custom',
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
