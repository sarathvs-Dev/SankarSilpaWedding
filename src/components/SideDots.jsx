import { useEffect, useState } from 'react'
import { goTo } from '../hooks/useSectionScroll.js'

const SCREENS = [
  { id: 'home', label: 'Welcome' },
  { id: 'story', label: 'Our Story' },
  { id: 'couple', label: 'The Couple' },
  { id: 'events', label: 'Ceremony' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'blessings', label: 'Blessings' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'closing', label: 'Celebrate' },
]

const pad = (n) => String(n).padStart(2, '0')

/**
 * Floating glass capsule: live "01 / 08" counter, vertical screen numbers,
 * and a golden tracking bar that glides to the active number (CSS var --i).
 * Desktop only; mobile uses the header + top progress line.
 */
export default function SideDots() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = SCREENS.map((s) => document.getElementById(s.id))
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target))
        }),
      { rootMargin: '-50% 0px -50% 0px' }
    )
    els.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <nav className="side-dots" aria-label="Screens" style={{ '--i': active }}>
      <span className="sd-count">
        <b>{pad(active + 1)}</b>
        <i aria-hidden="true" />
        {pad(SCREENS.length)}
      </span>
      <div className="sd-track">
        <span className="sd-bar" aria-hidden="true" />
        {SCREENS.map((s, i) => (
          <button
            key={s.id}
            className={i === active ? 'active' : ''}
            aria-label={s.label}
            aria-current={i === active}
            onClick={() => goTo(s.id)}
          >
            <span>{pad(i + 1)}</span>
            <em>{s.label}</em>
          </button>
        ))}
      </div>
    </nav>
  )
}
