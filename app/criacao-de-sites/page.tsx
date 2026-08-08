import type { Metadata } from "next"
import { SITE_URL, EMAIL } from "@/lib/constants"
import CriacaoDeSitesPage from "./CriacaoDeSitesPage"

const PAGE_URL = `${SITE_URL}/criacao-de-sites`

export const metadata: Metadata = {
  title: "Criação de Sites Profissionais para Empresas",
  description:
    "Criação de sites profissionais, rápidos, responsivos e estratégicos para empresas que querem transmitir credibilidade e gerar novos contatos. Conheça a SpaceFast.",
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SpaceFast — Criação de Sites Profissionais para Empresas",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Criação de Sites Profissionais para Empresas | SpaceFast",
    description:
      "Criação de sites profissionais, rápidos, responsivos e estratégicos para empresas que querem transmitir credibilidade e gerar novos contatos.",
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
      image: `${SITE_URL}/og-image.jpg`,
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
      mainEntity: [
        {
          "@type": "Question",
          name: "Quanto custa criar um site profissional?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O investimento varia de acordo com o escopo, as funcionalidades e os objetivos do seu projeto. Solicite um orçamento gratuito e personalizado pelo WhatsApp — sem compromisso.",
          },
        },
        {
          "@type": "Question",
          name: "O prazo para desenvolver um site é de quanto tempo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O prazo depende da complexidade e do escopo do projeto. Definimos um cronograma claro logo na conversa inicial, para que você saiba exatamente quando o site ficará pronto.",
          },
        },
        {
          "@type": "Question",
          name: "O site funciona bem no celular?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Com certeza. Todos os nossos sites são 100% responsivos — funcionam perfeitamente em smartphones, tablets e computadores. Desenvolvemos com abordagem mobile-first, já que a maior parte dos acessos vem de dispositivos móveis.",
          },
        },
        {
          "@type": "Question",
          name: "O site pode aparecer no Google?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Todos os sites são desenvolvidos com boas práticas de SEO técnico — estrutura semântica, meta tags otimizadas, sitemap e velocidade de carregamento — a base para o site ser bem indexado e ranquear ao longo do tempo.",
          },
        },
        {
          "@type": "Question",
          name: "Vocês fazem integração com WhatsApp?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim! Todos os sites já saem com botão flutuante do WhatsApp e CTAs estratégicos posicionados ao longo da página, para transformar visitantes em conversas reais.",
          },
        },
        {
          "@type": "Question",
          name: "Depois que o site estiver pronto, consigo fazer alterações?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim! Você recebe orientações para atualizar textos e informações, e também conta com suporte direto para ajustes — sem depender de terceiros para pequenas mudanças.",
          },
        },
      ],
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
      <CriacaoDeSitesPage />
    </>
  )
}
