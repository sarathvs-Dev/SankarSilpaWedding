import { useEffect, useRef, useState } from 'react'

/**
 * Generic reveal-on-scroll wrapper.
 * Uses IntersectionObserver + immediate getBoundingClientRect fallback
 * so elements in the viewport are never stuck blank on initial load.
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const checkInView = () => {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < vh + 120 && rect.bottom > -100) {
        setInView(true)
        return true
      }
      return false
    }

    // Check immediately on mount
    if (checkInView()) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0 || checkInView()) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0, rootMargin: '120px 0px 120px 0px' }
    )

    io.observe(node)

    // Listen for scroll/resize events (e.g. when body.locked is removed)
    const handleCheck = () => {
      if (checkInView()) {
        io.disconnect()
        window.removeEventListener('scroll', handleCheck)
        window.removeEventListener('resize', handleCheck)
      }
    }

    window.addEventListener('scroll', handleCheck, { passive: true })
    window.addEventListener('resize', handleCheck, { passive: true })

    // Backup timer for font/layout load
    const timer = setTimeout(handleCheck, 200)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', handleCheck)
      window.removeEventListener('resize', handleCheck)
      clearTimeout(timer)
    }
  }, [])

  return (
    <Tag ref={ref} className={`${className} ${inView ? 'in' : ''}`.trim()} {...props}>
      {children}
    </Tag>
  )
}

