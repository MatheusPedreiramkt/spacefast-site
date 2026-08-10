"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  LayoutTemplate,
  Megaphone,
  Menu,
  MonitorSmartphone,
  Search,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { EASE } from "@/lib/motion"
import { trackWhatsAppClick } from "@/lib/analytics"
import { openWhatsAppWithTracking } from "@/lib/cqc"

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
]

type ServiceItem = {
  label: string
  description: string
  href?: string
  icon: LucideIcon
}

const SERVICE_LINKS: ServiceItem[] = [
  {
    label: "Criação de Sites",
    description: "Sites profissionais focados em presença e conversão.",
    href: "/criacao-de-sites",
    icon: MonitorSmartphone,
  },
  {
    label: "Landing Pages",
    description: "Páginas estratégicas para campanhas.",
    href: "/landing-pages",
    icon: LayoutTemplate,
  },
  {
    label: "Sistemas Personalizados",
    description: "Soluções digitais para processos e operações.",
    icon: Workflow,
  },
  {
    label: "Google Ads",
    description: "Campanhas para captar clientes através do Google.",
    icon: Search,
  },
  {
    label: "Facebook e Instagram Ads",
    description: "Estratégias de anúncios através da Meta.",
    icon: Megaphone,
  },
]

export default function Header({
  pixelContentName,
  compact = false,
}: { pixelContentName?: string; compact?: boolean } = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const servicesMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close open header menus on escape key
  useEffect(() => {
    if (!isMenuOpen && !isServicesOpen && !isMobileServicesOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false)
        setIsServicesOpen(false)
        setIsMobileServicesOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isMenuOpen, isServicesOpen, isMobileServicesOpen])

  useEffect(() => {
    if (!isServicesOpen) return
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target
      if (target instanceof Node && !servicesMenuRef.current?.contains(target)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
    }
  }, [isServicesOpen])

  const handleNavClick = useCallback((href: string) => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
    setIsMobileServicesOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleServiceLinkClick = useCallback(() => {
    setIsServicesOpen(false)
    setIsMenuOpen(false)
    setIsMobileServicesOpen(false)
  }, [])

  return (
    <motion.header
      role="banner"
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030712]/92 backdrop-blur-2xl border-b border-white/5 shadow-xl shadow-black/25"
          : "bg-transparent"
      }`}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${compact ? "h-12 sm:h-16" : "h-16"}`}>

          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNavClick("#inicio") }}
            className="flex items-center focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] rounded-lg"
            aria-label="SpaceFast — voltar ao início"
          >
            <Image
              src="/logo.webp"
              alt="SpaceFast"
              width={220}
              height={102}
              className={`${compact ? "h-8 sm:h-10" : "h-10"} w-auto object-contain`}
            />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="px-3.5 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:rounded-lg"
              >
                {link.label}
              </a>
            ))}
            <div
              ref={servicesMenuRef}
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsServicesOpen(false)
                }
              }}
            >
              <button
                type="button"
                className="group inline-flex items-center gap-1.5 px-3.5 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:rounded-lg"
                onClick={() => setIsServicesOpen((v) => !v)}
                onFocus={() => setIsServicesOpen(true)}
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
                aria-controls="services-menu"
              >
                Serviços
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    id="services-menu"
                    aria-label="Serviços SpaceFast"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute left-1/2 top-full mt-3 w-[380px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#030712]/92 p-2 shadow-2xl shadow-black/35 backdrop-blur-2xl"
                  >
                    <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-[#030712]/92" aria-hidden />
                    <div className="relative space-y-1">
                      {SERVICE_LINKS.map((service) => {
                        const Icon = service.icon
                        const content = (
                          <>
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-300 transition-colors group-hover:border-cyan-300/25 group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                                {service.label}
                                {!service.href && (
                                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-gray-500">
                                    Em breve
                                  </span>
                                )}
                              </span>
                              <span className="mt-0.5 block text-xs leading-5 text-gray-500 group-hover:text-gray-400">
                                {service.description}
                              </span>
                            </span>
                          </>
                        )

                        if (service.href) {
                          return (
                            <Link
                              key={service.label}
                              href={service.href}
                              onClick={handleServiceLinkClick}
                              className="group flex items-start gap-3 rounded-xl px-3 py-3 outline-none transition-all duration-150 hover:bg-white/[0.055] focus-visible:bg-white/[0.055] focus-visible:ring-2 focus-visible:ring-white/30"
                            >
                              {content}
                            </Link>
                          )
                        }

                        return (
                          <div
                            key={service.label}
                            aria-disabled="true"
                            className="group flex cursor-default items-start gap-3 rounded-xl px-3 py-3 text-left opacity-80"
                          >
                            {content}
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault()
                trackWhatsAppClick(
                  "header_desktop",
                  pixelContentName ? { content_name: pixelContentName } : undefined,
                )
                openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
            >
              <WhatsAppSVG className="w-3.5 h-3.5" />
              WhatsApp
            </a>

            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all focus-visible:ring-2 focus-visible:ring-white/40"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" aria-hidden />
              ) : (
                <Menu className="w-5 h-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="lg:hidden overflow-hidden bg-[#030712]/96 backdrop-blur-2xl border-b border-white/5"
          >
            <nav
              aria-label="Navegação mobile"
              className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2, ease: EASE }}
                  className="px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.04, duration: 0.2, ease: EASE }}
                className="rounded-xl"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm text-gray-300 transition-all hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
                  onClick={() => setIsMobileServicesOpen((v) => !v)}
                  aria-expanded={isMobileServicesOpen}
                  aria-controls="mobile-services-menu"
                >
                  <span>Serviços</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isMobileServicesOpen && (
                    <motion.div
                      id="mobile-services-menu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 mt-1 border-l border-white/10 pl-2">
                        {SERVICE_LINKS.map((service) => {
                          const Icon = service.icon
                          const content = (
                            <>
                              <Icon className="h-4 w-4 shrink-0 text-cyan-300/90" aria-hidden />
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2">
                                  <span>{service.label}</span>
                                  {!service.href && (
                                    <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[10px] text-gray-500">
                                      Em breve
                                    </span>
                                  )}
                                </span>
                              </span>
                            </>
                          )

                          if (service.href) {
                            return (
                              <Link
                                key={service.label}
                                href={service.href}
                                onClick={handleServiceLinkClick}
                                className="flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-gray-300 transition-all hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
                              >
                                {content}
                              </Link>
                            )
                          }

                          return (
                            <div
                              key={service.label}
                              aria-disabled="true"
                              className="flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-gray-500"
                            >
                              {content}
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                onClick={(e) => {
                  e.preventDefault()
                  trackWhatsAppClick(
                    "header_mobile",
                    pixelContentName ? { content_name: pixelContentName } : undefined,
                  )
                  openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
                }}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
              >
                <WhatsAppSVG className="w-4 h-4" />
                Falar no WhatsApp
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
