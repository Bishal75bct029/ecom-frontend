/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import sass from 'sass';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/ecom-client',

  server: {
    port: 4200,
    host: 'localhost',
    watch: {
      ignored: ['**/*', '!**/.ts', '!**/.tsx', '!**/.scss'],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(), svgr()],
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

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  css: {
    preprocessorOptions: {
      scss: { implementation: sass, quiteDeps: true },
    },
  },
  build: {
    outDir: '../../dist/apps/ecom-client',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  envPrefix: 'ECOM_',
});
