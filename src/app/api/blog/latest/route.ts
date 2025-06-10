import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { BlogPost } from '@/types';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_BLOG_DATABASE_ID;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 3;

  if (!databaseId) {
    console.error('Missing NOTION_BLOG_DATABASE_ID environment variable');
    return NextResponse.json(
      { error: 'Notion Blog Database ID not configured' },
      { status: 500 }
    );
  }

  // 测试用的模拟数据，在API不可用时使用
  const mockData = [
    {
      id: '1',
      title: 'Getting Started with Next.js and TypeScript',
      slug: 'getting-started-with-nextjs-and-typescript',
      excerpt: 'Learn how to set up a new project with Next.js and TypeScript for type-safe React development.',
      date: new Date().toISOString(),
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      tags: ['Next.js', 'TypeScript', 'Tutorial'],
    },
    {
      id: '2',
      title: 'The Power of Tailwind CSS',
      slug: 'the-power-of-tailwind-css',
      excerpt: 'Discover why Tailwind CSS has become my go-to framework for building modern web interfaces.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      tags: ['CSS', 'Tailwind', 'Design'],
    },
    {
      id: '3',
      title: 'Building a RESTful API with Node.js',
      slug: 'building-a-restful-api-with-nodejs',
      excerpt: 'A comprehensive guide to creating a robust RESTful API using Node.js, Express, and MongoDB.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      coverImage: 'https://images.unsplash.com/photo-1505238680356-667803448bb6',
      tags: ['Node.js', 'API', 'Backend'],
    },
  ];

  try {
    console.log('Fetching blog posts from Notion database:', databaseId);
    
    // 如果没有Notion API密钥或环境不支持，使用模拟数据
    if (!process.env.NOTION_API_KEY) {
      console.log('Using mock data (no Notion API key)');
      return NextResponse.json(mockData);
    }
    
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
      page_size: limit,
    });

    if (response.results.length === 0) {
      console.log('No blog posts found, using mock data');
      return NextResponse.json(mockData);
    }

    const blogPosts = await Promise.all(
      response.results.map(async (page: any) => {
        try {
          const properties = page.properties;
          
          // 日志调试
          console.log('Blog page properties:', JSON.stringify(properties, null, 2));
          
          // Extract data based on Notion database structure
          const title = properties['Title']?.title?.map((t: any) => t.plain_text).join('') ||
                       properties['Name']?.title?.map((t: any) => t.plain_text).join('') ||
                       'Untitled Post';
                       
          const excerpt = properties['Excerpt']?.rich_text?.map((t: any) => t.plain_text).join('') ||
                         properties['Summary']?.rich_text?.map((t: any) => t.plain_text).join('') ||
                         '';
                         
          const slug = properties['Slug']?.rich_text?.[0]?.plain_text ||
                      page.id;
                      
          const date = properties['Published Date']?.date?.start ||
                      properties['Date']?.date?.start ||
                      page.created_time;
                      
          const coverImage = properties['Cover Image']?.files?.[0]?.file?.url ||
                            properties['Cover Image']?.files?.[0]?.external?.url ||
                            properties['Image']?.files?.[0]?.file?.url ||
                            properties['Image']?.files?.[0]?.external?.url ||
                            '';
          
          // Extract tags from multi-select property
          const tags = properties['Tags']?.multi_select?.map((tag: any) => tag.name) ||
                      properties['Categories']?.multi_select?.map((cat: any) => cat.name) ||
                      [];

          return {
            id: page.id,
            title,
            excerpt,
            slug,
            date,
            coverImage,
            tags,
          };
        } catch (err) {
          console.error('Error processing blog post:', err);
          return null;
        }
      })
    );

    // 过滤掉处理失败的博客文章
    const validPosts = blogPosts.filter(post => post !== null);
    
    if (validPosts.length === 0) {
      console.log('No valid blog posts could be processed, using mock data');
      return NextResponse.json(mockData);
    }

    return NextResponse.json(validPosts);
  } catch (error: any) {
    console.error('Error fetching blog posts from Notion:', error);
    console.error('Error details:', error.message, error.code, error.status);
    
    // 在API异常时返回模拟数据，确保前端UI仍能展示内容
    return NextResponse.json(mockData);
  }
} 