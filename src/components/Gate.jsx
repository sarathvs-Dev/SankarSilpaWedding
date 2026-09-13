import { useState } from 'react'
import useGuestName from '../hooks/useGuestName.js'

export default function Gate({ onOpen }) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const guestName = useGuestName()

  const handleOpen = () => {
    if (open) return
    setOpen(true)
    onOpen?.()
    setTimeout(() => setHidden(true), 1200)
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
      <div className="gate-panel left">
        <div className="gate-texture" />
      </div>
      <div className="gate-panel right">
        <div className="gate-texture" />
      </div>
      <div className="gate-content">
        <svg width="40" height="58" viewBox="0 0 60 90" style={{ filter: 'url(#rough-soft)' }}>
          <use href="#brass-lamp" />
        </svg>
        {guestName && <p className="gate-guest">Dear {guestName}</p>}
        <p className="gate-names">
          SHANKAR <span className="gate-amp">&amp;</span> SHILPA
        </p>
        <p className="gate-tap">TAP TO OPEN</p>
      </div>
    </div>
  )
}
