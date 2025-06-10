import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/notion';
import { parseBlogPostData } from '@/lib/utils';

export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    const parsedPosts = posts
      .map(post => parseBlogPostData(post))
      .filter(Boolean);
    
    return NextResponse.json(parsedPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 