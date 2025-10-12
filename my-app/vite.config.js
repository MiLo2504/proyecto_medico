import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Ajusta al puerto y host de tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina /api del path
      },
    },
  },
});