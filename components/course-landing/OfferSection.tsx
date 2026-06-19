'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Shield, Lock } from 'lucide-react'
import { stagger, fadeInUp } from '@/lib/animations'
import CheckoutButton from './CheckoutButton'
import { COURSE_PRICE, MATERIALS } from '@/lib/course-config'

export default function OfferSection() {
  return (
    <section
      id="oferta"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Tenha acesso ao treinamento{' '}
            <span className="text-neon-gradient">e a todos os arquivos</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* What's included */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-3"
          >
            {MATERIALS.map(({ label }) => (
              <motion.div
                key={label}
                variants={fadeInUp}
                className="dark-card rounded-xl px-5 py-3.5 flex items-center gap-3"
              >
                <CheckCircle size={16} className="flex-shrink-0" style={{ color: '#00e676' }} />
                <span className="text-sm text-white/80">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 rounded-2xl p-7 text-center"
            style={{ border: '1px solid rgba(0,230,118,0.3)', background: 'rgba(0,230,118,0.05)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00e676' }}>
              Acesso completo
            </p>

            <div className="mb-2">
              <span className="text-sm text-white/40">Por apenas</span>
            </div>
            <div
              className="text-5xl font-extrabold text-white mb-1"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              {/* Edit COURSE_PRICE in lib/course-config.ts */}
              {COURSE_PRICE}
            </div>
            <p className="text-xs text-white/30 mb-8">pagamento único</p>

            <CheckoutButton
              label="GARANTIR MEU ACESSO"
              className="neon-btn w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm cursor-pointer mb-4"
              icon={<ArrowRight size={16} />}
            />

            <div className="flex items-center justify-center gap-1.5 text-xs text-white/35">
              <Lock size={11} />
              Pagamento processado com segurança pela Hotmart.
            </div>

            <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                <Shield size={12} style={{ color: '#00e676' }} />
                <span>Garantia inclusa</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
