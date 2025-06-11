"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Project } from '@/types';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

interface ProjectDetailProps {
  project: Project;
}

// 处理Notion内容块的函数
function renderNotionBlock(block: any, index: number) {
  if (!block) return null;
  
  // 根据块类型进行不同处理
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={block.id || index} className="mb-4">
          {block.paragraph?.rich_text?.map((text: any, i: number) => (
            <span 
              key={i}
              className={`
                ${text.annotations?.bold ? 'font-bold' : ''} 
                ${text.annotations?.italic ? 'italic' : ''} 
                ${text.annotations?.underline ? 'underline' : ''} 
                ${text.annotations?.strikethrough ? 'line-through' : ''} 
                ${text.annotations?.code ? 'font-mono bg-gray-100 px-1 rounded' : ''}
              `}
            >
              {text.plain_text}
            </span>
          )) || ''}
        </p>
      );
    
    case 'heading_1':
      return (
        <h1 key={block.id || index} className="text-3xl font-bold mt-8 mb-4">
          {block.heading_1?.rich_text?.map((text: any) => text.plain_text).join('') || ''}
        </h1>
      );
    
    case 'heading_2':
      return (
        <h2 key={block.id || index} className="text-2xl font-bold mt-8 mb-4">
          {block.heading_2?.rich_text?.map((text: any) => text.plain_text).join('') || ''}
        </h2>
      );
    
    case 'heading_3':
      return (
        <h3 key={block.id || index} className="text-xl font-bold mt-6 mb-3">
          {block.heading_3?.rich_text?.map((text: any) => text.plain_text).join('') || ''}
        </h3>
      );
    
    case 'bulleted_list_item':
      return (
        <li key={block.id || index} className="ml-6 list-disc mb-2">
          {block.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''}
        </li>
      );
    
    case 'numbered_list_item':
      return (
        <li key={block.id || index} className="ml-6 list-decimal mb-2">
          {block.numbered_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''}
        </li>
      );
    
    case 'image':
      const imageUrl = block.image?.file?.url || block.image?.external?.url;
      return imageUrl ? (
        <div key={block.id || index} className="my-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image 
              src={imageUrl}
              alt={block.image?.caption?.map((text: any) => text.plain_text).join('') || 'Project image'}
              fill
              className="object-cover"
            />
          </div>
          {block.image?.caption?.length > 0 && (
            <p className="text-center text-gray-500 text-sm mt-2">
              {block.image.caption.map((text: any) => text.plain_text).join('')}
            </p>
          )}
        </div>
      ) : null;
    
    case 'quote':
      return (
        <blockquote key={block.id || index} className="border-l-4 border-gray-300 pl-4 italic my-4">
          {block.quote?.rich_text?.map((text: any) => text.plain_text).join('') || ''}
        </blockquote>
      );
    
    case 'code':
      return (
        <pre key={block.id || index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <code className="text-sm font-mono">
            {block.code?.rich_text?.map((text: any) => text.plain_text).join('') || ''}
          </code>
        </pre>
      );
    
    case 'divider':
      return <hr key={block.id || index} className="my-8 border-gray-200" />;
      
    default:
      // 对于未处理的块类型，返回简单文本
      return (
        <div key={block.id || index} className="my-4">
          <p className="text-gray-500 italic">[Content block of type "{block.type}" not rendered]</p>
        </div>
      );
  }
}

// 合并列表项的辅助函数
function processBlocks(blocks: any[]) {
  if (!blocks || blocks.length === 0) return [];
  
  const processedBlocks: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let listType: string | null = null;
  
  blocks.forEach((block, index) => {
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const currentListType = block.type === 'bulleted_list_item' ? 'ul' : 'ol';
      
      // 如果新列表类型与当前不同，处理之前的列表
      if (listType && listType !== currentListType && listItems.length > 0) {
        processedBlocks.push(
          listType === 'ul' 
            ? <ul key={`list-${index}`} className="list-disc ml-6 my-4">{listItems}</ul>
            : <ol key={`list-${index}`} className="list-decimal ml-6 my-4">{listItems}</ol>
        );
        listItems = [];
      }
      
      listType = currentListType;
      listItems.push(renderNotionBlock(block, index));
    } else {
      // 如果有积累的列表项，添加到处理后的块中
      if (listItems.length > 0) {
        processedBlocks.push(
          listType === 'ul' 
            ? <ul key={`list-${index}`} className="list-disc ml-6 my-4">{listItems}</ul>
            : <ol key={`list-${index}`} className="list-decimal ml-6 my-4">{listItems}</ol>
        );
        listItems = [];
        listType = null;
      }
      
      // 添加非列表项
      processedBlocks.push(renderNotionBlock(block, index));
    }
  });
  
  // 处理最后剩余的列表项
  if (listItems.length > 0) {
    processedBlocks.push(
      listType === 'ul' 
        ? <ul key="list-final" className="list-disc ml-6 my-4">{listItems}</ul>
        : <ol key="list-final" className="list-decimal ml-6 my-4">{listItems}</ol>
    );
  }
  
  return processedBlocks;
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
          {/* 渲染Notion内容块 */}
          {content && Array.isArray(content) && content.length > 0 ? (
            processBlocks(content)
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