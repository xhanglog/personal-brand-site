"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

type SkillCategory = 'frontend' | 'backend' | 'design' | 'tools';

interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend');
  
  const skills: Skill[] = [
    // Frontend
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    { name: 'JavaScript', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'Next.js', level: 88, category: 'frontend' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },
    
    // Backend
    { name: 'Node.js', level: 80, category: 'backend' },
    { name: 'Express', level: 78, category: 'backend' },
    { name: 'MongoDB', level: 75, category: 'backend' },
    { name: 'PostgreSQL', level: 70, category: 'backend' },
    { name: 'GraphQL', level: 65, category: 'backend' },
    { name: 'REST API Design', level: 85, category: 'backend' },
    
    // Design
    { name: 'UI Design', level: 75, category: 'design' },
    { name: 'Figma', level: 70, category: 'design' },
    { name: 'Responsive Design', level: 90, category: 'design' },
    { name: 'Design Systems', level: 80, category: 'design' },
    
    // Tools
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'Docker', level: 70, category: 'tools' },
    { name: 'CI/CD', level: 75, category: 'tools' },
    { name: 'Jest', level: 80, category: 'tools' },
    { name: 'Webpack', level: 70, category: 'tools' },
  ];
  
  const categories: { id: SkillCategory; label: string }[] = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'design', label: 'Design' },
    { id: 'tools', label: 'Tools & DevOps' },
  ];
  
  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const barVariants = {
    hidden: { width: 0 },
    show: (level: number) => ({
      width: `${level}%`,
      transition: { 
        duration: 1.5, 
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: 0.5
      }
    })
  };
  
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category Tabs */}
      <motion.div 
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>
      
      {/* Skill Bars */}
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        key={activeCategory} // This forces re-render of animation when category changes
      >
        {filteredSkills.map((skill, index) => (
          <motion.div 
            key={skill.name} 
            className="space-y-2"
            variants={itemVariants}
          >
            <div className="flex justify-between">
              <motion.span 
                className="font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {skill.name}
              </motion.span>
              <motion.span 
                className="text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {skill.level}%
              </motion.span>
            </div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
              <motion.div 
                className="h-full bg-blue-600 rounded-full"
                variants={barVariants}
                custom={skill.level}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
} 