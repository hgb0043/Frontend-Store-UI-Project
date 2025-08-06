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
  generateWelcomeMessage(orderStatus, orderConfirmationMessage, cartProductData);

  toggleTooltipDisplay();
}
initializeOrderConfirmationPage();

function generateWelcomeMessage(status, message, data) {
  if (status === 'success') {
    message.innerHTML = `
    <h1>Order successfully placed! <i class="fa-solid fa-circle-check"></i></h1>
    <p id="thanks-message">Thank you for shopping with us and helping make the world a little greener!</p>
    <p class="tooltip-text js-tooltip-text off">Found by multiplying the sum of the weights of the items in your cart by the average weight of plastic in an alternative item</p> 
    <p id="plastic-message">Based on our estimates<i class="fa-solid fa-circle-info tooltip-icon js-tooltip-icon"></i>,<span class="space"></span> your purchase prevented the production of ${calculatePlasticReductionEstimate(data)} pounds of plastic.</p> 
    `;
  } else if (status === 'error') {
    message = 'We had trouble placing your order.';
  }
}

function toggleTooltipDisplay() {
  const icon = document.querySelector('.js-tooltip-icon');
  const message = document.querySelector('.js-tooltip-text');

  icon.addEventListener('mouseenter', () => {
    setTimeout(() => {
      console.log('on');
      message.classList.remove('off');
      message.classList.add('on');
    }, 200);
  });
  

  icon.addEventListener('mouseleave', () => {
    setTimeout(() => {
      console.log('off');
      message.classList.add('off');
      message.classList.remove('on');
    }, 200)
  })
}

function calculatePlasticReductionEstimate(data) {
  const totalPlastic = data.reduce((sum, current) => {
    const totalWeight = current.weight;
    const plasticWeight = totalWeight * 0.425;
    return sum + plasticWeight;
  }, 0);
  return totalPlastic.toFixed(2);
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