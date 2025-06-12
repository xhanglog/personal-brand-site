'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { NavItem } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  items: NavItem[];
}

export default function Navigation({ items }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 关闭菜单当页面大小改变时
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-6">
        {items.map((item) => (
          <li key={item.href} className="relative">
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-blue-600 py-2 px-1 relative ${
                item.active ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {item.label}
              {item.active && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full" />
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-300"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon
          icon={isMenuOpen ? faXmark : faBars}
          className="h-5 w-5"
        />
      </button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg md:hidden z-50 border-b border-gray-100"
          >
            <ul className="px-4 py-4 max-h-[80vh] overflow-y-auto">
              {items.map((item) => (
                <li key={item.href} className="py-3 border-b border-gray-50 last:border-0">
                  <Link
                    href={item.href}
                    className={`block text-sm font-medium transition-colors duration-300 hover:text-blue-600 ${
                      item.active 
                        ? 'text-blue-600 pl-3 border-l-4 border-blue-600' 
                        : 'text-gray-700 pl-4'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 