import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
      {
        find: '@store',
        replacement: path.resolve(__dirname, 'src/store'),
      },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
      },
    },
  },
});
