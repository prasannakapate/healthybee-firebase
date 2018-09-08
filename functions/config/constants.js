module.exports = {
  END_POINTS: {
    AUTH: "/auth",
    CONTACTS: "/contacts",
    FACTS: "/facts",
    FEEDBACK: "/feedback",
    MENU: "/menu",
    USERS: "/users",
    OFFERS: "/offers",
    PROMOCODE: "/promocode"
  },
  COLLECTIONS: {
    CONTACTS: "contacts",
    FACTS: "facts",
    FEEDBACK: "feedback",
    MENU: "menu",
    OFFERS: "offers",
    PROMOCODE: "promocode",
    OFFER_SUBSCRIBERS: "offerSubscribers"
  },
  FEEDBACK_TRANSPORTER: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "healthybee.fit.feedback@gmail.com",
      pass: "17@Healthy"
    }
  }
};
