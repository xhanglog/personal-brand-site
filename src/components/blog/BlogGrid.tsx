"use client";

import { useSearchParams } from 'next/navigation';
import { BlogPost } from '@/types';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const searchParams = useSearchParams();
  const tags = searchParams.get('tags')?.split(',') || [];
  const search = searchParams.get('search') || '';
  
  // 过滤博客文章
  const filteredPosts = posts.filter(post => {
    // 按标签筛选
    if (tags.length > 0 && !tags.some(tag => post.tags.includes(tag))) {
      return false;
    }
    
    // 按搜索关键词筛选
    if (search.trim() !== '') {
      const searchLower = search.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(searchLower);
      const excerptMatch = post.excerpt.toLowerCase().includes(searchLower);
      const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!titleMatch && !excerptMatch && !tagsMatch) {
        return false;
      }
    }
    
    return true;
  });
  
  // 如果没有匹配的文章
  if (filteredPosts.length === 0) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-semibold mb-4">No articles found</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Try adjusting your filters or search query to find more articles.
        </p>
      </motion.div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
} 