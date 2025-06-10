'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types';

export default function TestProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Projects API</h1>
      
      {loading && <div className="text-gray-500">Loading projects...</div>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      {!loading && !error && projects.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>No projects found. Make sure your Notion database is set up correctly and contains published projects.</p>
        </div>
      )}
      
      {projects.length > 0 && (
        <div>
          <p className="mb-2">Found {projects.length} projects:</p>
          <ul className="bg-white shadow-md rounded-lg overflow-hidden divide-y divide-gray-200">
            {projects.map((project) => (
              <li key={project.id} className="p-4 hover:bg-gray-50">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-gray-600 mt-1">{project.shortDescription}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-sm">
                  <span className="text-gray-500">Category: </span>
                  <span className="font-medium">{project.category}</span>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                  >
                    View Live Project
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 