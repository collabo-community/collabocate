import express from 'express';
import { join } from 'path';
import expressEjsLayouts from 'express-ejs-layouts';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

const app = express();

app.use(expressEjsLayouts);
app.set('layout', 'app');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './@dev-client/views');
app.use(express.static(join(__dirname + '/views')));

// app.use('css', express.static(join(__dirname + 'public/css')));

const app_variables = {
  backendURL: process.env.BACKEND_URL,
}

// use res.render to load up an ejs view file

// Collabocate App home page
app.get('/', function(req, res) {
  res.render('page-body/dashboard', {
    ...app_variables,
    page: {
      name: 'Dashboard',
      route: '/',
    },
  });
});

const tymecommPage = {
  name: 'Tyme Comm',
  route: 'tymecomm',
};

app.get('/tymecomm', function(req, res) {
  res.render('page-body/tymecomm', {
    ...app_variables,
    page: { 
      ...tymecommPage,
      subpage_name: 'view',
    },
  });
});

app.get('/tymecomm/settings', function(req, res) {
  res.render('page-body/settings/tymecomm', {
    ...app_variables,
    page: {
      ...tymecommPage,
      subpage_name: 'settings',
    },
  });
});

const PORT = process.env.CLIENT_APP_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Client running on port ${PORT}`);
});
