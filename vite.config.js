import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175, // Se till att detta matchar porten du försöker öppna
  },
  base: "./", // Viktigt om du använder relativ sökväg
});
