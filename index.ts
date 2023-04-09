import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './src/app.module';

const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
const x = {
  source: 'functions',
  codebase: 'default',
  ignore: [
    'node_modules',
    '.git',
    'firebase-debug.log',
    'firebase-debug.*.log',
  ],
  predeploy: ['npm --prefix "$RESOURCE_DIR" run lint'],
};
