import type { MetadataRoute } from 'next';
import { getContentData } from '../lib/data';

const staticPages = [
  '/',
  '/about',
  '/collections',
  '/blog',
  '/contact',
  '/faq',
  '/privacy-policy',
  '/terms-conditions',
  '/refund-policy',
  '/shipping-policy',
  '/disclaimer'
];

const areaPages = [
  'sakchi',
  'bistupur',
  'mango',
  'sonari',
  'kadma',
  'telco',
  'golmuri',
  'adityapur',
  'jugsalai'
];

function absoluteUrl(baseUrl: string, path: string) {
  return new URL(path, baseUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteMetadata, blogPosts } = await getContentData();
  const baseUrl = siteMetadata.siteUrl || 'https://anjaliboutique.in';
  const now = new Date();

  return [
    ...staticPages.map((path) => ({
      url: absoluteUrl(baseUrl, path),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.8
    })),
    ...areaPages.map((area) => ({
      url: absoluteUrl(baseUrl, `/areas/${area}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(baseUrl, `/blog/${post.slug}`),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.75
    }))
  ];
}
