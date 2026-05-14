import { NextRequest, NextResponse } from 'next/server';
import { getContentData, saveContentData } from '../../../../lib/data';
import { verifyAdminToken } from '../../../../lib/adminAuth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const content = await getContentData();
  return NextResponse.json({ collections: content.collections });
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.title || !body.id) {
    return NextResponse.json({ error: 'Collection title and id are required' }, { status: 400 });
  }

  const content = await getContentData();
  const existingIndex = content.collections.findIndex((item) => item.id === body.id);
  const updatedCollection = {
    id: String(body.id),
    title: String(body.title),
    description: String(body.description || ''),
    image: String(body.image || ''),
    alt: String(body.alt || '')
  };

  if (existingIndex >= 0) {
    content.collections[existingIndex] = updatedCollection;
  } else {
    content.collections.unshift(updatedCollection);
  }

  await saveContentData(content);
  return NextResponse.json({ collections: content.collections });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Collection id is required' }, { status: 400 });
  }

  const content = await getContentData();
  content.collections = content.collections.filter((item) => item.id !== id);
  await saveContentData(content);
  return NextResponse.json({ collections: content.collections });
}
