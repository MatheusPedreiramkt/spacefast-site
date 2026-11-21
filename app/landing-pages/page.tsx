import type { Metadata } from "next"
import { SITE_URL, EMAIL } from "@/lib/constants"
import LandingPagesPage from "./LandingPagesPage"
import { FAQ_ITEMS } from "./faq"

const PAGE_URL = `${SITE_URL}/landing-pages`

const title = "Criação de Landing Pages Profissionais | SpaceFast"
const description =
  "Criamos landing pages profissionais, rápidas e estratégicas para campanhas no Google Ads, Facebook e Instagram, geração de leads e vendas."

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "criação de landing pages",
    "criação de landing page",
    "landing page profissional",
    "desenvolvimento de landing pages",
    "landing page para Google Ads",
    "landing page para Meta Ads",
    "página de vendas",
    "página de alta conversão",
    "landing page para geração de leads",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { "pt-BR": PAGE_URL },
  },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    locale: "pt_BR",
    siteName: "SpaceFast",
  },
  twitter: {
    card: "summary",
    title,
    description,
    creator: "@spacefastmkt",
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
      name: "Criação de Landing Pages Profissionais",
      description:
        "Desenvolvimento de landing pages profissionais, rápidas e estratégicas para campanhas, geração de leads e vendas.",
      provider: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "SpaceFast",
        url: SITE_URL,
      },
      serviceType: "Landing Page Design and Development",
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
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "SpaceFast",
      url: SITE_URL,
      email: EMAIL,
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}/#webpage`,
      url: PAGE_URL,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${PAGE_URL}/#service` },
      inLanguage: "pt-BR",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Landing Pages", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPagesPage />
    </>
  )
}
