// offer api
const express = require("express");
let offersRouter = express.Router();
const CONST = require("../../config/constants.js");
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
offersRouter.post("/subscriber", (req, res) => {
  if (req.body.email) {
    db.collection(CONST.COLLECTIONS.OFFER_SUBSCRIBERS)
      .add(req.body)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        res.status(201).json({
          statusMessage: "ok",
          message: "Subscriber saved successfully"
        });
        return;
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        res.status(404).json({ error });
      });
    // SendEmail(req.body);
  } else {
    res.status(403).json({
        statusMessage: "ok",
        message: "Email is not set correctly"
      });
  }
});

// Not found router after /offer
offersRouter.get("*", (req, res) => {
  res.status(404).json({ error: "This route does not exist in offerRouter." });
});

module.exports = {
  offersRouter
};
