"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

// 常用博客标签
const commonTags = [
  'Web Development', 'React', 'Next.js', 'TypeScript', 'JavaScript',
  'UI/UX', 'Design', 'Performance', 'Accessibility', 'Backend',
  'DevOps', 'Career', 'Tutorials'
];

export default function BlogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentTags = searchParams.get('tags')?.split(',') || [];
  const currentSearch = searchParams.get('search') || '';
  
  const [activeTags, setActiveTags] = useState<string[]>(currentTags);
  const [searchQuery, setSearchQuery] = useState<string>(currentSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(currentSearch);
  
  // 处理搜索输入防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // 当防抖后的搜索值改变时更新URL
  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      updateFilters(activeTags, debouncedSearch);
    }
  }, [debouncedSearch]);
  
  const handleTagToggle = (tag: string) => {
    const newTags = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag)
      : [...activeTags, tag];
    
    setActiveTags(newTags);
    updateFilters(newTags, searchQuery);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const updateFilters = (tags: string[], search: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (tags.length === 0) {
      params.delete('tags');
    } else {
      params.set('tags', tags.join(','));
    }
    
    if (search.trim() === '') {
      params.delete('search');
    } else {
      params.set('search', search.trim());
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const clearFilters = () => {
    setActiveTags([]);
    setSearchQuery('');
    router.push(pathname);
  };
  
  const hasActiveFilters = activeTags.length > 0 || searchQuery.trim() !== '';
  
  return (
    <div className="space-y-6">
      {/* 搜索框 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Search Articles</h2>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title or content..."
            className="w-full px-4 py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {/* 标签过滤器 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Filter by Topics</h2>
        <div className="flex flex-wrap gap-2">
          {commonTags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* 清除过滤器按钮 */}
      {hasActiveFilters && (
        <motion.button
          onClick={clearFilters}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Clear All Filters
        </motion.button>
      )}
    </div>
  );
} 