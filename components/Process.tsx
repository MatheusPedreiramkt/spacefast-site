"use client"

import { motion } from "framer-motion"
import { processSteps } from "@/lib/data"
import { stagger, fadeUp, VIEWPORT } from "@/lib/motion"

export default function Process() {
  return (
    <section id="processo" className="relative py-20 lg:py-32 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-35" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            Como funciona
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Do primeiro contato ao{" "}
            <span className="gradient-text-brand">site no ar</span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Um processo claro, organizado e com entrega no prazo — sempre.
          </p>
        </motion.div>

        {/* 2×3 grid on desktop, 1-column on mobile */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {processSteps.map((step, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="group glass glass-hover rounded-2xl p-6 border border-white/8 hover:border-blue-500/22 transition-all h-full relative overflow-hidden">
                {/* Number watermark */}
                <span
                  aria-hidden
                  className="absolute -right-2 -top-3 text-7xl font-black text-white/4 select-none font-mono leading-none group-hover:text-white/7 transition-colors"
                >
                  {step.number}
                </span>

                {/* Step badge */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold mb-4 shadow-lg shadow-blue-500/20">
                  {i + 1}
                </div>

                <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                {/* Connector line (not shown on last item per row on large screens) */}
                {i < processSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-4 h-px bg-gradient-to-r from-blue-500/40 to-transparent"
                    aria-hidden
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
