'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './mdx.module.css';
import { MDXRemote } from 'next-mdx-remote';

// Define interface for the MDX content
interface MDXContent {
  compiledSource: string;
  frontmatter?: Record<string, any>;
  scope?: Record<string, any>;
}

// Define the components to be used in MDX
const components = {
  h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
  h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
  h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
  p: ({ children }) => <p className={styles.p}>{children}</p>,
  a: ({ href, children }) => (
    <Link href={href} className={styles.a}>
      {children}
    </Link>
  ),
  ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
  ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
  li: ({ children }) => <li className={styles.li}>{children}</li>,
  
  blockquote: ({ children }) => (
    <blockquote className={styles.blockquote}>
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => (
    <code className={`${styles.code} ${className}`}>
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className={styles.pre}>
      {children}
    </pre>
  ),

  img: ({ src, alt }) => {
    // Handle image paths that might be relative
    const imageSrc = src.startsWith('/') || src.startsWith('http') ? src : `/${src}`;
    const [imageError, setImageError] = useState(false);
    
    return (
      <div className={styles.imgWrapper} style={imageError ? { backgroundColor: 'red', aspectRatio: '16/9' } : {}}>
        {!imageError && (
          <Image 
              src={imageSrc} 
              alt={alt || ''} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={80}
              style={{ objectFit: 'cover' }} 
              onError={() => {
                console.error(`Failed to load image: ${imageSrc}`);
                setImageError(true);
              }}
          />
        )}
      </div>
    );
  },
};

// Client component to render the MDX content
interface MDXClientRendererProps {
  content: string;
}

export function MDXClientRenderer({ content }: MDXClientRendererProps) {
  const [mdxContent, setMdxContent] = useState<MDXContent | null>(null);
  
  useEffect(() => {
    try {
      // Parse the serialized MDX content
      const parsedContent = JSON.parse(content);
      setMdxContent(parsedContent);
    } catch (error) {
      console.error('Error parsing MDX content:', error);
    }
  }, [content]);

  if (!mdxContent) {
    return <div>Loading content...</div>;
  }

  // Render the MDX content with the client-side MDXRemote
  return <MDXRemote 
    compiledSource={mdxContent.compiledSource}
    frontmatter={mdxContent.frontmatter}
    scope={mdxContent.scope}
    components={components} 
  />;
}
