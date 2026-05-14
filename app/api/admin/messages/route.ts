import { NextRequest, NextResponse } from 'next/server';
import { getMessages } from '../../../../lib/data';
import { verifyAdminToken } from '../../../../lib/adminAuth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const messages = await getMessages();
  return NextResponse.json({ messages });
}
