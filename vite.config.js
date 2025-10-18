import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';

export default defineConfig({
  plugins: [
    react(),
    ssr({
      prerender: true // tells vite-plugin-ssr to generate static HTML
    })
  ]
})
