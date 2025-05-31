import './global.css'
import Nav from './components/nav'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import localFont from 'next/font/local'

// Define system font variables directly
const systemFonts = {
  sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
}

// Local fonts with optimized loading
const editorialUltralight = localFont({
  src: [
    {
      path: '../public/fonts/PPEditorialOld-Ultralight.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-editorial-ultralight',
  preload: false,
  fallback: ['serif']
})

const editorialUltralightItalic = localFont({
  src: [
    {
      path: '../public/fonts/PPEditorialOld-UltralightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-editorial-ultralight-italic',
  preload: false,
  fallback: ['serif']
})

const neueMontreal = localFont({
  src: [
    {
      path: '../public/fonts/NeueMontreal-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-neue-montreal',
  preload: false,
  fallback: ['sans-serif']
})

const neueMontrealBold = localFont({
  src: [
    {
      path: '../public/fonts/PPNeueMontreal-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-neue-montreal-bold',
  preload: false,
  fallback: ['sans-serif']
})

const departureMono = localFont({
  src: [
    {
      path: '../public/fonts/DepartureMono-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-departure-mono',
  preload: false,
  fallback: ['monospace']
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'The digital bureau of Ana Fernandes Rodrigues',
    template: '%s | The digital bureau of Ana Fernandes Rodrigues',
  },
  description: 'I’m a full-stack experience designer specialising in e-commerce and fintech, with a track record of roles in Product Design, Product Management, and Team Leadership.',
  keywords: ['UI/UX Design', 'Product Experience Design','Design Leadership', 'Fintech', 'E-commerce', 'Frontend', 'Next.js', 'React'],
  authors: [{ name: 'Ana Fernandes Rodrigues' }],
  creator: 'Ana Fernandes Rodrigues',
  publisher: 'Ana Fernandes Rodrigues',
  openGraph: {
    title: 'The digital bureau of Ana Fernandes Rodrigues',
    description: 'I’m a full-stack experience designer specialising in e-commerce and fintech, with a track record of roles in Product Design, Product Management, and Team Leadership.',
    url: baseUrl,
    siteName: 'The digital bureau of Ana Fernandes Rodrigues',
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
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
        editorialUltralight.variable,
        editorialUltralightItalic.variable,
        neueMontreal.variable,
        departureMono.variable
      )}
      style={{
        '--font-inter': systemFonts.sans,
        '--font-source-code-pro': systemFonts.mono,
      } as React.CSSProperties}
    >
      <head>
        {/* Safari-specific favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="mask-icon" href="/favicon.svg" color="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.png" />
        
        {/* Add preconnect for external resources */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      </head>
      <body>
        <main id="main-content">
          <header>
            <Nav/>
          </header>
          {children}
          {/* Defer non-critical analytics */}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
