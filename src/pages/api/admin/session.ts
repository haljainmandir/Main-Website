import type { APIRoute } from 'astro';
import { authConfigured, isAdminRequest } from '../../../lib/admin-auth';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;
  if (!authConfigured(env)) return Response.json({ authenticated: false, configured: false }, { status: 503 });
  return Response.json({ authenticated: await isAdminRequest(request, env), configured: true });
};
