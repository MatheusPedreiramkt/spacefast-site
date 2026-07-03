"use client"

import { motion } from "framer-motion"
import { solutions } from "@/lib/data"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { ArrowRight } from "lucide-react"
import { stagger, fadeUp, VIEWPORT, SECTION_ANIM } from "@/lib/motion"
import { openWhatsAppWithTracking } from "@/lib/cqc"

export default function Solution() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/22 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#050b18] to-[#030712]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            A solução
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Tudo que faltava para sua empresa{" "}
            <span className="gradient-text-brand">gerar clientes</span>{" "}
            online
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Cada detalhe do seu site é pensado para transmitir confiança, atrair o cliente certo
            e gerar contatos qualificados — não apenas para parecer bonito.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {solutions.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="group glass glass-hover rounded-2xl p-6 h-full border border-white/8 hover:border-blue-500/22 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/18 flex items-center justify-center mb-4 group-hover:bg-blue-500/18 group-hover:border-blue-500/32 transition-all" aria-hidden>
                  <s.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-[0.95rem] mb-2 leading-snug">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.3, duration: 0.65 }}
          className="mt-12 text-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault()
              openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
            }}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-cyan-400 transition-all shadow-xl shadow-blue-500/22 hover:shadow-blue-500/36 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Falar com especialista
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
