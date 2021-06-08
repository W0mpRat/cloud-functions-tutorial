const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const requestForm = document.querySelector('.new-request form');

function init() {
  firebase.functions().useEmulator('localhost', 5001)
}

init()

// open request modal
requestLink.addEventListener('click', () => {
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
const button = document.querySelector('.call');
button.addEventListener('click', helloButtonClick)

async function helloButtonClick () {
  // get function reference
  const sayHello = firebase.functions().httpsCallable('sayHello');
  
  const result = await sayHello({ name: 'Chase' })

  console.log(result.data)
}