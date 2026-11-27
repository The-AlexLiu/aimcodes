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

function visibleSettings(item) {
  try {
    return parseCrosshairCode(item.code, { fallbackColor: item.color }).settings
  } catch {
    return null
  }
}

function sameVisibleSettings(left, right) {
  if (!left || !right) return false
  return Boolean(left.outline.enabled) === Boolean(right.outline.enabled)
    && Boolean(left.dot.enabled) === Boolean(right.dot.enabled)
    && (!left.dot.enabled || closeEnough(left.dot.size, right.dot.size))
    && sameLineSet(left.inner, right.inner)
    && sameLineSet(left.outer, right.outer)
}

export function haveSameVisibleShape(left, right) {
  return sameVisibleSettings(visibleSettings(left), visibleSettings(right))
}

export function dedupeCrosshairsByAppearance(items) {
  const previous = []
  return items.filter((item) => {
    const settings = visibleSettings(item)
    const duplicate = previous.some((candidate) => sameVisibleSettings(candidate, settings))
    previous.push(settings)
    return !duplicate
  })
}
