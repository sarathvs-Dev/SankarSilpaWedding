import Reveal from '../Reveal.jsx'
import Drift from '../Drift.jsx'
import Countdown from '../Countdown.jsx'
import useGuestName from '../../hooks/useGuestName.js'
import mandapamBg from '../../assets/mandapam-bg.png'

export default function Section1Opening({ onOpenShare }) {
  const guestName = useGuestName()

  return (
    <section id="p1" data-tone="light">
      <div
        className="sec-bg"
        style={{ backgroundImage: `url(${mandapamBg})` }}
      >
        <div className="sec-bg-overlay" />
        <div className="layer pat-mandala">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <use href="#mandala" />
          </svg>
        </div>
        <div className="glow" style={{ width: 260, height: 260, left: -60, top: -60, background: 'var(--gold-light)' }} />
        <div
          className="glow"
          style={{ width: 220, height: 220, right: -50, bottom: -30, background: 'var(--maroon)', opacity: 0.16, animationDelay: '-6s' }}
        />
      </div>

      <Drift count={16} variant="particles" />

      <svg className="corner tl" viewBox="0 0 40 40"><use href="#corner-flourish" /></svg>
      <svg className="corner tr" viewBox="0 0 40 40"><use href="#corner-flourish" /></svg>
      <svg className="corner bl" viewBox="0 0 40 40"><use href="#corner-flourish" /></svg>
      <svg className="corner br" viewBox="0 0 40 40"><use href="#corner-flourish" /></svg>

      <Reveal as="svg" width="46" height="66" viewBox="0 0 60 90" className="reveal">
        <use href="#brass-lamp" />
      </Reveal>

      {guestName && (
        <Reveal as="p" className="guest-greeting reveal d1">Dear {guestName},</Reveal>
      )}

      <Reveal as="p" className="eyebrow reveal d1">Together with our families</Reveal>
      <Reveal as="p" className="lede reveal d1">
        we cordially invite you to join us in celebrating the auspicious wedding ceremony of
      </Reveal>

      <Reveal as="h1" className="names reveal d2">
        SANKAR
        <span className="amp">&amp;</span>
        SHILPA
      </Reveal>

      <Reveal as="svg" className="divider reveal d2" viewBox="0 0 100 40">
        <use href="#lotus" />
      </Reveal>

      <Reveal as="p" className="date-pill reveal d3">12 · DECEMBER · 2026</Reveal>

      <Reveal as="div" className="reveal d3">
        <Countdown />
      </Reveal>

      <Reveal as="div" className="reveal d3" style={{ marginTop: 18 }}>
        <button className="share-trigger-btn" onClick={onOpenShare}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
          </svg>
          PERSONALIZE &amp; SHARE INVITATION
        </button>
      </Reveal>
    </section>
  )
}