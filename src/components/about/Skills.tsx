"use client";

import { useState } from 'react';

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
  
  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Skill Bars */}
      <div className="space-y-4">
        {filteredSkills.map(skill => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{skill.name}</span>
              <span className="text-sm">{skill.level}%</span>
            </div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 