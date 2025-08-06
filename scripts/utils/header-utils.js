import { createCartProductData, calculateCartQuantity } from '/scripts/utils/cart-utils.js'

export function initializeHeader() {
  generateHeaderAccountMessage();

  const header = document.querySelector('header');
  const dropHeader = document.querySelector('.js-drop-header');
  const downArrow = document.querySelector('.js-down-arrow');
  const upArrow = document.querySelector('.js-up-arrow');
  
  activateHeaderArrowListeners(header, dropHeader, upArrow, downArrow);
  updateHeaderState(header, dropHeader, upArrow, downArrow);
  window.addEventListener('resize', () => {
    updateHeaderState(header, dropHeader, upArrow, downArrow);
  });

  const cartProductData = createCartProductData();
  const cartQuantity = calculateCartQuantity(cartProductData);
  manageBadgeUI(cartQuantity);
}

function generateHeaderAccountMessage() {
  const firstName = localStorage.getItem('first-name');
  const loginStatus = localStorage.getItem('login-status') || '';
  const accountMessage = document.querySelector('.js-account-message');

  accountMessage.innerHTML = displayHeaderLoginStatus(loginStatus, firstName);
}

// Control whether header displays welcome message or log in/sign up buttons.
function displayHeaderLoginStatus(status, firstName) { 
  if (status === 'logged-in') {
    return `<p class="welcome-message">Welcome back, ${firstName}</p>`;
  } else {
    return `
    <a href="/code/login.html" class="account-header-link js-account-header-link text-link" id="log-in">Log in</a> 
    <a href="/code/signup.html" class="account-header-link js-account-header-link text-link">Sign up</a>
    `; 
  }
}

function activateHeaderArrowListeners(header, dropHeader, upArrow, downArrow) {
  const accountHeaderLinks = document.querySelectorAll('.js-account-header-link');
  console.log(accountHeaderLinks);

  upArrow.addEventListener('click', () => {
    header.style.height = '50px';
    dropHeader.style.height = '0';
    dropHeader.classList.add('hidden');

    upArrow.classList.add('hidden');
    downArrow.classList.remove('hidden');

    // Hide log-in/sign-up messages for styling purposes
    accountHeaderLinks.forEach((el) => {
      el.classList.remove('hidden');
    });
  });

  downArrow.addEventListener('click', () => {
    header.style.height = '90px';
    dropHeader.style.height = '40px';
    dropHeader.classList.remove('hidden');

    downArrow.classList.add('hidden');
    upArrow.classList.remove('hidden');    

    accountHeaderLinks.forEach((el) => {
      el.classList.add('hidden');
    });
  });
}

// Manages drop-header and up/down arrow visibility based on resolution size
function updateHeaderState(header, dropHeader, upArrow, downArrow) {
  header.style.height = '50px';
  dropHeader.classList.add('hidden'); 

  const isWideScreen = window.innerWidth > 1200;
  if (isWideScreen) {
    upArrow.classList.add('hidden');
    downArrow.classList.add('hidden');
  } else {
    downArrow.classList.remove('hidden');
  }
}

// Display badge if cartSize > 0 upon load
export function manageBadgeUI(cartQty) {
  const badge = document.querySelector('.js-badge');
  const badgeQuantity = document.querySelector('.js-badge-quantity');
  if (cartQty > 0) {
    badge.classList.remove('hidden');
    badgeQuantity.classList.remove('hidden');
    badgeQuantity.innerHTML = cartQty;
  } else if (cartQty === 0) {
    badge.classList.add('hidden');
    badgeQuantity.classList.remove('hidden');
  }
}