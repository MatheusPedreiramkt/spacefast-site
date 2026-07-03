import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SITE_URL, EMAIL, INSTAGRAM_URL } from "@/lib/constants"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import { GoogleTagManager } from "@/components/GoogleTagManager"
import MetaPixel from "@/components/MetaPixel"
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
    "Agência digital premium. Criamos sites rápidos, modernos e estratégicos para empresas que querem vender mais, gerar contatos e transmitir autoridade. Google Ads, Meta Ads, SEO e suporte incluso.",
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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SpaceFast — Agência Digital Premium", type: "image/jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpaceFast | Sites Profissionais que Geram Clientes",
    description: "Agência digital premium. Sites rápidos, modernos e focados em conversão.",
    images: ["/og-image.jpg"],
    creator: "@spacefastmkt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: { canonical: SITE_URL, languages: { "pt-BR": SITE_URL } },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
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
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "SpaceFast",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
      description: "Agência digital especializada em criação de sites profissionais, landing pages, Google Ads, Facebook Ads e marketing digital.",
      email: EMAIL,
      sameAs: [INSTAGRAM_URL],
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: "Portuguese", email: EMAIL },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "SpaceFast",
      description: "Agência digital premium especializada em criação de sites profissionais, landing pages, gestão de anúncios e marketing digital.",
      url: SITE_URL,
      email: EMAIL,
      priceRange: "$$",
      image: `${SITE_URL}/og-image.jpg`,
      address: { "@type": "PostalAddress", addressCountry: "BR" },
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços SpaceFast",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Criação de Sites Profissionais" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Pages" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facebook e Instagram Ads" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pacote Mensal de Marketing" } },
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

        {/* Meta Pixel */}
        <MetaPixel />
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

        <GoogleAnalytics />

        {/* Rastreia scroll 75% — componente invisível */}
        <ScrollTracker />
      </body>
    </html>
  )
}
