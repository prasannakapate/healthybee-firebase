// menu api

const express = require('express');
const firebaseHelper = require('firebase-functions-helper');
let menuRouter = express.Router();
const CONST = require('../../config/constants');
require('../../config/db');

// Get menu api
menuRouter.get('/', (req, res) => {
  firebaseHelper.firestore
    .backup(db, CONST.COLLECTIONS.MENU)
    .then(data => res.status(200).json(data))
    .catch(error => console.log(error));
});

// Post menu api
menuRouter.post('/', (req, res) => {
  firebaseHelper.firestore.creatNewDocument(db, CONST.COLLECTIONS.MENU, req.body);
  res.send('created successfully');
});

// Update menu api
menuRouter.patch('/:categoryId', (req, res) => {
  firebaseHelper.firestore.updateDocument(
    db,
    CONST.COLLECTIONS.MENU,
    req.params.categoryId,
    req.body
  );
  res.send('Update a new menu');
});

// Delete menu api
menuRouter.delete('/:categoryId', (req, res) => {
  firebaseHelper.firestore.deleteDocument(
    db,
    CONST.COLLECTIONS.MENU,
    req.params.categoryId,
    req.body
  );
  res.send('Menu deleted');
});

// Not found router after /menu
menuRouter.get('*', (req, res) => {
  res.status(404).json({ error: 'This route does not exist in contacts.' });
});

module.exports = {
  menuRouter
};
