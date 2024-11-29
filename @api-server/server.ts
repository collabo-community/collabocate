import mongooseConnect from './db.connect';
import { app as app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  mongooseConnect(port);
});

