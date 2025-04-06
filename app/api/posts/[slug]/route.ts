import { getBlogPosts } from '../../../feed/utils.server'
import { NextResponse } from 'next/server'

// Next.js 15 route handler with correct Promise-based params type signature
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const posts = await getBlogPosts()
    const post = posts.find((post) => post.slug === slug)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}
