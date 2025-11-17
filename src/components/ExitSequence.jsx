import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExitSequence() {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      setLeaving(true)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return (
    <AnimatePresence>
      {leaving && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 grid grid-rows-12">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="border-b border-white/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, delay: i * 0.03 }}
              />
            ))}
          </div>
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-2xl font-mono text-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2 }}
            >
              Powering Down…
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
