"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { FaExternalLinkAlt, FaGithub, FaCalendarAlt } from 'react-icons/fa';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { id, title, description, slug, coverImage, tags, category, demoUrl, sourceUrl, publishedAt } = project;
  
  // 格式化日期
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full will-change-transform"
      style={{ 
        transform: 'translateZ(0)',
        marginTop: '8px',
        marginBottom: '8px' 
      }}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-gray-100 dark:border-gray-700 transform-gpu hover:-translate-y-2"
      >
        {/* Image Container */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800 font-medium shadow-sm">
            {category}
          </div>
          
          {/* Project Links - Show on hover */}
          <div className="absolute bottom-3 right-3 flex space-x-2 scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right">
            {demoUrl && (
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                title="View Live Demo"
              >
                <FaExternalLinkAlt size={14} />
              </a>
            )}
            
            {sourceUrl && (
              <a 
                href={sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-300"
                title="View Source Code"
              >
                <FaGithub size={14} />
              </a>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
            <FaCalendarAlt className="mr-1" size={12} />
            <span>{formattedDate}</span>
          </div>
          
          <Link href={`/projects/${slug}`} className="block group-hover:text-blue-600 transition-colors">
            <h3 className="text-xl font-bold mb-3 transition-colors">
              {title}
            </h3>
          </Link>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3 text-sm">
            {description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full font-medium">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Read More Link */}
        <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <Link href={`/projects/${slug}`} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-flex items-center transition-colors">
            View Details
            <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 