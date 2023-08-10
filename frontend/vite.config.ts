import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.WEB_HOST || '0.0.0.0',
    port: process.env.WEB_PORT || 8000 // This is the port which we will use in docker
  }
})

