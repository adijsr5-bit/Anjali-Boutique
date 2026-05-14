import { createHmac, createHash, randomUUID, timingSafeEqual } from 'crypto';

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 2;

function getSecret() {
  return ADMIN_PASSWORD ? createHash('sha256').update(ADMIN_PASSWORD).digest('hex') : undefined;
}

function sign(value: string) {
  const secret = getSecret();
  if (!secret) return undefined;
  return createHmac('sha256', secret).update(value).digest('hex');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyAdminPassword(password?: string) {
  if (!ADMIN_PASSWORD || !password) return false;
  const expected = createHash('sha256').update(ADMIN_PASSWORD).digest('hex');
  const received = createHash('sha256').update(password).digest('hex');
  return safeEqual(received, expected);
}

export function createAdminToken() {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const nonce = randomUUID();
  const payload = `${expiresAt}.${nonce}`;
  const signature = sign(payload);
  return signature ? `${payload}.${signature}` : undefined;
}

export function verifyAdminToken(token?: string) {
  if (!token || !ADMIN_PASSWORD) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [expiresAtValue, nonce, signature] = parts;
  const expiresAt = Number(expiresAtValue);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now() || !nonce || !signature) {
    return false;
  }

  const expectedSignature = sign(`${expiresAtValue}.${nonce}`);
  return expectedSignature ? safeEqual(signature, expectedSignature) : false;
}

export const ADMIN_SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_SECONDS;
