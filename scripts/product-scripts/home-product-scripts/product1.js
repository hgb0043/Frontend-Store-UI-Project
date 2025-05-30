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
})

// Product data from products.json
const product = {
  "id": 1,
  "page": "Home",
  "name": "Smart Feelings Co. Biodegradable Dental Flossers 100 Count 2 Packs",
  "price": 9.99,
  "path": "/images/product-images/product1.jpg",  
  "rating": 4.5,
  "brand": "Smart Feelings Company",
  "num-ratings": 28,
  "num-reviews": 3,
  "category": "Health & Beauty",
  "sub-category": "Oral Health",
  "amnt-available": 10,
  "material": "Wheat Straw",
  "color": "none",
  "description": "Keep your smile fresh and the planet happy with these biodegradable dental flossers made from eco-friendly wheat straw. Each pack includes 100 mint-flavored floss picks with a comfortable grip and shred-resistant floss for easy cleaning. Featuring a flexible toothpick end and plastic-free packaging, these flossers offer a convenient, sustainable way to maintain oral hygiene."
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

// Product reviews from reviews.JSON
const review1 = {
  "name": "Mike Tyson",
  "rating": 5,
  "review": "These flossers cured my lisp!"
};

const review2 = {
  "name": "Taylor Swift",
  "rating": 5,
  "review": "Does this make up for all those jet flights?"
};

const review3 = {
  "name": "John Travolta",
  "rating": 2,
  "review": "First I gotta pay 5 dollas for a milkshake, and now they're chargin' me 10 for some floss?"
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