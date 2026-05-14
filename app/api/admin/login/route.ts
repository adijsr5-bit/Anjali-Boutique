import { NextResponse } from 'next/server';
import { ADMIN_PASSWORD, ADMIN_SESSION_MAX_AGE_SECONDS, createAdminToken, verifyAdminPassword } from '../../../../lib/adminAuth';

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function getClientKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 0, resetAt: now + WINDOW_MS });
    return false;
  }
  return current.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  attempts.set(key, { ...current, count: current.count + 1 });
}

export async function POST(request: Request) {
  const key = getClientKey(request);

  if (isRateLimited(key)) {
    return NextResponse.json({ error: 'Too many login attempts. Try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : undefined;

  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
  }

  if (!password) {
    return NextResponse.json({ error: 'Password is required' }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    recordFailedAttempt(key);
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  attempts.delete(key);

  const token = createAdminToken();
  if (!token) {
    return NextResponse.json({ error: 'Could not create admin session' }, { status: 500 });
  }

  const response = NextResponse.json({ message: 'Logged in' });
  response.cookies.set({
    name: 'admin-auth',
    value: token,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS
  });

  return response;
}
