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
  "id": 46,
  "page": "Office & School",
  "name": "Swingline Metal Silver-Colored 30 Sheet Office Stapler",
  "price": 19.99,
  "path": "/images/product-images/product46.jpg",
  "rating": 4.6,
  "brand": "Swingline",
  "num-ratings": 27,
  "num-reviews": 0,
  "category": "Office & School",
  "sub-category": "Staplers",
  "amnt-available": 39,
  "material": "Metal",
  "color": "Silver",
  "description": "Staple up to 30 sheets effortlessly with the Swingline Metal Silver-Colored Office Stapler. Durable and reliable, it’s perfect for both home and office use."
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

main.innerHTML = generateProductHTML(product);