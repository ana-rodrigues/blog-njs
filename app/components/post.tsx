import Link from 'next/link'
import { formatDate, BlogPost } from 'app/feed/utils'
import styles from './post.module.css'

type PostProps = {
  post: BlogPost
}

export default function Post({ post }: PostProps) {
  return (
    <Link
      key={post.slug}
      className={`${styles.post}`}
      href={`/feed/${post.slug}`}
    >
      <div className={`${styles.postContent}`}>
        <div className={`${styles.postMeta}`}>
          <p className="monoSm">{formatDate(post.metadata.publishedAt, false)}</p>
          <p className="monoSm">{post.metadata.category}</p>
        </div>
        <h2 className={`headingMd ${styles.postTitle}`}>{post.metadata.title}</h2>
        <p className={`paragraphMd ${styles.postDate}`}>{post.metadata.summary}</p>

        <div className={styles.postAction} aria-label={`Read ${post.metadata.title}`}>
            <p className="monoSm">Read the full text</p>
        </div>
      </div>
    </Link>
  )
}