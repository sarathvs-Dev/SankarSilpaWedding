import Reveal from '../Reveal.jsx'
import templeArt from '../../assets/temple-watercolor.png'

export default function Section6Venue() {
  return (
    <section id="p6" data-tone="dusk">
      <Reveal as="div" className="seam" />

      <div className="sec-bg">
        <div className="layer pat-dusk" style={{ inset: 0 }} />
        <div
          className="glow glow-lift"
          style={{
            width: 320,
            height: 320,
            left: '28%',
            top: '35%',
            transform: 'translate(-50%, -50%)',
            background: 'var(--gold-light)',
            opacity: 0.22,
          }}
        />
      </div>

      <div className="split">
        <div className="split-media">
          <Reveal as="div" className="temple-wrap reveal-left">
            <div className="temple-ring" />
            <img
              src={templeArt}
              alt="Chirakkadavu Sree Mahadeva Temple"
              className="temple-art"
            />
          </Reveal>
        </div>

        <div className="split-text">
          <Reveal as="p" className="eyebrow reveal-right">
            <span className="eyebrow-line" />
            The Sacred Venue
          </Reveal>
          <Reveal as="h2" className="venue-name reveal-right">
            Chirakkadavu Sree<br />Mahadeva Temple Premises
          </Reveal>
          <Reveal as="p" className="lede reveal-right">
            Chirakkadavu, Ponkunnam, Kottayam
          </Reveal>
          <Reveal
            as="a"
            className="loc-btn reveal-right d1"
            href="https://www.google.com/maps/search/?api=1&query=Chirakkadavu+Sree+Mahadeva+Temple+Ponkunnam+Kottayam"
            target="_blank"
            rel="noopener"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
            </svg>
            <span>View Location</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}