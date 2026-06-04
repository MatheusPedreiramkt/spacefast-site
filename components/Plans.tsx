"use client"

import { motion } from "framer-motion"
import { plans } from "@/lib/data"
import { WHATSAPP_URL } from "@/lib/constants"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { stagger, scaleUp, VIEWPORT } from "@/lib/motion"
import { trackPlanClick, trackWhatsAppClick } from "@/lib/analytics"

export default function Plans() {
  return (
    <section id="planos" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/18 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/8 text-purple-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            Planos avulsos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Escolha a solução ideal para{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              gerar mais clientes
            </span>
          </h2>
          <p className="text-gray-400 text-[1.05rem]">
            Cada projeto é desenvolvido sob medida — alinhado aos objetivos e ao momento do seu negócio.
          </p>
        </motion.div>

        {/* "Não sabe qual plano escolher?" — orientação discreta */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mb-8"
        >
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-white font-semibold text-sm">Não sabe qual plano escolher?</p>
              <p className="text-gray-500 text-sm mt-0.5">
                Receba uma recomendação gratuita baseada no seu negócio e objetivos.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("planos_indeciso")}
              className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.05] text-white/80 hover:text-white hover:bg-white/[0.09] hover:border-white/25 text-sm font-medium transition-all duration-200 whitespace-nowrap"
            >
              Falar com especialista
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden />
            </a>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {plans.map((plan, i) => (
            <motion.div key={i} variants={scaleUp} className="flex">
              <div
                className={`relative flex flex-col w-full rounded-2xl transition-all duration-300 ${
                  plan.highlighted
                    ? "border-2 border-blue-500/50 shadow-2xl shadow-blue-500/12"
                    : "border border-white/10 hover:border-white/18"
                }`}
              >
                {/* Top accent for highlighted */}
                {plan.highlighted && (
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-t-2xl" />
                )}

                <div
                  className={`flex flex-col h-full rounded-2xl p-6 ${
                    plan.highlighted
                      ? "bg-gradient-to-b from-[#0f1f3d] to-[#060d1f]"
                      : "glass"
                  }`}
                >
                  {plan.badge && (
                    <span className="self-start inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/15 border border-blue-500/25 text-blue-300 mb-4">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="text-white font-bold text-xl tracking-tight">
                    {plan.name}
                  </h3>

                  {/* Benefit tagline */}
                  <p className={`text-[0.78rem] font-semibold mt-1 mb-2 ${
                    plan.highlighted ? "text-cyan-400" : "text-blue-400/75"
                  }`}>
                    {plan.benefit}
                  </p>

                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{plan.subtitle}</p>

                  <ul className="space-y-2.5 mb-8 flex-1" aria-label={`Recursos do plano ${plan.name}`}>
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.highlighted ? "text-blue-400" : "text-gray-600"
                          }`}
                          aria-hidden
                        />
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPlanClick(plan.name)}
                    className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 focus-visible:ring-blue-400"
                        : "border border-white/12 text-white/75 hover:bg-white/5 hover:border-white/22 hover:text-white focus-visible:ring-white/40"
                    }`}
                  >
                    Solicitar projeto
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Faixa "Projeto personalizado" */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mt-6"
        >
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-white font-semibold">Precisa de algo personalizado?</p>
              <p className="text-gray-500 text-sm mt-0.5">
                Criamos projetos sob medida para empresas de qualquer segmento.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("planos_personalizado")}
              className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap"
            >
              Solicitar projeto personalizado
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
