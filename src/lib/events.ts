import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';

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

const eventsPath = () => resolve(process.env.EVENTS_FILE || 'data/events.json');

export async function readEvents(): Promise<TempleEvent[]> {
  const file = eventsPath();
  try {
    const parsed: unknown = JSON.parse(await readFile(file, 'utf8'));
    if (!Array.isArray(parsed)) throw new Error('Event store must contain a JSON array.');
    return parsed as TempleEvent[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, '[]\n', { flag: 'wx' }).catch(() => undefined);
    return [];
  }
}

export async function writeEvents(events: TempleEvent[]): Promise<void> {
  const file = eventsPath();
  await mkdir(dirname(file), { recursive: true });
  const temporaryFile = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(events, null, 2)}\n`, { mode: 0o600 });
  await rename(temporaryFile, file);
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
    id: existing?.id || randomUUID(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}
