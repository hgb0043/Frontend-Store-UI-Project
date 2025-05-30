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
  document.querySelector('.account-message').innerHTML = '<a href="code/base-code/login.html" class="permanent-header-link">Log in</a> <a href="code/base-code/signup.html" class="permanent-header-link">Sign up</a></p>' 
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
console.log(html);

// Display all the generated HTML
main.innerHTML = html;