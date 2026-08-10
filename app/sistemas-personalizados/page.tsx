import type { Metadata } from "next"
import { SITE_URL, EMAIL } from "@/lib/constants"
import SistemasPersonalizadosPage from "./SistemasPersonalizadosPage"

const PAGE_URL = `${SITE_URL}/sistemas-personalizados`

const title = "Sistemas Personalizados para Empresas | SpaceFast"
const description =
  "Desenvolvemos sistemas personalizados para organizar processos, centralizar informações, automatizar tarefas e melhorar a gestão da sua empresa."

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "sistemas personalizados",
    "desenvolvimento de sistemas personalizados",
    "sistema personalizado para empresas",
    "software personalizado",
    "sistema de gestão personalizado",
    "desenvolvimento de software sob medida",
    "sistema web personalizado",
    "automação de processos empresariais",
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
        alt: "SpaceFast — Sistemas Personalizados para Empresas",
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
    question: "O que é um sistema personalizado?",
    answer:
      "É um sistema desenvolvido para atender processos específicos da empresa, como controle de clientes, propostas, tarefas, financeiro, operação ou acompanhamento interno.",
  },
  {
    question: "Qual a diferença entre um sistema pronto e um sistema sob medida?",
    answer:
      "Um sistema pronto já nasce com regras definidas para muitos negócios. Um sistema sob medida é planejado em torno do processo real da sua empresa, quando há necessidades específicas.",
  },
  {
    question: "Que tipos de sistemas vocês desenvolvem?",
    answer:
      "Podemos desenvolver CRMs personalizados, controles de orçamentos, dashboards, portais para clientes, gestão de tarefas, fluxos operacionais e automações conforme o escopo do projeto.",
  },
  {
    question: "É possível integrar com ferramentas que minha empresa já utiliza?",
    answer:
      "Dependendo do projeto e das APIs disponíveis, podemos integrar com WhatsApp, e-mail, formulários, Google Sheets, meios de pagamento e outras ferramentas usadas pela empresa.",
  },
  {
    question: "O sistema funciona pelo celular?",
    answer:
      "Sim. O sistema pode ser desenvolvido com experiência responsiva para uso no celular, tablet e computador, conforme a necessidade dos usuários.",
  },
  {
    question: "Como é definido o valor de um sistema personalizado?",
    answer:
      "O valor depende das funcionalidades, quantidade de usuários, permissões, integrações, complexidade dos fluxos e nível de evolução previsto para o projeto.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}/#service`,
      name: "Sistemas Personalizados para Empresas",
      description:
        "Desenvolvimento de sistemas personalizados para organizar processos, centralizar informações, automatizar tarefas e melhorar a gestão empresarial.",
      provider: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "SpaceFast",
        url: SITE_URL,
      },
      serviceType: "Custom Software Development",
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
        { "@type": "ListItem", position: 2, name: "Sistemas Personalizados", item: PAGE_URL },
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
      <SistemasPersonalizadosPage />
    </>
  )
}
