import { crosshairs } from '../src/data/crosshairs.js'
import { generateCrosshairCode, parseCrosshairCode } from '../src/utils/crosshairCode.js'

const errors = []
const cases = [
  {
    name: 'cyan short cross',
    options: { colorPreset: '5', outline: { enabled: true, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, length: 4, thickness: 2, offset: 2 }, outer: { enabled: false } },
    verify: (parsed) => parsed.colorKey === 'cyan' && parsed.settings.inner.enabled && !parsed.settings.outer.enabled,
  },
  {
    name: 'pink center dot',
    options: { colorPreset: '6', dot: { enabled: true, opacity: 1, size: 3 }, inner: { enabled: false }, outer: { enabled: false } },
    verify: (parsed) => parsed.colorKey === 'pink' && parsed.settings.dot.enabled && !parsed.settings.inner.enabled,
  },
  {
    name: 'training feedback',
    options: { movementError: true, firingError: true, inner: { enabled: true }, outer: { enabled: false } },
    verify: (parsed) => parsed.settings.movementError.enabled && parsed.settings.firingError.enabled,
  },
]

for (const item of cases) {
  try {
    const code = generateCrosshairCode(item.options)
    const parsed = parseCrosshairCode(code)
    if (!item.verify(parsed)) errors.push(`${item.name}: generated settings did not survive decoding`)
  } catch (error) {
    errors.push(`${item.name}: ${error.message}`)
  }
}

for (const crosshair of crosshairs) {
  try {
    parseCrosshairCode(crosshair.code, { fallbackColor: crosshair.color })
  } catch (error) {
    errors.push(`${crosshair.id}: existing database code failed decoder (${error.message})`)
  }
}

for (const invalid of ['', 'broken-code', '0;P;c', '0 P c 5']) {
  try {
    parseCrosshairCode(invalid)
    errors.push(`invalid input unexpectedly passed: ${invalid || '<empty>'}`)
  } catch {
    // Expected: decoder must reject incomplete or malformed input.
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${cases.length} generated profiles, ${crosshairs.length} database codes, and decoder rejection cases.`)
