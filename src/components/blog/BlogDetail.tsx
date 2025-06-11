"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BlogPost } from '@/types';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTwitter, FaFacebook, FaLinkedin, FaLink } from 'react-icons/fa';

interface BlogDetailProps {
  post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const {
    title,
    excerpt,
    coverImage,
    content,
    tags,
    publishedAt,
  } = post;
  
  const [linkCopied, setLinkCopied] = useState(false);
  
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };
  
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };
  
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };
  
  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };
  
  return (
    <main className="container mx-auto px-4 py-12">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Blog
      </Link>
      
      <article className="max-w-4xl mx-auto">
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-gray-500 mb-2">
            {formattedDate}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{excerpt}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <Link 
                key={tag} 
                href={`/blog?tags=${encodeURIComponent(tag)}`}
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </motion.header>
        
        <motion.div 
          className="relative aspect-video mb-8 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image 
            src={coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop'}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* 社交分享按钮 */}
        <motion.div 
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            onClick={shareOnTwitter}
            className="p-2 rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-colors"
            aria-label="Share on Twitter"
          >
            <FaTwitter size={20} />
          </button>
          
          <button 
            onClick={shareOnFacebook}
            className="p-2 rounded-full bg-[#4267B2] text-white hover:bg-opacity-90 transition-colors"
            aria-label="Share on Facebook"
          >
            <FaFacebook size={20} />
          </button>
          
          <button 
            onClick={shareOnLinkedIn}
            className="p-2 rounded-full bg-[#0077B5] text-white hover:bg-opacity-90 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={20} />
          </button>
          
          <button 
            onClick={handleCopyLink}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-opacity-90 transition-colors relative"
            aria-label="Copy link"
          >
            <FaLink size={20} />
            {linkCopied && (
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </button>
        </motion.div>
        
        {/* 文章内容 */}
        <motion.div 
          className="prose prose-lg dark:prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* 渲染内容（简化版本，实际情况需要更复杂的处理） */}
          {content ? (
            <div>{content}</div>
          ) : (
            <div>
              <h2>Introduction</h2>
              <p>
                In today's rapidly evolving tech landscape, staying updated with the latest trends and best practices is crucial for developers.
                This article explores some key insights that can help you enhance your skills and build better applications.
              </p>
              
              <h2>Main Concepts</h2>
              <p>
                The fundamental principles of software development remain constant despite changing technologies. Clean code,
                efficient algorithms, and thoughtful architecture are timeless skills that every developer should master.
              </p>
              
              <p>
                However, modern development also requires familiarity with tools and frameworks that can significantly improve 
                productivity and code quality. Learning when to use these tools effectively is as important as knowing how to use them.
              </p>
              
              <h2>Practical Applications</h2>
              <p>
                Let's look at some practical examples of how these concepts can be applied in real-world scenarios. When building
                web applications, considering factors like performance, accessibility, and user experience from the beginning can
                save significant refactoring later.
              </p>
              
              <h2>Conclusion</h2>
              <p>
                Continuous learning and adaptation are essential skills for developers. By focusing on both fundamentals and emerging
                technologies, you can build a versatile skill set that remains valuable regardless of how the industry evolves.
              </p>
            </div>
          )}
        </motion.div>
      </article>
    </main>
  );
} 