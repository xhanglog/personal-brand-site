"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { id, title, slug, excerpt, coverImage, tags, publishedAt } = post;
  
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${slug}`} className="block h-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop'}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="text-sm text-gray-500 mb-2">
              {formattedDate}
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
              {excerpt}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-auto">
              {tags.slice(0, 3).map(tag => (
                <span 
                  key={tag} 
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}