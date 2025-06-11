import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, getFeaturedProjects } from '@/lib/notion';
import { logApiRequest, logApiError, createApiTimer } from '@/lib/api-logger';

// 缓存控制常量
const CACHE_MAX_AGE = 60 * 10; // 10分钟缓存

export async function GET(request: NextRequest) {
  const timer = createApiTimer('/api/projects', 'GET');
  const { searchParams } = new URL(request.url);
  
  // 获取URL参数
  const featured = searchParams.get('featured') === 'true';
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string, 10) : undefined;
  const category = searchParams.get('category') || undefined;
  const tags = searchParams.get('tags')?.split(',') || undefined;
  
  // 记录请求参数
  const params = { featured, limit, category, tags };
  logApiRequest('Fetching projects', { route: '/api/projects', method: 'GET', params });
  
  try {
    // 获取项目数据
    let projects;
    
    if (featured) {
      projects = await getFeaturedProjects(limit || 3);
    } else {
      projects = await getAllProjects();
      
      // 应用过滤条件
      if (category && category !== 'all') {
        projects = projects.filter(project => project.category === category);
      }
      
      if (tags && tags.length > 0) {
        projects = projects.filter(project => 
          tags.some(tag => project.tags.includes(tag))
        );
      }
      
      // 应用限制
      if (limit && limit > 0) {
        projects = projects.slice(0, limit);
      }
    }
    
    // 设置缓存头
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE * 2}`,
    };
    
    // 记录成功响应
    logApiRequest(`Found ${projects.length} projects`, { 
      route: '/api/projects', 
      method: 'GET',
      params,
      statusCode: 200,
    });
    
    timer.end(200, params);
    
    return NextResponse.json({ success: true, projects }, { 
      status: 200,
      headers,
    });
  } catch (error) {
    // 记录错误
    logApiError(error, 'Error fetching projects', { 
      route: '/api/projects', 
      method: 'GET',
      params,
    });
    
    timer.end(500, params);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch projects',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 