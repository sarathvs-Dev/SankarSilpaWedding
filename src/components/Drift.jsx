import { useMemo } from 'react'

/**
 * Renders a field of drifting dots. `variant` picks the container
 * class ("particles" for the opening page, "embers" for dark sections).
 */
export default function Drift({ count = 16, variant = 'particles' }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: variant === 'embers' ? 2 + Math.random() * 3.5 : 3 + Math.random() * 4,
        duration: (variant === 'embers' ? 8 : 9) + Math.random() * 9,
        delay: -(Math.random() * (variant === 'embers' ? 9 : 10)),
        dx: Math.random() * (variant === 'embers' ? 50 : 40) - (variant === 'embers' ? 25 : 20),
      })),
    [count, variant]
  )

  return (
    <div className={variant} aria-hidden="true">
      {items.map((it, i) => (
        <i
          key={i}
          style={{
            left: `${it.left}%`,
            width: `${it.size}px`,
            height: `${it.size}px`,
            '--dx': `${it.dx}px`,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
