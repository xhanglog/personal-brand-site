import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/notion';
import { parseProjectData } from '@/lib/utils';

export async function GET() {
  try {
    const projects = await getAllProjects();
    console.log("projects", projects);
    const parsedProjects = projects
      .map(project => parseProjectData(project))
      .filter(Boolean);
    
    return NextResponse.json(parsedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 