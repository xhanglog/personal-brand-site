import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { Project, BlogPost } from '@/types';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Initialize NotionToMarkdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

const projectsDatabaseId = process.env.NOTION_PROJECTS_DATABASE_ID;
const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

// Helper function to transform Notion data to our Project type
function transformProjectData(item: any): Project {
  const properties = item.properties;
  
  return {
    id: item.id,
    title: properties['Project Name']?.title[0]?.plain_text || 'Untitled Project',
    description: properties['Description']?.rich_text[0]?.plain_text || '',
    slug: properties['slug']?.rich_text[0]?.plain_text || item.id,
    coverImage: properties['Thumbnail']?.files[0]?.file?.url || properties['Thumbnail']?.files[0]?.external?.url || '',
    demoUrl: properties['Live URL']?.url || '',
    sourceUrl: properties['Source Code URL']?.url || '',
    tags: properties['Technologies']?.multi_select.map((tag: any) => tag.name) || [],
    category: properties['Category']?.select?.name || 'Other',
    featured: properties['Status']?.select?.name === 'Published' || false,
    publishedAt: properties['Created']?.date?.start || item.created_time,
    content: null, // Detailed content is fetched separately
  };
}

// Helper function to transform Notion data to our BlogPost type
function transformBlogData(item: any): BlogPost {
  const properties = item.properties;
  
  return {
    id: item.id,
    title: properties['Title']?.title[0]?.plain_text || 'Untitled Post',
    slug: properties['slug']?.rich_text[0]?.plain_text || item.id,
    excerpt: properties['Excerpt']?.rich_text[0]?.plain_text || '',
    coverImage: properties['Cover Image']?.files[0]?.file?.url || properties['Cover Image']?.files[0]?.external?.url || '',
    tags: properties['Tags']?.multi_select.map((tag: any) => tag.name) || [],
    publishedAt: properties['Published Date']?.date?.start || item.created_time,
    content: null, // Detailed content is fetched separately
  };
}

/**
 * Get all projects from Notion database
 */
export async function getAllProjects(): Promise<Project[]> {
  if (!projectsDatabaseId) {
    console.warn('Projects database ID not found');
    return [];
  }
  
  try {
    const response = await notion.databases.query({
      database_id: projectsDatabaseId,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });
    
    return response.results.map(transformProjectData);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Get a project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!projectsDatabaseId) {
    console.warn('Projects database ID not found');
    return null;
  }
  
  try {
    const response = await notion.databases.query({
      database_id: projectsDatabaseId,
      filter: {
        property: 'slug',
        rich_text: {
          equals: slug,
        },
      },
    });
    
    if (response.results.length === 0) {
      return null;
    }
    
    const project = transformProjectData(response.results[0]);
    
    // Fetch page content
    const pageContent = await notion.blocks.children.list({
      block_id: response.results[0].id,
    });
    
    // Transform content to HTML (simplified, would need more processing)
    project.content = pageContent.results;
    
    return project;
  } catch (error) {
    console.error(`Error fetching project by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(count: number = 3): Promise<Project[]> {
  if (!projectsDatabaseId) {
    console.warn('Projects database ID not found');
    return [];
  }
  
  try {
    const response = await notion.databases.query({
      database_id: projectsDatabaseId,
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
      page_size: count,
    });
    
    return response.results.map(transformProjectData);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

/**
 * Get all blog posts from Notion database
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!blogDatabaseId) {
    console.warn('Blog database ID not found');
    return [];
  }
  
  try {
    const response = await notion.databases.query({
      database_id: blogDatabaseId,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });
    
    return response.results.map(transformBlogData);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Get a blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!blogDatabaseId) {
    console.warn('Blog database ID not found');
    return null;
  }
  
  try {
    const response = await notion.databases.query({
      database_id: blogDatabaseId,
      filter: {
        property: 'slug',
        rich_text: {
          equals: slug,
        },
      },
    });
    
    if (response.results.length === 0) {
      return null;
    }
    
    const post = transformBlogData(response.results[0]);
    
    // Fetch page content
    const pageContent = await notion.blocks.children.list({
      block_id: response.results[0].id,
    });
    
    // Transform content to HTML (simplified, would need more processing)
    post.content = pageContent.results;
    
    return post;
  } catch (error) {
    console.error(`Error fetching blog post by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get recent blog posts
 */
export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  if (!blogDatabaseId) {
    console.warn('Blog database ID not found');
    return [];
  }
  
  try {
    const response = await notion.databases.query({
      database_id: blogDatabaseId,
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
      page_size: count,
    });
    
    return response.results.map(transformBlogData);
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    return [];
  }
}

/**
 * Get the page content for any Notion page
 */
export async function getPageContent(pageId: string) {
  try {
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdBlocks);
    return mdString.parent;
  } catch (error) {
    console.error(`Error fetching content for page with ID ${pageId}:`, error);
    return '';
  }
}

export default notion; 