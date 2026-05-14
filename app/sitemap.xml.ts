import { siteMetadata, blogPosts } from '../lib/content';
import { NextResponse } from 'next/server';

const staticPages = ['/', '/about', '/blog', '/contact', '/faq', '/privacy-policy', '/terms-conditions', '/refund-policy', '/shipping-policy', '/disclaimer'];

export async function GET() {
  const baseUrl = siteMetadata.siteUrl;
  const pages = staticPages.map((path) => `  <url><loc>${baseUrl}${path}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
  const posts = blogPosts.map((post) => `  <url><loc>${baseUrl}/blog/${post.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.join('\n')}
${posts.join('\n')}
</urlset>`;
  return new NextResponse(body, { headers: { 'Content-Type': 'application/xml' } });
}
