import { eyeEventListener } from '/scripts/utils/auth-utils.js';

function runLoginLogic() {
  const correctEmailAddress = localStorage.getItem('email-address');
  const correctPassword = localStorage.getItem('password');
  const logInButton = document.querySelector('.js-log-in-button');
  const errorMessage = document.querySelector('.js-error-message');
  loginEventListener(logInButton, correctEmailAddress, correctPassword, errorMessage);

  const eyeIcon = document.querySelector('.js-eye');
  const passwordBox = document.querySelector('.js-password-box');
  // Prevent error from missing HTML elements
  if (eyeIcon && passwordBox) {
    eyeEventListener(eyeIcon, passwordBox);
  }
}
// Run when page first loads or is refreshed
runLoginLogic()

function loginEventListener(button, correctEmail, correctPassword, message) {
  button.addEventListener('click', () => {
    // Get user attempted login information
    const inputEmail = document.querySelector('.js-email-box').value.trim(); 
    const inputPassword = document.querySelector('.js-password-box').value;

    if (inputEmail === correctEmail && inputPassword === correctPassword) {
      window.location.href = '/index.html';
      localStorage.setItem('login-status', 'logged-in');
      message.innerHTML = '';
    } else if (inputEmail === correctEmail && inputPassword !== correctPassword) {
      message.innerHTML = 'Password is incorrect. Please try again.';
    } else {
      message.innerHTML = 'Email address not recognized. Please try again.';
    }
  });
}