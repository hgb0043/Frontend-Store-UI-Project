import { initializeHeader } from './utils.js'


// Run header logic when page first loads or is refreshed
initializeHeader();


// Shopping Section


const cartProductData = [];
const cartQuantity = cartProductData.length || 0;
const badge = document.querySelector('.js-badge');
const badgeQuantity = document.querySelector('.js-badge-quantity');

// Display badge if cartSize > 0 upon load
if (cartQuantity > 0) {
  badge.classList.remove('hidden');
  badgeQuantity.classList.remove('hidden');
  badgeQuantity.innerHTML = cartQuantity;
}