import { useState } from 'react'
import Gate from './components/Gate.jsx'
import SideDots from './components/SideDots.jsx'
import Spotlight from './components/Spotlight.jsx'
import useScreenFX from './hooks/useScreenFX.js'
import useSectionScroll from './hooks/useSectionScroll.js'
import Nav from './components/Nav.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import ShareModal from './components/ShareModal.jsx'
import Hero from './components/sections/Hero.jsx'
import Story from './components/sections/Story.jsx'
import Couple from './components/sections/Couple.jsx'
import Events from './components/sections/Events.jsx'
import Gallery from './components/sections/Gallery.jsx'
import Blessings from './components/sections/Blessings.jsx'
// import Rsvp from './components/sections/Rsvp.jsx'
import Closing from './components/sections/Closing.jsx'

export default function App() {
  const [shareOpen, setShareOpen] = useState(false)
  useScreenFX() // feeds --sp/--ap scroll variables to every <Screen>
  useSectionScroll() // eased screen-by-screen glide (desktop)

  // Unlock scrolling and tell every <Reveal> it may start animating.
  const handleGateOpen = () => {
    document.body.classList.remove('locked')
    window.dispatchEvent(new Event('invitation:open'))
  }

  return (
    <>
      <Gate onOpen={handleGateOpen} />
      <Nav />
      <SideDots />
      <Spotlight />
      <MusicToggle />
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />

      <main>
        <Hero onOpenShare={() => setShareOpen(true)} />
        <Story />
        <Couple />
        <Events />
        <Gallery />
        <Blessings />
        {/* RSVP hidden for now — uncomment this line and the import to bring it back */}
        {/* <Rsvp /> */}
        <Closing />
      </main>
    </>
  )
}
