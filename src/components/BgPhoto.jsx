/**
 * Darkened photo backdrop. It lives in <Screen bg>, so the screen's "camera"
 * (scale-up + slower drift while scrolling between screens) applies to it.
 */
export default function BgPhoto({ src, position = 'center', tint = 'rgba(11,11,11,.84)' }) {
  return (
    <div className="bg-photo">
      <img src={src} alt="" loading="lazy" decoding="async" style={{ objectPosition: position }} />
      <span style={{ background: tint }} />
    </div>
  )
}
