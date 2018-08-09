// USER api

const express = require('express');
const firebaseHelper = require('firebase-functions-helper');
let usersRouter = express.Router();
const CONST = require('../../config/constants');
require('../../config/db');

//reference to the database collection
// const usersCollection = db.collection("users");

// Get USER api
usersRouter.get('/:uid', (req, res) => {
  admin.auth().getUser(req.params.uid)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully fetched user data:");
      res.status(200).json(userRecord);
    })
    .catch(function (error) {
      console.log("Error fetching user data:", error);
      res.status(404).json(error);
    });
});

//Create new user
usersRouter.post("/", (req, res, next) => {
  admin.auth().createUser(req.body)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      res.status(201).json({
        statusMessage: "ok",
        message: 'Created data successfully'
      });
    })
    .catch(function (error) {
      console.log("Error creating new user:", error);
      res.status(404).json(error);
    });
});


// Update USER api
usersRouter.patch('/:uid', (req, res) => {
  admin.auth().updateUser(req.params.uid, req.body)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully updated user");
      res.status(200).json({
        statusMessage: "ok",
        message: 'Updated data successfully'
      });
    })
    .catch(function (error) {
      console.log("Error updating user:", error);
      res.status(404).json(error);
    });
});

// Delete USER api
usersRouter.delete('/:uid', (req, res) => {
  admin.auth().deleteUser(req.params.uid)
    .then(function () {
      console.log("Successfully deleted user");
      res.status(200).json({
        statusMessage: "ok",
        message: 'Record deleted Successfully'
      });
    })
    .catch(function (error) {
      console.log("Error deleting user:", error);
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
