import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { router as appRouter } from './api/routes/app.route';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: [`http://localhost:${process.env.CLIENT_APP_PORT}`, `${process.env.CLIENT_APP_URL}`] }));

app.use('/', appRouter);

export { app };