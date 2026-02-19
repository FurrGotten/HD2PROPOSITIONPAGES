import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

export default defineConfig({
  base: '/HD2PROPOSITIONPAGES/',
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      // Maps '@' to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
});
