"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import DiagnosticoLanding from "@/components/diagnostico/DiagnosticoLanding"

export default function ApresentacaoPage() {
  const router = useRouter()
  const [scrollToPortfolio, setScrollToPortfolio] = useState(
    () => typeof window !== "undefined" && window.location.hash === "#portfolio",
  )

  return (
    <>
      <Header pixelContentName="WhatsApp Header - Diagnóstico" />
      <DiagnosticoLanding
        onStart={() => router.push("/diagnostico")}
        scrollToPortfolio={scrollToPortfolio}
        onScrolled={() => setScrollToPortfolio(false)}
      />
      <Footer />
      <WhatsAppButton pixelContentName="WhatsApp Flutuante - Diagnóstico" />
    </>
  )
}
