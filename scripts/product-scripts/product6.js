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


// Product data from products.json
const product = {
  "id": 6,
  "name": "Monxiery 5 Pairs 100% Cotton Athletic Crew Socks",
  "price": 14.99,
  "path": "../images/product-images/product-6.jpg",
  "brand": "Monxiery",
  "rating": 4.2,
  "num-ratings": 48,
  "num-reviews": 4,
  "category": "Clothing",
  "sub-category": "Men's Socks",
  "availability": "available",
  "material": "100% Cotton",
  "color": "Black",
  "description": "Stay comfortable and supported during your workouts with these Monxiery athletic crew socks. Made from 100% breathable cotton, they offer cushioning and durability to keep your feet fresh and protected all day long." 
};

// Reviews data from review.json
const review1 = {
  "name": "Dwayne Johnson",
  "rating": 4,
  "review": "Hey Kevin I think I found some socks for you. They come in youth XS."
};

const review2 = {
  "name": "Joe Rogan",
  "rating": 4,
  "review": "Man, those socks are super black--Jamie pull up the video of those black bears fighting."
};

const review3 = {
  "name": "Harry Kane",
  "rating": 3,
  "review": "Speech recognition could not detect any speech. Please try again."
  };

const review4 = {
  "name": "Inigo Montoya",
  "rating": 5,
  "review": "Hello, my name is Inigo Montoya. My old socks got holes in them. Prepare to be bought."
  };

  const reviewsArray = [review1, review2, review3, review4,];

  const main = document.querySelector('main');
const turtleRating = localStorage.getItem(`turtle-rating${product.id}`);

main.innerHTML = `
<div class="product-main-container">
  <img class="product-img" src="/images/product-images/product${product.id}.jpg">

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

reviewsArray.forEach(review => {
  main.innerHTML += ` 
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
      
    </div>`
});

const reviewCount = document.querySelector('.reviews-count');

// Scroll to reviews section when reviews link is clicked
reviewCount.addEventListener('click', () => {
  window.scrollTo({
    top: 1000, 
    behavior: "smooth"
  });
});