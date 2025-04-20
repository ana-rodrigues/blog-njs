import { NextResponse } from 'next/server';

export function GET() {
  // Customize your robots.txt content as needed
  const content = `User-agent: *
Disallow:`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
