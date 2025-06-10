"use client";

import { useSearchParams } from 'next/navigation';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const tags = searchParams.get('tags')?.split(',') || [];
  
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
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-semibold mb-4">No projects found</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Try adjusting your filters to see more projects.
        </p>
      </motion.div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
} 