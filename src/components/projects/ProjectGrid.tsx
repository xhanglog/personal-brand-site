"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import { FaFilter, FaSadTear } from 'react-icons/fa';

interface ProjectGridProps {
  projects: Project[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const tags = searchParams.get('tags')?.split(',') || [];
  
  // 获取活动过滤器的文本描述
  const getFilterDescription = () => {
    const parts = [];
    
    if (category && category !== 'all') {
      parts.push(`category "${category}"`);
    }
    
    if (tags.length > 0) {
      parts.push(`technologies [${tags.join(', ')}]`);
    }
    
    if (parts.length === 0) return null;
    
    return `Showing projects with ${parts.join(' and ')}`;
  };
  
  const filterDescription = getFilterDescription();
  
  // Filter projects based on URL parameters
  const filteredProjects = projects.filter(project => {
    // Filter by category
    if (category && category !== 'all' && project.category !== category) {
      return false;
    }
    
    // Filter by tags
    if (tags.length > 0 && !tags.some(tag => project.tags.includes(tag))) {
      return false;
    }
    
    return true;
  });
  
  // If no projects match the filters
  if (filteredProjects.length === 0) {
    return (
      <motion.div 
        className="text-center py-16 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaSadTear className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
        <h3 className="text-2xl font-semibold mb-3">No projects found</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          No projects match your current filter criteria. Try adjusting your filters to see more projects.
        </p>
        <Link 
          href="/projects"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
        >
          <FaFilter className="mr-2" size={14} />
          Clear all filters
        </Link>
      </motion.div>
    );
  }
  
  return (
    <div className="space-y-6">
      {filterDescription && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg px-4 py-3 text-blue-800 dark:text-blue-300 text-sm"
        >
          <p className="flex items-center">
            <FaFilter className="mr-2" />
            {filterDescription}
          </p>
        </motion.div>
      )}
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </div>
  );
} 