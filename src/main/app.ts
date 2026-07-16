import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { appRouter } from './app-router.js';
import { corsOptions } from '../configs/cors.js';
import { errorHandler } from './error-handler.js';
// todo: add absolute import

const app: Express = express();
app.use(morgan(':method :url :status'));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', appRouter);
app.use(errorHandler);

export { app };
