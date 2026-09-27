# Shri Digambar Mahaveer Jain Temple (HAL)

Astro website for the temple, with a Cloudflare Pages event calendar and a private event manager at `/admin`.

## Run locally

Requirements: Node.js 20.12 or newer.

```sh
npm install
```

Create `.dev.vars` in the project root with private values (this file is ignored by Git):

```dotenv
ADMIN_USERNAME="choose-a-private-username"
ADMIN_PASSWORD="choose-a-long-unique-password"
ADMIN_SESSION_SECRET="use-a-long-random-secret"
```

Initialize the local D1 database and start the site:

```sh
npm run db:migrate:local
npm run dev
```

Open `http://localhost:4321`. The public events page is `/events`; the event manager is `/admin`.

The event form supports creating, editing, publishing, drafting and removing events. Published events appear publicly. Drafts are only returned to an authenticated administrator. Event records are stored in D1; local development uses Wrangler's local D1 database.

## Cloudflare setup and deployment

The production project is live at `https://haljainmandir.pages.dev`. Cloudflare accepted the project name; no paid domain is required. The D1 database, production binding and encrypted admin secrets are configured.

After changing the site, deploy the current build with:

```sh
npm run deploy
```

To manage the Cloudflare project from a newly set up computer, install dependencies and authenticate with `npx wrangler login`. The D1 database ID is recorded in `wrangler.jsonc`. To restore the production schema and secrets when rebuilding the Cloudflare project, run `npm run db:migrate:remote` and `npx wrangler pages secret bulk .dev.vars --project-name haljainmandir` before deploying. Keep `.dev.vars` private and out of Git.

Cloudflare Pages and D1 include free usage quotas; review the current limits in Cloudflare's documentation before relying on them for sustained high traffic. Event data stays in D1 across site deployments.

## Security notes

- Admin credentials and the session signing secret belong in local `.dev.vars` or Cloudflare encrypted secrets, never in committed source files.
- Admin sessions use an HTTP-only, same-site cookie, expire after eight hours, and login attempts are rate-limited.
- Published event details are public. Do not enter private or sensitive information in event descriptions.
