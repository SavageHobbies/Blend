"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from 'components/ui/card';
import { Skeleton } from 'components/ui/skeleton';
import { v4 as uuidv4 } from 'uuid';

interface Article {
  title: string;
  content: string;
  category: string;
  id: string;
}

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  categories: string[];
}

interface RSSFeedItem extends RSSItem {
  type: 'rss';
}

type Post = Article | RSSFeedItem;

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const [articlesResponse, rssFeedsResponse] = await Promise.all([
          fetch("/api/articles"),
          fetch("/api/rss-feeds"),
        ]);

        let articles: Article[] = [];
        if (articlesResponse.ok) {
          articles = await articlesResponse.json();
        } else {
          console.error('Failed to fetch articles');
        }

        let rssItems: RSSFeedItem[] = [];
        if (rssFeedsResponse.ok) {
          const rssData = await rssFeedsResponse.json();
          rssItems = rssData.items.map((item: RSSItem) => ({ ...item, type: 'rss' }));
        } else {
          console.error('Failed to fetch RSS feeds');
        }

        const allPosts: Post[] = [...articles, ...rssItems];
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="pt-20 pb-16 bg-gradient-to-b from-slate-900 to-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Latest AI News</h1>
          <div className="space-y-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map(() => (
                <Card key={uuidv4()} className="p-6 bg-white/10 backdrop-blur-lg border-white/10">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-32 bg-slate-700" />
                    <Skeleton className="h-6 w-3/4 bg-slate-700" />
                    <Skeleton className="h-20 w-full bg-slate-700" />
                  </div>
                </Card>
              ))
            ) : (
              posts.map((post) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {post.link && (
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10 hover:bg-white/20 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-secondary text-sm">
                            {post.category || post.categories?.[0] || 'AI News'}
                          </span>
                          <span className="text-slate-400 text-sm">
                            {new Date(post.pubDate || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                        <h2 className="text-2xl font-semibold text-white mb-2">{post.title}</h2>
                        <p className="text-slate-300 mb-4 line-clamp-3">{post.contentSnippet || post.content}</p>
                        <div className="flex justify-end items-center">
                          <span className="text-secondary">Read more →</span>
                        </div>
                      </Card>
                    </a>
                  )}
                  {!post.link && (
                    <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10 hover:bg-white/20 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-secondary text-sm">
                          {post.category || post.categories?.[0] || 'AI News'}
                        </span>
                        <span className="text-slate-400 text-sm">
                          {new Date(post.pubDate || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-white mb-2">{post.title}</h2>
                      <p className="text-slate-300 mb-4 line-clamp-3">{post.contentSnippet || post.content}</p>
                      <div className="flex justify-end items-center">
                        <span className="text-secondary">Read more →</span>
                      </div>
                    </Card>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
