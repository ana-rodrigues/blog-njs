// This file is used by Next.js to generate favicon-related metadata
import { MetadataRoute } from 'next'

export default function favicon() {
  return [
    {
      rel: 'icon',
      url: '/favicon.ico',
      sizes: 'any',
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      type: 'image/png',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
  ]
}
