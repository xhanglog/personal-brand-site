import { NextRequest, NextResponse } from 'next/server';
import { getProjectBySlug } from '@/lib/notion';

// 缓存控制常量
const CACHE_MAX_AGE = 60 * 30; // 30分钟缓存

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Project slug is required' },
        { status: 400 }
      );
    }
    
    const project = await getProjectBySlug(slug);
    
    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }
    
    // 设置缓存头
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE * 2}`,
    };
    
    return NextResponse.json({ success: true, project }, { 
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`Error fetching project with slug ${params.slug}:`, error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch project',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 