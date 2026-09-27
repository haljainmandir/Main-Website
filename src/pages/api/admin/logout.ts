import type { APIRoute } from 'astro';
import { clearAdminCookie, isAdminRequest, sameOrigin } from '../../../lib/admin-auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!sameOrigin(request)) return Response.json({ error: 'Request rejected.' }, { status: 403 });
  if (!isAdminRequest(request)) return Response.json({ ok: true });
  return Response.json({ ok: true }, { headers: { 'Set-Cookie': clearAdminCookie() } });
};
