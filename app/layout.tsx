import './global.css'
import Nav from './components/nav'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ana Fernandes Rodrigues | Full-stack experience designer | Discover my work portfolio',
    template: '%s | Ana Fernandes Rodrigues',
  },
  description: 'Full-stack experience designer with 8+ years of experience in crafting intuitive digital experiences, through roles in Product Design, Design Leadership and Product Management. A builder at heart, she excels at crafting products from 0 → 1, while establishing high-performing design teams.',
  keywords: ['UI/UX Design', 'Product Experience Design','Design Leadership', 'Fintech', 'Ecommerce', 'Frontend', 'Next.js', 'React'],
  authors: [{ name: 'Ana Fernandes Rodrigues' }],
  creator: 'Ana Fernandes Rodrigues',
  publisher: 'Ana Fernandes Rodrigues',
  openGraph: {
    title: 'Ana Fernandes Rodrigues | Full-stack experience designer | Discover my work portfolio',
    description: 'Full-stack experience designer with 8+ years of experience in crafting intuitive digital experiences, through roles in Product Design, Design Leadership and Product Management. A builder at heart, she excels at crafting products from 0 → 1, while establishing high-performing design teams.',
    url: baseUrl,
    siteName: 'Ana Fernandes Rodrigues | Full-stack experience designer | Discover my work portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/media/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ana Fernandes Rodrigues | Full-stack experience designer | Discover my work portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ana Fernandes Rodrigues | Full-stack experience designer | Discover my work portfolio',
    description: 'Full-stack experience designer with 8+ years of experience in crafting intuitive digital experiences, through roles in Product Design, Design Leadership and Product Management. A builder at heart, she excels at crafting products from 0 → 1, while establishing high-performing design teams.',
    images: [`${baseUrl}/media/og-image.jpg`],
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
  alternates: {
    canonical: baseUrl,
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body>
        <main id="main-content">
          <header>
            <Nav/>
          </header>
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
