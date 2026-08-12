import { useMemo, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'
import { crosshairColorPresets, previewBackgroundOptions } from '../data/previewOptions.js'
import { seoToolCopy } from '../seo/toolContent.js'
import { routePath } from '../seo/routes.js'
import { generateCrosshairCode, parseCrosshairCode } from '../utils/crosshairCode.js'

const uiCopy = {
  en: {
    map: 'Map scene', code: 'Crosshair code', paste: 'Paste a profile code', valid: 'Code looks good—ready to try', invalid: 'This code cannot be read. Check whether a section is missing.', copy: 'Copy code', left: 'Left crosshair', right: 'Right crosshair', settings: 'Shape the crosshair', color: 'Color', outline: 'Outline', centerDot: 'Center dot', inner: 'Inner lines', outer: 'Outer lines', opacity: 'Opacity', length: 'Length', thickness: 'Thickness', offset: 'Offset', size: 'Size', movement: 'Movement error', firing: 'Firing error', preview: 'Map preview', decoded: 'What the code contains', on: 'On', off: 'Off', generatorNote: 'Copy it, then give it a few shots in the range.', comparisonNote: 'Same map, same scale. Your eyes can judge the shape without the background getting in the way.', codeHelp: 'Paste the whole string—do not miss the beginning, ending, or separators.', finder: 'Still not sure?', finderAction: 'Let the crosshair finder pick one', faq: 'Common questions',
    maps: { ascent: 'Ascent', haven: 'Haven', bind: 'Bind' }, colors: { white: 'White', green: 'Green', cyan: 'Cyan', yellow: 'Yellow', red: 'Red', pink: 'Pink', custom: 'Custom' },
  },
  es: {
    map: 'Mapa de prueba', code: 'Código de mira', paste: 'Pega un código de perfil', valid: 'El código funciona—ya puedes probarlo', invalid: 'No podemos leer este código. Revisa si falta una parte.', copy: 'Copiar código', left: 'Mira izquierda', right: 'Mira derecha', settings: 'Dale forma a la mira', color: 'Color', outline: 'Contorno', centerDot: 'Punto central', inner: 'Líneas interiores', outer: 'Líneas exteriores', opacity: 'Opacidad', length: 'Longitud', thickness: 'Grosor', offset: 'Separación', size: 'Tamaño', movement: 'Error de movimiento', firing: 'Error de disparo', preview: 'Prueba en el mapa', decoded: 'Qué contiene el código', on: 'Sí', off: 'No', generatorNote: 'Cópiala y dispara unas rondas en el campo de tiro.', comparisonNote: 'Mismo mapa y misma escala: aquí decide la forma, no el fondo.', codeHelp: 'Pega la cadena entera, sin perder el principio, el final ni los separadores.', finder: '¿Sigues con dudas?', finderAction: 'Deja que el buscador elija una', faq: 'Preguntas habituales',
    maps: { ascent: 'Ascent', haven: 'Haven', bind: 'Bind' }, colors: { white: 'Blanco', green: 'Verde', cyan: 'Cian', yellow: 'Amarillo', red: 'Rojo', pink: 'Rosa', custom: 'Personalizado' },
  },
  'pt-BR': {
    map: 'Mapa de teste', code: 'Código da mira', paste: 'Cole um código de perfil', valid: 'Código certo—já dá para testar', invalid: 'Não conseguimos ler este código. Veja se faltou algum trecho.', copy: 'Copiar código', left: 'Mira esquerda', right: 'Mira direita', settings: 'Monte sua mira', color: 'Cor', outline: 'Contorno', centerDot: 'Ponto central', inner: 'Linhas internas', outer: 'Linhas externas', opacity: 'Opacidade', length: 'Comprimento', thickness: 'Espessura', offset: 'Espaçamento', size: 'Tamanho', movement: 'Erro de movimento', firing: 'Erro de disparo', preview: 'Teste no mapa', decoded: 'O que existe no código', on: 'Ligado', off: 'Desligado', generatorNote: 'Copie e dê alguns tiros no campo de treino.', comparisonNote: 'Mesmo mapa e mesma escala: aqui quem decide é o formato, não o fundo.', codeHelp: 'Cole a sequência inteira, sem perder começo, fim ou separadores.', finder: 'Ainda na dúvida?', finderAction: 'Deixe o teste escolher uma', faq: 'Dúvidas comuns',
    maps: { ascent: 'Ascent', haven: 'Haven', bind: 'Bind' }, colors: { white: 'Branco', green: 'Verde', cyan: 'Ciano', yellow: 'Amarelo', red: 'Vermelho', pink: 'Rosa', custom: 'Personalizado' },
  },
  'zh-CN': {
    map: '试用地图', code: '准星代码', paste: '把整段准星代码贴进来', valid: '代码没问题，直接试', invalid: '这串代码读不出来，检查有没有漏掉一段。', copy: '复制代码', left: '左边准星', right: '右边准星', settings: '怎么长，你来调', color: '准星颜色', outline: '轮廓', centerDot: '中心点', inner: '内线', outer: '外线', opacity: '透明度', length: '长度', thickness: '粗细', offset: '中心间距', size: '大小', movement: '移动误差', firing: '射击误差', preview: '场景里试试看', decoded: '这串代码调了什么', on: '开', off: '关', generatorNote: '复制后去训练场打几枪，顺手再带进排位。', comparisonNote: '同一张地图、同一个比例，谁更顺眼一眼就能看出来。', codeHelp: '整段代码直接贴进来，别漏头漏尾，也别多带空格。', finder: '还是选不出来？', finderAction: '测一下，让我们帮你挑', faq: '大家常问',
    maps: { ascent: '亚海悬城', haven: '隐世修所', bind: '源工重镇' }, colors: { white: '白色', green: '绿色', cyan: '青色', yellow: '黄色', red: '红色', pink: '粉色', custom: '自定义' },
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

function Preview({ item, background, label, copy }) {
  const map = previewBackgroundOptions.find((option) => option.value === background) || previewBackgroundOptions[0]
  const mapName = copy.maps[map.value] || map.label
  return (
    <div className="tool-preview-frame">
      <img src={map.image} width="914" height="514" alt={mapName} />
      {item ? <CrosshairCanvas crosshair={item} scale={1.25} label={label} /> : <div className="tool-preview-empty" aria-label={label}>?</div>}
      <span>{mapName}</span>
    </div>
  )
}

function MapPicker({ copy, value, onChange }) {
  return (
    <label className="tool-field">
      <span>{copy.map}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {previewBackgroundOptions.map((option) => <option key={option.value} value={option.value}>{copy.maps[option.value] || option.label}</option>)}
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
      <section className="tool-preview-panel"><Preview item={item} background={background} label={copy.preview} copy={copy} /><MapPicker copy={copy} value={background} onChange={setBackground} /><code>{code}</code><button className="primary-button" type="button" onClick={() => onCopy(item, { interactionSource: 'crosshair_generator' })}>{copy.copy}</button><p>{copy.generatorNote}</p></section>
      <section className="tool-controls" aria-label={copy.settings}>
        <h2>{copy.settings}</h2>
        <label className="tool-field"><span>{copy.color}</span><select value={settings.colorPreset} onChange={(event) => update('colorPreset', event.target.value)}>{crosshairColorPresets.map((option) => <option key={option.preset} value={option.preset}>{copy.colors[option.key] || option.key}</option>)}</select></label>
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
          <span><b>{copy.color}</b>{copy.colors[parsed.value.colorKey] || parsed.value.color}</span><span><b>{copy.outline}</b>{settings.outline.enabled ? copy.on : copy.off}</span><span><b>{copy.centerDot}</b>{settings.dot.enabled ? copy.on : copy.off}</span><span><b>{copy.inner}</b>{settings.inner.enabled ? `${settings.inner.horizontalLength} / ${settings.inner.thickness} / ${settings.inner.offset}` : copy.off}</span><span><b>{copy.outer}</b>{settings.outer.enabled ? `${settings.outer.horizontalLength} / ${settings.outer.thickness} / ${settings.outer.offset}` : copy.off}</span><span><b>{copy.movement}</b>{settings.movementError.enabled ? copy.on : copy.off}</span><span><b>{copy.firing}</b>{settings.firingError.enabled ? copy.on : copy.off}</span>
        </div>}
        <button className="primary-button" disabled={!parsed.value} type="button" onClick={() => parsed.value && onCopy(item, { interactionSource: `crosshair_${mode}` })}>{copy.copy}</button>
      </section>
      <section className="tool-preview-panel"><Preview item={item} background={background} label={copy.preview} copy={copy} /><MapPicker copy={copy} value={background} onChange={setBackground} /></section>
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
          <Preview item={item} background={background} label={`${label}: ${item.name}`} copy={copy} />
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
      <section className="tool-learning-content" aria-labelledby="tool-guide-title">
        <div className="tool-learning-intro">
          <h2 id="tool-guide-title">{content.guideTitle}</h2>
          <p>{content.guideIntro}</p>
        </div>
        <div className="tool-learning-grid">
          {content.tips.map((tip, index) => (
            <article key={tip.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{tip.title}</h3><p>{tip.body}</p></article>
          ))}
        </div>
        <div className="tool-learning-faq">
          <h2>{copy.faq}</h2>
          {content.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </div>
      </section>
      <aside className="tool-finder-link"><span>{copy.finder}</span><a href={routePath(locale, { type: 'finder' })}>{copy.finderAction}</a></aside>
    </article>
  )
}
