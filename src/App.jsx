import { useState } from 'react'
import useLenis from './hooks/useLenis'

import Loader from './components/Loader'
import Navigation from './components/Navigation'
import GoldenThread from './components/GoldenThread'
import Hero from './components/Hero'
import LoveStory from './components/LoveStory'
import WeddingJourney from './components/WeddingJourney'
import Countdown from './components/Countdown'
import Venue from './components/Venue'
import Gallery from './components/Gallery'
import WeddingEvents from './components/WeddingEvents'
import Families from './components/Families'
import RSVP from './components/RSVP'
import Blessings from './components/Blessings'
import Footer from './components/Footer'

export default function App() {
 const [loaded, setLoaded] = useState(false)
  useLenis()

  return (
    <>
      <Loader onFinish={() => setLoaded(true)} />
      <div className="grain" />

      {loaded && (
        <>
          <Navigation />
          <GoldenThread />
        </>
      )}

      <main className="relative z-20">
        <Hero />
        <LoveStory />
        <WeddingJourney />
        <Countdown />
        <Venue />
        <Gallery />
        <WeddingEvents />
        <Families />
        <RSVP onSubmit={async (data) => console.log('RSVP submitted:', data)} />
        <Blessings />
        <Footer />
      </main>
    </>
  )
}
