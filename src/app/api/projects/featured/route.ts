import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 3;

  if (!databaseId) {
    console.error('Missing NOTION_PROJECTS_DATABASE_ID environment variable');
    return NextResponse.json(
      { error: 'Notion Projects Database ID not configured' },
      { status: 500 }
    );
  }

console.log('databaseId', databaseId);
  try {
    console.log('Fetching projects from Notion database:', databaseId);
        
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              equals: 'Published',
            },
          },
          {
            property: 'Featured',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending',
        },
      ],
      page_size: limit,
    });

    const projects = await Promise.all(
      response.results.map(async (page: any) => {
        try {
          const properties = page.properties;
          
          // 日志调试
          console.log('Page properties:', JSON.stringify(properties, null, 2));
          
          // Extract data based on Notion database structure
          const name = properties['Project Name']?.title?.map((t: any) => t.plain_text).join('') || 
                      properties['Name']?.title?.map((t: any) => t.plain_text).join('') || 
                      'Untitled Project';
                      
          const shortDescription = properties['Short Description']?.rich_text?.map((t: any) => t.plain_text).join('') || 
                                  properties['Description']?.rich_text?.map((t: any) => t.plain_text).join('') || 
                                  '';
                                  
          const slug = properties['Slug']?.rich_text?.[0]?.plain_text || 
                      page.id;
          
          // Get the thumbnail image URL
          const thumbnail = properties['Thumbnail']?.files?.[0]?.file?.url || 
                           properties['Thumbnail']?.files?.[0]?.external?.url || 
                           properties['Image']?.files?.[0]?.file?.url || 
                           properties['Image']?.files?.[0]?.external?.url || 
                           '';
          
          // Extract technologies from multi-select property
          const technologies = properties['Technologies']?.multi_select?.map((tech: any) => tech.name) || 
                              properties['Tags']?.multi_select?.map((tag: any) => tag.name) || 
                              [];
          
          // Get category
          const category = properties['Category']?.select?.name || 
                          properties['Type']?.select?.name || 
                          '';
          
          // Get URLs
          const liveUrl = properties['Live URL']?.url || 
                         properties['Demo URL']?.url || 
                         properties['Website']?.url || 
                         '';
                         
          const sourceCodeUrl = properties['Source Code URL']?.url || 
                               properties['GitHub']?.url || 
                               properties['Repository']?.url || 
                               '';

          return {
            id: page.id,
            name,
            slug,
            shortDescription,
            thumbnail,
            technologies,
            category,
            liveUrl,
            sourceCodeUrl,
          };
        } catch (err) {
          console.error('Error processing project page:', err);
          return null;
        }
      })
    );

    // 过滤掉处理失败的项目
    const validProjects = projects.filter(project => project !== null);
  

    return NextResponse.json(validProjects);
  } catch (error: any) {
    console.error('Error fetching projects from Notion:', error);
    console.error('Error details:', error.message, error.code, error.status);
  }
} 