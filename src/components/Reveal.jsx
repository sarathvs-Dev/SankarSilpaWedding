import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal logic.
 *  - One IntersectionObserver per element; fires once, then disconnects.
 *  - Waits for the gate to open ("invitation:open" event) so the hero
 *    animation plays when the guest actually sees it, not behind the gate.
 *  - Pure CSS does the motion (.rv / .rv.in in index.css): opacity + transform
 *    only, so it is GPU-friendly and causes no layout shift (CLS).
 */
function useGateOpen() {
  const [open, setOpen] = useState(() => !document.body.classList.contains('locked'))
  useEffect(() => {
    if (open) return
    const h = () => setOpen(true)
    window.addEventListener('invitation:open', h)
    return () => window.removeEventListener('invitation:open', h)
  }, [open])
  return open
}

/**
 * variant: 'up' | 'zoom' | 'left' | 'right' | 'fade'
 * delay:   ms, used for soft staggering of lists/cards
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  children,
  ...props
}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const ready = useGateOpen()

  useEffect(() => {
    if (!ready || inView) return
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [ready, inView])

  return (
    <Tag
      ref={ref}
      className={`rv rv-${variant} ${inView ? 'in' : ''} ${className}`.trim()}
      style={{ '--d': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}
