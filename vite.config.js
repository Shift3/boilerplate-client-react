import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

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
      viteCommonjs(),
    ],
    server: {
      port: process.env.PORT || 4200,
    },
    define: {
      'process.env': env,
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [esbuildCommonjs(['lodash'])],
      },
    },
  };
});
