"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const {
    title,
    description,
    coverImage,
    content,
    demoUrl,
    sourceUrl,
    tags,
    category,
    publishedAt,
  } = project;
  
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
  
  return (
    <main className="container mx-auto px-4 py-12">
      <Link 
        href="/projects" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Projects
      </Link>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 mr-4">{formattedDate}</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">
              {category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">{description}</p>
        </motion.div>
        
        {/* Cover Image */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 relative aspect-video rounded-lg overflow-hidden shadow-xl"
        >
          <Image
            src={coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Project Links */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <FaExternalLinkAlt className="mr-2" /> View Live Demo
            </a>
          )}
          
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <FaGithub className="mr-2" /> View Source Code
            </a>
          )}
        </motion.div>
        
        {/* Tags */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          {/* Render content if available, using a placeholder if not */}
          {content ? (
            <div>{content}</div>
          ) : (
            <div>
              <h2>Project Overview</h2>
              <p>
                This project showcases my ability to create modern, user-friendly interfaces while implementing 
                complex functionality. I focused on delivering a seamless user experience while ensuring the 
                codebase remains maintainable and scalable.
              </p>
              
              <h2>Challenges and Solutions</h2>
              <p>
                One of the major challenges I faced was optimizing performance for large datasets. I implemented 
                virtualization techniques and efficient state management to ensure smooth operation even with 
                thousands of records.
              </p>
              
              <h2>Results and Impact</h2>
              <p>
                The project resulted in a 40% increase in user engagement and significantly reduced load times. 
                The client was extremely satisfied with the final product, which exceeded their expectations in 
                terms of functionality and design.
              </p>
              
              <h2>What I Learned</h2>
              <p>
                Through this project, I deepened my understanding of state management patterns and gained valuable 
                experience with performance optimization techniques. I also improved my skills in creating 
                accessible interfaces that work well across different devices and screen sizes.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
} 