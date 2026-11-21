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

export default function Page() {
  return <ContatoPage />
}
