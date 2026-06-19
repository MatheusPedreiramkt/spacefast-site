'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CheckoutButton from './CheckoutButton'

export default function CourseFinalCTA() {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.06) 0%, transparent 65%)',
        }}
      />
      <div className="absolute inset-0 grid-bg-dark pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Comece a construir seu{' '}
            <span className="text-neon-gradient">sistema de prospecção</span>
          </h2>

          <p className="text-base sm:text-lg text-white/55 leading-relaxed max-w-xl mx-auto">
            Aprenda a encontrar empresas, organizar contatos e estruturar uma rotina de
            prospecção com as ferramentas ensinadas no curso.
          </p>

          <CheckoutButton
            label="QUERO COMEÇAR AGORA"
            className="neon-btn inline-flex items-center gap-3 px-10 py-5 rounded-xl text-base cursor-pointer glow-neon"
            icon={<ArrowRight size={20} />}
          />

          <p className="text-xs text-white/25">
            Acesso imediato após a confirmação de pagamento.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
