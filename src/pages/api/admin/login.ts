import type { APIRoute } from 'astro';
import { authConfigured, createAdminCookie, sameOrigin, verifyCredentials } from '../../../lib/admin-auth';

export const prerender = false;

const attempts = new Map<string, { count: number; resetsAt: number }>();

export const POST: APIRoute = async ({ request, clientAddress, locals }) => {
  if (!sameOrigin(request)) return Response.json({ error: 'Request rejected.' }, { status: 403 });
  const env = locals.runtime.env;
  if (!authConfigured(env)) return Response.json({ error: 'Admin login is not configured on this server.' }, { status: 503 });

  const address = clientAddress || 'unknown';
  const now = Date.now();
  const current = attempts.get(address);
  if (current && current.resetsAt > now && current.count >= 10) {
    return Response.json({ error: 'Too many login attempts. Please wait 15 minutes.' }, { status: 429 });
  }

  let values: { username?: unknown; password?: unknown };
  try {
    values = await request.json();
  } catch {
    return Response.json({ error: 'Enter your username and password.' }, { status: 400 });
  }
  const username = typeof values.username === 'string' ? values.username : '';
  const password = typeof values.password === 'string' ? values.password : '';
  if (!verifyCredentials(username, password, env)) {
    attempts.set(address, current && current.resetsAt > now
      ? { count: current.count + 1, resetsAt: current.resetsAt }
      : { count: 1, resetsAt: now + 15 * 60 * 1000 });
    return Response.json({ error: 'The username or password is incorrect.' }, { status: 401 });
  }
  attempts.delete(address);
  return Response.json({ ok: true }, { headers: { 'Set-Cookie': await createAdminCookie(env, request) } });
};
