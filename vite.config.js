import { defineConfig } from 'vite';
import { hydrogen } from '@shopify/hydrogen/vite';
import { oxygen } from '@shopify/mini-oxygen/vite';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const isSSR = mode === 'ssr';

  return {
    plugins: [
      tailwindcss(),
      hydrogen(),
      oxygen(),
      remix({
        presets: [hydrogen.preset()],
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
          v3_singleFetch: true,
        },
      }),
      tsconfigPaths(),
    ],
    build: {
      outDir: isSSR ? 'dist/server' : 'public',
      assetsInlineLimit: 0,
      rollupOptions: {
        input: isSSR ? './app/entry.server.jsx' : './app/entry.client.jsx',
      },
    },
    ssr: {
      target: 'node',
      optimizeDeps: {
        include: [],
      },
    },
  };
});
