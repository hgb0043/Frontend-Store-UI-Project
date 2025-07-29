import { initializeHeader } from '/scripts/utils/header-utils.js'

import { 
  createCartProductData, 
  calculateCartQuantity,
} from '/scripts/utils/cart-utils.js'

// Run header logic when page first loads or is refreshed
initializeHeader();

function initializeOrderConfirmationPage() {
  const cartProductData = createCartProductData();
  const cartQuantity = calculateCartQuantity(cartProductData);
  const cartLength = cartProductData.length;
  const total = localStorage.getItem('total');
  generateOrderConfirmationSummary(cartQuantity, cartLength, total);

  const orderStatus = 'success';
  const orderConfirmationMessage = document.querySelector('.js-order-confirmation-message');
  generateWelcomeMessage(orderStatus, orderConfirmationMessage);
}
initializeOrderConfirmationPage();

function generateWelcomeMessage(status, message) {
  if (status === 'success') {
    message.innerHTML = `
    <h1>Order successfully placed! <i class="fa-solid fa-circle-check"></i></h1>
    <p id="thanks-message">Thank you for shopping with us and helping make the world a little bit greener!</p> 
    <p id="plastic-message">Based on our estimates<i class="fa-solid fa-circle-info"></i>,<span class="space"></span> your purchase prevented the production of ${calculatePlasticReductionEstimate()} pounds of plastic.</p> 
    `;
  } else if (status === 'error') {
    message = 'We had trouble placing your order.';
  }
}

function calculatePlasticReductionEstimate(tot) {
  const multiplier = 
}

function generateOrderConfirmationSummary(qty, length, total) {
  const orderConfirmationContainer = document.querySelector('.js-order-summary-container');

  orderConfirmationContainer.innerHTML = `
  <div class="order-summary-subheader">
    <h2>Order Details</h2>
  </div>

  <div class="order-confirmation-info-container">
    <div class="order-confirmation-categories">
      <span class="individual-category">Order confirmation code:</span>
      <span class="individual-category">Order date and time:</span> 
      <span class="individual-category">Order size:</span>
      <span class="individual-category">Order total:</span>
      <span class="individual-category">Delivery address:</span>
      <span class="individual-category">Estimated delivery date:</span>
    </div>

    <div class="order-confirmation-values">
      <span class="individual-value">${generateOrderConfirmationCode()}</span>
      <span class="individual-value">${localStorage.getItem('order-date-time')}</span>
      <span class="individual-value">${qty} items (${length} products)</span>
      <span class="individual-value">$${total}</span>
      <span class="individual-value">${localStorage.getItem('address')}</span>
      <span class="individual-value">tbd</span>
    </div>
  </div>
  `
}

function generateOrderConfirmationCode() {
  const prev = localStorage.getItem('order-confirmation-code');
  if (prev) {
    return prev;
  } else {
    let code = '#';
    for (let i = 0; i < 6; i++) {
      code += generateRandomNumber();
    }
    localStorage.setItem('order-confirmation-code', code);
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}