import { parseCrosshairCode } from './crosshairCode.js'

function closeEnough(left, right, tolerance = 0) {
  return Math.abs((left || 0) - (right || 0)) <= tolerance
}

function sameLineSet(left, right) {
  if (Boolean(left.enabled) !== Boolean(right.enabled)) return false
  if (!left.enabled) return true

  return closeEnough(left.horizontalLength, right.horizontalLength, 1)
    && closeEnough(left.verticalLength, right.verticalLength, 1)
    && closeEnough(left.thickness, right.thickness)
    && closeEnough(left.offset, right.offset)
}

export function haveSameVisibleShape(left, right) {
  try {
    const leftParsed = parseCrosshairCode(left.code, { fallbackColor: left.color })
    const rightParsed = parseCrosshairCode(right.code, { fallbackColor: right.color })
    const leftSettings = leftParsed.settings
    const rightSettings = rightParsed.settings

    return Boolean(leftSettings.outline.enabled) === Boolean(rightSettings.outline.enabled)
      && Boolean(leftSettings.dot.enabled) === Boolean(rightSettings.dot.enabled)
      && (!leftSettings.dot.enabled || closeEnough(leftSettings.dot.size, rightSettings.dot.size))
      && sameLineSet(leftSettings.inner, rightSettings.inner)
      && sameLineSet(leftSettings.outer, rightSettings.outer)
  } catch {
    return false
  }
}

export function dedupeCrosshairsByAppearance(items) {
  return items.filter((item, index) => (
    !items.slice(0, index).some((candidate) => haveSameVisibleShape(candidate, item))
  ))
}
