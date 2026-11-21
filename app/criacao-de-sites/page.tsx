import type { Metadata } from "next"
import { preload } from "react-dom"
import { OG_IMAGE } from "@/lib/seo"
import { SITE_URL, EMAIL } from "@/lib/constants"
import CriacaoDeSitesPage from "./CriacaoDeSitesPage"
import { FAQ_ITEMS } from "./faq"

const PAGE_URL = `${SITE_URL}/criacao-de-sites`

export const metadata: Metadata = {
  title: "Criação de Sites Profissionais para Empresas",
  description:
    "Criação de sites profissionais, rápidos, responsivos e estratégicos para empresas que querem transmitir credibilidade e gerar novos contatos.",
  keywords: [
    "criação de sites",
    "criação de sites profissionais",
    "desenvolvimento de sites",
    "empresa de criação de sites",
    "criação de site para empresas",
    "site profissional",
    "desenvolvimento de site profissional",
    "criação de sites responsivos",
    "criação de sites personalizados",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { "pt-BR": PAGE_URL },
  },
  openGraph: {
    title: "Criação de Sites Profissionais para Empresas | SpaceFast",
    description:
      "Criação de sites profissionais, rápidos, responsivos e estratégicos para empresas que querem transmitir credibilidade e gerar novos contatos.",
    url: PAGE_URL,
    type: "website",
    locale: "pt_BR",
    siteName: "SpaceFast",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Criação de Sites Profissionais para Empresas | SpaceFast",
    description:
      "Criação de sites profissionais, rápidos, responsivos e estratégicos para empresas que querem transmitir credibilidade e gerar novos contatos.",
    creator: "@spacefastmkt",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}/#service`,
      name: "Criação de Sites Profissionais",
      description:
        "Desenvolvimento de sites profissionais, rápidos, responsivos e otimizados para SEO, para empresas de qualquer segmento.",
      provider: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "SpaceFast",
        url: SITE_URL,
      },
      serviceType: "Web Design and Development",
      areaServed: { "@type": "Country", name: "Brasil" },
      url: PAGE_URL,
      offers: {
        "@type": "Offer",
        url: PAGE_URL,
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "SpaceFast" },
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "SpaceFast",
      description:
        "Agência especializada em criação de sites profissionais para empresas de qualquer segmento.",
      url: SITE_URL,
      email: EMAIL,
      priceRange: "$$",
      address: { "@type": "PostalAddress", addressCountry: "BR" },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "SpaceFast",
      url: SITE_URL,
      email: EMAIL,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Criação de Sites", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
}

export default function Page() {
  // Poster do vídeo do Hero é o elemento de LCP nesta página — adianta o
  // download com prioridade alta, antes do JS de hidratação competir por banda.
  preload("/hero-video-poster.webp", { as: "image", type: "image/webp", fetchPriority: "high" })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CriacaoDeSitesPage />
    </>
  )
}
