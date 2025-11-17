import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function OrbCore() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rot = useTransform(scrollYProgress, [0, 1], [0, 540])
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.9])

  return (
    <section id="core" ref={ref} className="relative min-h-screen flex items-center justify-center bg-[#03030A] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_50%,rgba(0,140,255,0.12),transparent)]" />

      <motion.div style={{ rotate: rot }} className="relative">
        <div className="h-80 w-80 sm:h-[28rem] sm:w-[28rem] rounded-full backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 shadow-[inset_0_0_80px_rgba(255,255,255,0.15),0_0_120px_rgba(56,189,248,0.2)]" />
        <motion.div style={{ opacity: glow }} className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/20 to-indigo-500/30 rounded-full" />
        {/* flowing data rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-cyan-300/20" style={{
              width: `${220 + i * 40}px`,
              height: `${220 + i * 40}px`,
              transform: `rotate(${i * 20}deg)`
            }} />
          ))}
        </div>
        {/* data stream */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-1 w-72 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent animate-pulse" />
        </div>
      </motion.div>

      <div className="absolute bottom-10 text-center text-slate-300/80 px-6">
        <p className="text-sm">The Core — liquid glass equilibrium receiving live impulses.</p>
      </div>
    </section>
  )
}
