import express from 'express';
import { Server } from 'http';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static assets from dist/public folder
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(process.cwd(), 'dist', 'public');
  app.use(express.static(staticPath));
  
  // Catch-all route to serve the index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      return res.sendFile(path.join(staticPath, 'index.html'));
    }
  });
}

// Create server
const server = new Server(app);

export default app;