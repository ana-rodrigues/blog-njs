'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './mdx.module.css';
import { MDXRemote } from 'next-mdx-remote';
import { MDXClientRendererProps, MDXComponentProps, MDXLinkProps, MDXCodeProps, MDXImageProps, MDXContent } from './mdx-types';

// Use types from mdx-types.ts

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
  strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
  em: ({ children }) => <em className={styles.em}>{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className={styles.blockquote}>
      {children}
    </blockquote>
  ),
  // Table components
  table: ({ children }) => <div className={styles.tableContainer}><table className={styles.table}>{children}</table></div>,
  thead: ({ children }) => <thead className={styles.thead}>{children}</thead>,
  tbody: ({ children }) => <tbody className={styles.tbody}>{children}</tbody>,
  tr: ({ children }) => <tr className={styles.tr}>{children}</tr>,
  th: ({ children }) => <th className={styles.th}>{children}</th>,
  td: ({ children }) => <td className={styles.td}>{children}</td>,
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

  CustomImage: ({ src, alt }) => {
    // Handle image paths that might be relative
    const imageSrc = src.startsWith('/') || src.startsWith('http') ? src : `/${src}`;
    const [imageError, setImageError] = useState(false);
    
    return (
      <div className={styles.imgContainer}>
        {!imageError ? (
          <Image 
              src={imageSrc} 
              alt={alt || ''} 
              width={1200}
              height={675} // 16:9 aspect ratio as a default
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className={styles.responsiveImage}
              loading="lazy"
              quality={90}
              onError={() => {
                console.error(`Failed to load image: ${imageSrc}`);
                setImageError(true);
              }}
          />
        ) : (
          <div className={styles.errorPlaceholder} aria-label="Image failed to load" />
        )}
        {alt && <div className={styles.imageCaption}>{alt}</div>}
      </div>
    );
  },
};



// Client component to render the MDX content
// Using MDXClientRendererProps from mdx-types.ts

export function MDXClientRenderer({ content }: MDXClientRendererProps) {
  const [mdxContent, setMdxContent] = useState<MDXContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      if (!content) {
        setError('No content provided');
        return;
      }
      
      const parsedContent = JSON.parse(content) as MDXContent;
      setMdxContent(parsedContent);
    } catch (err) {
      console.error('Error parsing MDX content:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [content]);
  
  if (error) {
    return <div className={styles.error}>Error rendering content: {error}</div>;
  }
  
  if (!mdxContent) {
    return <div className={`monoSm ${styles.loading}`}>Loading content...</div>;
  }

  // Render the MDX content with the client-side MDXRemote
  return <MDXRemote 
    compiledSource={mdxContent.compiledSource}
    frontmatter={mdxContent.frontmatter}
    scope={mdxContent.scope}
    components={components} 
  />;
}
