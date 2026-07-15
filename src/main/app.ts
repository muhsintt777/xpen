import express, { Express } from 'express';
import cors from 'cors';
import { appRouter } from './app-router.js';
import { corsOptions } from '../configs/cors.js';

const app: Express = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', appRouter);

export { app };
