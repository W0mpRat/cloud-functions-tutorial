const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Auth Trigger (new user signup)
exports.newUserSignup = functions.auth.user().onCreate((user, context) => {
  console.log(`user created ${user.email} ${user.uid}`);
});

// Auth Trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user, context) => {
  console.log(`user deleted ${user.email} ${user.uid}`);
});

// http request 1
exports.randomNumber = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);

  functions.logger.info(number, {structuredData: true});

  console.log(number);

  res.send(number.toString());
});

// http request 2
exports.toTheDojo = functions.https.onRequest((req, res) => {
  res.redirect("https://www.thenetninja.co.uk");
});

// http callable function 1
exports.sayHello = functions.https.onCall((data, context) => {
  return `Hello, my dood ${data.name}`;
});
