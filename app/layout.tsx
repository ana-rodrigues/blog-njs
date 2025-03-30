import './global.css'
import Nav from './components/nav'
import { Inter, Source_Code_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import Script from 'next/script'
import localFont from 'next/font/local'

// Google fonts with optimized loading
const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap', 
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'Arial']
})

const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'], 
  display: 'swap', 
  variable: '--font-source-code-pro',
  preload: true,
  fallback: ['monospace']
})

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
  preload: true,
  fallback: ['Times New Roman', 'serif']
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
  fallback: ['Times New Roman', 'serif']
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
  preload: true,
  fallback: ['Arial', 'sans-serif']
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

export const metadata = {
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
}

// Utility function to combine class names with proper typing
const cx = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ')

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
        sourceCodePro.variable,
        editorialUltralight.variable,
        editorialUltralightItalic.variable,
        neueMontreal.variable,
        departureMono.variable
      )}
    >
      <head>
        {/* Add preconnect for external resources */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
          {/* Add a script to preload images for the carousel */}
          <Script id="preload-carousel-images" strategy="afterInteractive">
            {`
              const preloadImages = () => {
                const imagesToPreload = [
                  '/media/thumb-55.png',
                  '/media/thumb-pour.png'
                ];
                imagesToPreload.forEach(src => {
                  const img = new Image();
                  img.src = src;
                });
              };
              if (window.requestIdleCallback) {
                requestIdleCallback(preloadImages);
              } else {
                setTimeout(preloadImages, 1000);
              }
            `}
          </Script>
        </main> 
      </body>
    </html>
  )
}
