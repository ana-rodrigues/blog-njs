import Image from 'next/image'
import { formatDate } from 'app/feed/utils'
import styles from './mediapost.module.css'

type MediaPostProps = {
  post: {
    slug: string
    metadata: {
      publishedAt: string
      title: string
      image: string
      alt?: string
      category: string
      summary: string
    }
  }
}

const getMediaType = (url: string): 'image' | 'video' => {
  const extension = url.split('.').pop()?.toLowerCase()
  return extension === 'mp4' ? 'video' : 'image'
}



export default function HighlightedPost({ post }: MediaPostProps) {
  const formattedDate = formatDate(post.metadata.publishedAt, false);
  const mediaType = getMediaType(post.metadata.image);

  return (
    <article
      key={post.slug}
      className={`${styles.post}`}>
      <div className={`${styles.postContent}`}>
      <div className={`${styles.postMeta}`}>
          <p className="monoSm">{formatDate(post.metadata.publishedAt, false)}</p>
          <p className="monoSm">{post.metadata.category}</p>
      </div>
        {mediaType === 'video' ? (
          <video
            src={post.metadata.image}
            controls={false}
            className={`${styles.postImage}`}
            playsInline
            autoPlay
            loop
            muted
          />
        ) : (
          <Image
            src={post.metadata.image}
            alt={post.metadata.alt || post.metadata.title}
            className={`${styles.postImage}`}
            width={800}
            height={450}
            quality={85}
            priority
          />
        )}
        <div className='paragraphMd'>{post.metadata.title}</div>
      </div>
    </article>
  )
}