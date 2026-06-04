"use client"

import { useEffect } from "react"
import { trackScroll75 } from "@/lib/analytics"

// Componente invisível: só adiciona um listener de scroll.
// Dispara scroll_75 uma única vez por sessão.
export default function ScrollTracker() {
  useEffect(() => {
    // Evita re-adicionar o listener se já disparou nesta sessão
    try {
      if (sessionStorage.getItem("sf_scroll75")) return
    } catch {
      // sessionStorage indisponível — prossegue normalmente
    }

    const onScroll = () => {
      const ratio =
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight
      if (ratio >= 0.75) {
        trackScroll75()
        window.removeEventListener("scroll", onScroll)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return null
}
