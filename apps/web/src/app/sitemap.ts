export const dynamic = 'force-static';

import { MetadataRoute } from 'next';
import { getAllChallenges } from '@/lib/challenges';
import { Category } from '@/types/types';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://frontenddummies.com';
  const templates = getAllChallenges();
  const now = new Date();

  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic challenge detail pages - higher priority for main design pages
  const designPages: MetadataRoute.Sitemap = templates.map((template) => ({
    url: `${baseUrl}/design/${template.slug}`,
    lastModified: new Date(template.createdAt),
    changeFrequency: 'monthly',
    priority: template.category === Category.BLOGS ? 0.7 : 0.8,
  }));

  // Blog detail pages - higher priority for content
  const blogPages: MetadataRoute.Sitemap = templates
    .filter((template) => template.category === Category.BLOGS)
    .map((template) => ({
      url: `${baseUrl}/blog/${template.slug}`,
      lastModified: new Date(template.createdAt),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

  // Dynamic practice pages (only for templates with starter code)
  const practicePages: MetadataRoute.Sitemap = templates
    .filter((template) => template.starterCode)
    .map((template) => ({
      url: `${baseUrl}/practice/${template.slug}`,
      lastModified: new Date(template.createdAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // Dynamic snippet practice pages (only for templates with snippets)
  const snippetPages: MetadataRoute.Sitemap = templates
    .filter((template) => template.snippets && template.snippets.length > 0)
    .map((template) => ({
      url: `${baseUrl}/snippet-practice/${template.slug}`,
      lastModified: new Date(template.createdAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...designPages,
    ...blogPages,
    ...practicePages,
    ...snippetPages,
  ];
}

