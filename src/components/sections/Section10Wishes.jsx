import { useEffect, useState } from 'react'
import Reveal from '../Reveal.jsx'

const STORAGE_KEY = 'shankar-shilpa-wishes'

const SEED_WISHES = [
  {
    name: 'Anand & Family',
    attending: 'joyfully',
    message: 'Wishing Shankar and Shilpa a lifetime of laughter, joy and togetherness! Excited for the wedding.',
    ts: 1700000000000,
  },
  {
    name: 'Sreekutty',
    attending: 'joyfully',
    message: 'Heartiest congratulations to the lovely couple! May God bless your new journey together.',
    ts: 1700000100000,
  },
]

function loadWishes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return parsed.length > 0 ? parsed : SEED_WISHES
    }
  } catch {
    // fallback
  }
  return SEED_WISHES
}

export default function Section10Wishes() {
  const [wishes, setWishes] = useState([])
  const [name, setName] = useState('')
  const [attending, setAttending] = useState('joyfully')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setWishes(loadWishes())
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const entry = {
      name: name.trim(),
      attending,
      message: message.trim(),
      ts: Date.now(),
    }
    const next = [entry, ...wishes]
    setWishes(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // storage full or unavailable — the wish still shows for this session
    }
    setName('')
    setMessage('')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="p10" data-tone="blush">
      <Reveal as="div" className="seam" />
      <div className="sec-bg">
        <div
          className="glow"
          style={{ width: 240, height: 240, left: -40, top: -40, background: 'var(--gold-light)', opacity: 0.22 }}
        />
      </div>

      <Reveal as="p" className="eyebrow reveal">RSVP &amp; Wishes</Reveal>
      <Reveal as="h2" className="reveal" style={{ fontSize: 'clamp(1.6rem,6vw,2rem)' }}>
        Let us know you're coming
      </Reveal>

      <Reveal as="form" className="wishes-form reveal d1" onSubmit={submit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={60}
        />

        <div className="rsvp-options">
          {[
            { v: 'joyfully', label: 'Joyfully accepts' },
            { v: 'maybe', label: 'Hopes to make it' },
            { v: 'regret', label: 'Sends love from afar' },
          ].map((opt) => (
            <label key={opt.v} className={attending === opt.v ? 'active' : ''}>
              <input
                type="radio"
                name="attending"
                value={opt.v}
                checked={attending === opt.v}
                onChange={() => setAttending(opt.v)}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <textarea
          placeholder="Leave a wish for Shankar & Shilpa (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={280}
          rows={3}
        />

        <button type="submit" className="celebrate-btn">
          {sent ? 'THANK YOU ✦' : 'SEND'}
        </button>
      </Reveal>

      {wishes.length > 0 && (
        <div className="wishes-list">
          {wishes.slice(0, 12).map((w) => (
            <div className="wish-card" key={w.ts}>
              <p className="wish-name">
                {w.name}
                <span className={`wish-tag tag-${w.attending}`}>
                  {w.attending === 'joyfully' ? 'Attending' : w.attending === 'maybe' ? 'Maybe' : 'Sending love'}
                </span>
              </p>
              {w.message && <p className="wish-message">"{w.message}"</p>}
            </div>
          ))}
        </div>
      )}

      <p className="foot-note" style={{ marginTop: 28, fontStyle: 'italic', letterSpacing: '0.08em' }}>
        Your love &amp; presence are our greatest gift ♥
      </p>
    </section>
  )
}

