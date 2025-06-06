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
  document.querySelector('.account-message').innerHTML = `<p class="welcome-message">Welcome back, ${firstName}</p>`
} else {
  document.querySelector('.account-message').innerHTML = '<a href="/code/base-code/login.html" class="permanent-header-link">Log in</a> <a href="/code/base-code/signup.html" class="permanent-header-link">Sign up</a></p>' 
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

// Manages drop=header and up/down arrow visibility based on resolution size
function updateHeaderState() {
  const isWideScreen = window.innerWidth > 1200;

  header.style.height = '50px';
  dropHeader.style.height = '0';

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
   "id": 11,
    "page": "Health & Beauty",
    "name": "Ethique Deep Clean Solid Face Cleanser for Oily to Balanced Skin Deep Green",
    "price": 19.99,
    "path": "/images/product-images/product11.jpg",
    "rating": 4.8,
    "brand": "Ethique",
    "num-ratings": 41,
    "num-reviews": 4,
    "category": "Health & Beauty",
    "sub-category": "Face Wash/Cleanser",
    "amnt-available": 5,
    "material": "See brand website for ingredients",
    "color": "Green",
    "description": "Refresh your skin with the Ethique Deep Clean Solid Face Cleanser. Ideal for oily to balanced skin, this deep green bar gently lifts away excess oil and impurities using natural ingredients — all without plastic packaging."
  };
  
const main = document.querySelector('main');

// Get the turtle rating display from product.rating
import { roundTurtleRating } from "/scripts/base-scripts/utils.js";
const roundedTurtleRating = roundTurtleRating(product.rating);
const turtleRating = localStorage.getItem(`${roundedTurtleRating}star-turtle-rating`);

// Generate product HTML content
function generateProductHTML(product) {
  return `
  <div class="product-main-container">
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

      <div class="user-prompts-container">
        <button class="add-to-cart-button">Add to Cart</button>
        <button class="buy-now-button">Buy Now</button>
      </div>
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

// Product reviews from reviews.JSON
const review1 = {
  "id": 35,
  "product": 11,
  "name": "The Incredible Hulk",
  "rating": 5,
  "review": "Finally, one that keeps my face the right color!"
};

const review2 = {
  "id": 36,
  "product": 11,
  "name": "Danny DeVito",
  "rating": 5,
  "review": "I don’t usually wash my face with anything I can’t eat, but this thing? It’s a little soap brick of joy. No plastic, no nonsense. Smells like Mother Nature punched me in the pores."
};

const review3 = {
  "id": 37,
  "product": 11,
  "name": "Marie Kondo",
  "rating": 4,
  "review": "It sparked joy, and also removed three years of emotional clutter from my T-zone. Lost a star because the bar slipped into the drain once and I mourned it like a pet."
};

const review4 = {
  "id": 38,
  "product": 11,
  "name": "Batman",
  "rating": 2,
  "review": "Too bright. Too clean. Justice is supposed to be gritty. But Alfred likes it, so I keep it in the Batcave guest bathroom."
};


const reviewArray = [review1, review2, review3, review4];

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
console.log(html);

// Display all the generated HTML
main.innerHTML = html;