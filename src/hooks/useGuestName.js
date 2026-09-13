import { useEffect, useState } from 'react'

/**
 * Reads a guest's name from the URL query string.
 * Supports: ?name=, ?Name=, ?guest=, ?to=, ?g=
 * Decodes URL parameters and capitalizes words nicely for display.
 */
export default function useGuestName() {
  const [name, setName] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const raw =
      params.get('name') ||
      params.get('Name') ||
      params.get('guest') ||
      params.get('to') ||
      params.get('g') ||
      ''
    if (!raw) return

    try {
      const decoded = decodeURIComponent(raw.replace(/\+/g, ' '))
      const cleaned = decoded
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
        .filter(Boolean)
        .join(' ')
      setName(cleaned)
    } catch {
      setName(raw.trim())
    }
  }, [])

  return name
}

