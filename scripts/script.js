const firstName = localStorage.getItem('first-name');

const loginStatus = localStorage.getItem('login-status') || '';
const accountMessage = document.querySelector('.account-message');
const downArrow = document.querySelector('.js-down-arrow');
const upArrow = document.querySelector('.js-up-arrow');
const dropHeader = document.querySelector('.js-drop-header');
const header = document.querySelector('header');

const menuIcon = document.querySelector('.js-bars');
const healthPicksHeaderElement = document.getElementById('js-health-sub-header-container');
const healthPicksElement = document.getElementById('js-health-products-container');

/* Control whether header displays welcome message or log in/sign up buttons. */
if (loginStatus === 'logged-in') {
  document.querySelector('.account-message').innerHTML = `<p class="welcome-message">Welcome back, ${firstName}</p>`
} else {
  document.querySelector('.account-message').innerHTML = '<a href="login.html" class="permanent-header-link">Log in</a> <a href="signup.html" class="permanent-header-link">Sign up</a></p>' 
}

// Make drop-header funtional
downArrow.addEventListener('click', () => {
  header.style.height = '90px';
  dropHeader.style.height = '40px';
  dropHeader.classList.remove('hidden');
  downArrow.classList.add('hidden');
  upArrow.classList.remove('hidden');
})

upArrow.addEventListener('click', () => {
  header.style.height = '50px';
  dropHeader.style.height = '0';
  dropHeader.classList.add('hidden');
  downArrow.classList.remove('hidden');
  upArrow.classList.add('hidden');
})

/* Make drop-header retract if window is big enough to display header links in main header */ 
window.addEventListener('resize', () => {
  if (window.innerWidth > 1200) {
    header.style.height = '50px';
    dropHeader.style.height = '0';

    downArrow.classList.add('hidden');
    upArrow.classList.add('hidden');
  } else if (window.innerWidth <= 1200) {
    header.style.height = '50px';
    dropHeader.style.height = '0';

    downArrow.classList.remove('hidden');
  }
})

const healthProductsContainer = document.getElementById('js-health-products-container');
const clothingProductsContainer = document.getElementById('js-clothing-products-container');

// Data from products.json
const healthProducts = [ 
  {
    "id": 1,
    "name": "Smart Feelings Co. Biodegradable Dental Flossers 100 Count 2 Packs",
    "price": 9.99,
    "path": "../images/product-1.jpg",
    "rating": 4.5
  },

  {
    "id": 2,
    "name": "Waterdrop Tabletop Glass Water Filter Filters Heavy Metals and other Chemicals",
    "price": 49.99,
    "path": "../images/product-2.jpg",
    "rating":4.5
  },

  {
    "id": 3,
    "name": "24oz Stainless Steel Water Bottle Non-insulated",
    "price": 14.99,
    "path": "../images/product-3.jpg",
    "rating": 4.7
  }
];

// Data from products.json
const clothingProducts = [
  {
    "id": 4,
    "name": "Mens Casual Shorts 7inch Inseam",
    "price": 23.99,
    "path": "../images/product-2.jpg",
    "rating": 4.4
  },

  {
    "id": 5,
    "name": "Falari 4-Pack 100% Cotton Men's Boxers",
    "price": 17.99,
    "path": "../images/product-images/product-5.jpg",
    "rating": 4.3
  
  },

  {
    "id": 6,
    "name": "Monxiery 5 Pairs 100% Cotton Athletic Crew Socks",
    "price": 14.99,
    "path": "../images/product-images/product-6.jpg",
    "rating": 4.2
  }
];

// Get the star rating for each product
healthProducts.forEach(product => {

// Gather first value after decimal point of rating  
function determineFirstDecimalDigit(num) {
  return Math.floor((num * 10) % 10);
}
const ratingFirstDigit = determineFirstDecimalDigit(product.rating);
let roundedProductRating;

// Round product.rating to the nearest 0.5
if (ratingFirstDigit < 3) {
  roundedProductRating = Math.floor(product.rating);
} else if (ratingFirstDigit > 2 && ratingFirstDigit < 8) {
  roundedProductRating = Math.floor(product.rating) + 0.5;
} else if (ratingFirstDigit > 7) {
  roundedProductRating = Math.ceil(product.rating);
};
console.log(`product: ${product.id} rounded rating: ${roundedProductRating}`);

// Store the turtle icons generated in a variable
const generateTurtles = () => {
  let turtles = '';
  for(let i = 1; i <= Math.floor(roundedProductRating); i++) {
    turtles += `<img class="turtle-icon" src="/images/turtle-icon.png" alt="Turtle rating icon"></img>`;
  }
  if((roundedProductRating % 1) === 0.5) {
    turtles += `<img class="turtle-icon" id="halved-turtle-icon" src="/images/halved-turtle-icon.png" alt="Halved turtle rating icon"></img>`
  }

  /* Store unique visual turtle rating for each product in localStorage */

  localStorage.setItem(`turtle-rating${product.id}`, turtles);

  return turtles;
}

// Generate products in "Our Top Health Picks" section
  healthProductsContainer.innerHTML += `
    <div class="item-container"> 
      <img class="product-img" src="/images/product-images/product${product.id}.jpg"> 
      <a href="product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${generateTurtles()}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `
})

  clothingProducts.forEach(product => {
// Gather first value after decimal point of rating  
function determineFirstDecimalDigit(num) {
  return Math.floor((num * 10) % 10);
}
const ratingFirstDigit = determineFirstDecimalDigit(product.rating);
let roundedProductRating;

// Round product.rating to the nearest 0.5
if (ratingFirstDigit < 3) {
  roundedProductRating = Math.floor(product.rating);
} else if (ratingFirstDigit > 2 && ratingFirstDigit < 8) {
  roundedProductRating = Math.floor(product.rating) + 0.5;
} else if (ratingFirstDigit > 7) {
  roundedProductRating = Math.ceil(product.rating);
};
console.log(`product: ${product.id} rounded rating: ${roundedProductRating}`);

// Store the turtle icons generated in a variable
const generateTurtles = () => {
  let turtles = '';
  for(let i = 1; i <= Math.floor(roundedProductRating); i++) {
    turtles += `<img class="turtle-icon" src="/images/turtle-icon.png" alt="Turtle rating icon"></img>`;
  }
  if((roundedProductRating % 1) === 0.5) {
    turtles += `<img class="turtle-icon" id="halved-turtle-icon" src="/images/halved-turtle-icon.png" alt="Halved turtle rating icon"></img>`
  }

  localStorage.setItem(`turtle-rating${product.id}`, turtles);

  return turtles;
};

/* Generate products in "Shop Polyester-free Clothing" section */
  clothingProductsContainer.innerHTML += `
    <div class="item-container"> 
      <img class="product-img" src="/images/product-images/product${product.id}.jpg">
      <a href="product-code/product${product.id}.html" class="product-name">${product.name}</a>
      <div class="turtle-container">${generateTurtles()}</div>
      <p class="product-price">$${product.price}</p>
      </div>
    ` 
});