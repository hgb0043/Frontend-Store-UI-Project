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
    "id": 7,
    "page": "Health & Beauty",
    "name": "Sea Turtle LLC Bamboo Soft Bristled Toothbrushes (4 Pack)",
    "price": 8.99,
    "path": "/images/product-images/product7.jpg",
    "rating": 4.5,
    "brand": "Sea Turtle LLC",
    "num-ratings": 19,
    "num-reviews": 2,
    "category": "Health & Beauty",
    "sub-category": "Oral Health",
    "amnt-available": 25,
    "material": "100% Plant Based",
    "color": "Not Applicable",
    "description": "Keep your smile fresh and your impact low with this 100% plant-based toothbrush from Sea Turtle LLC. Made from biodegradable materials, it delivers a gentle, effective clean while helping reduce plastic waste. Perfect for eco-friendly daily care."
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
    "id": 28,
    "product": 7,
    "name": "Shrek",
    "rating": 2,
    "review": "Don't buy. Left my teeth too white."
  };

const review2 = {
  "id": 27,
  "product": 7,
  "name": "Keanu Reeves",
  "rating": 5,
  "review": "It’s simple. It’s clean. It’s kind. Brushing with bamboo is... breathtaking."
  };

const reviewArray = [review1, review2];

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