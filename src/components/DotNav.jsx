import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'p1', label: 'Welcome' },
  { id: 'p2', label: 'Together' },
  { id: 'p3', label: 'Our Story' },
  { id: 'p4', label: 'The Couple' },
  { id: 'p5', label: 'Ceremony' },
  { id: 'p6', label: 'Venue' },
  { id: 'p8', label: 'Blessings' },
  { id: 'p9', label: 'Celebrate' },
  { id: 'p10', label: 'RSVP' },
]


export default function DotNav() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('p1')
  const navRef = useRef(null)

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > window.innerHeight * 0.35)
    window.addEventListener('scroll', toggle, { passive: true })
    toggle()
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <nav className={`dot-nav${visible ? ' visible' : ''}`} ref={navRef} aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          className={active === s.id ? 'active' : ''}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <span>{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
