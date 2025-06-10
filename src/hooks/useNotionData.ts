import { useState, useEffect } from 'react';
import { getAllProjects, getAllBlogPosts, getProjectById, getBlogPostById } from '@/lib/notion';
import { parseProjectData, parseBlogPostData } from '@/lib/utils';
import { Project, BlogPost } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await getAllProjects();
        const parsedProjects = response
          .map(project => parseProjectData(project))
          .filter(Boolean) as Project[];
        setProjects(parsedProjects);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const response = await getProjectById(id);
        if (!response) {
          throw new Error('Project not found');
        }
        
        const parsedProject = parseProjectData(response.page) as Project;
        if (!parsedProject) {
          throw new Error('Failed to parse project data');
        }
        
        setProject({
          ...parsedProject,
          content: response.markdown,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch project'));
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error };
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await getAllBlogPosts();
        const parsedPosts = response
          .map(post => parseBlogPostData(post))
          .filter(Boolean) as BlogPost[];
        setPosts(parsedPosts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(id: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const response = await getBlogPostById(id);
        if (!response) {
          throw new Error('Blog post not found');
        }
        
        const parsedPost = parseBlogPostData(response.page) as BlogPost;
        if (!parsedPost) {
          throw new Error('Failed to parse blog post data');
        }
        
        setPost({
          ...parsedPost,
          content: response.markdown,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog post'));
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPost();
    }
  }, [id]);

  return { post, loading, error };
} 