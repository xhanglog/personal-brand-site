'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FooterLink, SocialLink } from '@/types';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks: FooterLink[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      platform: 'GitHub',
      url: 'https://github.com/johndoe',
      icon: 'github',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/johndoe',
      icon: 'linkedin',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/johndoe',
      icon: 'twitter',
    },
  ];

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case 'github':
        return faGithub;
      case 'linkedin':
        return faLinkedin;
      case 'twitter':
        return faTwitter;
      default:
        return faGithub;
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-100 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Full-stack developer specializing in modern web technologies and user-centric design.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label={social.platform}
                >
                  <FontAwesomeIcon icon={getSocialIcon(social.icon)} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Email: <a href="mailto:john@example.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">john@example.com</a>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Location: San Francisco, CA
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {currentYear} John Doe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 