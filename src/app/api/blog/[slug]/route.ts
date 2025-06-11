import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/notion';

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
        { success: false, message: 'Blog post slug is required' },
        { status: 400 }
      );
    }
    
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // 设置缓存头
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE * 2}`,
    };
    
    return NextResponse.json({ success: true, post }, { 
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`Error fetching blog post with slug ${params.slug}:`, error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch blog post',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 