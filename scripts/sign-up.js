const eye = document.querySelector('.js-eye');
const passwordBox = document.querySelector('.js-password-box');

// Controls visibility of password through the eye icon
eye.addEventListener('click', () => {
  if (passwordBox.type === "password") {
  passwordBox.type = "text";
  } else if (passwordBox.type ==="text") {
    passwordBox.type = "password";
  } 
});