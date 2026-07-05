"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ChevronLeft } from "lucide-react"

export default function DiagnosticoProgressBar({
  current,
  total,
  label,
  showBack = true,
  onBack,
}: {
  current: number // 1-based
  total: number
  label: string
  showBack?: boolean
  onBack: () => void
}) {
  const prefersReduced = useReducedMotion()
  const pct = Math.min(100, Math.round((current / total) * 100))

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar para a pergunta anterior"
          className="shrink-0 w-9 h-9 rounded-full border border-white/12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <ChevronLeft className="w-4.5 h-4.5" aria-hidden />
        </button>
      )}

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500 font-medium">{label}</span>
          <span className="text-xs text-gray-600">{pct}%</span>
        </div>
        <div
          className="h-1.5 rounded-full bg-white/8 overflow-hidden"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </div>
  )
}
