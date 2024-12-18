import { NextResponse } from 'next/server';
import { config } from 'lib/config';

export async function POST(request: Request) {
  try {
    const article = await request.json();
    const response = await fetch(`${config.apiUrl}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Article saved successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to save article' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${config.apiUrl}/articles`);
    if (response.ok) {
      const articles = await response.json();
      return NextResponse.json(articles);
    }
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
