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

const HelloVueApp = {
  data() {
    return {
      message: 'Hello Vue!!',
      requests: []
    }
  },
  mounted () {
    const ref = firebase.firestore().collection('requests').orderBy('upvotes', 'desc');

    ref.onSnapshot(snapshot => {
      let requests = [];
      snapshot.forEach(doc => {
        requests.push({...doc.data(), id: doc.id});
      });

      this.requests = requests;  
    });
  },
  methods: {
    async submitUpvote (id) {
      const upvoteFn = firebase.functions().httpsCallable('upvote')

      try {
        const result = await upvoteFn({ id })
      } catch (error) {
        console.error(error.message)
      }
    }
  }
}

Vue.createApp(HelloVueApp).mount('#app')

// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!',
//     requests: []
//   },
//   mounted() {
//     const ref = firebase.firestore().collection('requests');

//     ref.onSnapshot(snapshot => {
//       let requests = [];
//       snapshot.forEach(doc => {
//         requests.push({...doc.data(), id: doc.id});
//       });

//       this.requests = requests;  
//     });
//   }
// })
