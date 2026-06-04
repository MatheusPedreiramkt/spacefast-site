"use client"

import { motion } from "framer-motion"
import { Globe, Rocket, BarChart2, Megaphone } from "lucide-react"
import { stagger, fadeUp, VIEWPORT } from "@/lib/motion"
import type { LucideIcon } from "lucide-react"

interface SolutionCard {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

const ITEMS: SolutionCard[] = [
  {
    icon: Globe,
    title: "Sites Profissionais",
    description: "Sites modernos e estratégicos para transmitir credibilidade e gerar contatos qualificados.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description: "Páginas de alta conversão para campanhas, lançamentos e captação de leads.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart2,
    title: "Google Ads",
    description: "Campanhas de pesquisa para aparecer na frente de quem já está buscando.",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: Megaphone,
    title: "Redes Sociais e Marketing",
    description: "Anúncios no Instagram e Facebook para alcançar o público certo e gerar resultados reais.",
    gradient: "from-pink-500 to-rose-500",
  },
]

export default function Solutions() {
  return (
    <section className="relative py-16 lg:py-20 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/8 text-purple-300 text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            Nossas Soluções
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            Soluções para{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              cada objetivo
            </span>{" "}
            do seu negócio
          </h2>
          <p className="text-gray-400 text-[1.02rem] leading-relaxed">
            Soluções digitais para atrair clientes, fortalecer sua marca e acelerar o crescimento do seu negócio.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {ITEMS.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="group glass glass-hover rounded-2xl p-5 h-full border border-white/8 hover:border-white/16 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} p-px mb-4 shrink-0`}>
                  <div className="w-full h-full rounded-[11px] bg-[#080e1e] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" aria-hidden />
                  </div>
                </div>
                <h3 className="text-white font-semibold text-[0.9rem] mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
