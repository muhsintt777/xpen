import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { appRouter } from '@/main/app-router.js';
import { corsOptions } from '@/configs/cors.js';
import { errorHandler } from '@/main/error-handler.js';
import { healthHandler } from './health-handler.js';

const app: Express = express();
app.use(helmet());
app.use(morgan(':method :url :status'));
app.use(cors(corsOptions));
app.use(express.json());
app.get('/health', healthHandler);
app.use('/', appRouter);
app.use(errorHandler);

export { app };

// todo: >> Unhandled error:
// error: duplicate key value violates unique constraint "users_email_key"
