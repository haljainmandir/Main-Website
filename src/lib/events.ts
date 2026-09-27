export type TempleEvent = {
  id: string;
  title: string;
  summary: string;
  startsAt: string;
  endsAt: string;
  location: string;
  imageUrl: string;
  detailsUrl: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
};

type StoredEvent = { id: string; payload: string };

export async function readEvents(db: D1Database): Promise<TempleEvent[]> {
  const { results } = await db.prepare('SELECT id, payload FROM events ORDER BY starts_at ASC').all<StoredEvent>();
  return results.map(({ payload }) => JSON.parse(payload) as TempleEvent);
}

export async function findEvent(db: D1Database, id: string): Promise<TempleEvent | null> {
  const row = await db.prepare('SELECT id, payload FROM events WHERE id = ?').bind(id).first<StoredEvent>();
  return row ? JSON.parse(row.payload) as TempleEvent : null;
}

export async function saveEvent(db: D1Database, event: TempleEvent): Promise<void> {
  await db.prepare(`
    INSERT INTO events (id, starts_at, status, payload, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      starts_at = excluded.starts_at,
      status = excluded.status,
      payload = excluded.payload,
      updated_at = excluded.updated_at
  `).bind(event.id, event.startsAt, event.status, JSON.stringify(event), event.createdAt, event.updatedAt).run();
}

export async function removeEvent(db: D1Database, id: string): Promise<boolean> {
  const result = await db.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
  return result.meta.changes > 0;
}

export function validateEvent(input: unknown): Omit<TempleEvent, 'id' | 'createdAt' | 'updatedAt'> {
  if (!input || typeof input !== 'object') throw new Error('Enter the event details.');
  const value = input as Record<string, unknown>;
  const text = (key: string, max: number) => {
    const result = typeof value[key] === 'string' ? value[key].trim() : '';
    if (result.length > max) throw new Error(`${key} is too long.`);
    return result;
  };
  const title = text('title', 120);
  const summary = text('summary', 800);
  const startsAt = text('startsAt', 40);
  const endsAt = text('endsAt', 40);
  const location = text('location', 180);
  const imageUrl = text('imageUrl', 500);
  const detailsUrl = text('detailsUrl', 500);
  const status = value.status === 'draft' ? 'draft' : value.status === 'published' ? 'published' : '';

  if (!title || !summary || !startsAt || !location || !status) {
    throw new Error('Title, description, date, location and status are required.');
  }
  if (!Number.isFinite(Date.parse(startsAt)) || (endsAt && !Number.isFinite(Date.parse(endsAt)))) {
    throw new Error('Enter a valid event date and time.');
  }
  if (endsAt && Date.parse(endsAt) < Date.parse(startsAt)) {
    throw new Error('The end time must be after the start time.');
  }
  for (const url of [imageUrl, detailsUrl]) {
    if (!url) continue;
    if (url.startsWith('/') && !url.startsWith('//')) continue;
    try {
      if (new URL(url).protocol !== 'https:') throw new Error();
    } catch {
      throw new Error('Image and event links must be site paths or secure HTTPS links.');
    }
  }
  return { title, summary, startsAt, endsAt, location, imageUrl, detailsUrl, status };
}

export function eventFrom(input: unknown, existing?: TempleEvent): TempleEvent {
  const details = validateEvent(input);
  const now = new Date().toISOString();
  return {
    ...details,
    id: existing?.id || crypto.randomUUID(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}
