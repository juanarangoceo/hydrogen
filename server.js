// Virtual entry point for the app
import * as remixBuild from 'virtual:remix/server-build';
import { createRequestHandler } from '@shopify/remix-oxygen';
import { createAppLoadContext } from '~/lib/context';

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(request, env, executionContext) {
    try {
      const appLoadContext = await createAppLoadContext(request, env, executionContext);

      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => appLoadContext,
      });

      return handleRequest(request);
    } catch (error) {
      console.error('Error in server.js:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
