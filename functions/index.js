const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//all apis
const menuApi = require('./api/menu/menu.js');
const usersApi = require('./api/users/users.js');
const authApi = require('./api/auth/auth.js')
//config
const CONST = require('./config/constants.js');
require('./config/db.js');

app.use(CONST.END_POINTS.MENU, menuApi.menuRouter);
app.use(CONST.END_POINTS.USERS, usersApi.usersRouter);
app.use(CONST.END_POINTS.AUTH, authApi.authRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/timestamp', (request, response) => {
  response.send(`${Date.now()}`);
});

app.get('/timestamp-cached', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-max-age=600');
  response.send(`${Date.now()}`);
});

app.get('*', (req, res) => {
  res.status(404).json({ error: 'This route does not exist.' });
});

exports.api = functions.https.onRequest(app);
