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
    return '<a href="login.html" class="permanent-header-link">Log in</a> <a href="signup.html" class="permanent-header-link">Sign up</a>'; 
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


// Rating Section


// Generate turtle ratings for each product
export function generateProductTurtleRating(product) {
  const roundedProductRating = roundProductRating(product.rating);
  const turtles = storePotentialTurtleIcons(roundedProductRating);

  return storeProductTurtleIcons(product.id, turtles);
}

// Get first digit after decimal point 
function determineFirstDecimalDigit(num) {
  return Math.floor((num * 10) % 10);
}

// Round product rating to the nearest 0.5
function roundProductRating(productRating) {
  const digit = determineFirstDecimalDigit(productRating);
  if (digit < 3) {
    return Math.floor(productRating);
  } else if (digit > 2 && digit < 8) {
    return Math.floor(productRating) + 0.5;
  } else if (digit > 7) {
    return Math.ceil(productRating);
  }
}

function storePotentialTurtleIcons(rating) {
  let turtles = '';
  for(let i = 1; i <= Math.floor(rating); i++) {
    turtles += `<img class="turtle-icon" src="/images/base-images/turtle-icon.png" alt="Turtle rating icon" />`;
  }
  if((rating % 1) === 0.5) {
    turtles += `<img class="turtle-icon" id="halved-turtle-icon" src="/images/base-images/halved-turtle-icon.png" alt="Halved turtle rating icon" />`;
  }
  return turtles;
}

// Store unique visual turtle rating for each product in localStorage
function storeProductTurtleIcons(productId, turtles) {
  localStorage.setItem(`turtle-rating${productId}`, JSON.stringify(turtles));
  return turtles;
}


// Cart/Checkout 


// Calculate cart quantity variable
export function calculateCartQuantity(data) {
  return data.reduce((total, product) => {
    const quantity = Number(localStorage.getItem(`product-quantity${product.id}`)) || 1;
    return total + quantity;
  }, 0);    

}


// Calculate subtotal variable
export function calculateSubtotal(data) {
  return data.reduce((total, product) => {
    const productCount = Number(localStorage.getItem(`product-quantity${product.id}`)) || 1;
    const price = Math.round(product.price * 100 * productCount);
    return total + price; 
  }, 0);
}

// Switch between trash can and minus-sign icon depending on item quantity
export function switchDecreaseIcon(product) {
  const decreaseProductElement = document.querySelector(`.js-decrease-product-icon${product.id}`); 
  if(!decreaseProductElement) return;

  const raw = localStorage.getItem(`product-quantity${product.id}`);
  const quantity = Number(raw || '1');
  if (quantity > 1) {
    decreaseProductElement.classList.add('fa-minus');
    decreaseProductElement.classList.remove('fa-trash');
  } else {
    decreaseProductElement.classList.add('fa-trash');
    decreaseProductElement.classList.remove('fa-minus'); 
  }
}

export function createCartProductData() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem('cart-product-data')) || [];
  } catch(e) {
    data = [];
  }
  return data;
}