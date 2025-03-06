import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import styles from './posts.module.css'
import HighlightedPost from './highlightedpost'
import Post from './post'

// Define the type for a single blog post
interface BlogPost {
  slug: string;
  metadata: {
    publishedAt: string; // or Date if you are storing Date objects
    title: string;
  };
  // other properties of BlogPost
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
    <div className='container'>
      <HighlightedPost post={allBlogs[0]} />
      {allBlogs.slice(1).map((post) => (
        <Post key={post.slug} post={post} />
      ))}
    </div>
  )
}
