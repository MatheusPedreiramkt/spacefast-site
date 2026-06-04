"use client"

import { motion } from "framer-motion"
import { whyItems } from "@/lib/data"
import { stagger, fadeUp, VIEWPORT } from "@/lib/motion"

export default function WhySpaceFast() {
  return (
    <section className="relative py-20 lg:py-32 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-22" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            Por que a SpaceFast?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            O que nos diferencia da{" "}
            <span className="gradient-text-brand">concorrência</span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Não somos mais uma agência. Somos parceiros de crescimento com foco real em resultado.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {whyItems.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="group glass glass-hover rounded-2xl p-6 border border-white/8 hover:border-blue-500/22 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/18 flex items-center justify-center shrink-0 group-hover:bg-blue-500/18 group-hover:border-blue-500/32 transition-all"
                    aria-hidden
                  >
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-[0.95rem] mb-1.5 leading-snug">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
