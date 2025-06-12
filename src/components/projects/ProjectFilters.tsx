"use client";

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProjectCategory } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFilter, FaChevronDown } from 'react-icons/fa';

const categories: { id: ProjectCategory; label: string; icon?: string }[] = [
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
  const [showTechFilters, setShowTechFilters] = useState(false);
  
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
  
  const toggleTechFilters = () => {
    setShowTechFilters(!showTechFilters);
  };

  // 计算活动筛选器数量
  const activeFiltersCount = (activeCategory !== 'all' ? 1 : 0) + activeTags.length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FaFilter className="mr-2 text-blue-600" /> 
          Filter Projects 
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </h2>
        
        {(activeCategory !== 'all' || activeTags.length > 0) && (
          <motion.button
            onClick={clearFilters}
            className="mt-2 sm:mt-0 px-4 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center self-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaTimes className="mr-1" /> Clear All Filters
          </motion.button>
        )}
      </div>

      <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
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
        <button 
          onClick={toggleTechFilters}
          className="flex items-center justify-between w-full text-lg font-medium text-gray-700 dark:text-gray-300 mb-3"
        >
          <span>Technologies</span>
          <motion.span
            animate={{ rotate: showTechFilters ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown />
          </motion.span>
        </button>
        
        <AnimatePresence>
          {showTechFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-2">
                {technologies.map(tech => (
                  <motion.button
                    key={tech}
                    onClick={() => handleTagToggle(tech)}
                    className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                      activeTags.includes(tech)
                        ? 'bg-blue-600 border-blue-600 text-white font-medium'
                        : 'bg-transparent border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {activeTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active filters:</h3>
          <div className="flex flex-wrap gap-2">
            {activeTags.map(tag => (
              <motion.span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
                <button 
                  onClick={() => handleTagToggle(tag)}
                  className="ml-1 p-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  <FaTimes size={10} />
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
} 