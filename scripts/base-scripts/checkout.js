// Header Section

const firstName = localStorage.getItem('first-name');
const loginStatus = localStorage.getItem('login-status') || '';
const accountMessage = document.querySelector('.account-message');
const downArrow = document.querySelector('.js-down-arrow');
const upArrow = document.querySelector('.js-up-arrow');
const dropHeader = document.querySelector('.js-drop-header');
const header = document.querySelector('header');

// Control whether header displays welcome message or log in/sign up buttons.
if (loginStatus === 'logged-in') {
  accountMessage.innerHTML = `<p class="welcome-message">Welcome back, ${firstName}</p>`;
} else {
  accountMessage.innerHTML = '<a href="login.html" class="permanent-header-link">Log in</a> <a href="signup.html" class="permanent-header-link">Sign up</a>'; 
}

// Make drop-header funtional
downArrow.addEventListener('click', () => {
  header.style.height = '90px';
  dropHeader.style.height = '40px';
  dropHeader.classList.remove('hidden');
  downArrow.classList.add('hidden');
  upArrow.classList.remove('hidden');
});

upArrow.addEventListener('click', () => {
  header.style.height = '50px';
  dropHeader.style.height = '0';
  dropHeader.classList.add('hidden');
  downArrow.classList.remove('hidden');
  upArrow.classList.add('hidden');
});

// Manages drop-header and up/down arrow visibility based on resolution size
function updateHeaderState() {
  const isWideScreen = window.innerWidth > 1200;

  header.style.height = '50px';
  dropHeader.classList.add('hidden'); 

  if (isWideScreen) {
    downArrow.classList.add('hidden');
    upArrow.classList.add('hidden');
  } else {
    downArrow.classList.remove('hidden');
  }
}
updateHeaderState();
window.addEventListener('resize', updateHeaderState);


// Main Section 


// Gather first value after decimal point of rating (used in both main sections) 
function determineFirstDecimalDigit(num) {
  return Math.floor((num * 10) % 10);
}

function displayTurtleRating(product) {

  // Get the star rating for each product
  const ratingFirstDigit = determineFirstDecimalDigit(product.rating);
  let roundedProductRating;

  // Round product.rating to the nearest 0.5
  if (ratingFirstDigit < 3) {
    roundedProductRating = Math.floor(product.rating);
  } else if (ratingFirstDigit > 2 && ratingFirstDigit < 8) {
  roundedProductRating = Math.floor(product.rating) + 0.5;
  } else if (ratingFirstDigit > 7) {
  roundedProductRating = Math.ceil(product.rating);
  }

  // Store the turtle icons generated in a variable
  let turtles = '';
  for(let i = 1; i <= Math.floor(roundedProductRating); i++) {
    turtles += `<img class="turtle-icon" src="/images/base-images/turtle-icon.png" alt="Turtle rating icon" />`;
  }
  if((roundedProductRating % 1) === 0.5) {
    turtles += `<img class="turtle-icon" id="halved-turtle-icon" src="/images/base-images/halved-turtle-icon.png" alt="Halved turtle rating icon" />`;
  }

  // Store unique visual turtle rating for each product in localStorage
  localStorage.setItem(`turtle-rating${product.id}`, turtles);
  return turtles;
}


const cartProductData = createCartProductData()const productsContainer = document.querySelector('.js-products-container');
let html = '';

// Generate "Order Summary" section
function generateProducts(product) {
  return `
  <div class="item-container"> 
    <img class="product-img" src="${product.path}" alt="${product.name}" /> 
    <a href="/code/product-code/home-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
    <div class="turtle-container">${displayTurtleRating(product)}</div>
    <p class="product-price">$${product.price}</p>
    <div class="edit-item-container">
      <i class="fa-solid fa-trash decrease-product-icon js-decrease-product-icon${product.id}"></i>
      <span class="product-quantity js-product-quantity${product.id}">${localStorage.getItem(`product-quantity${product.id}`)}</span>
      <i class="fa-solid fa-plus increase-product-icon js-increase-product-icon${product.id}"></i>
    </div>
  </div>
  `;
}

cartProductData.forEach((product) => {
  html += generateProducts(product);
});

productsContainer.innerHTML = html;


const order = document.querySelector('.js-order-container');
const subtotal = localStorage.getItem('subtotal');
const cartQuantity = localStorage.getItem('cart-quantity'); 
const tax = (Number(subtotal) * 0.1).toFixed(2);
const total = (Number(subtotal) + Number(tax)).toFixed(2);

const orderSummaryTitle = document.querySelector('.js-order-summary-title');
if(cartQuantity > 0) {
  orderSummaryTitle.innerHTML = `Order Summary (${cartQuantity} items)`
}

const wordsSection = document.querySelector('.js-words-container');
const valuesSection = document.querySelector('.js-values-container');
function generateCheckout(data) {
  if (data.length > 0) {
    wordsSection.innerHTML =  `
    <span class="word">Subtotal:</span>
    <span class="word">Shipping & Handling:</span>
    <span class="word">Tax:</span>
    <span class="word">Total:</span>
    `

    valuesSection.innerHTML = `
    <span class="value">$${subtotal}</span>
    <span class="value">$0.00</span>
    <span class="value">$${tax}</span>
    <span class="value">$${total}</span>
    `
  } else {
    return;
  }
}
generateCheckout(cartProductData);

const placeOrderButton = document.querySelector('.js-place-order-button')
console.log(placeOrderButton);

placeOrderButton.addEventListener('click', () => {
  window.location.href = 'order-confirmation.html';
});