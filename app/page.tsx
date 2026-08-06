import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Portfolio from "@/components/Portfolio"
import QualificacaoForm from "@/components/QualificacaoForm"
import Solutions from "@/components/Solutions"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import CTAFinal from "@/components/CTAFinal"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <QualificacaoForm />
        <Solutions />
        <Testimonials />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
