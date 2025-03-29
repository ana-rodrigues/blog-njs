import './global.css'
import Nav from './components/nav'
import type { Metadata } from 'next'
import { Inter, Source_Code_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'

// Initialize fonts
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], display: 'swap', variable: '--font-source-code-pro' })

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ana Fernandes Rodrigues | Full-stack experience designer',
    template: '%s | Ana Fernandes Rodrigues',
  },
  description: 'I’m a full-stack experience designer specialising in e-commerce and fintech, with a track record of roles in Product Design, Product Management, and Team Leadership.',
  keywords: ['UI/UX Design', 'Product Experience Design','Design Leadership', 'Fintech', 'E-commerce', 'Frontend', 'Next.js', 'React'],
  authors: [{ name: 'Ana Fernandes Rodrigues' }],
  creator: 'Ana Fernandes Rodrigues',
  publisher: 'Ana Fernandes Rodrigues',
  openGraph: {
    title: 'Ana Fernandes Rodrigues | Full-stack experience designer',
    description: 'I’m a full-stack experience designer specialising in e-commerce and fintech, with a track record of roles in Product Design, Product Management, and Team Leadership.',
    url: baseUrl,
    siteName: 'Ana Fernandes Rodrigues | Full-stack experience designer',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/media/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Ana Fernandes Rodrigues | Full-stack experience designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ana Fernandes Rodrigues | Full-stack experience designer',
    description: 'I’m a full-stack experience designer specialising in e-commerce and fintech, with a track record of roles in Product Design, Product Management, and Team Leadership.',
    images: [`${baseUrl}/media/og-image.png`],
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
        inter.variable,
        sourceCodePro.variable
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
