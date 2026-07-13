import express, { Express } from "express";
import { appRouter } from "./app-router.js";

const app: Express = express();
app.use(express.json());
app.use("/", appRouter);

export { app };
