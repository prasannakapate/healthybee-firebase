// USER api

const express = require('express');
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({ origin: true });
let authRouter = express.Router();
require('../../config/db.js');

//Create new user
authRouter.post("/login", (req, res, next) => {
  let email = '';
  try {
    // Authentication requests are POSTed, other requests are forbidden
    if (req.method !== 'POST') {
      return handleResponse(req.body.email, res, 403);
    }
    username = req.body.email;
    if (!username) {
      return handleResponse(username, res, 400);
    }
    const password = req.body.password;
    if (!password) {
      return handleResponse(username, res, 400);
    }

    // On success return the Firebase Custom Auth Token.
    const firebaseToken = admin.auth().createCustomToken(username);
    return handleResponse(username, res, 200, {
      token: firebaseToken,
    });
  } catch (error) {
    return handleError(username, error);
  }
});

const handleResponse = (username, res, status, body) => {
  console.log({ User: username }, {
    Response: {
      Status: status,
      Body: body,
    },
  });
  if (body) {
    res.status(200).json(body);
    return;
  }
  res.sendStatus(status);
  return;
};

const handleError = (username, error) => {
  console.error({ User: username }, error);
  res.sendStatus(500).json(error);
  return;
};

authRouter.post('/sessionLogout', (req, res) => {
  res.clearCookie('session');
  res.redirect('/login');
});

// Not found router after /USER
authRouter.get('*', (req, res) => {
  res.status(404).json({ error: 'This route does not exist in login.' });
});

module.exports = {
  authRouter
};