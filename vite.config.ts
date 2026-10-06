import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// base relativa: la app funciona en GitHub Pages (/academia-ndt/) y en cualquier hosting.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()]
});
