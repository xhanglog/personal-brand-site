import { NextResponse } from 'next/server';
import { getProjectById } from '@/lib/notion';
import { parseProjectData } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'Project ID is required' },
      { status: 400 }
    );
  }

  try {
    const response = await getProjectById(id);
    
    if (!response) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const project = parseProjectData(response.page);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Failed to parse project data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...project,
      content: response.markdown,
    });
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
} 