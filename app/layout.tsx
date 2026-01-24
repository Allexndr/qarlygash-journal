import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { NextAuthProvider } from '@/components/NextAuthProvider'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://karlygash.kz'

export const metadata: Metadata = {
  title: {
    default: 'Қарлығаш - Психологический журнал',
    template: '%s | Қарлығаш',
  },
  description: 'Научные статьи, обзоры и отчеты о фундаментальных и прикладных исследованиях в области психологии',
  keywords: ['психология', 'подростки', 'депрессия', 'буллинг', 'психологический журнал'],
  authors: [{ name: 'Қарлығаш' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: baseUrl,
    siteName: 'Қарлығаш',
    title: 'Қарлығаш - Психологический журнал',
    description: 'Научные статьи, обзоры и отчеты о фундаментальных и прикладных исследованиях в области психологии',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Қарлығаш - Психологический журнал',
    description: 'Научные статьи, обзоры и отчеты о фундаментальных и прикладных исследованиях в области психологии',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Қарлығаш',
  url: baseUrl,
  logo: `${baseUrl}/logo.svg`,
  description: 'Психологический журнал',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Қарлығаш',
  url: baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/articles?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <NextAuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  )
}

