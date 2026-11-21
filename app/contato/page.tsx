import type { Metadata } from "next"
import { OG_IMAGE } from "@/lib/seo"
import { SITE_URL } from "@/lib/constants"
import ContatoPage from "./ContatoPage"

const PAGE_URL = `${SITE_URL}/contato`

export const metadata: Metadata = {
  title: {
    absolute: "Fale com a SpaceFast | Sites, Landing Pages e Anúncios",
  },
  description: "Fale com a SpaceFast pelo WhatsApp sobre sites, landing pages, sistemas personalizados ou gestão de anúncios. Atendemos empresas de todo o Brasil.",
  alternates: {
    canonical: PAGE_URL,
    languages: { "pt-BR": PAGE_URL },
  },
  openGraph: {
    title: "Fale com a SpaceFast | Sites, Landing Pages e Anúncios",
    description: "Fale com a SpaceFast pelo WhatsApp sobre sites, landing pages, sistemas personalizados ou gestão de anúncios. Atendemos empresas de todo o Brasil.",
    url: PAGE_URL,
    type: "website",
    locale: "pt_BR",
    siteName: "SpaceFast",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fale com a SpaceFast | Sites, Landing Pages e Anúncios",
    description: "Fale com a SpaceFast pelo WhatsApp sobre sites, landing pages, sistemas personalizados ou gestão de anúncios. Atendemos empresas de todo o Brasil.",
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
      "@type": "ContactPage",
      "@id": `${PAGE_URL}/#webpage`,
      url: PAGE_URL,
      name: "Fale com a SpaceFast",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "pt-BR",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Contato", item: PAGE_URL },
      ],
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContatoPage />
    </>
  )
}
