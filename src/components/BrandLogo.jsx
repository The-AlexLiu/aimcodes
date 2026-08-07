export function BrandMark({ compact = false }) {
  return (
    <img
      className={`brand-mark ${compact ? 'is-compact' : ''}`}
      src="/brand/aimcodes-logo-transparent-v2.png"
      alt=""
      aria-hidden="true"
      draggable="false"
    />
  )
}

export function BrandWordmark() {
  return (
    <strong className="brand-wordmark">
      <span>Aim</span><span className="brand-wordmark-accent">Codes</span>
    </strong>
  )
}
