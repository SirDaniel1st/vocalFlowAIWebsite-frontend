import type { ViteDevServer } from 'vite';
import { importContactsApi } from '@/api/contacts'; // Ensure this path resolves properly

export function setupAPIRoutes(server: ViteDevServer) {
  server.middlewares.use(async (req, res, next) => {
    if (req.url?.startsWith('/api/')) {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const path = url.pathname;

      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // Handle preflight OPTIONS requests
      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      try {
        // Handle specific API routes
        if (path === '/api/contacts/import' && req.method === 'POST') {
          handleImportContacts(req, res);
          return;
        }

        // Respond with 404 if route is not found
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
        return;
      } catch (error) {
        console.error('API Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
        return;
      }
    }

    // Pass to the next middleware if not an API route
    next();
  });
}

// Helper function to handle /api/contacts/import
async function handleImportContacts(req: any, res: any) {
  const chunks: Buffer[] = [];

  req.on('data', (chunk: Buffer) => chunks.push(chunk));

  req.on('end', async () => {
    try {
      const data = JSON.parse(Buffer.concat(chunks).toString());

      // Validate the incoming data
      if (!data.userId || !Array.isArray(data.contacts)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request data' }));
        return;
      }

      // Process the contacts using the API logic
      const result = await importContactsApi(data.userId, data.contacts);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (error) {
      console.error('Error processing import:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });
}
