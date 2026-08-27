import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/ai-resume/' : '/',
  plugins: [
    react(),
    tsconfigPaths({ root: fileURLToPath(new URL('.', import.meta.url)), projects: ['./tsconfig.app.json'] }),
  ],

  test: {
    environment: 'node',
    globals: true,
  },

  build: {
    chunkSizeWarningLimit: 550,
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: '@use "common/styles/mixins" as *;\n',
        loadPaths: [fileURLToPath(new URL('./src', import.meta.url))],
        quietDeps: true,
      },
    },
  },

  server: {
    open: true,
  },
}));
