import { NextResponse } from 'next/server';
import { addMessage } from '../../../lib/data';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { name, email, message } = body || {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await addMessage({ name: String(name), email: String(email), message: String(message) });
  return NextResponse.json({ message: 'Message received. Our team will contact you shortly.' }, { status: 201 });
}
