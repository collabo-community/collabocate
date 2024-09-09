import express from 'express';
import { join } from 'path';
import expressEjsLayouts from 'express-ejs-layouts';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

const app = express();

/* --------------------------
  ejs layout setup, enable
  renaming of layout.ejs file
  to app.ejs to work.
-------------------------- */
app.use(expressEjsLayouts);
app.set('layout', 'app');

/* --------------------------
  set the view engine to ejs,
  and determine folder.
-------------------------- */
app.set('view engine', 'ejs');
app.set('views', './@dev-client/views');
app.use(express.static(join(__dirname + '/views')));

/* ---------------------------------
  use res.render to load up the ejs
  view files for the different pages
--------------------------------- */
const app_variables = {
  backendURL: process.env.BACKEND_URL,
}

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

/* --------------------
  Run the client server
-------------------- */
const PORT = process.env.CLIENT_APP_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Client running on port ${PORT}`);
});
