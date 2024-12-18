import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

const RSS_FEEDS = [
  'https://feeds.feedburner.com/venturebeat/SZYF',
  'https://www.artificialintelligence-news.com/feed/',
  'https://www.unite.ai/feed/',
];

export async function GET() {
  try {
    const feedPromises = RSS_FEEDS.map(feed => parser.parseURL(feed));
    const feeds = await Promise.all(feedPromises);
    
    const allItems = feeds.flatMap(feed => feed.items);
    
    // Sort by date, most recent first
    const sortedItems = allItems.sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dateB - dateA;
    });
    
    // Take the 10 most recent items
    return NextResponse.json({ items: sortedItems.slice(0, 10) });
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return NextResponse.json({ items: [] });
  }
}
