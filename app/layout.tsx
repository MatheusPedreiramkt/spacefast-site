import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SITE_URL, EMAIL, INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/constants"
import { GoogleTagManager } from "@/components/GoogleTagManager"
import ScrollTracker from "@/components/ScrollTracker"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" })

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SpaceFast | Sites Profissionais que Geram Clientes",
    template: "%s | SpaceFast",
  },
  description:
    "Criação de sites profissionais, landing pages, sistemas personalizados e gestão de anúncios para empresas. Rápidos, responsivos e integrados ao WhatsApp.",
  keywords: [
    "criação de sites profissionais", "agência digital", "landing page",
    "google ads", "facebook ads", "instagram ads", "marketing digital",
    "SEO", "hospedagem de sites", "e-mail profissional", "SpaceFast",
    "site para empresas", "presença digital",
  ],
  authors: [{ name: "SpaceFast", url: SITE_URL }],
  creator: "SpaceFast",
  publisher: "SpaceFast",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "SpaceFast",
    title: "SpaceFast | Sites Profissionais que Geram Clientes",
    description:
      "Agência digital premium. Sites rápidos, modernos e focados em conversão para empresas que querem crescer na internet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpaceFast | Sites Profissionais que Geram Clientes",
    description: "Agência digital premium. Sites rápidos, modernos e focados em conversão.",
    creator: "@spacefastmkt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: { canonical: SITE_URL, languages: { "pt-BR": SITE_URL } },
  verification: {
    other: {
      "facebook-domain-verification": "m5wycnszqdsb1c03qiauyrdjb334fj",
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#030712" }],
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Somente dados publicados no próprio site: nome, URL, logo, e-mail,
      // WhatsApp, Instagram, fundador (citado no hero) e atendimento no Brasil.
      // Sem endereço, CNPJ, horário ou avaliações até serem confirmados.
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "SpaceFast",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 628, height: 110 },
      description:
        "Criação de sites profissionais, landing pages, sistemas personalizados e gestão de anúncios para empresas.",
      email: EMAIL,
      sameAs: [INSTAGRAM_URL],
      founder: { "@type": "Person", name: "Matheus Pedreira", jobTitle: "Fundador" },
      areaServed: { "@type": "Country", name: "Brasil" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${WHATSAPP_NUMBER}`,
        email: EMAIL,
        availableLanguage: "Portuguese",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços SpaceFast",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Criação de Sites Profissionais", url: `${SITE_URL}/criacao-de-sites` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Criação de Landing Pages", url: `${SITE_URL}/landing-pages` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sistemas Personalizados", url: `${SITE_URL}/sistemas-personalizados` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestão de anúncios no Google Ads, Facebook e Instagram" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "SpaceFast",
      description: "Sites profissionais que transformam visitantes em clientes",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "pt-BR",
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      </head>

      <body className="min-h-full flex flex-col bg-[#030712] text-white overflow-x-hidden">
        <GoogleTagManager />

        {/* Skip link — acessibilidade */}
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        >
          Ir para o conteúdo principal
        </a>

        {children}

        {/* Rastreia scroll 75% — componente invisível */}
        <ScrollTracker />

      </body>
    </html>
  )
}
