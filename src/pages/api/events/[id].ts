import type { APIRoute } from 'astro';
import { eventFrom, readEvents, writeEvents } from '../../../lib/events';
import { isAdminRequest, sameOrigin } from '../../../lib/admin-auth';

export const prerender = false;

export const PUT: APIRoute = async ({ request, params }) => {
  if (!sameOrigin(request)) return Response.json({ error: 'Request rejected.' }, { status: 403 });
  if (!isAdminRequest(request)) return Response.json({ error: 'Sign in to manage events.' }, { status: 401 });
  try {
    const events = await readEvents();
    const index = events.findIndex((event) => event.id === params.id);
    if (index < 0) return Response.json({ error: 'Event not found.' }, { status: 404 });
    events[index] = eventFrom(await request.json(), events[index]);
    await writeEvents(events);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Event could not be saved.' }, { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ request, params }) => {
  if (!sameOrigin(request)) return Response.json({ error: 'Request rejected.' }, { status: 403 });
  if (!isAdminRequest(request)) return Response.json({ error: 'Sign in to manage events.' }, { status: 401 });
  try {
    const events = await readEvents();
    const remaining = events.filter((event) => event.id !== params.id);
    if (remaining.length === events.length) return Response.json({ error: 'Event not found.' }, { status: 404 });
    await writeEvents(remaining);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Event could not be removed.' }, { status: 500 });
  }
};
