// const db = firebase.firestore();

// console.log(db);

// // real-time listener
// db.collection('requests').onSnapshot(snapshot => {
//   let changes = snapshot.docChanges();
//   for (const change of changes) {
//     if(change.type == 'added'){
//       // renderCafe(change.doc);
//       console.log(change.doc);
//     }
//   }
// });

const ref = firebase.firestore().collection('requests');

ref.onSnapshot(snapshot => {
  // console.log(snapshot);
  let requests = [];
  snapshot.forEach(doc => {
    requests.push({...doc.data(), id: doc.id});
  });
  // console.log(requests);

  let html = '';
  requests.forEach(request => {
    html += `<li>${request.text}</li>`
  });
  document.querySelector('ul').innerHTML = html;
});