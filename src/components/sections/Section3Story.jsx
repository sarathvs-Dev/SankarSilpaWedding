import Reveal from '../Reveal.jsx'
import familyImg from '../../assets/family.jpg'
import ringsImg from '../../assets/ARJ04075_resized.jpg'

export default function Section3Story() {
  return (
    <section id="p3" data-tone="ivory-deep" className="story-section">
      <Reveal as="div" className="seam" />

      <div className="story-wrap">
        <div className="story-media">
          <div className="story-photo-group">
            <Reveal as="div" className="story-photo reveal-right">
              <img src={familyImg} alt="Engagement ceremony with family" />
            </Reveal>

            <Reveal as="div" className="story-photo-small reveal-right d2">
              <img src={ringsImg} alt="Wedding rings and mehendi" />
            </Reveal>
          </div>
        </div>

        <div className="story-text">
          <Reveal as="p" className="eyebrow reveal-left">The beginning of</Reveal>
          <Reveal as="h2" className="story-heading reveal-left">Forever</Reveal>
          <Reveal as="svg" className="divider reveal-left" viewBox="0 0 100 40">
            <use href="#lotus" />
          </Reveal>
          <Reveal as="p" className="lede reveal-left">
            With the love of our families,<br />we begin our journey together.
          </Reveal>
        </div>
      </div>
    </section>
  )
}