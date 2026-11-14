import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Tilt from '../Tilt.jsx'
import Lightbox from '../Lightbox.jsx'
import Ambient from '../Ambient.jsx'
import GoldAccents from '../GoldAccents.jsx'
import { navigate } from '../../hooks/usePage.js'
import useDrivePhotos from '../../hooks/useDrivePhotos.js'
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
 * Fallback set, shown only while Google Drive is not configured
 * (GOOGLE_DRIVE_API_KEY / GOOGLE_DRIVE_FOLDER unset). Once Drive is set up,
 * photos come from the shared folder — see api/gallery.js.
 */
const LOCAL_PHOTOS = [
  { src: e, w: 2560, h: 1707, cat: 'Pre-Wedding', cap: 'Two hearts, one beginning' },
  { src: a, w: 1707, h: 2560, cat: 'Pre-Wedding', cap: 'Together' },
  { src: h, w: 1707, h: 2560, cat: 'Pre-Wedding', cap: 'Sankar' },
  { src: i, w: 1707, h: 2560, cat: 'Pre-Wedding', cap: 'Silpa' },
  { src: c, w: 2560, h: 1707, cat: 'Proposal', cap: 'The question' },
  { src: b, w: 1707, h: 2560, cat: 'Proposal', cap: 'The answer' },
  { src: g, w: 2560, h: 1707, cat: 'Engagement', cap: 'Rings & mehendi' },
  { src: fam, w: 1000, h: 1499, cat: 'Engagement', cap: 'With our families' },
  { src: d, w: 1707, h: 2560, cat: 'Moments', cap: 'Quiet moments' },
  { src: f, w: 1707, h: 2560, cat: 'Moments', cap: 'Joy' },
].map((p) => ({ ...p, id: p.src, alt: `${p.cat} — ${p.cap}` }))
const LOCAL_CATS = ['Pre-Wedding', 'Proposal', 'Engagement', 'Moments']

const PAGE = 24 // frames added per infinite-scroll step
const SIZES = '(max-width: 599px) 50vw, (max-width: 999px) 33vw, 25vw'
const SKELETON = [0.75, 1.5, 1, 0.67, 1.33, 0.8, 1.5, 0.67]

const MESSAGES = {
  quota: 'So many guests are admiring our photos right now — please try again in a minute.',
  network: 'We couldn’t reach the gallery. Please check your connection and try again.',
}
const DEFAULT_MESSAGE = 'The gallery is resting for a moment. Please try again shortly.'

const colsFor = (w) => (w < 600 ? 2 : w < 1000 ? 3 : 4)

/** Responsive column count for the masonry. */
function useColumns() {
  const [cols, setCols] = useState(() => colsFor(window.innerWidth))
  useEffect(() => {
    const onResize = () => setCols(colsFor(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return cols
}

/** Each photo goes into the currently shortest column, so appending never reshuffles. */
function toColumns(items, cols) {
  const out = Array.from({ length: cols }, () => [])
  const heights = new Array(cols).fill(0)
  items.forEach((p, n) => {
    const c = heights.indexOf(Math.min(...heights))
    out[c].push({ p, n })
    heights[c] += p.h / p.w
  })
  return out
}

/**
 * Gallery page, fed by a Google Drive folder.
 *  - Subfolders of the Drive folder become the capsule filter tabs.
 *  - Masonry columns of gold-bordered frames; 24 at a time, more on scroll.
 *  - On scroll-in: image scales 1.2 -> 1.0 while a curtain wipes away.
 *  - On hover: 3D tilt, slight zoom, warm glow + a light sweep along the edge.
 *  - Click: full-screen viewer (see Lightbox.jsx).
 */
export default function Gallery() {
  const drive = useDrivePhotos()
  const local = drive.status === 'fallback'
  const photos = local ? LOCAL_PHOTOS : drive.photos
  const categories = local ? LOCAL_CATS : drive.categories

  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const [limit, setLimit] = useState(PAGE)
  const [broken, setBroken] = useState(() => new Set())
  const [ind, setInd] = useState({ x: 0, w: 0 })
  const tabs = useRef(null)
  const more = useRef(null)
  const cols = useColumns()

  const tabList = categories.length ? ['All', ...categories] : []
  const shown = useMemo(
    () => photos.filter((p) => !broken.has(p.id) && (filter === 'All' || p.cat === filter)),
    [photos, broken, filter]
  )
  const columns = useMemo(() => toColumns(shown.slice(0, limit), cols), [shown, limit, cols])

  const pick = (t) => {
    setFilter(t)
    setLimit(PAGE)
  }

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
  }, [filter, tabList.length])

  // infinite scroll: reveal the next batch as the bottom comes into view
  useEffect(() => {
    const el = more.current
    if (!el || limit >= shown.length) return
    const io = new IntersectionObserver(([en]) => en.isIntersecting && setLimit((l) => l + PAGE), {
      rootMargin: '800px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [limit, shown.length])

  // a deleted / unshared file: drop its frame instead of showing a broken image
  const drop = (id) => setBroken((s) => new Set(s).add(id))

  let body
  if (drive.status === 'loading') {
    body = (
      <div className="g-loading" role="status">
        <div className="g-masonry" aria-hidden="true">
          {Array.from({ length: cols }, (_, c) => (
            <div className="g-col" key={c}>
              {SKELETON.filter((_, n) => n % cols === c).map((ar, n) => (
                <span className="g-skel" key={n} style={{ '--ar': ar, '--d': `${(c + n) * 120}ms` }} />
              ))}
            </div>
          ))}
        </div>
        <p className="g-status">Gathering our moments…</p>
      </div>
    )
  } else if (drive.status === 'error') {
    body = (
      <div className="g-status" role="alert">
        <p>{MESSAGES[drive.error] || DEFAULT_MESSAGE}</p>
        <button type="button" className="btn btn-ghost" onClick={drive.retry}>Try again</button>
      </div>
    )
  } else if (!shown.length) {
    body = (
      <p className="g-status">
        Our photographs are still being lovingly developed — please check back soon.
      </p>
    )
  } else {
    body = (
      <>
        <div className="g-masonry" key={`${filter}-${cols}`}>
          {columns.map((col, c) => (
            <div className="g-col" key={c}>
              {col.map(({ p, n }) => (
                <Reveal className="frame" key={p.id} delay={(n % PAGE) * 60} style={{ '--ar': (p.w / p.h).toFixed(3) }}>
                  <Tilt
                    as="button"
                    type="button"
                    className="m-tilt"
                    max={7}
                    onClick={() => setOpen(n)}
                    aria-label={`Open photo ${n + 1}${p.cap ? `: ${p.cap}` : ''}`}
                  >
                    <span className="m-img">
                      <img
                        src={p.src}
                        srcSet={p.srcSet}
                        sizes={p.srcSet ? SIZES : undefined}
                        alt={p.alt}
                        width={p.w}
                        height={p.h}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => drop(p.id)}
                      />
                      <span className="m-curtain" aria-hidden="true" />
                      <span className="m-sheen" aria-hidden="true" />
                      {(p.cat || p.cap) && (
                        <span className="m-cap" aria-hidden="true">
                          {p.cat && <small>{p.cat}</small>}
                          {p.cap}
                        </span>
                      )}
                    </span>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
        {limit < shown.length && <div className="g-more" ref={more} aria-hidden="true" />}
      </>
    )
  }

  return (
    <Screen id="gallery" tone="velvet" bg={<Ambient count={26} variant="stars" />}>
      <GoldAccents variant="a" />
      <div className="story-bgtext plx" style={{ '--k': 110 }} aria-hidden="true">Moments</div>

      <div className="container wide">
        <header className="section-head compact">
          <Reveal as="p" className="eyebrow">Gallery</Reveal>
          <Reveal as="h2" delay={100}>Moments we treasure</Reveal>
        </header>

        {tabList.length > 0 && (
          <Reveal className="g-tabs-wrap" delay={200}>
            <div className="g-tabs" role="tablist" aria-label="Gallery categories" ref={tabs}>
              <span className="g-ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} aria-hidden="true" />
              {tabList.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={filter === t}
                  className={filter === t ? 'active' : ''}
                  onClick={() => pick(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {body}

        <Reveal className="g-back" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('home')}>
            ← Back to the invitation
          </button>
        </Reveal>
      </div>

      <Lightbox items={shown} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </Screen>
  )
}
