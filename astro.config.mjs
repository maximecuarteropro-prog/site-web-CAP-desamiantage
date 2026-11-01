// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Pages statiques pré-rendues (HTML complet, lisible par Google, Bing et les robots d'IA).
// Seule la route /api/demande s'exécute sur le serveur (fonction Vercel).
export default defineConfig({
  site: 'https://cap-desamiantage.fr',
  trailingSlash: 'never',
  // CSS dans la page : pas de requête bloquante avant le premier affichage (une seule feuille, ~40 Ko).
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
  adapter: vercel(),
  integrations: [
    react(),
    sitemap({ filter: (page) => !page.endsWith('/404') }),
  ],
  devToolbar: { enabled: false },
});
