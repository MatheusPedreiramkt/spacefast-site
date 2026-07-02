"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Loader2 } from "lucide-react"

const MESSAGES = [
  "Analisando seu negócio...",
  "Verificando objetivo...",
  "Calculando melhor estrutura...",
  "Preparando recomendação...",
]

const MESSAGE_INTERVAL = 1000 // ms — 4 mensagens ≈ 4s de "análise"

export default function DiagnosticoAnalisando({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (step >= MESSAGES.length - 1) {
      const finishTimer = window.setTimeout(onDone, MESSAGE_INTERVAL)
      return () => window.clearTimeout(finishTimer)
    }
    const timer = window.setTimeout(() => setStep((s) => s + 1), MESSAGE_INTERVAL)
    return () => window.clearTimeout(timer)
  }, [step, onDone])

  return (
    <section className="relative min-h-screen bg-[#030712] flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center text-center max-w-sm">
        <Loader2
          className={`w-10 h-10 text-blue-400 mb-8 ${prefersReduced ? "" : "animate-spin"}`}
          aria-hidden
        />

        <div className="h-14 flex items-center justify-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white text-lg font-medium"
            >
              {MESSAGES[step]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-56 h-1 rounded-full bg-white/8 overflow-hidden mt-6">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: `${((step + 1) / MESSAGES.length) * 100}%` }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  )
}
