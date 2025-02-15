import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import * as remixBuild from 'virtual:remix/server-build';

const app = express();

app.use(express.static('public')); // Archivos estáticos

app.all(
  '*',
  createRequestHandler({
    build: remixBuild,
    mode: process.env.NODE_ENV,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
