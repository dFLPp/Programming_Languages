import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',     
  build: { outDir: 'dist' },     
  publicDir: 'public',

  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {target: 'http://localhost:5000/api/v1/'}
    },
  },
})
