import Reveal from '../Reveal.jsx'
import groomImg from '../../assets/ARJ01626_resized.jpg'
import brideImg from '../../assets/ARJ01182_resized.jpg'

export default function Section4Couple() {
  return (
    <section id="p4" data-tone="light">
      <Reveal as="div" className="seam" />
      <div className="sec-bg">
        <div className="layer pat-kasavu" style={{ opacity: 0.35 }} />
        <div className="glow" style={{ width: 210, height: 210, left: '60%', top: -30, background: 'var(--maroon)', opacity: 0.14 }} />
        <div
          className="glow"
          style={{ width: 190, height: 190, left: -20, bottom: -20, background: 'var(--gold-light)', opacity: 0.22, animationDelay: '-7s' }}
        />
      </div>

      <Reveal as="p" className="eyebrow reveal">The Couple</Reveal>

      <div className="couple-grid" style={{ marginTop: 18 }}>
        <div className="couple-col">
          <Reveal as="div" className="couple-avatar frame-gold reveal">
            <div className="photo-inner couple-photo-crop groom-crop">
              <img src={groomImg} alt="Shankar — Groom" />
            </div>
          </Reveal>
          <Reveal as="h3" className="reveal d1" style={{ marginTop: 14 }}>SHANKAR</Reveal>
          <Reveal as="p" className="rel reveal d1">Son of</Reveal>
          <Reveal as="p" className="reveal d1">
            Mrs. P.N. Siju<br />&amp;<br />Mr. V.R. Shivadas
          </Reveal>
          <Reveal as="p" className="rel reveal d2" style={{ fontWeight: 600, color: 'var(--maroon)' }}>
            Vayambukunnel
          </Reveal>
        </div>

        <div className="vline" />

        <div className="couple-col">
          <Reveal as="div" className="couple-avatar frame-gold reveal d1">
            <div className="photo-inner couple-photo-crop bride-crop">
              <img src={brideImg} alt="Shilpa — Bride" />
            </div>
          </Reveal>
          <Reveal as="h3" className="reveal d2" style={{ marginTop: 14 }}>SHILPA</Reveal>
          <Reveal as="p" className="rel reveal d2">Daughter of</Reveal>
          <Reveal as="p" className="reveal d2">
            Mrs. S. Lalimol<br />&amp;<br />Mr. C.S. Premkumar
          </Reveal>
          <Reveal as="p" className="rel reveal d3" style={{ fontWeight: 600, color: 'var(--maroon)' }}>
            Chundacheril
          </Reveal>
        </div>
      </div>

      <Reveal as="svg" className="divider reveal d3" viewBox="0 0 100 40" style={{ marginTop: 30 }}>
        <use href="#lotus" />
      </Reveal>
    </section>
  )
}


