import { Zap } from 'lucide-react'
import { INSTRUCTOR } from '@/lib/course-config'

export default function CourseFooter() {
  return (
    <footer
      className="py-10"
      role="contentinfo"
      style={{ background: '#060606', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <a
              href="https://spacefast.com.br"
              className="flex items-center gap-2"
              aria-label="SpaceFast"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon to-neon-dark flex items-center justify-center">
                <Zap size={13} className="text-black" strokeWidth={2.5} />
              </div>
              <span
                className="text-base font-extrabold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                Space<span className="text-neon-gradient">Fast</span>
              </span>
            </a>
            <span className="text-xs text-white/30">{INSTRUCTOR.brand}</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-white/35">
            <a
              href={INSTRUCTOR.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Instagram {INSTRUCTOR.instagram}
            </a>
            <a
              href={INSTRUCTOR.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              {INSTRUCTOR.site}
            </a>
            <a href="/politica-de-privacidade" className="hover:text-white/60 transition-colors">
              Política de Privacidade
            </a>
            <a href="/termos-de-uso" className="hover:text-white/60 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p>© {new Date().getFullYear()} SpaceFast Digital. Todos os direitos reservados.</p>
          <p>Este site não é afiliado ao Google, Meta ou WhatsApp.</p>
        </div>
      </div>
    </footer>
  )
}
