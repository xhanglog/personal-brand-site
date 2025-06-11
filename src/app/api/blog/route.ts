import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, getRecentBlogPosts } from '@/lib/notion';

// 缓存控制常量
const CACHE_MAX_AGE = 60 * 10; // 10分钟缓存

export async function GET(request: NextRequest) {
  try {
    // 获取URL参数
    const { searchParams } = new URL(request.url);
    const recent = searchParams.get('recent') === 'true';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string, 10) : undefined;
    const tags = searchParams.get('tags')?.split(',') || undefined;
    const search = searchParams.get('search') || undefined;
    
    // 获取博客文章数据
    let posts;
    
    if (recent) {
      posts = await getRecentBlogPosts(limit || 3);
    } else {
      posts = await getAllBlogPosts();
      
      // 应用标签过滤
      if (tags && tags.length > 0) {
        posts = posts.filter(post => 
          tags.some(tag => post.tags.includes(tag))
        );
      }
      
      // 应用搜索过滤
      if (search) {
        const searchLower = search.toLowerCase();
        posts = posts.filter(post => {
          const titleMatch = post.title.toLowerCase().includes(searchLower);
          const excerptMatch = post.excerpt.toLowerCase().includes(searchLower);
          const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(searchLower));
          
          return titleMatch || excerptMatch || tagsMatch;
        });
      }
      
      // 应用限制
      if (limit && limit > 0) {
        posts = posts.slice(0, limit);
      }
    }
    
    // 设置缓存头
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE * 2}`,
    };
    
    return NextResponse.json({ success: true, posts }, { 
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch blog posts',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 