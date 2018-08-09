// USER api

const express = require('express');
let usersRouter = express.Router();
// const CONST = require('../../config/constants');
require('../../config/db.js');

// Get USER api
usersRouter.get('/:uid', (req, res) => {
  admin.auth().getUser(req.params.uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      return res.status(200).json(userRecord);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

//Create new user
usersRouter.post("/", (req, res, next) => {
  admin.auth().createUser(req.body)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      return res.status(201).json({
        statusMessage: "ok",
        message: 'Created data successfully'
      });
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});


// Update USER api
usersRouter.patch('/:uid', (req, res) => {
  admin.auth().updateUser(req.params.uid, req.body)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      return res.status(200).json({
        statusMessage: "ok",
        message: 'Updated data successfully'
      });
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

// Delete USER api
usersRouter.delete('/:uid', (req, res) => {
  admin.auth().deleteUser(req.params.uid)
    .then(() => {
      return res.status(200).json({
        statusMessage: "ok",
        message: 'Record deleted Successfully'
      });
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

// Not found router after /USER
usersRouter.get('*', (req, res) => {
  res.status(404).json({ error: 'This route does not exist in users.' });
});

module.exports = {
  usersRouter
};
