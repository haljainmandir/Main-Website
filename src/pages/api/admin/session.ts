import type { APIRoute } from 'astro';
import { authConfigured, isAdminRequest } from '../../../lib/admin-auth';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!authConfigured()) return Response.json({ authenticated: false, configured: false }, { status: 503 });
  return Response.json({ authenticated: isAdminRequest(request), configured: true });
};
