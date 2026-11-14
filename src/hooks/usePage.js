import { useEffect, useState } from 'react'

/**
 * Tiny hash router (no library): the invitation lives at "/", the photo
 * gallery at "#/gallery". Browser back/forward work via popstate.
 */
const read = () => (window.location.hash === '#/gallery' ? 'gallery' : 'home')

let pendingSection = null

/** Switch page; optionally glide to a section once the home page is mounted. */
export function navigate(page, section = null) {
  pendingSection = section
  const { pathname, search } = window.location
  const url = page === 'gallery' ? `${pathname}${search}#/gallery` : `${pathname}${search}`
  if (read() !== page) history.pushState(null, '', url)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/** Section requested by the last navigate() call (read once). */
export function takePendingSection() {
  const s = pendingSection
  pendingSection = null
  return s
}

export const initialPage = read()

export default function usePage() {
  const [page, setPage] = useState(read)
  useEffect(() => {
    const sync = () => setPage(read())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])
  return page
}
