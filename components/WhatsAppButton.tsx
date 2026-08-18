"use client"

import { motion, useReducedMotion } from "framer-motion"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { EASE } from "@/lib/motion"
import { trackWhatsAppClick } from "@/lib/analytics"
import { openWhatsAppWithTracking } from "@/lib/cqc"

export default function WhatsAppButton({
  pixelContentName,
  compactMobile = false,
  message = WHATSAPP_MESSAGE_TEXT,
}: { pixelContentName?: string; compactMobile?: boolean; message?: string } = {}) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={`fixed z-50 ${
        compactMobile
          ? "bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-6"
          : "bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6"
      }`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 280, damping: 22 }}
    >
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        onClick={(e) => {
          e.preventDefault()
          trackWhatsAppClick("botao_flutuante", {
            button_location: "floating",
            ...(pixelContentName ? { content_name: pixelContentName } : {}),
          })
          openWhatsAppWithTracking(message, WHATSAPP_NUMBER)
        }}
        className={`relative flex items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/35 hover:bg-emerald-400 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] ${
          compactMobile ? "gap-0 px-3.5 py-3.5 sm:gap-2.5 sm:px-5 sm:py-3.5" : "gap-2.5 px-5 py-3.5"
        }`}
        whileHover={prefersReduced ? undefined : { scale: 1.05 }}
        whileTap={prefersReduced ? undefined : { scale: 0.96 }}
        transition={{ ease: EASE, duration: 0.18 }}
      >
        <WhatsAppSVG className="w-5 h-5 shrink-0" />
        <span className={`${compactMobile ? "sr-only sm:not-sr-only" : ""} text-sm font-semibold leading-none`}>
          Falar no WhatsApp
        </span>
      </motion.a>
    </motion.div>
  )
}
