import { NextRequest, NextResponse } from 'next/server';
import { getContentData, saveContentData } from '../../../../lib/data';
import { verifyAdminToken } from '../../../../lib/adminAuth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const content = await getContentData();
  return NextResponse.json({ blogPosts: content.blogPosts });
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.title || !body.slug) {
    return NextResponse.json({ error: 'Blog title and slug are required' }, { status: 400 });
  }

  const content = await getContentData();
  const existingIndex = content.blogPosts.findIndex((post) => post.slug === body.slug);
  const updatedPost = {
    title: String(body.title),
    slug: String(body.slug),
    category: String(body.category || 'General'),
    summary: String(body.summary || ''),
    content: String(body.content || ''),
    publishedAt: String(body.publishedAt || new Date().toISOString().slice(0, 10)),
    image: String(body.image || ''),
    alt: String(body.alt || ''),
    keywords: Array.isArray(body.keywords) ? body.keywords.map(String) : String(body.keywords || '').split(',').map((item) => item.trim()).filter(Boolean)
  };

  if (existingIndex >= 0) {
    content.blogPosts[existingIndex] = updatedPost;
  } else {
    content.blogPosts.unshift(updatedPost);
  }

  await saveContentData(content);
  return NextResponse.json({ blogPosts: content.blogPosts });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const content = await getContentData();
  content.blogPosts = content.blogPosts.filter((post) => post.slug !== slug);
  await saveContentData(content);
  return NextResponse.json({ blogPosts: content.blogPosts });
}
