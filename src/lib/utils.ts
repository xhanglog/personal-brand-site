import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to a readable string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Transform Notion block to text content
 */
export function getTextContent(block: any): string {
  if (!block || !block.properties || !block.properties.title) {
    return '';
  }

  return block.properties.title
    .map((textItem: any) => textItem.plain_text)
    .join('');
}

/**
 * Parse project data from Notion
 */
export function parseProjectData(project: any) {
  if (!project || !project.properties) {
    return null;
  }

  const properties = project.properties;
  const projectName = properties['Project Name']?.title?.[0]?.plain_text || '';
  const description = properties['Description']?.rich_text?.[0]?.plain_text || '';
  const shortDescription = properties['Short Description']?.rich_text?.[0]?.plain_text || '';
  
  // Get thumbnail URL from file/media property
  const thumbnailUrl = properties['Thumbnail']?.files?.[0]?.file?.url || 
                      properties['Thumbnail']?.files?.[0]?.external?.url || 
                      '';
  
  // Get technologies as array
  const technologies = properties['Technologies']?.multi_select?.map((tech: any) => tech.name) || [];
  
  // Get category
  const category = properties['Category']?.select?.name || '';
  
  // Get URLs
  const liveUrl = properties['Live URL']?.url || '';
  const sourceCodeUrl = properties['Source Code URL']?.url || '';
  
  // Get status
  const status = properties['Status']?.select?.name || '';
  
  return {
    id: project.id,
    title: projectName,
    description,
    shortDescription,
    thumbnailUrl,
    technologies,
    category,
    liveUrl,
    sourceCodeUrl,
    status,
    updatedAt: project.last_edited_time,
  };
}

/**
 * Parse blog post data from Notion
 */
export function parseBlogPostData(post: any) {
  if (!post || !post.properties) {
    return null;
  }

  const properties = post.properties;
  const title = properties['Title']?.title?.[0]?.plain_text || '';
  const excerpt = properties['Excerpt']?.rich_text?.[0]?.plain_text || '';
  
  // Get cover image URL from file/media property
  const coverImageUrl = properties['Cover Image']?.files?.[0]?.file?.url || 
                       properties['Cover Image']?.files?.[0]?.external?.url || 
                       '';
  
  // Get tags as array
  const tags = properties['Tags']?.multi_select?.map((tag: any) => tag.name) || [];
  
  // Get published date
  const publishedDate = properties['Published Date']?.date?.start || '';
  
  // Get status
  const status = properties['Status']?.select?.name || '';
  
  // Create slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
  
  return {
    id: post.id,
    title,
    excerpt,
    coverImageUrl,
    tags,
    publishedDate,
    status,
    slug,
    updatedAt: post.last_edited_time,
  };
}

/**
 * Truncate text to a specific length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
} 