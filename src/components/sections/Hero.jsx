import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Ambient from '../Ambient.jsx'
import Countdown from '../Countdown.jsx'
import useGuestName from '../../hooks/useGuestName.js'
import heroImg from '../../assets/ARJ01736_resized.jpg'
import ganapathyLogo from '../../assets/ganapathy-logo.png'

/**
 * Hero screen.
 *  - Load: photo starts at 1.7x and "deep-zooms" back once the gate opens
 *    (CSS @keyframes deepZoom, held paused by body.locked).
 *  - Scroll exit: photo keeps zooming + drifts slower than the page while
 *    the copy lifts faster (parallax layer separation, via --sp/--ap).
 */
export default function Hero({ onOpenShare }) {
  const guestName = useGuestName()

  const bg = (
    <>
      <div className="hero-media">
        <img src={heroImg} alt="" width="2560" height="1707" fetchpriority="high" />
      </div>
      <div className="hero-scrim" />
      <div className="light-leak" />
      <Ambient count={46} variant="stars" k={40} />
      <Ambient count={18} k={-90} />
    </>
  )

  return (
    <Screen id="home" tone="hero" className="hero" bg={bg}>
      <div className="hero-inner plx" style={{ '--k': -70 }}>
        <Reveal variant="zoom">
          <img src={ganapathyLogo} alt="Ganapathy" width="64" height="64" className="hero-logo" />
        </Reveal>

        {guestName && (
          <Reveal className="hero-guest" delay={100}>
            <p>Dear {guestName},</p>
          </Reveal>
        )}

        <Reveal as="p" className="eyebrow" delay={150}>Together with our families</Reveal>
        <Reveal as="p" className="hero-lede" delay={250}>
          we cordially invite you to join us in celebrating the auspicious wedding ceremony of
        </Reveal>

        <Reveal as="h1" className="hero-names" delay={350} variant="zoom">
          <span className="shimmer">Shankar</span>
          <em>&amp;</em>
          <span className="shimmer">Shilpa</span>
        </Reveal>

        <Reveal as="p" className="date-pill" delay={500}>12 · December · 2026</Reveal>

        <Reveal delay={600}>
          <Countdown />
        </Reveal>

        <Reveal delay={700}>
          <button className="btn btn-ghost" onClick={onOpenShare}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
            </svg>
            Personalize &amp; Share Invitation
          </button>
        </Reveal>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span /></div>
    </Screen>
  )
}
