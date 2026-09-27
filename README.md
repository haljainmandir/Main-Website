# Shri Digambar Mahaveer Jain Temple (HAL)

An Astro website with a file-backed event calendar and a small administrator area.

## Run locally

```sh
npm install
cp .env.example .env
```

Edit `.env` and replace the example admin password and session secret with private values. Keep `.env` out of version control. Then start the site:

```sh
npm run dev
```

Open `http://localhost:4321`. The public events page is at `/events`; the event manager is at `/admin`.

## Event administration

The admin form creates, edits, publishes, drafts and removes events. Published events appear at `/events`; drafts are visible only after signing in. The form accepts an event title, description, start and end times, location, optional HTTPS image URL and optional information link.

Events are stored as JSON, with no database. For local use, the default file is `data/events.json`. For deployment, set `EVENTS_FILE` to a writable path on the host's persistent disk. A temporary or ephemeral filesystem will lose edits when the service is restarted or redeployed.

Set these server environment variables:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD` — use a long, unique password
- `ADMIN_SESSION_SECRET` — use a separate random secret
- `EVENTS_FILE` — path on persistent storage

The admin credentials are supplied through environment settings and are not included in the website code. Admin sessions use an HTTP-only, same-site cookie, expire after eight hours, and login attempts are rate-limited.

## Build and run the Node server

```sh
npm run build
npm start
```

The hosting provider must support a long-running Node.js process and persistent writable storage. Configure the environment variables in the host dashboard; Astro's Node adapter does not automatically load `.env` in production.

## Deploy on Render

The repository includes `render.yaml` for a Render web service in Singapore. It builds with `npm ci && npm run build`, runs with `npm start`, and stores the event JSON file on a 1 GB persistent disk mounted at `/var/data`.

1. Push this project to a GitHub repository and connect that repository to Render.
2. In Render, create a Blueprint from the repository and review the service plan before confirming. The persistent disk requires a paid web service; Render's free web services use ephemeral storage and cannot retain JSON event edits.
3. Enter a private `ADMIN_USERNAME` and a long, unique `ADMIN_PASSWORD` when Render prompts for the two secret values. Render generates the session secret.
4. After the first deploy succeeds, open `/admin` on the assigned `onrender.com` address and sign in. Add a custom domain later if desired.

The Render web service and persistent disk have a monthly charge. Check Render's current pricing before creating the Blueprint.
