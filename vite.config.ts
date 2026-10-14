import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const basePath = rawBase || (command === 'serve' ? '/' : '/superb-apex-digital/');

  return {
    base: basePath,
    plugins: [react(), tailwindcss()],
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
