"use client"

import { motion, useReducedMotion } from "framer-motion"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { EASE } from "@/lib/motion"
import { trackWhatsAppClick } from "@/lib/analytics"
import { openWhatsAppWithTracking } from "@/lib/cqc"

export default function WhatsAppButton({ pixelContentName }: { pixelContentName?: string } = {}) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
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
          trackWhatsAppClick(
            "botao_flutuante",
            pixelContentName ? { content_name: pixelContentName } : undefined,
          )
          openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
        }}
        className="relative flex items-center gap-2.5 rounded-full bg-emerald-500 px-5 py-3.5 text-white shadow-2xl shadow-emerald-500/35 hover:bg-emerald-400 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
        whileHover={prefersReduced ? undefined : { scale: 1.05 }}
        whileTap={prefersReduced ? undefined : { scale: 0.96 }}
        transition={{ ease: EASE, duration: 0.18 }}
      >
        <WhatsAppSVG className="w-5 h-5 shrink-0" />
        <span className="text-sm font-semibold leading-none">Falar no WhatsApp</span>
      </motion.a>
    </motion.div>
  )
}
