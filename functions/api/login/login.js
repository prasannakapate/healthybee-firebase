// USER api

const express = require('express');
let loginRouter = express.Router();
// const CONST = require('../../config/constants');
require('../../config/db.js');

//Create new user
loginRouter.post("/", (req, res, next) => {
  admin.auth().createUser(req.body)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      return res.status(201).json({
        statusCode: 201,
        statusReponse: 'Ok',
        message: 'Created data successfully',
      });
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

// Not found router after /USER
loginRouter.get('*', (req, res) => {
  res.status(404).json({ error: 'This route does not exist in login.' });
});

module.exports = {
  loginRouter
};
