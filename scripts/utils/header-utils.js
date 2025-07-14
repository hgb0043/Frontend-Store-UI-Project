// Header Section 

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
}

function generateHeaderAccountMessage() {
  const firstName = localStorage.getItem('first-name');
  const loginStatus = localStorage.getItem('login-status') || '';
  const accountMessage = document.querySelector('.account-message');

  accountMessage.innerHTML = displayHeaderLoginStatus(loginStatus, firstName);
}

// Control whether header displays welcome message or log in/sign up buttons.
function displayHeaderLoginStatus(status, firstName) { 
  if (status === 'logged-in') {
    return `<p class="welcome-message">Welcome back, ${firstName}</p>`;
  } else {
    return '<a href="/code/base-code/login.html" class="permanent-header-link">Log in</a> <a href="/code/base-code/ssignup.html" class="permanent-header-link">Sign up</a>'; 
  }
}

function activateHeaderArrowListeners(header, dropHeader, upArrow, downArrow) {

  upArrow.addEventListener('click', () => {
    header.style.height = '50px';
    dropHeader.style.height = '0';
    dropHeader.classList.add('hidden');

    upArrow.classList.add('hidden');
    downArrow.classList.remove('hidden');
  });

  downArrow.addEventListener('click', () => {
    header.style.height = '90px';
    dropHeader.style.height = '40px';
    dropHeader.classList.remove('hidden');

    downArrow.classList.add('hidden');
    upArrow.classList.remove('hidden');    
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