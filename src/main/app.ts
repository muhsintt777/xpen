import { Hono } from 'hono';
import { appRouter } from './app-router';

const app = new Hono();

app.route('/', appRouter);

export default {
  port: process.env.PORT || 3001,
  hostname: "0.0.0.0",
  fetch: app.fetch,
};


