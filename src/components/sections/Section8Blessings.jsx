import Reveal from '../Reveal.jsx'

export default function Section8Blessings() {
  return (
    <section id="p8" data-tone="ivory-deep">
      <Reveal as="div" className="seam" />
      <div className="sec-bg">
        <div className="layer pat-mandala" style={{ opacity: 0.1 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <use href="#mandala" />
          </svg>
        </div>
        <div className="glow" style={{ width: 210, height: 210, left: -40, top: -40, background: 'var(--maroon)', opacity: 0.14 }} />
        <div
          className="glow"
          style={{ width: 200, height: 200, right: -30, bottom: -20, background: 'var(--gold-light)', opacity: 0.22, animationDelay: '-10s' }}
        />
      </div>

      <Reveal as="p" className="eyebrow reveal">Warmly inviting you</Reveal>
      <Reveal as="svg" className="divider reveal" viewBox="0 0 100 40">
        <use href="#lotus" />
      </Reveal>

      <div className="fam-block">
        <Reveal as="p" className="who reveal d1">Mrs. P.N. Siju &amp; Mr. V.R. Shivadas</Reveal>
        <Reveal as="p" className="addr reveal d1">Vayambukunnel House, Chirakkadavu</Reveal>
        <Reveal as="p" className="tag reveal d1">GROOM'S FAMILY</Reveal>
      </div>

      <Reveal as="p" className="closing-amp reveal d2" style={{ margin: '20px 0' }}>&amp;</Reveal>

      <div className="fam-block">
        <Reveal as="p" className="who reveal d2">Mrs. S. Lalimol &amp; Mr. C.S. Premkumar</Reveal>
        <Reveal as="p" className="addr reveal d2">Chundacheril House, Chirakkadavu</Reveal>
        <Reveal as="p" className="tag reveal d2">BRIDE'S FAMILY</Reveal>
      </div>
    </section>
  )
}
