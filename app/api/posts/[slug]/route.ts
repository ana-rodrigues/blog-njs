import { getBlogPosts } from '../../../feed/utils.server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  context: { params: { slug: string } }
) {
  const { params } = context;
  try {
    const posts = await getBlogPosts()
    const post = posts.find((post) => post.slug === params.slug)

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
