import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import GoldAccents from '../GoldAccents.jsx'

export default function Blessings() {
  return (
    <Screen id="blessings" tone="silk">
      <GoldAccents variant="b" />
      <div className="container narrow">
        <header className="section-head">
          <Reveal as="p" className="eyebrow">Warmly inviting you</Reveal>
          <Reveal className="ornament" delay={100} aria-hidden="true"><i /><b /><i /></Reveal>
        </header>

        <div className="fam-grid">
          <Reveal className="fam-card glass-frost plx" style={{ '--k': -40 }} delay={0}>
            <p className="tag">Groom's Family</p>
            <p className="who">Mr. Sivadas V.R. &amp; Mrs. Siju P.N.</p>
            <p className="addr">Vayambukunnel House, Mannarakkayam P.O<br />Ponkunnam, Kottayam</p>
          </Reveal>
          <Reveal as="p" className="fam-amp" delay={150} aria-hidden="true">&amp;</Reveal>
          <Reveal className="fam-card glass-frost plx" style={{ '--k': -70 }} delay={300}>
            <p className="tag">Bride's Family</p>
            <p className="who">Mr. Premkumar C.S. &amp; Mrs. Lalimol S.</p>
            <p className="addr">Choondacheril House, Chirakkadavu East P.O<br />Ponkunnam, Kottayam</p>
          </Reveal>
        </div>
      </div>
    </Screen>
  )
}
