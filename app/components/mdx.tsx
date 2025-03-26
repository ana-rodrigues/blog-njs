import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import styles from './mdx.module.css'
import { MDXClientRenderer } from './mdx-client'

// Server component to process MDX content
export async function CustomMDX({ source }) {
  // Process the MDX content on the server
  const mdxSource = await serialize(source)
  
  // Convert the processed content to a string that can be safely passed to the client
  const contentHtml = JSON.stringify(mdxSource)
  
  // Return the client component with the processed content
  return (
    <div className={styles.mdxWrapper}>
      <MDXClientRenderer content={contentHtml} />
    </div>
  )
}
