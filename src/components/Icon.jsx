export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '' }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    copy: <><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevronDown: <path d="m7 10 5 5 5-5" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.7 5.5 3.7 9s-1.2 6.5-3.7 9c-2.5-2.5-3.7-5.5-3.7-9S9.5 5.5 12 3Z" /></>,
    gamepad: <><path d="M7.5 9h-1A4.5 4.5 0 0 0 2 13.5v2A3.5 3.5 0 0 0 5.5 19c1.3 0 2.1-.7 3.2-2h6.6c1.1 1.3 1.9 2 3.2 2a3.5 3.5 0 0 0 3.5-3.5v-2A4.5 4.5 0 0 0 17.5 9h-1" /><path d="M8 13H5m1.5-1.5v3M17.5 12.5h.01M19 15h.01M9 6h6l1.5 3h-9L9 6Z" /></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    minus: <path d="M5 12h14" />,
    plus: <path d="M12 5v14M5 12h14" />,
    droplet: <path d="M12 3s6 6.1 6 11a6 6 0 1 1-12 0c0-4.9 6-11 6-11Z" />,
    shield: <><path d="M12 3 5 6v5c0 4.7 2.8 8 7 10 4.2-2 7-5.3 7-10V6l-7-3Z" /><path d="m9.5 12 1.7 1.7 3.5-3.7" /></>,
    x: <path d="m6 6 12 12M18 6 6 18" />,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    bookmark: <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.8L6 21V4.8Z" />,
    share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14" /><path d="M10 11v6M14 11v6" /></>,
    target: <><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></>,
    rotate: <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v6h6" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    monitor: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
    arrowLeft: <path d="m15 18-6-6 6-6M9 12h11" />,
    exit: <><path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.4 6.6h.01" /></>,
    youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9 5 3-5 3V9Z" /></>,
    tiktok: <><path d="M15 4v11.2a4.2 4.2 0 1 1-3.4-4.1" /><path d="M15 4c.7 2.5 2.2 4 4.5 4.3" /></>,
    facebook: <path d="M14 21v-8h3l.5-3H14V8.2c0-1.3.7-2.2 2.3-2.2H18V3.2c-.7-.1-1.6-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8V10H8v3h2.5v8" />,
  }

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
