import { getBlogPosts } from 'app/blog/utils'

let baseUrl;

if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION; // For production
} else {
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL_STAGING; // For staging or development
}

export { baseUrl };

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
