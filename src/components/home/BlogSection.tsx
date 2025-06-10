"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
}

// 验证URL是否有效
const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  // 基本的URL验证
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blog/latest?limit=3');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchLatestPosts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
            <p className="text-gray-600">Loading latest articles...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full animate-pulse">
                <div className="bg-gray-200 h-40"></div>
                <CardContent className="pt-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my thoughts, tutorials, and insights on web development, design, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} hover bordered className="h-full">
              <div className="aspect-w-16 aspect-h-9 relative bg-gray-100 h-40">
                {isValidImageUrl(post.coverImage) ? (
                  <Image 
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex} variant="info" size="sm">{tag}</Tag>
                  ))}
                </div>
                <Button variant="link" size="sm">
                  <Link href={`/blog/${post.slug}`}>Read Article</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            iconPosition="right"
          >
            <Link href="/blog">Read All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 