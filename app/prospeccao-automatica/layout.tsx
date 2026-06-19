import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google Maps + WhatsApp | Sistema de Captação de Clientes',
  description:
    'Aprenda a encontrar empresas no Google Maps, organizar contatos em planilhas e configurar um sistema de prospecção pelo WhatsApp.',
  keywords: [
    'google maps',
    'whatsapp',
    'captação de clientes',
    'prospecção automática',
    'sistema de prospecção',
    'leads empresas',
    'google places api',
    'automação whatsapp',
    'treinamento online',
    'curso prospecção',
  ],
  authors: [{ name: 'Matheus Pedreira' }],
  creator: 'SpaceFast Digital',
  publisher: 'SpaceFast Digital',
  metadataBase: new URL('https://spacefast.com.br'),
  alternates: {
    canonical: 'https://spacefast.com.br/prospeccao-automatica',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://spacefast.com.br/prospeccao-automatica',
    title: 'Google Maps + WhatsApp | Sistema de Captação de Clientes',
    description:
      'Aprenda a encontrar empresas no Google Maps, organizar contatos em planilhas e configurar um sistema de prospecção pelo WhatsApp.',
    siteName: 'SpaceFast Digital',
    // Place OG image at: /public/images/course/og-image.jpg (1200×630)
    images: [
      {
        url: '/images/course/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Google Maps + WhatsApp: Sistema de Captação de Clientes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Maps + WhatsApp | Sistema de Captação de Clientes',
    description:
      'Aprenda a encontrar empresas no Google Maps, organizar contatos em planilhas e configurar um sistema de prospecção pelo WhatsApp.',
    images: ['/images/course/og-image.jpg'],
    creator: '@spacefast',
  },
}

export default function ProspeccaoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
