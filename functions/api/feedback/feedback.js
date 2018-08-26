// menu api

const express = require("express");
const firebaseHelper = require("firebase-functions-helper");
let feedbackRouter = express.Router();
const CONST = require("../../config/constants.js");
const nodemailer = require("nodemailer");
require("../../config/db.js");

// setup email data with unicode symbols
let mailOptions = {
  from: '"HeallthyBee Team" <healthybee.fit.feedback@gmail.com>',
  to: '"HeallthyBee Team" <healthybee.fit.feedback@gmail.com>',
  subject: "HealthyBee Customer Feedback",
  html: ""
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "healthybee.fit.feedback@gmail.com",
    pass: "17@Healthy"
  }
});

function SendEmail(userDetails) {
  mailOptions.html = `<h3>Message Details:</h3>
  <b>Name: </b>${userDetails.name}<br /><br />
  <b>Email: </b>${userDetails.email}<br /><br />
  <b/>Message: </b>${userDetails.message} <br />`; // html body
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info.messageId;
  });
}

// Get Feedback api
feedbackRouter.get("/", (req, res) => {
  firebaseHelper.firestore
    .backup(db, CONST.COLLECTIONS.FEEDBACK)
    .then(data => res.status(200).json(data))
    .catch(error => console.log(error));
});

// Post feedback api
feedbackRouter.post("/", (req, res) => {
  db.collection(CONST.COLLECTIONS.FEEDBACK)
    .add(req.body)
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
      res.status(201).json({
        statusMessage: "ok",
        message: "Feedback saved successfully"
      });
      return;
    })
    .catch(error => {
      console.error("Error adding document: ", error);
      res.status(404).json({ error });
    });
  SendEmail(req.body);
});

// Not found router after /feedback
feedbackRouter.get("*", (req, res) => {
  res.status(404).json({ error: "This route does not exist in feedback." });
});

module.exports = {
  feedbackRouter
};
