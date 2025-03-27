import { getBlogPosts } from 'app/blog/utils'

let baseUrl;

if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION; // For production
} else {
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL_STAGING; // For staging or development
}

export { baseUrl };

export default async function sitemap() {
  // Blog posts with higher priority for fresh content
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Main routes with appropriate priorities
  let routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  return [...routes, ...blogs]
}
