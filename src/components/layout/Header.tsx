'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import { NavItem } from '@/types';

export default function Header() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      active: pathname === '/',
    },
    {
      label: 'About',
      href: '/about',
      active: pathname === '/about',
    },
    {
      label: 'Projects',
      href: '/projects',
      active: pathname?.startsWith('/projects'),
    },
    {
      label: 'Blog',
      href: '/blog',
      active: pathname?.startsWith('/blog'),
    },
    {
      label: 'Contact',
      href: '/contact',
      active: pathname === '/contact',
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">John Doe</span>
          </Link>
        </div>
        <Navigation items={navItems} />
      </div>
    </header>
  );
} 