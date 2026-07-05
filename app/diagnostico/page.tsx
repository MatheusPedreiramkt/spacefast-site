import type { Metadata } from "next"
import { SITE_URL } from "@/lib/constants"
import DiagnosticoPage from "./DiagnosticoPage"

const PAGE_URL = `${SITE_URL}/diagnostico`

// Página de destino para tráfego pago (Facebook Ads) — não indexar para não
// competir com as páginas orgânicas do site nem expor o funil de qualificação.
// Abre direto no quiz (sem landing) para reduzir fricção do funil pago.
export const metadata: Metadata = {
  title: "Diagnóstico Gratuito | SpaceFast",
  description:
    "Responda um diagnóstico rápido e descubra qual estrutura de site faz mais sentido para o seu negócio.",
  alternates: { canonical: PAGE_URL },
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page() {
  return <DiagnosticoPage />
}
