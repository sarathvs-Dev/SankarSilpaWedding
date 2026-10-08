import { useRef } from 'react'

/**
 * 3D tilt card. The pointer position becomes --rx/--ry (rotation) and
 * --gx/--gy (glare spot). Children with class "pop" lift off the card
 * (translateZ) on hover/focus. Mouse only — touch devices keep it flat.
 */
export default function Tilt({ as: Tag = 'div', max = 9, className = '', children, ...props }) {
  const ref = useRef(null)

  const move = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${(x * max * 2).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-y * max * 2).toFixed(2)}deg`)
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
  }
  const reset = () => {
    const el = ref.current
    ;['--rx', '--ry'].forEach((p) => el.style.setProperty(p, '0deg'))
  }

  return (
    <Tag
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
      {...props}
    >
      {children}
    </Tag>
  )
}
