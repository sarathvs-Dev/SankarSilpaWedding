import { useEffect, useState } from 'react'
import Reveal from '../Reveal.jsx'
import Screen from '../Screen.jsx'
import Ambient from '../Ambient.jsx'
import BgPhoto from '../BgPhoto.jsx'
import GoldAccents from '../GoldAccents.jsx'
import photo from '../../assets/ARJ00743_resized.jpg'

const STORAGE_KEY = 'shankar-shilpa-wishes'

const SEED_WISHES = [
  {
    name: 'Anand & Family',
    attending: 'joyfully',
    message: 'Wishing Sankar and Silpa a lifetime of laughter, joy and togetherness! Excited for the wedding.',
    ts: 1700000000000,
  },
  {
    name: 'Sreekutty',
    attending: 'joyfully',
    message: 'Heartiest congratulations to the lovely couple! May God bless your new journey together.',
    ts: 1700000100000,
  },
]

const OPTIONS = [
  { v: 'joyfully', label: 'Joyfully accepts' },
  { v: 'maybe', label: 'Hopes to make it' },
  { v: 'regret', label: 'Sends love from afar' },
]
const TAG = { joyfully: 'Attending', maybe: 'Maybe', regret: 'Sending love' }

function loadWishes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return parsed.length > 0 ? parsed : SEED_WISHES
    }
  } catch {
    // fall through to seed
  }
  return SEED_WISHES
}

/**
 * RSVP: same fields as before (name, attendance, wish). The glass card
 * "unfolds" from its top edge as the screen enters (variant="unfold").
 * Fields:
 *  - floating labels (CSS :placeholder-shown trick, placeholder=" ")
 *  - custom radio "pills" (native input hidden, label styled via :checked)
 */
export default function Rsvp() {
  const [wishes, setWishes] = useState([])
  const [name, setName] = useState('')
  const [attending, setAttending] = useState('joyfully')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => setWishes(loadWishes()), [])

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const entry = { name: name.trim(), attending, message: message.trim(), ts: Date.now() }
    const next = [entry, ...wishes]
    setWishes(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // storage full/unavailable — wish still shows for this session
    }
    setName('')
    setMessage('')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <Screen id="rsvp" tone="velvet" bg={<><BgPhoto src={photo} position="center 25%" /><Ambient count={30} variant="stars" /></>}>
      <GoldAccents variant="a" />
      <div className="container rsvp-wrap">
        <header className="section-head">
          <Reveal as="p" className="eyebrow">RSVP &amp; Wishes</Reveal>
          <Reveal as="h2" delay={100}>Let us know you're coming</Reveal>
        </header>

        <div className="rsvp-cols">
        <Reveal as="form" className="rsvp-form glass-3d" onSubmit={submit} delay={100} variant="unfold">
          <div className="field">
            <input
              id="rsvp-name"
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={60}
              autoComplete="name"
            />
            <label htmlFor="rsvp-name">Your name</label>
          </div>

          <fieldset className="choices">
            <legend>Will you join us?</legend>
            {OPTIONS.map((o) => (
              <label key={o.v} className="choice">
                <input
                  type="radio"
                  name="attending"
                  value={o.v}
                  checked={attending === o.v}
                  onChange={() => setAttending(o.v)}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </fieldset>

          <div className="field">
            <textarea
              id="rsvp-msg"
              placeholder=" "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={280}
              rows={3}
            />
            <label htmlFor="rsvp-msg">Leave a wish for Sankar &amp; Silpa (optional)</label>
          </div>

          <button type="submit" className="btn btn-gold btn-block">
            {sent ? 'Thank you ✦' : 'Send'}
          </button>
        </Reveal>

        {wishes.length > 0 && (
          <div className="wishes" tabIndex={0} aria-label="Wishes from guests">
            {wishes.slice(0, 12).map((w, i) => (
              <Reveal className="wish glass" key={w.ts} delay={(i % 3) * 80}>
                <p className="wish-name">
                  {w.name}
                  <span className={`wish-tag tag-${w.attending}`}>{TAG[w.attending]}</span>
                </p>
                {w.message && <p className="wish-msg">“{w.message}”</p>}
              </Reveal>
            ))}
          </div>
        )}
        </div>

        <Reveal as="p" className="foot-note" delay={100}>
          Your love &amp; presence are our greatest gift ♥
        </Reveal>
      </div>
    </Screen>
  )
}
