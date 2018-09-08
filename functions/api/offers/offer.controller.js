const nodemailer = require("nodemailer");
const CONST = require("../../config/constants.js");
require("../../config/db.js");

// setup email data with unicode symbols
let mailOptions = {
  from: '"HeallthyBee Team" <healthybee.fit.feedback@gmail.com>',
  to: "",
  subject: "HealthyBee - Promo Code",
  html: ""
};

let transporter = nodemailer.createTransport(CONST.FEEDBACK_TRANSPORTER);

function SendEmail(userDetails) {
  mailOptions.html = `<h3>Message Details:</h3>
    <b>Email: </b>${userDetails.email}<br /><br />`; // html body
  mailOptions.to = `${userDetails.email}`;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info.messageId;
  });
}

exports.send_offer_email = (req, res) => {
  if (req.body.email) {
    db.collection(CONST.COLLECTIONS.OFFER_SUBSCRIBERS)
      .add(req.body)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        res.status(201).json({
          statusMessage: "ok",
          message: "Subscriber saved successfully"
        });
        SendEmail(req.body);
        return;
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        res.status(404).json({ error });
      });
  } else {
    res.status(403).json({
      statusMessage: "ok",
      message: "Email is not set correctly"
    });
  }
};

exports.get_offer_details = (req, res) => {
  db.collection(CONST.COLLECTIONS.OFFERS)
    .get()
    .then(snapshot => {
      return snapshot.forEach(doc => res.status(200).json(doc.data()));
    })
    .catch(error => res.status(404).json(error));
};
