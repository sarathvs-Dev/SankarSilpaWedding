import { useMemo, useState } from 'react'
import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Tilt from '../Tilt.jsx'
import Ambient from '../Ambient.jsx'
import GoldAccents from '../GoldAccents.jsx'
import handsImg from '../../assets/wedding-hands.png'
import templeArt from '../../assets/temple-watercolor.png'

const PIN = 'M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z'
const CAL = 'M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zM5 9h14v11H5V9z'

function buildIcsHref() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shankar-Shilpa-Wedding//EN',
    'BEGIN:VEVENT',
    'UID:shankar-shilpa-wedding-2026@invitation',
    'DTSTAMP:20260101T000000Z',
    'DTSTART:20261212T115300',
    'DTEND:20261212T121500',
    'SUMMARY:Shankar & Shilpa — Wedding Muhurtham',
    'LOCATION:Chirakkadavu Sree Mahadeva Temple Premises\\, Chirakkadavu\\, Ponkunnam\\, Kottayam',
    'DESCRIPTION:Abhijith Muhurtham — Wedding ceremony of Shankar & Shilpa.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return 'data:text/calendar;charset=utf8,' + encodeURIComponent(ics)
}

const VENUE_MAP = 'Chirakkadavu Sree Mahadeva Temple Ponkunnam Kottayam'

/**
 * Three 3D-tilt glass cards. On hover/focus the card tilts toward the
 * pointer and its details (art, time, button) pop out in Z.
 * The embedded map stays collapsed so the screen fits one viewport.
 */
export default function Events() {
  const icsHref = useMemo(buildIcsHref, [])
  const [mapOpen, setMapOpen] = useState(false)

  return (
    <Screen id="events" tone="dark" bg={<Ambient count={16} />}>
      <GoldAccents variant="a" />
      <div className="container">
        <header className="section-head">
          <Reveal as="p" className="eyebrow">The Wedding Ceremony</Reveal>
          <Reveal as="h2" delay={100}>Saturday, 12th December 2026</Reveal>
          <Reveal as="p" className="sub" delay={150}>1202 Vrischikam 26</Reveal>
        </header>

        <div className="event-grid">
          {/* 1 — Muhurtham */}
          <Reveal className="plx" style={{ '--k': -30 }} delay={0}>
            <Tilt className="event-card glass-3d" tabIndex={0}>
              <div className="event-art pop" style={{ '--z': '50px' }}>
                <img src={handsImg} alt="Wedding hands illustration" width="1536" height="1024" loading="lazy" />
              </div>
              <p className="eyebrow">Muhurtham</p>
              <p className="event-time pop" style={{ '--z': '40px' }}>11:53 AM – 12:15 PM</p>
              <p className="event-note">Abhijith Muhurtham</p>
              <dl className="event-meta pop" style={{ '--z': '20px' }}>
                <div><dt>Date</dt><dd>12 December 2026</dd></div>
                <div><dt>Venue</dt><dd>Chirakkadavu Sree Mahadeva Temple Premises</dd></div>
              </dl>
              <a className="btn btn-gold pop" style={{ '--z': '60px' }} href={icsHref} download="Shankar-Shilpa-Wedding.ics">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d={CAL} /></svg>
                Add to Calendar
              </a>
            </Tilt>
          </Reveal>

          {/* 2 — Venue */}
          <Reveal className="plx" style={{ '--k': -70 }} delay={150}>
            <Tilt className="event-card glass-3d" tabIndex={0}>
              <div className="event-art pop" style={{ '--z': '50px' }}>
                <img src={templeArt} alt="Chirakkadavu Sree Mahadeva Temple" width="1789" height="879" loading="lazy" />
              </div>
              <p className="eyebrow">The Sacred Venue</p>
              <p className="event-title pop" style={{ '--z': '40px' }}>Chirakkadavu Sree<br />Mahadeva Temple Premises</p>
              <p className="event-note">Chirakkadavu, Ponkunnam, Kottayam</p>
              <a
                className="btn btn-gold pop"
                style={{ '--z': '60px' }}
                href="https://www.google.com/maps/search/?api=1&query=Chirakkadavu+Sree+Mahadeva+Temple+Ponkunnam+Kottayam"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d={PIN} /></svg>
                View Location
              </a>
            </Tilt>
          </Reveal>

          {/* 3 — Grihapravesham */}
          <Reveal className="plx" style={{ '--k': -45 }} delay={300}>
            <Tilt className="event-card glass-3d" tabIndex={0}>
              <div className="event-art event-art-icon pop" style={{ '--z': '50px' }} aria-hidden="true">
                <svg viewBox="0 0 220 150" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
                  <path d="M20 78 110 18l90 60" />
                  <path d="M38 70v66h144V70" />
                  <path d="M92 136V96h36v40" />
                  <path d="M150 50V28h14v34" />
                  <circle cx="110" cy="62" r="7" />
                </svg>
              </div>
              <p className="eyebrow">Grihapravesham</p>
              <p className="event-time pop" style={{ '--z': '40px' }}>Before 4:00 PM</p>
              <p className="event-note">At the Groom's Residence</p>
              <p className="event-title small">Vayambukunnel</p>
              <p className="event-note">Kizhakkumbhagom, Chirakkadavu</p>
              <a
                className="btn btn-gold pop"
                style={{ '--z': '60px' }}
                href="https://www.google.com/maps/search/?api=1&query=Vayambukunnel+House+Kizhakkumbhagom+Chirakkadavu+Ponkunnam"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d={PIN} /></svg>
                Get Directions
              </a>
            </Tilt>
          </Reveal>
        </div>

        <Reveal className="map-toggle" delay={200}>
          <button className="btn btn-ghost" onClick={() => setMapOpen((o) => !o)} aria-expanded={mapOpen}>
            {mapOpen ? 'Hide map' : 'Show venue map'}
          </button>
        </Reveal>
        {/* grid-rows 0fr -> 1fr animates the height without layout jumps */}
        <div className={`map-drawer${mapOpen ? ' open' : ''}`}>
          <div className="map-clip">
            <div className="map-wrap glass">
              {mapOpen && (
                <iframe
                  title="Map to Chirakkadavu Sree Mahadeva Temple"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(VENUE_MAP)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
