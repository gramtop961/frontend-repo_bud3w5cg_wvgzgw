import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useAudioAnalyser(url) {
  const [level, setLevel] = useState(0)
  const analyserRef = useRef(null)
  useEffect(() => {
    let ctx, src, analyser, raf
    const audio = new Audio(url)
    audio.loop = true
    audio.crossOrigin = 'anonymous'
    audio.volume = 0.4
    audio.play().catch(() => {})
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    src = ctx.createMediaElementSource(audio)
    src.connect(analyser)
    analyser.connect(ctx.destination)

    const data = new Uint8Array(analyser.frequencyBinCount)
    const tick = () => {
      analyser.getByteFrequencyData(data)
      const avg = data.reduce((a, b) => a + b, 0) / data.length
      setLevel(avg / 255)
      raf = requestAnimationFrame(tick)
    }
    tick()
    analyserRef.current = { audio, ctx }
    return () => {
      cancelAnimationFrame(raf)
      try { audio.pause() } catch {}
      try { ctx && ctx.close() } catch {}
    }
  }, [url])
  return level
}

export default function Gallery() {
  const level = useAudioAnalyser('https://cdn.pixabay.com/download/audio/2022/03/30/audio_ba9f9e4f2f.mp3?filename=ambient-110734.mp3')
  const items = useMemo(() => Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    hue: (i * 30) % 360,
  })), [])

  return (
    <section id="gallery" className="relative h-[120vh] bg-black text-white overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center"
        initial={false}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items].map((it, idx) => (
          <motion.div
            key={idx}
            className="mx-8 h-64 w-64 rounded-2xl backdrop-blur-xl border border-white/10"
            style={{
              background: `radial-gradient(circle at 30% 30%, hsla(${it.hue},90%,60%,0.35), transparent 60%),
                radial-gradient(circle at 70% 70%, hsla(${(it.hue+120)%360},90%,60%,0.35), transparent 60%)`,
              boxShadow: `0 0 ${20 + level * 60}px hsla(${it.hue},90%,60%,${0.3 + level * 0.3})`
            }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
        ))}
      </motion.div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
        <h3 className="text-4xl font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300">Gallery</h3>
        <p className="mt-2 text-slate-300/80">Pulsing with ambient audio</p>
      </div>
    </section>
  )
}
