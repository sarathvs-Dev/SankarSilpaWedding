import { useEffect, useState } from 'react'
import { goTo } from '../hooks/useSectionScroll.js'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'couple', label: 'The Couple' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
]

/**
 * Floating header: transparent over the hero, frosted glass once scrolled.
 * Gold scroll-progress hairline + full-screen mobile drawer whose links
 * stagger in (see `.drawer button` transition-delay in CSS).
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setScrolled(window.scrollY > 40)
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // lock page scroll + Esc to close while the drawer is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    goTo(id)
  }

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
        <button className="nav-brand" onClick={() => go('home')} aria-label="Back to top">
          S<span>&amp;</span>S
        </button>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <button key={l.id} className={active === l.id ? 'active' : ''} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <button
          className={`burger${open ? ' open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <i />
          <i />
        </button>
        <span className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
      </header>

      <div className={`drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        {LINKS.map((l, i) => (
          <button
            key={l.id}
            style={{ '--i': i }}
            className={active === l.id ? 'active' : ''}
            tabIndex={open ? 0 : -1}
            onClick={() => go(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </>
  )
}
