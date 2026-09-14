import { useMemo } from 'react'
import Reveal from '../Reveal.jsx'
import Drift from '../Drift.jsx'

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

export default function Section5Ceremony() {
  const icsHref = useMemo(buildIcsHref, [])

  return (
    <section id="p5" data-tone="dark">
      <Reveal as="div" className="seam" opacity={1} />
      <div className="sec-bg">
        <div
          className="glow glow-lift"
          style={{ width: 280, height: 280, left: '50%', top: 0, transform: 'translateX(-50%)', background: 'var(--gold)', opacity: 0.35 }}
        />
        <div
          className="glow glow-lift"
          style={{ width: 200, height: 200, left: '10%', bottom: -30, background: 'var(--emerald)', opacity: 0.3, animationDelay: '-5s' }}
        />
        <Drift count={14} variant="embers" />
      </div>

      <Reveal as="p" className="eyebrow reveal">The Wedding Ceremony</Reveal>
      <Reveal as="h2" className="reveal" style={{ fontSize: 'clamp(1.7rem,6.4vw,2.1rem)', maxWidth: '16ch' }}>
        Saturday, 12th December 2026
      </Reveal>
      <Reveal as="p" className="lede reveal" style={{ marginTop: 6, fontSize: '0.92rem' }}>1202 Vrischikam 26</Reveal>

      <Reveal as="div" className="time-card reveal d1">
        <svg width="34" height="48" viewBox="0 0 60 90" style={{ margin: '0 auto 10px', display: 'block', filter: 'url(#rough-soft)' }}>
          <use href="#brass-lamp" />
        </svg>
        <p className="muh">MUHURTHAM</p>
        <p className="time">11:53 AM – 12:15 PM</p>
        <p className="muh" style={{ marginTop: 10 }}>ABHIJITH MUHURTHAM</p>
        <a className="cal-btn" href={icsHref} download="Shankar-Shilpa-Wedding.ics">
          <svg viewBox="0 0 24 24"><path d="M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zM5 9h14v11H5V9z" /></svg>
          ADD TO CALENDAR
        </a>
      </Reveal>
    </section>
  )
}
