"use client"

import { motion } from "framer-motion"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { ArrowRight } from "lucide-react"
import { VIEWPORT, EASE } from "@/lib/motion"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { trackWhatsAppClick } from "@/lib/analytics"
import { openWhatsAppWithTracking } from "@/lib/cqc"

const TRUST_BADGES = [
  { color: "bg-emerald-500", label: "Resposta em até 2h" },
  { color: "bg-blue-500", label: "Sem compromisso" },
  { color: "bg-purple-500", label: "Orçamento gratuito" },
  { color: "bg-cyan-500", label: "Suporte humano" },
]

export default function CTAFinal() {
  return (
    <section id="contato" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      {/* Large ambient glow — more intense than other sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 30% at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 30% at 80% 20%, rgba(6,182,212,0.08) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {/* Card wrapper for depth */}
          <div className="text-center glass-strong rounded-3xl border border-white/8 px-8 py-14 sm:px-14 shadow-2xl shadow-blue-500/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.12, duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/28 bg-blue-500/8 text-blue-300 text-sm font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
              Pronto para começar?
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              Transforme sua{" "}
              <span className="gradient-text">presença digital</span>{" "}
              agora
            </h2>

            <p className="text-gray-400 text-[1.1rem] max-w-xl mx-auto leading-relaxed mb-10">
              Vamos criar um site profissional para sua empresa gerar mais confiança, contatos
              qualificados e oportunidades. Rápido, sem complicação e com suporte direto.
            </p>

            {/* Primary CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault()
                trackWhatsAppClick("cta_final")
                openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
              }}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base hover:from-blue-500 hover:to-cyan-400 transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
            >
              <WhatsAppSVG className="w-5 h-5 shrink-0" />
              Falar no WhatsApp agora
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>

            {/* Microcopy */}
            <p className="mt-4 text-xs text-gray-600">
              Mais de 40 empresas atendidas · Resposta em até 2h
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2.5">
              {TRUST_BADGES.map((b) => (
                <span key={b.label} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span className={`w-1.5 h-1.5 rounded-full ${b.color} shrink-0`} aria-hidden />
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
