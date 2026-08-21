import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'
import {
  playbookAbilityName,
  playbookAgentPlacementIssue,
  playbookAgentName,
  playbookAgents,
  playbookAgentRoles,
} from '../data/playbookAgents.js'
import { playbookMapName, playbookSeoCopy, playbookUiCopy, valorantMaps } from '../seo/playbookContent.js'

const STORAGE_KEY = 'aimcodes-tactical-board-v3'
const BOARD_SIZE = 1000
const DRAW_COLORS = ['#ff5b55', '#19d3da', '#f7d154', '#64d98b', '#f5f7f8']
const MARKER_TOOLS = new Set(['attacker', 'defender', 'spike', 'danger'])
const TEAM_COLORS = Object.freeze({ attacker: '#ff6b64', defender: '#19d3da' })
const EMPTY_STATE = Object.freeze({ version: 3, mapId: 'ascent', boards: {}, notes: '' })
const ABILITY_INDEX = new Map(playbookAgents.flatMap((agent) => agent.abilities.map((ability) => [ability.id, { agent, ability }])))
const ROTATABLE_ABILITY_SHAPES = new Set(['tripwire', 'wall', 'corridor', 'rectangle', 'cone', 'mesh', 'net'])

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `mark-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function safeState(value) {
  if (!value || ![2, 3].includes(value.version) || typeof value.boards !== 'object') return { ...EMPTY_STATE, boards: {} }
  return {
    version: 3,
    mapId: valorantMaps.some((map) => map.id === value.mapId) ? value.mapId : 'ascent',
    boards: value.boards,
    notes: typeof value.notes === 'string' ? value.notes : '',
  }
}

function decodeSharedBoard() {
  if (typeof window === 'undefined' || !window.location.hash.startsWith('#board=')) return null
  try {
    const encoded = window.location.hash.slice(7).replace(/-/g, '+').replace(/_/g, '/')
    const bytes = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0))
    return safeState(JSON.parse(new TextDecoder().decode(bytes)))
  } catch {
    return null
  }
}

function readBoard() {
  const shared = decodeSharedBoard()
  if (shared) return shared
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('aimcodes-tactical-board-v2')
    return safeState(JSON.parse(stored || 'null'))
  } catch {
    return { ...EMPTY_STATE, boards: {} }
  }
}

function encodeBoard(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value))
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value)
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function boardPoint(event) {
  const bounds = event.currentTarget.getBoundingClientRect()
  return {
    x: Math.max(0, Math.min(BOARD_SIZE, ((event.clientX - bounds.left) / bounds.width) * BOARD_SIZE)),
    y: Math.max(0, Math.min(BOARD_SIZE, ((event.clientY - bounds.top) / bounds.height) * BOARD_SIZE)),
  }
}

function pathData(points) {
  if (!points?.length) return ''
  return points.reduce((path, point, index) => `${path}${index ? ' L' : 'M'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`, '')
}

function arrowHead(start, end) {
  const angle = Math.atan2(end.y - start.y, end.x - start.x)
  const size = 24
  return [
    { x: end.x - Math.cos(angle - Math.PI / 6) * size, y: end.y - Math.sin(angle - Math.PI / 6) * size },
    end,
    { x: end.x - Math.cos(angle + Math.PI / 6) * size, y: end.y - Math.sin(angle + Math.PI / 6) * size },
  ]
}

function markerAppearance(type, copy) {
  if (type === 'defender') return { fill: '#19d3da', text: copy.defenderShort }
  if (type === 'spike') return { fill: '#f7d154', text: copy.spikeShort }
  if (type === 'danger') return { fill: '#ff5b55', text: '!' }
  return { fill: '#ff7b72', text: copy.attackerShort }
}

function drawMarker(context, marker, scaleX, scaleY, copy) {
  const appearance = markerAppearance(marker.markerType, copy)
  const x = marker.x * scaleX
  const y = marker.y * scaleY
  const radius = Math.max(16, Math.min(scaleX, scaleY) * 22)
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fillStyle = appearance.fill
  context.fill()
  context.lineWidth = Math.max(3, radius * 0.12)
  context.strokeStyle = '#081117'
  context.stroke()
  context.fillStyle = '#081117'
  context.font = `800 ${Math.round(radius * 0.82)}px Arial, sans-serif`
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(marker.label || appearance.text, x, y + 1)
}

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function drawCircularAsset(context, element, image, scaleX, scaleY, isAgent = false) {
  const x = element.x * scaleX
  const y = element.y * scaleY
  const radius = Math.max(isAgent ? 27 : 21, Math.min(scaleX, scaleY) * (isAgent ? 29 : 23))
  const ring = TEAM_COLORS[element.side] || TEAM_COLORS.attacker

  context.save()
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fillStyle = '#081117'
  context.fill()
  context.lineWidth = Math.max(4, radius * .14)
  context.strokeStyle = ring
  context.stroke()
  context.beginPath()
  context.arc(x, y, radius - 4, 0, Math.PI * 2)
  context.clip()
  context.drawImage(image, x - radius + 4, y - radius + 4, (radius - 4) * 2, (radius - 4) * 2)
  context.restore()
}

function resolvedAbilityGeometry(element) {
  // The catalog is authoritative so saved boards also receive corrected game
  // geometry when an ability is reclassified.
  return ABILITY_INDEX.get(element.abilityId)?.ability.geometry || element.geometry || { shape: 'point' }
}

function drawAbilityRange(context, element, scaleX, scaleY) {
  const geometry = resolvedAbilityGeometry(element)
  if (geometry.shape === 'point') return
  const scale = Math.min(scaleX, scaleY)
  const ring = TEAM_COLORS[element.side] || TEAM_COLORS.attacker
  const x = element.x * scaleX
  const y = element.y * scaleY
  const rotation = ((element.rotation || 0) * Math.PI) / 180
  const length = (geometry.length || geometry.size || 100) * scale
  const width = (geometry.width || Math.max(18, (geometry.size || 80) * .42)) * scale
  const radius = ((geometry.size || 100) * scale) / 2

  context.save()
  context.translate(x, y)
  context.rotate(rotation)
  context.strokeStyle = ring
  context.fillStyle = ring
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.lineWidth = Math.max(3, 4 * scale)

  if (geometry.shape === 'radius') {
    context.globalAlpha = .16
    context.beginPath()
    context.arc(0, 0, radius, 0, Math.PI * 2)
    context.fill()
    context.globalAlpha = .9
    context.stroke()
  } else if (['wall', 'corridor', 'rectangle'].includes(geometry.shape)) {
    context.globalAlpha = geometry.shape === 'wall' ? .36 : .18
    context.fillRect(-length / 2, -width / 2, length, width)
    context.globalAlpha = .92
    context.strokeRect(-length / 2, -width / 2, length, width)
    if (geometry.shape === 'corridor') {
      context.setLineDash([12 * scale, 9 * scale])
      context.beginPath()
      context.moveTo(-length / 2, 0)
      context.lineTo(length / 2, 0)
      context.stroke()
    }
  } else if (geometry.shape === 'tripwire') {
    context.lineWidth = Math.max(4, 5 * scale)
    context.beginPath()
    context.moveTo(-length / 2, 0)
    context.lineTo(length / 2, 0)
    context.stroke()
    for (const endpoint of [-length / 2, length / 2]) {
      context.globalAlpha = .92
      context.fillRect(endpoint - 7 * scale, -14 * scale, 14 * scale, 28 * scale)
      context.strokeStyle = '#081117'
      context.lineWidth = Math.max(2, 3 * scale)
      context.strokeRect(endpoint - 7 * scale, -14 * scale, 14 * scale, 28 * scale)
      context.strokeStyle = ring
    }
  } else if (geometry.shape === 'mesh') {
    context.globalAlpha = .34
    context.lineWidth = Math.max(10, 14 * scale)
    for (const angle of [45, 135, 225, 315]) {
      const radians = (angle * Math.PI) / 180
      context.beginPath()
      context.moveTo(0, 0)
      context.lineTo(Math.cos(radians) * radius, Math.sin(radians) * radius)
      context.stroke()
      context.beginPath()
      context.arc(Math.cos(radians) * radius, Math.sin(radians) * radius, 7 * scale, 0, Math.PI * 2)
      context.fill()
    }
  } else if (geometry.shape === 'net') {
    context.globalAlpha = .2
    context.beginPath()
    context.moveTo(0, -radius)
    context.lineTo(radius, 0)
    context.lineTo(0, radius)
    context.lineTo(-radius, 0)
    context.closePath()
    context.fill()
    context.globalAlpha = .9
    context.stroke()
    context.beginPath()
    context.moveTo(-radius / 2, -radius / 2)
    context.lineTo(radius / 2, radius / 2)
    context.moveTo(radius / 2, -radius / 2)
    context.lineTo(-radius / 2, radius / 2)
    context.stroke()
  } else if (geometry.shape === 'cone') {
    const halfAngle = Math.PI / 5
    context.globalAlpha = .18
    context.beginPath()
    context.moveTo(0, 0)
    context.arc(0, 0, radius, -halfAngle, halfAngle)
    context.closePath()
    context.fill()
    context.globalAlpha = .9
    context.stroke()
  }
  context.restore()
}

function drawAbilityToken(context, element, image, scaleX, scaleY) {
  drawAbilityRange(context, element, scaleX, scaleY)
  drawCircularAsset(context, element, image, scaleX, scaleY, false)
}

function conePath(size) {
  const radius = size / 2
  const halfAngle = Math.PI / 5
  const start = { x: Math.cos(-halfAngle) * radius, y: Math.sin(-halfAngle) * radius }
  const end = { x: Math.cos(halfAngle) * radius, y: Math.sin(halfAngle) * radius }
  return `M0 0 L${start.x} ${start.y} A${radius} ${radius} 0 0 1 ${end.x} ${end.y} Z`
}

function AbilityRange({ geometry, ring }) {
  const shape = geometry.shape || 'point'
  if (shape === 'point') return null
  if (shape === 'radius') return <circle className="tactical-ability-range" r={(geometry.size || 100) / 2} fill={ring} stroke={ring} />
  if (shape === 'tripwire') {
    const half = (geometry.length || 170) / 2
    return <g className="tactical-ability-range tactical-ability-tripwire"><line x1={-half} y1="0" x2={half} y2="0" stroke={ring} /><rect x={-half - 7} y="-14" width="14" height="28" fill={ring} /><rect x={half - 7} y="-14" width="14" height="28" fill={ring} /></g>
  }
  if (shape === 'mesh') {
    const radius = (geometry.size || 155) / 2
    return <g className="tactical-ability-range tactical-ability-mesh">{[45, 135, 225, 315].map((angle) => { const rad = angle * Math.PI / 180; const x = Math.cos(rad) * radius; const y = Math.sin(rad) * radius; return <g key={angle}><line x1="0" y1="0" x2={x} y2={y} stroke={ring} /><circle cx={x} cy={y} r="7" fill={ring} /></g> })}</g>
  }
  if (shape === 'net') {
    const radius = (geometry.size || 115) / 2
    return <g className="tactical-ability-range tactical-ability-net"><path d={`M0 ${-radius} L${radius} 0 L0 ${radius} L${-radius} 0 Z`} fill={ring} stroke={ring} /><path d={`M${-radius / 2} ${-radius / 2} L${radius / 2} ${radius / 2} M${radius / 2} ${-radius / 2} L${-radius / 2} ${radius / 2}`} stroke={ring} /></g>
  }
  if (shape === 'cone') return <path className="tactical-ability-range tactical-ability-cone" d={conePath(geometry.size || 150)} fill={ring} stroke={ring} />
  const length = geometry.length || 150
  const width = geometry.width || 28
  return <g className={`tactical-ability-range tactical-ability-${shape}`}><rect x={-length / 2} y={-width / 2} width={length} height={width} rx={shape === 'wall' ? width / 2 : 7} fill={ring} stroke={ring} />{shape === 'corridor' && <line x1={-length / 2} y1="0" x2={length / 2} y2="0" stroke={ring} strokeDasharray="12 9" />}</g>
}

function AbilityMarker({ element, selected, onPointerDown }) {
  const radius = 24
  const ring = TEAM_COLORS[element.side] || TEAM_COLORS.attacker
  const clipId = `token-${element.id}`
  const geometry = resolvedAbilityGeometry(element)
  return (
    <g className={`tactical-marker tactical-ability-token tactical-ability-shape-${geometry.shape}${selected ? ' is-selected' : ''}`} transform={`translate(${element.x} ${element.y})`} onPointerDown={onPointerDown}>
      <g transform={`rotate(${element.rotation || 0})`}><AbilityRange geometry={geometry} ring={ring} /></g>
      <defs><clipPath id={clipId}><circle r={radius - 4} /></clipPath></defs>
      <circle r={radius} fill="#081117" stroke={ring} strokeWidth="6" />
      <image href={element.asset} x={-radius + 4} y={-radius + 4} width={(radius - 4) * 2} height={(radius - 4) * 2} clipPath={`url(#${clipId})`} preserveAspectRatio="xMidYMid slice" />
      <title>{element.name}</title>
    </g>
  )
}

function ToolbarButton({ active = false, icon, label, onClick, disabled = false }) {
  return (
    <button className={active ? 'is-active' : ''} type="button" onClick={onClick} disabled={disabled} aria-pressed={active}>
      <Icon name={icon} size={17} />
      <span>{label}</span>
    </button>
  )
}

export default function ValorantPlaybookPage({ locale }) {
  const seo = playbookSeoCopy(locale)
  const copy = playbookUiCopy(locale)
  const [boardState, setBoardState] = useState(() => readBoard())
  const [tool, setTool] = useState('pen')
  const [color, setColor] = useState(DRAW_COLORS[0])
  const [side, setSide] = useState('attacker')
  const [roleFilter, setRoleFilter] = useState('all')
  const [selectedAgentId, setSelectedAgentId] = useState('jett')
  const [selectedAbilityId, setSelectedAbilityId] = useState(null)
  const [selectedElementId, setSelectedElementId] = useState(null)
  const [draft, setDraft] = useState(null)
  const [status, setStatus] = useState('ready')
  const [placementIssue, setPlacementIssue] = useState(null)
  const [history, setHistory] = useState(() => [boardState])
  const [historyIndex, setHistoryIndex] = useState(0)
  const boardStateRef = useRef(boardState)
  const dragRef = useRef(null)
  const dragStartRef = useRef(null)
  const mapImageRef = useRef(null)
  const currentMap = useMemo(() => valorantMaps.find((map) => map.id === boardState.mapId) || valorantMaps[1], [boardState.mapId])
  const selectedAgent = useMemo(() => playbookAgents.find((agent) => agent.id === selectedAgentId) || playbookAgents[0], [selectedAgentId])
  const selectedAbility = selectedAgent.abilities.find((ability) => ability.id === selectedAbilityId) || null
  const selectedAgentLabel = playbookAgentName(selectedAgent, locale)
  const selectedAbilityLabel = selectedAbility ? playbookAbilityName(selectedAbility, locale) : null
  const currentMapLabel = playbookMapName(currentMap, locale)
  const visibleAgents = roleFilter === 'all' ? playbookAgents : playbookAgents.filter((agent) => agent.role === roleFilter)
  const elements = boardState.boards[boardState.mapId] || []
  const selectedBoardElement = elements.find((element) => element.id === selectedElementId) || null
  const canRotateSelected = selectedBoardElement?.type === 'ability' && ROTATABLE_ABILITY_SHAPES.has(resolvedAbilityGeometry(selectedBoardElement).shape)

  useEffect(() => {
    boardStateRef.current = boardState
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(boardState)) } catch { /* The board still works without storage. */ }
  }, [boardState])

  const commit = (nextState) => {
    boardStateRef.current = nextState
    setBoardState(nextState)
    const nextHistory = [...history.slice(0, historyIndex + 1), nextState].slice(-50)
    setHistory(nextHistory)
    setHistoryIndex(nextHistory.length - 1)
  }

  const replaceElements = (nextElements) => commit({
    ...boardState,
    boards: { ...boardState.boards, [boardState.mapId]: nextElements },
  })

  const changeMap = (mapId) => {
    setSelectedElementId(null)
    commit({ ...boardState, mapId })
  }

  const undo = () => {
    if (historyIndex <= 0) return
    const nextIndex = historyIndex - 1
    setHistoryIndex(nextIndex)
    setBoardState(history[nextIndex])
  }

  const redo = () => {
    if (historyIndex >= history.length - 1) return
    const nextIndex = historyIndex + 1
    setHistoryIndex(nextIndex)
    setBoardState(history[nextIndex])
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        if (event.shiftKey) redo()
        else undo()
      }
      if (event.key === 'Escape') setDraft(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const handlePointerDown = (event) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture?.(event.pointerId)
    const point = boardPoint(event)

    if (tool === 'pen') setDraft({ id: createId(), type: 'path', color, points: [point] })
    if (tool === 'arrow') setDraft({ id: createId(), type: 'arrow', color, points: [point, point] })
    if (tool === 'agent') {
      const issue = playbookAgentPlacementIssue(elements, selectedAgent.id, side)
      if (issue) {
        const existing = elements.find((element) => element.type === 'agent' && element.agentId === selectedAgent.id && element.side === side)
        setSelectedElementId(existing?.id || null)
        setPlacementIssue(issue)
        window.setTimeout(() => setPlacementIssue(null), 2200)
        return
      }
      const id = createId()
      replaceElements([...elements, {
        id, type: 'agent', agentId: selectedAgent.id, name: selectedAgentLabel,
        asset: selectedAgent.asset, side, x: point.x, y: point.y,
      }])
      setSelectedElementId(id)
      setPlacementIssue(null)
    }
    if (tool === 'ability' && selectedAbility) {
      const id = createId()
      replaceElements([...elements, {
        id, type: 'ability', abilityId: selectedAbility.id, agentId: selectedAgent.id, name: selectedAbilityLabel,
        asset: selectedAbility.asset, geometry: selectedAbility.geometry, rotation: 0, side, x: point.x, y: point.y,
      }])
      setSelectedElementId(id)
    }
    if (MARKER_TOOLS.has(tool)) {
      const matchingMarkers = elements.filter((element) => element.type === 'marker' && element.markerType === tool)
      const baseLabel = markerAppearance(tool, copy).text
      replaceElements([...elements, {
        id: createId(), type: 'marker', markerType: tool, x: point.x, y: point.y,
        label: tool === 'attacker' || tool === 'defender' ? `${baseLabel}${matchingMarkers.length + 1}` : baseLabel,
      }])
    }
  }

  const handlePointerMove = (event) => {
    const point = boardPoint(event)
    if (draft?.type === 'path') {
      const last = draft.points[draft.points.length - 1]
      if (Math.hypot(point.x - last.x, point.y - last.y) > 5) setDraft((current) => ({ ...current, points: [...current.points, point] }))
    } else if (draft?.type === 'arrow') {
      setDraft((current) => ({ ...current, points: [current.points[0], point] }))
    } else if (dragRef.current) {
      setBoardState((current) => {
        const nextState = {
          ...current,
          boards: {
            ...current.boards,
            [current.mapId]: (current.boards[current.mapId] || []).map((element) => element.id === dragRef.current ? { ...element, ...point } : element),
          },
        }
        boardStateRef.current = nextState
        return nextState
      })
    }
  }

  const handlePointerUp = () => {
    if (draft) {
      const longEnough = draft.type === 'path' ? draft.points.length > 1 : Math.hypot(draft.points[1].x - draft.points[0].x, draft.points[1].y - draft.points[0].y) > 12
      if (longEnough) replaceElements([...elements, draft])
      setDraft(null)
    }
    if (dragRef.current) {
      const previous = dragStartRef.current
      const nextState = boardStateRef.current
      const moved = nextState.boards[nextState.mapId] || []
      dragRef.current = null
      dragStartRef.current = null
      if (previous && JSON.stringify(previous) !== JSON.stringify(moved)) commit(nextState)
    }
  }

  const removeElement = (event, id) => {
    event.stopPropagation()
    if (tool === 'eraser') replaceElements(elements.filter((element) => element.id !== id))
  }

  const startMarkerDrag = (event, id) => {
    event.stopPropagation()
    if (tool === 'eraser') {
      if (selectedElementId === id) setSelectedElementId(null)
      return replaceElements(elements.filter((element) => element.id !== id))
    }
    // Selecting is independent from the active tool. This makes directional
    // utility easy to rotate immediately after clicking it on the board.
    setSelectedElementId(id)
    if (tool === 'select') {
      event.currentTarget.setPointerCapture?.(event.pointerId)
      dragRef.current = id
      dragStartRef.current = elements
    }
  }

  const rotateSelectedAbility = () => {
    if (!canRotateSelected) return
    replaceElements(elements.map((element) => element.id === selectedElementId
      ? { ...element, rotation: ((element.rotation || 0) + 15) % 360 }
      : element))
  }

  const shareBoard = async () => {
    const url = new URL(window.location.href)
    url.hash = `board=${encodeBoard(boardState)}`
    await copyText(url.toString())
    setStatus('shared')
    window.setTimeout(() => setStatus('ready'), 1800)
  }

  const exportBoard = async () => {
    const image = mapImageRef.current
    if (!image?.naturalWidth) return
    const width = 1600
    const height = Math.round(width * (image.naturalHeight / image.naturalWidth))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    context.fillStyle = '#071116'
    context.fillRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)
    const scaleX = width / BOARD_SIZE
    const scaleY = height / BOARD_SIZE
    const assetSources = [...new Set(elements.filter((element) => ['agent', 'ability'].includes(element.type) && element.asset).map((element) => element.asset))]
    const loadedAssets = new Map((await Promise.all(assetSources.map(async (src) => [src, await loadCanvasImage(src)]))).map((entry) => entry))

    for (const element of elements) {
      if (element.type === 'marker') {
        drawMarker(context, element, scaleX, scaleY, copy)
        continue
      }
      if (element.type === 'agent' || element.type === 'ability') {
        const assetImage = loadedAssets.get(element.asset)
        if (assetImage) {
          if (element.type === 'ability') drawAbilityToken(context, element, assetImage, scaleX, scaleY)
          else drawCircularAsset(context, element, assetImage, scaleX, scaleY, true)
        }
        continue
      }
      const points = element.points || []
      if (points.length < 2) continue
      context.beginPath()
      context.moveTo(points[0].x * scaleX, points[0].y * scaleY)
      points.slice(1).forEach((point) => context.lineTo(point.x * scaleX, point.y * scaleY))
      context.strokeStyle = element.color
      context.lineWidth = 7
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.stroke()
      if (element.type === 'arrow') {
        const head = arrowHead(points[0], points[1])
        context.beginPath()
        context.moveTo(head[0].x * scaleX, head[0].y * scaleY)
        context.lineTo(head[1].x * scaleX, head[1].y * scaleY)
        context.lineTo(head[2].x * scaleX, head[2].y * scaleY)
        context.stroke()
      }
    }
    const link = document.createElement('a')
    link.download = `aimcodes-${boardState.mapId}-playbook.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    setStatus('exported')
    window.setTimeout(() => setStatus('ready'), 1800)
  }

  const visibleElements = draft ? [...elements, draft] : elements
  const chooseAgent = (agent) => {
    setSelectedAgentId(agent.id)
    setSelectedAbilityId(null)
    setTool('agent')
  }
  const chooseAbility = (ability) => {
    setSelectedAbilityId(ability.id)
    setTool('ability')
  }

  return (
    <article className="crosshair-tool-page playbook-page">
      <SeoBreadcrumbs locale={locale} section="tools" current={seo.title} />
      <header className="playbook-hero">
        <span>{seo.eyebrow}</span>
        <h1>{seo.title}</h1>
        <p>{seo.intro}</p>
      </header>

      <section className="tactical-board-shell" aria-labelledby="tactical-board-title">
        <div className="tactical-board-topbar">
          <div><span>{copy.boardEyebrow}</span><h2 id="tactical-board-title">{copy.boardTitle}</h2></div>
          <label className="tactical-map-select">
            <span>{copy.map}</span>
            <select value={boardState.mapId} onChange={(event) => changeMap(event.target.value)}>
              {valorantMaps.map((map) => <option key={map.id} value={map.id}>{playbookMapName(map, locale)}</option>)}
            </select>
          </label>
        </div>

        <div className="tactical-toolbar" aria-label={copy.toolbar}>
          <div className="tactical-tool-group">
            <ToolbarButton active={tool === 'select'} icon="target" label={copy.select} onClick={() => setTool('select')} />
            <ToolbarButton active={tool === 'pen'} icon="sliders" label={copy.pen} onClick={() => setTool('pen')} />
            <ToolbarButton active={tool === 'arrow'} icon="send" label={copy.arrow} onClick={() => setTool('arrow')} />
            <ToolbarButton active={tool === 'spike'} icon="target" label={copy.spike} onClick={() => setTool('spike')} />
            <ToolbarButton active={tool === 'danger'} icon="info" label={copy.danger} onClick={() => setTool('danger')} />
            <ToolbarButton active={tool === 'eraser'} icon="trash" label={copy.eraser} onClick={() => setTool('eraser')} />
          </div>
          <div className="tactical-color-group" aria-label={copy.color}>
            {DRAW_COLORS.map((item) => <button key={item} type="button" className={color === item ? 'is-active' : ''} style={{ '--marker-color': item }} aria-label={`${copy.color} ${item}`} onClick={() => setColor(item)} />)}
          </div>
          <div className="tactical-history-group">
            <button className="tactical-rotate-button" type="button" title={copy.rotateAbility} aria-label={copy.rotateAbility} onClick={rotateSelectedAbility} disabled={!canRotateSelected}><Icon name="rotate" size={17} /><span>{copy.rotateAbility}</span></button>
            <button type="button" onClick={undo} disabled={historyIndex <= 0}><Icon name="rotate" size={17} /><span>{copy.undo}</span></button>
            <button type="button" onClick={redo} disabled={historyIndex >= history.length - 1}><Icon name="rotate" size={17} className="is-flipped" /><span>{copy.redo}</span></button>
          </div>
        </div>

        <div className="tactical-board-layout">
          <aside className="tactical-agent-dock" aria-label={copy.agentDock}>
            <div className="tactical-agent-dock-heading">
              <span>{copy.agentDock}</span>
              <strong>{copy.chooseAgent}</strong>
            </div>

            <div className="tactical-side-switch" aria-label={copy.chooseSide}>
              <button type="button" className={side === 'attacker' ? 'is-active is-attacker' : ''} onClick={() => setSide('attacker')}>{copy.attacker}</button>
              <button type="button" className={side === 'defender' ? 'is-active is-defender' : ''} onClick={() => setSide('defender')}>{copy.defender}</button>
            </div>

            <div className="tactical-role-filter" aria-label={copy.filterRole}>
              <button type="button" className={roleFilter === 'all' ? 'is-active' : ''} onClick={() => setRoleFilter('all')}>{copy.allRoles}</button>
              {playbookAgentRoles.map((role) => (
                <button key={role} type="button" className={roleFilter === role ? 'is-active' : ''} onClick={() => setRoleFilter(role)}>{copy.roles[role]}</button>
              ))}
            </div>

            <div className="tactical-agent-grid">
              {visibleAgents.map((agent) => (
                <button key={agent.id} type="button" className={selectedAgent.id === agent.id ? 'is-active' : ''} title={`${playbookAgentName(agent, locale)} · ${copy.roles[agent.role]}`} aria-label={`${copy.placeAgent}: ${playbookAgentName(agent, locale)}`} onClick={() => chooseAgent(agent)}>
                  <img src={agent.asset} alt="" loading="lazy" />
                  <span>{playbookAgentName(agent, locale)}</span>
                </button>
              ))}
            </div>

            <div className="tactical-ability-tray">
              <div><img src={selectedAgent.asset} alt="" /><span><strong>{selectedAgentLabel}</strong><small>{copy.abilities}</small></span></div>
              <div className="tactical-ability-grid">
                {selectedAgent.abilities.map((ability) => (
                  <button key={ability.id} type="button" className={selectedAbility?.id === ability.id && tool === 'ability' ? 'is-active' : ''} title={playbookAbilityName(ability, locale)} aria-label={`${copy.placeAbility}: ${playbookAbilityName(ability, locale)}`} onClick={() => chooseAbility(ability)}>
                    <img src={ability.asset} alt="" loading="lazy" /><span>{ability.slot}</span>
                  </button>
                ))}
              </div>
              <p className={placementIssue ? 'is-warning' : ''}>
                {placementIssue === 'duplicate' && copy.duplicateAgent}
                {placementIssue === 'full' && copy.fullTeam}
                {!placementIssue && (tool === 'ability' && selectedAbility ? `${selectedAbilityLabel} · ${copy.tapMap}` : `${selectedAgentLabel} · ${copy.tapMapAgent}`)}
              </p>
            </div>
          </aside>

          <div className="tactical-map-stage">
            <div className={`tactical-map-canvas tool-${tool}`} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
              <img ref={mapImageRef} src={currentMap.asset} alt={`${currentMapLabel} ${copy.mapAlt}`} draggable="false" />
              <svg viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`} preserveAspectRatio="none" aria-label={copy.canvasLabel} role="img">
                {visibleElements.map((element) => {
                  if (element.type === 'ability') {
                    const indexed = ABILITY_INDEX.get(element.abilityId)
                    const title = indexed ? playbookAbilityName(indexed.ability, locale) : element.name
                    return <AbilityMarker key={element.id} element={{ ...element, name: title }} selected={element.id === selectedElementId} onPointerDown={(event) => startMarkerDrag(event, element.id)} />
                  }
                  if (element.type === 'agent') {
                    const radius = 31
                    const ring = TEAM_COLORS[element.side] || TEAM_COLORS.attacker
                    const clipId = `token-${element.id}`
                    const indexedAgent = playbookAgents.find((agent) => agent.id === element.agentId)
                    const title = indexedAgent ? playbookAgentName(indexedAgent, locale) : element.name
                    return (
                      <g key={element.id} className={`tactical-marker tactical-agent-token${element.id === selectedElementId ? ' is-selected' : ''}`} transform={`translate(${element.x} ${element.y})`} onPointerDown={(event) => startMarkerDrag(event, element.id)}>
                        <defs><clipPath id={clipId}><circle r={radius - 4} /></clipPath></defs>
                        <circle r={radius} fill="#081117" stroke={ring} strokeWidth="6" />
                        <image href={element.asset} x={-radius + 4} y={-radius + 4} width={(radius - 4) * 2} height={(radius - 4) * 2} clipPath={`url(#${clipId})`} preserveAspectRatio="xMidYMid slice" />
                        <title>{title}</title>
                      </g>
                    )
                  }
                  if (element.type === 'marker') {
                    const appearance = markerAppearance(element.markerType, copy)
                    return (
                      <g key={element.id} className="tactical-marker" transform={`translate(${element.x} ${element.y})`} onPointerDown={(event) => startMarkerDrag(event, element.id)}>
                        <circle r="24" fill={appearance.fill} /><circle r="24" fill="none" stroke="#081117" strokeWidth="5" />
                        <text textAnchor="middle" dominantBaseline="central">{element.label || appearance.text}</text>
                      </g>
                    )
                  }
                  if (element.type === 'arrow') {
                    const head = arrowHead(element.points[0], element.points[1])
                    return <g key={element.id} className="tactical-stroke" onPointerDown={(event) => removeElement(event, element.id)}><path d={pathData(element.points)} stroke={element.color} /><path d={pathData(head)} stroke={element.color} /></g>
                  }
                  return <path key={element.id} className="tactical-stroke" d={pathData(element.points)} stroke={element.color} onPointerDown={(event) => removeElement(event, element.id)} />
                })}
              </svg>
              {!elements.length && !draft && <div className="tactical-empty-hint"><Icon name="send" size={18} /><span>{copy.emptyHint}</span></div>}
            </div>
          </div>

          <aside className="tactical-board-sidebar">
            <div className="tactical-quick-start"><span>01</span><h3>{copy.quickStart}</h3><ol>{copy.quickSteps.map((step) => <li key={step}>{step}</li>)}</ol></div>
            <details className="tactical-notes">
              <summary>{copy.notes}</summary>
              <textarea value={boardState.notes} rows="6" placeholder={copy.notesPlaceholder} onChange={(event) => setBoardState((current) => ({ ...current, notes: event.target.value }))} />
            </details>
            <div className="tactical-board-actions">
              <button className="primary-button" type="button" onClick={exportBoard}><Icon name="monitor" size={17} />{status === 'exported' ? copy.exported : copy.export}</button>
              <button type="button" onClick={shareBoard}><Icon name="copy" size={17} />{status === 'shared' ? copy.linkCopied : copy.share}</button>
              <button className="danger-button" type="button" disabled={!elements.length} onClick={() => { setSelectedElementId(null); replaceElements([]) }}><Icon name="trash" size={17} />{copy.clear}</button>
            </div>
            <p className="tactical-local-note"><Icon name="shield" size={15} />{copy.localNote}</p>
          </aside>
        </div>
      </section>

      <section className="tool-learning-content" aria-labelledby="playbook-guide-title">
        <div className="tool-learning-intro"><h2 id="playbook-guide-title">{seo.guideTitle}</h2><p>{seo.guideIntro}</p></div>
        <div className="tool-learning-grid">{seo.tips.map((tip, index) => <article key={tip.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{tip.title}</h3><p>{tip.body}</p></article>)}</div>
        <div className="tool-learning-faq"><h2>FAQ</h2>{seo.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
    </article>
  )
}
