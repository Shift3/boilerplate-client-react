import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      nodePolyfills({
        protocolImports: true,
      }),
      // generateSW
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'bootstrap.bundle.min.js',
          'bootstrap.min.css',
          'favicon.ico',
          'index.html',
          'logo192.png',
          'logo512.png',
          'robots.txt',
        ],
        workbox: {
          globPatterns: ['**/*.{js,css,html,jpg}'],
        },
      }),
    ],
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 4200,
    },
    preview: {
      port: 4200,
    },
    define: {
      'process.env': env,
    },
  };
});
