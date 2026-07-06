"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { trackWhatsAppClick } from "@/lib/analytics"
import { EASE } from "@/lib/motion"
import type { Classification } from "@/lib/diagnostico"

const REDIRECT_DELAY = 1400

export default function DiagnosticoRedirecionando({
  classification,
  whatsAppUrl,
}: {
  classification: Classification
  whatsAppUrl: string
}) {
  const prefersReduced = useReducedMotion()
  const hasAttemptedOpenRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  const openWhatsApp = useCallback(() => {
    if (hasAttemptedOpenRef.current) return

    hasAttemptedOpenRef.current = true
    trackWhatsAppClick(`diagnostico_${classification}`, {
      content_name: "WhatsApp Diagnóstico",
      temperatura: classification,
    })
    window.location.assign(whatsAppUrl)
  }, [classification, whatsAppUrl])

  useEffect(() => {
    timerRef.current = window.setTimeout(openWhatsApp, REDIRECT_DELAY)

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [openWhatsApp])

  function handleFallbackClick() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (hasAttemptedOpenRef.current) return

    hasAttemptedOpenRef.current = true
    trackWhatsAppClick(`diagnostico_${classification}`, {
      content_name: "WhatsApp Diagnóstico",
      temperatura: classification,
    })
  }

  return (
    <section className="relative min-h-screen bg-[#030712] flex items-center justify-center overflow-hidden px-4 py-16">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 45%, rgba(59,130,246,0.14) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={prefersReduced ? undefined : { opacity: 0, y: 18 }}
        animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative max-w-md mx-auto text-center"
      >
        <Loader2
          className={`w-10 h-10 text-blue-400 mx-auto mb-7 ${prefersReduced ? "" : "animate-spin"}`}
          aria-hidden
        />

        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
          Recebemos suas respostas
        </h1>

        <p className="text-gray-400 text-base leading-relaxed mb-8">
          Estamos preparando sua conversa com um especialista da Space Fast. Você será redirecionado
          para o WhatsApp em instantes...
        </p>

        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleFallbackClick}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold text-[0.95rem] hover:from-emerald-400 hover:to-emerald-300 transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
        >
          <WhatsAppSVG className="w-5 h-5" />
          Se o WhatsApp não abrir, clique aqui
        </a>
      </motion.div>
    </section>
  )
}
