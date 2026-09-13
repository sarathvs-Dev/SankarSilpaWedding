import { useEffect, useRef } from 'react'

export default function LampRail() {
  const fillRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop || document.body.scrollTop
      const max = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight
      const pct = max > 0 ? Math.min(100, (scrolled / max) * 100) : 0
      if (fillRef.current) fillRef.current.style.height = pct + '%'
    }
    document.addEventListener('scroll', update, { passive: true })
    update()
    return () => document.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="lamp-rail" aria-hidden="true">
      <div className="wick-track">
        <div className="wick-fill" ref={fillRef} />
      </div>
      <svg className="lamp-icon" viewBox="0 0 26 34">
        <g className="flame">
          <path
            d="M13 4c2.4 3 3.2 5.2 1.6 7.6-.5.8-1.6.9-1.9-.1-.2-.7.1-1.1-.2-1.9-.6 1.4-1.6 2.4-1.1 4 .3 1 1.4 1.6 2.4 1.2 2.2-.9 2.9-3.6 1.7-6.1C14.6 6.9 13.9 5.4 13 4z"
            fill="var(--gold-deep)"
          />
          <path
            d="M13 7c1.3 1.9 1.7 3.3.8 4.7-.5.7-1.5.5-1.5-.4 0-.5.3-.7.1-1.2-.4.8-.9 1.4-.5 2.3.3.6 1.1.8 1.6.4 1.1-.8 1.1-2.3.1-3.9L13 7z"
            fill="var(--gold-light)"
          />
        </g>
        <path
          d="M4 30c0-6 4-6 4-11 0-2-1-3-1-5.5C7 9 9.5 6 13 6s6 3 6 7.5c0 2.5-1 3.5-1 5.5 0 5 4 5 4 11z"
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth="1"
          opacity="0.55"
        />
        <ellipse cx="13" cy="30.5" rx="10" ry="2.2" fill="none" stroke="var(--gold-deep)" strokeWidth="1" opacity="0.55" />
      </svg>
    </div>
  )
}
