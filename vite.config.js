import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'http://99.79.54.122', // Your EC2 IP
      'http://ec2-99-79-54-122.ca-central-1.compute.amazonaws.com' // Public DNS
    ]
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true // Clears old files before build
  }
});