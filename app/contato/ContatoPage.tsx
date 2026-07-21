"use client"

import { ArrowRight, FileText, Globe2, Megaphone, PanelsTopLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/constants"
import { trackCustomEvent, trackInstagramClick, trackWhatsAppClick } from "@/lib/analytics"
import { trackWhatsAppRedirect } from "@/lib/cqc"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"

const PORTFOLIO_URL = "https://www.behance.net/matheus_websites"

const CONTACT_LINKS = [
  {
    title: "Quero uma landing page",
    description: "Uma página estratégica para gerar contatos e vendas.",
    message: "Olá! Vim pelo Instagram e gostaria de saber mais sobre a criação de uma landing page.",
    eventName: "bio_landing_page_click",
    source: "bio_landing_page",
    icon: FileText,
  },
  {
    title: "Quero um site",
    description: "Um site profissional para apresentar sua empresa.",
    message: "Olá! Vim pelo Instagram e gostaria de saber mais sobre a criação de um site.",
    eventName: "bio_site_click",
    source: "bio_site",
    icon: Globe2,
  },
  {
    title: "Quero fazer anúncios",
    description: "Campanhas no Google e nas redes sociais.",
    message: "Olá! Vim pelo Instagram e gostaria de saber mais sobre gestão de anúncios.",
    eventName: "bio_ads_click",
    source: "bio_ads",
    icon: Megaphone,
  },
] as const

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function InstagramSVG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function ContatoPage() {
  return (
    <main
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#030712] px-4 py-8 text-white sm:px-6"
    >
      <div className="absolute inset-0 bg-grid opacity-70" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.18),transparent_42%),linear-gradient(180deg,rgba(3,7,18,0.62)_0%,rgba(3,7,18,0.96)_64%)]"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" aria-hidden />

      <div className="relative flex w-[calc(100vw-2rem)] min-w-0 max-w-[430px] flex-col items-center pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        <Link
          href="/"
          aria-label="SpaceFast"
          className="mb-8 inline-flex rounded-xl focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
        >
          <Image
            src="/logo.webp"
            alt="SpaceFast"
            width={220}
            height={102}
            priority
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        <header className="mb-8 text-center">
          <h1 className="mx-auto max-w-[20rem] text-[2rem] font-black leading-tight tracking-tight text-white sm:max-w-none sm:text-4xl">
            Como podemos ajudar?
          </h1>
          <p className="mx-auto mt-3 max-w-[20rem] text-base leading-relaxed text-gray-400">
            Escolha uma opção e fale com a gente.
          </p>
        </header>

        <nav aria-label="Links de contato da SpaceFast" className="w-full min-w-0 space-y-3.5">
          {CONTACT_LINKS.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.title}
                href={buildWhatsAppUrl(item.message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackCustomEvent(item.eventName, { source: "instagram_bio" })
                  trackWhatsAppClick(item.source, { content_name: item.title })
                  trackWhatsAppRedirect()
                }}
                className="group flex min-h-[82px] w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left shadow-xl shadow-black/18 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/[0.07] hover:shadow-blue-500/12 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold leading-snug text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-gray-400">
                    {item.description}
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors group-hover:border-cyan-400/35 group-hover:text-cyan-200">
                  <WhatsAppSVG className="h-4 w-4" />
                </span>
              </a>
            )
          })}

          <Link
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCustomEvent("bio_portfolio_click", { source: "instagram_bio" })}
            className="group flex min-h-[82px] w-full items-center gap-3 rounded-2xl border border-cyan-400/18 bg-cyan-400/[0.035] p-4 text-left shadow-xl shadow-black/14 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/38 hover:bg-cyan-400/[0.065] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/24 bg-cyan-400/10 text-cyan-200">
              <PanelsTopLeft className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold leading-snug text-white">
                Conheça nosso portfólio
              </span>
              <span className="mt-1 block text-sm leading-snug text-gray-400">
                Veja alguns projetos desenvolvidos pela SpaceFast.
              </span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/18 text-cyan-200 transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </nav>

        <footer className="mt-8 w-full border-t border-white/8 pt-5 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackInstagramClick()}
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-pink-300 focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
          >
            <InstagramSVG />
            @spacefastmkt
          </a>
          <p className="mt-2 text-xs leading-relaxed text-gray-600">
            SpaceFast — Estratégia digital para empresas.
          </p>
        </footer>
      </div>
    </main>
  )
}
