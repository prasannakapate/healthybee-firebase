const functions = require('firebase-functions');
const firebase = require('firebase-admin');

//configs
firebase.initializeApp(functions.config().firebase);
db = firebase.firestore();
