import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import styles from './mdx.module.css'
import { MDXClientRenderer } from './mdx-client'

// Server component to process MDX content
export async function CustomMDX({ source }) {
  const mdxSource = await serialize(source)
  const contentHtml = JSON.stringify(mdxSource)
  
  return (
    <div className={styles.mdxWrapper}>
      <MDXClientRenderer content={contentHtml} />
    </div>
  )
}
