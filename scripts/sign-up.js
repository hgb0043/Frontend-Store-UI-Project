const eye = document.querySelector('.js-eye');
const eye2 = document.querySelector('.js-eye2');
const firstNameBox = document.querySelector('.js-first-name-container');
const lastNameBox = document.querySelector('.js-last-name-container');
const emailAddressBox = document.querySelector('.js-email-container');
const passwordBox = document.querySelector('.js-password-box');
const reEnterPasswordBox = document.querySelector('.js-re-enter-password-box');
const signUpButton = document.querySelector('.js-sign-up-button');
const signUpLink = document.querySelector('.sign-up-link');

firstNameBox.value = localStorage.getItem('correct-first-name') || '';
lastNameBox.value = localStorage.getItem('correct-last-name') || '';
emailAddressBox.value = localStorage.getItem('correct-email-address') || '';
passwordBox.value = localStorage.getItem('inputPassword') || '';


let correctFirstName;
let correctLastName;
let correctEmailAddress;
let inputReEnterPassword;
let inputPassword;
let correctPassword;

/* Control visibility of "password" field via its adjacent eye icon */
eye.addEventListener('click', () => {
  if (passwordBox.type === "password") {
  passwordBox.type = "text";
  } else if (passwordBox.type === "text") {
    passwordBox.type = "password";
  } 
});

/* Control visibility of "re-enter password" field via its adjacent eye icon */
eye2.addEventListener('click', () => {
  if(reEnterPasswordBox.type === "password") {
    reEnterPasswordBox.type = "text";
  } else if (reEnterPasswordBox.type === "text") {
    reEnterPasswordBox.type = "password";
  }
})

signUpButton.addEventListener('click', () => {
  
  // Generate variables for the value of each input field.
  correctFirstName = firstNameBox.value;
  correctLastName = lastNameBox.value;
  correctEmailAddress = emailAddressBox.value;
  inputPassword = passwordBox.value;
  inputReEnterPassword = reEnterPasswordBox.value;

  /* Create array containing all input field values to simplify later code */
  const fields = [
  correctFirstName,
  correctLastName,
  inputReEnterPassword,
  inputPassword,
]

  // Check for errors in input field values 
  if(fields.some(value => !value )) {
      alert('Please fill in all forms');
    } else {
      if(inputPassword === inputReEnterPassword) {
    correctPassword = inputPassword;
    localStorage.setItem('correct-password', inputPassword);
    signUpLink.href = "home.html";
    console.log('Passwords Match');
  } else if (inputPassword !== inputReEnterPassword){
    document.querySelector('.js-error-message')
      .innerHTML = 'Passwords do not match. Try again.'
    reEnterPasswordBox.value = '';

    console.log('Passwords do not match');
  }
}

  // Store data in localStorage for future use 
  localStorage.setItem('correct-first-name', correctFirstName);
  localStorage.setItem('correct-last-name', correctLastName);
  localStorage.setItem('correct-email-address', correctEmailAddress);
  localStorage.setItem('correct-password', correctPassword);

  console.log(`Correct first name: ${correctFirstName}`);
  console.log(`Correct last name: ${correctLastName}`);
  console.log(`Correct email address: ${correctEmailAddress}`);
  console.log(`Correct password: ${correctPassword}`);
});