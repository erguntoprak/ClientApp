import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as rateLimit from 'express-rate-limit';
import 'localstorage-polyfill'


const domino = require('domino');
const fs = require('fs');
const path = require('path');
const compression = require('compression');

const template = fs
  .readFileSync(path.join(join(process.cwd(), 'dist/client-app/browser'), 'index.html'))
  .toString();

// Shim for the global window and document objects.
const window = domino.createWindow(template);
window.Object = Object;
window.Math = Math;
global['window'] = window;
global['document'] = window.document;
global["branch"] = null;
global["object"] = window.object;
global["HTMLElement"] = window.HTMLElement;
global["navigator"] = window.navigator;
global["localStorage"] = localStorage;
global["sessionStorage"] = localStorage;


// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  server.use(compression({ level: 6 }));
  const distFolder = join(process.cwd(), 'dist/client-app/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  const limiter = rateLimit({
    windowMs: 10000,
    max: 200,
    message: 'Too many requests from this IP, please try again'
  });
  server.use(limiter);

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
