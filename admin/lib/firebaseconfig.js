var admin = require("firebase-admin");

var serviceAccount = require('./firebase.json');;

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://study.firebaseio.com"
});*/

module.exports.firebaseadmin = admin