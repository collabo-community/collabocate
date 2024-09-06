import express from "express";
import { join } from "path";

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './@dev-client/views');
app.use(express.static(join(__dirname + '/views')));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index', {
    backendURL: process.env.BACKEND_URL
  });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

const PORT = process.env.CLIENT_APP_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Client running on port ${PORT}`);
});
