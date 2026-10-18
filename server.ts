import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Runtime Environment requires dev server to run on port 3000
const PORT = 3000;

// High payload limit for image data URLs
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

const DATA_DIR = path.resolve(__dirname, 'data');
const ROSTER_FILE = path.join(DATA_DIR, 'team-roster.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure public images are statically accessible
const publicImagesDir = path.resolve(__dirname, 'public/images');
const srcImagesDir = path.resolve(__dirname, 'src/assets/images');

if (fs.existsSync(publicImagesDir)) {
  app.use('/images', express.static(publicImagesDir));
  app.use('/src/assets/images', express.static(publicImagesDir));
} else if (fs.existsSync(srcImagesDir)) {
  app.use('/images', express.static(srcImagesDir));
  app.use('/src/assets/images', express.static(srcImagesDir));
}

// API Routes
// 1. Get current team roster
app.get('/api/team', (req, res) => {
  try {
    if (fs.existsSync(ROSTER_FILE)) {
      const content = fs.readFileSync(ROSTER_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ success: true, members: parsed });
      }
    }
    return res.json({ success: true, members: [] });
  } catch (err) {
    console.error('Error reading team roster file:', err);
    return res.status(500).json({ error: 'Failed to read team roster' });
  }
});

// 2. Sync team roster (save from admin or client)
app.post('/api/team/sync', (req, res) => {
  try {
    const { members } = req.body;
    if (!Array.isArray(members)) {
      return res.status(400).json({ error: 'Members must be an array' });
    }
    fs.writeFileSync(ROSTER_FILE, JSON.stringify(members, null, 2), 'utf-8');
    return res.json({ success: true, count: members.length });
  } catch (err) {
    console.error('Error saving team roster:', err);
    return res.status(500).json({ error: 'Failed to save team roster' });
  }
});

// 3. Reset team roster on server
app.post('/api/team/reset', (req, res) => {
  try {
    if (fs.existsSync(ROSTER_FILE)) {
      fs.unlinkSync(ROSTER_FILE);
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reset roster' });
  }
});

// Dev server or Production static serving
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: {
      middlewareMode: true,
      host: '0.0.0.0',
      port: PORT,
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distDir = path.resolve(__dirname, 'dist');
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Apex Digital Server running on http://0.0.0.0:${PORT}`);
});
