import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/config';
import { fileURLToPath } from 'url';

import react from '@astrojs/react';

// Site URL from environment variable with localhost fallback
const siteUrl = process.env.SITE_URL || 'http://localhost:4321';

// Custom integration to warn about missing environment variables after build
function envCheckIntegration() {
  return {
    name: 'env-check',
    hooks: {
      'astro:build:done': () => {
        if (!process.env.SITE_URL) {
          console.warn('='.repeat(60));
          console.warn('WARNING: SITE_URL environment variable not set');
          console.warn('Build completed with fallback URL: http://localhost:4321');
          console.warn('For production, create .env file and set SITE_URL');
          console.warn('='.repeat(60) + '\n');
        }
      },
    },
  };
}

export default defineConfig({
  site: siteUrl,
  integrations: [mdx(), icon(), envCheckIntegration(), sitemap({
    filter: (page) => {
      const { features } = siteConfig;

      // Filter out pages based on feature flags
      if (!features.blog && page.includes('/blog')) return false;
      if (!features.docs && page.includes('/docs')) return false;
      if (!features.changelog && page.includes('/changelog')) return false;
      if (!features.testimonials && page.includes('/testimonials')) return false;
      if (!features.roadmap && page.includes('/roadmap')) return false;

      return true;
    },
  }), react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@sections': fileURLToPath(new URL('./src/components/sections', import.meta.url)),
        '@ui': fileURLToPath(new URL('./src/components/ui', import.meta.url)),
        '@forms': fileURLToPath(new URL('./src/components/forms', import.meta.url)),
        '@layout': fileURLToPath(new URL('./src/components/layout', import.meta.url)),
        '@dashboard': fileURLToPath(new URL('./src/components/dashboard', import.meta.url)),
        '@dashboard-ui': fileURLToPath(new URL('./src/components/dashboard-ui', import.meta.url)),
      },
    },
  },
});