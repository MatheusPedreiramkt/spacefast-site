"use client"

import { Zap, Mail } from "lucide-react"
import { WHATSAPP_URL, INSTAGRAM_URL, EMAIL } from "@/lib/constants"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { trackWhatsAppClick, trackInstagramClick } from "@/lib/analytics"

const QUICK_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Planos", href: "#planos" },
  { label: "Processo", href: "#processo" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
]

const SERVICE_LINKS = [
  "Criação de sites",
  "Landing pages",
  "Google Ads",
  "Facebook & Instagram Ads",
  "SEO básico",
  "Manutenção e suporte",
  "Pacote mensal",
]

// Inline SVG for Instagram brand icon (not available in lucide-react v1.17)
function InstagramSVG({ className = "w-4 h-4" }: { className?: string }) {
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

export default function Footer() {
  return (
    <footer className="relative bg-[#030712] border-t border-white/5">
      {/* Top gradient accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#inicio" className="inline-flex items-center gap-2 mb-5 group" aria-label="SpaceFast">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow shrink-0">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} aria-hidden />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">Space</span>
                <span className="text-cyan-400">Fast</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Criamos sites profissionais que transformam visitantes em clientes para empresas que
              querem crescer na internet.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() => trackWhatsAppClick("rodape_icone")}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:border-emerald-500/28 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <WhatsAppSVG className="w-4 h-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                onClick={() => trackInstagramClick()}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-pink-400 hover:border-pink-500/28 transition-all focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                <InstagramSVG className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="E-mail"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:border-blue-500/28 transition-all focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Mail className="w-4 h-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Links rápidos">
            <h4 className="text-white text-sm font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-gray-300 transition-colors focus-visible:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <span className="text-gray-600 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contato</h4>
            <div className="space-y-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("rodape_contato")}
                className="flex items-start gap-2.5 text-gray-500 hover:text-emerald-400 transition-colors group focus-visible:text-emerald-400"
              >
                <WhatsAppSVG className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-700 mb-0.5">WhatsApp</p>
                  <p className="text-sm">Fale com a gente</p>
                </div>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackInstagramClick()}
                className="flex items-start gap-2.5 text-gray-500 hover:text-pink-400 transition-colors focus-visible:text-pink-400"
              >
                <InstagramSVG className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-700 mb-0.5">Instagram</p>
                  <p className="text-sm">@spacefastmkt</p>
                </div>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-2.5 text-gray-500 hover:text-blue-400 transition-colors focus-visible:text-blue-400"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="text-xs text-gray-700 mb-0.5">E-mail</p>
                  <p className="text-sm break-all">{EMAIL}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} SpaceFast. Todos os direitos reservados.
          </p>
          <p className="text-gray-700 text-xs">
            Feito para gerar resultados.
          </p>
        </div>
      </div>
    </footer>
  )
}
