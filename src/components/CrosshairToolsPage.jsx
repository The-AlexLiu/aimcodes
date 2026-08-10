import { useMemo, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'
import { crosshairColorPresets, previewBackgroundOptions } from '../data/previewOptions.js'
import { seoToolCopy } from '../seo/toolContent.js'
import { generateCrosshairCode, parseCrosshairCode } from '../utils/crosshairCode.js'

const uiCopy = {
  en: {
    map: 'Map scene', code: 'Crosshair code', paste: 'Paste a profile code', validate: 'Validate and preview', valid: 'Valid profile code', invalid: 'This code is incomplete or invalid.', copy: 'Copy code', left: 'Crosshair A', right: 'Crosshair B', settings: 'Settings', color: 'Color', outline: 'Outline', centerDot: 'Center dot', inner: 'Inner lines', outer: 'Outer lines', opacity: 'Opacity', length: 'Length', thickness: 'Thickness', offset: 'Offset', size: 'Size', movement: 'Movement error', firing: 'Firing error', preview: 'Live preview', decoded: 'Decoded settings', on: 'On', off: 'Off', open: 'Open details', generatorNote: 'The generated profile is parsed again before the copy button is enabled.', comparisonNote: 'Both sides use the same map and normal scale, so the shape—not the background—decides the comparison.', codeHelp: 'Paste the complete code from its first character to its last separator.', finder: 'Want a recommendation instead?', finderAction: 'Take the crosshair finder test',
  },
  es: {
    map: 'Mapa', code: 'Código de mira', paste: 'Pega un código de perfil', validate: 'Validar y previsualizar', valid: 'Código de perfil válido', invalid: 'El código está incompleto o no es válido.', copy: 'Copiar código', left: 'Mira A', right: 'Mira B', settings: 'Ajustes', color: 'Color', outline: 'Contorno', centerDot: 'Punto central', inner: 'Líneas interiores', outer: 'Líneas exteriores', opacity: 'Opacidad', length: 'Longitud', thickness: 'Grosor', offset: 'Separación', size: 'Tamaño', movement: 'Error de movimiento', firing: 'Error de disparo', preview: 'Vista previa', decoded: 'Ajustes decodificados', on: 'Sí', off: 'No', open: 'Ver detalles', generatorNote: 'AimCodes vuelve a analizar el perfil antes de habilitar la copia.', comparisonNote: 'Las dos miras usan el mismo mapa y escala para comparar solo la forma.', codeHelp: 'Pega el código completo, desde el primer carácter hasta el último.', finder: '¿Prefieres una recomendación?', finderAction: 'Probar el buscador de miras',
  },
  'pt-BR': {
    map: 'Mapa', code: 'Código da mira', paste: 'Cole um código de perfil', validate: 'Validar e visualizar', valid: 'Código de perfil válido', invalid: 'O código está incompleto ou inválido.', copy: 'Copiar código', left: 'Mira A', right: 'Mira B', settings: 'Ajustes', color: 'Cor', outline: 'Contorno', centerDot: 'Ponto central', inner: 'Linhas internas', outer: 'Linhas externas', opacity: 'Opacidade', length: 'Comprimento', thickness: 'Espessura', offset: 'Espaçamento', size: 'Tamanho', movement: 'Erro de movimento', firing: 'Erro de disparo', preview: 'Prévia ao vivo', decoded: 'Ajustes decodificados', on: 'Ligado', off: 'Desligado', open: 'Ver detalhes', generatorNote: 'O perfil gerado é analisado novamente antes de liberar a cópia.', comparisonNote: 'Os dois lados usam o mesmo mapa e escala para comparar apenas o formato.', codeHelp: 'Cole o código completo, do primeiro ao último caractere.', finder: 'Quer uma recomendação?', finderAction: 'Fazer o teste de mira',
  },
  'zh-CN': {
    map: '地图场景', code: '准星代码', paste: '粘贴完整准星配置代码', validate: '检查并预览', valid: '代码有效，可以预览', invalid: '代码不完整或无法解析，请重新复制完整内容。', copy: '复制代码', left: '准星 A', right: '准星 B', settings: '准星参数', color: '颜色', outline: '轮廓', centerDot: '中心点', inner: '内线', outer: '外线', opacity: '透明度', length: '长度', thickness: '粗细', offset: '中心偏移', size: '大小', movement: '移动误差', firing: '射击误差', preview: '实时预览', decoded: '解析结果', on: '开启', off: '关闭', open: '查看详情', generatorNote: '复制按钮启用前，AimCodes 会重新解析一次生成的代码。', comparisonNote: '两侧使用同一地图和正常比例，比较结果不会被背景差异干扰。', codeHelp: '请从第一个字符到最后一个字符完整粘贴，不要加入空格或换行。', finder: '不知道怎么选？', finderAction: '去做准星推荐测试',
  },
}

function asToolItem(code, parsed, name = 'AimCodes generated') {
  return {
    id: `tool-${code.slice(-16)}`,
    shortName: name,
    name,
    description: '',
    category: 'custom',
    color: parsed.color,
    colorKey: parsed.colorKey,
    code,
  }
}

function Preview({ item, background, label }) {
  const map = previewBackgroundOptions.find((option) => option.value === background) || previewBackgroundOptions[0]
  return (
    <div className="tool-preview-frame">
      <img src={map.image} width="914" height="514" alt={map.label} />
      {item ? <CrosshairCanvas crosshair={item} scale={1.25} label={label} /> : <div className="tool-preview-empty" aria-label={label}>?</div>}
      <span>{map.label.toUpperCase()}</span>
    </div>
  )
}

function MapPicker({ copy, value, onChange }) {
  return (
    <label className="tool-field">
      <span>{copy.map}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {previewBackgroundOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}

function NumberControl({ label, value, min, max, step = 1, onChange }) {
  return (
    <label className="tool-number-control">
      <span>{label}<b>{value}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}

function Toggle({ label, checked, onChange }) {
  return <label className="tool-toggle"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span>{label}</span></label>
}

function Generator({ copy, onCopy }) {
  const [background, setBackground] = useState('ascent')
  const [settings, setSettings] = useState({
    colorPreset: '5', outline: true, outlineOpacity: 1, outlineThickness: 1,
    dot: false, dotOpacity: 1, dotSize: 2, inner: true, innerOpacity: 1,
    innerLength: 4, innerThickness: 2, innerOffset: 2, outer: false,
    outerOpacity: 1, outerLength: 2, outerThickness: 2, outerOffset: 10,
    movementError: false, firingError: false,
  })
  const update = (key, value) => setSettings((current) => ({ ...current, [key]: value }))
  const code = useMemo(() => generateCrosshairCode({
    colorPreset: settings.colorPreset,
    outline: { enabled: settings.outline, opacity: settings.outlineOpacity, thickness: settings.outlineThickness },
    dot: { enabled: settings.dot, opacity: settings.dotOpacity, size: settings.dotSize },
    inner: { enabled: settings.inner, opacity: settings.innerOpacity, length: settings.innerLength, thickness: settings.innerThickness, offset: settings.innerOffset },
    outer: { enabled: settings.outer, opacity: settings.outerOpacity, length: settings.outerLength, thickness: settings.outerThickness, offset: settings.outerOffset },
    movementError: settings.movementError, firingError: settings.firingError,
  }), [settings])
  const parsed = useMemo(() => parseCrosshairCode(code), [code])
  const item = useMemo(() => asToolItem(code, parsed, copy.preview), [code, copy.preview, parsed])

  return (
    <div className="tool-workspace">
      <section className="tool-preview-panel"><Preview item={item} background={background} label={copy.preview} /><MapPicker copy={copy} value={background} onChange={setBackground} /><code>{code}</code><button className="primary-button" type="button" onClick={() => onCopy(item, { interactionSource: 'crosshair_generator' })}>{copy.copy}</button><p>{copy.generatorNote}</p></section>
      <section className="tool-controls" aria-label={copy.settings}>
        <h2>{copy.settings}</h2>
        <label className="tool-field"><span>{copy.color}</span><select value={settings.colorPreset} onChange={(event) => update('colorPreset', event.target.value)}>{crosshairColorPresets.map((option) => <option key={option.preset} value={option.preset}>{option.key}</option>)}</select></label>
        <div className="tool-toggle-row"><Toggle label={copy.outline} checked={settings.outline} onChange={(value) => update('outline', value)} /><Toggle label={copy.centerDot} checked={settings.dot} onChange={(value) => update('dot', value)} /><Toggle label={copy.inner} checked={settings.inner} onChange={(value) => update('inner', value)} /><Toggle label={copy.outer} checked={settings.outer} onChange={(value) => update('outer', value)} /></div>
        {settings.outline && <div className="tool-control-group"><h3>{copy.outline}</h3><NumberControl label={copy.opacity} value={settings.outlineOpacity} min={0} max={1} step={0.1} onChange={(value) => update('outlineOpacity', value)} /><NumberControl label={copy.thickness} value={settings.outlineThickness} min={1} max={6} onChange={(value) => update('outlineThickness', value)} /></div>}
        {settings.dot && <div className="tool-control-group"><h3>{copy.centerDot}</h3><NumberControl label={copy.opacity} value={settings.dotOpacity} min={0} max={1} step={0.1} onChange={(value) => update('dotOpacity', value)} /><NumberControl label={copy.size} value={settings.dotSize} min={1} max={6} onChange={(value) => update('dotSize', value)} /></div>}
        {settings.inner && <div className="tool-control-group"><h3>{copy.inner}</h3><NumberControl label={copy.opacity} value={settings.innerOpacity} min={0} max={1} step={0.1} onChange={(value) => update('innerOpacity', value)} /><NumberControl label={copy.length} value={settings.innerLength} min={0} max={20} onChange={(value) => update('innerLength', value)} /><NumberControl label={copy.thickness} value={settings.innerThickness} min={0} max={10} onChange={(value) => update('innerThickness', value)} /><NumberControl label={copy.offset} value={settings.innerOffset} min={0} max={20} onChange={(value) => update('innerOffset', value)} /></div>}
        {settings.outer && <div className="tool-control-group"><h3>{copy.outer}</h3><NumberControl label={copy.opacity} value={settings.outerOpacity} min={0} max={1} step={0.1} onChange={(value) => update('outerOpacity', value)} /><NumberControl label={copy.length} value={settings.outerLength} min={0} max={20} onChange={(value) => update('outerLength', value)} /><NumberControl label={copy.thickness} value={settings.outerThickness} min={0} max={10} onChange={(value) => update('outerThickness', value)} /><NumberControl label={copy.offset} value={settings.outerOffset} min={0} max={20} onChange={(value) => update('outerOffset', value)} /></div>}
        <div className="tool-toggle-row"><Toggle label={copy.movement} checked={settings.movementError} onChange={(value) => update('movementError', value)} /><Toggle label={copy.firing} checked={settings.firingError} onChange={(value) => update('firingError', value)} /></div>
      </section>
    </div>
  )
}

function CodeTool({ copy, mode, crosshairs, onCopy }) {
  const [input, setInput] = useState(crosshairs[0]?.code || '')
  const [background, setBackground] = useState('ascent')
  const parsed = useMemo(() => {
    try { return { value: parseCrosshairCode(input), error: null } } catch { return { value: null, error: copy.invalid } }
  }, [copy.invalid, input])
  const item = parsed.value ? asToolItem(parsed.value.code, parsed.value, copy.preview) : null
  const settings = parsed.value?.settings

  return (
    <div className="tool-workspace is-code-tool">
      <section className="tool-controls">
        <label className="tool-field"><span>{copy.code}</span><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={copy.paste} rows="7" /></label>
        <p>{copy.codeHelp}</p>
        <div className={`tool-validation ${parsed.error ? 'is-error' : 'is-valid'}`}>{parsed.error || copy.valid}</div>
        {mode === 'decoder' && settings && <div className="decoded-grid">
          <span><b>{copy.color}</b>{parsed.value.color}</span><span><b>{copy.outline}</b>{settings.outline.enabled ? copy.on : copy.off}</span><span><b>{copy.centerDot}</b>{settings.dot.enabled ? copy.on : copy.off}</span><span><b>{copy.inner}</b>{settings.inner.enabled ? `${settings.inner.horizontalLength} / ${settings.inner.thickness} / ${settings.inner.offset}` : copy.off}</span><span><b>{copy.outer}</b>{settings.outer.enabled ? `${settings.outer.horizontalLength} / ${settings.outer.thickness} / ${settings.outer.offset}` : copy.off}</span><span><b>{copy.movement}</b>{settings.movementError.enabled ? copy.on : copy.off}</span><span><b>{copy.firing}</b>{settings.firingError.enabled ? copy.on : copy.off}</span>
        </div>}
        <button className="primary-button" disabled={!parsed.value} type="button" onClick={() => parsed.value && onCopy(item, { interactionSource: `crosshair_${mode}` })}>{copy.copy}</button>
      </section>
      <section className="tool-preview-panel"><Preview item={item} background={background} label={copy.preview} /><MapPicker copy={copy} value={background} onChange={setBackground} /></section>
    </div>
  )
}

function Comparison({ copy, crosshairs, onCopy }) {
  const [leftId, setLeftId] = useState(crosshairs[0]?.id)
  const [rightId, setRightId] = useState(crosshairs[1]?.id)
  const [background, setBackground] = useState('ascent')
  const left = crosshairs.find((item) => item.id === leftId) || crosshairs[0]
  const right = crosshairs.find((item) => item.id === rightId) || crosshairs[1] || crosshairs[0]
  return (
    <div className="comparison-tool">
      <MapPicker copy={copy} value={background} onChange={setBackground} />
      <p>{copy.comparisonNote}</p>
      <div className="comparison-grid">
        {[[copy.left, left, setLeftId], [copy.right, right, setRightId]].map(([label, item, setter]) => <section key={label}>
          <label className="tool-field"><span>{label}</span><select value={item.id} onChange={(event) => setter(event.target.value)}>{crosshairs.map((crosshair) => <option key={crosshair.id} value={crosshair.id}>{crosshair.shortName}</option>)}</select></label>
          <Preview item={item} background={background} label={`${label}: ${item.name}`} />
          <div className="comparison-actions"><strong>{item.name}</strong><button type="button" className="primary-button" onClick={() => onCopy(item, { interactionSource: 'crosshair_comparison' })}>{copy.copy}</button></div>
        </section>)}
      </div>
    </div>
  )
}

export default function CrosshairToolsPage({ locale, toolKey, crosshairs, onCopy }) {
  const content = seoToolCopy(locale, toolKey)
  const copy = uiCopy[locale] || uiCopy.en
  return (
    <article className="crosshair-tool-page">
      <SeoBreadcrumbs locale={locale} section="tools" current={content.title} />
      <header><span>{content.eyebrow}</span><h1>{content.title}</h1><p>{content.intro}</p></header>
      {toolKey === 'generator' && <Generator copy={copy} onCopy={onCopy} />}
      {(toolKey === 'decoder' || toolKey === 'preview') && <CodeTool copy={copy} mode={toolKey} crosshairs={crosshairs} onCopy={onCopy} />}
      {toolKey === 'comparison' && <Comparison copy={copy} crosshairs={crosshairs} onCopy={onCopy} />}
      <aside className="tool-finder-link"><span>{copy.finder}</span><a href={`/${locale}/reaction-time-test/`}>{copy.finderAction}</a></aside>
    </article>
  )
}
