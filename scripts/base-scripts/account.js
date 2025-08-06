import { initializeHeader } from '/scripts/utils/header-utils.js';

// Run header logic when page first loads or is refreshed
initializeHeader();

function initializeAccountPage() {
  const html = document.querySelector('main');
  const loginStatus = localStorage.getItem('login-status') || '';
  if (loginStatus === 'logged-in') {
    html.innerHTML = `
    <div class="header"
      <i class="fa-solid fa-user"></i>
    `
  } else {
    html.innerHTML = `
    <img src="/images/base-images/confused-turtle.png" class="confused-turtle-img" alt="confused-turtle">
    <p class="logged-out-message">It looks like you're currently logged out. To see your account details, please <a href="/code/login.html" class="text-link">log in</a> or<br> 
    <a href="/code/signup.html" class="text-link">sign up</a>. If you wish to continue as a guest, <a href="/index.html" class="text-link"> click here </a> to continue shopping.
    `
  }
}
initializeAccountPage();