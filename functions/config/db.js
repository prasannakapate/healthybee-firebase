// const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const serviceAccount = require("./healthybee-subscription-firebase-adminsdk-czjwv-1e94d450fb.json");
//configs
// firebase.initializeApp(functions.config().firebase);

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});
admin = firebase;
db = firebase.firestore();
db.settings({timestampsInSnapshots: true});
