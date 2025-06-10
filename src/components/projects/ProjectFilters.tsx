"use client";

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProjectCategory } from '@/types';
import { motion } from 'framer-motion';

const categories: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'design', label: 'UI/UX Design' },
  { id: 'other', label: 'Other' },
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 
  'MongoDB', 'PostgreSQL', 'Firebase', 'React Native', 'GraphQL',
];

export default function ProjectFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category') || 'all';
  const currentTags = searchParams.get('tags')?.split(',') || [];
  
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(currentCategory as ProjectCategory);
  const [activeTags, setActiveTags] = useState<string[]>(currentTags);
  
  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    updateFilters(category, activeTags);
  };
  
  const handleTagToggle = (tag: string) => {
    const newTags = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag)
      : [...activeTags, tag];
    
    setActiveTags(newTags);
    updateFilters(activeCategory, newTags);
  };
  
  const updateFilters = (category: ProjectCategory, tags: string[]) => {
    const params = new URLSearchParams(searchParams);
    
    if (category === 'all' && tags.length === 0) {
      params.delete('category');
      params.delete('tags');
    } else {
      if (category !== 'all') {
        params.set('category', category);
      } else {
        params.delete('category');
      }
      
      if (tags.length > 0) {
        params.set('tags', tags.join(','));
      } else {
        params.delete('tags');
      }
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const clearFilters = () => {
    setActiveCategory('all');
    setActiveTags([]);
    router.push(pathname);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map(tech => (
            <motion.button
              key={tech}
              onClick={() => handleTagToggle(tech)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTags.includes(tech)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tech}
            </motion.button>
          ))}
        </div>
      </div>
      
      {(activeCategory !== 'all' || activeTags.length > 0) && (
        <motion.button
          onClick={clearFilters}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Clear Filters
        </motion.button>
      )}
    </div>
  );
} 