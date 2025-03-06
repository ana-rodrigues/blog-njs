import Link from 'next/link'
import { formatDate } from 'app/blog/utils'
import styles from './highlightedpost.module.css'

export default function HighlightedPost({ post }) {
  return (
    <Link
      key={post.slug}
      className={`${styles.post} ${styles.highlightedPost}`}
      href={`/blog/${post.slug}`}
    >
      <div className={`${styles.postContent}`}>
        <p className={`monoSm ${styles.postDate}`}>{formatDate(post.metadata.publishedAt, false)}</p>
        <h2 className={`headingMd ${styles.postTitle}`}>{post.metadata.title}</h2>
      </div>
    </Link>
  )
}