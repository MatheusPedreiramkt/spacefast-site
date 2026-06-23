"use client"

import { motion } from "framer-motion"
import { monthlyPlanFeatures } from "@/lib/data"
import { WHATSAPP_URL } from "@/lib/constants"
import { CheckCircle2, ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import { staggerFast, fadeUp, VIEWPORT, SECTION_ANIM } from "@/lib/motion"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { trackPlanClick, trackWhatsAppClick } from "@/lib/analytics"

export default function MonthlyPlan() {
  return (
    <section id="plano" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-300 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            Plano mensal completo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            Tudo que sua empresa precisa,{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              em um único plano
            </span>
          </h2>
          <p className="text-gray-400 text-[1.05rem]">
            Site + domínio + hospedagem + anúncios + suporte. Sem complicação.
          </p>
        </motion.div>

        {/* Main card — 2-column layout on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/8">
            {/* Top gradient accent bar */}
            <div className="h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500" />

            <div className="grid lg:grid-cols-[1fr_1.35fr]">
              {/* Left — Price + CTA */}
              <div className="glass-strong p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/6">
                {/* Badge */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-500/25 text-emerald-300 text-xs font-medium mb-8">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    Melhor custo-benefício
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <div className="flex items-end gap-2">
                      <span className="text-5xl lg:text-6xl font-black text-white tracking-tighter">
                        R$897
                      </span>
                      <span className="text-gray-400 text-lg font-medium mb-1.5">/mês</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">cobrado mensalmente · cancele quando quiser</p>
                  </div>

                  {/* Value comparison */}
                  <div className="mt-6 p-3.5 rounded-xl bg-white/3 border border-white/6">
                    <p className="text-gray-500 text-xs mb-1.5">Valor separado: <span className="line-through text-gray-600">~R$2.400/mês</span></p>
                    <p className="text-emerald-400 text-sm font-semibold">Você economiza mais de R$1.800/mês</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 space-y-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPlanClick("Plano Mensal")}
                  className="group flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <WhatsAppSVG className="w-4 h-4" />
                    Quero o plano mensal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-center text-xs text-gray-600">
                    Sem taxa de setup · Sem fidelidade
                  </p>
                </div>
              </div>

              {/* Right — Features */}
              <div className="glass-strong p-8 lg:p-10">
                <p className="text-white font-semibold text-sm mb-5">O que está incluso:</p>
                <motion.div
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  className="grid sm:grid-cols-2 gap-y-3 gap-x-4"
                >
                  {monthlyPlanFeatures.map((feature, i) => (
                    <motion.div key={i} variants={fadeUp} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projeto avulso — opção secundária discreta */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mt-6"
        >
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-white font-semibold text-sm">Prefere um projeto avulso?</p>
              <p className="text-gray-500 text-sm mt-0.5">
                Também desenvolvemos sites, landing pages e campanhas sob demanda.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("plano_avulso")}
              className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.05] text-white/80 hover:text-white hover:bg-white/[0.09] hover:border-white/25 text-sm font-medium transition-all duration-200 whitespace-nowrap"
            >
              Falar com especialista
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
