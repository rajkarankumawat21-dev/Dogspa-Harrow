import { MetadataRoute } from 'next';

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'https://dogspa-harrow.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', 
    '/about', 
    '/booking', 
    '/contact', 
    '/gallery', 
    '/locations', 
    '/privacy', 
    '/services', 
    '/terms'
  ].map((route) => ({
    url: `${DOMAIN}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
