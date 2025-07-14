import { initializeHeader } from '/scripts/utils/header-utils.js';

import { generateIndividualProduct } from '/scripts/utils/product-utils.js';

import { createCartProductData } from '/scripts/utils/cart-utils.js';


// Run header logic when page first loads or is refreshed
initializeHeader();


async function initializeProductPage(productId) {
  try {
    const response1 = await fetch('/data/products.json');
    const data1 = await response1.json();

    const response2 = await fetch('/data/reviews.json');
    const data2 = await response2.json();

    const product = data1[productId];
    const reviewIdArray = determineProductReviewIds(data2, productId);
    const reviewArray = fillReviewArray(reviewIdArray, [], data2);
    const main = document.querySelector('main');

    // Display all the generated HTML
    main.innerHTML = displayGeneratedHTML(product, reviewArray);

    // Restyle if review fails to generate for any reason
    const turtleRatingContainer = document.querySelectorAll('.js-turtle-rating-container');
    turtleRatingContainer.forEach((review) => {
      removeReviewDeadSpace(review);
    });

    const reviewTriggerElement = document.querySelector('.js-reviews-count');
    const reviewTitleElement = document.querySelector('h4');
    scrollToReview(reviewTriggerElement, reviewTitleElement);

    const cartProductData = createCartProductData();
    const addToCartButton = document.querySelector('.js-add-to-cart-button');
    const buyNowButton = document.querySelector('.js-buy-now-button');
    const addedMessage = document.querySelector('.js-added-message');
    manageButtonUI(cartProductData, addToCartButton, buyNowButton, addedMessage, product, 'page-load');

    let cartQuantity = cartProductData.length || 0;
    const badge = document.querySelector('.js-badge');
    const badgeQuantity = document.querySelector('.js-badge-quantity');
    manageBadgeUI(cartQuantity, badge, badgeQuantity);

    // Activate button event listeners
    sortButtonEventListeners(product, cartProductData, addToCartButton, cartQuantity, badge, badgeQuantity, buyNowButton, addedMessage);
    sortButtonEventListeners(product, cartProductData, buyNowButton, cartQuantity, badge, buyNowButton, addedMessage);
  } catch(error) {
    console.error('Failed to initialize product page:', error);
  }
}

function runInitializeProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log('window.location.search:', window.location.search);
  const prdctId = parseInt(urlParams.get('id')) - 1;
  console.log(prdctId);
  // Run when page first loads or is refreshed
  initializeProductPage(prdctId);
}
runInitializeProductPage();

// Experimental function to try to determine the review ids of the page's product
function determineProductReviewIds(data, productId) {
  // !! Condense to one line after debugging
  const dataArray = data.filter(review => review.product === productId + 1).map(review => review.id - 1);
  console.log(dataArray);
  return dataArray;
}

function fillReviewArray(idArray, revArray, data) {
  idArray.forEach((rvw) => {
    revArray.push(data[rvw]);
  })
  return revArray;
}


function generateReviewHTML(review) {
  return `
   <div class="review-container">

      <div class="reviewer-description">

        <div class="reviewer-profile">
          <i class="fa-solid fa-circle-user"></i>
          <p class="reviewer-name">${review.name}</p>
        </div>
        <div class="turtle-rating-container js-turtle-rating-container reviewer-rating">
        ${generateReviewTurtleRating(review)}</div>

      <p class="review-text">
        ${review.review}
      </p>
      
    </div>
  </div>
  `;
}

function removeReviewDeadSpace(container) {
  if (container && !container.innerHTML.trim()) {
    container.classList.add('hidden');
    container.style.width = '0px';
    container.style.height = '0px';
  }
}

function generateReviewTurtleRating(review) {
  if (review.rating === null || review.rating === undefined) {
    console.warn(`
      Review.rating could not be found for: 
      - Name: ${review.name}  
      - Id: ${review.id}
      `);  
      return '';
  } else {
    const rating = localStorage.getItem(`${review.rating}star-turtle-rating`);
    if (rating === null) {
      console.warn(`
        Missing turtle rating for:
        - Name: ${review.name}
        - Id: ${review.id}
        - Rating: ${review.rating}
        `);
      return '';
    } 
    return rating;
  }
}

// Generate reviews HTML content 
function displayGeneratedHTML(prdct, array) {
  let html = generateIndividualProduct(prdct, 'product');
  html += array.map(generateReviewHTML).join('');
  return html;
}

// Scroll to review section when reviews text clicked
function scrollToReview(triggerEl, titleEl) {
  triggerEl.addEventListener('click', () => {
    titleEl.scrollIntoView({behavior: 'smooth'});
  });
}

// Create added Statement
function updateButtonUI(button, message, buttonToRemove) {
  button.innerHTML = 'Added <i class="fa-solid fa-check"></i>';
  button.classList.add('display-added-now');
  message.innerHTML = "Item added to cart. <a class='added-message-link js-added-message-link' href='/code/base-code/cart.html'>See Cart</a></p>"; 

  // Center 'Added' statement
  buttonToRemove.remove();
}

// Display badge if cartSize > 0 upon load
function manageBadgeUI(cartQty, badge, badgeQty) {
  if (cartQty > 0) {
    badge.classList.remove('hidden');
    badgeQty.classList.remove('hidden');
    badgeQty.innerHTML = cartQty;
  }
}

// Display 'Added' and 'addedMessage' if product already added to cart
function manageButtonUI(data, button, removeButton, message, product, event) {
  if (event === 'click') {
    enactButtonUI(button, removeButton, message);
  } else if (event === 'page-load') {
    if (data.some(p => p.id === product.id)) {
      enactButtonUI(button, removeButton, message);
    }
  }
}

function enactButtonUI(button, removeButton, message) {
  updateButtonUI(button, message, removeButton);
  button.classList.add('display-added-later');
  button.classList.remove('display-added-now');
  button.innerHTML = 'Item previously added <i class="fa-solid fa-check"></i>';
  message.innerHTML = "<a class='added-message-link js-added-message-link' href='/code/base-code/cart.html'>See Cart</a></p>";
}

function sortButtonEventListeners(product, data, button, qty, badge, badgeQty, removeButton, message) {
  if (button.id === 'add-to-cart-button') {
    addToCartEventListener(product, data, button, qty, badge, badgeQty, removeButton, message);
  } else if (button.id === 'buy-now-button') {
    buyNowEventListener(button);
  }
}

// Run when 'Add to Cart' button is clicked
function addToCartEventListener(product, data, button, qty, badge, badgeQty, removeButton, message) {
  button.addEventListener('click', () => {
    let newData = addProduct(product, data);
    let newQty = newData.length;

    // Display checkmark and added message
    if (button.innerHTML === 'Add to Cart') {
      manageButtonUI(data, button, removeButton, message, product, 'click');
    }

    if (!data.some(p => p.id === product.id)) {
      newData = addProduct(product, data);
    }

  // Display badge if cartQuantity isn't zero
    if (newQty > 0) {
      badge.classList.remove('hidden');
      badgeQty.classList.remove('hidden');
      badgeQty.innerHTML = newQty;
    }
    return newData;
  });
}

function buyNowEventListener(button) {
  button.addEventListener('click', () => {
    window.location.href = '/code/base-code/checkout.html';
  })
}

// If the product isn't already in data
function addProduct(product, data) {
  if (!data.includes(product)) {
    data.push(product);
    (localStorage.setItem('cart-product-data', JSON.stringify(data)));
  }
  return data;
}

async function fetchProducts() {
  try {
    const response = await fetch('/data/products.json');
  } catch (error) {
    console.error('Error:', error)
  }
}