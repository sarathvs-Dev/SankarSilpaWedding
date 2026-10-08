import { useEffect } from 'react'

/**
 * Screen-by-screen scrolling, driven by us instead of native CSS scroll-snap.
 * Native `mandatory` snap fights smooth scrolling and feels "sticky"; here one
 * wheel/key gesture triggers ONE eased glide to the next screen, and the
 * trackpad's inertia tail is swallowed so it can't trigger a second jump.
 *
 * Active only on roomy desktop + mouse/trackpad. Phones, tablets and short
 * windows keep plain fluid scrolling. Screens taller than the viewport scroll
 * natively and only hand over to the glide once you reach their edge.
 */
const DESKTOP = '(min-width: 900px) and (min-height: 620px) and (pointer: fine)'
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) // cubic

let enabled = false
let animating = false
let cooldownUntil = 0
let raf = 0

const screens = () => [...document.querySelectorAll('[data-screen]')]

function glideTo(y, duration) {
  cancelAnimationFrame(raf)
  const from = window.scrollY
  const dist = y - from
  if (Math.abs(dist) < 2) return
  const t0 = performance.now()
  animating = true
  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration)
    window.scrollTo({ top: from + dist * easeInOut(p), behavior: 'instant' })
    if (p < 1) raf = requestAnimationFrame(step)
    else {
      animating = false
      cooldownUntil = performance.now() + 380 // swallow trackpad inertia
    }
  }
  raf = requestAnimationFrame(step)
}

function targetY(el, dir) {
  const r = el.getBoundingClientRect()
  const top = r.top + window.scrollY
  // arriving upward into a tall screen: land on its bottom edge, not its top
  return dir < 0 && r.height > window.innerHeight + 4 ? top + r.height - window.innerHeight : top
}

/** Navigate to a section id (used by nav, side dots). */
export function goTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (!enabled) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  const dist = Math.abs(el.getBoundingClientRect().top)
  glideTo(targetY(el, 1), Math.min(1500, 800 + dist * 0.18))
}

export default function useSectionScroll() {
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => (enabled = mq.matches && !calm.matches)
    sync()
    mq.addEventListener('change', sync)

    const step = (dir) => {
      const list = screens()
      const vh = window.innerHeight
      const cur = list.findIndex((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= vh / 2 && r.bottom > vh / 2
      })
      if (cur < 0) return false
      const r = list[cur].getBoundingClientRect()
      const tall = r.height > vh + 4
      if (tall) {
        // let the browser scroll inside it until we hit an edge
        if (dir > 0 && r.bottom > vh + 2) return false
        if (dir < 0 && r.top < -2) return false
      }
      const next = list[cur + dir]
      if (!next) return false
      glideTo(targetY(next, dir), 1050)
      return true
    }

    const blocked = (target) =>
      document.body.classList.contains('locked') ||
      document.body.classList.contains('no-scroll') ||
      (target instanceof Element && target.closest('.wishes, .map-wrap, .lightbox'))

    const onWheel = (e) => {
      if (!enabled || e.ctrlKey || blocked(e.target)) return
      if (animating || performance.now() < cooldownUntil) {
        e.preventDefault()
        return
      }
      if (Math.abs(e.deltaY) < 6) return
      if (step(e.deltaY > 0 ? 1 : -1)) e.preventDefault()
    }

    const onKey = (e) => {
      if (!enabled || blocked(e.target)) return
      if (e.target instanceof Element && e.target.closest('input, textarea, select, button, a, [contenteditable]')) return
      const down = ['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.shiftKey
      const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)
      if (!down && !up) return
      if (animating) return e.preventDefault()
      if (step(down ? 1 : -1)) e.preventDefault()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      mq.removeEventListener('change', sync)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
      animating = false
    }
  }, [])
}
