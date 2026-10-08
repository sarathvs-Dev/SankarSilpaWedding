import { useEffect, useState } from 'react'

// 12 Dec 2026, 11:53 AM IST — explicit offset so it is correct from anywhere.
const TARGET = new Date('2026-12-12T11:53:00+05:30').getTime()

function getParts() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff <= 0,
  }
}

export default function Countdown() {
  const [parts, setParts] = useState(getParts)

  useEffect(() => {
    const id = setInterval(() => setParts(getParts()), 1000)
    return () => clearInterval(id)
  }, [])

  if (parts.done) return <p className="countdown-done">Today is the day — see you there!</p>

  const cells = [
    { label: 'Days', value: parts.days },
    { label: 'Hours', value: parts.hours },
    { label: 'Min', value: parts.minutes },
    { label: 'Sec', value: parts.seconds },
  ]

  return (
    <div className="countdown" role="timer" aria-label="Countdown to the wedding">
      {cells.map((c) => (
        <div className="countdown-cell glass" key={c.label}>
          {/* tabular digits keep each box a fixed width so nothing jitters */}
          <span className="countdown-num">{String(c.value).padStart(2, '0')}</span>
          <span className="countdown-label">{c.label}</span>
        </div>
      ))}
    </div>
  )
}
