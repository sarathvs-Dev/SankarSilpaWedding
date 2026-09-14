import { useState } from 'react'
import SvgDefs from './components/SvgDefs.jsx'
import Gate from './components/Gate.jsx'
import LampRail from './components/LampRail.jsx'
import DotNav from './components/DotNav.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import ShareModal from './components/ShareModal.jsx'
import Section1Opening from './components/sections/Section1Opening.jsx'
import Section2Hero from './components/sections/Section2Hero.jsx'
import Section3Story from './components/sections/Section3Story.jsx'
import Section4Couple from './components/sections/Section4Couple.jsx'
import Section5Ceremony from './components/sections/Section5Ceremony.jsx'
import Section6Venue from './components/sections/Section6Venue.jsx'
import Section8Blessings from './components/sections/Section8Blessings.jsx'
import Section9Closing from './components/sections/Section9Closing.jsx'
import Section10Wishes from './components/sections/Section10Wishes.jsx'

export default function App() {
  const [shareOpen, setShareOpen] = useState(false)

  const handleGateOpen = () => {
    document.body.classList.remove('locked')
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'))
      window.dispatchEvent(new Event('resize'))
    }, 50)
  }

  return (
    <>
      <Gate onOpen={handleGateOpen} />
      <DotNav />
      <LampRail />
      <MusicToggle />
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />

      <div className="stage" id="stage">
        <div className="grain" />
        <SvgDefs />

        <Section1Opening onOpenShare={() => setShareOpen(true)} />
        <Section2Hero />
        <Section3Story />
        <Section4Couple />
        <Section5Ceremony />
        <Section6Venue />
        <Section8Blessings />
        <Section9Closing />
        {/* <Section10Wishes /> */}
      </div>
    </>
  )
}


