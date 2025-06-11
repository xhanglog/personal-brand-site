import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET() {
  try {
    // 显示环境变量（不要在生产环境中这样做，这里仅用于调试）
    const apiKey = process.env.NOTION_API_KEY;
    const projectsDbId = process.env.NOTION_PROJECTS_DATABASE_ID;
    const blogDbId = process.env.NOTION_BLOG_DATABASE_ID;
    
    const envInfo = {
      apiKeyExists: !!apiKey,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 4) + '...' : null,
      projectsDbIdExists: !!projectsDbId,
      projectsDbIdPrefix: projectsDbId ? projectsDbId.substring(0, 4) + '...' : null,
      blogDbIdExists: !!blogDbId,
      blogDbIdPrefix: blogDbId ? blogDbId.substring(0, 4) + '...' : null,
    };
    
    // 如果没有API密钥，直接返回环境信息
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: 'Notion API key not found in environment variables',
        envInfo,
      });
    }
    
    // 初始化Notion客户端
    const notion = new Client({
      auth: apiKey,
    });
    
    // 获取用户信息以测试API连接
    const user = await notion.users.me({});
    
    // 测试数据库连接
    let projectsDbConnected = false;
    let blogDbConnected = false;
    
    if (projectsDbId) {
      try {
        await notion.databases.retrieve({
          database_id: projectsDbId,
        });
        projectsDbConnected = true;
      } catch (error) {
        console.error('Error retrieving projects database:', error);
      }
    }
    
    if (blogDbId) {
      try {
        await notion.databases.retrieve({
          database_id: blogDbId,
        });
        blogDbConnected = true;
      } catch (error) {
        console.error('Error retrieving blog database:', error);
      }
    }
    
    // 如果连接成功，尝试获取一些数据
    let projectsCount = 0;
    let blogPostsCount = 0;
    
    if (projectsDbConnected && projectsDbId) {
      try {
        const response = await notion.databases.query({
          database_id: projectsDbId,
        });
        projectsCount = response.results.length;
      } catch (error) {
        console.error('Error querying projects database:', error);
      }
    }
    
    if (blogDbConnected && blogDbId) {
      try {
        const response = await notion.databases.query({
          database_id: blogDbId,
        });
        blogPostsCount = response.results.length;
      } catch (error) {
        console.error('Error querying blog database:', error);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Notion API connection successful',
      user: {
        id: user.id,
        name: user.name,
        type: user.type,
      },
      databases: {
        projects: {
          connected: projectsDbConnected,
          id: projectsDbId,
          itemCount: projectsCount,
        },
        blog: {
          connected: blogDbConnected,
          id: blogDbId,
          itemCount: blogPostsCount,
        },
      },
      envInfo,
    });
  } catch (error) {
    console.error('Error testing Notion API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to connect to Notion API',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 