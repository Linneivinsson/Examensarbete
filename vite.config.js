import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
  },
  base: "./", // Viktigt för Firebase + HashRouter
  build: {
    outDir: 'dist'  // <-- Detta styr att mappen heter "dist"
  }
});