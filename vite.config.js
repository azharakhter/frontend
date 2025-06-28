import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 5173,
    strictPort: true,
    allowedHosts: [
      '35.183.34.191', // Your EC2 IP
      'ec2-35-183-34-191.ca-central-1.compute.amazonaws.com' // Public DNS
    ]
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true // Clears old files before build
  }
});