import type { APIRoute } from 'astro';
import { clearAdminCookie, isAdminRequest, sameOrigin } from '../../../lib/admin-auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  if (!sameOrigin(request)) return Response.json({ error: 'Request rejected.' }, { status: 403 });
  if (!await isAdminRequest(request, locals.runtime.env)) return Response.json({ ok: true });
  return Response.json({ ok: true }, { headers: { 'Set-Cookie': clearAdminCookie(request) } });
};
