import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';

const teamSyncPlugin = () => ({
  name: 'team-sync-middleware',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url?.split('?')[0];

      // 1. GET /api/team
      if (url === '/api/team' && req.method === 'GET') {
        try {
          const rosterPath = path.resolve(__dirname, 'data/team-roster.json');
          if (fs.existsSync(rosterPath)) {
            const data = fs.readFileSync(rosterPath, 'utf-8');
            const parsed = JSON.parse(data);
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, members: parsed }));
          }
        } catch (e) {
          console.error('Error reading team roster in vite dev server:', e);
        }
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true, members: [] }));
      }

      // 2. POST /api/team/sync
      if (url === '/api/team/sync' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            const dataDir = path.resolve(__dirname, 'data');
            if (!fs.existsSync(dataDir)) {
              fs.mkdirSync(dataDir, { recursive: true });
            }
            const rosterPath = path.join(dataDir, 'team-roster.json');
            const membersList = Array.isArray(parsed.members) ? parsed.members : parsed;
            fs.writeFileSync(rosterPath, JSON.stringify(membersList, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, count: membersList.length }));
          } catch (err: any) {
            console.error('Failed to parse sync body in vite dev server:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: err.message || 'Sync failed' }));
          }
        });
        return;
      }

      // 3. POST /api/team/reset
      if (url === '/api/team/reset' && req.method === 'POST') {
        try {
          const rosterPath = path.resolve(__dirname, 'data/team-roster.json');
          if (fs.existsSync(rosterPath)) {
            fs.unlinkSync(rosterPath);
          }
        } catch (e) {}
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true }));
      }

      next();
    });
  },
});

export default defineConfig(({ command }) => {
  // For production build, default to relative base './' so assets load seamlessly
  // on any GitHub Pages repository name, custom root domains, or subdirectories without 404 white screens.
  // Runtime override remains supported via VITE_BASE_PATH if a specific absolute base is desired.
  let rawBase = process.env.VITE_BASE_PATH?.trim();
  if (rawBase) {
    if (!rawBase.endsWith('/')) rawBase = `${rawBase}/`;
    if (!rawBase.startsWith('/') && !rawBase.startsWith('.')) rawBase = `/${rawBase}`;
    rawBase = rawBase.replace(/\/{2,}/g, '/');
  }
  const basePath = rawBase || (command === 'build' ? './' : '/');

  return {
    base: basePath,
    plugins: [react(), tailwindcss(), teamSyncPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
