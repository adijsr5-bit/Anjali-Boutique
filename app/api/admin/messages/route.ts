import { NextRequest, NextResponse } from 'next/server';
import { deleteMessage, getMessages, markMessageAsRead } from '../../../../lib/data';
import { verifyAdminToken } from '../../../../lib/adminAuth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const messages = await getMessages();
  return NextResponse.json({ messages });
}

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const id = body?.id;
  if (!id) {
    return NextResponse.json({ error: 'Message id is required' }, { status: 400 });
  }

  const messages = await markMessageAsRead(String(id));
  return NextResponse.json({ messages });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Message id is required' }, { status: 400 });
  }

  const messages = await deleteMessage(id);
  return NextResponse.json({ messages });
}
