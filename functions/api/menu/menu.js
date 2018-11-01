// menu api

const express = require("express");
const firebaseHelper = require("firebase-functions-helper");
let menuRouter = express.Router();
const CONST = require("../../config/constants.js");
require("../../config/db.js");

// Get menu api
menuRouter.get("/", (req, res) => {
  let menuData = [];
  db.collection(CONST.COLLECTIONS.MENU)
    .where("category", "==", req.query.category)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        menuData.push(doc.data());
      });
      return res.status(200).json(menuData);
    })
    .catch(error => res.status(404).json(error));
});

// Get menu api
menuRouter.get("/category", (req, res) => {
  let menuData = [];
  db.collection(CONST.COLLECTIONS.MENU)
    // .where("category", "==", "Fruit salad & custard")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(menuData.indexOf(doc.data().category) === -1) {
          menuData.push(doc.data().category);
        }
      });
      return res.status(200).json(menuData);
    })
    .catch(error => res.status(404).json(error));
});

// Post menu api
menuRouter.post("/", (req, res) => {
  firebaseHelper.firestore.creatNewDocument(
    db,
    CONST.COLLECTIONS.MENU,
    req.body
  );
  res.status(201).send("created successfully");
});

// Update menu api
menuRouter.patch("/:itemId", (req, res) => {
  firebaseHelper.firestore.updateDocument(
    db,
    CONST.COLLECTIONS.MENU,
    req.params.itemId,
    req.body
  );
  res.status(200).send("Update a new menu");
});

// Delete menu api
menuRouter.delete("/:itemId", (req, res) => {
  firebaseHelper.firestore.deleteDocument(
    db,
    CONST.COLLECTIONS.MENU,
    req.params.itemId,
    req.body
  );
  res.status(200).send("Menu deleted");
});

// Not found router after /menu
menuRouter.get("*", (req, res) => {
  res.status(404).json({ error: "This route does not exist in contacts." });
});

module.exports = {
  menuRouter
};
