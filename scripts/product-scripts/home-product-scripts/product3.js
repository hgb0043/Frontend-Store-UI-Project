const firstName = localStorage.getItem('first-name');

const loginStatus = localStorage.getItem('login-status') || '';
const accountMessage = document.querySelector('.account-message');
const downArrow = document.querySelector('.js-down-arrow');
const upArrow = document.querySelector('.js-up-arrow');
const dropHeader = document.querySelector('.js-drop-header');
const header = document.querySelector('header');
 
 /* Control whether header displays welcome message or log in/sign up buttons. */
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


// Product data from products.json
const product = {
  "id": 3,
  "page": "Home",
  "name": "24z Stainless Steel Water Bottle Non-insulated",
  "price": 14.99,
  "path": "/images/product-images/product3.jpg",
  "rating": 4.7,
  "brand": "Bambaw",
  "num-ratings": 21,
  "num-reviews": 3,
  "category": "Food & Drink",
  "sub-category": "Reusable Water Bottles",
  "amnt-available": 22,
  "material": "Stainless Steel",
  "color": "Stainless Steel",
  "description": "Experience cleaner, safer water with the Waterdrop Glass Water Filter. Designed to effectively reduce heavy metals, chlorine, and other harmful chemicals, this sleek glass filter provides fresh-tasting water straight from your tap. Easy to use and eco-friendly, it’s the perfect addition to your kitchen for healthier hydration every day."
};

const main = document.querySelector('main');
const turtleRating = localStorage.getItem(`turtle-rating${product.id}`);

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

const review1 = {
    "id": 7,
    "product": 3,
    "name": "Roy Scheider",
    "rating": 3,
    "review": "We're gonna need a bigger bottle." 
  };

const review2 = {
    "id": 8,
    "product": 3,
    "name": "Timothee Chalamet",
    "rating": 5,
    "review": "If it can survive the dune, it can survive anywhere."
  };

const review3 = {
    "id": 9,
    "name": "George Washington",
    "rating": 5,
    "review": "I crossed the Delaware with this thing. It's legit."
  };

const reviewArray = [review1, review2, review3];

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