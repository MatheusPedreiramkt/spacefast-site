import type { Metadata } from "next"
import { OG_IMAGE } from "@/lib/seo"
import { SITE_URL } from "@/lib/constants"
import SistemasPersonalizadosPage from "./SistemasPersonalizadosPage"
import { FAQ_ITEMS } from "./faq"

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
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
      name: "Sistemas Personalizados para Empresas",
      description:
        "Desenvolvimento de sistemas personalizados para organizar processos, centralizar informações, automatizar tarefas e melhorar a gestão empresarial.",
      provider: { "@id": `${SITE_URL}/#organization` },
      serviceType: "Custom Software Development",
      areaServed: { "@type": "Country", name: "Brasil" },
      url: PAGE_URL,
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
      <SistemasPersonalizadosPage />
    </>
  )
}
