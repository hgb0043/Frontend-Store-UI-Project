import { initializeHeader } from '/scripts/utils/header-utils.js';

import { 
  calculateCartQuantity,   
  createCartProductData,
  generateCartProductHTML 
 } from '/scripts/utils/cart-utils.js';


// Run header logic when page first loads or is refreshed
initializeHeader();


function initializeCheckoutPage() {
  const cartProductData = createCartProductData();

  const orderSummaryTitle = document.querySelector('.js-order-summary-title');
  const cartQuantity = determineCheckoutCartQuantity(cartProductData);
  orderSummaryTitle.innerHTML = generateOrderSummaryTitle(cartQuantity);
  if(cartProductData.length === 0) {
    return;
  }

  const productsContainer = document.querySelector('.js-products-container');
  productsContainer.innerHTML = generateCartProductHTML(cartProductData, 'checkout');
  console.log(productsContainer.innerHTML);

  generatePlaceOrderButton();

  const subtotal = Number(localStorage.getItem('subtotal')) || 0;
  generateCheckoutDescriptionHTML(
    cartProductData, 
    subtotal, 
    calculateCheckoutTax(subtotal),
    calculateCheckoutTotal(subtotal)
  );
}
// Run when page first loads or is refreshed
initializeCheckoutPage();


function determineCheckoutCartQuantity(data) {
  const raw = localStorage.getItem('cart-quantity');
  if (raw) return Number(raw);
  else return calculateCartQuantity(data);
}


function generateOrderSummaryTitle(qty) {
  if (qty) {
    return `Order Summary (${qty} items)`;
  } else {
    return 'Your cart is empty.'; // Amend later
  }
}

function calculateCheckoutTax(subtotal) {
  return (Number(subtotal) * 0.1).toFixed(2);
}

function calculateCheckoutTotal(subtotal) {
  const tax = calculateCheckoutTax(subtotal);
  return (Number(subtotal) + Number(tax)).toFixed(2);
}

function generateCheckoutDescriptionHTML(data, subtotal, tax, total) {
  const wordsSection = document.querySelector('.js-words-container');
  if (data.length > 0) {
    wordsSection.innerHTML =  `
    <span class="word">Subtotal:</span>
    <span class="word">Shipping & Handling:</span>
    <span class="word">Tax:</span>
    <span class="word">Total:</span>
    `

  const valuesSection = document.querySelector('.js-values-container');
    valuesSection.innerHTML = `
    <span class="value">$${subtotal}</span>
    <span class="value">$0.00</span>
    <span class="value">$${tax}</span>
    <span class="value">$${total}</span>
    `
  }
}

function generatePlaceOrderButton() {
  const placeOrderButton = document.querySelector('.js-place-order-button')
  placeOrderButton.addEventListener('click', () => {
    window.location.href = 'order-confirmation.html';
  });
}