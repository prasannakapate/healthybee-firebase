//contact api
const express = require('express');
const firebaseHelper = require('firebase-functions-helper');
let contactsRouter = express.Router();
require('../../config/db');

contactsRouter.get('/', (req, res) => {
  firebaseHelper.firestore
    .backup(db, 'facts')
    .then(data => res.status(200).json(data))
    .catch(error => console.log(error));
});

contactsRouter.get('*', (req, res) => {
  res.status(404).json({ error: 'This route does not exist in contacts.' });
});

module.exports = {
  contactsRouter
};
