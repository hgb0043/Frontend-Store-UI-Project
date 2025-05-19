const eye = document.querySelector('.js-eye');
const passwordBox = document.querySelector('.js-password-box');
const logInButton = document.querySelector('.js-log-in-button');
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
  email = document.querySelector('.js-email-box').value; 
  password = document.querySelector('.js-password-box').value;

  console.log(`Form ready to be submitted, ${email}, ${password}`);
});