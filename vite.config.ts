import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  define: {
    'process.env.VITE_TMDB_API_KEY': JSON.stringify(process.env.VITE_TMDB_API_KEY),
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
