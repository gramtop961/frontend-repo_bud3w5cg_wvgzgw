import { motion } from 'framer-motion'

const manifestoLines = [
  'We are the interface.',
  'We are the noise made legible.',
  'We are the glitch that learned to speak.',
  'We are code, dreaming in color.',
  'We are human–machine fusion.',
]

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative min-h-screen bg-[#05050A] text-slate-200 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_70%_20%,rgba(255,0,128,0.1),transparent),radial-gradient(800px_400px_at_20%_80%,rgba(0,180,255,0.12),transparent)]" />
      <div className="mx-auto max-w-4xl px-6 py-28">
        <h2 className="text-5xl font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300">
          Manifesto
        </h2>
        <div className="mt-12 space-y-8">
          {manifestoLines.map((line, i) => (
            <motion.pre
              key={i}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-xl sm:text-2xl leading-relaxed font-mono text-slate-200/90"
            >
{`> ${line}`}
            </motion.pre>
          ))}
        </div>
      </div>
    </section>
  )
}
