import { useState } from 'react'
import useGuestName from '../hooks/useGuestName.js'
import ganapathyLogo from '../assets/ganapathy-logo.png'

/**
 * Opening "curtain": two ebony panels part like grand doors.
 * Hairline gold frame, centre monogram, and a pulsing ring on the CTA.
 */
export default function Gate({ onOpen }) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const guestName = useGuestName()

  const handleOpen = () => {
    if (open) return
    setOpen(true)
    onOpen?.()
    setTimeout(() => setHidden(true), 1400)
  }

  if (hidden) return null

  return (
    <div
      className={`gate${open ? ' open' : ''}`}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpen()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the invitation"
    >
      <div className="gate-panel left" />
      <div className="gate-panel right" />
      <div className="gate-content">
        <img src={ganapathyLogo} alt="" width="54" height="54" className="gate-logo" />
        {guestName && <p className="gate-guest">Dear {guestName}</p>}
        <p className="gate-names">
          Sankar <span className="gate-amp">&amp;</span> Silpa
        </p>
        <span className="gate-line" />
        <p className="gate-tap">
          <span className="gate-ring" />
          Tap to open
        </p>
      </div>
    </div>
  )
}
