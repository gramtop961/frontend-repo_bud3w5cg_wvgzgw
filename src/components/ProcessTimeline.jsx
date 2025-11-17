import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ProcessTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const skew = useTransform(scrollYProgress, [0, 1], [8, -8])
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])

  const steps = [
    'Signal Found',
    'Protocol Negotiation',
    'Sensory Alignment',
    'Glitch Acceptance',
    'Fusion Achieved',
  ]

  return (
    <section id="process" ref={ref} className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.03),transparent)]" />
      <motion.div style={{ skewY: skew, x }} className="sticky top-0 h-screen flex items-center">
        <div className="flex gap-20 pl-[10vw]">
          {steps.map((s, i) => (
            <motion.div
              key={s}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[40vw]"
            >
              <h3 className="text-4xl font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300">
                {s}
              </h3>
              <p className="mt-4 text-slate-300/80 max-w-md">
                {`//`} Phase {i + 1} initialized. Systems reconfiguring. Noise converted to language.
              </p>
              <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-transparent via-slate-400/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
