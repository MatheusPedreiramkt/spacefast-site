import type { Metadata } from "next"
import { preload } from "react-dom"
import { SITE_URL } from "@/lib/constants"
import ApresentacaoPage from "./ApresentacaoPage"

const PAGE_URL = `${SITE_URL}/diagnostico/apresentacao`

// Landing page longa de apresentação — não indexar (mesmo motivo de /diagnostico).
export const metadata: Metadata = {
  title: "Diagnóstico Gratuito | SpaceFast",
  description:
    "Descubra qual estrutura de site faz mais sentido para o seu negócio e veja exemplos de projetos.",
  alternates: { canonical: PAGE_URL },
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page() {
  // Poster do vídeo do hero é o elemento de LCP nesta página — adianta o
  // download com prioridade alta, antes do JS de hidratação competir por banda.
  preload("/video-apresentacao-poster.jpg", { as: "image", fetchPriority: "high" })

  return <ApresentacaoPage />
}
