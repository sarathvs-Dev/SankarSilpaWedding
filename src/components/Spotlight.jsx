import { useEffect, useRef } from 'react'

/**
 * Soft champagne light that trails the cursor (lerped on rAF, moved with
 * transform only). Skipped on touch devices and for reduced motion.
 */
export default function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return

    const el = ref.current
    const t = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const c = { ...t }
    let raf = 0
    const loop = () => {
      c.x += (t.x - c.x) * 0.08
      c.y += (t.y - c.y) * 0.08
      el.style.transform = `translate3d(${c.x - 350}px, ${c.y - 350}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const move = (e) => {
      t.x = e.clientX
      t.y = e.clientY
      el.style.opacity = 1
    }
    window.addEventListener('pointermove', move, { passive: true })
    loop()
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="spotlight" aria-hidden="true" />
}
