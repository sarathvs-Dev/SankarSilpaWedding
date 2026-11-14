import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Exhibit viewer (portalled to <body> so a transformed .screen-inner can't trap fixed positioning).
 *  - blurred, darkened copy of the current photo as the backdrop
 *  - serif caption overlay + counter
 *  - thumbnail slider (auto-centres the active thumb)
 *  - swipe left/right to navigate, swipe down to close; keys: Esc, ← →
 * Items may carry `full` (high-res, viewer only) and `tiny` (thumb strip)
 * URLs; otherwise `src` is used everywhere. Neighbours are preloaded.
 */
export default function Lightbox({ items, index, onClose, onChange }) {
  const open = index !== null
  const [dir, setDir] = useState(1)
  const [dx, setDx] = useState(0)
  const drag = useRef(null)
  const moved = useRef(false)
  const strip = useRef(null)

  const go = useCallback(
    (d) => {
      setDir(d)
      onChange((index + d + items.length) % items.length)
    },
    [index, items.length, onChange]
  )

  useEffect(() => {
    if (!open) return
    document.body.classList.add('no-scroll')
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, go, onClose])

  // keep the active thumbnail centred
  useEffect(() => {
    const s = strip.current
    const t = s?.children[index]
    if (s && t) s.scrollTo({ left: t.offsetLeft - s.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' })
  }, [index, open])

  // warm up the previous/next high-res photos so swiping feels instant
  useEffect(() => {
    if (!open || items.length < 2) return
    ;[1, -1].forEach((d) => {
      const it = items[(index + d + items.length) % items.length]
      const img = new Image()
      img.referrerPolicy = 'no-referrer'
      img.src = it.full || it.src
    })
  }, [open, index, items])

  const item = open ? items[Math.min(index, items.length - 1)] : null
  if (!item) return null
  const pad = (n) => String(n).padStart(2, '0')

  const down = (e) => {
    drag.current = { x: e.clientX, y: e.clientY }
    moved.current = false
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const move = (e) => {
    if (!drag.current) return
    const ddx = e.clientX - drag.current.x
    if (Math.abs(ddx) > 6) moved.current = true
    setDx(ddx)
  }
  const up = (e) => {
    if (!drag.current) return
    const ddx = e.clientX - drag.current.x
    const ddy = e.clientY - drag.current.y
    drag.current = null
    setDx(0)
    if (Math.abs(ddy) > 110 && Math.abs(ddy) > Math.abs(ddx)) return onClose()
    if (Math.abs(ddx) > 60) go(ddx < 0 ? 1 : -1)
  }

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <img key={`bg-${index}`} className="lb-bg" src={item.tiny || item.src} alt="" referrerPolicy="no-referrer" />
      <button className="lb-close" onClick={onClose} aria-label="Close">×</button>

      <div
        className="lb-stage"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onClick={(e) => e.target === e.currentTarget && !moved.current && onClose()}
      >
        <button className="lb-nav prev" aria-label="Previous photo" onClick={() => go(-1)}>‹</button>
        <figure key={index} className={`lb-fig ${dir > 0 ? 'from-right' : 'from-left'}`} style={{ translate: `${dx}px 0` }}>
          <img
            src={item.full || item.src}
            alt={item.alt}
            draggable="false"
            referrerPolicy="no-referrer"
          />
        </figure>
        <button className="lb-nav next" aria-label="Next photo" onClick={() => go(1)}>›</button>
      </div>

      <div className="lb-caption" key={`cap-${index}`}>
        {item.cat && <p className="eyebrow">{item.cat}</p>}
        {item.cap && <h3>{item.cap}</h3>}
        <span className="lb-count">{pad(index + 1)} / {pad(items.length)}</span>
      </div>

      <div className="lb-thumbs" ref={strip}>
        {items.map((it, i) => (
          <button
            key={it.id || it.src}
            className={i === index ? 'active' : ''}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => { setDir(i > index ? 1 : -1); onChange(i) }}
          >
            <img src={it.tiny || it.src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
          </button>
        ))}
      </div>
    </div>,
    document.body
  )
}
