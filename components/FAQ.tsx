"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { faqItems } from "@/lib/data"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { ChevronDown } from "lucide-react"
import { VIEWPORT, EASE, SECTION_ANIM } from "@/lib/motion"
import { openWhatsAppWithTracking } from "@/lib/cqc"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            Dúvidas frequentes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Respondemos as perguntas{" "}
            <span className="gradient-text-brand">mais comuns</span>
          </h2>
          <p className="text-gray-400 text-[1.05rem]">
            Não encontrou o que precisa?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault()
                openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
            >
              Fale diretamente conosco
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="max-w-3xl mx-auto space-y-2.5"
        >
          {/* índices 0,1,2,5 — as 4 perguntas mais relevantes para conversão */}
          {faqItems.filter((_, i) => [0, 1, 2, 5].includes(i)).map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`glass rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-blue-500/22 shadow-lg shadow-blue-500/5"
                    : "border-white/7 hover:border-white/14"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset rounded-2xl"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-medium text-sm leading-snug">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className={`w-4.5 h-4.5 transition-colors duration-150 ${isOpen ? "text-blue-400" : "text-gray-600"}`}
                      aria-hidden
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-400 text-sm leading-[1.75]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
