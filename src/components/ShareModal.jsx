import { useState } from 'react'

export default function ShareModal({ isOpen, onClose }) {
  const [guestInput, setGuestInput] = useState('')
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const baseUrl = window.location.origin + window.location.pathname
  const shareUrl = guestInput.trim()
    ? `${baseUrl}?name=${encodeURIComponent(guestInput.trim())}`
    : baseUrl

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const shareWhatsApp = () => {
    const text = guestInput.trim()
      ? `Dear ${guestInput.trim()},\n\nWe cordially invite you to the wedding ceremony of Shankar & Shilpa on 12th December 2026 at Chirakkadavu!\n\nView your personalized invitation here:\n${shareUrl}`
      : `We cordially invite you to the wedding ceremony of Shankar & Shilpa on 12th December 2026 at Chirakkadavu!\n\nView invitation here:\n${shareUrl}`

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
    window.open(waUrl, '_blank')
  }

  return (
    <div className="share-modal-backdrop" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close share dialog">
          ×
        </button>
        <h3>Personalize &amp; Share Invitation</h3>
        <p className="share-desc">Enter guest name to generate a custom WhatsApp invitation link</p>

        <input
          type="text"
          className="share-input"
          placeholder="Guest Name (e.g. Anand & Family)"
          value={guestInput}
          onChange={(e) => setGuestInput(e.target.value)}
          maxLength={50}
        />

        <div className="share-url-preview">
          <code>{shareUrl}</code>
        </div>

        <div className="share-actions">
          <button className="btn btn-gold" onClick={copyToClipboard}>
            {copied ? 'COPIED! ✓' : 'COPY LINK'}
          </button>
          <button className="btn btn-ghost-dark" onClick={shareWhatsApp}>
            <svg viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            SHARE VIA WHATSAPP
          </button>
        </div>
      </div>
    </div>
  )
}
