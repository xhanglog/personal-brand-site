import { Metadata } from 'next';
import { Suspense } from 'react';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectFilters from '@/components/projects/ProjectFilters';
import { getAllProjects } from '@/lib/notion';
import { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Projects | Personal Brand',
  description: 'Explore my portfolio of projects and case studies',
};

// 示例项目数据
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform built with Next.js, TypeScript, and Stripe for payments. Includes product management, cart functionality, user authentication, and order processing.',
    slug: 'ecommerce-platform',
    coverImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop',
    demoUrl: 'https://example.com/demo',
    sourceUrl: 'https://github.com/yourusername/ecommerce',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    category: 'web',
    featured: true,
    publishedAt: '2023-06-15',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A productivity application for managing tasks and projects. Features include drag-and-drop task organization, deadline reminders, progress tracking, and team collaboration tools.',
    slug: 'task-management-app',
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop',
    demoUrl: 'https://example.com/taskapp',
    sourceUrl: 'https://github.com/yourusername/taskapp',
    tags: ['React', 'Firebase', 'Redux', 'Material UI'],
    category: 'web',
    featured: true,
    publishedAt: '2023-04-10',
  },
  {
    id: '3',
    title: 'Fitness Tracker Mobile App',
    description: 'A cross-platform mobile application for tracking workouts, nutrition, and health metrics. Includes personalized workout plans, progress visualization, and social sharing features.',
    slug: 'fitness-tracker',
    coverImage: 'https://images.unsplash.com/photo-1461696114087-397271a7aedc?w=800&auto=format&fit=crop',
    demoUrl: 'https://example.com/fitness',
    sourceUrl: 'https://github.com/yourusername/fitness-tracker',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Chart.js'],
    category: 'mobile',
    featured: false,
    publishedAt: '2023-02-28',
  },
  {
    id: '4',
    title: 'Portfolio Website Template',
    description: 'A customizable portfolio website template for creative professionals. Features a modern design, smooth animations, and easy content management through a headless CMS.',
    slug: 'portfolio-template',
    coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop',
    demoUrl: 'https://example.com/portfolio',
    sourceUrl: 'https://github.com/yourusername/portfolio',
    tags: ['HTML/CSS', 'JavaScript', 'Netlify CMS', 'GSAP'],
    category: 'design',
    featured: true,
    publishedAt: '2022-11-15',
  },
  {
    id: '5',
    title: 'Weather Dashboard',
    description: 'An interactive weather dashboard that displays current conditions and forecasts for locations worldwide. Features include animated weather visualizations and historical data charts.',
    slug: 'weather-dashboard',
    coverImage: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&auto=format&fit=crop',
    demoUrl: 'https://example.com/weather',
    sourceUrl: 'https://github.com/yourusername/weather',
    tags: ['JavaScript', 'APIs', 'D3.js', 'CSS Grid'],
    category: 'web',
    featured: false,
    publishedAt: '2022-09-20',
  },
  {
    id: '6',
    title: 'Recipe Sharing Platform',
    description: 'A community-driven platform for sharing and discovering recipes. Includes features like recipe ratings, comments, collections, and a personalized recommendation system.',
    slug: 'recipe-platform',
    coverImage: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format&fit=crop',
    demoUrl: 'https://example.com/recipes',
    sourceUrl: 'https://github.com/yourusername/recipes',
    tags: ['Node.js', 'MongoDB', 'Express', 'React'],
    category: 'web',
    featured: false,
    publishedAt: '2022-07-05',
  },
];

// 加载状态的占位组件
function LoadingFallback() {
  return <div className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md mb-8"></div>;
}

export default async function ProjectsPage() {
  // 尝试从Notion获取项目数据，如果失败则使用示例数据
  let projects: Project[] = [];
  
  try {
    const notionProjects = await getAllProjects();
    
    if (notionProjects && notionProjects.length > 0) {
      projects = notionProjects;
    } else {
      projects = sampleProjects;
    }
  } catch (error) {
    projects = sampleProjects;
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* 装饰元素 */}
      <div className="absolute top-20 left-0 w-full h-[500px] overflow-hidden -z-10 opacity-5">
        <div className="absolute -top-[350px] -left-[100px] w-[600px] h-[600px] rounded-full bg-blue-400"></div>
        <div className="absolute top-[100px] -right-[300px] w-[600px] h-[600px] rounded-full bg-teal-400"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* 标题部分 */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of projects spanning web development, mobile apps, and UI/UX design. 
            Each project showcases different skills and technologies.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <Suspense fallback={<LoadingFallback />}>
              <ProjectFilters />
            </Suspense>
          </div>
          
          <Suspense fallback={<LoadingFallback />}>
            <ProjectGrid projects={projects} />
          </Suspense>
        </div>
      </div>
    </main>
  );
} 