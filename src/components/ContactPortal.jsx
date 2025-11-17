import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactPortal() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [thinking, setThinking] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setThinking(`processing:${name}→${value.length}`)
  }

  const panels = [
    { key: 'name', placeholder: 'Designation' },
    { key: 'email', placeholder: 'Signal Address' },
    { key: 'message', placeholder: 'Transmission' },
  ]

  return (
    <section id="contact" className="relative min-h-screen bg-[#030308] text-slate-200 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_600px_at_40%_20%,rgba(0,255,255,0.12),transparent),radial-gradient(600px_400px_at_70%_80%,rgba(255,0,255,0.12),transparent)]" />

      <div className="mx-auto max-w-5xl px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-5xl font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300">
            Contact Portal
          </h3>
          <p className="mt-4 text-slate-300/80">
            Send a signal. The interface answers. Panels realign as you type.
          </p>
          <div className="mt-6 text-sm text-slate-400">{thinking || 'idle'}</div>
        </div>

        <div className="relative h-[26rem]">
          <div className="absolute inset-0 grid grid-rows-6 grid-cols-6 gap-3">
            {panels.map((p, i) => (
              <motion.div
                key={p.key}
                className="col-span-3 row-span-2 rounded-xl border border-white/10 backdrop-blur-xl bg-white/5 p-4 flex flex-col"
                animate={{
                  gridColumnStart: 1 + ((form[p.key].length + i) % 4),
                  gridRowStart: 1 + ((form[p.key].length + i) % 5),
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <label className="text-xs uppercase tracking-widest text-slate-300/70">{p.placeholder}</label>
                {p.key !== 'message' ? (
                  <input
                    name={p.key}
                    value={form[p.key]}
                    onChange={handleChange}
                    className="mt-2 bg-transparent outline-none text-slate-100 placeholder:text-slate-400"
                    placeholder={p.placeholder}
                  />
                ) : (
                  <textarea
                    name={p.key}
                    value={form[p.key]}
                    onChange={handleChange}
                    className="mt-2 bg-transparent outline-none text-slate-100 placeholder:text-slate-400 h-full resize-none"
                    placeholder={p.placeholder}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
