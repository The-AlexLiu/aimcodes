import { generateCrosshairCode } from '../utils/crosshairCode.js'

// Original AimCodes orb motif: short, wide inner segments form a small ring
// around a center dot. Geometry differs from Hush's open four-arm cross.
export const SAGE_CROSSHAIR = Object.freeze({
  id: 'sage-theme', name: 'Sage Orb', color: '#73e2c5',
  code: generateCrosshairCode({
    colorPreset: '8', customColor: '#73e2c5',
    outline: { enabled: true, opacity: 0.7, thickness: 1 },
    dot: { enabled: true, opacity: 1, size: 2 },
    inner: { enabled: true, opacity: 1, length: 2, thickness: 8, offset: 3 },
    outer: { enabled: false, opacity: 1, length: 2, thickness: 2, offset: 10 },
    movementError: false, firingError: false,
  }),
})
