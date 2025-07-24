import { initializeHeader, manageBadgeUI } from '/scripts/utils/header-utils.js';

import { generateIndividualProduct } from '/scripts/utils/product-utils.js';

import { createCartProductData, calculateCartQuantity } from '/scripts/utils/cart-utils.js';


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
    const badge = document.querySelector('.js-badge');
    const badgeQuantity = document.querySelector('.js-badge-quantity');
    const addToCartButton = document.querySelector('.js-add-to-cart-button');
    const buyNowButton = document.querySelector('.js-buy-now-button');
    const addedMessage = document.querySelector('.js-added-message');
    enactButtonUI(determineProductStatus(cartProductData, product.id), addToCartButton, buyNowButton,'page-load', addedMessage);

    // Activate button event listeners
    sortButtonEventListeners(product, cartProductData, addToCartButton, badge, badgeQuantity, buyNowButton, addedMessage);
    sortButtonEventListeners(product, cartProductData, buyNowButton, badge, buyNowButton, addedMessage);
  } catch(error) {
    console.error('Failed to initialize product page:', error);
  }
}

function runInitializeProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const prdctId = parseInt(urlParams.get('id')) - 1;
  // Run when page first loads or is refreshed
  initializeProductPage(prdctId);
}
runInitializeProductPage();

// Experimental function to try to determine the review ids of the page's product
function determineProductReviewIds(data, productId) {
  // !! Condense to one line after debugging
  const dataArray = data.filter(review => review.product === productId + 1).map(review => review.id - 1);
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

function determineProductStatus(data, prdctId) {
  if (data.some(product => product.id === prdctId)) {
    return 'found';
  } else {
    return 'missing';
  } 
}

function enactButtonUI(status, button, removeButton, event, message) {
  if (status === 'missing') {
    if (event === 'page-load') {
      return;
    } else if (event === 'click') {
      button.innerHTML = 'Added <i class="fa-solid fa-check"></i>';
      button.classList.add('display-added-later');
      button.classList.remove('display-added-now');
      removeButton.remove();
      message.innerHTML = "<a class='added-message-link js-added-message-link' href='/code/cart.html'>See Cart</a></p>";
    }
  }
  if (status === 'found') {
    if (event === 'page-load') {
      button.innerHTML = 'Item previously added <i class="fa-solid fa-check"></i>';
      button.classList.add('display-added-later');
      button.classList.remove('display-added-now');
      removeButton.remove();
      message.innerHTML = "<a class='added-message-link js-added-message-link' href='/code/cart.html'>See Cart</a></p>";
    } else if (event === 'click') {
      return;
    }
  }
}

function sortButtonEventListeners(product, data, button, badge, badgeQty, removeButton, message) {
  if (button.id === 'add-to-cart-button') {
    addToCartEventListener(product, data, button, badge, badgeQty, removeButton, message);
  } else if (button.id === 'buy-now-button') {
    buyNowEventListener(button);
  }
}

// Run when 'Add to Cart' button is clicked
function addToCartEventListener(product, data, button, badge, badgeQty, removeButton, message) {
  button.addEventListener('click', () => {

    // Display checkmark and added message
    if (button.innerHTML === 'Add to Cart') {
      enactButtonUI(determineProductStatus(data, product.id), button, removeButton, 'click', message);
    }

    if (!data.some(p => p.id === product.id)) {
      const newData = addProduct(product, data);
      localStorage.setItem('cart-product-data', JSON.stringify(newData));
      const newQty = calculateCartQuantity(newData);
      manageBadgeUI(newQty);
    }
  });
}

function buyNowEventListener(button) {
  button.addEventListener('click', () => {
    window.location.href = '/code/checkout.html';
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