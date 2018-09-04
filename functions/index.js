const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//all apis
const authApi = require('./api/auth/auth.js');
const feedbackApi = require('./api/feedback/feedback.js');
const menuApi = require('./api/menu/menu.js');
const offersApi = require('./api/offers/offers.js')
const usersApi = require('./api/users/users.js');

//config
const CONST = require('./config/constants.js');
require('./config/db.js');
app.use(cors());
app.options('*', cors());
app.use(CONST.END_POINTS.AUTH, authApi.authRouter);
app.use(CONST.END_POINTS.FEEDBACK, feedbackApi.feedbackRouter);
app.use(CONST.END_POINTS.MENU, menuApi.menuRouter);
app.use(CONST.END_POINTS.OFFERS, offersApi.offersRouter);
app.use(CONST.END_POINTS.USERS, usersApi.usersRouter);

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
