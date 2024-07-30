import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import sass from 'sass';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: './node_modules/.vite/ecom-enduser',
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@assets': `${path.resolve(__dirname, './src/assets/')}`,
    },
  },
  server: {
    port: 4200,
  },
  css: {
    preprocessorOptions: {
      scss: { implementation: sass },
    },
  },
  envPrefix: 'ECOM_',
});
