const functions = require('firebase-functions');
const express = require('express');
const firebaseHelper = require('firebase-functions-helper');
const app = express();
const bodyParser = require('body-parser');
const contactsApi = require('./api/contacts');
const menuApi = require('./api/menu');
const CONST = require('./config/constants');
require('./config/db');

app.use(CONST.END_POINTS.CONTACTS, contactsApi.contactsRouter);
app.use(CONST.END_POINTS.MENU, menuApi.menuRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/timestamp', (request, response) => {
  response.send(`${Date.now()}`);
});

app.get('/timestamp-cached', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-max-age=600');
  response.send(`${Date.now()}`);
});

app.post(CONST.END_POINTS.FACTS, (req, res) => {
  firebaseHelper.firestore.creatNewDocument(db, CONST.COLLECTIONS.FACTS, req.body);
  res.send('created successfully');
});

app.get(CONST.END_POINTS.FACTS, (req, res) => {
  firebaseHelper.firestore
    .backup(db, CONST.COLLECTIONS.FACTS)
    .then(data => res.status(200).json(data))
    .catch(error => console.log(error));
});

app.post(CONST.END_POINTS.FACTS, (req, res) => {
  firebaseHelper.firestore.creatNewDocument(db, CONST.COLLECTIONS.FACTS, req.body);
  res.send('created successfully');
});

app.get('*', (req, res) => {
  res.status(404).json({ error: 'This route does not exist.' });
});

exports.api = functions.https.onRequest(app);
