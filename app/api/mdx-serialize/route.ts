import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'next-mdx-remote/serialize'

export async function GET(request: NextRequest) {
  try {
    // Get the MDX content from the query parameter
    const searchParams = request.nextUrl.searchParams
    const content = searchParams.get('content')

    if (!content) {
      return NextResponse.json(
        { error: 'No content provided' },
        { status: 400 }
      )
    }

    // Serialize the MDX content
    const mdxSource = await serialize(content)
    
    // Return the serialized content
    return NextResponse.json({
      serializedContent: JSON.stringify(mdxSource)
    })
  } catch (error) {
    console.error('Error serializing MDX content:', error)
    return NextResponse.json(
      { error: 'Failed to serialize MDX content' },
      { status: 500 }
    )
  }
}
