import { useEffect, useState } from 'react'
import Gate from './components/Gate.jsx'
import SideDots from './components/SideDots.jsx'
import Spotlight from './components/Spotlight.jsx'
import useScreenFX from './hooks/useScreenFX.js'
import useSectionScroll, { goTo } from './hooks/useSectionScroll.js'
import usePage, { initialPage, takePendingSection } from './hooks/usePage.js'
import Nav from './components/Nav.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import ShareModal from './components/ShareModal.jsx'
import Hero from './components/sections/Hero.jsx'
import Story from './components/sections/Story.jsx'
// import Couple from './components/sections/Couple.jsx'
import Events from './components/sections/Events.jsx'
import Gallery from './components/sections/Gallery.jsx'
import Blessings from './components/sections/Blessings.jsx'
// import Rsvp from './components/sections/Rsvp.jsx'
import Closing from './components/sections/Closing.jsx'

// Opening straight onto the gallery link skips the gate.
if (initialPage === 'gallery') document.body.classList.remove('locked')

export default function App() {
  const [shareOpen, setShareOpen] = useState(false)
  const page = usePage()
  useScreenFX(page) // feeds --sp/--ap scroll variables to every <Screen>
  useSectionScroll() // eased screen-by-screen glide (desktop)

  // new page: start at the top, or at the section the nav asked for
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const section = takePendingSection()
    if (section) requestAnimationFrame(() => goTo(section))
  }, [page])

  // Unlock scrolling and tell every <Reveal> it may start animating.
  const handleGateOpen = () => {
    document.body.classList.remove('locked')
    window.dispatchEvent(new Event('invitation:open'))
  }

  return (
    <>
      {initialPage === 'home' && <Gate onOpen={handleGateOpen} />}
      <Nav key={`nav-${page}`} page={page} />
      {page === 'home' && <SideDots />}
      <Spotlight />
      <MusicToggle />
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />

      {page === 'gallery' ? (
        <main key="gallery">
          <Gallery />
        </main>
      ) : (
        <main key="home">
          <Hero onOpenShare={() => setShareOpen(true)} />
          <Story />
          {/* Couple hidden for now — uncomment this line and the import (also in Nav.jsx + SideDots.jsx) */}
          {/* <Couple /> */}
          <Events />
          <Blessings />
          {/* RSVP hidden for now — uncomment this line and the import to bring it back */}
          {/* <Rsvp /> */}
          <Closing />
        </main>
      )}
    </>
  )
}
