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
          name: "Quanto custa um site?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nossos projetos de criação de site começam a partir de R$500, com o valor final definido conforme as funcionalidades e o escopo do seu projeto. Solicite um orçamento gratuito e sem compromisso pelo formulário desta página.",
          },
        },
        {
          "@type": "Question",
          name: "Em quanto tempo o site fica pronto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O prazo varia conforme a complexidade do projeto. Assim que enviamos o orçamento, você já recebe um cronograma claro, para saber exatamente quando o site ficará pronto.",
          },
        },
        {
          "@type": "Question",
          name: "O site funciona no celular?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Todos os sites são 100% responsivos e desenvolvidos com abordagem mobile-first, garantindo uma boa experiência em celular, tablet e computador.",
          },
        },
        {
          "@type": "Question",
          name: "O site terá botão para WhatsApp?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Todo site sai com botão de WhatsApp integrado e CTAs estratégicos posicionados ao longo da página, para transformar visitantes em conversas reais com sua empresa.",
          },
        },
        {
          "@type": "Question",
          name: "Preciso já possuir domínio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Não. Se você ainda não tem domínio nem hospedagem, nós te orientamos e ajudamos a providenciar tudo durante o processo de criação do site.",
          },
        },
        {
          "@type": "Question",
          name: "Posso solicitar alterações?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Depois que o site é entregue, você recebe orientações para atualizar textos e informações, além de contar com suporte direto para ajustes.",
          },
        },
        {
          "@type": "Question",
          name: "Vocês atendem empresas de todo o Brasil?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Atendemos empresas de todo o Brasil — todo o processo de criação de site é feito remotamente, do orçamento até a entrega.",
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
