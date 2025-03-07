import Link from 'next/link'
import { formatDate } from 'app/blog/utils'
import styles from './post.module.css'

export default function Post({ post }) {
  return (
    <Link
      key={post.slug}
      className={`${styles.post}`}
      href={`/blog/${post.slug}`}
    >
      <div className={`${styles.postContent}`}>
        <p className={`monoSm ${styles.postDate}`}>{formatDate(post.metadata.publishedAt, false)}</p>
        <h2 className={`headingMd ${styles.postTitle}`}>{post.metadata.title}</h2>
      </div>
    </Link>
  )
}