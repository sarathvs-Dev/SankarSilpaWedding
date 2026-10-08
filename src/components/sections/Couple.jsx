import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Tilt from '../Tilt.jsx'
import groomImg from '../../assets/ARJ01626_resized.jpg'
import brideImg from '../../assets/ARJ01182_resized.jpg'

const PEOPLE = [
  {
    name: 'Shankar', role: 'Groom', img: groomImg, alt: 'Shankar — Groom',
    rel: 'Son of', parents: ['Mrs. P.N. Siju', 'Mr. V.R. Shivadas'], house: 'Vayambukunnel', k: -40,
  },
  {
    name: 'Shilpa', role: 'Bride', img: brideImg, alt: 'Shilpa — Bride',
    rel: 'Daughter of', parents: ['Mrs. S. Lalimol', 'Mr. C.S. Premkumar'], house: 'Chundacheril', k: -80,
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
          <Reveal as="h2" delay={100}>Shankar <em className="amp">&amp;</em> Shilpa</Reveal>
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
