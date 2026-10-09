import { CorsOptions } from 'cors';
import { ENV } from './env.js';

const allowedOrigins =
  ENV.NODE_ENV === 'development' ? ['http://localhost:3500'] : [];

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
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
