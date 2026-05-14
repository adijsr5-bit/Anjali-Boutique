import { NextResponse } from 'next/server';
import { addMessage } from '../../../lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await addMessage({ name: String(name), email: String(email), message: String(message) });
    return NextResponse.json({ message: 'Message received. Our team will contact you shortly.' }, { status: 201 });
  } catch (error) {
    console.error('Contact message save error:', error);
    const message = error instanceof Error ? error.message : 'We could not submit your message. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
