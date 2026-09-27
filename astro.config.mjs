import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
