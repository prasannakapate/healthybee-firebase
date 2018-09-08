// offer api
const express = require("express");
let offersRouter = express.Router();
const CONST = require("../../config/constants.js");
const offerCtrl = require('./offer.controller');
require("../../config/db.js");

// Get offer api
offersRouter.get("/", (req, res) => {
  db.collection(CONST.COLLECTIONS.OFFERS)
    .get()
    .then(snapshot => {
      return snapshot.forEach(doc => res.status(200).json(doc.data()));
    })
    .catch(error => res.status(404).json(error));
});

// Post offer/subscriber api
offersRouter.post("/subscriber", offerCtrl.send_offer_email);

// Not found router after /offer
offersRouter.get("*", (req, res) => {
  res.status(404).json({ error: "This route does not exist in offerRouter." });
});

module.exports = {
  offersRouter
};
