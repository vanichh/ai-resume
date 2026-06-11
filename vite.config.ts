import { URL, fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const getSourcePath = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/ai-resume/' : '/',
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 550,
  },

  css: {
    devSourcemap: true,
  },

  resolve: {
    alias: {
      '@common': getSourcePath('./src/common'),
      '@components': getSourcePath('./src/components'),
      '@services': getSourcePath('./src/services'),
      '@store': getSourcePath('./src/store'),
    },
  },

  server: {
    open: true,
  },
}));
