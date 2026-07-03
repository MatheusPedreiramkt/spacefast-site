"use client"

import { motion } from "framer-motion"
import { services } from "@/lib/data"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { ArrowRight } from "lucide-react"
import { stagger, fadeUp, VIEWPORT } from "@/lib/motion"
import { openWhatsAppWithTracking } from "@/lib/cqc"

export default function Services() {
  return (
    <section id="servicos" className="relative py-20 lg:py-32 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-28" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/8 text-purple-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            Nossos serviços
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Tudo que sua empresa{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              precisa
            </span>{" "}
            para crescer
          </h2>
          <p className="text-gray-400 text-[1.05rem]">
            Serviços integrados de presença digital — do site à gestão de anúncios.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="group glass glass-hover rounded-2xl p-6 border border-white/8 hover:border-white/14 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 h-full">
                {/* Gradient icon wrapper */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} p-px mb-5 shrink-0`}>
                  <div className="w-full h-full rounded-[11px] bg-[#080e1e] flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-white" aria-hidden />
                  </div>
                </div>

                <h3 className="text-white font-semibold text-[0.95rem] mb-2 leading-snug group-hover:text-blue-100 transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.description}</p>

                <div className="mt-4 flex items-center gap-1 text-xs text-gray-600 group-hover:text-blue-400 transition-colors duration-200">
                  Saiba mais
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault()
              openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
            }}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/12 text-gray-300 text-sm font-medium hover:border-white/22 hover:text-white hover:bg-white/4 transition-all focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Falar sobre meu projeto
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
