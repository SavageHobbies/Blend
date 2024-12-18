import { config } from './config';

export interface RSSItem {
  title: string;
  link: string;
  content: string;
  contentSnippet: string;
  pubDate: string;
  categories?: string[];
}

export async function fetchRSSFeeds(): Promise<RSSItem[]> {
  try {
    const response = await fetch(config.endpoints.rss);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error('Failed to fetch RSS feeds');
    }
    
    return data.items;
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    // Return fallback data if API fails
    return [
      {
        title: "AI Breakthrough: New Language Model Shows Human-Like Reasoning",
        link: "https://example.com/ai-breakthrough",
        content: "Researchers have developed a new language model that demonstrates unprecedented reasoning capabilities...",
        contentSnippet: "Researchers have developed a new language model that demonstrates unprecedented reasoning capabilities...",
        pubDate: new Date().toISOString(),
        categories: ["AI Research"]
      },
      {
        title: "Machine Learning Transforms Healthcare Diagnostics",
        link: "https://example.com/ml-healthcare",
        content: "Healthcare providers are reporting significant improvements in diagnostic accuracy using new ML systems...",
        contentSnippet: "Healthcare providers are reporting significant improvements in diagnostic accuracy using new ML systems...",
        pubDate: new Date(Date.now() - 86400000).toISOString(),
        categories: ["Healthcare AI"]
      }
    ];
  }
}
