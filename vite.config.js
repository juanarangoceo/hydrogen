import { defineConfig } from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const isSSR = mode === 'ssr';

  return {
    plugins: [hydrogen(), tsconfigPaths()],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: isSSR ? './app/entry.server.jsx' : './app/entry.client.jsx',
      },
      assetsInlineLimit: 0, // Permite aplicar políticas de seguridad de contenido más estrictas.
    },
    server: {
      port: 3000,
    },
    ssr: {
      noExternal: ['@shopify/hydrogen'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});
