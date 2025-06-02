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

// Make drop-header retract if window is big enough to display header links in main header 
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
});



const healthProductsContainer = document.getElementById('js-health-products-container');
const clothingProductsContainer = document.getElementById('js-clothing-products-container');

// Health products data from products.json
const healthProductsArray = [ 
  {
    "id": 1,
    "name": "Smart Feelings Co. Biodegradable Dental Flossers 100 Count 2 Packs",
    "price": 9.99,
    "path": "/images/product-images/product1.jpg",
    "rating": 4.5
  },

  {
    "id": 2,
    "name": "Waterdrop Tabletop Glass Water Filter Filters Heavy Metals and other Chemicals",
    "price": 49.99,
    "path": "/images/product-images/product2.jpg",
    "rating":4.5
  },

  {
    "id": 3,
    "name": "24oz Stainless Steel Water Bottle Non-insulated",
    "price": 14.99,
    "path": "/images/product-images/product3.jpg",
    "rating": 4.7
  }
];

// Clothing products data from products.json
const clothingProductsArray = [
  {
    "id": 4,
    "name": "Mens Casual Shorts 7inch Inseam",
    "price": 23.99,
    "path": "/images/product-images/product4.jpg",
    "rating": 4.4
  },

  {
    "id": 5,
    "name": "Falari 4-Pack 100% Cotton Men's Boxers",
    "price": 17.99,
    "path": "/images/product-images/product5.jpg",
    "rating": 4.3
  
  },

  {
    "id": 6,
    "name": "Monxiery 5 Pairs 100% Cotton Athletic Crew Socks",
    "price": 14.99,
    "path": "/images/product-images/product6.jpg",
    "rating": 4.2
  }
];

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
  console.log(`product: ${product.id} rounded rating: ${roundedProductRating}`);

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

// Reusable function to generate HTML for each product.
function generateHTML(product) {
  return ` 
    <div class="item-container"> 
      <img class="product-img" src="${product.path}" alt="${product.name}" /> 
      <a href="/code/product-code/home-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${displayTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `;
}

// Generate code for"Our Top Health Picks Section"
let html = healthProductsArray.map(generateHTML).join('');
healthProductsContainer.innerHTML = html;

// Generate code for "Shop Polyester-free Clothing Section"
html = clothingProductsArray.map(generateHTML).join('');
clothingProductsContainer.innerHTML = html;

console.log(localStorage.getItem('turtle-rating18'));