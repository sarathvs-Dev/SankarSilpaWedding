import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Tilt from '../Tilt.jsx'
import groomImg from '../../assets/ARJ01626_resized.jpg'
import brideImg from '../../assets/ARJ01182_resized.jpg'

const PEOPLE = [
  {
    name: 'Sankar', role: 'Groom', img: groomImg, alt: 'Sankar — Groom',
    rel: 'Son of', parents: ['Mr. Sivadas V.R.', 'Mrs. Siju P.N.'], house: 'Vayambukunnel', k: -40,
  },
  {
    name: 'Silpa', role: 'Bride', img: brideImg, alt: 'Silpa — Bride',
    rel: 'Daughter of', parents: ['Mr. Premkumar C.S.', 'Mrs. Lalimol S.'], house: 'Choondacheril', k: -80,
  },
]

/** The one "Soft Silk" screen — a light, airy breath between the dark ones. */
export default function Couple() {
  return (
    <Screen id="couple" tone="ivory">
      <div className="couple-ghost plx" style={{ '--k': 90 }} aria-hidden="true">S&amp;S</div>
      <div className="container">
        <header className="section-head">
          <Reveal as="p" className="eyebrow">The Couple</Reveal>
          <Reveal as="h2" delay={100}>Sankar <em className="amp">&amp;</em> Silpa</Reveal>
        </header>

        <div className="couple-grid">
          {PEOPLE.map((p, i) => (
            <Reveal className="plx" style={{ '--k': p.k }} key={p.name} delay={i * 150} variant="zoom">
              <Tilt className="couple-card glass-3d glass-3d-light" max={6}>
                <div className="arch pop" style={{ '--z': '30px' }}>
                  <img src={p.img} alt={p.alt} width="1707" height="2560" loading="lazy" />
                </div>
                <div className="couple-copy">
                  <p className="eyebrow">{p.role}</p>
                  <h3>{p.name}</h3>
                  <p className="rel">{p.rel}</p>
                  <p className="parents">
                    {p.parents[0]}<br /><span>&amp;</span><br />{p.parents[1]}
                  </p>
                  <p className="house">{p.house}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </Screen>
  )
}
