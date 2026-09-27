import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  output: 'server',
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  // Admin auth uses its own signed cookie; Astro sessions are not used.
  // The memory driver prevents the Cloudflare adapter from requiring a KV binding.
  session: { driver: 'memory' },
});
