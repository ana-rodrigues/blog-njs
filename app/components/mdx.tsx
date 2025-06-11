import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import styles from './mdx.module.css'
import { MDXClientRenderer } from './mdx-client'

// Define props for the CustomMDX component
interface CustomMDXProps {
  source: string;
}

// Server component to process MDX content
export async function CustomMDX({ source }: CustomMDXProps) {
  // Add proper error handling for the source
  if (!source) {
    console.warn('No MDX source provided to CustomMDX');
    return <div className={styles.mdxWrapper}>
      <div className={styles.error}>No content available. The MDX source is missing.</div>
    </div>;
  }
  
  // Validate that source is a string
  if (typeof source !== 'string') {
    console.error('Invalid MDX source type:', typeof source);
    return <div className={styles.mdxWrapper}>
      <div className={styles.error}>Invalid content format. Expected string but got {typeof source}.</div>
    </div>;
  }

  try {
    // Use proper options for serialization to avoid clientModules error
    const mdxSource = await serialize(source, {
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development'
      }
    })
    
    const contentHtml = JSON.stringify(mdxSource)
    
    return (
      <div className={styles.mdxWrapper}>
        <MDXClientRenderer content={contentHtml} />
      </div>
    )
  } catch (error) {
    console.error('Error serializing MDX:', error);
    return <div className={styles.mdxWrapper}>
      <div className={styles.error}>
        <p>Error rendering content: {error.message || 'Unknown error'}</p>
        <p className="monoSm">Please check the console for more details.</p>
      </div>
    </div>;
  }
}
