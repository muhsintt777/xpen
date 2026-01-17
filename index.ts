import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello, Hono!');
});

export default {
  port: process.env.PORT || 3001,
  hostname: "0.0.0.0",
  fetch: app.fetch,
};


