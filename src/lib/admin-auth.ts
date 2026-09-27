import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { createHmac, timingSafeEqual } from 'node:crypto';

// Astro/Vite reads .env for import.meta.env, but process.env is needed for
// secrets at request time. Node 20.12+ can load the local file directly.
if (existsSync('.env')) loadEnvFile('.env');

export const ADMIN_COOKIE = 'temple_admin_session';
const SESSION_LENGTH_MS = 8 * 60 * 60 * 1000;

export function authConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function verifyCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME || '';
  const expectedPassword = process.env.ADMIN_PASSWORD || '';
  return constantTimeEqual(username, expectedUser) && constantTimeEqual(password, expectedPassword);
}

function constantTimeEqual(left: string, right: string) {
  const leftDigest = createHmac('sha256', 'temple-login-compare').update(left).digest();
  const rightDigest = createHmac('sha256', 'temple-login-compare').update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest) && left === right;
}

function signature(expires: string) {
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET || '')
    .update(`temple-admin:${expires}`)
    .digest('base64url');
}

export function createAdminCookie() {
  const expires = String(Date.now() + SESSION_LENGTH_MS);
  const token = `${expires}.${signature(expires)}`;
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_LENGTH_MS / 1000}${secure}`;
}

export function clearAdminCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export function isAdminRequest(request: Request) {
  if (!authConfigured()) return false;
  const token = request.headers.get('cookie')?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`))
    ?.slice(ADMIN_COOKIE.length + 1);
  if (!token) return false;
  const [expires, providedSignature] = token.split('.');
  if (!expires || !providedSignature || Number(expires) <= Date.now()) return false;
  return constantTimeEqual(providedSignature, signature(expires));
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}
