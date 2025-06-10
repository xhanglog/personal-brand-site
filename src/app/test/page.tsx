import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Testing Dashboard</h1>
      
      <p className="mb-4">
        This dashboard provides links to test pages for the Notion API integration.
        Make sure you have set up your Notion API key and database IDs in the .env.local file.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Projects API</h2>
            <p className="text-gray-600 mt-2">
              Test the projects API endpoints that fetch data from your Notion projects database.
            </p>
            <div className="mt-4">
              <Link 
                href="/test/projects"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Test Projects API
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Blog API</h2>
            <p className="text-gray-600 mt-2">
              Test the blog API endpoints that fetch data from your Notion blog database.
            </p>
            <div className="mt-4">
              <Link 
                href="/test/blog"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
              >
                Test Blog API
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-800">Environment Setup Instructions</h3>
        <p className="mt-2 text-yellow-700">
          To properly test the API, you need to set up the following environment variables in your .env.local file:
        </p>
        <ul className="mt-2 list-disc list-inside text-yellow-700 space-y-1">
          <li>NOTION_API_KEY - Your Notion integration API key</li>
          <li>NOTION_PROJECTS_DATABASE_ID - The ID of your Notion projects database</li>
          <li>NOTION_BLOG_DATABASE_ID - The ID of your Notion blog database</li>
        </ul>
      </div>
    </div>
  );
} 