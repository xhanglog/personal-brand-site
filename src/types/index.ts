// Notion API 相关类型

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription: string;
  thumbnail: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  sourceCodeUrl?: string;
  status: string;
  featured?: boolean;
  order?: number;
  updatedAt?: string;
  content?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  coverImage: string;
  tags: string[];
  status: string;
  updatedAt?: string;
  content?: string;
}

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