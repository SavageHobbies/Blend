import { NextResponse } from 'next/server';
import { config } from 'lib/config';

export async function GET() {
  try {
    const response = await fetch(`${config.apiUrl}/rss-feeds`);
    if (response.ok) {
      const rssFeeds = await response.json();
      return NextResponse.json(rssFeeds);
    }
    return NextResponse.json(
      { error: 'Failed to fetch RSS feeds' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newFeed = await request.json();
    const response = await fetch(`${config.apiUrl}/rss-feeds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeed),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'RSS feed added successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to add RSS feed' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error adding RSS feed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const response = await fetch(`${config.apiUrl}/rss-feeds/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return NextResponse.json({ message: 'RSS feed deleted successfully' });
    }
    return NextResponse.json(
      { error: 'Failed to delete RSS feed' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error deleting RSS feed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
