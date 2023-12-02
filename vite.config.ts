import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import FullReload from 'vite-plugin-full-reload';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    RubyPlugin(),
    react(),
    FullReload(['config/routes.rb', 'app/views/**/*'], { delay: 100 })
  ],
  base: '/app/',
  build: {
    rollupOptions: {
      input: {
        convertPage: 'app/frontend/entrypoints/convertPage.tsx',
        top: 'app/frontend/entrypoints/top.tsx'
      }
    }
  }
});
