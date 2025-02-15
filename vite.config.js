import { defineConfig } from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const isSSR = mode === 'ssr';

  return {
    plugins: [hydrogen(), tsconfigPaths()],
    build: {
      outDir: 'build', // Unifica la salida en el directorio "build"
      rollupOptions: {
        input: isSSR ? './app/entry.server.jsx' : './app/entry.client.jsx',
      },
    },
    server: {
      port: 3000,
      hmr: {
        protocol: 'ws',
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
    ssr: {
      noExternal: ['@shopify/hydrogen'], // Evita errores al procesar Hydrogen
    },
  };
});
