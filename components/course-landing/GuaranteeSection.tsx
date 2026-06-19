'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { GUARANTEE_DAYS } from '@/lib/course-config'

export default function GuaranteeSection() {
  return (
    <section className="relative py-16" style={{ background: '#080808' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
          style={{ border: '1px solid rgba(0,230,118,0.2)', background: 'rgba(0,230,118,0.04)' }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 glow-neon-sm"
            style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)' }}
          >
            <ShieldCheck size={36} style={{ color: '#00e676' }} />
          </div>
          <div>
            <h3
              className="text-xl font-extrabold text-white mb-2"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Garantia de {GUARANTEE_DAYS} dias
            </h3>
            {/* Edit GUARANTEE_DAYS in lib/course-config.ts */}
            <p className="text-sm text-white/55 leading-relaxed">
              Você terá <span className="text-white font-semibold">{GUARANTEE_DAYS} dias</span> para acessar e avaliar
              o treinamento. Caso entenda que o conteúdo não é adequado para você, poderá solicitar o
              reembolso dentro do prazo e das condições configuradas na Hotmart.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
