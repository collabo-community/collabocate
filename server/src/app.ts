import express, { Express, Request, Response } from 'express';
import { router as appRouter } from './api/routes/app.route';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', appRouter);

export { app };