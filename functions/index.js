const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Auth Trigger (new user signup)
exports.newUserSignup = functions.auth.user().onCreate((user, context) => {
  console.log(`user created ${user.email} ${user.uid}`);

  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    upvotedOn: [],
  });
});

// Auth Trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user, context) => {
  console.log(`user deleted ${user.email} ${user.uid}`);

  return admin.firestore().collection("users").doc(user.uid).delete();
});

// http callable function (adding a request)
exports.addRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "You ain't logged in boi, can't add no request."
    );
  }
  if (data.requestString.length > 30) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Too long!"
    );
  }
  return admin.firestore().collection("requests").add({
    text: data.requestString,
    upvotes: 0,
  });
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

async function handleUpvote (data, context) {
  // check auth state
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'only authenticated users can vote up requests'
    );
  }
  // get refs for user doc & request doc
  const user = admin.firestore().collection('users').doc(context.auth.uid);
  const request = admin.firestore().collection('requests').doc(data.id);

  const doc = await user.get();
  // check thew user hasn't already upvoted
  if(doc.data().upvotedOn.includes(data.id)){
    throw new functions.https.HttpsError(
      'failed-precondition',
      'You can only vote something up once'
    );
  }

  // update the array in user document
  await user.update({
    upvotedOn: [...doc.data().upvotedOn, data.id]
  });

  // update the votes on the request
  return request.update({
    upvotes: admin.firestore.FieldValue.increment(1)
  });
};

// upvote callable function
exports.upvote = functions.https.onCall(handleUpvote);

// firestore trigger for tracking activity
exports.logActivities = functions.firestore.document("/{collection}/{id}")
    .onCreate((snap, context) => {
      console.log(snap.data());

      const activities = admin.firestore().collection("activities");
      const collection = context.params.collection;

      if (collection === "requests") {
        return activities.add({text: "a new tutorial request was added"});
      }
      if (collection === "users") {
        return activities.add({text: "a new user signed up"});
      }

      return null;
    });
