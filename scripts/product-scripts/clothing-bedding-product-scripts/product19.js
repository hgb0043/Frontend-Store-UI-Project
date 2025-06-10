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
  accountMessage.innerHTML = `<p class="welcome-message">Welcome back, ${firstName}</p>`
} else {
  accountMessage.innerHTML = '<a href="/code/base-code/login.html" class="permanent-header-link">Log in</a> <a href="/code/base-code/signup.html" class="permanent-header-link">Sign up</a></p>' 
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


// Product data from products.json
const product = {
  "id": 19,
  "page": "Clothing & Bedding",
  "name": "Amy Coulee 100% Cotton Men's Athletic Shorts Elastic Waist Navy Color",
  "price": 24.99,
  "path": "/images/product-images/product19.jpg",
  "rating": 4.5,
  "brand": "Amy Coulee",
  "num-ratings": 12,
  "num-reviews": 0,
  "category": "Clothing & Bedding",
  "sub-category": "Men's Shorts",
  "amnt-available": 21,
  "material": "100% Cotton",
  "color": "Navy Blue",
  "description": "Stay cool and move freely with the Amy Coulee 100% Cotton Men's Athletic Shorts. Crafted for comfort and breathability, these soft navy shorts are perfect for workouts, lounging, or everyday wear. With a secure elastic waistband and mid-thigh fit, they deliver both ease and style—wherever your day takes you."
};

const main = document.querySelector('main');

// Get the turtle rating display from product.rating
import { roundTurtleRating } from "/scripts/base-scripts/utils.js";
const roundedTurtleRating = roundTurtleRating(product.rating);
console.log(roundedTurtleRating);
const turtleRating = localStorage.getItem(`${roundedTurtleRating}star-turtle-rating`);
console.log(turtleRating);

// Generate product HTML content
function generateProductHTML(product) {
  return `<div class="product-main-container">
    <img class="product-img" src="/images/product-images/product${product.id}.jpg" alt ="product${product.id}" />

    <div class="product-description-container">
      <h1 class="product-name">${product.name}</h1>

      <p class="price">$${product.price}</p>

      <div class="rating-section">
        <p class="rating-num">${product.rating}</p>
        
        <div class="turtle-rating-container">${turtleRating}</div>
        <p class="ratings-count">${product["num-ratings"]} ratings</p>
          <span class="divider">|</span><a class="reviews-count">${product["num-reviews"]} reviews</a>
      </div>

      <div class="user-prompts-container js-user-prompts-container">
        <button class="add-to-cart-button js-add-to-cart-button">Add to Cart</button>
        <button class="buy-now-button js-buy-now-button">Buy Now</button>
      </div>
      <p class="added-message js-added-message"></p>
    </div>
  </div>

  <div class="product-info-container">
    <div class="description-container">
      <h2>Description</h2>
      <p class="description">${product.description}</p>
    </div>
    <div class="product-details-container">
      <h3>Product Details</h3>
      <ul class="details-list">
        <li><strong>Brand:</strong> ${product.brand}</li>
        <li><strong>Category:</strong> ${product.category}</li>
        <li><strong>Sub-category</strong> ${product["sub-category"]}</li>
        <li><strong>Material:</strong> ${product.material}</li>
        <li><strong>Color:</strong> ${product.color}</li>
      </ul>
    </div>
  </div>

  <div class="review-title-container">
    <h4>Reviews</h4>
  </div>
  `;
}

main.innerHTML = generateProductHTML(product);

// Shopping Section 


// Establish cartProductData and assign it a value if one is found
let cartProductData = JSON.parse(localStorage.getItem('cart-product-data')) || [];
let cartQuantity = cartProductData.length || 0;
const badge = document.querySelector('.js-badge');
const badgeQuantity = document.querySelector('.js-badge-quantity');
const addToCartButton = document.querySelector('.js-add-to-cart-button');
const buyNowButton = document.querySelector('.js-buy-now-button');
const addedMessage = document.querySelector('.js-added-message');
const userPromptsContainer = document.querySelector('.js-user-prompts-container');


function displayAdded() {

  // Create added Statement
  addToCartButton.innerHTML = 'Added <i class="fa-solid fa-check"></i>';
  addToCartButton.classList.add('display-added-now');
  addedMessage.innerHTML = "Item added to cart. <a class='added-message-link js-added-message-link' href='/code/base-code/checkout.html'>See Cart</a></p>"; 

  // Center 'Added' statement
  buyNowButton.remove();
}

// Display badge if cartSize > 0 upon load
if (cartQuantity > 0) {
  badge.classList.remove('hidden');
  badgeQuantity.classList.remove('hidden');
  badgeQuantity.innerHTML = cartQuantity;
}

// Display 'Added' and 'addedMessage' if product already added to cart
if (cartProductData.some(p => p.id === product.id)) {
  displayAdded();
  addToCartButton.classList.add('display-added-later');
  addToCartButton.classList.remove('display-added-now');
  addToCartButton.innerHTML = 'Item previously added <i class="fa-solid fa-check"></i>';
  addedMessage.innerHTML = "<a class='added-message-link js-added-message-link' href='/code/base-code/checkout.html'>See Cart</a></p>";
}

// Run when 'Add to Cart' button is clicked
addToCartButton.addEventListener('click', () => {

  // Display checkmark and added message
  if (addToCartButton.innerHTML === 'Add to Cart') displayAdded();

  // If the product isn't already in cartProductData
  if (!cartProductData.some(p => p.id === product.id)) {
    cartProductData.push(product);
    (localStorage.setItem('cart-product-data', JSON.stringify(cartProductData)));
    cartQuantity++;
  } 

  
  // Display badge if cartQuantity isn't zero
  if (cartQuantity > 0) {
    badge.classList.remove('hidden');
    badgeQuantity.classList.remove('hidden');
    badgeQuantity.innerHTML = cartQuantity;
  }
  
}); 