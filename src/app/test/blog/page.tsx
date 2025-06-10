'use client';

import { useEffect, useState } from 'react';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';

export default function TestBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Blog API</h1>
      
      {loading && <div className="text-gray-500">Loading blog posts...</div>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      {!loading && !error && posts.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>No blog posts found. Make sure your Notion database is set up correctly and contains published posts.</p>
        </div>
      )}
      
      {posts.length > 0 && (
        <div>
          <p className="mb-2">Found {posts.length} blog posts:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                {post.coverImageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {post.publishedDate ? formatDate(post.publishedDate) : 'No date'}
                  </p>
                  <p className="text-gray-600 mt-2">{post.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <span className="text-blue-600 hover:underline text-sm">
                      Read more (Slug: {post.slug})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 