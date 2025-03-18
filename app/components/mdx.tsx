import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Image from 'next/image'
import styles from './mdx.module.css'

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

  img: ({ src, alt }) => (
    <div className={styles.imgWrapper}>
      <Image 
          src={src} 
          alt={alt || ''} 
          fill
          style={{ objectFit: 'cover' }} 
      />
    </div>
  ),
}

export function CustomMDX({ source }) {
  return <MDXRemote source={source} components={components} />
}
