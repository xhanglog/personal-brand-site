import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogFilters from '@/components/blog/BlogFilters';
import { getAllBlogPosts } from '@/lib/notion';
import { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Blog | Personal Brand',
  description: 'Read my latest articles on web development, design, and technology',
};

// 示例博客数据
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 13 and App Router',
    slug: 'getting-started-nextjs-13',
    excerpt: 'Explore the new features and improvements in Next.js 13, focusing on the revolutionary App Router and how it changes the way we build React applications.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['Next.js', 'React', 'Web Development'],
    publishedAt: '2023-06-20',
  },
  {
    id: '2',
    title: 'The Power of TypeScript in Modern Web Development',
    slug: 'power-of-typescript',
    excerpt: 'Discover how TypeScript can improve your development workflow, reduce bugs, and make your code more maintainable through static typing and enhanced tooling.',
    coverImage: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    publishedAt: '2023-05-15',
  },
  {
    id: '3',
    title: 'Responsive Design Principles for Modern Websites',
    slug: 'responsive-design-principles',
    excerpt: 'Learn essential responsive design techniques and best practices to ensure your websites look great and function well on all devices, from mobile phones to desktop screens.',
    coverImage: 'https://images.unsplash.com/photo-1560157368-946d9c8f7cb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['CSS', 'Responsive Design', 'UI/UX'],
    publishedAt: '2023-04-10',
  },
  {
    id: '4',
    title: 'Building Accessible Web Applications',
    slug: 'building-accessible-web-applications',
    excerpt: 'Explore the importance of web accessibility and learn practical techniques to make your applications usable by everyone, including people with disabilities.',
    coverImage: 'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['Accessibility', 'Web Development', 'UI/UX'],
    publishedAt: '2023-03-22',
  },
  {
    id: '5',
    title: 'Optimizing Website Performance: Tips and Techniques',
    slug: 'optimizing-website-performance',
    excerpt: 'Discover effective strategies to improve your website\'s loading speed, interactivity, and overall performance, resulting in better user experience and SEO rankings.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['Performance', 'Web Development', 'SEO'],
    publishedAt: '2023-02-15',
  },
  {
    id: '6',
    title: 'Introduction to Tailwind CSS: The Utility-First Framework',
    slug: 'introduction-to-tailwind-css',
    excerpt: 'Learn how Tailwind CSS changes the way we style web applications with its utility-first approach, and why it\'s becoming increasingly popular among developers.',
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['CSS', 'Tailwind CSS', 'Web Development'],
    publishedAt: '2023-01-10',
  },
  {
    id: '7',
    title: 'Getting Started with Framer Motion for React Animations',
    slug: 'framer-motion-react-animations',
    excerpt: 'Explore how to add beautiful animations and transitions to your React applications using the powerful and intuitive Framer Motion library.',
    coverImage: 'https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['React', 'Animation', 'Framer Motion'],
    publishedAt: '2022-12-05',
  },
  {
    id: '8',
    title: 'The Future of Web Development: Trends to Watch',
    slug: 'future-of-web-development',
    excerpt: 'Discover emerging technologies and methodologies that are shaping the future of web development, from WebAssembly to AI-assisted coding and beyond.',
    coverImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['Web Development', 'Future Tech', 'Trends'],
    publishedAt: '2022-11-18',
  },
];

// 用于加载状态的占位组件
function LoadingFallback() {
  return <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"></div>;
}

export default async function BlogPage() {
  // 尝试从Notion获取博客数据，如果失败则使用示例数据
  let blogPosts: BlogPost[] = [];
  
  try {
    const notionPosts = await getAllBlogPosts();
    if (notionPosts && notionPosts.length > 0) {
      blogPosts = notionPosts;
    } else {
      blogPosts = sampleBlogPosts;
    }
  } catch (error) {
    blogPosts = sampleBlogPosts;
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Blog</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Suspense fallback={<LoadingFallback />}>
            <BlogFilters />
          </Suspense>
        </div>
        
        <Suspense fallback={<LoadingFallback />}>
          <BlogGrid posts={blogPosts} />
        </Suspense>
      </div>
    </main>
  );
} 