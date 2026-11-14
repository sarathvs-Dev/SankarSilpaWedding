import { useCallback, useEffect, useState } from 'react'

/** Google's image CDN resizes on the fly; files must be shared "Anyone with the link". */
export const driveImg = (id, w) => `https://lh3.googleusercontent.com/d/${id}=w${w}`

// One request per visit: navigating away from the gallery and back reuses it.
let cached = null

function load() {
  cached ??= fetch('/api/gallery', { headers: { Accept: 'application/json' } })
    .then(async (res) => {
      const body = await res.json().catch(() => null)
      if (res.ok && body?.photos) return body
      // no API (plain `vite` without the dev middleware, or a static host)
      // or Drive not set up yet -> caller falls back to the bundled photos
      if (res.status === 404 && !body) throw Object.assign(new Error(), { code: 'not_configured' })
      throw Object.assign(new Error(), { code: body?.error || 'server_error' })
    })
    .catch((e) => {
      cached = null // let "Try again" make a fresh request
      throw Object.assign(e, { code: e.code || 'network' })
    })
  return cached
}

/**
 * status: 'loading' | 'ready' | 'fallback' | 'error'
 * photos: [{ id, src, full, tiny, w, h, cat, cap, alt }]
 */
export default function useDrivePhotos() {
  const [state, setState] = useState({ status: 'loading', photos: [], categories: [], error: null })

  const fetchIt = useCallback(() => {
    setState((s) => ({ ...s, status: 'loading', error: null }))
    load()
      .then((data) =>
        setState({
          status: 'ready',
          categories: data.categories || [],
          photos: data.photos.map((p) => ({
            ...p,
            src: driveImg(p.id, 800),
            srcSet: [480, 800, 1200].map((w) => `${driveImg(p.id, w)} ${w}w`).join(', '),
            full: driveImg(p.id, 2048),
            tiny: driveImg(p.id, 160),
            alt: [p.cat, p.cap].filter(Boolean).join(' — ') || 'Wedding photo',
          })),
          error: null,
        })
      )
      .catch((e) => {
        if (e.code !== 'not_configured') console.warn('[gallery] Drive listing failed:', e.code)
        setState({ status: e.code === 'not_configured' ? 'fallback' : 'error', photos: [], categories: [], error: e.code })
      })
  }, [])

  useEffect(fetchIt, [fetchIt])
  return { ...state, retry: fetchIt }
}
