import { useMemo } from 'react'
import confetti from 'canvas-confetti'
import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Ambient from '../Ambient.jsx'
import InviteDownload from '../InviteDownload.jsx'
import closingBg from '../../assets/endBg.png'

export default function Closing() {
  // falling petals: randomised once, animated purely in CSS (@keyframes fall)
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 96,
        delay: -Math.random() * 12,
        duration: 8 + Math.random() * 8,
        size: 10 + Math.random() * 12,
        dx: Math.random() * 60 - 30,
      })),
    []
  )

  const celebrate = () => {
    const colors = ['#D4AF37', '#E8D38A', '#C5A059', '#F7F4EF', '#D9A5A0']
    confetti({ particleCount: 90, spread: 80, startVelocity: 32, scalar: 0.9, origin: { y: 0.7 }, colors })
    setTimeout(() => confetti({ particleCount: 70, spread: 100, origin: { y: 0.6 }, colors, scalar: 0.8 }), 250)
  }

  const bg = (
    <>
      <img src={closingBg} alt="" className="closing-bg" width="1672" height="941" loading="lazy" />
      <div className="closing-scrim" />
      <div className="light-leak" />
      <Ambient count={40} variant="stars" />
      <div className="petals">
        {petals.map((p) => (
          <i
            key={p.id}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.3,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--dx': `${p.dx}px`,
            }}
          />
        ))}
      </div>
    </>
  )

  return (
    <Screen id="closing" tone="hero" className="closing" bg={bg}>
      <div className="container narrow closing-inner">
        <Reveal as="p" className="eyebrow">Together Forever</Reveal>
        <Reveal as="h2" className="closing-title" delay={100} variant="zoom">
          Sankar <em className="amp">&amp;</em> Silpa
        </Reveal>
        <Reveal as="p" className="closing-sub" delay={200}>
          With love and blessings,<br />we look forward to celebrating with you.
        </Reveal>
        <Reveal className="ornament" delay={250} aria-hidden="true"><i /><b /><i /></Reveal>

        <Reveal className="closing-actions" delay={300}>
          <button className="btn btn-gold" onClick={celebrate}>
            Celebrate with us <span aria-hidden="true">→</span>
          </button>
          <InviteDownload />
        </Reveal>

        <Reveal className="closing-meta" delay={400}>
          <span>12 · 12 · 2026</span>
          <i aria-hidden="true" />
          <span>Chirakkadavu, Kottayam</span>
        </Reveal>
      </div>
    </Screen>
  )
}
