import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/feed/utils'
import { baseUrl } from 'app/sitemap'
import AnimatedWrapper from 'app/components/animatedwrapper'
import Image from 'next/image'
import styles from 'app/components/mdx.module.css'
import Breadcrumb from 'app/components/breadcrumb'


export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/feed/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }) {
  const { slug } = params;
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
      <AnimatedWrapper>
        <section className="container">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                description: post.metadata.summary,
                image: post.metadata.image
                  ? `${baseUrl}${post.metadata.image}`
                  : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                url: `${baseUrl}/feed/${post.slug}`,
                author: {
                  '@type': 'Person',
                  name: 'Ana Fernandes Rodrigues',
                },
              }),
            }}
          />
          <Breadcrumb title={post.metadata.title} />

          <h1 className={styles.h1}>{post.metadata.title}</h1>
          <p className={`monoSm ${styles.postDate}`}>{formatDate(post.metadata.publishedAt)}</p>


          <div className={styles.postHero}>         
            {post.metadata.image ? (
            <figure className={styles.imgWrapper}>
              <Image 
                src={post.metadata.image}
                alt={post.metadata.alt || post.metadata.title} 
                fill
                style={{ objectFit: 'cover' }} 
              />
            </figure>
          ) : null}
          <figcaption className={`paragraphSm ${styles.figcaption}`}>{post.metadata.alt || post.metadata.title}</figcaption>
          </div> 

          <div>
          <CustomMDX source={post.content} />
          </div>
        </section>
      </AnimatedWrapper>
  )
}
