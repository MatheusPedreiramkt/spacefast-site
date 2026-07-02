"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { portfolioProjects } from "@/lib/data"
import { WHATSAPP_URL } from "@/lib/constants"
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react"
import { stagger, fadeUp, VIEWPORT, EASE, SECTION_ANIM } from "@/lib/motion"
import type { PortfolioProject } from "@/lib/data"
import { trackPortfolioClick } from "@/lib/analytics"

// ─── Per-accent glow color (RGB) and image-area tint ─────────────────────────
const ACCENT: Record<string, { rgb: string; bg: string }> = {
  blue:    { rgb: "59, 130, 246",  bg: "linear-gradient(150deg,#0a1630 0%,#070d1c 55%)" },
  emerald: { rgb: "16, 185, 129",  bg: "linear-gradient(150deg,#071a10 0%,#070d1c 55%)" },
  purple:  { rgb: "139, 92, 246",  bg: "linear-gradient(150deg,#0f0a20 0%,#070d1c 55%)" },
  orange:  { rgb: "249, 115, 22",  bg: "linear-gradient(150deg,#180a04 0%,#070d1c 55%)" },
}

// ─── Framer Motion variants ───────────────────────────────────────────────────
const cardV = {
  rest:  { y: 0,  scale: 1,     transition: { duration: 0.55, ease: EASE } },
  hover: { y: -5, scale: 1.018, transition: { duration: 0.55, ease: EASE } },
}
const glowV = {
  rest:  { opacity: 0.22, transition: { duration: 0.65 } },
  hover: { opacity: 0.58, transition: { duration: 0.5  } },
}
const overlayV = {
  rest:  { opacity: 0, transition: { duration: 0.28 } },
  hover: { opacity: 1, transition: { duration: 0.35 } },
}
const ctaBtnV = {
  rest:  { opacity: 0, y: 12, transition: { duration: 0.22 } },
  hover: { opacity: 1, y: 0,  transition: { duration: 0.28, ease: EASE, delay: 0.08 } },
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  reducedMotion,
}: {
  project: PortfolioProject
  reducedMotion: boolean
}) {
  const accent = ACCENT[project.accentColor] ?? ACCENT.blue
  const isExternal = project.url !== "#"
  const hoverProps = reducedMotion
    ? {}
    : { initial: "rest", animate: "rest", whileHover: "hover", variants: cardV }

  return (
    <motion.article
      {...hoverProps}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.14] transition-[border-color,box-shadow] duration-500 shadow-[0_4px_28px_-4px_rgba(0,0,0,0.55)] hover:shadow-[0_16px_48px_-8px_rgba(59,130,246,0.18)]"
      style={{ willChange: reducedMotion ? "auto" : "transform" }}
      aria-label={`Projeto: ${project.name}`}
    >
      {/* ────────────────────────────────────────────────────────────
          IMAGEM — ~60% do card, edge-to-edge, sem recorte
      ──────────────────────────────────────────────────────────── */}
      <div
        className="relative aspect-[16/9] overflow-hidden shrink-0"
        style={{ background: accent.bg }}
      >
        {/* Glow dinâmico (fica visível nas barras de letterbox do object-contain) */}
        <motion.div
          variants={reducedMotion ? undefined : glowV}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `radial-gradient(ellipse 80% 75% at 50% 50%, rgba(${accent.rgb}, 0.45) 0%, transparent 68%)`,
            filter: "blur(22px)",
          }}
        />

        {/* Imagem completa — object-contain garante que nada seja cortado */}
        <Image
          src={project.image}
          alt={`Preview do site ${project.name}`}
          fill
          sizes="(max-width: 640px) 94vw, (max-width: 1024px) 47vw, 600px"
          className="object-contain relative z-[2]"
          quality={90}
          draggable={false}
        />

        {/* Overlay escuro com blur — aparece no hover */}
        <motion.div
          variants={reducedMotion ? undefined : overlayV}
          className="absolute inset-0 z-[3] flex items-center justify-center"
          style={{
            background: "rgba(3,7,18,0.58)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
          }}
          aria-hidden
        >
          {/* Botão central — desktop, surge no hover */}
          <motion.a
            href={project.url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            variants={reducedMotion ? undefined : ctaBtnV}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-semibold text-sm shadow-2xl hover:bg-gray-50 active:scale-95 transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-blue-400"
            onClick={(e) => { if (!isExternal) e.preventDefault(); trackPortfolioClick(project.name) }}
            tabIndex={-1}
            aria-label={`Abrir site ${project.name}`}
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
            Ver Projeto
          </motion.a>
        </motion.div>

        {/* Linha separadora — faz a transição imagem→texto parecer intencionada */}
        <div
          className="absolute bottom-0 inset-x-0 h-px z-[4]"
          style={{ background: `rgba(${accent.rgb}, 0.18)` }}
        />
      </div>

      {/* ────────────────────────────────────────────────────────────
          CONTEÚDO — ~40% do card, compacto
      ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#0b1222] px-5 pt-4 pb-5 flex flex-col gap-2.5">

        {/* Categoria + Título */}
        <div>
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.18em] mb-1.5">
            {project.category}
          </p>
          <h3 className="text-white font-bold text-xl leading-snug group-hover:text-blue-100 transition-colors duration-300">
            {project.name}
          </h3>
        </div>

        {/* Descrição — uma linha, não corta a leitura */}
        <p className="text-gray-500 text-sm leading-snug line-clamp-1">
          {project.description}
        </p>

        {/* Tags com checkmarks — grade 2×2 compacta */}
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
          {project.tags.map((tag, j) => (
            <li key={j} className="flex items-center gap-1.5 min-w-0">
              <CheckCircle2
                className="w-3 h-3 shrink-0 text-emerald-500/55 group-hover:text-emerald-400 transition-colors duration-300"
                aria-hidden
              />
              <span className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors duration-300 leading-none truncate">
                {tag}
              </span>
            </li>
          ))}
        </ul>

        {/* Ver Projeto — sempre visível (mobile + fallback desktop) */}
        <a
          href={project.url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="group/cta inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-white transition-colors duration-200 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm mt-0.5"
          onClick={(e) => { if (!isExternal) e.preventDefault(); trackPortfolioClick(project.name) }}
          aria-label={`Ver projeto ${project.name}`}
        >
          Ver Projeto
          <ArrowRight
            className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform duration-200"
            aria-hidden
          />
        </a>

      </div>
    </motion.article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Portfolio({ onCtaClick }: { onCtaClick?: () => void } = {}) {
  const prefersReduced = useReducedMotion() ?? false

  return (
    <section id="portfolio" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/18 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/12 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/8 text-cyan-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" aria-hidden />
            Portfólio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Projetos que transmitem{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              confiança
            </span>{" "}
            e geram contatos
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Cada projeto desenvolvido com estratégia, design premium e foco total em conversão.
          </p>
        </motion.div>

        {/* Grid — 2 colunas, gap generoso */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 gap-5"
        >
          {portfolioProjects.map((project, i) => (
            <motion.div key={i} variants={fadeUp}>
              <ProjectCard project={project} reducedMotion={prefersReduced} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-12 text-center"
        >
          {onCtaClick ? (
            <button
              type="button"
              onClick={onCtaClick}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 hover:text-white hover:bg-white/4 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Quero um projeto assim
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden />
            </button>
          ) : (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 hover:text-white hover:bg-white/4 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Quero um projeto assim
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden />
            </a>
          )}
        </motion.div>

      </div>
    </section>
  )
}
