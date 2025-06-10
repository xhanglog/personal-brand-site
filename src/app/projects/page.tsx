import { Metadata } from 'next';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectFilters from '@/components/projects/ProjectFilters';
import { getAllProjects } from '@/lib/notion';

export const metadata: Metadata = {
  title: 'Projects | Personal Brand',
  description: 'Explore my portfolio of projects and case studies',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">My Projects</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <ProjectFilters />
        </div>
        
        <ProjectGrid projects={projects} />
      </div>
    </main>
  );
} 