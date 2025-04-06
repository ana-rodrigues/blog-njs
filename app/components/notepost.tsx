import { formatDate, BlogPost } from 'app/feed/utils'
import styles from './notepost.module.css'

type NoteProps = {
  post: BlogPost
}

export default function Note({ post }: NoteProps) {
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
        <p className={`paragraphMd ${styles.postDate}`}>{post.metadata.summary}</p>
      </div>
    </article>
  )
}