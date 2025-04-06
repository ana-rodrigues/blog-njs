'use client';

import { formatDate, BlogPost } from 'app/feed/utils'
import styles from './notepost.module.css'
import { MDXClientRenderer } from './mdx-client'
import { useEffect, useState } from 'react';

type NoteProps = {
  post: BlogPost
}

export default function Note({ post }: NoteProps) {
  const [serializedContent, setSerializedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function serializeMDX() {
      try {
        // Fetch the serialized MDX content from a new API endpoint
        const response = await fetch(`/api/mdx-serialize?content=${encodeURIComponent(post.content)}`);
        
        if (!response.ok) {
          throw new Error('Failed to serialize MDX content');
        }
        
        const data = await response.json();
        setSerializedContent(data.serializedContent);
      } catch (err) {
        console.error('Error serializing MDX:', err);
        setError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    }

    serializeMDX();
  }, [post.content]);

  return (
    <article
      key={post.slug}
      className={`${styles.post}`}
    >
      <div className={`${styles.postContent}`}>
        <div className={`${styles.postMeta}`}>
          <p className="monoSm">{formatDate(post.metadata.publishedAt, false)}</p>
          <p className="monoSm">{post.metadata.category}</p>
        </div>
        
        {isLoading && <p>Loading content...</p>}
        {error && <p className="error">{error}</p>}
        {serializedContent && <MDXClientRenderer content={serializedContent} />}
      </div>
    </article>
  )
}
