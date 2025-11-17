import { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ onEnter }) {
  const [bootText, setBootText] = useState('')
  const full = 'ECLIPSE://'
  const sub = 'Enter the Interface. Experience Conscious Design.'
  const [showSub, setShowSub] = useState(false)
  const clickRef = useRef(null)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setBootText(full.slice(0, i + 1))
      i++
      if (i >= full.length) {
        clearInterval(id)
        setTimeout(() => setShowSub(true), 400)
      }
    }, 90)
    return () => clearInterval(id)
  }, [])

  const handleEnter = () => {
    if (onEnter) onEnter()
    const el = document.querySelector('#core')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/jdTN4VDCXmSY8utE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* holographic gradient veils */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_20%,rgba(0,255,255,0.15),transparent),radial-gradient(800px_400px_at_80%_60%,rgba(255,0,255,0.15),transparent)] mix-blend-screen" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="select-none text-6xl sm:text-7xl md:text-8xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 drop-shadow-[0_0_20px_rgba(150,150,255,0.3)]"
        >
          {bootText}
        </motion.h1>
        {showSub && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl px-6 text-sm sm:text-base text-slate-300/90"
          >
            {sub}
          </motion.p>
        )}

        <motion.button
          ref={clickRef}
          onClick={handleEnter}
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(99,102,241,0.6)' }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-indigo-600 animate-pulse shadow-[0_0_40px_rgba(99,102,241,0.5)] border border-white/20"
          aria-label="Enter"
        >
          <span className="sr-only">Enter</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.0, duration: 1.2 }}
          className="absolute bottom-6 text-xs text-slate-400"
        >
          Scroll or tap the node
        </motion.div>
      </div>
    </section>
  )
}
