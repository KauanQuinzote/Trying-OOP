import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  server: {
    port: 5173,
    open: true,
    proxy: {
      // Redireciona chamadas /api para o backend Express
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: '../dist-client',
    emptyOutDir: true,
  }
});
