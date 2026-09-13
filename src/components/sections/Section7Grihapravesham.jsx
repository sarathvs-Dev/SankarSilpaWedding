import Reveal from '../Reveal.jsx'

export default function Section7Grihapravesham() {
  return (
    <section id="p7" data-tone="blush">
      <Reveal as="div" className="seam" />
      <div className="sec-bg">
        <div className="glow" style={{ width: 240, height: 240, right: -50, top: -30, background: 'var(--green)', opacity: 0.22 }} />
        <div
          className="glow"
          style={{ width: 190, height: 190, left: -30, bottom: -10, background: 'var(--gold-light)', opacity: 0.2, animationDelay: '-8s' }}
        />
      </div>

      <Reveal as="p" className="eyebrow reveal">Grihapravesham</Reveal>
      <Reveal as="svg" className="temple-wrap reveal" viewBox="0 0 220 150" style={{ width: 'min(64vw,230px)' }}>
        <use href="#house-silhouette" />
      </Reveal>
      <Reveal as="h2" className="reveal" style={{ fontSize: 'clamp(1.5rem,6vw,1.9rem)' }}>
        Saturday, 12th December 2026
      </Reveal>
      <Reveal as="p" className="date-pill reveal d1">BEFORE 4:00 PM</Reveal>
      <Reveal as="p" className="lede reveal d1" style={{ marginTop: 18 }}>At the Groom's Residence</Reveal>
      <Reveal as="p" className="eyebrow reveal d2" style={{ color: 'var(--maroon)', marginTop: 4 }}>VAYAMBUKUNNEL</Reveal>
      <Reveal as="p" className="lede reveal d2" style={{ fontSize: '0.92rem' }}>Kizhakkumbhagom, Chirakkadavu</Reveal>

      <Reveal
        as="a"
        className="loc-btn reveal d3"
        style={{ marginTop: 18 }}
        href="https://www.google.com/maps/search/?api=1&query=Vayambukunnel+House+Kizhakkumbhagom+Chirakkadavu+Ponkunnam"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24"><path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" /></svg>
        GET DIRECTIONS
      </Reveal>
    </section>
  )
}

