import { eyeEventListener } from '/scripts/utils/auth-utils.js';

function runSignupLogic() {
  const eyeIcon = document.querySelector('.js-eye');
  const eyeIcon2 = document.querySelector('.js-eye2');
  const passwordBox = document.querySelector('.js-password-box');
  const reEnterPasswordBox = document.querySelector('.js-re-enter-password-box');
  eyeEventListener(eyeIcon, passwordBox);
  eyeEventListener(eyeIcon2, reEnterPasswordBox);

  const firstNameBox = document.querySelector('.js-first-name-container');
  const lastNameBox = document.querySelector('.js-last-name-container');
  const emailAddressBox = document.querySelector('.js-email-container');
  const signUpButton = document.querySelector('.js-sign-up-button');

  const boxes = {
    firstName: firstNameBox,
    lastName: lastNameBox,
    email: emailAddressBox,
    password: passwordBox,
    reEnterPassword: reEnterPasswordBox
  };

  signUpEventListener(signUpButton, boxes);

}
// Run when page first loads or is refreshed
runSignupLogic();

function signUpEventListener(button, boxes) {
  button.addEventListener('click', () => {
    // Generate inputs object
    const inputs = {
      firstName: boxes.firstName.value.trim(),
      lastName: boxes.lastName.value.trim(),
      email: boxes.email.value.trim(),
      password: boxes.password.value,
      reEnterPassword: boxes.reEnterPassword.value
    }
    const errorMessage = document.querySelector('.js-error-message')
    checkInputs(inputs, errorMessage, boxes);
  });
}

// Create array containing all input field values to simplify later code 
function checkInputs(inputs, message, boxes) {
  // Check for errors in input field values 
  if (Object.values(inputs).some(value => !value)) {
    message.innerHTML = 'Please fill in all forms';
  } else {
    if (inputs.password === inputs.reEnterPassword) {
      const validatedPassword = inputs.password;
      localStorage.setItem('validated-password', validatedPassword);
      window.location.href = 'login.html';
      storeUserInformation(inputs);
    } else {
      message.innerHTML = 'Passwords do not match. Try again.';
      boxes.reEnterPassword.value = '';
    }
  }
}

// Store data in localStorage for external use 
function storeUserInformation(inputs) {
  localStorage.setItem('first-name', inputs.firstName);
  localStorage.setItem('last-name', inputs.lastName);
  localStorage.setItem('email-address', inputs.email);
  localStorage.setItem('password', inputs.password);
}