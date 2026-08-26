import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { appRouter } from '#/main/app-router.js';
import { corsOptions } from '#/configs/cors.js';
import { errorHandler } from '#/http/error-handler.js';
import { notFoundRouteHandler } from '#/http/not-found-handler.js';
import { loggerMiddleWare } from '#/middlewares/logger-middleware.js';
import { RateLimitMiddleware } from '#/middlewares/rate-limiter-middleware.js';
import { healthHandler } from '#/http/health-handler.js';

const app: Express = express();
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(loggerMiddleWare);
app.use(RateLimitMiddleware.default);
app.get('/health', healthHandler);
app.use('/', appRouter);
app.use(notFoundRouteHandler);
app.use(errorHandler);

export { app };

// todo: >> Unhandled error:
// error: duplicate key value violates unique constraint "users_email_key"

// todo: fix eslint issue
