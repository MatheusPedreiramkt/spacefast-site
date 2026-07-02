"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { EASE } from "@/lib/motion"
import { trackWhatsAppClick } from "@/lib/analytics"
import { RESULT_COPY, type Classification, type DiagnosticoLead } from "@/lib/diagnostico"

export default function DiagnosticoResultado({
  classification,
  lead,
  whatsAppUrl,
  onViewPortfolio,
}: {
  classification: Classification
  lead: DiagnosticoLead
  whatsAppUrl: string
  onViewPortfolio: () => void
}) {
  const copy = RESULT_COPY[classification]
  const isHot = classification === "quente"
  const prefersReduced = useReducedMotion()

  function renderCta(cta: { label: string; type: "whatsapp" | "portfolio" }, primary: boolean) {
    if (cta.type === "whatsapp") {
      return (
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackWhatsAppClick(`diagnostico_${classification}`)
            if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
              window.fbq('track', 'Lead', {
                content_name: 'Diagnóstico Concluído',
                value: 500,
                currency: 'BRL'
              })
            }
          }}
          className={
            primary
              ? "group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold text-base hover:from-emerald-400 hover:to-emerald-300 transition-all shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] w-full sm:w-auto"
              : "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 transition-all font-medium text-sm focus-visible:ring-2 focus-visible:ring-white/40 w-full sm:w-auto"
          }
        >
          <WhatsAppSVG className={primary ? "w-5 h-5" : "w-4 h-4"} />
          {cta.label}
          {primary && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        </a>
      )
    }

    return (
      <button
        type="button"
        onClick={onViewPortfolio}
        className={
          primary
            ? "group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base hover:from-blue-500 hover:to-cyan-400 transition-all shadow-2xl shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] w-full sm:w-auto"
            : "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 transition-all font-medium text-sm focus-visible:ring-2 focus-visible:ring-white/40 w-full sm:w-auto"
        }
      >
        {cta.label}
        {primary && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
      </button>
    )
  }

  return (
    <section className="relative min-h-screen bg-[#030712] flex items-center overflow-hidden px-4 py-16">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isHot
            ? "radial-gradient(ellipse 80% 55% at 50% 30%, rgba(16,185,129,0.16) 0%, transparent 65%)"
            : "radial-gradient(ellipse 80% 55% at 50% 30%, rgba(59,130,246,0.12) 0%, transparent 65%)",
        }}
      />

      <motion.div
        initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
        animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative max-w-lg mx-auto text-center glass-strong rounded-3xl border border-white/10 px-6 py-10 sm:px-10 sm:py-12"
      >
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-6 ${
            isHot
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-blue-500/30 bg-blue-500/8 text-blue-300"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden />
          {copy.eyebrow}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-4">
          {lead.nome ? `${lead.nome.split(" ")[0]}, ` : ""}
          {copy.title.charAt(0).toLowerCase() + copy.title.slice(1)}
        </h1>

        <p className="text-gray-400 text-[1.05rem] leading-relaxed mb-8">{copy.subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {renderCta(copy.primaryCta, true)}
          {copy.secondaryCta && renderCta(copy.secondaryCta, false)}
        </div>
      </motion.div>
    </section>
  )
}
