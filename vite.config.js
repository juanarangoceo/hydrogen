import { defineConfig } from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const isSSR = mode === 'ssr';

  return {
    plugins: [hydrogen(), tsconfigPaths()],
    build: {
      outDir: isSSR ? 'dist/server' : 'dist/client',
      rollupOptions: {
        input: isSSR ? './app/entry.server.jsx' : './app/entry.client.jsx',
      },
    },
    server: {
      port: 3000,
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});
