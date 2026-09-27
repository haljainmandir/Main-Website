export const ADMIN_COOKIE = 'temple_admin_session';
const SESSION_LENGTH_MS = 8 * 60 * 60 * 1000;
const encoder = new TextEncoder();

export type AdminEnvironment = {
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
};

export function authConfigured(env: AdminEnvironment) {
  return Boolean(env.ADMIN_USERNAME && env.ADMIN_PASSWORD && env.ADMIN_SESSION_SECRET);
}

export function verifyCredentials(username: string, password: string, env: AdminEnvironment) {
  return constantTimeEqual(username, env.ADMIN_USERNAME || '')
    && constantTimeEqual(password, env.ADMIN_PASSWORD || '');
}

function constantTimeEqual(left: string, right: string) {
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const maxLength = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < maxLength; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }
  return difference === 0;
}

async function signature(expires: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const digest = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(`temple-admin:${expires}`)));
  return btoa(Array.from(digest, (byte) => String.fromCharCode(byte)).join(''))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '');
}

export async function createAdminCookie(env: AdminEnvironment, request: Request) {
  const expires = String(Date.now() + SESSION_LENGTH_MS);
  const token = `${expires}.${await signature(expires, env.ADMIN_SESSION_SECRET || '')}`;
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_LENGTH_MS / 1000}${secure}`;
}

export function clearAdminCookie(request: Request) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export async function isAdminRequest(request: Request, env: AdminEnvironment) {
  if (!authConfigured(env)) return false;
  const token = request.headers.get('cookie')?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`))
    ?.slice(ADMIN_COOKIE.length + 1);
  if (!token) return false;
  const [expires, providedSignature] = token.split('.');
  if (!expires || !providedSignature || Number(expires) <= Date.now()) return false;
  const expectedSignature = await signature(expires, env.ADMIN_SESSION_SECRET || '');
  return constantTimeEqual(providedSignature, expectedSignature);
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}
