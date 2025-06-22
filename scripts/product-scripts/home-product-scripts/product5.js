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
  "id": 5,
  "page": "Home",
  "name": "Falari 4-Pack 100% Cotton Men's Boxers",
  "price": 17.99,
  "path": "/images/product-images/product5.jpg",
  "rating": 4.3,
  "brand": "Falari",
  "num-ratings": 55,
  "num-reviews": 5,
  "category": "Clothing",
  "sub-category": "Men's Boxers",
  "amnt-available": 18,
  "material": "100% Cotton",
  "color": "Varies",
  "description": "Enjoy all-day comfort with this 4-pack of Falari men’s boxers made from 100% breathable cotton. Designed for a soft feel and a comfortable fit, these boxers provide essential support and durability for everyday wear."
};

const main = document.querySelector('main');

// Get the turtle rating display from product.rating
import { roundTurtleRating, createCartProductData } from "/scripts/base-scripts/utils.js";
const roundedTurtleRating = roundTurtleRating(product.rating);
const turtleRating = localStorage.getItem(`${roundedTurtleRating}star-turtle-rating`);

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
          <span class="divider">|</span><span class="reviews-count js-reviews-count">${product["num-reviews"]} reviews</span>
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

let html = generateProductHTML(product);

// Reviews data from reviews.json 
const review1 = {
    "name": "John Cena",
    "rating": 5,
    "review": "Never seen but always delivers. Just like me!"
  };

const review2 = {
    "name": "Arnold Schwarzaneggar",
    "rating": 5,
    "review": "Nice and snug, like my grip."
  };

const review3 =  {
    "name": "Harry Potter",
    "rating": 5,
    "review": "It feels good to know I'm protected in case Malfoy has any tricks up his sleeve."
  };

const review4 = {
    "name": "Rocky Balboa",
    "rating": 3,
    "review": "Yo Adrian, why do they call 'em boxers if they ain't got nothin' to do with boxin?"
  };

const review5 = {
  "id": "22",
  "product": 5,
  "name": "Mark Zuckerberg",
  "rating": 4,
  "review": "Ordering 4 units of 100% human clothing. Type: unknown; style: trousers (match confidence: 84%)."
};

const reviewArray = [review1, review2, review3, review4, review5];
  
function generateReviewHTML(review) {
  return `
   <div class="review-container">

      <div class="reviewer-description">

        <div class="reviewer-profile">
          <i class="fa-solid fa-circle-user"></i>
          <p class="reviewer-name">${review.name}</p>
        </div>

        <div class="turtle-rating-container reviewer-rating">
        ${localStorage.getItem(`${review.rating}star-turtle-rating`)}</div>

      <p class="review-text">
        ${review.review}
      </p>
      
    </div>
  </div>
  `
}

// Generate reviews HTML content 
html += reviewArray.map(generateReviewHTML).join('');

// Display all the generated HTML
main.innerHTML = html;

// Scroll to review section when reviews text clicked
const reviewTriggerElement = document.querySelector('.js-reviews-count');
const reviewTitleElement = document.querySelector('h4');
reviewTriggerElement.addEventListener('click', () => {
  reviewTitleElement.scrollIntoView({behavior: 'smooth'});
});


// Shopping Section 


// Establish cartProductData and assign it a value if one is found
const cartProductData = createCartProductData()
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
  addedMessage.innerHTML = "Item added to cart. <a class='added-message-link js-added-message-link' href='/code/base-code/cart.html'>See Cart</a></p>"; 

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
  addedMessage.innerHTML = "<a class='added-message-link js-added-message-link' href='/code/base-code/cart.html'>See Cart</a></p>";
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