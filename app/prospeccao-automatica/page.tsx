import { SITE_URL } from '@/lib/constants'
import CourseHeader from '@/components/course-landing/CourseHeader'
import CourseHero from '@/components/course-landing/CourseHero'
import CourseProblem from '@/components/course-landing/CourseProblem'
import HowItWorks from '@/components/course-landing/HowItWorks'
import DemoSection from '@/components/course-landing/DemoSection'
import LearningSection from '@/components/course-landing/LearningSection'
import CourseModules from '@/components/course-landing/CourseModules'
import MaterialsSection from '@/components/course-landing/MaterialsSection'
import AudienceSection from '@/components/course-landing/AudienceSection'
import InstructorSection from '@/components/course-landing/InstructorSection'
import OfferSection from '@/components/course-landing/OfferSection'
import GuaranteeSection from '@/components/course-landing/GuaranteeSection'
import CourseFAQ from '@/components/course-landing/CourseFAQ'
import CourseFinalCTA from '@/components/course-landing/CourseFinalCTA'
import ResponsibleUse from '@/components/course-landing/ResponsibleUse'
import CourseFooter from '@/components/course-landing/CourseFooter'
import MobileCheckoutBar from '@/components/course-landing/MobileCheckoutBar'

export default function ProspeccaoAutomaticaPage() {
  return (
    <div style={{ backgroundColor: '#080808', color: '#f8fafc', minHeight: '100vh' }}>
      {/* Structured data — Course schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Google Maps + WhatsApp: Sistema de Captação de Clientes',
            description:
              'Aprenda a encontrar empresas no Google Maps, organizar contatos em planilhas e configurar um sistema de prospecção pelo WhatsApp.',
            provider: {
              '@type': 'Organization',
              name: 'SpaceFast Digital',
              url: SITE_URL,
            },
            author: {
              '@type': 'Person',
              name: 'Matheus Pedreira',
            },
            inLanguage: 'pt-BR',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'BRL',
            },
          }),
        }}
      />

      <CourseHeader />

      <main>
        {/* Sentinel to detect when hero leaves viewport (for mobile bar) */}
        <div id="hero-bottom-sentinel" aria-hidden="true" />

        <CourseHero />
        <CourseProblem />
        <HowItWorks />
        <DemoSection />
        <LearningSection />
        <CourseModules />
        <MaterialsSection />
        <AudienceSection />
        <InstructorSection />
        <OfferSection />
        <GuaranteeSection />
        <CourseFAQ />
        <CourseFinalCTA />
        <ResponsibleUse />
      </main>

      <CourseFooter />
      <MobileCheckoutBar />
    </div>
  )
}
