import { useEffect, useRef, useState } from 'react'

// Pentatonic / Raga Mohanam scale frequencies (Hz) for authentic ambient traditional music
const NOTES = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]
const MELODY = [0, 2, 3, 4, 3, 2, 5, 4, 3, 2, 1, 0, 2, 4, 5, 7, 5, 4, 2, 0]

export default function MusicToggle({ src = '/songCut.mp4', volume = 0.2, autoPlay = true }) {
  const audioRef = useRef(null)
  const synthCtxRef = useRef(null)
  const synthTimerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [useSynth, setUseSynth] = useState(false)

  const startSynth = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx()
      }
      const ctx = synthCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      let noteIdx = 0

      // Tampura drone in background
      const droneOsc = ctx.createOscillator()
      const droneGain = ctx.createGain()
      droneOsc.type = 'sine'
      droneOsc.frequency.setValueAtTime(130.81, ctx.currentTime) // C3 drone
      droneGain.gain.setValueAtTime(0.04, ctx.currentTime)
      droneOsc.connect(droneGain)
      droneGain.connect(ctx.destination)
      droneOsc.start()

      // Play soft flute/veena melodic sequence
      const playNextNote = () => {
        if (!synthCtxRef.current || synthCtxRef.current.state === 'closed') return

        const freq = NOTES[MELODY[noteIdx % MELODY.length]]
        noteIdx++

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(1200, ctx.currentTime)

        const now = ctx.currentTime
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.12, now + 0.12)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now)
        osc.stop(now + 1.25)
      }

      playNextNote()
      synthTimerRef.current = setInterval(playNextNote, 650)
    } catch {
      // Fallback silent handling if Web Audio API blocked
    }
  }

  const stopSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current)
      synthTimerRef.current = null
    }
    if (synthCtxRef.current && synthCtxRef.current.state !== 'closed') {
      synthCtxRef.current.close().catch(() => {})
      synthCtxRef.current = null
    }
  }

  const startPlayback = () => {
    if (useSynth) {
      startSynth()
      setPlaying(true)
      return
    }
    const audio = audioRef.current
    if (!audio) return
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        setUseSynth(true)
        startSynth()
        setPlaying(true)
      })
  }

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = volume

    audio.addEventListener('error', () => {
      setUseSynth(true)
    })

    audioRef.current = audio

    let cleanupInteractionListeners = () => {}

    if (autoPlay) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay blocked by browser — wait for first user interaction, then start
          const startOnInteraction = () => {
            if (synthCtxRef.current && synthCtxRef.current.state === 'suspended') {
              synthCtxRef.current.resume()
            }
            startPlayback()
            cleanupInteractionListeners()
          }

          const events = ['click', 'touchstart', 'keydown', 'scroll']
          events.forEach((e) => window.addEventListener(e, startOnInteraction, { once: true }))

          cleanupInteractionListeners = () => {
            events.forEach((e) => window.removeEventListener(e, startOnInteraction))
          }
        })
    }

    return () => {
      audio.pause()
      audioRef.current = null
      stopSynth()
      cleanupInteractionListeners()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, volume, autoPlay])

  const toggle = () => {
    if (playing) {
      if (audioRef.current) audioRef.current.pause()
      stopSynth()
      setPlaying(false)
    } else {
      if (synthCtxRef.current && synthCtxRef.current.state === 'suspended') {
        synthCtxRef.current.resume()
      }
      startPlayback()
    }
  }

  return (
    <button
      className={`music-toggle${playing ? ' playing' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Pause background music' : 'Play background music'}
      title={playing ? 'Pause music' : 'Play music'}
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  )
}