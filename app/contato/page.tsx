import type { Metadata } from "next"
import { SITE_URL } from "@/lib/constants"
import ContatoPage from "./ContatoPage"

const PAGE_URL = `${SITE_URL}/contato`

export const metadata: Metadata = {
  title: {
    absolute: "Fale com a SpaceFast | Sites, Landing Pages e Anúncios",
  },
  description: "Escolha o serviço ideal para sua empresa e fale diretamente com a SpaceFast.",
  alternates: {
    canonical: PAGE_URL,
    languages: { "pt-BR": PAGE_URL },
  },
  openGraph: {
    title: "Fale com a SpaceFast | Sites, Landing Pages e Anúncios",
    description: "Escolha o serviço ideal para sua empresa e fale diretamente com a SpaceFast.",
    url: PAGE_URL,
    type: "website",
    locale: "pt_BR",
    siteName: "SpaceFast",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SpaceFast — Sites, Landing Pages e Anúncios",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fale com a SpaceFast | Sites, Landing Pages e Anúncios",
    description: "Escolha o serviço ideal para sua empresa e fale diretamente com a SpaceFast.",
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

export default function Page() {
  return <ContatoPage />
}
