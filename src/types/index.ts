// Notion API 相关类型

export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  demoUrl?: string;
  sourceUrl?: string;
  tags: string[];
  category: string;
  featured: boolean;
  publishedAt: string;
  content?: any;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  content?: any;
}

export type ProjectCategory = 'all' | 'web' | 'mobile' | 'design' | 'other';

// UI 相关类型

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number; // 1-10
  category: string;
}

export interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socialLinks: SocialLink[];
} 