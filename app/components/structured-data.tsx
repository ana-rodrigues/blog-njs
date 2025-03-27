import React from 'react';
import { baseUrl } from '../sitemap';

interface StructuredDataProps {
  type: 'BlogPosting' | 'WebPage' | 'Person' | 'Portfolio';
  data: {
    title: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
    slug?: string;
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const imageUrl = data.image ? 
    (data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`) : 
    `${baseUrl}/media/og-image.jpg`;

  let schema;

  switch (type) {
    case 'BlogPosting':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.description,
        image: imageUrl,
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        author: {
          '@type': 'Person',
          name: data.authorName || 'Ana Rodrigues',
        },
        publisher: {
          '@type': 'Person',
          name: 'Ana Fernandes Rodrigues',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/media/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/blog/${data.slug}`,
        },
      };
      break;

    case 'WebPage':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title,
        description: data.description,
        url: `${baseUrl}${data.slug ? `/${data.slug}` : ''}`,
        image: imageUrl,
        dateModified: data.dateModified || new Date().toISOString(),
      };
      break;

    case 'Person':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.authorName || 'Ana Rodrigues',
        description: data.description,
        url: baseUrl,
        image: imageUrl,
      };
      break;

    case 'Portfolio':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: data.title,
        description: data.description,
        url: `${baseUrl}${data.slug ? `/${data.slug}` : '/projects'}`,
        image: imageUrl,
        dateModified: data.dateModified || new Date().toISOString(),
      };
      break;

    default:
      schema = {};
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
