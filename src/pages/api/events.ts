import type { APIRoute } from 'astro';
import { eventFrom, readEvents, saveEvent } from '../../lib/events';
import { isAdminRequest, sameOrigin } from '../../lib/admin-auth';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const includeDrafts = new URL(request.url).searchParams.get('includeDrafts') === 'true';
    if (includeDrafts && !await isAdminRequest(request, locals.runtime.env)) {
      return Response.json({ error: 'Sign in to view drafts.' }, { status: 401 });
    }
    const events = await readEvents(locals.runtime.env.DB);
    return Response.json(events.filter((event) => includeDrafts || event.status === 'published'));
  } catch {
    return Response.json({ error: 'Events could not be loaded.' }, { status: 500 });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  if (!sameOrigin(request)) return Response.json({ error: 'Request rejected.' }, { status: 403 });
  if (!await isAdminRequest(request, locals.runtime.env)) return Response.json({ error: 'Sign in to manage events.' }, { status: 401 });
  try {
    await saveEvent(locals.runtime.env.DB, eventFrom(await request.json()));
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Event could not be saved.' }, { status: 400 });
  }
};
