import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import OrbCore from './components/OrbCore'
import ProcessTimeline from './components/ProcessTimeline'
import Manifesto from './components/Manifesto'
import Gallery from './components/Gallery'
import ContactPortal from './components/ContactPortal'
import ExitSequence from './components/ExitSequence'

function CursorTrail() {
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const onMove = (e) => {
      setParticles((p) => [...p.slice(-40), { x: e.clientX, y: e.clientY, id: Math.random() }])
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <div className="pointer-events-none fixed inset-0 z-[999]">
      {particles.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0.9, 0], y: -30, scale: [1, 0.6] }}
          transition={{ duration: 0.8 }}
          className="absolute h-2 w-2 rounded-full"
          style={{ left: p.x, top: p.y, background: 'radial-gradient(circle, rgba(0,255,255,0.9), rgba(255,0,255,0.6))', filter: 'blur(1px)' }}
        />)
      )}
    </div>
  )
}

function App() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const onScroll = () => setEntered(true)
    window.addEventListener('scroll', onScroll, { once: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-fuchsia-500/40 selection:text-white">
      <CursorTrail />
      <Hero onEnter={() => setEntered(true)} />
      <OrbCore />
      <ProcessTimeline />
      <Manifesto />
      <Gallery />
      <ContactPortal />
      <ExitSequence />
      <footer className="py-12 text-center text-xs text-slate-400/70">© ECLIPSE:// Experimental Interface</footer>
    </div>
  )
}

export default App
