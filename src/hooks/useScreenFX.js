import { useEffect } from 'react'

/**
 * Scroll engine for the whole page (one rAF loop, no library).
 *
 * Every <section data-screen> receives two CSS variables:
 *   --sp  signed progress: +1 = fully below the viewport (entering),
 *          0 = locked in place, -1 = fully scrolled past (leaving)
 *   --ap  |--sp|, handy for "how far from focus" effects
 *
 * Tall sections only count as "leaving" once their BOTTOM edge rises,
 * so content taller than the viewport never fades while still being read.
 * CSS then turns these numbers into parallax / zoom / fade (see .plx,
 * .screen-bg, .screen-inner, .screen-fade in index.css).
 * Only screens near the viewport are updated each frame.
 */
export default function useScreenFX() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const screens = [...document.querySelectorAll('[data-screen]')]
    const near = new Set()
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target))),
      { rootMargin: '25% 0px' }
    )
    screens.forEach((s) => io.observe(s))

    let raf = 0
    const tick = () => {
      raf = 0
      const vh = window.innerHeight
      near.forEach((el) => {
        const r = el.getBoundingClientRect()
        let sp = 0
        if (r.top > 0) sp = r.top / vh
        else if (r.bottom < vh) sp = (r.bottom - vh) / vh
        sp = Math.max(-1, Math.min(1, sp))
        el.style.setProperty('--sp', sp.toFixed(4))
        el.style.setProperty('--ap', Math.abs(sp).toFixed(4))
      })
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    request()
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])
}
