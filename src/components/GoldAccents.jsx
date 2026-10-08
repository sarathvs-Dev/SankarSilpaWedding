/**
 * Geometric gold line-work (ring, diamond, hairline) that sits behind the
 * cards and scrolls SLOWER than them (positive --k = background layer),
 * giving the foreground real parallax depth.
 */
export default function GoldAccents({ variant = 'a' }) {
  return (
    <div className={`accents accents-${variant}`} aria-hidden="true">
      <span className="acc ring plx" style={{ '--k': 90 }} />
      <span className="acc diamond plx" style={{ '--k': 150 }} />
      <span className="acc hair plx" style={{ '--k': 60 }} />
    </div>
  )
}
