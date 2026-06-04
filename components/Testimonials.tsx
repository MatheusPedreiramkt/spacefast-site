"use client"

import { motion } from "framer-motion"
import { testimonials } from "@/lib/data"
import { Star } from "lucide-react"
import { stagger, fadeUp, VIEWPORT } from "@/lib/motion"

export default function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500/12 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/28 bg-yellow-500/8 text-yellow-300 text-sm font-medium mb-6">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" aria-hidden />
            Depoimentos de clientes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            O que nossos{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              clientes dizem
            </span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Resultados reais de empresas que transformaram sua presença digital com a SpaceFast.
          </p>
          {/* ⚠️ Substitua pelos depoimentos reais em lib/data.tsx */}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              className="glass glass-hover rounded-2xl p-5 border border-white/8 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4" aria-label="Avaliação 5 estrelas" role="img">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-400 text-sm leading-[1.7] flex-1 mb-5">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-medium leading-tight">{t.name}</p>
                  <p className="text-gray-600 text-xs mt-0.5">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        {/* Aggregate rating note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            <span className="text-white font-medium">5.0</span> de avaliação média · mais de{" "}
            <span className="text-white font-medium">40</span> clientes atendidos
          </p>
        </motion.div>
      </div>
    </section>
  )
}
