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
      assets: path.resolve(__dirname, './src/assets/'),
      layouts: path.resolve(__dirname, './src/layouts/'),
      components: path.resolve(__dirname, './src/components/'),
      pages: path.resolve(__dirname, './src/pages/'),
      store: path.resolve(__dirname, './src/store/'),
      hooks: path.resolve(__dirname, './src/hooks/'),
      utils: path.resolve(__dirname, './src/utils/'),
      routes: path.resolve(__dirname, './src/routes/'),
    },
  },
  server: {
    port: 4200,
  },

  assetsInclude: ['**/*.ttf', '**/*.svg', '**/*.jpg', '**/*.png', '**/*.webp', '**/*.jpeg'],
  css: {
    preprocessorOptions: {
      scss: { implementation: sass },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    cssMinify: true,
    cssCodeSplit: true,
    assetsDir: 'assets',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src/components/atoms')) {
            return 'components';
          }
        },
      },
    },
  },
  envPrefix: 'ECOM_',
});
