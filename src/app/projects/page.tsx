import { Metadata } from 'next';
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

// 定义状态类型
type FetchStatus = 'pending' | 'fetching' | 'completed' | 'no-data' | 'error';

export default async function ProjectsPage() {
  // 尝试从Notion获取项目数据，如果失败则使用示例数据
  let projects: Project[] = [];
  let debugInfo = {
    status: 'pending' as FetchStatus,
    error: null as string | null,
    databaseId: process.env.NOTION_PROJECTS_DATABASE_ID || 'Not configured',
    apiKeyConfigured: !!process.env.NOTION_API_KEY,
    projectsCount: 0
  };
  
  try {
    console.log('Attempting to fetch projects from Notion...');
    debugInfo.status = 'fetching';
    
    const notionProjects = await getAllProjects();
    debugInfo.status = 'completed';
    debugInfo.projectsCount = notionProjects.length;
    
    if (notionProjects && notionProjects.length > 0) {
      console.log(`Successfully fetched ${notionProjects.length} projects from Notion`);
      projects = notionProjects;
    } else {
      console.log('No projects found in Notion, using sample data');
      debugInfo.status = 'no-data';
      projects = sampleProjects;
    }
  } catch (error) {
    console.error('Error fetching projects from Notion:', error);
    debugInfo.status = 'error';
    debugInfo.error = error instanceof Error ? error.message : String(error);
    projects = sampleProjects;
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">My Projects</h1>
      
      <div className="max-w-6xl mx-auto">
        {/* 调试信息部分 */}
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">API Debug Info</h2>
          <pre className="text-sm bg-white p-3 rounded border overflow-auto">
            {JSON.stringify({
              status: debugInfo.status,
              error: debugInfo.error,
              databaseId: debugInfo.databaseId ? `${debugInfo.databaseId.substring(0, 5)}...` : 'Not configured',
              apiKeyConfigured: debugInfo.apiKeyConfigured,
              projectsCount: debugInfo.projectsCount,
              environmentVars: {
                NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'Not configured',
                NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Not configured',
              }
            }, null, 2)}
          </pre>
        </div>
        
        <div className="mb-8">
          <ProjectFilters />
        </div>
        
        <ProjectGrid projects={projects} />
      </div>
    </main>
  );
} 