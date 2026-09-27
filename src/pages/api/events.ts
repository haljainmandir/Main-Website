import type { APIRoute } from 'astro';
import { eventFrom, readEvents, writeEvents } from '../../lib/events';
import { isAdminRequest, sameOrigin } from '../../lib/admin-auth';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const includeDrafts = new URL(request.url).searchParams.get('includeDrafts') === 'true';
    if (includeDrafts && !isAdminRequest(request)) {
      return Response.json({ error: 'Sign in to view drafts.' }, { status: 401 });
    }
    const events = await readEvents();
    return Response.json(events.filter((event) => includeDrafts || event.status === 'published'));
  } catch {
    return Response.json({ error: 'The events file could not be read.' }, { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!sameOrigin(request)) return Response.json({ error: 'Request rejected.' }, { status: 403 });
  if (!isAdminRequest(request)) return Response.json({ error: 'Sign in to manage events.' }, { status: 401 });
  try {
    const events = await readEvents();
    events.push(eventFrom(await request.json()));
    await writeEvents(events);
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Event could not be saved.' }, { status: 400 });
  }
};
