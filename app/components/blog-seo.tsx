import React from 'react';
import Head from 'next/head';
import { baseUrl } from '../sitemap';
import StructuredData from './structured-data';

interface BlogSEOProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  slug: string;
  author?: string;
}

export default function BlogSEO({
  title,
  description,
  publishedAt,
  updatedAt,
  image,
  slug,
  author = 'Ana Rodrigues',
}: BlogSEOProps) {
  // Generate the OG image URL - either use provided image or generate one
  const ogImage = image 
    ? (image.startsWith('http') ? image : `${baseUrl}${image}`)
    : `${baseUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Blog Post')}`;

  return (
    <>
      <Head>
        {/* Canonical URL */}
        <link rel="canonical" href={`${baseUrl}/blog/${slug}`} />
        
        {/* Open Graph */}
        <meta property="og:url" content={`${baseUrl}/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={publishedAt} />
        {updatedAt && <meta property="article:modified_time" content={updatedAt} />}
        <meta property="article:author" content={author} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      
      {/* Add structured data for better SEO */}
      <StructuredData 
        type="BlogPosting"
        data={{
          title,
          description,
          image: ogImage,
          datePublished: publishedAt,
          dateModified: updatedAt || publishedAt,
          authorName: author,
          slug,
        }}
      />
    </>
  );
}
