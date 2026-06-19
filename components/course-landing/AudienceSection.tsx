'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Info } from 'lucide-react'
import { stagger, fadeInUp } from '@/lib/animations'
import { AUDIENCE } from '@/lib/course-config'

export default function AudienceSection() {
  return (
    <section className="relative py-20 lg:py-28" style={{ background: '#0d0d0d' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ color: '#00e676', border: '1px solid rgba(0,230,118,0.25)', background: 'rgba(0,230,118,0.06)' }}
          >
            Para quem é
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Este treinamento é para{' '}
            <span className="text-neon-gradient">você que...</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-3 mb-10"
        >
          {AUDIENCE.map((item) => (
            <motion.div
              key={item}
              variants={fadeInUp}
              className="dark-card rounded-xl px-5 py-4 flex items-center gap-3"
            >
              <CheckCircle size={18} className="flex-shrink-0" style={{ color: '#00e676' }} />
              <span className="text-base text-white/80">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Programmer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 flex items-start gap-4"
          style={{ border: '1px solid rgba(0,230,118,0.2)', background: 'rgba(0,230,118,0.05)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.25)' }}
          >
            <Info size={18} style={{ color: '#00e676' }} />
          </div>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            <span className="text-white font-semibold">Não é necessário ser programador.</span>{' '}
            As aulas mostram cada etapa da instalação com instruções claras e diretas.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
