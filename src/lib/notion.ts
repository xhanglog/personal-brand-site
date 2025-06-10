import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Initialize NotionToMarkdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Get all projects from Notion database
 */
export async function getAllProjects() {
  const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;
  
  if (!databaseId) {
    throw new Error('NOTION_PROJECTS_DATABASE_ID is not defined');
  }

  try {
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
          property: 'Project Name',
          direction: 'ascending',
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error('Error fetching projects from Notion:', error);
    return [];
  }
}

/**
 * Get a project by ID
 */
export async function getProjectById(pageId: string) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdBlocks);
    
    return {
      page,
      markdown: mdString.parent,
    };
  } catch (error) {
    console.error(`Error fetching project with ID ${pageId}:`, error);
    return null;
  }
}

/**
 * Get all blog posts from Notion database
 */
export async function getAllBlogPosts() {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
  
  if (!databaseId) {
    throw new Error('NOTION_BLOG_DATABASE_ID is not defined');
  }

  try {
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
          property: 'Published Date',
          direction: 'descending',
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error('Error fetching blog posts from Notion:', error);
    return [];
  }
}

/**
 * Get a blog post by ID
 */
export async function getBlogPostById(pageId: string) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdBlocks);
    
    return {
      page,
      markdown: mdString.parent,
    };
  } catch (error) {
    console.error(`Error fetching blog post with ID ${pageId}:`, error);
    return null;
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