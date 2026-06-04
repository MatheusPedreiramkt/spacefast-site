"use client"

import { motion } from "framer-motion"
import { problems } from "@/lib/data"
import { stagger, fadeUp, VIEWPORT } from "@/lib/motion"

export default function Problem() {
  return (
    <section className="relative py-16 lg:py-24 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />

      {/* Red/orange ambient glow — reforça o conceito de problema */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-700/7 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-[500px] h-[400px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-48 w-[500px] h-[400px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/28 bg-red-500/8 text-red-300 text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            O problema real
          </div>

          <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Sua empresa está perdendo{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              clientes reais
            </span>{" "}
            para o concorrente — todos os dias
          </h2>

          <p className="text-gray-400 text-[1rem] sm:text-[1.05rem] leading-[1.75]">
            Antes de qualquer contato, quase todo cliente pesquisa sua empresa na internet.
            Se encontrar um site desatualizado, lento ou sem profissionalismo —
            a confiança cai na hora, e a venda vai para quem está mais preparado.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {problems.map((p, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="relative rounded-2xl p-6 h-full border border-red-500/10 bg-gradient-to-br from-red-950/18 via-transparent to-transparent hover:border-red-500/30 hover:from-red-950/28 hover:shadow-lg hover:shadow-red-950/20 transition-all duration-300 group overflow-hidden">
                {/* Subtle inner top highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

                <div
                  className="w-11 h-11 rounded-xl bg-red-500/12 border border-red-500/22 flex items-center justify-center mb-4 group-hover:bg-red-500/20 group-hover:border-red-500/38 transition-all duration-300"
                  aria-hidden
                >
                  <p.icon className="w-5 h-5 text-red-400" />
                </div>

                <h3 className="text-white font-semibold text-[0.95rem] mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
