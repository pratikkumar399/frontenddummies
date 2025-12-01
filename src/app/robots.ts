import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://frontendfordummies-tonv.vercel.app//sitemap.xml',
    host: 'https://frontendfordummies-tonv.vercel.app/',
  };
}

