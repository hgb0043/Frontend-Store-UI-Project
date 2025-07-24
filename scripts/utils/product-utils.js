// Generate turtle ratings for each product
export function generateProductTurtleRating(product) {
  const roundedProductRating = roundProductRating(product.rating);
  const turtles = getTurtleIcon(roundedProductRating);
  return storeProductTurtleIcons(product.id, turtles);
}

// Round product rating to the nearest 0.5
function roundProductRating(productRating) {
  const digit = determineFirstDecimalDigit(productRating);
  if (digit < 3) {
    return Math.floor(productRating);
  } else if (digit > 2 && digit < 8) {
    return Math.floor(productRating) + 0.5;
  } else if (digit > 7) {
    return Math.ceil(productRating);
  }
}

// Get first digit after decimal point 
function determineFirstDecimalDigit(num) {
  return Math.floor((num * 10) % 10);
}

function getTurtleIcon(rating) {
  let turtles = '';
  for(let i = 1; i <= Math.floor(rating); i++) {
    turtles += `<img class="turtle-icon" src="/images/base-images/turtle-icon.png" alt="Turtle rating icon" />`;
  }
  if((rating % 1) === 0.5) {
    turtles += `<img class="turtle-icon" id="halved-turtle-icon" src="/images/base-images/halved-turtle-icon.png" alt="Halved turtle rating icon" />`;
  }
  return turtles;
}

// Store unique visual turtle rating for each product in localStorage
function storeProductTurtleIcons(productId, turtles) {
  localStorage.setItem(`turtle-rating${productId}`, JSON.stringify(turtles));
  return turtles;
}

// Generate HTML for each individual product
export function generateIndividualProduct(product, page) {
  let html = '';
  if (page === 'product') {
    html += `
    <div class="product-main-container">
      <img class="product-img" src="/images/product-images/product${product.id}.jpg" alt ="product${product.id}" />

      <div class="product-description-container">
        <h1 class="product-name">${product.name}</h1>

        <p class="price">$${product.price}</p>

        <div class="rating-section">
          <p class="rating-num">${product.rating}</p>
          
          <div class="turtle-rating-container">${generateProductTurtleRating(product)}</div>
          <p class="ratings-count">${product["num-ratings"]} ratings</p>
            <span class="divider">|</span><span class="reviews-count js-reviews-count">${product["num-reviews"]} reviews</span>
        </div>

        <div class="user-prompts-container js-user-prompts-container">
          <button class="add-to-cart-button js-add-to-cart-button" id="add-to-cart-button">Add to Cart</button>
          <button class="buy-now-button js-buy-now-button" id="buy-now-button">Buy Now</button>
        </div>
        <p class="added-message js-added-message"></p>
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
  } else {
  html += `
    <div class="item-container" data-product-id="${product.id}"> 
      <img class="product-img" src="${product.path}" alt="${product.name}" /> 
      <a href="/code/product-code/home-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${generateProductTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
      <div class="edit-item-container">`
      if (page === 'cart') {
        html += `
          <i class="fa-solid fa-trash decrease-product-icon js-decrease-product-icon${product.id}"></i>
          <span class="product-quantity js-product-quantity${product.id}">${product.quantity}</span>
          <i class="fa-solid fa-plus increase-product-icon js-increase-product-icon${product.id}"></i>        
        `;
      } else if (page === 'checkout') {
        html += `<span class="product-quantity js-product-quantity${product.id}">Quantity: ${product.quantity}</span>`
      }
      html += `
      </div>
    </div>
    `;
  }
  return html;
}

// Independent function that stores potential ratings in localStorage
function storePotentialTurtleRatings() {
  for (let i = 1; i <= 5; i+= 0.5) {
    let turtle = '';
    // Generate full turtle icons
    for (let index = 1; index <= i; index++) {
      turtle += `<img class="turtle-icon" src="/images/base-images/turtle-icon.png">`;
    }

    // Generate half turtle icons
    if ((i % 1) === 0.5) {
      turtle += `<img 
      class="turtle-icon" 
      id="halved-turtle-icon"
      src="/images/base-images/halved-turtle-icon.png">`
    }
    localStorage.setItem(`${i}star-turtle-rating`, turtle);
  }
}
storePotentialTurtleRatings();

// Reusable function to generate HTML for each product.
export function generateCategoryProductHTML(product) {
  return ` 
    <div class="item-container"> 
      <img class="product-img" src="${product.path}" alt="${product.name}" /> 
      <a href="/code/product.html?id=${product.id}" class="product-name">${product.name}</a> 
      <div class="turtle-container">${generateProductTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `;
}