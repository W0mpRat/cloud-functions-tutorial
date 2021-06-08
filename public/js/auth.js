const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');

function init() {
  const auth = firebase.auth();
  auth.useEmulator("http://localhost:9099");
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

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
    console.log('logged in', userCredential);
    loginForm.reset();
  } catch (error) {
    loginForm.querySelector('.error').textContent = error.message;
  }
});

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
