This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Notion API Integration

This project uses Notion as a headless CMS to store and manage content. To use the Notion API integration, you need to:

1. Create a Notion integration at https://www.notion.so/my-integrations
2. Share your databases with the integration
3. Set up environment variables

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Notion API Configuration
NOTION_API_KEY=secret_your_notion_api_key_here
NOTION_PROJECTS_DATABASE_ID=your_projects_database_id_here
NOTION_BLOG_DATABASE_ID=your_blog_database_id_here

# Website Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Personal Brand Website"
NEXT_PUBLIC_SITE_DESCRIPTION="A modern portfolio and blog website built with Next.js and Notion API"
```

### Notion Database Structure

#### Projects Database

Set up a Notion database with the following properties:

| Property Name      | Property Type       |
|--------------------|---------------------|
| Project Name       | Title               |
| Description        | Text                |
| Short Description  | Text                |
| Thumbnail          | Files & Media       |
| Technologies       | Multi-select        |
| Category           | Select              |
| Live URL           | URL                 |
| Source Code URL    | URL                 |
| Status             | Select (Published/Archived) |
| Content            | Page content        |

#### Blog Database

Set up a Notion database with the following properties:

| Property Name      | Property Type       |
|--------------------|---------------------|
| Title              | Title               |
| Excerpt            | Text                |
| Cover Image        | Files & Media       |
| Tags               | Multi-select        |
| Published Date     | Date                |
| Status             | Select (Draft/Published) |
| Content            | Page content        |

### Testing the API

To test the Notion API integration, visit the testing dashboard at:

```
http://localhost:3000/test
```

This dashboard provides links to test pages for both the Projects API and the Blog API.
