import type { Metadata } from "next"
import { SITE_URL, EMAIL } from "@/lib/constants"
import LandingPagesPage from "./LandingPagesPage"

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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SpaceFast — Criação de Landing Pages Profissionais",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
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

const faqJsonLd = [
  {
    question: "O que é uma landing page?",
    answer:
      "Uma landing page é uma página criada para conduzir o visitante a uma ação específica, como solicitar orçamento, preencher um formulário, chamar no WhatsApp ou comprar.",
  },
  {
    question: "Qual a diferença entre landing page e site?",
    answer:
      "O site apresenta a empresa de forma mais ampla, com várias informações e caminhos de navegação. A landing page tem foco em uma oferta ou campanha e reduz distrações para aumentar a conversão.",
  },
  {
    question: "Posso usar a landing page no Google Ads?",
    answer:
      "Sim. Uma landing page pode ser estruturada para campanhas no Google Ads, alinhando anúncio, oferta, conteúdo e chamada para ação.",
  },
  {
    question: "A landing page funciona no celular?",
    answer:
      "Sim. A página é planejada para boa experiência mobile, com leitura clara, carregamento rápido e botões de contato acessíveis.",
  },
  {
    question: "É possível integrar com WhatsApp?",
    answer:
      "Sim. A landing page pode ter chamadas para WhatsApp, botões fixos e mensagens pré-preenchidas conforme a estratégia definida para o projeto.",
  },
  {
    question: "Vocês configuram o rastreamento das conversões?",
    answer:
      "Quando faz parte do escopo do projeto, podemos configurar rastreamento com GTM, GA4, Meta Pixel e eventos importantes como cliques no WhatsApp e envio de formulários.",
  },
]

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
      mainEntity: faqJsonLd.map((item) => ({
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
