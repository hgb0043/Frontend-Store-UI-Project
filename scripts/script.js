/* Signup information created by the user (from sign-up.js) */
const correctEmailAddress = localStorage.getItem('email-address');
const correctPassword = localStorage.getItem('password');

const eye = document.querySelector('.js-eye');
const passwordBox = document.querySelector('.js-password-box');
const logInButton = document.querySelector('.js-log-in-button');
const logInLink = document.querySelector('.js-log-in-link')
const errorMessage = document.querySelector('.js-error-message');
let email;
let password;

/* Controls visibility of password through the eye icon*/
eye.addEventListener('click', () => {
  if (passwordBox.type === "password") {
  passwordBox.type = "text";
  } else if (passwordBox.type ==="text") {
    passwordBox.type = "password";
  } 
});

logInButton.addEventListener('click', () => {

  // Store user attempted login information
  inputEmailAddress = document.querySelector('.js-email-box').value; 
  inputPassword = document.querySelector('.js-password-box').value;

  if (inputEmailAddress === correctEmailAddress && inputPassword === correctPassword) {
    document.querySelector('.js-log-in-link').href = 'home.html';
    localStorage.setItem('login-status', 'logged-in');
  } else if (inputEmailAddress === correctEmailAddress && inputPassword !== correctPassword) {
    errorMessage.innerHTML = 'Password is incorrect. Please try again.';
    console.log('Password entered is incorrect. Please try again.');
  } else {
    errorMessage.innerHTML = 'Email address not recognized. Please try again.';
    console.log('Email address not recognized. Please try again.')
  }
});