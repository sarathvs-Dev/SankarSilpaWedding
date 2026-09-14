import confetti from 'canvas-confetti'
import Reveal from '../Reveal.jsx'
import Drift from '../Drift.jsx'
import img1 from '../../assets/ARJ02077_resized.jpg'
import img2 from '../../assets/ARJ01686_resized.jpg'
import img3 from '../../assets/ARJ00743_resized.jpg'
import img4 from '../../assets/ARJ01438_resized.jpg'
import img5 from '../../assets/ARJ01736_resized.jpg'
import img6 from '../../assets/ARJ04075_resized.jpg'

export default function Section9Closing() {
  const celebrate = () => {
    const colors = ['#B8935A', '#E9CE8F', '#6E1423', '#8A6A34']
    confetti({ particleCount: 90, spread: 80, startVelocity: 32, scalar: 0.9, origin: { y: 0.7 }, colors })
    setTimeout(
      () => confetti({ particleCount: 60, spread: 100, origin: { y: 0.6 }, colors, scalar: 0.7 }),
      250
    )
  }

  return (
    <section id="p9" data-tone="dark" className="closing-section">
      <Reveal as="div" className="seam" opacity={1} />
      <div className="sec-bg">
        <div
          className="glow glow-lift"
          style={{ width: 320, height: 320, left: '50%', bottom: -80, transform: 'translateX(-50%)', background: 'var(--emerald)', opacity: 0.4 }}
        />
        <div
          className="glow glow-lift"
          style={{ width: 220, height: 220, left: '15%', top: -20, background: 'var(--gold-light)', opacity: 0.28, animationDelay: '-6s' }}
        />
        <Drift count={18} variant="embers" />
      </div>

      <div className="closing-inner">
        <Reveal as="p" className="eyebrow reveal">Our beautiful</Reveal>
        <Reveal as="h2" className="reveal" style={{ fontSize: 'clamp(1.8rem,7vw,2.3rem)' }}>BEGINNING</Reveal>

        <div className="gallery-mosaic-grid reveal d1">
          <div className="mosaic-item m1"><img src={img1} alt="Shankar & Shilpa" /></div>
          <div className="mosaic-item m2"><img src={img2} alt="Shankar & Shilpa" /></div>
          <div className="mosaic-item m3"><img src={img3} alt="Shankar & Shilpa" /></div>
          <div className="mosaic-item m4"><img src={img4} alt="Shilpa" /></div>
          <div className="mosaic-item m5"><img src={img5} alt="Shankar & Shilpa" /></div>
          <div className="mosaic-item m6"><img src={img6} alt="Wedding rings & mehendi" /></div>
        </div>

        <div className="closing-content">
          <Reveal as="p" className="closing-amp reveal d2">SHANKAR &amp; SHILPA</Reveal>
          <Reveal as="p" className="lede reveal d2" style={{ fontStyle: 'italic' }}>
            With love and blessings,<br />we look forward to celebrating with you.
          </Reveal>
          <Reveal as="button" className="celebrate-btn reveal d3" onClick={celebrate}>
            <span className="celebrate-spark" aria-hidden="true">✦</span>
            CELEBRATE WITH US
          </Reveal>
          <Reveal as="p" className="foot-note reveal d3">
            12 · 12 · 2026 &nbsp;·&nbsp; Chirakkadavu, Kottayam
          </Reveal>
        </div>
      </div>
    </section>
  )
}