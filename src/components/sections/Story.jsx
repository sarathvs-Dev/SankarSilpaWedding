import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Ambient from '../Ambient.jsx'
import GoldAccents from '../GoldAccents.jsx'
import familyImg from '../../assets/family.jpg'
import ringsImg from '../../assets/ARJ04075_resized.jpg'
import blessedImg from '../../assets/ARJ02077_resized.jpg'

// Entries reuse the invitation's existing copy.
// k = parallax factor in px (negative = moves FASTER than the page, i.e. foreground).
const STEPS = [
  {
    eyebrow: 'The beginning of', title: 'Forever',
    text: 'With the love of our families, we begin our journey together.',
    img: familyImg, alt: 'Engagement ceremony with family', w: 1000, h: 1499, k: -90,
  },
  {
    eyebrow: 'Two hearts', title: 'One beautiful beginning',
    text: 'With hearts full of gratitude and joy, we invite you to witness the beginning of a story written in two names, blessed by family, and carried forward together from this day on.',
    img: ringsImg, alt: 'Wedding rings and mehendi', w: 2560, h: 1707, k: -150,
  },
  {
    eyebrow: 'Saturday, 12th December 2026', title: 'The day we say yes',
    text: 'The wedding ceremony at 11:50 AM at Chirakkadavu Sree Mahadeva Temple, Ponkunnam.',
    img: blessedImg, alt: 'Sankar and Silpa', w: 1707, h: 2560, k: -60,
  },
]

/**
 * Multi-layer depth: giant outlined word (slowest, back) -> photos
 * (fastest, front, each at its own speed) -> text (in between).
 */
export default function Story() {
  return (
    <Screen id="story" tone="silk">
      <GoldAccents variant="b" />
      <div className="story-bgtext plx" style={{ '--k': 120 }} aria-hidden="true">Forever</div>

      <div className="container">
        <header className="section-head">
          <Reveal as="p" className="eyebrow">Our Story</Reveal>
          <Reveal as="h2" delay={100}>Two names, one story</Reveal>
        </header>

        <ol className="timeline">
          {STEPS.map((s, i) => (
            <li className="tl-item" key={s.title}>
              <Reveal className="tl-media plx" style={{ '--k': s.k }} variant="zoom" delay={i * 120}>
                <div className="img-frame">
                  <img src={s.img} alt={s.alt} width={s.w} height={s.h} loading="lazy" />
                </div>
              </Reveal>
              <span className="tl-node" aria-hidden="true" />
              <Reveal className="tl-text plx" style={{ '--k': s.k / 3 }} delay={i * 120 + 150}>
                <p className="eyebrow">{s.eyebrow}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Screen>
  )
}
