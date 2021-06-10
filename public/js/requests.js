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

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    requests: []
  },
  mounted() {
    const ref = firebase.firestore().collection('requests');

    ref.onSnapshot(snapshot => {
      let requests = [];
      snapshot.forEach(doc => {
        requests.push({...doc.data(), id: doc.id});
      });

      this.requests = requests;  
    });
  }
})
