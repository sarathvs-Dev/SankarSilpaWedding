import { useMemo, useState } from 'react'
import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Tilt from '../Tilt.jsx'
import Ambient from '../Ambient.jsx'
import GoldAccents from '../GoldAccents.jsx'
import InviteDownload from '../InviteDownload.jsx'
import handsImg from '../../assets/wedding-hands.png'
import templeArt from '../../assets/temple-watercolor.png'

const PIN = 'M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z'
const CAL = 'M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zM5 9h14v11H5V9z'

function buildIcsHref() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sankar-Silpa-Wedding//EN',
    'BEGIN:VEVENT',
    'UID:sankar-silpa-wedding-2026@invitation',
    'DTSTAMP:20260101T000000Z',
    'DTSTART:20261212T115000',
    'DTEND:20261212T121500',
    'SUMMARY:Sankar & Silpa — Wedding',
    'LOCATION:Chirakkadavu Sree Mahadeva Temple\\, Ponkunnam\\, Kottayam',
    'DESCRIPTION:Wedding ceremony of Sankar & Silpa. Departure time: 10:15 AM.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return 'data:text/calendar;charset=utf8,' + encodeURIComponent(ics)
}

const VENUE_MAP = 'Chirakkadavu Sree Mahadeva Temple Ponkunnam Kottayam'

/**
 * Two 3D-tilt glass cards (ceremony + venue). On hover/focus the card tilts
 * toward the pointer and its details (art, time, button) pop out in Z.
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
          <Reveal as="p" className="sub" delay={150}>26 Vrischikam 1202</Reveal>
        </header>

        <div className="event-grid">
          {/* 1 — Ceremony */}
          <Reveal className="plx" style={{ '--k': -30 }} delay={0}>
            <Tilt className="event-card glass-3d" tabIndex={0}>
              <div className="event-art pop" style={{ '--z': '50px' }}>
                <img src={handsImg} alt="Wedding hands illustration" width="1536" height="1024" loading="lazy" />
              </div>
              <p className="eyebrow">Wedding Ceremony</p>
              <p className="event-time pop" style={{ '--z': '40px' }}>11:50 AM – 12:15 PM</p>
              <dl className="event-meta pop" style={{ '--z': '20px' }}>
                <div><dt>Date</dt><dd>Saturday, 12 December 2026</dd></div>
                <div><dt>Departure Time</dt><dd>10:15 AM</dd></div>
              </dl>
              <a className="btn btn-gold pop" style={{ '--z': '60px' }} href={icsHref} download="Sankar-Silpa-Wedding.ics">
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
              <p className="eyebrow">At</p>
              <p className="event-title pop" style={{ '--z': '40px' }}>Chirakkadavu Sree<br />Mahadeva Temple</p>
              <p className="event-note">Ponkunnam, Kottayam</p>
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
        </div>

        <Reveal className="event-actions" delay={200}>
          <button className="btn btn-ghost" onClick={() => setMapOpen((o) => !o)} aria-expanded={mapOpen}>
            {mapOpen ? 'Hide map' : 'Show venue map'}
          </button>
          <InviteDownload />
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
