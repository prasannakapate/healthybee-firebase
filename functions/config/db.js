const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const serviceAccount = require("./healthybee-subscription-firebase-adminsdk-czjwv-1e94d450fb.json");
//configs
// firebase.initializeApp(functions.config().firebase);

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://healthybee-subscription.firebaseio.com"
});
admin = firebase;
db = firebase.firestore();
