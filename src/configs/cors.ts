import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: ['http://localhost:3500'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'X-CSRF-Token',
    'X-XSRF-Token',
    'Authorization',
  ],
  optionsSuccessStatus: 204,
};
