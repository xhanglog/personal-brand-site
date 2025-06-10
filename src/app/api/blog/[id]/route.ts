import { NextResponse } from 'next/server';
import { getBlogPostById } from '@/lib/notion';
import { parseBlogPostData } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'Blog post ID is required' },
      { status: 400 }
    );
  }

  try {
    const response = await getBlogPostById(id);
    
    if (!response) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const post = parseBlogPostData(response.page);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Failed to parse blog post data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...post,
      content: response.markdown,
    });
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
} 