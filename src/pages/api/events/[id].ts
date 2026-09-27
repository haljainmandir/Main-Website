import type { APIRoute } from 'astro';
import { eventFrom, findEvent, removeEvent, saveEvent } from '../../../lib/events';
import { isAdminRequest, sameOrigin } from '../../../lib/admin-auth';

export const prerender = false;

export const PUT: APIRoute = async ({ request, params, locals }) => {
  if (!sameOrigin(request)) return Response.json({ error: 'Request rejected.' }, { status: 403 });
  if (!await isAdminRequest(request, locals.runtime.env)) return Response.json({ error: 'Sign in to manage events.' }, { status: 401 });
  try {
    const existing = await findEvent(locals.runtime.env.DB, params.id || '');
    if (!existing) return Response.json({ error: 'Event not found.' }, { status: 404 });
    await saveEvent(locals.runtime.env.DB, eventFrom(await request.json(), existing));
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Event could not be saved.' }, { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ request, params, locals }) => {
  if (!sameOrigin(request)) return Response.json({ error: 'Request rejected.' }, { status: 403 });
  if (!await isAdminRequest(request, locals.runtime.env)) return Response.json({ error: 'Sign in to manage events.' }, { status: 401 });
  try {
    if (!await removeEvent(locals.runtime.env.DB, params.id || '')) return Response.json({ error: 'Event not found.' }, { status: 404 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Event could not be removed.' }, { status: 500 });
  }
};
