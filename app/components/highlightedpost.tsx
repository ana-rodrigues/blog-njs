import Link from 'next/link'
import { formatDate } from 'app/feed/utils'
import styles from './highlightedpost.module.css'
import ClientSideTypewriter from './clientsidetypewriter'


export default function HighlightedPost({ post }) {
  const formattedDate = formatDate(post.metadata.publishedAt, false);

  return (
    <Link
      key={post.slug}
      className={`${styles.post}`}
      href={`/feed/${post.slug}`}
    >
      <article className={`${styles.postContent}`}>
        <p className={`monoSm ${styles.postDate}`}>{formatDate(post.metadata.publishedAt, false)}</p>
        <aside className="monoSm">
        <ClientSideTypewriter words={['Latest post']}
          />
      </aside>
        <h2 className={`headingXl ${styles.postTitle}`}>{post.metadata.title}</h2>
        <div className={styles.postImageContainer}>
          <img src={post.metadata.image} className={`${styles.postImage}`} />
          <div className={`monoSm ${styles.tooltipText}`}>Read article</div>
        </div>
      </article>
    </Link>
  )
}