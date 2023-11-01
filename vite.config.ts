import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [RubyPlugin(), react()],
  build: {
    // Entrypoint configuration
    rollupOptions: {
      input: 'app/views/top/index.html.erb'
    }
  }
});
