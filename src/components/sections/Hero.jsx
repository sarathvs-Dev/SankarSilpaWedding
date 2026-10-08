import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Ambient from '../Ambient.jsx'
import Countdown from '../Countdown.jsx'
import InviteDownload from '../InviteDownload.jsx'
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
          <span className="shimmer">Sankar</span>
          <em>&amp;</em>
          <span className="shimmer">Silpa</span>
        </Reveal>

        <Reveal as="p" className="date-pill" delay={500}>12 · December · 2026</Reveal>

        <Reveal delay={600}>
          <Countdown />
        </Reveal>

        <Reveal className="hero-actions" delay={700}>
          <InviteDownload />
          {/* Personalize & Share button hidden for now — restore: <button className="btn btn-ghost" onClick={onOpenShare}>Personalize &amp; Share Invitation</button> */}
        </Reveal>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span /></div>
    </Screen>
  )
}
