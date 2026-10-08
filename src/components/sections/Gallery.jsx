import { useLayoutEffect, useRef, useState } from 'react'
import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Tilt from '../Tilt.jsx'
import Lightbox from '../Lightbox.jsx'
import Ambient from '../Ambient.jsx'
import GoldAccents from '../GoldAccents.jsx'
import a from '../../assets/ARJ00743_resized.jpg'
import b from '../../assets/ARJ01264_resized.jpg'
import c from '../../assets/ARJ01438_resized.jpg'
import d from '../../assets/ARJ01686_resized.jpg'
import e from '../../assets/ARJ01736_resized.jpg'
import f from '../../assets/ARJ02077_resized.jpg'
import g from '../../assets/ARJ04075_resized.jpg'
import h from '../../assets/ARJ01626_resized.jpg'
import i from '../../assets/ARJ01182_resized.jpg'
import fam from '../../assets/family.jpg'

/**
 * EDIT HERE: `cat` decides which tab a photo appears under, `cap` is the
 * serif caption in the viewer. (w/h are real pixel sizes: they set each
 * frame's aspect ratio up front, so nothing shifts while images load.)
 */
const PHOTOS = [
  { src: e, w: 2560, h: 1707, cat: 'Pre-Wedding', cap: 'Two hearts, one beginning' },
  { src: a, w: 1707, h: 2560, cat: 'Pre-Wedding', cap: 'Together' },
  { src: h, w: 1707, h: 2560, cat: 'Pre-Wedding', cap: 'Shankar' },
  { src: i, w: 1707, h: 2560, cat: 'Pre-Wedding', cap: 'Shilpa' },
  { src: c, w: 2560, h: 1707, cat: 'Proposal', cap: 'The question' },
  { src: b, w: 1707, h: 2560, cat: 'Proposal', cap: 'The answer' },
  { src: g, w: 2560, h: 1707, cat: 'Engagement', cap: 'Rings & mehendi' },
  { src: fam, w: 1000, h: 1499, cat: 'Engagement', cap: 'With our families' },
  { src: d, w: 1707, h: 2560, cat: 'Moments', cap: 'Quiet moments' },
  { src: f, w: 1707, h: 2560, cat: 'Moments', cap: 'Joy' },
].map((p, n) => ({ ...p, alt: `${p.cat} — ${p.cap}` }))

const TABS = ['All', 'Pre-Wedding', 'Proposal', 'Engagement', 'Moments']

/**
 * Gallery "exhibit".
 *  - Capsule filter tabs with a gold indicator that slides to the active tab.
 *  - Justified rows of floating gold-bordered frames (any photo count works).
 *  - On scroll-in: image scales 1.2 -> 1.0 while a curtain wipes away.
 *  - On hover: 3D tilt, slight zoom, warm glow + a light sweep along the edge.
 *  - Click: full-screen viewer (see Lightbox.jsx).
 */
export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const [ind, setInd] = useState({ x: 0, w: 0 })
  const tabs = useRef(null)

  const shown = filter === 'All' ? PHOTOS : PHOTOS.filter((p) => p.cat === filter)

  // measure the active capsule so the indicator can slide to it
  useLayoutEffect(() => {
    const measure = () => {
      const btn = tabs.current?.querySelector('[aria-selected="true"]')
      if (btn) setInd({ x: btn.offsetLeft, w: btn.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [filter])

  return (
    <Screen id="gallery" tone="velvet" bg={<Ambient count={26} variant="stars" />}>
      <GoldAccents variant="a" />
      <div className="story-bgtext plx" style={{ '--k': 110 }} aria-hidden="true">Moments</div>

      <div className="container wide">
        <header className="section-head compact">
          <Reveal as="p" className="eyebrow">Gallery</Reveal>
          <Reveal as="h2" delay={100}>Moments we treasure</Reveal>
        </header>

        <Reveal className="g-tabs-wrap" delay={200}>
          <div className="g-tabs" role="tablist" aria-label="Gallery categories" ref={tabs}>
            <span className="g-ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} aria-hidden="true" />
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={filter === t}
                className={filter === t ? 'active' : ''}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="g-rows" key={filter}>
          {shown.map((p, n) => (
            <Reveal
              className="frame"
              key={p.src}
              delay={n * 90}
              style={{ '--ar': (p.w / p.h).toFixed(3), '--fd': `${-n * 1.4}s` }}
            >
              <Tilt as="button" type="button" className="m-tilt" max={7} onClick={() => setOpen(n)} aria-label={`Open: ${p.cap}`}>
                <span className="m-img">
                  <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
                  <span className="m-curtain" aria-hidden="true" />
                  <span className="m-sheen" aria-hidden="true" />
                  <span className="m-cap" aria-hidden="true">
                    <small>{p.cat}</small>
                    {p.cap}
                  </span>
                </span>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox items={shown} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </Screen>
  )
}
