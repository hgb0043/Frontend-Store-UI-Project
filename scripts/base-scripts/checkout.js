import { initializeHeader } from '/scripts/utils/header-utils.js';

import { 
  calculateCartQuantity,   
  createCartProductData,
  generateCartProductHTML,
  calculateCartSubtotal 
 } from '/scripts/utils/cart-utils.js';


// Run header logic when page first loads or is refreshed
initializeHeader();


function initializeCheckoutPage() {
  const cartProductData = createCartProductData();
  const cartQuantity = calculateCartQuantity(cartProductData);
  if (!cartQuantity) return;
  const subtotal = calculateCartSubtotal(cartProductData);

  const orderSummaryTitle = document.querySelector('.js-order-summary-title');
  orderSummaryTitle.innerHTML = generateOrderSummaryTitle(cartQuantity);

  const productsContainer = document.querySelector('.js-products-container');
  productsContainer.innerHTML = generateCartProductHTML(cartProductData, 'checkout');

  generatePlaceOrderButton();

  generateCheckoutDescriptionHTML(
    cartProductData, 
    subtotal, 
    calculateCheckoutTax(subtotal),
    calculateCheckoutTotal(subtotal)
  );

  manageDeliveryAddress();
  maintainSelectedAddress();

  // manageDeliveryAddress();
}

function maintainSelectedAddress() {
  const id = localStorage.getItem('address-id');
  if (id) {
    const all = document.querySelectorAll('input[type="radio"][name="address"]');
    all.forEach((input) => {
      const current = input.value;
      if (current === id) {
        input.checked = true;
      }
    })
  }
}
// Run when page first loads or is refreshed
initializeCheckoutPage();


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
    <span class="value" id="total">$${total}</span>
    `
  }
}

function generatePlaceOrderButton() {
  const placeOrderButton = document.querySelector('.js-place-order-button')
  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', () => {
      window.location.href = 'order-confirmation.html';
      getOrderDateTime();

    });
  } 
}

function manageDeliveryAddress() {
  const deliveryForm = document.querySelector('.js-delivery-form');
  deliveryForm.addEventListener('change', () => {
  
    const selected = document.querySelector('input[name="address"]:checked');

    if (selected) {
      // displayEstDeliveryTime(selected);
      const label = document.querySelector(`label[for="${selected.value}"]`);
      const fullAddress = label.textContent;
      const addressId = label.htmlFor;

      localStorage.setItem('address', fullAddress);
      localStorage.setItem('address-id', addressId);
    }
  });
}

function getOrderDateTime() {
  const now = new Date();
  const dateTime = now.toLocaleString();
  localStorage.setItem('order-date-time', dateTime);
}

/* Finish project first

function displayEstDeliveryTime(selected) {
  
  const prevId = localStorage.getItem('delivery-message-id')?.trim();
  console.log(prevId);
  const prevElement = document.getElementById(prevId);
  console.log(prevElement);
  console.log(document.getElementById("sherlock-holmes"));
  if (prevElement) {
    prevElement.classList.add('hidden');
  }

  // Get delivery date (date three days from current time) 
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 2);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayOfWeek = daysOfWeek[threeDaysLater.getDay()];

  const element = document.querySelector(`#${selected.value}`);
  localStorage.setItem('delivery-message-id', JSON.stringify(element.id));

  element.innerHTML = `estimated delivery date: ${dayOfWeek}`;
}

*/