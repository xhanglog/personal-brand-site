"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Bio() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      {/* Image Column */}
      <motion.div 
        className="md:col-span-5 order-2 md:order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.1, 0.25, 1.0] 
        }}
      >
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
              alt="Profile picture"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Content Column */}
      <motion.div 
        className="md:col-span-7 order-1 md:order-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 0.3,
          ease: [0.25, 0.1, 0.25, 1.0] 
        }}
      >
        <motion.h2 
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          My Story
        </motion.h2>
        
        <div className="space-y-4 text-lg">
          {[
            "Hello! I'm a passionate full-stack developer with over 7 years of experience creating digital experiences that make a difference. My journey began when I built my first website at the age of 16, and I've been hooked on coding ever since.",
            "Throughout my career, I've worked with startups, agencies, and enterprise companies, which has given me a broad perspective on how technology can solve different problems across various industries. I specialize in JavaScript ecosystems, particularly React, Node.js, and Next.js, but I'm always eager to learn new technologies.",
            "When I'm not coding, you can find me hiking in nature, experimenting with photography, or contributing to open-source projects. I believe in continuous learning and sharing knowledge with the community.",
            "My approach to development focuses on creating clean, maintainable code that delivers exceptional user experiences. I'm particularly interested in accessibility, performance optimization, and creating intuitive interfaces."
          ].map((paragraph, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + (index * 0.1),
                ease: "easeOut"
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 