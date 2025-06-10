"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  description: string[];
  highlights?: string[];
}

interface TimelineEventProps {
  item: TimelineItem;
  isLast: boolean;
  index: number;
}

function TimelineEvent({ item, isLast, index }: TimelineEventProps) {
  return (
    <motion.div 
      className="relative pl-8 pb-12"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
    >
      {/* Timeline dot and line */}
      <div className="absolute left-0 top-0 mt-1.5">
        <motion.div 
          className="h-4 w-4 rounded-full bg-blue-600"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
        ></motion.div>
        {!isLast && (
          <motion.div 
            className="absolute top-4 left-2 -ml-px w-0.5 bg-gray-300 dark:bg-gray-700"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
          ></motion.div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <motion.div 
          className="text-sm font-medium text-blue-600 dark:text-blue-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.2 + 0.1 }}
        >
          {item.period}
        </motion.div>
        <motion.h3 
          className="text-xl font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
        >
          {item.title}
        </motion.h3>
        <motion.div 
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
        >
          {item.company} • {item.location}
        </motion.div>
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.2 + 0.4 }}
        >
          {item.description.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </motion.div>
        
        {item.highlights && item.highlights.length > 0 && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
          >
            <h4 className="text-md font-semibold mb-2">Key Achievements:</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {item.highlights.map((highlight, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.6 + (idx * 0.1) }}
                >
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const timelineData: TimelineItem[] = [
    {
      id: 'job-1',
      period: '2021 - Present',
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      description: [
        'Lead a team of 5 developers in building and maintaining a SaaS platform using React, Next.js, and TypeScript.',
        'Collaborate with design and product teams to implement new features and improvements to the user experience.'
      ],
      highlights: [
        'Reduced page load time by 45% through performance optimizations',
        'Implemented component library that increased development speed by 30%',
        'Mentored junior developers through code reviews and pair programming sessions'
      ]
    },
    {
      id: 'job-2',
      period: '2018 - 2021',
      title: 'Full Stack Developer',
      company: 'Digital Solutions LLC',
      location: 'Boston, MA',
      description: [
        'Developed and maintained multiple client websites and web applications using React, Node.js, and MongoDB.',
        'Worked in an agile environment, participating in sprint planning, daily stand-ups, and retrospectives.'
      ],
      highlights: [
        'Created a custom CMS that reduced content update time by 60%',
        'Integrated third-party APIs for payment processing and data visualization',
        'Migrated legacy applications to modern tech stacks'
      ]
    },
    {
      id: 'job-3',
      period: '2016 - 2018',
      title: 'Junior Web Developer',
      company: 'Creative Agency Co.',
      location: 'New York, NY',
      description: [
        'Built responsive websites for clients across various industries using HTML, CSS, JavaScript, and WordPress.',
        'Collaborated with designers to implement pixel-perfect UI designs.'
      ],
      highlights: [
        'Developed custom WordPress plugins to extend site functionality',
        'Improved site accessibility to meet WCAG 2.1 standards',
        'Optimized websites for search engines and performance'
      ]
    }
  ];

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {timelineData.map((item, index) => (
        <TimelineEvent 
          key={item.id} 
          item={item} 
          isLast={index === timelineData.length - 1} 
          index={index}
        />
      ))}
    </motion.div>
  );
} 