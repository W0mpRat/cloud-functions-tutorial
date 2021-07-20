const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
// const googleLoginForm = document.querySelector('.google-login');
const signOut = document.querySelector('.sign-out');
let provider;
let auth_pattern = 'email';

function init() {
  const auth = firebase.auth();
  // auth.useEmulator("http://localhost:9099");
  provider = new firebase.auth.GoogleAuthProvider();
}

init()

// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('active'));
  });
});

// register form
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  try {
    const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
    console.log('registered', newUser);
    registerForm.reset();
  } catch (error) {
    registerForm.querySelector('.error').textContent = error.message;
  }
});

// login form
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  switch (this.auth_pattern) {
    case 'email':
      const email = loginForm.email.value;
      const password = loginForm.password.value;
    
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log('logged in', userCredential);
        loginForm.reset();
      } catch (error) {
        loginForm.querySelector('.error').textContent = error.message;
      }
      break;
    
    case 'google':
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
      
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      break;
  
    default:
      break;
  }


});

function loginWithEmail () {
  this.auth_pattern = 'email';
}

// login w/ Google form
function loginWithGoogle () {
  this.auth_pattern = 'google';
}

// sign out
signOut.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => console.log('signed out'));
});

// auth listener
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    authWrapper.classList.remove('open');
    authModals.forEach(modal => modal.classList.remove('active'));
  } else {
    authWrapper.classList.add('open');
    authModals[0].classList.add('active');
  }
});
