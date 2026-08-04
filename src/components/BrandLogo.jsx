export function BrandMark({ compact = false }) {
  return (
    <svg
      className={`brand-mark ${compact ? 'is-compact' : ''}`}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 2.5v8M20 29.5v8M2.5 20h8M29.5 20h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
      <circle cx="20" cy="20" r="8.8" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="20" cy="20" r="2.25" fill="currentColor" />
    </svg>
  )
}

export function BrandWordmark() {
  return (
    <strong className="brand-wordmark">
      <span>Aim</span><span className="brand-wordmark-accent">Codes</span>
    </strong>
  )
}
