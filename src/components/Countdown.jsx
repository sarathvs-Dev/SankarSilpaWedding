import { useEffect, useState } from 'react'

// 12 Dec 2026, 11:53 AM IST — written with an explicit offset so the
// countdown is correct no matter where the guest is viewing it from.
const TARGET = new Date('2026-12-12T11:53:00+05:30').getTime()

function getParts() {
  const diff = Math.max(0, TARGET - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, done: diff <= 0 }
}

export default function Countdown() {
  const [parts, setParts] = useState(getParts)

  useEffect(() => {
    const id = setInterval(() => setParts(getParts()), 1000)
    return () => clearInterval(id)
  }, [])

  if (parts.done) {
    return <p className="countdown-done">Today is the day — see you there!</p>
  }

  const cells = [
    { label: 'Days', value: parts.days },
    { label: 'Hours', value: parts.hours },
    { label: 'Min', value: parts.minutes },
    { label: 'Sec', value: parts.seconds },
  ]

  return (
    <div className="countdown" role="timer" aria-label="Countdown to the wedding">
      {cells.map((c) => (
        <div className="countdown-cell" key={c.label}>
          <span className="countdown-num">{String(c.value).padStart(2, '0')}</span>
          <span className="countdown-label">{c.label}</span>
        </div>
      ))}
    </div>
  )
}
