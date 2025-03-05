import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import styles from './posts.module.css';

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className='container'>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className={`${styles.post}`}
            href={`/blog/${post.slug}`}
          >
            <div className={`${styles.postContent}`}>
              <p className={`monoSm ${styles.postDate}`}>{formatDate(post.metadata.publishedAt, false)}</p>
              <h2 className={`headingMd ${styles.postTitle}`}>{post.metadata.title}</h2>
{/*           <img className={`${styles.postImage}`} src={post.metadata.image} alt={post.metadata.alt}/> */}
            </div>
          </Link>
        ))}
    </div>
  )
}
