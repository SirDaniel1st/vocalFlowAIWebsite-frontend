import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { setupAPIRoutes } from 'src/server/api.ts'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-routes',
      configureServer(server) {
        setupAPIRoutes(server);
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});