import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/projects/ProjectDetail';
import { getProjectBySlug, getAllProjects } from '@/lib/notion';
import { Project } from '@/types';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | Personal Brand',
    };
  }
  
  return {
    title: `${project.title} | Projects | Personal Brand`,
    description: project.description,
    openGraph: {
      images: [project.coverImage],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetail project={project} />;
} 