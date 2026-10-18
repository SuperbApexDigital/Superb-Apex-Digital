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

      // 4. Fallback for static image serving if requested through /src/assets/images/
      if (url && (url.startsWith('/src/assets/images/') || url.startsWith('/images/'))) {
        const imageName = path.basename(url);
        const candidates = [
          path.resolve(__dirname, 'public/images', imageName),
          path.resolve(__dirname, 'src/assets/images', imageName),
          path.resolve(__dirname, 'public', url.replace(/^\//, '')),
        ];

        for (const file of candidates) {
          if (fs.existsSync(file) && fs.statSync(file).isFile()) {
            const ext = path.extname(file).toLowerCase();
            const contentType =
              ext === '.jpg' || ext === '.jpeg'
                ? 'image/jpeg'
                : ext === '.png'
                ? 'image/png'
                : ext === '.webp'
                ? 'image/webp'
                : ext === '.svg'
                ? 'image/svg+xml'
                : 'application/octet-stream';
            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'public, max-age=3600');
            return fs.createReadStream(file).pipe(res);
          }
        }
      }

      next();
    });
  },
});

export default defineConfig(({ command }) => {
  // During local development or preview server, use root '/' for immediate availability.
  // For production build, default to the GitHub Pages repository path '/superb-apex-digital/'.
  // Supports runtime override via VITE_BASE_PATH environment variable (e.g. for custom root domains).
  let rawBase = process.env.VITE_BASE_PATH?.trim();
  if (rawBase) {
    if (!rawBase.endsWith('/')) rawBase = `${rawBase}/`;
    if (!rawBase.startsWith('/') && !rawBase.startsWith('.')) rawBase = `/${rawBase}`;
    rawBase = rawBase.replace(/\/{2,}/g, '/');
  }
  const basePath = rawBase || '/';

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
