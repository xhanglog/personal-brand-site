'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NavItem } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

interface NavigationProps {
  items: NavItem[];
}

export default function Navigation({ items }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-6">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                item.active ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon
          icon={isMenuOpen ? faXmark : faBars}
          className="h-5 w-5"
        />
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b md:hidden">
          <ul className="px-4 py-2">
            {items.map((item) => (
              <li key={item.href} className="py-2">
                <Link
                  href={item.href}
                  className={`block text-sm font-medium transition-colors hover:text-blue-600 ${
                    item.active ? 'text-blue-600' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
} 