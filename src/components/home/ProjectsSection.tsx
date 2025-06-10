"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Project = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  sourceCodeUrl?: string;
}

// 验证URL是否有效
const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  // 基本的URL验证
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects/featured?limit=3');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedProjects();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600">Loading featured projects...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full animate-pulse">
                <div className="bg-gray-200 h-48"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-28"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out some of my recent work that showcases my skills and experience in web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} hover bordered className="h-full">
              <div className="aspect-w-16 aspect-h-9 relative bg-gray-100 h-48">
                {isValidImageUrl(project.thumbnail) ? (
                  <Image 
                    src={project.thumbnail}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => {
                    // Choose a different variant for each technology to make it more visually interesting
                    const variants = ['primary', 'secondary', 'success', 'info'];
                    const variant = variants[techIndex % variants.length] as any;
                    
                    return (
                      <Tag key={techIndex} variant={variant} size="sm">{tech}</Tag>
                    );
                  })}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-gray-500 flex items-center">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  <Link href={`/projects/${project.slug}`}>View Project</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            iconPosition="right"
          >
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 