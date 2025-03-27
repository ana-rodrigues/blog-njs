import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get title from query params
    const title = searchParams.get('title') || 'Ana Rodrigues Portfolio';
    const subtitle = searchParams.get('subtitle') || 'Creative Design & Development';
    
    // Load the font
    const fontData = await fetch(
      new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap', req.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            color: 'white',
            padding: '40px 80px',
            textAlign: 'center',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 30,
              left: 30,
              fontSize: 25,
              fontWeight: 'bold',
            }}
          >
            Ana Rodrigues
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              width: '100%',
            }}
          >
            <h1
              style={{
                fontSize: 70,
                fontWeight: 'bold',
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 'normal',
                opacity: 0.8,
              }}
            >
              {subtitle}
            </h2>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              right: 30,
              fontSize: 25,
              opacity: 0.7,
            }}
          >
            anarodrigues.design
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
