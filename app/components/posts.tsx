import { getBlogPosts } from 'app/feed/utils'
import styles from './posts.module.css'
import HighlightedPost from './mediapost'
import Post from './post'

// Type definition
interface BlogPost {
  slug: string;
  metadata: {
    publishedAt: string;
    title: string;
    image: string;
    alt?: string;
    category: string;
    summary: string;
  };
}

export function BlogPosts() {
  let allBlogs: BlogPost[] = []

  try {
    allBlogs = getBlogPosts() as BlogPost[]
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return <p>Failed to load posts</p>
  }

  if (allBlogs.length === 0) {
    return <p>No posts available</p>
  }

  allBlogs.sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())

  return (
    <div className={`container ${styles.blogList}`}>
      {allBlogs.map((post) => {
        switch (post.metadata.category) {
          case 'notes':
            return <Post key={post.slug} post={post} />
          case 'experiments':
            return <HighlightedPost key={post.slug} post={post} />
          default:
            return <Post key={post.slug} post={post} />
        }
      })}
    </div>
  )
}
 