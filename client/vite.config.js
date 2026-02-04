import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/p': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/categories': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/tags': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/products': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/orders': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/users': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})