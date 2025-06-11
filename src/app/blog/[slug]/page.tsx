import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetail from '@/components/blog/BlogDetail';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/notion';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | Blog | Personal Brand',
    };
  }
  
  return {
    title: `${post.title} | Blog | Personal Brand`,
    description: post.excerpt,
    openGraph: {
      images: [post.coverImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return <BlogDetail post={post} />;
} 