import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Since this is a mostly client-side application, we only need minimal routes
  // for serving the static files

  // API health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get available languages
  app.get('/api/languages', (req, res) => {
    res.json({
      languages: [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'zh', name: '中文' }
      ]
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
