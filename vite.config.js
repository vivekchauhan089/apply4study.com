// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    vike() // no prerender or routing here anymore
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~assets': path.resolve(__dirname, 'src/assets')
    }
  },
  build: {
    assetsDir: 'assets'
    // ❌ remove rollupOptions.input — Vike handles it internally
  }
})
