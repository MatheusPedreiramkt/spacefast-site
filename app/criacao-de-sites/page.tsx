import type { Metadata } from "next"
import { SITE_URL, EMAIL } from "@/lib/constants"
import CriacaoDeSitesPage from "./CriacaoDeSitesPage"

const PAGE_URL = `${SITE_URL}/criacao-de-sites`

export const metadata: Metadata = {
  title: "Criação de Sites Profissionais | SpaceFast",
  description:
    "Criação de sites profissionais para empresas. Sites rápidos, modernos, responsivos e focados em geração de clientes para qualquer segmento.",
  keywords: [
    "criação de sites",
    "desenvolvimento de sites",
    "site profissional",
    "empresa de criação de sites",
    "criação de site para empresas",
    "agência de criação de sites",
    "site para empresas",
    "criar site para empresa",
    "criação de site profissional",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { "pt-BR": PAGE_URL },
  },
  openGraph: {
    title: "Criação de Sites Profissionais | SpaceFast",
    description:
      "Sites profissionais rápidos e modernos para gerar clientes. Responsivo, SEO otimizado e com integração WhatsApp.",
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
    title: "Criação de Sites Profissionais | SpaceFast",
    description:
      "Sites profissionais rápidos e modernos para gerar clientes. Responsivo, SEO otimizado e com integração WhatsApp.",
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
            text: "O investimento varia conforme a complexidade do projeto. Sites one page partem de R$997. Sites completos com várias páginas custam entre R$1.997 e R$4.997. Há também o plano mensal por R$597/mês, que inclui site, domínio, hospedagem e anúncios. Solicite um orçamento gratuito pelo WhatsApp — sem compromisso.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto tempo leva para criar um site?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sites one page ficam prontos em 5 a 7 dias. Sites com várias páginas levam de 10 a 20 dias úteis. Landing pages entregamos em até 5 dias. O prazo exato é combinado na conversa inicial e cumprimos o que prometemos.",
          },
        },
        {
          "@type": "Question",
          name: "O site aparece no Google após a criação?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Todos os sites incluem SEO técnico básico: estrutura semântica, meta tags, sitemap, Schema.org e velocidade de carregamento. O site é submetido ao Google Search Console. O posicionamento orgânico melhora progressivamente após a publicação.",
          },
        },
        {
          "@type": "Question",
          name: "Vocês fazem SEO junto com a criação do site?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim! Todo site já sai otimizado para SEO: headings corretos, meta descriptions, títulos, Schema.org, velocidade e responsividade. Para estratégias de SEO contínuo — produção de conteúdo, link building e posicionamento competitivo — temos serviços específicos.",
          },
        },
        {
          "@type": "Question",
          name: "Posso atualizar o conteúdo do site depois?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim! Entregamos acesso ao painel de administração para atualizar textos, imagens e informações. Também oferecemos suporte pós-entrega para ajustes — você não precisa depender de terceiros para pequenas mudanças.",
          },
        },
        {
          "@type": "Question",
          name: "O site funciona bem no celular?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Com certeza. Todos os nossos sites são 100% responsivos — funcionam perfeitamente em smartphones, tablets e computadores. Desenvolvemos com abordagem mobile-first, pois mais de 70% dos acessos vêm de dispositivos móveis.",
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
