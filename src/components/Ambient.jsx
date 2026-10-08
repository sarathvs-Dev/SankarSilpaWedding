import { useMemo } from 'react'

/**
 * Ambient particles, positions generated once, motion pure CSS.
 *   variant "dust"  — gold motes rising (@keyframes rise)
 *   variant "stars" — fixed twinkling stars (@keyframes twinkle)
 */
export default function Ambient({ count = 22, variant = 'dust', k = 0 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: variant === 'stars' ? 1 + Math.random() * 2.2 : 2 + Math.random() * 4,
        dur: variant === 'stars' ? 2.5 + Math.random() * 4 : 12 + Math.random() * 14,
        delay: -Math.random() * 20,
        dx: Math.random() * 80 - 40,
      })),
    [count, variant]
  )
  return (
    <div className={`ambient ambient-${variant} plx`} style={{ '--k': k }} aria-hidden="true">
      {items.map((d, i) => (
        <i
          key={i}
          style={{
            left: `${d.left}%`,
            top: variant === 'stars' ? `${d.top}%` : undefined,
            width: d.size,
            height: d.size,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
            '--dx': `${d.dx}px`,
          }}
        />
      ))}
    </div>
  )
}
