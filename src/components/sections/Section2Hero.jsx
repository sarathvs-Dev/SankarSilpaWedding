import { useEffect, useRef } from 'react'
import Reveal from '../Reveal.jsx'
import heroImg from '../../assets/ARJ01736_resized.jpg'


export default function Section2Hero() {
  const imgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const img = imgRef.current
      if (!img) return
      const r = img.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = 1 - Math.min(Math.max(r.top / vh, 0), 1)
      img.style.transform = `scale(${1.06 + progress * 0.05})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="p2" data-tone="blush">
      <Reveal as="div" className="seam" />
      <div className="sec-bg">
        <div
          className="glow"
          style={{ width: 300, height: 300, left: '50%', top: '10%', transform: 'translateX(-50%)', background: 'var(--gold-light)' }}
        />
        <div
          className="glow"
          style={{ width: 180, height: 180, left: '8%', bottom: -40, background: 'var(--green)', opacity: 0.16, animationDelay: '-4s' }}
        />
      </div>

      <div className="split">
        <div className="split-media">
          <Reveal as="p" className="eyebrow reveal-left">Two hearts</Reveal>
          <Reveal as="div" className="photo-wrap frame-gold reveal-left">
            <div className="photo-inner">
              <img ref={imgRef} src={heroImg} alt="Shankar and Shilpa" />
            </div>
          </Reveal>
        </div>
        <div className="split-text">
          <Reveal as="p" className="lede reveal-right" style={{ fontStyle: 'italic' }}>
            Two hearts,<br />one beautiful beginning
          </Reveal>
          <Reveal as="p" className="eyebrow reveal-right" style={{ marginTop: 14, color: 'var(--maroon)' }}>
            SHANKAR &amp; SHILPA
          </Reveal>
        </div>
      </div>
    </section>
  )
}
