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
  "id": 4,
  "name": "Mens Casual Shorts 7inch Inseam",
  "price": 23.99,
  "path": "../images/product-images/product-4.jpg",
  "brand": "RQP",
  "rating": 4.4,
  "category": "Clothing",
  "sub-category": "Mens Shorts",
  "num-ratings": 68,
  "num-reviews": 6,
  "availability": "available",
  "amnt-available": 3,
  "material": "60% Cotton, 40% Linen",
  "color": "Army-green",
  "description": "Stay comfortable and stylish with these men’s casual shorts featuring a 7-inch inseam. Perfect for warm weather, they offer a relaxed fit and versatile look ideal for everyday wear, whether you're out running errands or relaxing at home."
};

// Reviews data from Reviews.json
const review1 = {
    "name": "Anakin Skywalker",
    "rating": 4,
    "review": "These shorts covered my missing leg, but I think I'm looking for something a bit more... dark."
  };

const review2 =  {
    "name": "The Incredible Hulk",
    "rating": 3,
    "review": "Warning: not for every skin tone!"
  };

const review3 = {
    "name": "Lego Man",
    "rating": 4,
    "review": "Due to unforeseen circumstances, I had to purchase these out of necessity."
  };

const review4 = {
    "name": "Charlie XCX",
    "rating": 4,
    "review": "Not exactly what I had in mind when I said 'Brat Summer,' but we can make it work."
  };

const review5 = {
    "name": "Jeff Bezos",
    "rating": 5,
    "review": "Good to know at least one thing in my family isn't full of plastic."
  };

const review6 = {
    "name": "Eiffel 65",
    "rating": 2,
    "review": "Make a blue one!"
  };

  const reviewsArray = [review1, review2, review3, review4, review5, review6];

  const main = document.querySelector('main');
const turtleRating = localStorage.getItem(`turtle-rating${product.id}`);

console.log(turtleRating);

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