const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const changePasswordLink = document.querySelector('.change-user-password');
const requestForm = document.querySelector('.new-request form');
// const sayHelloButton = document.querySelector('say-hello-button');

function init() {
  firebase.functions().useEmulator('localhost', 5001)
}

init()

// change user password
changePasswordLink.addEventListener('click', async () => {
  const changeUserPassword = firebase.functions().httpsCallable('changeUserPassword');
  changeUserPassword()
  .then(() => {
    console.log('password changed')
  })
  .catch(error => {
    requestForm.querySelector('.error').textContent = error.message;
  });
});

// open request modal
requestLink.addEventListener('click', async () => {
  // get function reference
  // const sayHello = firebase.functions().httpsCallable('sayHello');
  
  // const result = await sayHello({ name: 'Chase' })
  requestModal.classList.add('open');
});

// close request modal
requestModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('new-request')) {
    requestModal.classList.remove('open');
  }
});

// add a new request
requestForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const addRequest = firebase.functions().httpsCallable('addRequest');
  addRequest({ 
    requestString: requestForm.request.value 
  })
  .then(() => {
    requestForm.reset();
    requestForm.querySelector('.error').textContent = '';
    requestModal.classList.remove('open');
  })
  .catch(error => {
    requestForm.querySelector('.error').textContent = error.message;
  });
});

// say hello function call
// const button = document.querySelector('.call');

// async function helloButtonClick () {
//   // get function reference
//   const sayHello = firebase.functions().onCall('sayHello');
  
//   const result = await sayHello({ name: 'Chase' })

//   console.log(result.data)
// }

// sayHelloButton.addEventListener('click', helloButtonClick)

// notification
const notification = document.querySelector('.notification');

const showNotification = (message) => {
  notification.textContent = message;
  notification.classList.add('active');
  setTimeout(() => {
    notification.classList.remove('active');
    notification.textContent = '';
  }, 4000);
};