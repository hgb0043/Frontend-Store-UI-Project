import { initializeHeader } from '/scripts/utils/header-utils.js';

import {
  calculateCartQuantity, 
  calculateCartSubtotal, 
  createCartProductData, 
  displayEmptyCartMessage, 
  generateCartStickyFooter, 
  generateCartProductHTML, 
  initializeCartInteractivity,
  updateProductQuantityUI,
  switchDecreaseIcon
} from '/scripts/utils/cart-utils.js';


// Run header logic when page first loads or is refreshed
initializeHeader();


// Generate content and establish logic
function initializeCartPage() {
  const cartProductData = createCartProductData();

  // End the function if cart is empty
  if (cartProductData.length === 0) {
    displayEmptyCartMessage();
    return;
  }

  // Display products
  const productsContainer = document.querySelector('.js-products-container');
  productsContainer.innerHTML = generateCartProductHTML(cartProductData, 'cart');
  
  cartProductData.forEach((product) => {
    const decreaseElement = document.querySelector(`.js-decrease-product-icon${product.id}`);
    updateProductQuantityUI(product.id, product.quantity);
    switchDecreaseIcon(product.quantity, decreaseElement);
  })
  
  // Display sticky-footer button

  const stickyFooter = document.querySelector('.js-sticky-footer-container');
  stickyFooter.innerHTML = generateCartStickyFooter(
    calculateCartSubtotal(cartProductData), calculateCartQuantity(cartProductData), 
    stickyFooter
  );

  // Establish event listeners to allow user interactivity
  initializeCartInteractivity(cartProductData, stickyFooter);
}
// Run when page first loads or is refreshed
initializeCartPage();